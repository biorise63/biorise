import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { getUniqueInfusions } from '@/lib/kapelnicy'
import { checkupPrograms } from '@/lib/checkups'
import { spravkiItems } from '@/lib/spravki'
import { getAllAuthors } from '@/lib/authors'

const SITE_URL = 'https://biorise-clinic.ru'
const APP_DIR = path.join(process.cwd(), 'app')

const routeConfig: Record<
  string,
  {
    priority: number
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  }
> = {
  '/': { priority: 1, changeFrequency: 'weekly' },
  '/kapelnicy/': { priority: 0.95, changeFrequency: 'weekly' },
  '/kapelnicy/na-domu/': { priority: 0.9, changeFrequency: 'weekly' },
  '/analizy/': { priority: 0.9, changeFrequency: 'weekly' },
  '/ekg/': { priority: 0.85, changeFrequency: 'weekly' },
  '/chek-apy/': { priority: 0.88, changeFrequency: 'weekly' },
  '/bady/': { priority: 0.85, changeFrequency: 'weekly' },
  '/articles/': { priority: 0.85, changeFrequency: 'weekly' },
  '/sitemap/': { priority: 0.65, changeFrequency: 'weekly' },
  '/apparatnyy-massazh/': { priority: 0.8, changeFrequency: 'monthly' },
  '/ruchnoy-massazh/': { priority: 0.8, changeFrequency: 'monthly' },
  '/lazernaya-epilyatsiya/': { priority: 0.8, changeFrequency: 'monthly' },
  '/bioimpedance/': { priority: 0.75, changeFrequency: 'monthly' },
  '/spravki/': { priority: 0.7, changeFrequency: 'monthly' },
  '/privacy/': { priority: 0.3, changeFrequency: 'yearly' },
  '/cookie-policy/': { priority: 0.3, changeFrequency: 'yearly' },
}

const excludedPaths = new Set([
  '/yandex_ff70510bc15914e1/',
])

function normalizeRoute(routePath: string) {
  if (!routePath || routePath === '/') return '/'
  return routePath.endsWith('/') ? routePath : `${routePath}/`
}

function shouldSkipSegment(segment: string) {
  return (
    segment.startsWith('(') ||
    segment.startsWith('[') ||
    segment.startsWith('_')
  )
}

function collectStaticPagePaths(dir: string, segments: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const routes: string[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldSkipSegment(entry.name)) continue
      routes.push(...collectStaticPagePaths(path.join(dir, entry.name), [...segments, entry.name]))
      continue
    }

    if (!entry.isFile() || entry.name !== 'page.tsx') continue

    const routePath = segments.length === 0 ? '/' : `/${segments.join('/')}/`
    const normalized = normalizeRoute(routePath)

    if (!excludedPaths.has(normalized)) {
      routes.push(normalized)
    }
  }

  return routes
}

function getStaticEntries(now: Date): MetadataRoute.Sitemap {
  const staticPaths = Array.from(new Set(collectStaticPagePaths(APP_DIR))).sort()

  return staticPaths.map((routePath) => {
    const config = routeConfig[routePath] ?? {
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }

    return {
      url: `${SITE_URL}${routePath}`,
      lastModified: now,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    }
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries = getStaticEntries(now)

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}/`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.72,
  }))

  const infusionEntries: MetadataRoute.Sitemap = getUniqueInfusions().map((infusion) => ({
    url: `${SITE_URL}/kapelnicy/${infusion.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const checkupEntries: MetadataRoute.Sitemap = checkupPrograms.map((program) => ({
    url: `${SITE_URL}/chek-apy/${program.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const spravkiEntries: MetadataRoute.Sitemap = spravkiItems.map((item) => ({
    url: `${SITE_URL}/spravki/${item.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const doctorEntries: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${SITE_URL}/vrachi/${author.id}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticEntries,
    ...articleEntries,
    ...infusionEntries,
    ...checkupEntries,
    ...spravkiEntries,
    ...doctorEntries,
  ]
}
