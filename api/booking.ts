/**
 * Vercel Serverless Function для обработки заявок с сайта
 * Интегрирует с Клиентикс CRM и отправляет уведомления в Telegram
 * 
 * Использование:
 * POST /api/booking
 * Body: {
 *   name: string,
 *   phone: string,
 *   email?: string,
 *   service: string,
 *   date: string,
 *   time: string
 * }
 */

// Vercel Serverless Function types
type VercelRequest = {
  method: string
  body: any
}

type VercelResponse = {
  status: (code: number) => VercelResponse
  json: (data: any) => void
}

interface BookingRequest {
  name: string
  phone: string
  email?: string
  service: string
  date: string
  time: string
  address?: string
}

interface KlientiksResponse {
  success: boolean
  message?: string
  client_id?: string
  visit_id?: string
}

/**
 * Добавление клиента в Клиентикс CRM
 */
async function addClientToKlientiks(data: BookingRequest): Promise<KlientiksResponse> {
  const {
    KLIENTIKS_ACCOUNT_ID,
    KLIENTIKS_USER_ID,
    KLIENTIKS_ACCESS_TOKEN,
  } = process.env

  if (!KLIENTIKS_ACCOUNT_ID || !KLIENTIKS_USER_ID || !KLIENTIKS_ACCESS_TOKEN) {
    throw new Error('Клиентикс CRM credentials не настроены')
  }

  // Нормализация телефона (убираем все кроме цифр)
  const phone = data.phone.replace(/\D/g, '')
  
  // Разделение ФИО (предполагаем формат "Имя Отчество Фамилия" или "Имя Фамилия")
  const nameParts = data.name.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const patronName = nameParts[1] || ''
  const secondName = nameParts[2] || nameParts[1] || ''

  const url = `https://klientiks.ru/clientix/Restapi/add/a/${KLIENTIKS_ACCOUNT_ID}/u/${KLIENTIKS_USER_ID}/m/Clients/`
  
  const params = new URLSearchParams({
    phone: phone,
    first_name: firstName,
    patron_name: patronName,
    second_name: secondName,
    email: data.email || '',
    lead_source: 'Сайт',
    appointment_confirmation_sms: '1',
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KLIENTIKS_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Клиентикс CRM ошибка: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return {
      success: true,
      client_id: result.id || result.client_id,
      message: 'Клиент успешно добавлен в CRM',
    }
  } catch (error) {
    console.error('Ошибка добавления клиента в Клиентикс CRM:', error)
    throw error
  }
}

/**
 * Добавление визита в Клиентикс CRM
 */
async function addVisitToKlientiks(
  data: BookingRequest,
  clientId: string
): Promise<KlientiksResponse> {
  const {
    KLIENTIKS_ACCOUNT_ID,
    KLIENTIKS_USER_ID,
    KLIENTIKS_ACCESS_TOKEN,
  } = process.env

  if (!KLIENTIKS_ACCOUNT_ID || !KLIENTIKS_USER_ID || !KLIENTIKS_ACCESS_TOKEN) {
    throw new Error('Клиентикс CRM credentials не настроены')
  }

  // Преобразование даты и времени в формат для CRM
  const visitDate = data.date // Формат: YYYY-MM-DD
  const visitTime = data.time // Формат: HH:MM
  
  // Маппинг услуг на ID услуг в Клиентикс (нужно настроить в вашей CRM)
  const serviceMapping: Record<string, string> = {
    detox: 'Детокс',
    immuno: 'Иммуно суппорт',
    energy: 'Энергия +',
    beauty: 'Красота и омоложение',
    consultation: 'Консультация',
  }
  
  const serviceName = serviceMapping[data.service] || data.service

  const url = `https://klientiks.ru/clientix/Restapi/add/a/${KLIENTIKS_ACCOUNT_ID}/u/${KLIENTIKS_USER_ID}/m/Visits/`
  
  const params = new URLSearchParams({
    client_id: clientId,
    date: visitDate,
    time: visitTime,
    service: serviceName,
    status: 'Запись с сайта',
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KLIENTIKS_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Клиентикс CRM ошибка: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return {
      success: true,
      visit_id: result.id || result.visit_id,
      message: 'Визит успешно добавлен в CRM',
    }
  } catch (error) {
    console.error('Ошибка добавления визита в Клиентикс CRM:', error)
    throw error
  }
}

/**
 * Отправка уведомления в Telegram
 */
async function sendTelegramNotification(data: BookingRequest, clientId?: string): Promise<void> {
  const envToken = process.env.TELEGRAM_BOT_TOKEN
  const envChatId = process.env.TELEGRAM_CHAT_ID

  const TELEGRAM_BOT_TOKEN = envToken || '8778719074:AAE2Heu3T6n3k70IudhohTIYLPxOwDHeG6I'
  const TELEGRAM_CHAT_ID = envChatId || '8282266025'

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials не настроены, пропускаем отправку')
    return
  }

  const serviceMapping: Record<string, string> = {
    detox: 'Детокс',
    immuno: 'Иммуно суппорт',
    energy: 'Энергия +',
    beauty: 'Красота и омоложение',
    consultation: 'Консультация',
  }

  const serviceName = data.service ? (serviceMapping[data.service] || data.service) : 'Не указана'

  const hasAddressOnly = !!data.address && !data.service && !data.date && !data.time

  const message = hasAddressOnly
    ? `
🆕 <b>Новая онлайн-запись</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
📍 <b>Адрес клиники:</b> ${data.address}
  `.trim()
    : `
🆕 <b>Новая заявка с сайта</b>

👤 <b>Клиент:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
${data.email ? `📧 <b>Email:</b> ${data.email}` : ''}
💼 <b>Услуга:</b> ${serviceName}
📅 <b>Дата:</b> ${data.date}
⏰ <b>Время:</b> ${data.time}
${clientId ? `🆔 <b>ID в CRM:</b> ${clientId}` : ''}
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
      throw new Error(`Telegram API ошибка: ${response.status} - ${errorText}`)
    }
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error)
    // Не прерываем выполнение, если Telegram не работает
  }
}

/**
 * Основной обработчик заявки
 */
async function handleBookingRequest(data: BookingRequest): Promise<{
  success: boolean
  message: string
  clientId?: string
  visitId?: string
}> {
  try {
    let clientId: string | undefined

    // 1. Добавляем клиента в Клиентикс CRM
    try {
      const clientResult = await addClientToKlientiks(data)
      if (clientResult.success && clientResult.client_id) {
        clientId = clientResult.client_id
      }
    } catch (error) {
      console.error('Не удалось добавить клиента в CRM:', error)
      // Продолжаем выполнение, даже если CRM не работает
    }

    // 2. Добавляем визит в Клиентикс CRM (если клиент добавлен)
    let visitId: string | undefined
    if (clientId) {
      try {
        const visitResult = await addVisitToKlientiks(data, clientId)
        if (visitResult.success && visitResult.visit_id) {
          visitId = visitResult.visit_id
        }
      } catch (error) {
        console.error('Не удалось добавить визит в CRM:', error)
      }
    }

    // 3. Отправляем уведомление в Telegram
    await sendTelegramNotification(data, clientId)

    return {
      success: true,
      message: 'Заявка успешно обработана',
      clientId,
      visitId,
    }
  } catch (error) {
    console.error('Ошибка обработки заявки:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Неизвестная ошибка',
    }
  }
}

/**
 * Vercel Serverless Function Handler
 */
export default async function bookingHandler(req: any, res: any) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' })
  }

  try {
    const data = req.body as Partial<BookingRequest> & { address?: string }

    const isSimpleOnlineBooking = !!data.address && !data.service && !data.date && !data.time

    if (isSimpleOnlineBooking) {
      if (!data.name || !data.phone || !data.address) {
        return res.status(400).json({
          success: false,
          message: 'Не все обязательные поля заполнены',
        })
      }

      await sendTelegramNotification(
        {
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          service: '',
          date: '',
          time: '',
          address: data.address,
        },
        undefined
      )

      return res.status(200).json({
        success: true,
        message: 'Заявка успешно отправлена',
      })
    }

    const fullData: BookingRequest = data as BookingRequest

    // Валидация обязательных полей для полной заявки
    if (!fullData.name || !fullData.phone || !fullData.service || !fullData.date || !fullData.time) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены',
      })
    }

    // Обработка заявки через CRM
    const result = await handleBookingRequest(fullData)

    return res.status(200).json(result)
  } catch (error) {
    console.error('Ошибка обработки запроса:', error)
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Внутренняя ошибка сервера',
    })
  }
}

