const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const projectRoot = path.resolve(__dirname, '..')
const csvPath = path.join(projectRoot, 'public', 'docs', 'prajs-analizy.csv')
const outputPath = path.join(projectRoot, 'data', 'analyses.generated.json')

const workbook = XLSX.readFile(csvPath, { FS: ';', raw: false, codepage: 65001 })
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })

function cleanText(value) {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanName(value) {
  let name = cleanText(value).replace(/\*+$/g, '').trim()

  name = name.replace(/\s*\([^()]*[A-Za-z][^()]*\)/g, '').trim()
  name = name.replace(/\s{2,}/g, ' ').trim()

  return name
}

function parsePrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value >= 1000 ? Math.round(value / 100) : Math.round(value)
  }

  const normalized = cleanText(value).replace(/\s/g, '').replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? Math.round(parsed) : 0
}

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
}

function normalizeSectionTitle(value) {
  return cleanText(value).replace(/^\d+(?:\.\d+)?\.\s*/, '')
}

let currentSection = ''
let currentSubsection = ''
const analyses = []
const checkups = []
const seen = new Set()

for (const row of rows) {
  if (!Array.isArray(row) || !row.some(Boolean)) continue

  const firstCell = cleanText(row[0])
  const titleCell = cleanText(row[3])

  if (!titleCell && /^\d+\.\s/.test(firstCell)) {
    currentSection = firstCell
    currentSubsection = ''
    continue
  }

  if (!titleCell && /^\d+\.\d+\.\s/.test(firstCell)) {
    currentSubsection = firstCell
    continue
  }

  const code = cleanText(row[0])
  const rawName = row[3]
  const biomaterial = cleanText(row[5])
  const turnaround = cleanText(row[6])
  const priceValue = parsePrice(row[7])

  if (!code || !rawName || !priceValue) continue

  const item = {
    code,
    name: cleanName(rawName),
    section: normalizeSectionTitle(currentSection),
    subsection: normalizeSectionTitle(currentSubsection),
    biomaterial,
    turnaround,
    price: formatPrice(priceValue),
    priceValue,
  }

  const dedupeKey = `${item.section}|${item.subsection}|${item.code}|${item.name}|${item.price}|${item.biomaterial}`
  if (seen.has(dedupeKey)) continue
  seen.add(dedupeKey)

  if (/^28\./.test(currentSection) || item.section.toLowerCase().includes('комплексные программы обследований')) {
    checkups.push(item)
  } else {
    analyses.push(item)
  }
}

const payload = {
  generatedAt: new Date().toISOString(),
  analyses,
  checkups,
}

fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2))
console.log(`Generated analyses data -> ${outputPath}`)
console.log(`Analyses: ${analyses.length}, Checkups: ${checkups.length}`)
