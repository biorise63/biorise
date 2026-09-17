#!/usr/bin/env node
/**
 * Проверяет через Search Console API (urlInspection.index:inspect), какой canonical
 * Google реально выбрал для списка URL biorise-clinic.ru - нужен для диагностики
 * повторяющегося инцидента "canonical hijack" (см. incident-canonical-hijack-747live.md):
 * сторонний скрейпер (747live.bet и, возможно, другие) ворует контент, и Google иногда
 * решает, что оригинал - не biorise-clinic.ru, а сайт-вор.
 *
 * Запуск:
 *   node scripts/check-gsc-canonical.mjs url1 url2 ...
 *   node scripts/check-gsc-canonical.mjs --file path/to/Таблица.csv   (колонка URL, как в экспорте GSC Coverage)
 *
 * Требует GOOGLE_SERVICE_ACCOUNT_PATH и GOOGLE_SITE_URL в ai-seo-pipeline/.env
 * (тот же сервис-аккаунт, что использует article-planner/collect-semantics.mjs).
 */

import { readFileSync } from 'node:fs'
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

async function inspectUrl(accessToken, inspectionUrl, siteUrl) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl, siteUrl }),
  })
  const body = await res.json()
  if (!res.ok) return { error: `${res.status} ${JSON.stringify(body).slice(0, 300)}` }
  const result = body.inspectionResult?.indexStatusResult
  return {
    verdict: result?.verdict,
    coverageState: result?.coverageState,
    googleCanonical: result?.googleCanonical,
    userCanonical: result?.userCanonical,
    lastCrawlTime: result?.lastCrawlTime,
    robotsTxtState: result?.robotsTxtState,
    indexingState: result?.indexingState,
  }
}

function parseUrlsFromCsv(csvPath) {
  const raw = readFileSync(csvPath, 'utf8')
  const lines = raw.split(/\r?\n/).filter(Boolean)
  const urls = []
  for (const line of lines.slice(1)) {
    const [url] = line.split(',')
    if (url && url.startsWith('http')) urls.push(url.trim())
  }
  return urls
}

async function main() {
  const args = process.argv.slice(2)
  let urls = []
  if (args[0] === '--file') {
    urls = parseUrlsFromCsv(args[1])
  } else {
    urls = args
  }
  if (!urls.length) {
    console.error('Usage: node scripts/check-gsc-canonical.mjs <url1> <url2> ... | --file path.csv')
    process.exit(1)
  }

  const siteUrl = env.GOOGLE_SITE_URL
  const accessToken = await gscAccessToken()

  const flagged = []
  for (const url of urls) {
    const info = await inspectUrl(accessToken, url, siteUrl)
    const ownDomain = url.includes('biorise-clinic.ru')
    const isHijacked =
      info.googleCanonical && ownDomain && !info.googleCanonical.includes('biorise-clinic.ru')
    console.log(
      `${url}\n  coverageState=${info.coverageState} googleCanonical=${info.googleCanonical} lastCrawl=${info.lastCrawlTime}${isHijacked ? '  <-- CANONICAL HIJACKED' : ''}${info.error ? `  ERROR: ${info.error}` : ''}`,
    )
    if (isHijacked) flagged.push(url)
    await new Promise((r) => setTimeout(r, 250))
  }

  console.log('\n=== Итог ===')
  console.log(`Проверено: ${urls.length}, с чужим canonical: ${flagged.length}`)
  if (flagged.length) {
    console.log('Затронутые URL:')
    flagged.forEach((u) => console.log(`  ${u}`))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
