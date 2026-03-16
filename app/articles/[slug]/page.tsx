import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/lib/articles'
import ArticlePromoPopUp from '@/components/ArticlePromoPopUp'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-[#f5f5f0]">
        <Header />
        <section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
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

      <article className="pt-24 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="px-4 sm:px-6 mb-4">
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

            {/* CTA внизу вместо сайдбара */}
            <div className="mt-14 p-6 rounded-2xl bg-white border border-olive-primary/10">
              <p className="text-olive-primary font-medium mb-1">Записаться на приём</p>
              <p className="text-olive-primary/70 text-sm mb-4">
                Подберём программу капельниц или чек-ап — оставьте заявку, администратор свяжется с вами.
              </p>
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-olive-primary text-white text-sm hover:bg-olive-light transition-colors"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </article>

      <ArticlePromoPopUp coverImage={article.coverImage} />

      <Footer />
    </main>
  )
}
