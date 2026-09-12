#!/usr/bin/env python3
"""
Собирает фид "Врачи" для Яндекс.Вебмастера (Услуги и предложения -> Врачи)
из официального шаблона (yandex-doctors-feed/template.xlsx).

Упрощено 2026-09-12 по прямому решению пользователя: фид раз за разом не
проходил модерацию, пока в нём были капельницы (их выполняет медсестра, а не
сам врач - см. требование Яндекса "услугу оказывает лично врач"), чек-апы,
анализы, массаж и косметология. Теперь в фиде только реальные врачи со своим
одним стандартным приёмом ("Да" в базовой услуге) и только клиника на
Дыбенко - Стара Загора убрана. Массажист и косметолог-эстетист (Захаров,
Малофеева) исключены: это не врачебные консультации, и для них нет базовой
услуги "приём" - в контексте фида именно врачей они были лишним усложнением.

Запуск: python3 scripts/generate-yandex-doctors-feed.py
Результат: yandex-doctors-feed/biorise-doctors-feed.xlsx
"""

import os
import shutil
import zipfile

import openpyxl

XML_DECLARATION = b'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n'


def restore_xml_declarations(path):
    """openpyxl's writer omits the leading <?xml ...?> declaration from every
    internal part when it re-saves an .xlsx (verified by diffing our output
    against the untouched Yandex template byte-for-byte - every xl/*.xml part
    in the template starts with the declaration, ours starts with the bare
    tag). That's technically still well-formed XML, but Yandex's own feed
    validator is strict about it and rejects the file with "Лишние символы в
    начале фида, строка 1 позиция 1" - so re-inject the declaration into every
    XML part that's missing one before shipping the file."""
    tmp_path = path + '.tmp'
    with zipfile.ZipFile(path, 'r') as src, zipfile.ZipFile(tmp_path, 'w', zipfile.ZIP_DEFLATED) as dst:
        for item in src.infolist():
            data = src.read(item.filename)
            if item.filename.endswith('.xml') or item.filename.endswith('.rels'):
                if not data.startswith(b'<?xml'):
                    data = XML_DECLARATION + data
            dst.writestr(item, data)
    os.replace(tmp_path, path)


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(ROOT, 'yandex-doctors-feed', 'template.xlsx')
OUTPUT_PATH = os.path.join(ROOT, 'yandex-doctors-feed', 'biorise-doctors-feed.xlsx')
SITE_URL = 'https://biorise-clinic.ru'
PHONE = '8 996 749 97 47'

# --- Организация ---
ORGANIZATION = {
    'Название компании': 'ООО «МК Клиники Будущего»',
    'Название площадки': 'BIORISE',
    'Ссылка на сайт компании': SITE_URL,
    'Электронная почта компании': '',
    'Ссылка на логотип компании': f'{SITE_URL}/logo-cube.png',
}

# --- Клиника: только Дыбенко (Стара Загора убрана 2026-09-12 по решению пользователя) ---
DYBENKO = 'clinic_dybenko'
CLINICS = [
    {
        'id': DYBENKO,
        'Название клиники': 'Биорайз',
        'Город клиники': 'Самара',
        'Адрес клиники': 'ул. Дыбенко 27Б',
    },
]

# --- Врачи: только реальные врачи со стандартным приёмом (продублировано из
# lib/authors.ts). Цены сверены с Klientiks CRM 2026-09-12: "Прием (осмотр,
# консультация) врача-<специальность> первичный".
DOCTORS = {
    'potemkina': {
        'name': 'Потемкина Ольга Владимировна',
        'specialty': 'терапевт',
        'experience_years': 19,
        'bio': 'Ведёт приём как врач-терапевт со стажем 19 лет.',
        'avatar': '/optimized/doctors/potemkina.webp',
        'base_service': ('Первичный приём терапевта', 2200),
    },
    'boboeva': {
        'name': 'Бобоева Наталья',
        'specialty': 'эндокринолог',
        'experience_years': None,
        'bio': 'Врач-эндокринолог. Работает с хроническими эндокринными заболеваниями.',
        'avatar': '/optimized/doctors/boboeva.webp',
        'base_service': ('Первичный приём эндокринолога', 2800),
    },
    'tregubova': {
        'name': 'Трегубова Лиана Игоревна',
        'specialty': 'диетолог',
        'experience_years': None,
        'bio': 'Врач-диетолог, специализируется на интегративной превентивной и антивозрастной медицине.',
        'avatar': '/optimized/doctors/tregubova.webp',
        'base_service': ('Первичный приём диетолога', 2200),
    },
}


def build():
    shutil.copyfile(TEMPLATE_PATH, OUTPUT_PATH)
    wb = openpyxl.load_workbook(OUTPUT_PATH)

    # --- Данные организации ---
    # Этот лист устроен вертикально: колонка A - подпись поля (не трогать),
    # колонка B - значение, ряд на ряд (5 полей = 5 строк), а не горизонтальная
    # таблица "заголовок + одна строка данных".
    ws = wb['Данные организации']
    ws['B1'] = ORGANIZATION['Название компании']
    ws['B2'] = ORGANIZATION['Название площадки']
    ws['B3'] = ORGANIZATION['Ссылка на сайт компании']
    ws['B4'] = ORGANIZATION['Электронная почта компании']
    ws['B5'] = ORGANIZATION['Ссылка на логотип компании']

    # --- Данные клиник ---
    ws = wb['Данные клиник']
    row = 2
    for clinic in CLINICS:
        ws.cell(row=row, column=1, value=clinic['Название клиники'])
        ws.cell(row=row, column=2, value=clinic['id'])
        ws.cell(row=row, column=3, value=SITE_URL)
        ws.cell(row=row, column=4, value='')
        ws.cell(row=row, column=5, value=clinic['Город клиники'])
        ws.cell(row=row, column=6, value=clinic['Адрес клиники'])
        ws.cell(row=row, column=7, value=PHONE)
        ws.cell(row=row, column=8, value='')
        ws.cell(row=row, column=9, value=clinic['id'])
        ws.cell(row=row, column=10, value=f'{SITE_URL}/logo-cube.png')
        row += 1

    services_ws = wb['Услуги']
    doctors_ws = wb['Врачи']
    srow = 2
    drow = 2

    def add_service(internal_id, name, description):
        nonlocal srow
        services_ws.cell(row=srow, column=1, value=name)
        services_ws.cell(row=srow, column=2, value='')
        services_ws.cell(row=srow, column=3, value=description)
        services_ws.cell(row=srow, column=4, value=internal_id)
        srow += 1

    def add_offer(doctor_id, service_name, price):
        nonlocal drow
        doc = DOCTORS[doctor_id]
        values = [
            doc['name'], doctor_id, f'{SITE_URL}/vrachi/{doctor_id}/',
            price, '', '', service_name, 'Да', f'{SITE_URL}/vrachi/{doctor_id}/',
            doc['bio'], doc['specialty'], f'{SITE_URL}{doc["avatar"]}',
            doc['experience_years'] if doc['experience_years'] else '',
            DYBENKO, '', '', '', '', '',
            'ИСТИНА', 'ЛОЖЬ',
            PHONE, 'ЛОЖЬ', 'ЛОЖЬ', 'ЛОЖЬ', 'ИСТИНА', 'ЛОЖЬ',
            doctor_id,
        ]
        for col, value in enumerate(values, start=1):
            doctors_ws.cell(row=drow, column=col, value=value)
        drow += 1

    # --- По одному стандартному приёму на врача - ровно то, что требует
    # Яндекс: "для каждого врача/клиники/специальности должно быть ровно одно
    # предложение с базовой услугой" ("Да" в соответствующей колонке).
    for doctor_id, doc in DOCTORS.items():
        name, price = doc['base_service']
        add_service(f'base_{doctor_id}', name, name)
        add_offer(doctor_id, name, price)

    # Опциональные листы содержат в шаблоне готовую строку-пример (фейковый врач
    # "Orlov-1" со ссылками на doctors.sample.s3.yandex.net) - мы их не используем,
    # но если оставить пример как есть, Яндекс попытается провалидировать его как
    # настоящую запись и отклонит по недопустимому домену картинки.
    for sheet_name in ('Отзывы о враче', 'Доп информация врача'):
        opt_ws = wb[sheet_name]
        for row in opt_ws.iter_rows(min_row=2, max_row=2):
            for cell in row:
                cell.value = None

    wb.save(OUTPUT_PATH)
    restore_xml_declarations(OUTPUT_PATH)
    print(f'Готово: {OUTPUT_PATH}')
    print(f'Услуг: {srow - 2}, строк-предложений: {drow - 2}')


if __name__ == '__main__':
    build()
