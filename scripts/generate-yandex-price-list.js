const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

// Читаем данные капельниц
const generatedDataPath = path.join(__dirname, '../data/kapelnicy.generated.json')
const infusions = JSON.parse(fs.readFileSync(generatedDataPath, 'utf-8'))

// Маппинг названий к slug (из app/kapelnicy/page.tsx)
const nameToSlug = {
  'Капельница с витаминами': 'vitaminnaya',
  'Капельница Коктейль Майерса': 'multivitaminnaya',
  'Капельница при ОРВИ': 'antivirus',
  'Капельница после ковида': 'postkovid',
  'Капельница «Детокс»': 'detoks-standart',
  'Капельница для печени': 'detoksikatsiya-pechen',
  'Капельница при отравлении': 'detoksikatsiya-otravlenie',
  'Капельница с Гептралом': 'detoksikatsiya-geptral',
  'Капельница от стресса и нервов': 'antistress',
  'Капельница для мозга': 'breynstorm',
  'Капельница для сердца': 'zdorovye-sosudy',
  'Спорт силовая': 'sport-silovaya',
  'Спорт кардио': 'sport-kardio',
  'Протеин буст': 'protein-bust',
  'Капельница для похудения': 'snizhenie-vesa',
  'Капельница при диабете': 'sahar-v-norme',
  'Капельница «Золушка»': 'krasota-i-omolozhenie',
  'Капельница с глутатионом': 'antieydzh-premium',
  'Капельница с железом': 'zhelezo-standart',
  'Капельница при беременности': 'mame-mozhno',
  'Капельница при аллергии': 'antigistaminnaya',
  'Половая система': 'polovaya-sistema',
  'Мужское здоровье': 'muzhskoe-zdorove',
  'Капельница с глюкозой': 'posle-vecherinki',
  'Капельница Лаеннек': 'laennek',
  'Капельница Феринжект': 'zhelezo-2-0',
}

// Маппинг категорий (из app/kapelnicy/page.tsx)
const categoriesConfig = [
  {
    title: 'Иммунитет и восстановление',
    items: ['Капельница с витаминами', 'Капельница Коктейль Майерса', 'Капельница при ОРВИ', 'Капельница после ковида'],
  },
  {
    title: 'Детокс и печень',
    items: ['Капельница «Детокс»', 'Капельница для печени', 'Капельница при отравлении', 'Капельница с Гептралом'],
  },
  {
    title: 'Нервная система и мозг',
    items: ['Капельница от стресса и нервов', 'Капельница для мозга'],
  },
  {
    title: 'Сердце и сосуды',
    items: ['Капельница для сердца'],
  },
  {
    title: 'Энергия и спорт',
    items: ['Спорт силовая', 'Спорт кардио', 'Протеин буст'],
  },
  {
    title: 'Обмен веществ и вес',
    items: ['Капельница для похудения', 'Капельница при диабете'],
  },
  {
    title: 'Красота и Anti-Age',
    items: ['Капельница «Золушка»', 'Капельница с глутатионом', 'Капельница с железом'],
  },
  {
    title: 'Беременность',
    items: ['Капельница при беременности'],
  },
  {
    title: 'Аллергия',
    items: ['Капельница при аллергии'],
  },
  {
    title: 'Половая система',
    items: ['Половая система', 'Мужское здоровье'],
  },
  {
    title: 'Дополнительные капельницы',
    items: ['Капельница с глюкозой', 'Капельница Лаеннек', 'Капельница Феринжект'],
  },
]

// Создаем обратный маппинг: slug -> категория
const slugToCategory = {}
categoriesConfig.forEach(cat => {
  cat.items.forEach(itemName => {
    const slug = nameToSlug[itemName]
    if (slug) {
      slugToCategory[slug] = cat.title
    }
  })
})

// Функция для получения категории по slug
function getCategory(slug) {
  return slugToCategory[slug] || 'Другое'
}

// Функция для извлечения числовой цены из строки "4 500 ₽"
function extractPrice(priceStr) {
  if (!priceStr) return ''
  const match = priceStr.match(/[\d\s]+/)
  if (match) {
    return match[0].replace(/\s/g, '')
  }
  return ''
}

// Функция для получения URL фото
function getPhotoUrl(imageUrl) {
  if (!imageUrl) return ''
  // Если это относительный путь, нужно сделать полный URL
  // Для Яндекс.Организаций нужен публичный URL
  // Пока оставляем как есть, пользователь может заменить на полные URL
  return imageUrl.startsWith('http') ? imageUrl : `https://biorise-clinic.ru${imageUrl}`
}

// Подготовка данных для XLS
const rows = [
  ['Категория', 'Название', 'Идентификатор', 'Описание', 'Короткое описание', 'Цена', 'Фото', 'Популярный товар', 'В наличии', 'Количество', 'Единицы измерения', 'Ссылка']
]

// Обрабатываем каждую капельницу
Object.entries(infusions).forEach(([slug, infusion]) => {
  const category = getCategory(slug)
  const title = infusion.title || ''
  const identifier = slug // Используем slug как идентификатор
  const description = '' // Поле "Описание" оставляем пустым
  const shortDescription = (infusion.description || '').substring(0, 200) // Ограничиваем короткое описание
  const price = extractPrice(infusion.price || '')
  const photo = getPhotoUrl(infusion.imageUrl || '')
  const isPopular = 'Нет' // Можно настроить позже
  const inStock = 'Да'
  const quantity = '' // Оставляем пустым для услуг
  const unit = '' // Оставляем пустым для услуг
  const link = `https://biorise-clinic.ru/kapelnicy#${slug}`

  rows.push([
    category,
    title,
    identifier,
    description,
    shortDescription,
    price,
    photo,
    isPopular,
    inStock,
    quantity,
    unit,
    link
  ])
})

// Создаем рабочую книгу
const wb = XLSX.utils.book_new()
const ws = XLSX.utils.aoa_to_sheet(rows)

// Настраиваем ширину колонок
ws['!cols'] = [
  { wch: 25 }, // Категория
  { wch: 35 }, // Название
  { wch: 20 }, // Идентификатор
  { wch: 60 }, // Описание
  { wch: 40 }, // Короткое описание
  { wch: 10 }, // Цена
  { wch: 50 }, // Фото
  { wch: 15 }, // Популярный товар
  { wch: 12 }, // В наличии
  { wch: 12 }, // Количество
  { wch: 20 }, // Единицы измерения
  { wch: 40 }  // Ссылка
]

XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

// Сохраняем файл
const outputPath = path.join(__dirname, '../yandex-price-list.xls')
XLSX.writeFile(wb, outputPath, { bookType: 'xls' })

console.log(`✅ Создан файл: ${outputPath}`)
console.log(`📊 Всего капельниц: ${rows.length - 1}`)
