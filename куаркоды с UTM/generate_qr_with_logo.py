#!/usr/bin/env python3
import qrcode
from PIL import Image, ImageDraw, ImageFont
import os

# URL сайта с UTM-меткой для VK
url = "https://biorise-clinic.ru/?utm_source=vk"

# Создаем QR-код БЕЗ изображения в центре для лучшей читаемости
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_M,  # Средняя коррекция ошибок (достаточно)
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Создаем изображение QR-кода
qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

# Размеры QR-кода
qr_width, qr_height = qr_img.size

# Загружаем логотип для размещения внизу
logo_path = "/Users/macbook/Desktop/biorise/biorise-clinic/куаркоды с UTM/logo-biorise.png"
logo = Image.open(logo_path)

# Размеры для рамки
border_width = 20  # Толщина рамки
corner_radius = 20  # Радиус закругления углов
logo_area_height = 80  # Высота области для логотипа внизу

# Размеры итогового изображения
final_width = qr_width + border_width * 2
final_height = qr_height + border_width * 2 + logo_area_height

# Создаем итоговое изображение с белым фоном
final_img = Image.new('RGB', (final_width, final_height), 'white')
draw = ImageDraw.Draw(final_img)

# Рисуем закругленную рамку
def draw_rounded_rectangle(draw, xy, radius, outline=None, width=1):
    """Рисует закругленный прямоугольник"""
    x1, y1, x2, y2 = xy
    # Верхняя линия
    draw.rectangle([x1 + radius, y1, x2 - radius, y1 + width], fill=outline)
    # Нижняя линия
    draw.rectangle([x1 + radius, y2 - width, x2 - radius, y2], fill=outline)
    # Левая линия
    draw.rectangle([x1, y1 + radius, x1 + width, y2 - radius], fill=outline)
    # Правая линия
    draw.rectangle([x2 - width, y1 + radius, x2, y2 - radius], fill=outline)
    # Углы (квадраты для простоты)
    draw.rectangle([x1, y1, x1 + radius, y1 + radius], fill=outline)
    draw.rectangle([x2 - radius, y1, x2, y1 + radius], fill=outline)
    draw.rectangle([x1, y2 - radius, x1 + radius, y2], fill=outline)
    draw.rectangle([x2 - radius, y2 - radius, x2, y2], fill=outline)

# Рисуем рамку
frame_thickness = 3
draw_rounded_rectangle(draw, 
                 (border_width - frame_thickness, border_width - frame_thickness, 
                  final_width - border_width + frame_thickness, final_height - border_width + frame_thickness),
                 corner_radius, 
                 outline='black', 
                 width=frame_thickness)

# Размещаем QR-код внутри рамки
qr_pos = (border_width, border_width)
final_img.paste(qr_img, qr_pos)

# Подготавливаем логотип для размещения внизу
logo_width = final_width - border_width * 2 - 20
logo_aspect = logo.size[0] / logo.size[1]
logo_height = int(logo_width / logo_aspect)

# Если логотип слишком высокий, уменьшаем по высоте
if logo_height > logo_area_height - 10:
    logo_height = logo_area_height - 10
    logo_width = int(logo_height * logo_aspect)

logo_resized = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# Размещаем логотип внизу по центру
logo_x = (final_width - logo_width) // 2
logo_y = qr_height + border_width * 2 + (logo_area_height - logo_height) // 2
final_img.paste(logo_resized, (logo_x, logo_y))

# Изменяем размер итогового изображения до 525x525
target_size = 525
final_img = final_img.resize((target_size, target_size), Image.Resampling.LANCZOS)

# Сохраняем
output_path = "/Users/macbook/Desktop/biorise/biorise-clinic/куаркоды с UTM/qr-code-with-logo.png"
final_img.save(output_path)
print(f"QR-код с рамкой и логотипом создан: {output_path}")
print(f"URL: {url}")
print(f"Размер: {target_size}x{target_size}")
