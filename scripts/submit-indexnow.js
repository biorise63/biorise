const HOST = 'biorise-clinic.ru'
const KEY = 'biorise63indexnow20260803'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://yandex.com/indexnow'

async function getUrlsFromSitemap() {
  const response = await fetch(SITEMAP_URL, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

async function submitIndexNow(urlList) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  })

  const body = await response.text()

  if (!response.ok) {
    throw new Error(`IndexNow failed: ${response.status} ${response.statusText}\n${body}`)
  }

  console.log(`IndexNow submitted ${urlList.length} URL(s).`)
  if (body.trim()) console.log(body.trim())
}

async function main() {
  const urls = process.argv.slice(2)
  const urlList = urls.length ? urls : await getUrlsFromSitemap()
  const ownUrls = urlList.filter((url) => url.startsWith(`https://${HOST}/`))

  if (!ownUrls.length) {
    throw new Error('No own URLs to submit.')
  }

  await submitIndexNow(ownUrls)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
