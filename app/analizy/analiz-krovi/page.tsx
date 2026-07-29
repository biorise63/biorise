import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnalizKroviContent from './AnalizKroviContent'

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
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AnalizKroviContent />
      <Footer />
    </main>
  )
}
