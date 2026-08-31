import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import TSpotContent from './TSpotContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'T-spot в Самаре | 6500 ₽ в клинике Биорайз',
  description:
    'Сдать анализ T-SPOT в Самаре в клинике BIORISE: диагностика туберкулёзной инфекции без Манту и Диаскинтеста. Цена 6 500 ₽. Запись онлайн или по телефону.',
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
    title: 'T-spot в Самаре | 6500 ₽ в клинике Биорайз',
    description: 'Диагностика туберкулёзной инфекции без кожных проб. Цена 6 500 ₽.',
    url: 'https://biorise-clinic.ru/analizy/t-spot/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://biorise-clinic.ru/optimized/promo/promo-tspot.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T-spot в Самаре | 6500 ₽',
    description: 'Диагностика туберкулёзной инфекции без Манту и Диаскинтеста.',
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
      'Диагностика туберкулёзной инфекции T-SPOT в BIORISE: без Манту и Диаскинтеста, для взрослых и детей по назначению врача.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/t-spot/',
    name: 'T-SPOT в Самаре',
    description: 'Диагностика туберкулёзной инфекции без кожных проб, по назначению врача.',
    serviceType: 'Лабораторная диагностика',
    price: '6500 ₽',
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
