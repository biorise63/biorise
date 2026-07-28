import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'
import AnalizyContent from './AnalizyContent'

export const metadata: Metadata = {
  title: 'Анализы в Самаре: сдать анализы, цены, чек-апы | BIORISE',
  description:
    'Анализы BIORISE в Самаре: кровь, гормоны, ферритин, витамины, биохимия и другие исследования. Удобная запись и консультация врача.',
  keywords: [
    'анализы самара',
    'сдать анализы самара',
    'лабораторные анализы самара',
    'анализ крови самара',
    'анализ мочи самара',
    'ферритин самара',
    'гормоны самара',
    'чек ап самара',
    'biorise анализы',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/',
  },
  openGraph: {
    title: 'Анализы в Самаре: сдать анализы, цены, чек-апы | BIORISE',
    description:
      'Анализы BIORISE в Самаре: кровь, гормоны, ферритин, витамины, биохимия и другие исследования.',
    url: 'https://biorise-clinic.ru/analizy/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Анализы в Самаре: сдать анализы, цены, чек-апы | BIORISE',
    description:
      'Анализы BIORISE в Самаре: кровь, гормоны, ферритин, витамины и биохимия. Запись и консультация врача.',
  },
}

export default function AnalizyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AnalizyContent />
      <Footer />
      {/* <ExitIntentOffersPopup /> */}
    </main>
  )
}
