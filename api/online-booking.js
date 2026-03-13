/**
 * Простой эндпоинт для блока "ОНЛАЙН ЗАПИСЬ" на главной.
 * CommonJS — без ESM, чтобы Vercel не падал на "Unexpected token 'export'".
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8778719074:AAE2Heu3T6n3k70IudhohTIYLPxOwDHeG6I'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8282266025'

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' })
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials не настроены')
    return res.status(500).json({ success: false, message: 'Telegram не настроен' })
  }

  try {
    const data = req.body || {}

    if (!data.name || !data.phone || !data.address) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены',
      })
    }

    const message = [
      '🆕 <b>Новая онлайн-запись</b>',
      '',
      '👤 <b>Имя:</b> ' + data.name,
      '📞 <b>Телефон:</b> ' + data.phone,
      '📍 <b>Адрес клиники:</b> ' + data.address,
    ].join('\n')

    const url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Просмотрено', callback_data: 'booking_viewed' }],
            ],
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Telegram API ошибка:', response.status, errorText)
      }
    } catch (err) {
      console.error('Ошибка отправки запроса в Telegram:', err)
    }

    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  } catch (error) {
    console.error('Ошибка обработки онлайн-записи:', error)
    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  }
}
