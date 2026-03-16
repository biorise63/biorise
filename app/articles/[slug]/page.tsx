import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/lib/articles'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-heading text-olive-primary mb-3">Статья не найдена</h1>
              <Link href="/articles" className="text-olive-primary underline hover:text-olive-light">
                Вернуться к статьям
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/articles" className="inline-flex items-center gap-2 text-olive-primary/80 hover:text-olive-primary transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18 9 12 15 6" />
                </svg>
                Все статьи
              </Link>
            </div>

            <header className="rounded-3xl overflow-hidden border border-olive-primary/10 bg-beige-background/40 shadow-premium">
              <div className="relative aspect-[16/9] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-olive-primary/60 mb-4">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                    </svg>
                    {article.publishedAt}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-olive-primary/30" />
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
                    </svg>
                    4–6 мин
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light mb-4">
                  {article.title}
                </h1>
                <p className="text-olive-primary/70 text-base sm:text-lg leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/80 border border-olive-primary/10 text-olive-primary/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8">
              <div className="prose prose-olive max-w-none text-olive-primary/90">
                {article.content.map((p, idx) => {
                  if (/^\d+\.\s/.test(p)) {
                    return (
                      <h2 key={idx} className="text-2xl font-heading text-olive-primary mt-10">
                        {p}
                      </h2>
                    )
                  }
                  return <p key={idx}>{p}</p>
                })}
              </div>

              <aside className="lg:sticky lg:top-32 h-fit rounded-3xl border border-olive-primary/10 bg-white shadow-premium p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-beige-background border border-olive-primary/10 flex items-center justify-center text-olive-primary">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-olive-primary font-medium">Онлайн-запись</p>
                    <p className="text-olive-primary/70 text-sm">
                      Хотите подобрать программу? Оставьте контакты — администратор свяжется с вами.
                    </p>
                  </div>
                </div>
                <Link
                  href="/#booking"
                  className="mt-4 inline-flex w-full items-center justify-center px-5 py-3 rounded-full bg-olive-primary text-white hover:bg-olive-light transition-all shadow-premium"
                >
                  Записаться
                </Link>
              </aside>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

