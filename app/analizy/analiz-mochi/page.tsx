import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import AnalizMochiContent from './AnalizMochiContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Анализ мочи в Самаре | Клиника БИОРАЙЗ',
  description:
    'Сдать общий анализ мочи в BIORISE можно без очередей. Результат обычно готов за 1 к.д., запись онлайн или по телефону.',
  keywords: ['анализ мочи самара', 'общий анализ мочи', 'сдать анализ мочи', 'биорайз самара'],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/analiz-mochi/',
  },
  openGraph: {
    title: 'Анализ мочи в Самаре | Клиника БИОРАЙЗ',
    description:
      'Сдать общий анализ мочи в BIORISE можно без очередей. Результат обычно готов за 1 к.д., запись онлайн или по телефону.',
    url: 'https://biorise-clinic.ru/analizy/analiz-mochi/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Анализ мочи в Самаре | Клиника БИОРАЙЗ',
    description:
      'Сдать общий анализ мочи в BIORISE можно без очередей. Результат обычно готов за 1 к.д., запись онлайн или по телефону.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function UrineAnalysisPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/analizy/analiz-mochi/',
    name: 'Анализ мочи в Самаре',
    description:
      'Сдать общий анализ мочи в BIORISE можно без очередей. Результат обычно готов за 1 к.д., запись онлайн или по телефону.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/analiz-mochi/',
    name: 'Анализ мочи в Самаре',
    description:
      'Общий анализ мочи в клинике БИОРАЙЗ в Самаре с записью онлайн или по телефону.',
    serviceType: 'Лабораторная диагностика',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <AnalizMochiContent />
      <Footer />
    </main>
  )
}
