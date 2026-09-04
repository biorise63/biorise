const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const csvPath = path.join(projectRoot, 'public', 'docs', 'prajs-analizy.csv')
const outputPath = path.join(projectRoot, 'data', 'analyses.generated.json')

// Читаем CSV построчно вручную (а не через XLSX.readFile) - библиотека XLSX
// пытается угадывать тип содержимого ячеек и для части строк (26 из 2728)
// ошибочно распознавала цену как дату Excel (например "1 030,00" превращалось
// в число 36555.000231481485), из-за чего parsePrice() делил его на 100 и
// получал неверную цену (366 вместо 1030 для D-димера и т.д.). Ручной парсер
// всегда отдаёт значения ячеек как обычный текст, что убирает этот класс ошибок.
function parseCsvLine(line, delimiter = ';') {
  const cells = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === delimiter) {
      cells.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  cells.push(current)
  return cells
}

const rawCsv = fs.readFileSync(csvPath, 'utf-8')
const rows = rawCsv
  .split(/\r?\n/)
  .filter((line) => line.length > 0)
  .map((line) => parseCsvLine(line))

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

  // Раздел 27 в исходном прайсе - экологические исследования почвы и воды
  // (это услуги референс-лаборатории, не относящиеся к клинике BIORISE вообще,
  // попали в CSV вместе со всем остальным прайсом при выгрузке) - пропускаем.
  if (/^27\./.test(currentSection) || item.section.toLowerCase().includes('качества воды и почвы')) {
    continue
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
