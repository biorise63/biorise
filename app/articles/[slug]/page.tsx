import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/lib/articles'
// import ArticlePromoPopUp from '@/components/ArticlePromoPopUp'
import BookingFormFields from '@/components/BookingFormFields'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-[#f5f5f0]">
        <Header />
        <section
          className="pb-16"
          style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs
              items={[
                { name: 'Главная', href: '/' },
                { name: 'Статьи', href: '/articles/' },
              ]}
              className="justify-center"
            />
            <h1 className="text-2xl font-heading text-olive-primary mb-3">Статья не найдена</h1>
            <Link href="/articles" className="text-olive-primary underline hover:text-olive-light">
              Вернуться к статьям
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <Header />

      <article
        className="pb-16"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="px-4 sm:px-6 mb-4">
            <Breadcrumbs
              items={[
                { name: 'Главная', href: '/' },
                { name: 'Статьи', href: '/articles/' },
                { name: article.title, href: `/articles/${article.slug}/` },
              ]}
            />
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-olive-primary/70 hover:text-olive-primary transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18 9 12 15 6" />
              </svg>
              Все статьи
            </Link>
          </div>

          {/* Обложка на всю ширину, как в Дзене, с закруглёнными краями */}
          <div className="w-full aspect-[16/9] sm:aspect-[2/1] bg-white mb-8 rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <div className="px-4 sm:px-6 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-olive-primary/50 mb-4">
              <span>{article.publishedAt}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-olive-primary/40" />
              <span>4–6 мин</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading text-olive-primary font-medium leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-olive-primary/70 text-base sm:text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-olive-primary/60 bg-olive-primary/5 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Текст статьи — одна колонка, как в Дзене */}
            <div className="prose prose-olive max-w-none text-olive-primary/90 text-base leading-relaxed space-y-5">
              {article.content.map((p, idx) => {
                if (/^\d+\.\s/.test(p)) {
                  return (
                    <h2 key={idx} className="text-xl font-heading text-olive-primary mt-8 mb-3 font-medium">
                      {p}
                    </h2>
                  )
                }
                return <p key={idx} className="mb-0">{p}</p>
              })}
            </div>

            <section className="mt-12 rounded-2xl border border-olive-primary/10 bg-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-heading text-olive-primary font-medium">
                Что ещё посмотреть по теме
              </h2>
              <p className="mt-3 text-olive-primary/72 text-sm sm:text-base leading-relaxed">
                Если вы выбираете формат восстановления, изучите каталог{' '}
                <Link
                  href="/kapelnicy/"
                  className="font-medium text-olive-primary underline underline-offset-4 hover:text-olive-light"
                >
                  капельниц BIORISE
                </Link>{' '}
                и раздел{' '}
                <Link
                  href="/bady/"
                  className="font-medium text-olive-primary underline underline-offset-4 hover:text-olive-light"
                >
                  БАДЫ
                </Link>
                . Так проще сравнить варианты поддержки организма и понять, что подходит именно под вашу задачу.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/kapelnicy/"
                  className="group rounded-2xl border border-olive-primary/10 bg-beige-background/60 p-5 transition-colors hover:border-olive-primary/20 hover:bg-beige-background"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-olive-primary/48">
                    Основной раздел
                  </span>
                  <h3 className="mt-2 text-lg font-heading text-olive-primary font-medium group-hover:text-olive-light">
                    Капельницы в Самаре
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-olive-primary/72">
                    Витаминные, восстановительные, детокс и другие программы с подбором состава врачом.
                  </p>
                </Link>

                <Link
                  href="/bady/"
                  className="group rounded-2xl border border-olive-primary/10 bg-beige-background/60 p-5 transition-colors hover:border-olive-primary/20 hover:bg-beige-background"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-olive-primary/48">
                    Дополнительный раздел
                  </span>
                  <h3 className="mt-2 text-lg font-heading text-olive-primary font-medium group-hover:text-olive-light">
                    БАДЫ BIORISE
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-olive-primary/72">
                    Подбор нутрицевтиков для энергии, дефицитов, восстановления, кожи и общего тонуса.
                  </p>
                </Link>
              </div>
            </section>

            {/* Онлайн-запись со скидкой в конце статьи */}
            <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-olive-primary/10 shadow-premium">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex shrink-0 w-10 h-10 rounded-xl bg-olive-primary/10 flex items-center justify-center text-olive-primary" aria-hidden>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2H2v10l9.3 9.3a2.4 2.4 0 0 0 3.4 0l6.3-6.3a2.4 2.4 0 0 0 0-3.4L12 2Z" />
                    <path d="M7 7h.01" />
                  </svg>
                </span>
                <h2 className="text-xl sm:text-2xl font-heading text-olive-primary font-medium">
                  Скидка 20% на капельницы для спортсменов
                </h2>
              </div>
              <div className="flex items-start gap-3 text-olive-primary/70 text-sm mb-6">
                <span className="flex shrink-0 w-8 h-8 rounded-lg bg-olive-primary/5 flex items-center justify-center text-olive-primary/80" aria-hidden>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <p>
                  До <strong>25.03.2026</strong> действует специальное предложение. Используйте промокод <strong>АТЛЕТ</strong>.
                </p>
              </div>
              <BookingFormFields
                defaultPromoCode="АТЛЕТ"
                submitButtonText="Записаться"
                compact
              />
            </div>
          </div>
        </div>
      </article>

      {/* <ArticlePromoPopUp coverImage={article.coverImage} /> */}

      <Footer />
    </main>
  )
}
