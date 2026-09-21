import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Quote, ShieldCheck } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { getWeightLossProgramBySlug, weightLossPrograms } from '@/lib/weightLossPrograms'
import {
  createFaqJsonLd,
  createServiceJsonLd,
  createWebPageJsonLd,
  medicalClinicJsonLd,
} from '@/lib/structured-data'
import { FeatureIcon } from '../FeatureIcon'
import ProgramDetailActions from '../ProgramDetailActions'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export function generateStaticParams() {
  return weightLossPrograms.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const program = getWeightLossProgramBySlug(params.slug)
  if (!program) return {}

  const title = `${program.h1} | BIORISE`

  return {
    title,
    description: program.metaDescription,
    alternates: { canonical: `${SITE_URL}/pohudenie/${program.slug}/` },
    openGraph: {
      title,
      description: program.metaDescription,
      url: `${SITE_URL}/pohudenie/${program.slug}/`,
      type: 'article',
    },
  }
}

export default function WeightLossProgramDetailPage({ params }: PageProps) {
  const program = getWeightLossProgramBySlug(params.slug)
  if (!program) notFound()

  const pageUrl = `${SITE_URL}/pohudenie/${program.slug}/`
  const webPageJsonLd = createWebPageJsonLd({
    url: `/pohudenie/${program.slug}/`,
    name: program.h1,
    description: program.metaDescription,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/pohudenie/${program.slug}/`,
    name: program.title,
    description: program.description,
    serviceType: 'Программа снижения веса',
    price: formatPrice(program.price),
  })
  const faqJsonLd = createFaqJsonLd(program.faq)

  const related = weightLossPrograms.filter((p) => p.slug !== program.slug)

  return (
    <>
      <JsonLd data={[medicalClinicJsonLd, webPageJsonLd, serviceJsonLd, faqJsonLd]} />
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <section className="container mx-auto px-4 pb-12 sm:px-6 sm:pb-16">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Программы для похудения', href: '/pohudenie/' },
              { name: program.title, href: pageUrl.replace(SITE_URL, '') },
            ]}
          />
          <Link
            href="/pohudenie/"
            className="mb-6 mt-4 inline-flex text-sm font-semibold text-olive-primary transition-colors hover:text-olive-primary"
          >
            ← Все программы для похудения
          </Link>

          <span className="inline-flex w-fit items-center rounded-full bg-olive-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary">
            Размер {program.size}
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
            {program.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-olive-primary sm:text-xl">
            {program.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-text">
            {program.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-1.5 sm:gap-2">
            <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
              <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Стоимость</span>
              <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{formatPrice(program.price)}</strong>
            </div>
            <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
              <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Длительность</span>
              <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{program.duration}</strong>
            </div>
            <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
              <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Снижение веса*</span>
              <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{program.weightLossRange}</strong>
            </div>
          </div>
          <p className="mt-2 text-xs text-olive-primary/60">* результат зависит от начального веса и индивидуальных особенностей организма</p>

          <div className="mt-8">
            <ProgramDetailActions />
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-olive-primary/70">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            Программа назначается врачом после осмотра, только сертифицированные препараты
          </p>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-8">
            <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Что входит в программу
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {program.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-olive-primary/8 bg-beige-background/45 px-4 py-3 text-sm leading-relaxed text-olive-text"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                    <FeatureIcon icon={feature.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {feature.text}
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-8">
            <h2 className="mb-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Как проходит программа
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Врач оценивает жалобы, анамнез и противопоказания на первичной консультации.',
                'Проводится чек-ап «Контроль веса» и биоимпедансный анализ тела для точной картины.',
                'По результатам подбирается курс капельниц, пептидной терапии и, при необходимости, бустеров.',
                'Врач сопровождает весь курс и корректирует план по промежуточным результатам.',
              ].map((item, index) => (
                <div key={item} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="text-sm font-semibold text-olive-primary">0{index + 1}</span>
                  <p className="mt-2 text-olive-text">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <blockquote className="flex items-start gap-4 rounded-2xl bg-olive-primary/5 px-5 py-4 text-olive-primary sm:px-6">
            <Quote className="mt-0.5 h-6 w-6 shrink-0 fill-olive-primary/15 text-olive-primary" strokeWidth={1.8} aria-hidden="true" />
            <p className="m-0 text-base font-medium leading-relaxed sm:text-[17px]">
              Результат снижения веса всегда зависит от начального веса, обмена веществ и индивидуальных
              особенностей организма — диапазон {program.weightLossRange} является ориентиром по программе,
              а не гарантированным результатом.
            </p>
          </blockquote>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-8">
            <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">FAQ</h2>
            <div className="space-y-5">
              {program.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-base font-semibold text-olive-primary">{item.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-olive-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {related.length > 0 && (
          <section className="container mx-auto px-4 pb-16 sm:px-6">
            <section className="rounded-[28px] bg-olive-primary p-5 text-white shadow-premium sm:p-7">
              <h2 className="mb-4 text-2xl font-heading font-light">Другие программы BIORISE</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/pohudenie/${item.slug}/`}
                    className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/16"
                  >
                    <span className="block font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm text-white/75">{formatPrice(item.price)}</span>
                  </Link>
                ))}
              </div>
            </section>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
