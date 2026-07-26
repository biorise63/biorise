import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckupsContent from './CheckupsContent'

export const metadata: Metadata = {
  title: 'Чек-апы в Самаре: программы обследований и цены | BIORISE',
  description:
    'Чек-апы в Самаре в клинике BIORISE: комплексные программы обследований для женщин, мужчин, детей, дефицитов и профилактики. Актуальные цены и удобный выбор по направлениям.',
  keywords: [
    'чек ап самара',
    'чек-ап самара',
    'комплексное обследование самара',
    'check up самара',
    'чек ап для женщин самара',
    'чек ап для мужчин самара',
    'детский чек ап самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/chek-apy/',
  },
  openGraph: {
    title: 'Чек-апы в Самаре: программы обследований и цены | BIORISE',
    description:
      'Комплексные программы обследований BIORISE в Самаре: женщины, мужчины, дети, дефициты, профилактические профили.',
    url: 'https://biorise-clinic.ru/chek-apy/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function CheckupsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CheckupsContent />
      <Footer />
    </main>
  )
}
