import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { articles } from '@/lib/articles'
import { Timeline, type TimelineItem } from '@/components/ui/modern-timeline'

export const metadata = {
  title: 'Статьи | BIORISE',
  description:
    'Полезные статьи о витаминных капельницах, IV-терапии, чек-апах и восстановлении здоровья от клиники BIORISE в Самаре.',
}

export default function ArticlesPage() {
  const sortedArticles = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

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
