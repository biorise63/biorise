import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { weightLossPrograms } from '@/lib/weightLossPrograms'
import { createItemListJsonLd, createWebPageJsonLd, medicalClinicJsonLd } from '@/lib/structured-data'
import { FeatureIcon } from './FeatureIcon'

const SITE_URL = 'https://biorise-clinic.ru'

export const metadata: Metadata = {
  title: 'Программы для похудения в Самаре: M, L, XL | BIORISE',
  description:
    'Три программы снижения веса под контролем врача в клинике BIORISE в Самаре: чек-ап, капельницы, пептидная терапия. Цены от 36 900 ₽, результат зависит от начального веса.',
  alternates: { canonical: `${SITE_URL}/pohudenie/` },
  openGraph: {
    title: 'Программы для похудения в Самаре: M, L, XL | BIORISE',
    description:
      'Три программы снижения веса под контролем врача в клинике BIORISE в Самаре: чек-ап, капельницы, пептидная терапия.',
    url: `${SITE_URL}/pohudenie/`,
    type: 'website',
  },
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export default function WeightLossProgramsPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/pohudenie/',
    name: 'Программы для похудения в Самаре',
    description:
      'Три программы снижения веса под контролем врача в клинике BIORISE в Самаре: чек-ап, капельницы, пептидная терапия.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/pohudenie/',
    name: 'Программы для похудения BIORISE',
    items: weightLossPrograms.map((p) => ({ url: `/pohudenie/${p.slug}/`, name: p.title })),
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
              { name: 'Программы для похудения', href: '/pohudenie/' },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl">
            Программы для похудения в Самаре
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-olive-text sm:text-xl">
            Три программы снижения веса под контролем врача: диагностика, капельницы, пептидная терапия
            и сопровождение на каждом этапе. Подбираем формат под ваш запрос — от базовой поддержки
            до максимального протокола на 2 месяца.
          </p>
        </section>

        <section className="container mx-auto px-4 pb-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {weightLossPrograms.map((program) => (
              <article
                key={program.slug}
                className={`relative flex flex-col rounded-[2rem] border bg-white/85 p-6 shadow-premium transition-all hover:-translate-y-1 sm:p-8 ${
                  program.recommended ? 'border-olive-primary/40 ring-2 ring-olive-primary/20' : 'border-olive-primary/10'
                }`}
              >
                {program.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-olive-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-premium">
                    Рекомендуем
                  </span>
                )}

                <span className="inline-flex w-fit items-center rounded-full bg-olive-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary">
                  Размер {program.size}
                </span>
                <h2 className="mt-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                  {program.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-olive-text">{program.tagline}</p>

                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <strong className="text-3xl font-heading font-light text-olive-primary">
                    {formatPrice(program.price)}
                  </strong>
                  <span className="text-sm text-olive-text">/ {program.duration}</span>
                </div>

                <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f4efe6] px-3 py-1.5 text-sm font-medium text-olive-primary">
                  Снижение веса {program.weightLossRange}
                </div>
                <p className="mt-1.5 text-xs text-olive-primary/60">* результат зависит от начального веса</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {program.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-olive-text">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                        <FeatureIcon icon={feature.icon} className="h-4 w-4" />
                      </span>
                      {feature.text}
                    </li>
                  ))}
                  {program.features.length > 5 && (
                    <li className="pl-10 text-sm text-olive-primary/60">
                      + ещё {program.features.length - 5}
                    </li>
                  )}
                </ul>

                <Link
                  href={`/pohudenie/${program.slug}/`}
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
            Все программы носят медицинский характер и назначаются после осмотра врача с учётом
            противопоказаний. Результат снижения веса зависит от начального веса, обмена веществ
            и индивидуальных особенностей организма — указанные диапазоны являются ориентиром, а не гарантией.
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
