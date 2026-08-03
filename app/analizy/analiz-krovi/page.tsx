import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import AnalizKroviContent from './AnalizKroviContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Анализ крови в Самаре | Быстрые результаты | Клиника БИОРАЙЗ',
  description:
    'Сдать анализ крови в БИОРАЙЗ можно быстро и без очередей. Результат базового исследования обычно готов за 1 день, запись онлайн или по телефону.',
  keywords: ['анализ крови самара', 'общий анализ крови', 'сдать анализ крови', 'биорайз самара'],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/analiz-krovi/',
  },
  openGraph: {
    title: 'Анализ крови в Самаре | Быстрые результаты | Клиника БИОРАЙЗ',
    description:
      'Сдать анализ крови в БИОРАЙЗ можно быстро и без очередей. Результат базового исследования обычно готов за 1 день, запись онлайн или по телефону.',
    url: 'https://biorise-clinic.ru/analizy/analiz-krovi/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Анализ крови в Самаре | Быстрые результаты | Клиника БИОРАЙЗ',
    description:
      'Сдать анализ крови в БИОРАЙЗ можно быстро и без очередей. Результат базового исследования обычно готов за 1 день, запись онлайн или по телефону.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BloodAnalysisPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/analizy/analiz-krovi/',
    name: 'Анализ крови в Самаре',
    description:
      'Сдать анализ крови в БИОРАЙЗ можно быстро и без очередей. Результат базового исследования обычно готов за 1 день, запись онлайн или по телефону.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/analiz-krovi/',
    name: 'Анализ крови в Самаре',
    description:
      'Лабораторный анализ крови в клинике БИОРАЙЗ в Самаре с записью онлайн или по телефону.',
    serviceType: 'Лабораторная диагностика',
    price: '600 ₽',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <AnalizKroviContent />
      <Footer />
    </main>
  )
}
