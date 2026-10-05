#!/usr/bin/env python3
"""
Минимальный backend для формы "ОНЛАЙН ЗАПИСЬ" (components/BookingForm.tsx,
components/BookingFormFields.tsx -> POST /api/online-booking) и для счётчика
просмотров статей (components/ArticleViewCounter.tsx -> GET/POST /api/views/<slug>).

Сайт - статический экспорт Next.js на nginx (после переезда с Vercel на эту VM),
поэтому старые api/*.ts Vercel Functions не работают вообще (404). Этот скрипт -
их замена: слушает на 127.0.0.1, nginx проксирует сюда весь /api/, дальше шлёт
уведомление в MAX (вместо Telegram) через Bot API или отдаёт/увеличивает счётчик
просмотров статьи.

MAX API требует российский корневой сертификат Минцифры (Russian Trusted Root/Sub CA) -
он должен быть уже установлен в системное хранилище (update-ca-certificates),
иначе исходящий запрос к platform-api2.max.ru упадёт по SSL.

Запуск: через systemd-юнит booking-api.service (см. booking-api.service).
Конфиг берётся из переменных окружения (EnvironmentFile в systemd):
  MAX_BOT_TOKEN - токен бота MAX
  MAX_CHAT_ID   - chat_id получателя уведомлений
  PORT          - порт для listen (по умолчанию 8090)

Счётчик просмотров хранится в views.json рядом со скриптом (в пределах
ReadWritePaths=/opt/biorise-booking-api из systemd-юнита, остальная файловая
система у сервиса read-only). Запись защищена threading.Lock, потому что
ThreadingHTTPServer обрабатывает запросы в отдельных потоках.

Также здесь живёт /api/direct-tracker/* - закрытый учёт звонков/записей с
рекламного номера Яндекс Директа для администратора клиники (см. ТЗ в чате
2026-10-03). Страница /direct-tracker/ и этот API-префикс закрыты Basic
Auth на уровне nginx (см. yc-pipeline/nginx/biorise-clinic.conf), сюда
долетают уже только авторизованные запросы - здесь это не перепроверяется.
Данные хранятся в SQLite (direct-tracker.db рядом со скриптом), а не в
Supabase/Vercel KV, потому что сайт больше не на Vercel, а SQLite ничего
не добавляет к зависимостям (stdlib) и для ручного ввода одной клиники
десятки/сотни записей в месяц - более чем достаточный масштаб.
"""

import datetime
import json
import os
import re
import sqlite3
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

MAX_BOT_TOKEN = os.environ.get('MAX_BOT_TOKEN', '')
MAX_CHAT_ID = os.environ.get('MAX_CHAT_ID', '')
PORT = int(os.environ.get('PORT', '8090'))
TECH_MESSAGE = 'Свяжитесь, пожалуйста, с нами самостоятельно: на данный момент проводятся технические работы на сайте.'

MAX_API_URL = 'https://platform-api2.max.ru/messages'

VIEWS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'views.json')
VIEWS_LOCK = threading.Lock()
SLUG_RE = re.compile(r'^/api/views/([a-z0-9-]{1,200})/?$')

DT_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'direct-tracker.db')
DT_LOCK = threading.Lock()
DT_VISIT_RE = re.compile(r'^/api/direct-tracker/records/(\d+)/?$')
DT_STATUSES = {'call', 'booked', 'came', 'no_show', 'cancelled'}
# Через какой номер прошёл именно этот звонок - 'direct_902' = рекламный
# номер Яндекс Директа, 'organic_996' = номер на основном сайте. У пациента
# отдельно хранится original_source - источник САМОГО ПЕРВОГО обращения,
# он выставляется один раз при создании пациента и больше не меняется:
# если человек изначально пришёл с рекламы (902), а через месяц без
# рекламы позвонил на обычный номер (996), выручка с этого повторного
# визита всё равно должна считаться в пользу рекламы, которая его
# привела изначально (first-touch атрибуция).
DT_SOURCES = {'direct_902', 'organic_996'}
# Маркетинговый канал, через который реально пришёл пациент - отдельная
# ось от source (номера телефона). 'site2' жёстко привязан к номеру 902:
# если позвонили на рекламный номер, канал всегда 'site2' и не может быть
# другим (это проверяется и на фронте, и здесь на бэке). Для 996 admin
# выбирает канал вручную из остальных вариантов. originalChannel у
# пациента, как и originalSource, фиксируется один раз по первому
# обращению и работает по тому же принципу first-touch атрибуции.
DT_CHANNELS = {
    'site', 'site2', 'instagram', 'vk', 'telegram',
    'yandex_maps', '2gis', 'google_maps', 'prodoctorov',
}


def dt_get_conn():
    conn = sqlite3.connect(DT_DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def dt_init_db():
    with dt_get_conn() as conn:
        conn.execute(
            '''CREATE TABLE IF NOT EXISTS patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone TEXT UNIQUE NOT NULL,
                original_source TEXT
            )'''
        )
        conn.execute(
            '''CREATE TABLE IF NOT EXISTS visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
                call_at TEXT,
                booking_at TEXT,
                service TEXT,
                amount REAL,
                status TEXT NOT NULL,
                comment TEXT,
                created_at TEXT NOT NULL,
                source TEXT
            )'''
        )
        # ALTER TABLE ... ADD COLUMN для баз, созданных до появления source/
        # original_source - CREATE TABLE IF NOT EXISTS их не добавит, если
        # таблица уже существует. Повторный запуск безопасен (просто поймает
        # "duplicate column").
        for stmt in (
            'ALTER TABLE patients ADD COLUMN original_source TEXT',
            'ALTER TABLE visits ADD COLUMN source TEXT',
            'ALTER TABLE patients ADD COLUMN original_channel TEXT',
            'ALTER TABLE visits ADD COLUMN channel TEXT',
        ):
            try:
                conn.execute(stmt)
            except sqlite3.OperationalError:
                pass


def dt_normalize_phone(raw: str) -> str | None:
    digits = re.sub(r'\D', '', raw or '')
    if len(digits) == 11 and digits[0] in ('7', '8'):
        digits = '7' + digits[1:]
    elif len(digits) == 10:
        digits = '7' + digits
    else:
        return None
    return '+' + digits


def dt_list_records() -> list[dict]:
    with DT_LOCK, dt_get_conn() as conn:
        patients = conn.execute(
            'SELECT id, phone, original_source, original_channel FROM patients'
        ).fetchall()
        visits = conn.execute(
            'SELECT id, patient_id, call_at, booking_at, service, amount, status, comment, created_at, source, channel '
            'FROM visits ORDER BY created_at ASC'
        ).fetchall()

    visits_by_patient: dict[int, list[dict]] = {}
    for v in visits:
        visits_by_patient.setdefault(v['patient_id'], []).append(dict(v))

    return [
        {
            'id': p['id'],
            'phone': p['phone'],
            'originalSource': p['original_source'],
            'originalChannel': p['original_channel'],
            'visits': visits_by_patient.get(p['id'], []),
        }
        for p in patients
        if visits_by_patient.get(p['id'])
    ]


def dt_add_visit(data: dict) -> dict:
    phone = dt_normalize_phone(data.get('phone', ''))
    if not phone:
        raise ValueError('Некорректный номер телефона')

    status = data.get('status') or 'call'
    if status not in DT_STATUSES:
        raise ValueError('Некорректный статус')

    amount = data.get('amount')
    try:
        amount = float(amount) if amount not in (None, '') else None
    except (TypeError, ValueError):
        raise ValueError('Некорректная сумма')

    source = data.get('source')
    if source is not None and source not in DT_SOURCES:
        raise ValueError('Некорректный источник')

    channel = data.get('channel')
    if channel is not None and channel not in DT_CHANNELS:
        raise ValueError('Некорректный канал')
    # Жёсткое правило, а не просто подсказка на фронте: звонок на 902 -
    # это всегда и только 'site2', подменяем/проверяем здесь тоже, чтобы
    # нельзя было обойти блокировку поля прямым запросом к API.
    if source == 'direct_902':
        channel = 'site2'
    elif channel == 'site2':
        raise ValueError('Канал "Сайт2" применяется только для номера 902')

    now_iso = datetime.datetime.now().isoformat(timespec='seconds')

    with DT_LOCK, dt_get_conn() as conn:
        row = conn.execute('SELECT id FROM patients WHERE phone = ?', (phone,)).fetchone()
        if row:
            patient_id = row['id']
        else:
            # original_source/original_channel фиксируются один раз, по
            # самому первому обращению этого номера - дальше не меняются.
            cur = conn.execute(
                'INSERT INTO patients (phone, original_source, original_channel) VALUES (?, ?, ?)',
                (phone, source, channel),
            )
            patient_id = cur.lastrowid

        cur = conn.execute(
            'INSERT INTO visits (patient_id, call_at, booking_at, service, amount, status, comment, created_at, source, channel) '
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            (
                patient_id,
                (data.get('callAt') or None),
                (data.get('bookingAt') or None),
                (str(data.get('service') or '').strip()[:200] or None),
                amount,
                status,
                (str(data.get('comment') or '').strip()[:1000] or None),
                now_iso,
                source,
                channel,
            ),
        )
        visit_id = cur.lastrowid

    return {'id': visit_id, 'patientId': patient_id, 'phone': phone}


def dt_update_visit(visit_id: int, data: dict) -> bool:
    fields = []
    values = []

    if 'status' in data:
        status = data['status']
        if status not in DT_STATUSES:
            raise ValueError('Некорректный статус')
        fields.append('status = ?')
        values.append(status)

    if 'comment' in data:
        fields.append('comment = ?')
        values.append(str(data['comment'] or '').strip()[:1000] or None)

    if not fields:
        raise ValueError('Нечего обновлять')

    values.append(visit_id)
    with DT_LOCK, dt_get_conn() as conn:
        cur = conn.execute(f'UPDATE visits SET {", ".join(fields)} WHERE id = ?', values)
        return cur.rowcount > 0


def dt_delete_visit(visit_id: int) -> bool:
    with DT_LOCK, dt_get_conn() as conn:
        row = conn.execute('SELECT patient_id FROM visits WHERE id = ?', (visit_id,)).fetchone()
        if not row:
            return False
        patient_id = row['patient_id']
        conn.execute('DELETE FROM visits WHERE id = ?', (visit_id,))
        remaining = conn.execute(
            'SELECT COUNT(*) AS c FROM visits WHERE patient_id = ?', (patient_id,)
        ).fetchone()['c']
        if remaining == 0:
            conn.execute('DELETE FROM patients WHERE id = ?', (patient_id,))
    return True


dt_init_db()


def _load_views() -> dict:
    if not os.path.exists(VIEWS_PATH):
        return {}
    try:
        with open(VIEWS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {}


def _save_views(views: dict) -> None:
    tmp_path = f'{VIEWS_PATH}.tmp'
    with open(tmp_path, 'w', encoding='utf-8') as f:
        json.dump(views, f, ensure_ascii=False)
    os.replace(tmp_path, VIEWS_PATH)


def increment_view(slug: str) -> int:
    with VIEWS_LOCK:
        views = _load_views()
        views[slug] = views.get(slug, 0) + 1
        _save_views(views)
        return views[slug]


def get_view(slug: str) -> int:
    with VIEWS_LOCK:
        return _load_views().get(slug, 0)


def send_max_notification(text: str) -> tuple[bool, str]:
    if not MAX_BOT_TOKEN or not MAX_CHAT_ID:
        return False, 'MAX credentials не настроены'

    # chat_id уходит query-параметром, а не в JSON-теле - проверено вручную
    # 2026-09-03: с chat_id в теле MAX API стабильно отвечает "Unknown recipient".
    body = json.dumps({'text': text, 'format': 'html'}).encode('utf-8')
    url = f'{MAX_API_URL}?chat_id={int(MAX_CHAT_ID)}'
    req = urllib.request.Request(
        url,
        data=body,
        method='POST',
        headers={
            'Authorization': MAX_BOT_TOKEN,
            'Content-Type': 'application/json',
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
            return True, ''
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf-8', errors='replace')
        return False, f'MAX API HTTP {e.code}: {detail}'
    except Exception as e:
        return False, f'MAX API error: {e}'


def build_message(data: dict) -> str:
    lines = [
        '🆕 <b>Новая онлайн-запись</b>',
        '',
        f"👤 <b>Имя:</b> {data.get('name', '')}",
        f"📞 <b>Телефон:</b> {data.get('phone', '')}",
        f"📍 <b>Адрес клиники:</b> {data.get('address', '')}",
    ]
    if data.get('promoCode'):
        lines.append(f"🎟 <b>Промокод:</b> {data['promoCode']}")
    return '\n'.join(lines)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # логируем в stdout -> journalctl подхватит через systemd
        print(f'{self.address_string()} - {format % args}')

    def _send_json(self, status: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        views_match = SLUG_RE.match(self.path)
        if views_match:
            slug = views_match.group(1)
            return self._send_json(200, {'slug': slug, 'count': increment_view(slug)})

        if self.path.rstrip('/') == '/api/direct-tracker/records':
            length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(length) if length else b'{}'
            try:
                data = json.loads(raw.decode('utf-8'))
            except (json.JSONDecodeError, UnicodeDecodeError):
                return self._send_json(400, {'success': False, 'message': 'Некорректный JSON'})
            try:
                result = dt_add_visit(data)
            except ValueError as e:
                return self._send_json(400, {'success': False, 'message': str(e)})
            return self._send_json(200, {'success': True, **result})

        if self.path.rstrip('/') != '/api/online-booking':
            return self._send_json(404, {'success': False, 'message': 'Not found'})

        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length) if length else b'{}'
        try:
            data = json.loads(raw.decode('utf-8'))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return self._send_json(400, {'success': False, 'message': 'Некорректный JSON'})

        if not data.get('name') or not data.get('phone') or not data.get('address'):
            return self._send_json(400, {'success': False, 'message': 'Не все обязательные поля заполнены'})

        # простая защита от мусора в свободных полях
        for key in ('name', 'phone', 'address', 'promoCode'):
            if key in data and data[key] is not None:
                data[key] = re.sub(r'[<>]', '', str(data[key]))[:300]

        ok, err = send_max_notification(build_message(data))
        if not ok:
            print('MAX notification failed:', err)
            return self._send_json(502, {'success': False, 'message': TECH_MESSAGE})

        return self._send_json(200, {'success': True, 'message': 'Заявка успешно отправлена'})

    def do_GET(self):
        if self.path.rstrip('/') == '/api/online-booking/health':
            return self._send_json(200, {'ok': True})

        # Без слага - отдать все счётчики разом (используется на /articles/,
        # чтобы не делать по отдельному запросу на каждую карточку статьи).
        if self.path.rstrip('/') == '/api/views':
            with VIEWS_LOCK:
                return self._send_json(200, _load_views())

        views_match = SLUG_RE.match(self.path)
        if views_match:
            slug = views_match.group(1)
            return self._send_json(200, {'slug': slug, 'count': get_view(slug)})

        if self.path.rstrip('/') == '/api/direct-tracker/records':
            return self._send_json(200, {'patients': dt_list_records()})

        return self._send_json(404, {'success': False, 'message': 'Not found'})

    def do_PATCH(self):
        visit_match = DT_VISIT_RE.match(self.path)
        if visit_match:
            visit_id = int(visit_match.group(1))
            length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(length) if length else b'{}'
            try:
                data = json.loads(raw.decode('utf-8'))
            except (json.JSONDecodeError, UnicodeDecodeError):
                return self._send_json(400, {'success': False, 'message': 'Некорректный JSON'})
            try:
                ok = dt_update_visit(visit_id, data)
            except ValueError as e:
                return self._send_json(400, {'success': False, 'message': str(e)})
            if not ok:
                return self._send_json(404, {'success': False, 'message': 'Запись не найдена'})
            return self._send_json(200, {'success': True})

        return self._send_json(404, {'success': False, 'message': 'Not found'})

    def do_DELETE(self):
        visit_match = DT_VISIT_RE.match(self.path)
        if visit_match:
            visit_id = int(visit_match.group(1))
            ok = dt_delete_visit(visit_id)
            if not ok:
                return self._send_json(404, {'success': False, 'message': 'Запись не найдена'})
            return self._send_json(200, {'success': True})

        return self._send_json(404, {'success': False, 'message': 'Not found'})


def main():
    server = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    print(f'booking-api listening on 127.0.0.1:{PORT}')
    server.serve_forever()


if __name__ == '__main__':
    main()
