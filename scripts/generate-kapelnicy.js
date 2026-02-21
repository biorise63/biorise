const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const dataDir1 = path.join(projectRoot, 'data', 'kapelnicy')
const dataDir2 = path.join(projectRoot, 'data', 'kapelnicy2')
const outputPath = path.join(projectRoot, 'data', 'kapelnicy.generated.json')
const publicDir = path.join(projectRoot, 'public', 'kapelnicy')

// slug на сайте (должен совпадать с app/kapelnicy/page.tsx -> nameToSlug)
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

// для новых уникальных карточек фото берём от базового slug
const imageFallbackBySlug = {
  'detoksikatsiya-pechen': 'detoksikatsiya',
  'detoksikatsiya-otravlenie': 'detoksikatsiya',
  'detoksikatsiya-geptral': 'detoksikatsiya',
}

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
  'Спорт кардио': 'Спорт кардио',
  'Капельница для похудения': 'Снижение веса',
  'Капельница при диабете': 'Сахар в норме',
  'Капельница «Золушка»': 'Золушка (Красота и молодость)',
  'Капельница с глутатионом': 'Антиэйдж премиум',
  'Капельница с железом': 'Железо стандарт',
  'Капельница при беременности': 'Маме можно',
  'Капельница при аллергии': 'Антигистаминная',
  'Половая система': 'Половая система',
  'Мужское здоровье': 'Мужское здоровье',
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
  // 1) СНАЧАЛА пытаемся найти по названию в kapelnicy2 (новые файлы)
  if (displayName && fs.existsSync(dataDir2)) {
    const files = fs.readdirSync(dataDir2).filter((f) => f.toLowerCase().endsWith('.txt'))
    for (const file of files) {
      const base = normalizeName(file)
      if (slugify(base) === slugify(displayName) || base.includes(normalizeName(displayName))) {
        return path.join(dataDir2, file)
      }
    }
  }

  // 2) Потом по txt_file из старого индекса (kapelnicy)
  if (entry && entry.txt_file) {
    const candidate = path.join(dataDir1, entry.txt_file)
    if (fs.existsSync(candidate)) return candidate
  }

  // 3) И в конце — поиск по названию в kapelnicy (старые файлы)
  if (displayName && fs.existsSync(dataDir1)) {
    const files = fs.readdirSync(dataDir1).filter((f) => f.toLowerCase().endsWith('.txt'))
    for (const file of files) {
      const base = normalizeName(file)
      if (slugify(base) === slugify(displayName) || base.includes(normalizeName(displayName))) {
        return path.join(dataDir1, file)
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
  const priceName = nameToPriceName[displayName] || nameToPriceName[entryTitle] || displayName
  return fixedPrices[priceName] || {}
}

function parseInfusion(entry) {
  // На карточке показываем "маркетинговое" имя (как в списке категорий)
  const displayName = entry.name || entry.title || entry.slug || 'Капельница'
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

  // краткое описание: берём строго из поля "краткое описание:"
  const shortLine = lines.find((l) => l.toLowerCase().startsWith('краткое описание'))
  const desc =
    (shortLine && shortLine.split(':').slice(1).join(':').trim()) ||
    'Описание скоро будет'
  const details = lines.join('\n')
  const sections = parseSections(lines)

  let imageUrl
  const possibleExtensions = ['.png', '.jpg', '.jpeg', '.webp']
  const primarySlug = entry.slug || slugify(displayName)
  const fallbackSlug = imageFallbackBySlug[primarySlug] || primarySlug
  const candidates = [primarySlug, fallbackSlug]
  for (const slug of candidates) {
    for (const ext of possibleExtensions) {
      const existing = path.join(publicDir, `${slug}${ext}`)
      if (fs.existsSync(existing)) {
        imageUrl = `/kapelnicy/${slug}${ext}`
        break
      }
    }
    if (imageUrl) break
  }
  // Debug: если slug есть, но изображение не найдено, попробуем напрямую
  if (!imageUrl && entry.slug) {
    const directPath = path.join(publicDir, `${entry.slug}.png`)
    if (fs.existsSync(directPath)) {
      imageUrl = `/kapelnicy/${entry.slug}.png`
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
  // в codex2 другой формат index.json: { name, file, category, url }
  const allCodex2 = Array.isArray(index2) && index2.length && index2[0].file ? index2 : []
  const allCodex1 = Array.isArray(index1) && index1.length && index1[0].txt_file ? index1 : []
  const map = {}
  // 1) Генерим по codex2 — это источники "как на сайте"
  for (const entry of allCodex2) {
    const name = entry.name
    const slug = nameToSlug[name] || slugify(name)
    const filePath = path.join(dataDir2, entry.file)
    const infusion = parseInfusion({ ...entry, slug, txt_file: entry.file })
    // Убедимся, что slug передаётся правильно
    if (!infusion.imageUrl && slug) {
      const directPath = path.join(publicDir, `${slug}.png`)
      if (fs.existsSync(directPath)) {
        infusion.imageUrl = `/kapelnicy/${slug}.png`
      }
    }
    infusion.title = name
    map[slug] = infusion
  }
  // 2) Добираем оставшиеся из codex1 по slug (если вдруг чего-то нет в codex2)
  for (const entry of allCodex1) {
    if (!entry || !entry.slug) continue
    if (map[entry.slug]) continue
    const infusion = parseInfusion(entry)
    infusion.title = infusion.title || entry.title || entry.slug
    infusion.description = infusion.description || 'Описание скоро будет'
    map[entry.slug] = infusion
  }
  fs.writeFileSync(outputPath, JSON.stringify(map, null, 2), 'utf-8')
  console.log(`Generated ${Object.keys(map).length} infusions -> ${outputPath}`)
}

main()
