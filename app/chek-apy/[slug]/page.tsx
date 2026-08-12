import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import CheckupDetailActions from '@/components/checkups/CheckupDetailActions'
import { checkupPrograms } from '@/lib/checkups'
import {
  createServiceJsonLd,
  createWebPageJsonLd,
  medicalClinicJsonLd,
} from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function getProgram(slug: string) {
  return checkupPrograms.find((p) => p.slug === slug) ?? null
}

function getH1(program: (typeof checkupPrograms)[number]) {
  return program.h1 || `${program.title} в Самаре`
}

export function generateStaticParams() {
  return checkupPrograms.map((program) => ({ slug: program.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const program = getProgram(params.slug)
  if (!program) return {}

  const h1Text = getH1(program)
  const title = `${h1Text} | BIORISE`
  const description = `${program.summary} Цена ${formatPrice(program.price ?? 0)} в клинике BIORISE в Самаре.`

  return {
    title,
    description,
    keywords: [
      program.title,
      `${program.title} Самара`,
      `чек ап ${program.title.toLowerCase()}`,
      'чек ап самара',
      'чек-ап самара',
      'комплексное обследование самара',
      'BIORISE',
      'БИОРАЙЗ',
    ],
    alternates: {
      canonical: `${SITE_URL}/chek-apy/${program.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/chek-apy/${program.slug}/`,
      type: 'article',
    },
  }
}

export default function CheckupDetailPage({ params }: PageProps) {
  const program = getProgram(params.slug)
  if (!program) notFound()

  const h1Text = getH1(program)
  const pageUrl = `${SITE_URL}/chek-apy/${program.slug}/`
  const webPageJsonLd = createWebPageJsonLd({
    url: `/chek-apy/${program.slug}/`,
    name: h1Text,
    description: program.summary,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/chek-apy/${program.slug}/`,
    name: h1Text,
    description: program.summary,
    serviceType: 'Медицинский чек-ап',
    price: program.price ? formatPrice(program.price) : undefined,
  })
  const procedureJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${pageUrl}#medical-procedure`,
    name: program.title,
    description: program.summary,
    provider: {
      '@id': 'https://biorise-clinic.ru/#medical-clinic',
    },
    offers: program.price
      ? {
          '@type': 'Offer',
          priceCurrency: 'RUB',
          price: program.price,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }

  const related = checkupPrograms.filter((p) => p.slug !== program.slug).slice(0, 4)

  return (
    <>
      <JsonLd data={[medicalClinicJsonLd, webPageJsonLd, serviceJsonLd, procedureJsonLd]} />
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <section className="container mx-auto px-4 pb-12 sm:px-6 sm:pb-16">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Чек-апы', href: '/chek-apy/' },
              { name: program.title, href: `/chek-apy/${program.slug}/` },
            ]}
          />
          <Link
            href="/chek-apy/"
            className="mb-6 mt-4 inline-flex text-sm font-semibold text-olive-primary transition-colors hover:text-olive-primary"
          >
            ← Все чек-ап программы
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
            Чек-ап программа BIORISE
          </p>
          <h1 className="max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
            {h1Text}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-olive-text sm:text-xl">
            {program.summary}
          </p>

          {program.price && (
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white/85 px-5 py-4 shadow-premium">
                <span className="block text-xs uppercase tracking-[0.12em] text-olive-primary">Стоимость</span>
                <div className="mt-1 flex items-baseline gap-2">
                  {program.oldPrice && (
                    <span className="text-base text-olive-primary/60 line-through">
                      {formatPrice(program.oldPrice)}
                    </span>
                  )}
                  <strong className="block text-2xl text-olive-primary">{formatPrice(program.price)}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <CheckupDetailActions />
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Что входит в программу
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {program.items.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-olive-primary/8 bg-beige-background/45 px-4 py-3 text-sm leading-relaxed text-olive-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">Как проходит чек-ап</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Врач уточняет жалобы, анамнез и цель обследования.',
                'Вы сдаёте анализы и проходите нужные исследования за один визит.',
                'Результаты собираются в единый отчёт.',
                'Врач разбирает результаты и предлагает дальнейшие шаги.',
              ].map((item, index) => (
                <div key={item} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="text-sm font-semibold text-olive-primary">0{index + 1}</span>
                  <p className="mt-2 text-olive-text">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="container mx-auto px-4 pb-16 sm:px-6">
          <section className="rounded-[28px] bg-olive-primary p-5 text-white shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light">Другие чек-ап программы BIORISE</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/chek-apy/${item.slug}/`}
                  className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/16"
                >
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm text-white/75">
                    {item.price ? formatPrice(item.price) : 'Цена по запросу'}
                  </span>
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
