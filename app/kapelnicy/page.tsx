import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfusionPageLayout from '@/components/kapelnicy/InfusionPageLayout'
import CategorySection from '@/components/kapelnicy/CategorySection'

type IndexEntry = {
  slug: string
  title: string
  txt_file: string
  images?: string[]
}

type InfusionItem = {
  id: string
  title: string
  description: string
  price?: string
  duration?: string
  imageUrl?: string
  details?: string
  indications?: string[]
  effect?: string[]
  contraindications?: string[]
  composition?: string[]
}

const categoriesConfig = [
  {
    title: 'Иммунитет и восстановление',
    icon: 'shield',
    items: ['Капельница с витаминами', 'Капельница Коктейль Майерса', 'Капельница при ОРВИ', 'Капельница после ковида'],
  },
  {
    title: 'Детокс и печень',
    icon: 'leaf',
    items: ['Капельница «Детокс»', 'Капельница для печени', 'Капельница при отравлении', 'Капельница с Гептралом'],
  },
  {
    title: 'Нервная система и мозг',
    icon: 'brain',
    items: ['Капельница от стресса и нервов', 'Капельница для мозга'],
  },
  {
    title: 'Сердце и сосуды',
    icon: 'heart',
    items: ['Капельница для сердца', 'Капельница для мозга'],
  },
  {
    title: 'Энергия и спорт',
    icon: 'bolt',
    items: ['Капельница для спортсменов'],
  },
  {
    title: 'Обмен веществ и вес',
    icon: 'scale',
    items: ['Капельница для похудения', 'Капельница при диабете'],
  },
  {
    title: 'Красота и Anti-Age',
    icon: 'star',
    items: ['Капельница «Золушка»', 'Капельница с глутатионом', 'Капельница с железом'],
  },
  {
    title: 'Беременность',
    icon: 'baby',
    items: ['Капельница при беременности'],
  },
  {
    title: 'Аллергия',
    icon: 'alert',
    items: ['Капельница при аллергии'],
  },
  {
    title: 'Дополнительные капельницы',
    icon: 'plus',
    items: ['Капельница с глюкозой', 'Капельница Лаеннек', 'Капельница Феринжект'],
  },
]

const nameToSlug: Record<string, string> = {
  'Капельница с витаминами': 'vitaminnaya',
  'Капельница Коктейль Майерса': 'multivitaminnaya',
  'Капельница при ОРВИ': 'antivirus',
  'Капельница после ковида': 'postkovid',
  'Капельница «Детокс»': 'detoks-standart',
  'Капельница для печени': 'detoksikatsiya',
  'Капельница при отравлении': 'detoksikatsiya',
  'Капельница с Гептралом': 'detoksikatsiya',
  'Капельница от стресса и нервов': 'antistress',
  'Капельница для мозга': 'breynstorm',
  'Капельница для сердца': 'zdorovye-sosudy',
  'Капельница для спортсменов': 'sport-silovaya',
  'Капельница для похудения': 'snizhenie-vesa',
  'Капельница при диабете': 'sahar-v-norme',
  'Капельница «Золушка»': 'krasota-i-omolozhenie',
  'Капельница с глутатионом': 'antieydzh-premium',
  'Капельница с железом': 'zhelezo-standart',
  'Капельница при беременности': 'mame-mozhno',
  'Капельница при аллергии': 'antigistaminnaya',
  'Капельница с глюкозой': 'posle-vecherinki',
  'Капельница Лаеннек': 'laennek',
  'Капельница Феринжект': 'zhelezo-2-0',
}

// Маппинг названий капельниц на названия в прайсе
const nameToPriceName: Record<string, string> = {
  'Капельница с витаминами': 'Витаминная',
  'Капельница Коктейль Майерса': 'Мультивитаминная',
  'Капельница при ОРВИ': 'Антивирус',
  'Капельница после ковида': 'Постковид',
  'Капельница «Детокс»': 'Детокс стандарт',
  'Капельница для печени': 'Детоксикация',
  'Капельница при отравлении': 'Детоксикация',
  'Капельница с Гептралом': 'Детоксикация',
  'Капельница от стресса и нервов': 'Капельница "Антистресс"',
  'Капельница для мозга': 'Брейнсторм',
  'Капельница для сердца': 'Здоровые сосуды',
  'Капельница для спортсменов': 'Спорт силовая',
  'Капельница для похудения': 'Снижение веса',
  'Капельница при диабете': 'Сахар в норме',
  'Капельница «Золушка»': 'Капельница "Золушка" (Красота и молодость)',
  'Капельница с глутатионом': 'Антиэйдж премиум',
  'Капельница с железом': 'Железо стандарт',
  'Капельница при беременности': 'Маме можно',
  'Капельница при аллергии': 'Антигистаминная',
  'Капельница с глюкозой': 'После вечеринки',
  'Капельница Лаеннек': 'Лаеннек',
  'Капельница Феринжект': 'Железо 2.0',
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

const projectRoot = process.cwd()
// Пробуем сначала локальную папку, потом папку в репозитории
const codexDirLocal = path.resolve(projectRoot, '..', 'капельницы codex')
const codexDirRepo = path.join(projectRoot, 'data', 'kapelnicy')
const codexDir = fs.existsSync(codexDirLocal) ? codexDirLocal : codexDirRepo
const imagesDir = path.join(codexDir, 'images')
const publicDir = path.join(projectRoot, 'public', 'kapelnicy')
const priceCsv = path.resolve(projectRoot, '..', 'ПРАЙС услуги', 'Прайс Капельницы.csv')
// Пробуем сначала локальный файл, потом файл в репозитории
const durationTxtLocal = '/Users/macbook/Downloads/Telegram Desktop/test_image (2).txt'
const durationTxtRepo = path.join(projectRoot, 'data', 'kapelnicy', 'durations.txt')
const durationTxt = fs.existsSync(durationTxtLocal) ? durationTxtLocal : durationTxtRepo

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function loadPriceMap() {
  const map: Record<string, { price?: string; duration?: string }> = {}
  if (!fs.existsSync(priceCsv)) return map
  
  try {
    // Используем Python для чтения cp1251, так как Node.js не поддерживает эту кодировку
    const pythonScript = `
import csv
import json
import sys
from pathlib import Path

csv_path = sys.argv[1]
result = {}

try:
    with open(csv_path, 'r', encoding='cp1251') as f:
        reader = csv.reader(f, delimiter=';')
        rows = list(reader)
        if not rows:
            print(json.dumps(result))
            sys.exit(0)
        
        header = rows[0]
        name_idx = next((i for i, h in enumerate(header) if 'название' in h.lower()), -1)
        price_idx = next((i for i, h in enumerate(header) if 'стоимость' in h.lower()), -1)
        dur_idx = next((i for i, h in enumerate(header) if 'длительность' in h.lower()), -1)
        
        if name_idx == -1 or price_idx == -1 or dur_idx == -1:
            print(json.dumps(result))
            sys.exit(0)
        
        for row in rows[1:]:
            if len(row) <= max(name_idx, price_idx, dur_idx):
                continue
            name = row[name_idx].strip() if name_idx < len(row) else ''
            price = row[price_idx].strip() if price_idx < len(row) else ''
            dur = row[dur_idx].strip() if dur_idx < len(row) else ''
            
            if not name:
                continue
            
            result[name] = {'price': price, 'duration': dur}
            result[name.lower()] = {'price': price, 'duration': dur}
            # slug - простая версия для совместимости
            import re
            import unicodedata
            # Транслитерация и нормализация
            slug = name.lower()
            slug = re.sub(r'[^a-zа-яё0-9]+', '-', slug)
            slug = re.sub(r'^-+|-+$', '', slug)
            result[slug] = {'price': price, 'duration': dur}
        
        print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print(json.dumps({}))
`
    
    const output = execSync(`python3 -c ${JSON.stringify(pythonScript)} ${JSON.stringify(priceCsv)}`, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    })
    
    const parsed = JSON.parse(output.trim())
    
    // Конвертируем в нужный формат
    for (const [key, value] of Object.entries(parsed)) {
      const entry = value as { price?: string; duration?: string }
      const formattedPrice = entry.price ? entry.price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽' : undefined
      const duration = entry.duration ? `${entry.duration} мин` : undefined
      map[key] = { price: formattedPrice, duration }
    }
    
    // Дополняем длительностями из текстового файла, если они отсутствуют
    if (fs.existsSync(durationTxt)) {
      try {
        const txtContent = fs.readFileSync(durationTxt, 'utf-8')
        const lines = txtContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
        const durationHeaderIdx = lines.findIndex(l => l.toLowerCase().includes('длительность'))
        
        if (durationHeaderIdx !== -1) {
          const names = lines.slice(0, durationHeaderIdx).filter(l => l && l !== 'Название')
          const durations = lines.slice(durationHeaderIdx + 1).filter(l => l && /^\d+$/.test(l))
          
          for (let i = 0; i < names.length && i < durations.length; i++) {
            const name = names[i]
            const dur = durations[i]
            if (!name || !dur) continue
            
            const slug = slugify(name)
            const duration = dur !== '0' ? `${dur} мин` : undefined
            
            // Добавляем по разным ключам для надежности
            const keys = [
              name,
              name.toLowerCase(),
              slug,
            ]
            
            // Также добавляем через обратный маппинг (находим displayName по priceName)
            for (const [displayName, priceName] of Object.entries(nameToPriceName)) {
              if (priceName === name || priceName.toLowerCase() === name.toLowerCase()) {
                keys.push(displayName)
                keys.push(displayName.toLowerCase())
                keys.push(slugify(displayName))
              }
            }
            
            for (const key of keys) {
              if (map[key]) {
                map[key].duration = duration
              } else {
                map[key] = { duration }
              }
            }
          }
        }
      } catch (e) {
        // Ignore errors reading duration file
      }
    }
  } catch (e) {
    // Fallback: пробуем прочитать как utf-8
    try {
      const raw = fs.readFileSync(priceCsv, 'utf-8')
      const rows = raw
        .split(/\r?\n/)
        .map((r) => r.trim())
        .filter(Boolean)
        .map((r) => r.split(';'))
      const header = rows.shift()
      if (header) {
        const nameIdx = header.findIndex((h) => h.toLowerCase().includes('название'))
        const priceIdx = header.findIndex((h) => h.toLowerCase().includes('стоимость'))
        const durIdx = header.findIndex((h) => h.toLowerCase().includes('длительность'))
        
        if (nameIdx !== -1 && priceIdx !== -1 && durIdx !== -1) {
          for (const row of rows) {
            const name = row[nameIdx]?.trim()
            if (!name) continue
            const slug = slugify(name)
            const price = row[priceIdx]?.trim()
            const dur = row[durIdx]?.trim()
            const formattedPrice = price ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽' : undefined
            const duration = dur ? `${dur} мин` : undefined
            const entry = { price: formattedPrice, duration }
            map[slug] = entry
            map[name.toLowerCase()] = entry
            map[name] = entry
          }
        }
      }
    } catch {
      // Ignore
    }
    
    // Дополняем длительностями из текстового файла
    if (fs.existsSync(durationTxt)) {
      try {
        const txtContent = fs.readFileSync(durationTxt, 'utf-8')
        const lines = txtContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
        const durationHeaderIdx = lines.findIndex(l => l.toLowerCase().includes('длительность'))
        
        if (durationHeaderIdx !== -1) {
          const names = lines.slice(0, durationHeaderIdx).filter(l => l && l !== 'Название')
          const durations = lines.slice(durationHeaderIdx + 1).filter(l => l && /^\d+$/.test(l))
          
          for (let i = 0; i < names.length && i < durations.length; i++) {
            const name = names[i]
            const dur = durations[i]
            if (!name || !dur) continue
            
            const slug = slugify(name)
            const duration = dur !== '0' ? `${dur} мин` : undefined
            
            // Если уже есть запись, обновляем длительность
            if (map[name]) {
              map[name].duration = duration
            } else if (map[name.toLowerCase()]) {
              map[name.toLowerCase()].duration = duration
            } else if (map[slug]) {
              map[slug].duration = duration
            } else {
              // Создаем новую запись только с длительностью
              map[name] = { duration }
              map[name.toLowerCase()] = { duration }
              map[slug] = { duration }
            }
          }
        }
      } catch (e) {
        // Ignore errors reading duration file
      }
    }
  }
  
  return map
}

function pickPriceDuration(
  priceMap: Record<string, { price?: string; duration?: string }>,
  displayName: string,
  entryTitle?: string,
  entrySlug?: string
) {
  // Сначала пробуем по маппингу названий
  const priceName = nameToPriceName[displayName]
  if (priceName) {
    // Пробуем точное совпадение
    if (priceMap[priceName]) return priceMap[priceName]
    const slugKey = slugify(priceName)
    if (priceMap[slugKey]) return priceMap[slugKey]
    if (priceMap[priceName.toLowerCase()]) return priceMap[priceName.toLowerCase()]
  }

  // Потом пробуем по slug и title из entry
  if (entrySlug) {
    const slugKey = slugify(entrySlug)
    if (priceMap[slugKey]) return priceMap[slugKey]
  }
  if (entryTitle) {
    if (priceMap[entryTitle]) return priceMap[entryTitle]
    const slugKey = slugify(entryTitle)
    if (priceMap[slugKey]) return priceMap[slugKey]
    if (priceMap[entryTitle.toLowerCase()]) return priceMap[entryTitle.toLowerCase()]
  }

  // И наконец по displayName
  if (priceMap[displayName]) return priceMap[displayName]
  const slugKey = slugify(displayName)
  if (priceMap[slugKey]) return priceMap[slugKey]
  if (priceMap[displayName.toLowerCase()]) return priceMap[displayName.toLowerCase()]

  return {}
}

function loadIndex(): IndexEntry[] {
  const indexPath = path.join(codexDir, 'index.json')
  if (!fs.existsSync(indexPath)) {
    console.warn('Index file not found:', indexPath)
    return []
  }
  try {
    const raw = fs.readFileSync(indexPath, 'utf-8')
    return JSON.parse(raw) as IndexEntry[]
  } catch (e) {
    console.error('Failed to load index:', e)
    return []
  }
}

const sectionMap: Record<string, keyof InfusionItem> = {
  'показания': 'indications',
  'какие проблемы решает': 'indications',
  'действие': 'effect',
  'эффект': 'effect',
  'результат': 'effect',
  'противопоказания': 'contraindications',
  'состав': 'composition',
}

function parseSections(lines: string[]) {
  const sections: {
    indications?: string[]
    effect?: string[]
    contraindications?: string[]
    composition?: string[]
  } = {}

  let current: keyof InfusionItem | null = null

  const pushLine = (text: string) => {
    if (!current) return
    const key = current as keyof typeof sections
    if (!sections[key]) sections[key] = []
    ;(sections[key] as string[]).push(text)
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

    // bullet markers or numbered lists
    if (/^[-•*]\s*/.test(line)) {
      pushLine(line.replace(/^[-•*]\s*/, ''))
      continue
    }
    if (/^\d+[\).\s]/.test(line)) {
      pushLine(line.replace(/^\d+[\).\s]*/, ''))
      continue
    }

    // If inside a section, treat as content line
    if (current) {
      pushLine(line)
    }
  }

  return sections
}

function parseInfusion(
  entry: IndexEntry,
  displayName: string,
  priceMap: Record<string, { price?: string; duration?: string }>
): InfusionItem {
  const txtPath = path.join(codexDir, entry.txt_file)
  if (!fs.existsSync(txtPath)) {
    console.warn('Text file not found:', txtPath)
    return {
      id: slugify(displayName),
      title: displayName,
      description: 'Описание скоро будет',
      imageUrl: undefined,
      details: '',
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
    .filter((l) => {
      const lower = l.toLowerCase()
      return !blacklist.some((b) => lower.includes(b))
    })

  const priceLine = lines.find((l) => /\d[\d\s]*[₽Р]/.test(l))
  const parsedPrice = priceLine ? priceLine.match(/\d[\d\s]*[₽Р]/)?.[0] : undefined

  const ignore = ['название:', 'ссылка:', 'главная', 'стоимость', 'время', 'описание', 'используем', 'действие', 'состав']
  const desc = lines.find((l) => l.length > 15 && !ignore.some((k) => l.toLowerCase().startsWith(k)))
  const details = lines.join('\n')
  const sections = parseSections(lines)

  let imageUrl: string | undefined
  // Сначала проверяем, есть ли уже изображение в public/kapelnicy по slug
  const possibleExtensions = ['.png', '.jpg', '.jpeg', '.webp']
  for (const ext of possibleExtensions) {
    const existingImage = path.join(publicDir, `${entry.slug}${ext}`)
    if (fs.existsSync(existingImage)) {
      imageUrl = `/kapelnicy/${entry.slug}${ext}`
      break
    }
  }
  
  // Если не нашли, пытаемся скопировать из imagesDir
  if (!imageUrl && entry.images && entry.images.length > 0) {
    const src = path.join(imagesDir, entry.images[0])
    if (fs.existsSync(src)) {
      ensureDir(publicDir)
      const targetName = `${entry.slug}${path.extname(src)}`
      const dest = path.join(publicDir, targetName)
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest)
      }
      imageUrl = `/kapelnicy/${targetName}`
    }
  }

  const { price: csvPrice, duration: csvDuration } = pickPriceDuration(priceMap, displayName, entry.title, entry.slug)

  return {
    id: slugify(displayName),
    title: displayName,
    description: desc || 'Описание скоро будет',
    price: csvPrice || parsedPrice,
    duration: csvDuration,
    imageUrl,
    details,
    ...sections,
  }
}

export const metadata = {
  title: 'Капельницы | BIORISE',
  description: 'Категории капельниц BIORISE: иммунитет, детокс, сердце, спорт, красота и другое.',
}

export default function KapelnicyPage() {
  const index = loadIndex()
  const priceMap = loadPriceMap()

  // Если данных нет, возвращаем пустую страницу с сообщением
  if (index.length === 0) {
    return (
      <>
        <Header />
        <InfusionPageLayout sidebarCategories={[]}>
          <div className="text-center py-20">
            <p className="text-olive-primary/60 text-lg">Данные загружаются...</p>
          </div>
        </InfusionPageLayout>
        <Footer />
      </>
    )
  }

  const categories = categoriesConfig.map((cat) => {
    const items: InfusionItem[] = cat.items
      .map((name) => {
        const slug = nameToSlug[name]
        if (!slug) return null
        const entry = index.find((e) => e.slug === slug)
        if (!entry) return null
        const base = parseInfusion(entry, name, priceMap)
        return {
          ...base,
          id: `${slugify(cat.title)}-${base.id}`,
        }
      })
      .filter((v): v is InfusionItem => Boolean(v))

    return { id: slugify(cat.title), title: cat.title, items, icon: cat.icon }
  })

  const menu = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    items: cat.items.map((item) => ({ id: item.id, title: item.title })),
  }))

  return (
    <>
      <Header />
      <InfusionPageLayout sidebarCategories={menu}>
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <CategorySection key={cat.id} id={cat.id} title={cat.title} items={cat.items} icon={cat.icon} />
          ))}
        </div>
      </InfusionPageLayout>
      <Footer />
    </>
  )
}

