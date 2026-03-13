/**
 * Простой эндпоинт для блока "ОНЛАЙН ЗАПИСЬ" на главной.
 * НЕ трогает CRM, только шлёт уведомление в Telegram.
 */

interface OnlineBookingRequest {
  name: string
  phone: string
  address: string
}

export default async function onlineBookingHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' })
  }

  const envToken = process.env.TELEGRAM_BOT_TOKEN
  const envChatId = process.env.TELEGRAM_CHAT_ID

  const TELEGRAM_BOT_TOKEN = envToken || '8778719074:AAE2Heu3T6n3k70IudhohTIYLPxOwDHeG6I'
  const TELEGRAM_CHAT_ID = envChatId || '8282266025'

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials не настроены')
    return res.status(500).json({ success: false, message: 'Telegram не настроен' })
  }

  try {
    const data: OnlineBookingRequest = req.body

    if (!data.name || !data.phone || !data.address) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены',
      })
    }

    const message = `
🆕 <b>Новая онлайн-запись</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
📍 <b>Адрес клиники:</b> ${data.address}
    `.trim()

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Просмотрено',
                  callback_data: 'booking_viewed',
                },
              ],
            ],
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Telegram API ошибка:', response.status, errorText)
        // Не ломаем форму для клиента, даже если Telegram не ответил
      }
    } catch (error) {
      console.error('Ошибка отправки запроса в Telegram:', error)
      // Тоже не ломаем форму
    }

    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  } catch (error) {
    console.error('Ошибка обработки онлайн-записи:', error)
    // Для пользователя не показываем ошибку, даже если что-то пошло не так
    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  }
}

