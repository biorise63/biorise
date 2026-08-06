import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { articles } from '@/lib/articles'
import { getUniqueInfusions } from '@/lib/kapelnicy'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Карта сайта | BIORISE',
  description:
    'Карта сайта BIORISE: основные разделы, капельницы, анализы, чек-апы и статьи.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/sitemap/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const mainPages = [
  { href: '/', title: 'Главная' },
  { href: '/kapelnicy/', title: 'Капельницы' },
  { href: '/kapelnicy/na-domu/', title: 'Капельницы на дому' },
  { href: '/analizy/', title: 'Анализы' },
  { href: '/ekg/', title: 'ЭКГ' },
  { href: '/chek-apy/', title: 'Чек-апы' },
  { href: '/articles/', title: 'Статьи' },
  { href: '/bady/', title: 'БАДы' },
  { href: '/bioimpedance/', title: 'Биоимпедансный анализ' },
  { href: '/spravki/', title: 'Медицинские справки' },
  { href: '/ruchnoy-massazh/', title: 'Ручной массаж' },
  { href: '/apparatnyy-massazh/', title: 'Аппаратный массаж' },
  { href: '/lazernaya-epilyatsiya/', title: 'Лазерная эпиляция' },
]

const analysisPages = [
  { href: '/analizy/analiz-krovi/', title: 'Анализ крови' },
  { href: '/analizy/biohimicheskiy-analiz-krovi/', title: 'Биохимический анализ крови' },
  { href: '/analizy/analiz-mochi/', title: 'Анализ мочи' },
  { href: '/analizy/ferritin/', title: 'Ферритин' },
]

function SitemapSection({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; title: string }>
}) {
  return (
    <section className="rounded-[2rem] border border-olive-primary/10 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-heading font-light text-olive-primary">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex text-olive-primary/78 underline-offset-4 transition-colors hover:text-olive-primary hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function HtmlSitemapPage() {
  const infusionPages = getUniqueInfusions()
    .map((item) => ({
      href: `/kapelnicy/${item.slug}/`,
      title: item.title,
    }))
    .sort((left, right) => left.title.localeCompare(right.title, 'ru'))

  const articlePages = [...articles]
    .map((item) => ({
      href: `/articles/${item.slug}/`,
      title: item.h1 || item.title,
    }))
    .sort((left, right) => left.title.localeCompare(right.title, 'ru'))
  const allLinks = [...mainPages, ...analysisPages, ...infusionPages, ...articlePages]
  const collectionPageJsonLd = createWebPageJsonLd({
    url: '/sitemap/',
    name: 'Карта сайта',
    description:
      'Карта сайта BIORISE: основные разделы, капельницы, анализы, чек-апы и статьи.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/sitemap/',
    name: 'Все основные URL сайта BIORISE',
    items: allLinks.map((item) => ({
      url: item.href,
      name: item.title,
    })),
  })

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <JsonLd data={[collectionPageJsonLd, itemListJsonLd]} />
      <Header />
      <section
        className="pb-16"
        style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Карта сайта', href: '/sitemap/' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl font-heading font-light leading-tight text-olive-primary sm:text-4xl md:text-5xl">
              Карта сайта
            </h1>
            <p className="mt-4 text-base leading-relaxed text-olive-primary/70 sm:text-lg">
              Все основные разделы сайта BIORISE собраны на одной странице:
              услуги, анализы, чек-апы, капельницы и статьи.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            <SitemapSection title="Основные разделы" links={mainPages} />
            <SitemapSection title="Анализы" links={analysisPages} />
            <SitemapSection title="Капельницы" links={infusionPages} />
            <SitemapSection title="Статьи" links={articlePages} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
