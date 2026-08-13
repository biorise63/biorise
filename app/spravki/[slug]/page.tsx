import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import SpravkaDetailActions from '@/components/spravki/SpravkaDetailActions'
import { spravkiItems } from '@/lib/spravki'
import {
  createServiceJsonLd,
  createWebPageJsonLd,
  medicalClinicJsonLd,
} from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

function getItem(slug: string) {
  return spravkiItems.find((item) => item.slug === slug) ?? null
}

export function generateStaticParams() {
  return spravkiItems.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const item = getItem(params.slug)
  if (!item) return {}

  const title = `${item.h1} | BIORISE`
  const description = `${item.shortDescription}. Стоимость ${item.price}, срок оформления ${item.duration} в клинике BIORISE в Самаре.`

  return {
    title,
    description,
    keywords: [item.name, item.h1, 'справки самара', 'медицинские справки самара', 'BIORISE', 'БИОРАЙЗ'],
    alternates: {
      canonical: `${SITE_URL}/spravki/${item.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/spravki/${item.slug}/`,
      type: 'article',
    },
  }
}

export default function SpravkaDetailPage({ params }: PageProps) {
  const item = getItem(params.slug)
  if (!item) notFound()

  const pageUrl = `${SITE_URL}/spravki/${item.slug}/`
  const webPageJsonLd = createWebPageJsonLd({
    url: `/spravki/${item.slug}/`,
    name: item.h1,
    description: item.description,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/spravki/${item.slug}/`,
    name: item.h1,
    description: item.description,
    serviceType: 'Медицинская справка',
    price: item.price,
  })

  const related = spravkiItems.filter((p) => p.slug !== item.slug).slice(0, 4)

  return (
    <>
      <JsonLd data={[medicalClinicJsonLd, webPageJsonLd, serviceJsonLd]} />
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <section className="container mx-auto px-4 pb-12 sm:px-6 sm:pb-16">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Справки', href: '/spravki/' },
              { name: item.name, href: `/spravki/${item.slug}/` },
            ]}
          />
          <Link
            href="/spravki/"
            className="mb-6 mt-4 inline-flex text-sm font-semibold text-olive-primary transition-colors hover:text-olive-primary"
          >
            ← Все справки
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
            Медицинская справка BIORISE
          </p>
          <h1 className="max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
            {item.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-olive-text sm:text-xl">
            {item.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/85 px-5 py-4 shadow-premium">
              <span className="block text-xs uppercase tracking-[0.12em] text-olive-primary">Стоимость</span>
              <strong className="mt-1 block text-2xl text-olive-primary">{item.price}</strong>
            </div>
            <div className="rounded-2xl bg-white/85 px-5 py-4 shadow-premium">
              <span className="block text-xs uppercase tracking-[0.12em] text-olive-primary">Срок оформления</span>
              <strong className="mt-1 block text-2xl text-olive-primary">{item.duration}</strong>
            </div>
          </div>

          <div className="mt-8">
            <SpravkaDetailActions />
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">Как оформить справку</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Записываетесь на приём в удобное время.',
                'Проходите осмотр у нужного специалиста (или нескольких, если этого требует форма справки).',
                'Врач заполняет справку установленного образца.',
                'Получаете готовую справку с печатью и подписью врача.',
              ].map((step, index) => (
                <div key={step} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="text-sm font-semibold text-olive-primary">0{index + 1}</span>
                  <p className="mt-2 text-olive-text">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 sm:px-6">
          <section className="rounded-[28px] bg-olive-primary p-5 text-white shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light">Другие справки BIORISE</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((related_item) => (
                <Link
                  key={related_item.slug}
                  href={`/spravki/${related_item.slug}/`}
                  className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/16"
                >
                  <span className="block font-semibold">{related_item.name}</span>
                  <span className="mt-1 block text-sm text-white/75">{related_item.price}</span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}
