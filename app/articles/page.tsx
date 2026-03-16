import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata = {
  title: 'Статьи | BIORISE',
  description:
    'Полезные статьи о витаминных капельницах, IV-терапии, чек-апах и восстановлении здоровья от клиники BIORISE в Самаре.',
}

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-beige-background border border-olive-primary/10 flex items-center justify-center text-olive-primary">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Статьи
              </h1>
            </div>
            <p className="text-olive-primary/70 text-base sm:text-lg">
              Коротко и по делу: про дефициты, восстановление, витаминные капельницы и безопасную IV-терапию.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group rounded-3xl overflow-hidden border border-olive-primary/10 bg-beige-background/40 hover:bg-beige-background/70 transition-colors shadow-premium"
              >
                <div className="relative aspect-[16/10] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-olive-primary/60 mb-3">
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
                  <h2 className="text-xl sm:text-2xl font-heading text-olive-primary mb-2 group-hover:text-olive-light transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-olive-primary/70 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/80 border border-olive-primary/10 text-olive-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-olive-primary font-medium text-sm">
                    Читать статью
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

