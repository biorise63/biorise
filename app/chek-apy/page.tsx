import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import CheckupsContent from './CheckupsContent'
import { checkupPrograms } from '@/lib/checkups'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Чек-ап организма в Самаре | BIORISE',
  description:
    'Чек-апы BIORISE в Самаре: готовые программы для мужчин, женщин, после родов и под конкретную задачу. Состав и цены доступны в каталоге.',
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
      'Чек-апы BIORISE в Самаре: готовые программы для мужчин, женщин, после родов и под конкретную задачу.',
    url: 'https://biorise-clinic.ru/chek-apy/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function CheckupsPage() {
  const collectionPageJsonLd = createWebPageJsonLd({
    url: '/chek-apy/',
    name: 'Чек-ап организма в Самаре',
    description:
      'Чек-апы BIORISE в Самаре: готовые программы для мужчин, женщин, после родов и под конкретную задачу. Состав и цены доступны в каталоге.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/chek-apy/',
    name: 'Чек-ап программы BIORISE',
    items: checkupPrograms.map((item) => ({
      url: `/chek-apy/#${item.slug}`,
      name: item.title,
    })),
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[collectionPageJsonLd, itemListJsonLd]} />
      <Header />
      <CheckupsContent />
      <Footer />
    </main>
  )
}
