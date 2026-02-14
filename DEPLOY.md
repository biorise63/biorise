# Инструкция по деплою на Vercel через GitHub

## Процесс деплоя (простой способ):

### 1. Создайте репозиторий на GitHub

1. Зайдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий (например: `biorise-clinic`)
4. **НЕ** добавляйте README, .gitignore или лицензию (они уже есть)
5. Нажмите "Create repository"

### 2. Загрузите код на GitHub

В терминале выполните:

```bash
cd /Users/macbook/Desktop/biorise/biorise-clinic

# Инициализируйте git (если еще не сделано)
git init

# Добавьте все файлы
git add .

# Сделайте первый коммит
git commit -m "Initial commit: BIORISE clinic website"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/biorise-clinic.git

# Загрузите код
git branch -M main
git push -u origin main
```

### 3. Деплой на Vercel

#### Вариант A: Через веб-интерфейс (рекомендуется)

1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub аккаунт
3. Нажмите "Add New Project"
4. Выберите ваш репозиторий `biorise-clinic`
5. Vercel автоматически определит Next.js
6. **Важно**: В настройках Build Command оставьте `npm run build`
7. В Output Directory укажите `out` (так как у нас статический экспорт)
8. Нажмите "Deploy"

Vercel автоматически:
- Установит зависимости (`npm install`)
- Соберет проект (`npm run build`)
- Задеплоит сайт

#### Вариант B: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# В папке проекта
cd /Users/macbook/Desktop/biorise/biorise-clinic

# Запустите деплой
vercel

# Следуйте инструкциям
```

### 4. После деплоя

- Vercel даст вам URL типа: `https://biorise-clinic.vercel.app`
- Каждый push в GitHub автоматически обновит сайт
- Можно настроить кастомный домен в настройках проекта

## Важные моменты:

### ✅ Что уже настроено:

1. **Статический экспорт** (`output: 'export'`) - сайт будет полностью статическим
2. **Изображения** настроены как `unoptimized: true` для статического экспорта
3. **.gitignore** правильно настроен (игнорирует node_modules, .next, out)

### 📝 Что нужно проверить перед деплоем:

1. **Файлы шрифтов** - добавьте их в `public/fonts/` и закоммитьте
2. **Все изображения** должны быть в `public/`
3. **package.json** содержит все зависимости

### 🔄 Обновление сайта:

После каждого изменения:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически пересоберет и задеплоит сайт!

## Альтернатива: Обычный Next.js режим на Vercel

Если хотите использовать полный функционал Next.js (SSR, API routes), уберите `output: 'export'` из `next.config.js`:

```js
const nextConfig = {
  // output: 'export', // Уберите эту строку
  images: {
    unoptimized: true,
  },
}
```

Но для статического сайта текущая настройка идеальна!
