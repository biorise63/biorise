import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Quote, ShieldCheck, Sparkles } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { complexPrograms, getComplexProgramBySlug } from '@/lib/complexPrograms'
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
  return complexPrograms.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const program = getComplexProgramBySlug(params.slug)
  if (!program) return {}

  const title = `${program.h1} | BIORISE`

  return {
    title,
    description: program.metaDescription,
    alternates: { canonical: `${SITE_URL}/programmy/${program.slug}/` },
    openGraph: {
      title,
      description: program.metaDescription,
      url: `${SITE_URL}/programmy/${program.slug}/`,
      type: 'article',
    },
  }
}

export default function ComplexProgramDetailPage({ params }: PageProps) {
  const program = getComplexProgramBySlug(params.slug)
  if (!program) notFound()

  const pageUrl = `${SITE_URL}/programmy/${program.slug}/`
  const webPageJsonLd = createWebPageJsonLd({
    url: `/programmy/${program.slug}/`,
    name: program.h1,
    description: program.metaDescription,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/programmy/${program.slug}/`,
    name: program.title,
    description: program.description,
    serviceType: 'Комплексная программа восстановления',
    price: formatPrice(program.price),
  })
  const faqJsonLd = createFaqJsonLd(program.faq)

  const related = complexPrograms.filter((p) => p.slug !== program.slug)

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
              { name: 'Комплексные программы', href: '/programmy/' },
              { name: program.title, href: pageUrl.replace(SITE_URL, '') },
            ]}
          />
          <Link
            href="/programmy/"
            className="mb-6 mt-4 inline-flex text-sm font-semibold text-olive-primary transition-colors hover:text-olive-primary"
          >
            ← Все комплексные программы
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
            {program.tagline}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
            {program.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-text">
            {program.description}
          </p>

          <div className="mt-7 flex flex-wrap items-baseline gap-3">
            {program.oldPrice && (
              <span className="text-xl text-olive-primary/50 line-through">
                {formatPrice(program.oldPrice)}
              </span>
            )}
            <strong className="text-3xl text-olive-primary">{formatPrice(program.price)}</strong>
            {program.oldPrice && (
              <span className="rounded-full bg-olive-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-olive-primary">
                Выгода {formatPrice(program.oldPrice - program.price)}
              </span>
            )}
          </div>

          <div className="mt-8">
            <ProgramDetailActions />
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-olive-primary/70">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            Имеются противопоказания, необходима консультация специалиста
          </p>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                Программа подойдёт, если вы
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {program.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-olive-primary/8 bg-beige-background/45 px-4 py-3 text-sm leading-relaxed text-olive-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
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
                  <span>
                    <strong className="block font-semibold text-olive-primary">{feature.title}</strong>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <blockquote className="flex items-start gap-4 rounded-2xl bg-olive-primary/5 px-5 py-4 text-olive-primary sm:px-6">
            <Quote className="mt-0.5 h-6 w-6 shrink-0 fill-olive-primary/15 text-olive-primary" strokeWidth={1.8} aria-hidden="true" />
            <p className="m-0 text-base font-medium leading-relaxed sm:text-[17px]">
              Врач оценивает состояние и результаты анализов и определяет возможность проведения
              инфузионной терапии с учётом индивидуальных показаний.
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
                    href={`/programmy/${item.slug}/`}
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
