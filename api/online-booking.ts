/**
 * Простой эндпоинт для блока "ОНЛАЙН ЗАПИСЬ" на главной.
 * НЕ трогает CRM, только шлёт уведомление в Telegram.
 */

interface OnlineBookingRequest {
  name: string
  phone: string
  address: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' })
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env

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
      return res.status(500).json({
        success: false,
        message: 'Ошибка отправки уведомления в Telegram',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  } catch (error) {
    console.error('Ошибка обработки онлайн-записи:', error)
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    })
  }
}

