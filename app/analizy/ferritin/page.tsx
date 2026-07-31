import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FerritinContent from './FerritinContent'

export const metadata: Metadata = {
  title: 'Ферритин Самара | Анализ на ферритин | Клиника БИОРАЙЗ',
  description:
    'Сдать анализ на ферритин в Самаре в BIORISE. Оценка запасов железа, результат обычно за 1 р.д., запись онлайн или по телефону.',
  keywords: [
    'ферритин самара',
    'анализ на ферритин самара',
    'сдать ферритин самара',
    'ферритин цена самара',
    'низкий ферритин',
    'биорайз самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/ferritin/',
  },
  openGraph: {
    title: 'Ферритин Самара | Анализ на ферритин | Клиника БИОРАЙЗ',
    description:
      'Сдать анализ на ферритин в BIORISE. Исследование помогает оценить запасы железа и подобрать дальнейшую тактику с врачом.',
    url: 'https://biorise-clinic.ru/analizy/ferritin/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ферритин Самара | Анализ на ферритин | Клиника БИОРАЙЗ',
    description:
      'Анализ на ферритин в Самаре: оценка запасов железа, цена, срок и запись в BIORISE.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FerritinPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FerritinContent />
      <Footer />
    </main>
  )
}
