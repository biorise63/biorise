/**
 * Вебхук для Telegram бота.
 * Используется для обработки нажатия inline-кнопки "Просмотрено"
 * и удаления кнопки из сообщения.
 */

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, description: 'Method not allowed' })
  }

  const envToken = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_BOT_TOKEN = envToken || '8778719074:AAE2Heu3T6n3k70IudhohTIYLPxOwDHeG6I'

  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN не настроен')
    return res.status(500).json({ ok: false, description: 'Bot token not configured' })
  }

  const update = req.body

  // Интересуют только callback_query от нажатия кнопки
  if (!update || !update.callback_query) {
    return res.status(200).json({ ok: true })
  }

  const callback = update.callback_query
  const callbackData = callback.data
  const message = callback.message

  if (!message || callbackData !== 'booking_viewed') {
    return res.status(200).json({ ok: true })
  }

  const chatId = message.chat.id
  const messageId = message.message_id
  const callbackQueryId = callback.id

  const apiBase = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

  try {
    // Отвечаем на callback, чтобы в Telegram пропало "Часы" на кнопке
    await fetch(`${apiBase}/answerCallbackQuery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: 'Отмечено как просмотренное',
        show_alert: false,
      }),
    })

    // Удаляем inline-клавиатуру у сообщения
    await fetch(`${apiBase}/editMessageReplyMarkup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      }),
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Ошибка обработки callback_query Telegram:', error)
    return res.status(500).json({ ok: false, description: 'Internal error' })
  }
}

// Экспорт для Vercel Serverless Function в CommonJS
module.exports = handler

