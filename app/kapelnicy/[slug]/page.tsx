import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Check,
  FlaskConical,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
// import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'
import InfusionDetailActions from '@/components/kapelnicy/InfusionDetailActions'
import { getInfusionBySlug, getUniqueInfusions } from '@/lib/kapelnicy'
import { getSeoImageAlt } from '@/lib/seo-image-alt'
import {
  createImageObjectJsonLd,
  createServiceJsonLd,
  createWebPageJsonLd,
  medicalClinicJsonLd,
} from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

export function generateStaticParams() {
  return getUniqueInfusions().map((infusion) => ({ slug: infusion.slug }))
}

function truncateAtWord(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  const sliced = text.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(' ')
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength)}...`
}

export function generateMetadata({ params }: PageProps) {
  const infusion = getInfusionBySlug(params.slug)
  if (!infusion) return {}

  const title = `${infusion.title} в Самаре | BIORISE`
  const description = truncateAtWord(infusion.description, 145)
  const keywords = Array.from(
    new Set(
      [
        infusion.title,
        `${infusion.title} Самара`,
        `${infusion.title} в Самаре`,
        `капельница ${infusion.title}`,
        `капельница ${infusion.title} Самара`,
        infusion.categoryTitle,
        infusion.categoryTitle ? `${infusion.categoryTitle} Самара` : undefined,
        'капельницы Самара',
        'капельницы в Самаре',
        'IV терапия Самара',
        'инфузионная терапия Самара',
        'BIORISE',
        'БИОРАЙЗ',
      ].filter(Boolean) as string[],
    ),
  )

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_URL}/kapelnicy/${infusion.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/kapelnicy/${infusion.slug}/`,
      type: 'article',
      images: infusion.imageUrl ? [{ url: `${SITE_URL}${infusion.imageUrl}` }] : undefined,
    },
  }
}

function SectionIcon({ icon: Icon }: { icon: typeof Sparkles }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  )
}

function InfoList({
  title,
  items,
  variant = 'default',
  icon,
}: {
  title: string
  items?: string[]
  variant?: 'default' | 'numbered'
  icon: typeof Sparkles
}) {
  if (!items?.length) return null

  return (
    <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <SectionIcon icon={icon} />
        <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">{title}</h2>
      </div>
      <ul className="space-y-4 text-olive-text">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex gap-3 leading-relaxed">
            {variant === 'numbered' ? (
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-xs font-semibold text-olive-primary">
                {index + 1}
              </span>
            ) : (
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-primary text-white">
                <Check className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={3} />
              </span>
            )}
            <span>{item.replace(/^\d+\s*[.)]?\s*/, '').trim()}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CompositionBlock({ items }: { items?: string[] }) {
  if (!items?.length) return null

  return (
    <section className="rounded-[28px] border border-olive-primary/10 bg-[#f4efe6] p-6 shadow-premium sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <SectionIcon icon={FlaskConical} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary">Состав</p>
          <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">Что входит в инфузию</h2>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm leading-relaxed text-olive-text"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-olive-primary/15 text-olive-primary">
              <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function DosagePricingTable({ items }: { items?: { dosage: string; price: string }[] }) {
  if (!items?.length) return null

  return (
    <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <SectionIcon icon={Tag} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary">Дозировка и цена</p>
          <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">Варианты дозировки</h2>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-olive-primary/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-olive-primary/5 text-olive-primary">
              <th className="px-4 py-3 font-semibold sm:px-6">Дозировка</th>
              <th className="px-4 py-3 font-semibold sm:px-6">Цена</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={row.dosage} className={index % 2 === 0 ? 'bg-white' : 'bg-beige-background/60'}>
                <td className="px-4 py-3 text-olive-text sm:px-6">{row.dosage}</td>
                <td className="px-4 py-3 font-semibold text-olive-primary sm:px-6">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-olive-text/80">
        Точную дозировку подбирает врач на очной консультации с учётом веса, целей и переносимости препарата.
      </p>
    </section>
  )
}

function RelatedLinks({ currentSlug }: { currentSlug: string }) {
  const related = getUniqueInfusions().filter((item) => item.slug !== currentSlug).slice(0, 4)

  return (
    <section className="rounded-[28px] bg-olive-primary p-5 text-white shadow-premium sm:p-7">
      <h2 className="mb-4 text-2xl font-heading font-light">Другие капельницы BIORISE</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <Link key={item.slug} href={`/kapelnicy/${item.slug}/`} className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/16">
            <span className="block font-semibold">{item.title}</span>
            <span className="mt-1 block text-sm text-white/75">{item.price || 'Цена по запросу'}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function InfusionDetailPage({ params }: PageProps) {
  const infusion = getInfusionBySlug(params.slug)
  if (!infusion) notFound()

  const pageUrl = `${SITE_URL}/kapelnicy/${infusion.slug}/`
  const imageAlt = getSeoImageAlt(infusion.title)
  const webPageJsonLd = createWebPageJsonLd({
    url: `/kapelnicy/${infusion.slug}/`,
    name: `${infusion.title} в Самаре`,
    description: infusion.description,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/kapelnicy/${infusion.slug}/`,
    name: `${infusion.title} в Самаре`,
    description: infusion.description,
    serviceType: 'Инфузионная терапия',
    price: infusion.price,
  })
  const procedureJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${pageUrl}#medical-procedure`,
    name: infusion.title,
    description: infusion.description,
    provider: {
      '@id': 'https://biorise-clinic.ru/#medical-clinic',
    },
    offers: infusion.dosagePricing?.length
      ? infusion.dosagePricing.map((tier) => ({
          '@type': 'Offer',
          name: `${infusion.title}, ${tier.dosage}`,
          priceCurrency: 'RUB',
          price: tier.price.replace(/[^\d]/g, ''),
          availability: 'https://schema.org/InStock',
        }))
      : infusion.price
        ? {
            '@type': 'Offer',
            priceCurrency: 'RUB',
            price: infusion.price.replace(/[^\d]/g, ''),
            availability: 'https://schema.org/InStock',
          }
        : undefined,
  }
  const imageObjectJsonLd = infusion.imageUrl
    ? createImageObjectJsonLd({
        url: infusion.imageUrl,
        name: imageAlt,
        caption: imageAlt,
      })
    : null

  return (
    <>
      <JsonLd
        data={[
          medicalClinicJsonLd,
          webPageJsonLd,
          serviceJsonLd,
          procedureJsonLd,
          ...(imageObjectJsonLd ? [imageObjectJsonLd] : []),
        ]}
      />
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <section className="container mx-auto px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:items-center">
            <div>
              <Breadcrumbs
                items={[
                  { name: 'Главная', href: '/' },
                  { name: 'Капельницы', href: '/kapelnicy/' },
                  { name: infusion.title, href: `/kapelnicy/${infusion.slug}/` },
                ]}
              />
              <Link href="/kapelnicy/" className="mb-6 inline-flex text-sm font-semibold text-olive-primary transition-colors hover:text-olive-primary">
                ← Все капельницы
              </Link>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
                {infusion.categoryTitle || 'IV-терапия BIORISE'}
              </p>
              <h1 className="max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
                {infusion.title} в Самаре
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-olive-text sm:text-xl">
                {infusion.description}
              </p>

              <div className="mt-7 flex gap-1.5 sm:gap-2">
                {infusion.price && (
                  <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
                    <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Стоимость</span>
                    <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{infusion.price}</strong>
                  </div>
                )}
                {infusion.duration && (
                  <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
                    <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Время процедуры</span>
                    <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{infusion.duration}</strong>
                  </div>
                )}
                {infusion.dosage && (
                  <div className="min-w-0 flex-1 rounded-xl bg-white/85 px-2.5 py-2 text-center shadow-premium sm:flex-initial sm:px-4 sm:py-2.5 sm:text-left">
                    <span className="block truncate text-[8px] uppercase tracking-[0.04em] text-olive-primary sm:text-[10px] sm:tracking-[0.1em]">Дозировка</span>
                    <strong className="mt-0.5 block text-sm text-olive-primary sm:text-base">{infusion.dosage}</strong>
                  </div>
                )}
              </div>

              {infusion.crossLink && (
                <Link
                  href={infusion.crossLink.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-olive-primary/50 bg-beige-background px-5 py-2.5 text-sm font-medium text-olive-primary transition-all hover:-translate-y-0.5 hover:border-olive-primary hover:bg-beige-background/70"
                >
                  {infusion.crossLink.text}
                  <span className="relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive-primary/40" />
                    <span aria-hidden="true" className="relative text-base font-bold">→</span>
                  </span>
                </Link>
              )}

              <div className="mt-8">
                <InfusionDetailActions slug={infusion.slug} />
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-olive-primary/70">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                Только сертифицированные препараты
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/70 p-5 shadow-premium">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-olive-primary/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-beige-background">
                {infusion.imageUrl ? (
                  <Image src={infusion.imageUrl} alt={imageAlt} fill className="object-contain p-5" sizes="(max-width: 1024px) 100vw, 520px" priority />
                ) : (
                  <div className="flex h-full items-center justify-center text-olive-primary">Изображение скоро появится</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {infusion.dosagePricing && (
          <section className="container mx-auto px-4 pb-12 sm:px-6">
            <DosagePricingTable items={infusion.dosagePricing} />
          </section>
        )}

        <section className="container mx-auto grid gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-2">
          <InfoList title="Когда может подойти" items={infusion.indications} icon={Sparkles} />
          <InfoList title="Какой эффект ожидают" items={infusion.effect} variant="numbered" icon={TrendingUp} />
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <CompositionBlock items={infusion.composition} />
        </section>

        <section className="container mx-auto grid gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <InfoList title="Противопоказания" items={infusion.contraindications} icon={ShieldAlert} />
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <SectionIcon icon={ListChecks} />
              <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">Как проходит процедура</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Врач уточняет жалобы, анамнез и возможные ограничения.',
                'При необходимости состав подбирается по анализам и цели процедуры.',
                'Медсестра выполняет инфузию в комфортном кресле под наблюдением.',
                'После процедуры врач подсказывает дальнейший курс и контрольные шаги.',
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
          <RelatedLinks currentSlug={infusion.slug} />
        </section>
      </main>
      <Footer />
      {/* <ExitIntentOffersPopup /> */}
    </>
  )
}
