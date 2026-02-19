#!/usr/bin/env python3
import qrcode
from PIL import Image

# URL сайта
url = "https://biorise-clinic.ru"

# Создаем QR-код
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Создаем изображение
img = qr.make_image(fill_color="black", back_color="white")

# Сохраняем
img.save("qr-code-biorise.png")
print(f"QR-код создан: qr-code-biorise.png")
print(f"URL: {url}")
