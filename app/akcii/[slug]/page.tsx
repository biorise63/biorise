import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PromoContent from './PromoContent'
import { promos, getPromoBySlug } from '@/lib/promos'
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

export function generateStaticParams() {
  return promos.map((promo) => ({ slug: promo.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const promo = getPromoBySlug(params.slug)
  if (!promo) return {}

  const h1Text = promo.h1 || promo.title
  const title = `${h1Text} | ${formatPrice(promo.price)} до ${promo.validUntil} | BIORISE`
  const description = `${promo.subtitle}. Цена ${formatPrice(promo.price)} вместо ${promo.oldPrice ? formatPrice(promo.oldPrice) : ''}. Акция до ${promo.validUntil} в клинике BIORISE в Самаре.`

  return {
    title,
    description,
    keywords: [promo.title, `${promo.title} самара`, 'акция чек-ап самара', 'BIORISE', 'БИОРАЙЗ'],
    alternates: {
      canonical: `${SITE_URL}/akcii/${promo.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/akcii/${promo.slug}/`,
      type: 'article',
    },
  }
}

export default function PromoPage({ params }: PageProps) {
  const promo = getPromoBySlug(params.slug)
  if (!promo) notFound()

  const h1Text = promo.h1 || promo.title
  const pageUrl = `/akcii/${promo.slug}/`

  const webPageJsonLd = createWebPageJsonLd({
    url: pageUrl,
    name: h1Text,
    description: promo.subtitle,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: pageUrl,
    name: promo.title,
    description: promo.intro,
    serviceType: 'Комплексное лабораторное обследование',
    price: formatPrice(promo.price),
    priceValidUntil: promo.validUntilIso,
  })
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: promo.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={[medicalClinicJsonLd, webPageJsonLd, serviceJsonLd, faqJsonLd]} />
      <PromoContent promo={promo} />
    </>
  )
}
