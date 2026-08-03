import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BadyContent from './BadyContent'
import JsonLd from '@/components/JsonLd'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'БАДЫ | BIORISE',
  description:
    'Каталог БАДов BIORISE в Самаре: состав, форма выпуска и ключевые свойства популярных позиций.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/bady/',
  },
}

export default function BadyPage() {
  const collectionPageJsonLd = createWebPageJsonLd({
    url: '/bady/',
    name: 'БАДЫ BIORISE',
    description:
      'Каталог БАДов BIORISE в Самаре: состав, форма выпуска и ключевые свойства популярных позиций.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/bady/',
    name: 'Каталог БАДов BIORISE',
    items: [
      { url: '/bady/#b-complex', name: 'B Complex' },
      { url: '/bady/#iron-chelate', name: 'Iron Chelate 40 mg' },
      { url: '/bady/#5-htp-b6', name: '5-HTP 100 mg + B6' },
      { url: '/bady/#magnesium-chelate', name: 'Magnesium Chelate' },
      { url: '/bady/#magnesium-citrate-b6', name: 'Magnesium Citrate + B6' },
      { url: '/bady/#marine-collagen', name: 'Marine Collagen 750 mg' },
      { url: '/bady/#vitamin-d3-k2', name: 'Vitamin D3 5000 ME + K2' },
      { url: '/bady/#calcium-citrate', name: 'Calcium Citrate' },
      { url: '/bady/#omega-3', name: 'Omega-3' },
    ],
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[collectionPageJsonLd, itemListJsonLd]} />
      <Header />
      <BadyContent />
      <Footer />
    </main>
  )
}
