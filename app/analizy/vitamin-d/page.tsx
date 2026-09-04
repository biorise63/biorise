import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import VitaminDContent from './VitaminDContent'
import { faqItems } from './faq'
import { createFaqJsonLd, createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Витамин Д Самара | Анализ на витамин Д | Клиника БИОРАЙЗ',
  description:
    'Сдать анализ на витамин Д в Самаре в BIORISE. Оценка дефицита витамина D, результат за 1 рабочий день, цена 2065 ₽, запись онлайн или по телефону.',
  keywords: [
    'витамин д самара',
    'анализ на витамин д самара',
    'сдать витамин д самара',
    'анализ на витамин д цена',
    'дефицит витамина д',
    'биорайз самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/vitamin-d/',
  },
  openGraph: {
    title: 'Витамин Д Самара | Анализ на витамин Д | Клиника БИОРАЙЗ',
    description:
      'Сдать анализ на витамин Д в BIORISE. Исследование помогает оценить дефицит витамина D и подобрать дальнейшую тактику с врачом.',
    url: 'https://biorise-clinic.ru/analizy/vitamin-d/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Витамин Д Самара | Анализ на витамин Д | Клиника БИОРАЙЗ',
    description: 'Анализ на витамин Д в Самаре: оценка дефицита, цена, срок и запись в BIORISE.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function VitaminDPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/analizy/vitamin-d/',
    name: 'Анализ витамина Д в Самаре',
    description:
      'Сдать анализ на витамин Д в Самаре в BIORISE. Оценка дефицита витамина D, результат за 1 рабочий день, цена 2065 ₽, запись онлайн или по телефону.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/vitamin-d/',
    name: 'Анализ на витамин Д в Самаре',
    description:
      'Анализ на витамин Д помогает оценить дефицит витамина D и подобрать дальнейшую тактику с врачом.',
    serviceType: 'Лабораторная диагностика',
    price: '2 065 ₽',
  })
  const faqJsonLd = createFaqJsonLd(faqItems)

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd, faqJsonLd]} />
      <Header />
      <VitaminDContent />
      <Footer />
    </main>
  )
}
