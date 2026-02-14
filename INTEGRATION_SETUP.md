# Интеграция заявок с Клиентикс CRM и Telegram

## Описание

Система автоматически:
1. ✅ Добавляет клиента в Клиентикс CRM при отправке формы
2. ✅ Создает визит в Клиентикс CRM
3. ✅ Отправляет уведомление администратору в Telegram

## Настройка

### 1. Получение токенов Клиентикс CRM

1. Войдите в ваш аккаунт Клиентикс CRM
2. Перейдите в **Настройки → API**
3. Включите API и скопируйте:
   - **API ID аккаунта** (`account_id`)
   - **API ID пользователя** (`user_id`)
   - **API токен авторизации** (`access_token`)

### 2. Создание Telegram бота

1. Откройте Telegram и найдите бота [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите токен бота
4. Для получения `chat_id`:
   - Найдите бота [@userinfobot](https://t.me/userinfobot) и отправьте `/start`
   - Или используйте [@getidsbot](https://t.me/getidsbot)
   - Скопируйте ваш `chat_id` (число)

### 3. Настройка переменных окружения на Vercel

1. Перейдите в ваш проект на [Vercel](https://vercel.com)
2. Откройте **Settings → Environment Variables**
3. Добавьте следующие переменные:

```
KLIENTIKS_ACCOUNT_ID=ваш_account_id
KLIENTIKS_USER_ID=ваш_user_id
KLIENTIKS_ACCESS_TOKEN=ваш_access_token
TELEGRAM_BOT_TOKEN=ваш_bot_token
TELEGRAM_CHAT_ID=ваш_chat_id
```

4. Нажмите **Save**
5. Перезапустите деплоймент (Redeploy)

### 4. Настройка маппинга услуг

В файле `api/booking.ts` настройте соответствие услуг сайта и услуг в Клиентикс CRM:

```typescript
const serviceMapping: Record<string, string> = {
  detox: 'Детокс', // ID услуги в Клиентикс CRM
  immuno: 'Иммуно суппорт',
  energy: 'Энергия +',
  beauty: 'Красота и омоложение',
  consultation: 'Консультация',
}
```

**Важно:** Убедитесь, что названия услуг точно совпадают с названиями в вашей Клиентикс CRM.

## Тестирование

1. Заполните форму на сайте
2. Отправьте заявку
3. Проверьте:
   - ✅ Клиент появился в Клиентикс CRM
   - ✅ Визит создан в Клиентикс CRM
   - ✅ Уведомление пришло в Telegram

## Структура API

### Endpoint: `/api/booking`

**Метод:** `POST`

**Body:**
```json
{
  "name": "Иван Иванов",
  "phone": "+7 999 123 45 67",
  "email": "ivan@example.com",
  "service": "detox",
  "date": "2026-02-20",
  "time": "14:00"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Заявка успешно обработана",
  "clientId": "12345",
  "visitId": "67890"
}
```

## Обработка ошибок

Система работает устойчиво:
- Если Клиентикс CRM недоступен, заявка все равно отправляется в Telegram
- Если Telegram недоступен, клиент все равно добавляется в CRM
- Все ошибки логируются в консоль Vercel

## Документация API Клиентикс CRM

Полная документация: https://klientikscrm.helpdeskeddy.com/ru/knowledge_base/art/787/cat/62/metodi-api-klientiks-crm-v250428

## Поддержка

При возникновении проблем:
1. Проверьте логи в Vercel Dashboard → Functions
2. Убедитесь, что все переменные окружения настроены
3. Проверьте, что токены действительны
