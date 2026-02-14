#!/bin/bash

# Скрипт для копирования изображений

# Создаем директории
mkdir -p public/drips public/clinic public/doctors

# Копируем изображения капельниц
SOURCE_DRIPS="/Users/macbook/Desktop/biorise/1.2.4.1. Капельницы"
DEST_DRIPS="public/drips"

if [ -d "$SOURCE_DRIPS" ]; then
  echo "Копирование изображений капельниц..."
  cp "$SOURCE_DRIPS/1.2.4.1.1. Детокс.png" "$DEST_DRIPS/detox.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1.2. После вечеринки.png" "$DEST_DRIPS/after-party.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1.3. Здоровые сосуды.png" "$DEST_DRIPS/vessels.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1.5. Иммуно суппорт.png" "$DEST_DRIPS/immuno.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1.9. Энергия +.png" "$DEST_DRIPS/energy.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1_10. Антистресс+.png" "$DEST_DRIPS/antistress.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1_17. Красота и омоложение.png" "$DEST_DRIPS/beauty.png" 2>/dev/null
  cp "$SOURCE_DRIPS/1.2.4.1_16. Спорт стандарт.png" "$DEST_DRIPS/sport.png" 2>/dev/null
  echo "Готово!"
else
  echo "Папка с капельницами не найдена: $SOURCE_DRIPS"
fi

# Копируем фото клиники
SOURCE_CLINIC="/Users/macbook/Desktop/biorise/Фото клиники снутри"
DEST_CLINIC="public/clinic"

if [ -d "$SOURCE_CLINIC" ]; then
  echo "Копирование фото клиники..."
  cd "$SOURCE_CLINIC"
  counter=1
  for file in photo_*.jpg; do
    if [ -f "$file" ]; then
      cp "$file" "../../biorise-clinic/$DEST_CLINIC/photo_$counter.jpg"
      counter=$((counter + 1))
    fi
  done
  cd - > /dev/null
  echo "Готово!"
else
  echo "Папка с фото клиники не найдена: $SOURCE_CLINIC"
fi

echo "Копирование завершено!"
