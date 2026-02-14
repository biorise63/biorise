# Инструкция по добавлению фирменных шрифтов

## Настройка завершена ✅

Шрифты настроены в проекте:
- **CeraPro Regular** - для меню (навигация)
- **HelveticaNeueCyr** - для всего текста (заголовки и основной текст)

## Что нужно сделать:

### 1. Добавьте файлы шрифтов

Поместите файлы шрифтов в папку `public/fonts/`:

#### Для CeraPro (меню):
- `CeraPro-Regular.woff2` (предпочтительно)
- `CeraPro-Regular.woff`
- `CeraPro-Regular.ttf`

#### Для HelveticaNeueCyr (текст):
- `HelveticaNeueCyr-Roman.woff2` (предпочтительно)
- `HelveticaNeueCyr-Roman.woff`
- `HelveticaNeueCyr-Roman.ttf`

### 2. Если имена файлов отличаются

Если ваши файлы имеют другие имена, обновите пути в файле `app/globals.css`:

```css
@font-face {
  font-family: 'CeraPro';
  src: url('/fonts/ВАШЕ_ИМЯ_ФАЙЛА.woff2') format('woff2'),
       url('/fonts/ВАШЕ_ИМЯ_ФАЙЛА.woff') format('woff'),
       url('/fonts/ВАШЕ_ИМЯ_ФАЙЛА.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 3. Проверка

После добавления файлов:
1. Перезапустите сервер разработки: `npm run dev`
2. Откройте сайт в браузере
3. Проверьте, что шрифты загружаются правильно (в DevTools → Network → Fonts)

### 4. Если файлов нет

Если у вас нет файлов шрифтов, можно:
- Использовать системные шрифты (уже настроены как fallback)
- Найти похожие шрифты на Google Fonts
- Использовать веб-версии шрифтов (если доступны)

## Текущая конфигурация:

- **Меню**: `font-menu` (CeraPro)
- **Текст и заголовки**: `font-body` / `font-heading` (HelveticaNeueCyr)

Все компоненты уже используют правильные классы шрифтов.
