import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { getUniqueInfusions } from '@/lib/kapelnicy'

const SITE_URL = 'https://biorise-clinic.ru'

const staticPages: Array<{
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/kapelnicy/', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/kapelnicy/na-domu/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/analizy/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/bady/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/articles/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/apparatnyy-massazh/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ruchnoy-massazh/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/lazernaya-epilyatsiya/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bioimpedance/', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/spravki/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy/', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

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

  return [...staticEntries, ...articleEntries, ...infusionEntries]
}
