# BIORISE Самара - Премиальная клиника внутривенной терапии

Премиальный сайт для медицинской клиники BIORISE в Самаре.

## Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Framer Motion** - Анимации
- **Lenis** - Smooth scroll
- **Swiper** - Карусели

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Скопируйте изображения:

### Логотип
Логотип уже скопирован в `public/logo.svg`

### Изображения капельниц
Скопируйте изображения из `/Users/macbook/Desktop/biorise/1.2.4.1. Капельницы/` в `public/drips/` с переименованием:

- `1.2.4.1.1. Детокс.png` → `detox.png`
- `1.2.4.1.2. После вечеринки.png` → `after-party.png`
- `1.2.4.1.3. Здоровые сосуды.png` → `vessels.png`
- `1.2.4.1.4. Сахар в норме.png` → `sugar.png`
- `1.2.4.1.5. Иммуно суппорт.png` → `immuno.png`
- `1.2.4.1.6. Половая систем.png` → `reproductive.png`
- `1.2.4.1.7. Железо стандарт.png` → `iron.png`
- `1.2.4.1.8. Протеин буст.png` → `protein.png`
- `1.2.4.1.9. Энергия +.png` → `energy.png`
- `1.2.4.1_10. Антистресс+.png` → `antistress.png`
- `1.2.4.1_11. Брейнсторм.png` → `brainstorm.png`
- `1.2.4.1_12. Маме можно.png` → `mom.png`
- `1.2.4.1_13. Подготовка к беременности.png` → `pregnancy.png`
- `1.2.4.1_14. Джетлаг.png` → `jetlag.png`
- `1.2.4.1_15. Постковид.png` → `postcovid.png`
- `1.2.4.1_16. Спорт стандарт.png` → `sport.png`
- `1.2.4.1_17. Красота и омоложение.png` → `beauty.png`
- `1.2.4.1_18. Густые волосы.png` → `hair.png`
- `1.2.4.1_19. Снижение веса.png` → `weight.png`
- `1.2.4.1_20. Бархатная кожа.png` → `skin.png`
- `1.2.4.1_21. Лаеннек.png` → `laennec.png`
- `1.2.4.1_22. Много-компонентная витаминная.png` → `vitamins.png`
- `1.2.4.1_23. Антиэйдж премиум.png` → `antiage.png`
- `1.2.4.1_24. Айронмен.png` → `ironman.png`
- `1.2.4.1_25. Анти Климакс.png` → `menopause.png`

### Фото клиники
Скопируйте все изображения из `/Users/macbook/Desktop/biorise/Фото клиники снутри/` в `public/clinic/`:
- `photo_1_2026-02-13_19-22-15.jpg` → `photo_1.jpg`
- `photo_2_2026-02-13_19-22-15.jpg` → `photo_2.jpg`
- И так далее...

### Фото врачей
Добавьте фото врачей в `public/doctors/`:
- `doctor1.jpg`
- `doctor2.jpg`
- `doctor3.jpg`

### Hero изображение
Добавьте большое атмосферное фото клиники в `public/hero-bg.jpg`

## Запуск

### Режим разработки
```bash
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка статических файлов (создаст index.html)
```bash
npm run build
```
После сборки все статические HTML файлы (включая `index.html`) будут в папке `out/`.

Вы можете загрузить содержимое папки `out/` на любой статический хостинг (GitHub Pages, Netlify, Vercel и т.д.).

## Структура проекта

```
biorise-clinic/
├── app/
│   ├── globals.css      # Глобальные стили
│   ├── layout.tsx       # Корневой layout
│   └── page.tsx         # Главная страница
├── components/
│   ├── Header.tsx       # Шапка сайта
│   ├── Hero.tsx         # Первый экран
│   ├── PopularDrips.tsx # Капельницы
│   ├── WhyUs.tsx        # Почему нам доверяют
│   ├── Doctors.tsx      # Врачи
│   ├── ClinicGallery.tsx # Галерея клиники
│   ├── BookingForm.tsx  # Форма записи
│   ├── Footer.tsx       # Подвал
│   └── SmoothScrollProvider.tsx # Smooth scroll
├── public/              # Статические файлы
│   ├── logo.svg
│   ├── drips/
│   ├── clinic/
│   ├── doctors/
│   └── hero-bg.jpg
└── out/                 # Статические HTML файлы (после сборки)
    └── index.html       # Главная страница
```

## Цветовая палитра

- **Olive Primary**: `#5E6F52` - Основной оливковый
- **Light Olive**: `#7F8F70` - Светлый оливковый
- **Beige Background**: `#F3EFE6` - Фоновый беж
- **Warm Beige Accent**: `#E6D8C3` - Акцентный беж
- **Pure White**: `#FFFFFF` - Белый

## Типографика

- **Заголовки**: Cormorant Garamond (serif)
- **Основной текст**: Inter (sans-serif)

## Особенности

- ✅ Smooth scroll через Lenis
- ✅ Плавные анимации через Framer Motion
- ✅ Карусели для капельниц и галереи
- ✅ Адаптивный дизайн
- ✅ Премиальный визуальный стиль
- ✅ Минималистичный интерфейс
- ✅ Статический экспорт (можно деплоить на любой хостинг)

## Деплой на Vercel через GitHub

### Быстрый способ:

1. **Создайте репозиторий на GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/biorise-clinic.git
   git push -u origin main
   ```

2. **Деплой на Vercel**
   - Зайдите на [vercel.com](https://vercel.com)
   - Войдите через GitHub
   - Нажмите "Add New Project"
   - Выберите ваш репозиторий
   - **Важно**: В Output Directory укажите `out`
   - Нажмите "Deploy"

Vercel автоматически соберет и задеплоит сайт! Каждый push в GitHub будет автоматически обновлять сайт.

📖 **Подробная инструкция**: см. файл `DEPLOY.md`

### Альтернативные способы:

После выполнения `npm run build` папка `out/` содержит все статические файлы. Вы можете:

1. Загрузить содержимое `out/` на GitHub Pages
2. Загрузить на Netlify (drag & drop папку `out/`)
3. Загрузить на любой другой статический хостинг
