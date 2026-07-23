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
  const timelineItems: TimelineItem[] = articles.map((article, index) => ({
    title: article.title,
    description: article.excerpt,
    date: article.publishedAt,
    image: article.coverImage,
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
        </div>

        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[34px] border border-olive-primary/10 bg-white/80 px-6 py-8 shadow-premium backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10">
            <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-olive-primary/10 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-beige-accent/70 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-olive-primary/20 bg-beige-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/75">
                Редакция BIORISE
              </span>
              <h1 className="mt-5 max-w-3xl text-3xl font-heading font-light leading-tight text-olive-primary sm:text-4xl lg:text-5xl">
                Статьи о восстановлении, дефицитах и IV-терапии
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-primary/72 sm:text-lg">
                Собрали материалы, которые помогают спокойно разобраться в анализах, БАДах, капельницах и сценариях восстановления. Без перегруза, с понятной подачей и прямой связью с услугами BIORISE.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-olive-primary/10 bg-beige-background/60 p-4">
                  <span className="text-xs uppercase tracking-[0.12em] text-olive-primary/50">Материалов</span>
                  <strong className="mt-2 block text-2xl font-medium text-olive-primary">{articles.length}</strong>
                  <p className="mt-1 text-sm text-olive-primary/68">Уже опубликовано в разделе</p>
                </div>
                <div className="rounded-2xl border border-olive-primary/10 bg-beige-background/60 p-4">
                  <span className="text-xs uppercase tracking-[0.12em] text-olive-primary/50">Основные темы</span>
                  <strong className="mt-2 block text-2xl font-medium text-olive-primary">БАДЫ и капельницы</strong>
                  <p className="mt-1 text-sm text-olive-primary/68">Разбираем решения под реальные задачи</p>
                </div>
                <div className="rounded-2xl border border-olive-primary/10 bg-beige-background/60 p-4">
                  <span className="text-xs uppercase tracking-[0.12em] text-olive-primary/50">Формат</span>
                  <strong className="mt-2 block text-2xl font-medium text-olive-primary">Коротко и по делу</strong>
                  <p className="mt-1 text-sm text-olive-primary/68">Понятная подача без перегруза терминами</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Timeline items={timelineItems} />
        </div>

        <div className="mx-auto mt-4 max-w-5xl px-4 sm:px-6">
          <div className="rounded-[30px] border border-olive-primary/10 bg-white/75 px-6 py-8 shadow-sm backdrop-blur-sm sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                  Нужна статья под конкретную тему
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-olive-primary/72 sm:text-base">
                  Раздел будет расширяться: добавим материалы про дефициты, витамин D, железо, восстановление после нагрузок, анализы и сценарии IV-терапии.
                </p>
              </div>
              <div className="rounded-2xl bg-beige-background/70 px-4 py-3 text-sm text-olive-primary/75">
                Скоро добавим новые материалы о дефицитах, витаминах, анализах и программах восстановления.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
