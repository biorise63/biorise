import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { articles } from '@/lib/articles'
import { Timeline, type TimelineItem } from '@/components/ui/modern-timeline'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Статьи | BIORISE',
  description:
    'Полезные статьи о витаминных капельницах, IV-терапии, чек-апах и восстановлении здоровья от клиники BIORISE в Самаре.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/articles/',
  },
  openGraph: {
    title: 'Статьи | BIORISE',
    description:
      'Полезные статьи о витаминных капельницах, IV-терапии, чек-апах и восстановлении здоровья от клиники BIORISE в Самаре.',
    url: 'https://biorise-clinic.ru/articles/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function ArticlesPage() {
  const sortedArticles = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const articleItems = sortedArticles.map((article) => ({
    url: `/articles/${article.slug}/`,
    name: article.h1 || article.title,
  }))
  const collectionPageJsonLd = createWebPageJsonLd({
    url: '/articles/',
    name: 'Статьи BIORISE',
    description:
      'Полезные статьи о витаминных капельницах, IV-терапии, чек-апах и восстановлении здоровья от клиники BIORISE в Самаре.',
    type: 'CollectionPage',
  })
  const articleListJsonLd = createItemListJsonLd({
    url: '/articles/',
    name: 'Статьи BIORISE',
    items: articleItems,
  })

  const timelineItems: TimelineItem[] = sortedArticles.map((article, index) => ({
    title: article.title,
    description: article.excerpt,
    date: article.publishedAt,
    image: '/logo-cube.png',
    category: article.tags[0] || 'BIORISE',
    status: index === 0 ? 'current' : 'completed',
    href: `/articles/${article.slug}/`,
  }))

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <JsonLd data={[collectionPageJsonLd, articleListJsonLd]} />
      <Header />

      <section
        className="pb-20"
        style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Статьи', href: '/articles/' },
            ]}
          />
          <h1 className="mt-3 text-3xl font-heading font-light text-olive-primary sm:text-4xl">
            Статьи
          </h1>
        </div>

        <div className="mt-4">
          <Timeline items={timelineItems} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
