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
    <main className="min-h-screen bg-[#f5f5f0]">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-heading text-olive-primary font-light mb-1">
            Статьи
          </h1>
          <p className="text-olive-primary/60 text-sm sm:text-base">
            Коротко и по делу: дефициты, восстановление, витаминные капельницы и IV-терапия.
          </p>
        </div>

        {/* Лента в стиле Дзен: вертикальный список карточек */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full bg-white rounded-2xl overflow-hidden border border-olive-primary/5 hover:border-olive-primary/15 hover:shadow-md transition-all duration-200 group"
            >
              <div className="sm:w-64 sm:min-w-[256px] sm:shrink-0 aspect-video sm:aspect-square bg-beige-background/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 p-4 sm:p-5 sm:py-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-olive-primary/50 mb-2">
                  <span>{article.publishedAt}</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-olive-primary/40" />
                  <span>4–6 мин</span>
                </div>
                <h2 className="text-lg sm:text-xl font-heading text-olive-primary font-medium mb-2 group-hover:text-olive-light transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-olive-primary/70 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-olive-primary/55 bg-olive-primary/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex sm:items-center sm:pr-4 text-olive-primary/40 group-hover:text-olive-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
