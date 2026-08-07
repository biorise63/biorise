// Собирает семантическое ядро для очереди статей: частотность Wordstat + реальные
// запросы из Google Search Console. Пишет article-planner/data/semantic-map.json —
// единый источник правды о том, какой кластер за какой страницей закреплён.
//
// Запуск: node article-planner/collect-semantics.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createSign } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function loadEnv(envPath) {
  const out = {}
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    out[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
  }
  return out
}

const env = loadEnv(path.join(ROOT, 'ai-seo-pipeline', '.env'))

function normalize(s) {
  return (s || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim()
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ---------- Wordstat ----------

async function wordstatDemand(phrase) {
  const body = {
    phrase,
    numPhrases: '15',
    devices: ['DEVICE_ALL'],
    folderId: env.YANDEX_FOLDER_ID,
  }
  const res = await fetch('https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests', {
    method: 'POST',
    headers: {
      Authorization: `Api-Key ${env.YANDEX_WORDSTAT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    return { demand: 0, lsi: [], error: `${res.status} ${text.slice(0, 200)}` }
  }
  const payload = await res.json()
  const results = (payload.results || []).map((r) => ({
    phrase: r.phrase,
    count: Number(String(r.count || '0').replace(/[^\d]/g, '')) || 0,
  }))
  const associations = (payload.associations || []).map((r) => ({
    phrase: r.phrase,
    count: Number(String(r.count || '0').replace(/[^\d]/g, '')) || 0,
  }))
  const normPhrase = normalize(phrase)
  const exact = results.find((r) => normalize(r.phrase) === normPhrase)
  const demand = exact ? exact.count : results[0]?.count || 0
  const lsi = [...results, ...associations]
    .filter((r) => normalize(r.phrase) !== normPhrase)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((r) => r.phrase)
  return { demand, lsi, totalCount: Number(payload.totalCount) || undefined }
}

// ---------- Google Search Console ----------

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function gscAccessToken() {
  const sa = JSON.parse(readFileSync(env.GOOGLE_SERVICE_ACCOUNT_PATH, 'utf8'))
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claims = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claims))}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const signature = signer
    .sign(sa.private_key)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  const jwt = `${unsigned}.${signature}`

  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(`GSC token error: ${res.status} ${JSON.stringify(body)}`)
  return body.access_token
}

async function gscQueries(accessToken) {
  const end = new Date()
  const start = new Date(end.getTime() - 90 * 24 * 3600 * 1000)
  const fmt = (d) => d.toISOString().slice(0, 10)
  const siteUrl = encodeURIComponent(env.GOOGLE_SITE_URL)
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ['query', 'page'],
        rowLimit: 2000,
      }),
    },
  )
  const body = await res.json()
  if (!res.ok) throw new Error(`GSC query error: ${res.status} ${JSON.stringify(body)}`)
  return body.rows || []
}

// ---------- Main ----------

async function main() {
  const articlesPath = path.join(ROOT, 'article-planner', 'data', 'articles.json')
  const queue = JSON.parse(readFileSync(articlesPath, 'utf8'))

  console.log(`Загружено тем из очереди: ${queue.length}`)

  // 1. Wordstat по каждой теме очереди (main keyword)
  const clusters = []
  for (const item of queue) {
    process.stdout.write(`Wordstat: "${item.keyword}"... `)
    const { demand, lsi, error } = await wordstatDemand(item.keyword)
    if (error) {
      console.log(`ошибка: ${error}`)
    } else {
      console.log(`${demand} показов/мес`)
    }
    clusters.push({
      id: item.id,
      page: item.url,
      status: item.published ? 'published' : item.status || 'idea',
      section: item.priority === 'высокий' ? item.priority : item.priority,
      mainKeyword: item.keyword,
      wordstatDemand: demand,
      lsi,
      secondaryKeywords: item.secondaryKeywords || [],
      gsc: null,
      conflictsWith: [],
    })
    await sleep(1100)
  }

  // 2. Конфликты: один и тот же ключ закреплён за несколькими кластерами
  const ownerByKeyword = new Map()
  for (const c of clusters) {
    const keys = [c.mainKeyword, ...c.secondaryKeywords].map(normalize)
    for (const k of keys) {
      if (!ownerByKeyword.has(k)) ownerByKeyword.set(k, [])
      ownerByKeyword.get(k).push(c.id)
    }
  }
  for (const c of clusters) {
    const keys = [c.mainKeyword, ...c.secondaryKeywords].map(normalize)
    const conflicting = new Set()
    for (const k of keys) {
      const owners = ownerByKeyword.get(k) || []
      if (owners.length > 1) owners.forEach((id) => id !== c.id && conflicting.add(id))
    }
    c.conflictsWith = [...conflicting]
  }

  // 3. Google Search Console: реальные запросы за 90 дней
  let gscRows = []
  try {
    const token = await gscAccessToken()
    gscRows = await gscQueries(token)
    console.log(`\nGSC: получено ${gscRows.length} строк (запрос×страница) за 90 дней`)
  } catch (err) {
    console.log(`\nGSC ошибка: ${err.message}`)
  }

  // 4. Сматчить GSC-запросы с кластерами, остальное — в opportunities
  const opportunities = []
  const clusterByNormKeyword = clusters.map((c) => ({
    cluster: c,
    keys: [c.mainKeyword, ...c.secondaryKeywords].map(normalize),
  }))

  const aggByQuery = new Map()
  for (const row of gscRows) {
    const query = row.keys[0]
    const page = row.keys[1]
    const nq = normalize(query)
    if (!aggByQuery.has(nq)) {
      aggByQuery.set(nq, { query, impressions: 0, clicks: 0, positionSum: 0, rows: 0, pages: new Set() })
    }
    const agg = aggByQuery.get(nq)
    agg.impressions += row.impressions || 0
    agg.clicks += row.clicks || 0
    agg.positionSum += (row.position || 0) * (row.impressions || 1)
    agg.rows += row.impressions || 1
    agg.pages.add(page)
  }

  for (const [nq, agg] of aggByQuery) {
    const match = clusterByNormKeyword.find(({ keys }) =>
      keys.some((k) => k && (nq.includes(k) || k.includes(nq))),
    )
    const avgPosition = agg.rows ? Math.round((agg.positionSum / agg.rows) * 10) / 10 : null
    if (match) {
      if (!match.cluster.gsc || agg.impressions > match.cluster.gsc.impressions) {
        match.cluster.gsc = {
          query: agg.query,
          impressions: agg.impressions,
          clicks: agg.clicks,
          avgPosition,
          pages: [...agg.pages],
        }
      }
    } else if (agg.impressions >= 5) {
      opportunities.push({
        query: agg.query,
        impressions: agg.impressions,
        clicks: agg.clicks,
        avgPosition,
        pages: [...agg.pages],
      })
    }
  }
  opportunities.sort((a, b) => b.impressions - a.impressions)

  const output = {
    generatedAt: new Date().toISOString(),
    note:
      'Резерв content-map.json (500+ тем) в этот прогон не проверялся через Wordstat — обогащается по мере продвижения темы из резерва в очередь (экономия квоты).',
    clusters,
    conflicts: clusters.filter((c) => c.conflictsWith.length > 0).map((c) => ({ id: c.id, conflictsWith: c.conflictsWith })),
    opportunities: opportunities.slice(0, 30),
  }

  const outPath = path.join(ROOT, 'article-planner', 'data', 'semantic-map.json')
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8')
  console.log(`\nСохранено: ${outPath}`)
  console.log(`Кластеров: ${clusters.length}, конфликтов: ${output.conflicts.length}, новых возможностей из GSC: ${output.opportunities.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
