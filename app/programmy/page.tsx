import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { complexPrograms } from '@/lib/complexPrograms'
import { createItemListJsonLd, createWebPageJsonLd, medicalClinicJsonLd } from '@/lib/structured-data'
import { FeatureIcon } from './FeatureIcon'

const SITE_URL = 'https://biorise-clinic.ru'

export const metadata: Metadata = {
  title: 'Комплексные программы в Самаре | BIORISE',
  description:
    'Комплексные программы восстановления и укрепления здоровья в клинике BIORISE в Самаре: чек-ап, приёмы терапевта и курс капельниц под контролем врача.',
  alternates: { canonical: `${SITE_URL}/programmy/` },
  openGraph: {
    title: 'Комплексные программы в Самаре | BIORISE',
    description:
      'Комплексные программы восстановления и укрепления здоровья в клинике BIORISE в Самаре: чек-ап, приёмы терапевта и курс капельниц под контролем врача.',
    url: `${SITE_URL}/programmy/`,
    type: 'website',
  },
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export default function ComplexProgramsPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/programmy/',
    name: 'Комплексные программы в Самаре',
    description:
      'Комплексные программы восстановления и укрепления здоровья в клинике BIORISE в Самаре: чек-ап, приёмы терапевта и курс капельниц под контролем врача.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/programmy/',
    name: 'Комплексные программы BIORISE',
    items: complexPrograms.map((p) => ({ url: `/programmy/${p.slug}/`, name: p.title })),
  })

  return (
    <>
      <JsonLd data={[medicalClinicJsonLd, webPageJsonLd, itemListJsonLd]} />
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <section className="container mx-auto px-4 pb-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Комплексные программы', href: '/programmy/' },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl">
            Комплексные программы в Самаре
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-olive-text sm:text-xl">
            Диагностика, наблюдение врача и курс капельниц в едином протоколе - вместо разрозненных
            процедур, подобранных наугад.
          </p>
        </section>

        <section className="container mx-auto px-4 pb-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {complexPrograms.map((program) => (
              <article
                key={program.slug}
                className="relative flex flex-col rounded-[2rem] border border-olive-primary/10 bg-white/85 p-6 shadow-premium transition-all hover:-translate-y-1 sm:p-8"
              >
                <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                  {program.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-olive-text">{program.tagline}</p>

                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  {program.oldPrice && (
                    <span className="text-lg text-olive-primary/50 line-through">
                      {formatPrice(program.oldPrice)}
                    </span>
                  )}
                  <strong className="text-3xl font-heading font-light text-olive-primary">
                    {formatPrice(program.price)}
                  </strong>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-olive-text">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                        <FeatureIcon icon={feature.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="font-semibold text-olive-primary">{feature.title}</strong>
                        {': '}
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/programmy/${program.slug}/`}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-base font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
                >
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/70 p-6 text-sm text-olive-text sm:p-8">
            Программы носят медицинский характер и назначаются после осмотра врача с учётом
            противопоказаний. Решение о проведении инфузионной терапии врач принимает по результатам
            осмотра и анализов.
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
