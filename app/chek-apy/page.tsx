import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckupsContent from './CheckupsContent'

export const metadata: Metadata = {
  title: 'Чек-ап организма в Самаре | BIORISE',
  description:
    'Чек-ап организма в Самаре в клинике BIORISE: готовые программы обследований для мужчин, восстановления после родов, оценки дефицитов, метаболизма и уровня энергии.',
  keywords: [
    'чек ап самара',
    'чек-ап самара',
    'чек-ап организма самара',
    'комплексное обследование самара',
    'check up самара',
    'чек ап для мужчин самара',
    'чек ап дефициты самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/chek-apy/',
  },
  openGraph: {
    title: 'Чек-ап организма в Самаре | BIORISE',
    description:
      'Готовые check-up программы BIORISE в Самаре: базовые, расширенные, мужские, послеродовые и профили под конкретную задачу.',
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
