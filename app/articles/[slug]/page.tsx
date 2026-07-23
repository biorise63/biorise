import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/lib/articles'
// import ArticlePromoPopUp from '@/components/ArticlePromoPopUp'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Статья не найдена | BIORISE',
      description: 'Статья не найдена.',
    }
  }

  const title = article.seoTitle || `${article.title} | BIORISE`
  const description = article.description || article.excerpt
  const url = `https://biorise-clinic.ru/articles/${article.slug}/`
  const image = article.coverImage.startsWith('http')
    ? article.coverImage
    : `https://biorise-clinic.ru${article.coverImage}`

  return {
    title,
    description,
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'BIORISE',
      locale: 'ru_RU',
      type: 'article',
      publishedTime: article.publishedAt,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

function renderInlineContent(text: string) {
  const tokens: Array<
    | { type: 'text'; value: string }
    | { type: 'link'; label: string; href: string }
  > = []
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    tokens.push({ type: 'link', label: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return tokens.map((token, index) => {
    if (token.type === 'link') {
      const isInternal = token.href.startsWith('/')
      if (isInternal) {
        return (
          <Link
            key={`${token.href}-${index}`}
            href={token.href}
            className="font-medium text-olive-primary underline underline-offset-4 hover:text-olive-light"
          >
            {token.label}
          </Link>
        )
      }

      return (
        <a
          key={`${token.href}-${index}`}
          href={token.href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-olive-primary underline underline-offset-4 hover:text-olive-light"
        >
          {token.label}
        </a>
      )
    }

    return <span key={`text-${index}`}>{token.value}</span>
  })
}

type ContentBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'paragraph'; text: string }

function parseContentBlocks(content: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = []
  let index = 0

  while (index < content.length) {
    const line = content[index]

    if (/^##\s/.test(line)) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') })
      index += 1
      continue
    }

    if (/^###\s/.test(line)) {
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') })
      index += 1
      continue
    }

    if (/^-\s/.test(line)) {
      const items: string[] = []
      while (index < content.length && /^-\s/.test(content[index])) {
        items.push(content[index].replace(/^-\s+/, ''))
        index += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (index < content.length && /^\d+\.\s/.test(content[index])) {
        items.push(content[index].replace(/^\d+\.\s+/, ''))
        index += 1
      }
      blocks.push({ type: 'ordered-list', items })
      continue
    }

    blocks.push({ type: 'paragraph', text: line })
    index += 1
  }

  return blocks
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
              {article.h1 || article.title}
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
              {parseContentBlocks(article.content).map((block, idx) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={idx} className="text-xl font-heading text-olive-primary mt-8 mb-3 font-medium">
                      {block.text}
                    </h2>
                  )
                }

                if (block.type === 'h3') {
                  return (
                    <h3 key={idx} className="text-lg font-heading text-olive-primary mt-6 mb-2 font-medium">
                      {block.text}
                    </h3>
                  )
                }

                if (block.type === 'list') {
                  return (
                    <ul key={idx} className="mb-0 list-disc space-y-2 pl-5 text-olive-primary/90">
                      {block.items.map((item, itemIndex) => (
                        <li key={`${idx}-${itemIndex}`}>{renderInlineContent(item)}</li>
                      ))}
                    </ul>
                  )
                }

                if (block.type === 'ordered-list') {
                  return (
                    <ol key={idx} className="mb-0 list-decimal space-y-2 pl-5 text-olive-primary/90">
                      {block.items.map((item, itemIndex) => (
                        <li key={`${idx}-${itemIndex}`}>{renderInlineContent(item)}</li>
                      ))}
                    </ol>
                  )
                }

                return (
                  <p key={idx} className="mb-0">
                    {renderInlineContent(block.text)}
                  </p>
                )
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

          </div>
        </div>
      </article>

      {/* <ArticlePromoPopUp coverImage={article.coverImage} /> */}

      <Footer />
    </main>
  )
}
