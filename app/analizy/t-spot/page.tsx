import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import TSpotContent from './TSpotContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'T-spot в Самаре | 5800р вместо 7900р - акция до конца августа в клинике Биорайз',
  description:
    'Сдать анализ T-SPOT в Самаре в клинике BIORISE: диагностика туберкулёзной инфекции без Манту и Диаскинтеста. Акция до 31 августа - 5 800 ₽ вместо 7 900 ₽. Запись онлайн или по телефону.',
  keywords: [
    't-spot самара',
    't spot самара',
    'т-спот самара',
    'анализ на туберкулез самара',
    't-spot цена самара',
    'biorise t-spot',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/t-spot/',
  },
  openGraph: {
    title: 'T-spot в Самаре | 5800р вместо 7900р - акция до конца августа в клинике Биорайз',
    description:
      'Диагностика туберкулёзной инфекции без кожных проб. Акция до 31 августа - 5 800 ₽ вместо 7 900 ₽.',
    url: 'https://biorise-clinic.ru/analizy/t-spot/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://biorise-clinic.ru/optimized/promo/promo-tspot.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T-spot в Самаре | 5800р вместо 7900р - акция до конца августа',
    description: 'Диагностика туберкулёзной инфекции без Манту и Диаскинтеста. Акция до 31 августа.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TSpotPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/analizy/t-spot/',
    name: 'T-spot в Самаре',
    description:
      'Диагностика туберкулёзной инфекции T-SPOT в BIORISE: без Манту и Диаскинтеста, для взрослых и детей по назначению врача. Акция до 31 августа.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/t-spot/',
    name: 'T-SPOT в Самаре',
    description: 'Диагностика туберкулёзной инфекции без кожных проб, по назначению врача.',
    serviceType: 'Лабораторная диагностика',
    price: '5800 ₽',
    priceValidUntil: '2026-08-31',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <TSpotContent />
      <Footer />
    </main>
  )
}
