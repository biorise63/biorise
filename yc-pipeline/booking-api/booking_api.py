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
"""

import json
import os
import re
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

        views_match = SLUG_RE.match(self.path)
        if views_match:
            slug = views_match.group(1)
            return self._send_json(200, {'slug': slug, 'count': get_view(slug)})

        return self._send_json(404, {'success': False, 'message': 'Not found'})


def main():
    server = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    print(f'booking-api listening on 127.0.0.1:{PORT}')
    server.serve_forever()


if __name__ == '__main__':
    main()
