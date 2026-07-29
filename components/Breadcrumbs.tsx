import Link from 'next/link'

const SITE_URL = 'https://biorise-clinic.ru'

type BreadcrumbItem = {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

function toAbsoluteUrl(href: string) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  return `${SITE_URL}${href.startsWith('/') ? href : `/${href}`}`
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // Keep both fields to match Schema.org examples and Yandex's documented checks.
      item: toAbsoluteUrl(item.href),
      url: toAbsoluteUrl(item.href),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Хлебные крошки"
        className="mb-5 text-sm text-olive-primary/60 sm:mb-6"
      >
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`.trim()}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={`${item.href}-${index}`} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-olive-primary/80">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-olive-primary"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <span className="text-olive-primary/35">/</span>}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
