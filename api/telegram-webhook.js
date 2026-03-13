/**
 * Вебхук для Telegram бота. Обработка кнопки "Просмотрено" — убирает кнопку.
 * CommonJS для Vercel.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8778719074:AAE2Heu3T6n3k70IudhohTIYLPxOwDHeG6I'

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, description: 'Method not allowed' })
  }

  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN не настроен')
    return res.status(500).json({ ok: false, description: 'Bot token not configured' })
  }

  const update = req.body || {}
  if (!update.callback_query) return res.status(200).json({ ok: true })

  const callback = update.callback_query
  if (callback.data !== 'booking_viewed' || !callback.message) return res.status(200).json({ ok: true })

  const chatId = callback.message.chat.id
  const messageId = callback.message.message_id
  const callbackQueryId = callback.id
  const apiBase = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN

  try {
    await fetch(apiBase + '/answerCallbackQuery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text: 'Отмечено как просмотренное', show_alert: false }),
    })
    await fetch(apiBase + '/editMessageReplyMarkup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } }),
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Ошибка обработки callback_query Telegram:', error)
    return res.status(500).json({ ok: false, description: 'Internal error' })
  }
}
