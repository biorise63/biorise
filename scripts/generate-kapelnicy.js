const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const dataDir1 = path.join(projectRoot, 'data', 'kapelnicy')
const dataDir2 = path.join(projectRoot, 'data', 'kapelnicy2')
const outputPath = path.join(projectRoot, 'data', 'kapelnicy.generated.json')
const publicDir = path.join(projectRoot, 'public', 'kapelnicy')

const nameToPriceName = {
  'Капельница с витаминами': 'Витаминная',
  'Капельница Коктейль Майерса': 'Мультивитаминная',
  'Капельница при ОРВИ': 'Антивирус',
  'Капельница после ковида': 'Постковид',
  'Капельница «Детокс»': 'Детокс стандарт',
  'Капельница для печени': 'Детоксикация',
  'Капельница при отравлении': 'Детоксикация',
  'Капельница с Гептралом': 'Детоксикация',
  'Капельница от стресса и нервов': 'Антистресс',
  'Капельница для мозга': 'Брейнсторм',
  'Капельница для сердца': 'Здоровые сосуды',
  'Капельница для спортсменов': 'Спорт силовая',
  'Капельница для похудения': 'Снижение веса',
  'Капельница при диабете': 'Сахар в норме',
  'Капельница «Золушка»': 'Золушка (Красота и молодость)',
  'Капельница с глутатионом': 'Антиэйдж премиум',
  'Капельница с железом': 'Железо стандарт',
  'Капельница при беременности': 'Маме можно',
  'Капельница при аллергии': 'Антигистаминная',
  'Капельница с глюкозой': 'После вечеринки',
  'Капельница Лаеннек': 'Лаеннек',
  'Капельница Феринжект': 'Железо 2.0',
}

const fixedPrices = {
  'Айронмен': { price: '9 500 ₽', duration: '60 мин' },
  'Анти-климакс': { price: '5 000 ₽', duration: '60 мин' },
  'Антиаммиак': { price: '4 500 ₽', duration: '60 мин' },
  'Антивирус': { price: '4 000 ₽', duration: '60 мин' },
  'Антигистаминная': { price: '4 000 ₽', duration: '60 мин' },
  'Антиклимакс (альт.)': { price: '4 700 ₽', duration: '60 мин' },
  'Антимигрень': { price: '4 500 ₽', duration: '60 мин' },
  'Антиэйдж премиум': { price: '8 900 ₽', duration: '60 мин' },
  'Бархатная кожа': { price: '4 500 ₽', duration: '60 мин' },
  'Брейнсторм': { price: '5 400 ₽', duration: '60 мин' },
  'Бронхолегочная': { price: '4 500 ₽', duration: '60 мин' },
  'Витаминная': { price: '4 500 ₽', duration: '60 мин' },
  'Восстановление обоняния': { price: '3 500 ₽', duration: '60 мин' },
  'Гинекологическая противоспалительная': { price: '4 500 ₽', duration: '60 мин' },
  'Гипертонический криз': { price: '3 500 ₽', duration: '60 мин' },
  'Густые волосы': { price: '4 500 ₽', duration: '60 мин' },
  'Детокс + Актовегин + Мексидол': { price: '5 400 ₽', duration: '60 мин' },
  'Детокс + Актовегин + Мексидол (курс 5)': { price: '27 000 ₽' },
  'Детокс стандарт': { price: '3 950 ₽', duration: '60 мин' },
  'Детоксикация': { price: '4 300 ₽', duration: '60 мин' },
  'Джетлаг': { price: '4 300 ₽', duration: '60 мин' },
  'Железо 2.0': { price: '5 000 ₽', duration: '15 мин' },
  'Железо 5 шт.': { price: '10 060 ₽', duration: '60 мин' },
  'Железо стандарт': { price: '4 500 ₽', duration: '60 мин' },
  'ЖКТ 1': { price: '4 500 ₽', duration: '60 мин' },
  'ЖКТ 2': { price: '4 500 ₽', duration: '60 мин' },
  'Здоровые сосуды': { price: '4 500 ₽', duration: '60 мин' },
  'Иммунитет': { price: '4 900 ₽', duration: '60 мин' },
  'Иммуносуппорт': { price: '4 500 ₽', duration: '60 мин' },
  'Антистресс': { price: '3 900 ₽', duration: '60 мин' },
  'Золушка (Красота и молодость)': { price: '4 900 ₽', duration: '60 мин' },
  'Детокс + аскорбиновая кислота + глутатион': { price: '5 900 ₽' },
  'Детокс + аскорбиновая кислота + глутатион (курс)': { price: '29 500 ₽' },
  'Красота и молодость': { price: '4 500 ₽', duration: '60 мин' },
  'Лаеннек': { price: '9 500 ₽', duration: '60 мин' },
  'Маме можно': { price: '3 900 ₽', duration: '60 мин' },
  'Мужское здоровье': { price: '5 000 ₽', duration: '60 мин' },
  'Мультивитаминная': { price: '7 500 ₽', duration: '60 мин' },
  'Нет холестерину': { price: '3 500 ₽', duration: '60 мин' },
  'Подготовка к беременности': { price: '4 300 ₽', duration: '60 мин' },
  'Половая система': { price: '4 300 ₽', duration: '60 мин' },
  'После вечеринки': { price: '4 900 ₽', duration: '60 мин' },
  'Постковид': { price: '4 500 ₽', duration: '60 мин' },
  'Предоперационная': { price: '4 000 ₽', duration: '60 мин' },
  'Протеин буст': { price: '5 500 ₽', duration: '60 мин' },
  'Сахар в норме': { price: '4 600 ₽', duration: '60 мин' },
  'Снижение веса': { price: '4 900 ₽', duration: '60 мин' },
  'Спорт кардио': { price: '5 000 ₽', duration: '60 мин' },
  'Спорт силовая': { price: '6 000 ₽', duration: '60 мин' },
  'Стоматологическая противоспалительная': { price: '4 500 ₽', duration: '60 мин' },
  'Суставная противоспалительная': { price: '4 300 ₽', duration: '60 мин' },
  'Энергия +': { price: '3 900 ₽', duration: '60 мин' },
}

const sectionMap = {
  'показания': 'indications',
  'какие проблемы решает': 'indications',
  'действие': 'effect',
  'эффект': 'effect',
  'результат': 'effect',
  'противопоказания': 'contraindications',
  'состав': 'composition',
}

const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

const normalizeName = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .replace(/^[\d\s.]+/, '')
    .replace(/\.txt$/i, '')
    .replace(/[«»"“”]/g, '')
    .trim()

function loadIndex(dir) {
  const file = path.join(dir, 'index.json')
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function findTxtFile(entry, displayName) {
  const dirs = [dataDir1, dataDir2]
  if (entry.txt_file) {
    for (const dir of dirs) {
      const candidate = path.join(dir, entry.txt_file)
      if (fs.existsSync(candidate)) return candidate
    }
  }
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.txt'))
    for (const file of files) {
      const base = normalizeName(file)
      if (slugify(base) === slugify(displayName) || base.includes(normalizeName(displayName))) {
        return path.join(dir, file)
      }
    }
  }
  return null
}

function parseSections(lines) {
  const sections = {}
  let current = null
  const pushLine = (text) => {
    if (!current) return
    const key = current
    if (!sections[key]) sections[key] = []
    sections[key].push(text)
  }
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const lower = line.toLowerCase()
    const foundKey = Object.keys(sectionMap).find((k) => lower.startsWith(k))
    if (foundKey) {
      current = sectionMap[foundKey]
      continue
    }
    if (/^[-•*]\s*/.test(line)) {
      pushLine(line.replace(/^[-•*]\s*/, ''))
      continue
    }
    if (/^\d+[\).\s]/.test(line)) {
      pushLine(line.replace(/^\d+[\).\s]*/, ''))
      continue
    }
    if (current) pushLine(line)
  }
  return sections
}

function pickPriceDuration(displayName, entryTitle, entrySlug) {
  const keys = [displayName, entryTitle, entrySlug, slugify(displayName), slugify(entryTitle || '')]
  const priceName = nameToPriceName[displayName]
  if (priceName) keys.push(priceName, slugify(priceName))
  for (const key of keys) {
    if (fixedPrices[key]) return fixedPrices[key]
    if (fixedPrices[key?.toString().replace(/-/g, ' ')]) return fixedPrices[key.toString().replace(/-/g, ' ')]
  }
  return {}
}

function parseInfusion(entry) {
  const displayName = entry.title || entry.slug || 'Капельница'
  const txtPath = findTxtFile(entry, displayName)
  const priceInfo = pickPriceDuration(displayName, entry.title, entry.slug)

  if (!txtPath || !fs.existsSync(txtPath)) {
    return {
      id: slugify(displayName),
      title: displayName,
      description: 'Описание скоро будет',
      price: priceInfo.price,
      duration: priceInfo.duration,
    }
  }

  const raw = fs.readFileSync(txtPath, 'utf-8')
  const blacklist = [
    'записаться на приём',
    'записаться на прием',
    'я подтверждаю, что ознакомлен',
    'я подтверждаюсь, что ознакомлен',
    'даю согласие',
  ]
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !blacklist.some((b) => l.toLowerCase().includes(b)))

  const ignore = ['название:', 'ссылка:', 'главная', 'стоимость', 'время', 'описание', 'используем', 'действие', 'состав']
  const desc = lines.find((l) => l.length > 5 && !ignore.some((k) => l.toLowerCase().startsWith(k))) || 'Описание скоро будет'
  const details = lines.join('\n')
  const sections = parseSections(lines)

  let imageUrl
  const possibleExtensions = ['.png', '.jpg', '.jpeg', '.webp']
  for (const ext of possibleExtensions) {
    const existing = path.join(publicDir, `${entry.slug}${ext}`)
    if (fs.existsSync(existing)) {
      imageUrl = `/kapelnicy/${entry.slug}${ext}`
      break
    }
  }

  return {
    id: slugify(displayName),
    title: displayName,
    description: desc,
    price: priceInfo.price,
    duration: priceInfo.duration,
    imageUrl,
    details,
    ...sections,
  }
}

function main() {
  const index1 = loadIndex(dataDir1)
  const index2 = loadIndex(dataDir2)
  const all = [...index1, ...index2]
  const map = {}
  for (const entry of all) {
    if (!entry || !entry.slug) continue
    const infusion = parseInfusion(entry)
    // гарантируем, что title/description есть строками (JSON не хранит undefined)
    infusion.title = infusion.title || entry.title || entry.slug
    infusion.description = infusion.description || 'Описание скоро будет'
    map[entry.slug] = infusion
  }
  fs.writeFileSync(outputPath, JSON.stringify(map, null, 2), 'utf-8')
  console.log(`Generated ${Object.keys(map).length} infusions -> ${outputPath}`)
}

main()
