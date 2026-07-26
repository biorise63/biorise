import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'
import InfusionDetailActions from '@/components/kapelnicy/InfusionDetailActions'
import { getInfusionBySlug, getUniqueInfusions } from '@/lib/kapelnicy'
import { getSeoImageAlt } from '@/lib/seo-image-alt'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

export function generateStaticParams() {
  return getUniqueInfusions().map((infusion) => ({ slug: infusion.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const infusion = getInfusionBySlug(params.slug)
  if (!infusion) return {}

  const title = `${infusion.title} в Самаре | BIORISE`
  const description = `${infusion.description.slice(0, 145)}${infusion.description.length > 145 ? '...' : ''}`
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

function InfoList({ title, items, variant = 'default' }: { title: string; items?: string[]; variant?: 'default' | 'numbered' }) {
  if (!items?.length) return null

  return (
    <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
      <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">{title}</h2>
      <ul className="space-y-3 text-olive-primary/80">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex gap-3 leading-relaxed">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-xs font-semibold text-olive-primary">
              {variant === 'numbered' ? index + 1 : '•'}
            </span>
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
    <section className="rounded-[28px] border border-olive-primary/10 bg-[#f4efe6] p-5 shadow-premium sm:p-7">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/55">Состав</p>
      <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">Что входит в инфузию</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm leading-relaxed text-olive-primary/80">
            {item}
          </div>
        ))}
      </div>
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: infusion.title,
    description: infusion.description,
    provider: {
      '@type': 'MedicalClinic',
      name: 'BIORISE',
      address: 'Самара, ул. Дыбенко, 27Б',
      telephone: '+79967499747',
    },
    offers: infusion.price
      ? {
          '@type': 'Offer',
          priceCurrency: 'RUB',
          price: infusion.price.replace(/[^\d]/g, ''),
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }

  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-beige-background text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
              <Link href="/kapelnicy/" className="mb-6 inline-flex text-sm font-semibold text-olive-primary/65 transition-colors hover:text-olive-primary">
                ← Все капельницы
              </Link>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary/55">
                {infusion.categoryTitle || 'IV-терапия BIORISE'}
              </p>
              <h1 className="max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
                {infusion.title} в Самаре
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-olive-primary/75 sm:text-xl">
                {infusion.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {infusion.price && (
                  <div className="rounded-2xl bg-white/85 px-5 py-4 shadow-premium">
                    <span className="block text-xs uppercase tracking-[0.12em] text-olive-primary/50">Стоимость</span>
                    <strong className="mt-1 block text-2xl text-olive-primary">{infusion.price}</strong>
                  </div>
                )}
                {infusion.duration && (
                  <div className="rounded-2xl bg-white/85 px-5 py-4 shadow-premium">
                    <span className="block text-xs uppercase tracking-[0.12em] text-olive-primary/50">Время процедуры</span>
                    <strong className="mt-1 block text-2xl text-olive-primary">{infusion.duration}</strong>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <InfusionDetailActions slug={infusion.slug} />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/70 p-5 shadow-premium">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-olive-primary/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-beige-background">
                {infusion.imageUrl ? (
                  <Image src={infusion.imageUrl} alt={getSeoImageAlt(infusion.title)} fill className="object-contain p-5" sizes="(max-width: 1024px) 100vw, 520px" priority />
                ) : (
                  <div className="flex h-full items-center justify-center text-olive-primary/50">Изображение скоро появится</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-2">
          <InfoList title="Когда может подойти" items={infusion.indications} />
          <InfoList title="Какой эффект ожидают" items={infusion.effect} variant="numbered" />
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <CompositionBlock items={infusion.composition} />
        </section>

        <section className="container mx-auto grid gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <InfoList title="Противопоказания" items={infusion.contraindications} />
          <section className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">Как проходит процедура</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Врач уточняет жалобы, анамнез и возможные ограничения.',
                'При необходимости состав подбирается по анализам и цели процедуры.',
                'Медсестра выполняет инфузию в комфортном кресле под наблюдением.',
                'После процедуры врач подсказывает дальнейший курс и контрольные шаги.',
              ].map((item, index) => (
                <div key={item} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="text-sm font-semibold text-olive-primary/50">0{index + 1}</span>
                  <p className="mt-2 text-olive-primary/80">{item}</p>
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
