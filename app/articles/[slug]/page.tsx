import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { articles, getArticleBySlug } from '@/lib/articles'
import { formatArticleDate } from '@/lib/format-date'
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
  const image = article.coverImage
    ? article.coverImage.startsWith('http')
      ? article.coverImage
      : `https://biorise-clinic.ru${article.coverImage}`
    : null
  const imageAlt = article.imageAlt || article.h1 || article.title

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
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: imageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
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

    return (
      <span key={`text-${index}`}>
        {renderStrongText(token.value)}
      </span>
    )
  })
}

function renderStrongText(text: string) {
  const parts: React.ReactNode[] = []
  const strongRegex = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = strongRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    parts.push(
      <strong key={`strong-${match.index}`} className="font-semibold text-olive-primary">
        {match[1]}
      </strong>,
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length ? parts : text
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

function stripMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^[-\d.\s]+/, '')
    .trim()
}

function extractFaqItems(content: string[]) {
  const faqStartIndex = content.findIndex((line) => /^##\s+FAQ$/i.test(line.trim()))

  if (faqStartIndex === -1) {
    return []
  }

  const items: Array<{ question: string; answer: string }> = []
  let index = faqStartIndex + 1

  while (index < content.length) {
    const line = content[index]

    if (/^##\s+/.test(line)) {
      break
    }

    if (/^###\s+/.test(line)) {
      const question = stripMarkdown(line.replace(/^###\s+/, ''))
      const answerParts: string[] = []
      index += 1

      while (index < content.length && !/^###\s+/.test(content[index]) && !/^##\s+/.test(content[index])) {
        const answerLine = stripMarkdown(content[index])
        if (answerLine) answerParts.push(answerLine)
        index += 1
      }

      if (question && answerParts.length) {
        items.push({ question, answer: answerParts.join(' ') })
      }

      continue
    }

    index += 1
  }

  return items
}

function toAbsoluteSiteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  return `https://biorise-clinic.ru${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

function getRelatedArticles(currentSlug: string) {
  const otherArticles = articles.filter((item) => item.slug !== currentSlug)
  const seed = hashString(currentSlug)

  return [...otherArticles]
    .sort((left, right) => {
      const leftScore = hashString(`${seed}-${left.slug}`)
      const rightScore = hashString(`${seed}-${right.slug}`)
      return leftScore - rightScore
    })
    .slice(0, 3)
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

  const contentBlocks = parseContentBlocks(article.content)
  const imageAlt = article.imageAlt || article.h1 || article.title
  const relatedArticles = getRelatedArticles(article.slug)
  const articleAuthor = 'Медицинская редакция BIORISE'
  const articleUrl = `https://biorise-clinic.ru/articles/${article.slug}/`
  const faqItems = extractFaqItems(article.content)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1 || article.title,
    description: article.description || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: articleAuthor,
      url: 'https://biorise-clinic.ru/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BIORISE',
      url: 'https://biorise-clinic.ru/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://biorise-clinic.ru/logo-cube.png',
      },
    },
    mainEntityOfPage: articleUrl,
    image: article.coverImage
      ? toAbsoluteSiteUrl(article.coverImage)
      : 'https://biorise-clinic.ru/logo-cube.png',
  }
  const faqJsonLd = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
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

          <div className="px-4 sm:px-6 max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-olive-primary/50">
              <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
              <span aria-hidden="true">•</span>
              <span>4–6 мин</span>
              <span aria-hidden="true">•</span>
              <span>{articleAuthor}</span>
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
            <div className="prose prose-olive max-w-none text-olive-primary/90 text-base leading-relaxed space-y-5">
              {article.coverImage ? (
                <div className="mx-auto mb-5 w-full max-w-[180px] sm:float-left sm:mr-6 sm:mb-4 sm:ml-0">
                  <div className="aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage}
                      alt={imageAlt}
                      className="h-full w-full object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              ) : null}

              {contentBlocks.map((block, idx) => {
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

            {relatedArticles.length ? (
              <section className="mt-12 border-t border-olive-primary/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/8 text-olive-primary">
                    <FileText className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-heading text-olive-primary font-medium">
                    Что ещё посмотреть по теме
                  </h2>
                </div>

                <div className="mt-4 space-y-3">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      href={`/articles/${relatedArticle.slug}/`}
                      className="group block rounded-2xl border border-olive-primary/10 bg-white/65 px-4 py-3 transition-colors hover:border-olive-primary/20 hover:bg-white"
                    >
                      <div className="text-base font-medium text-olive-primary transition-colors group-hover:text-olive-light">
                        {relatedArticle.h1 || relatedArticle.title}
                      </div>
                      <div className="mt-1 text-xs text-olive-primary/45">
                        <time dateTime={relatedArticle.publishedAt}>
                          {formatArticleDate(relatedArticle.publishedAt)}
                        </time>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-olive-primary/68">
                        {relatedArticle.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

          </div>
        </div>
      </article>

      {/* <ArticlePromoPopUp coverImage={article.coverImage} /> */}

      <Footer />
    </main>
  )
}
