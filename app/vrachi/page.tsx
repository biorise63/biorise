import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import VrachiContent from './VrachiContent'
import { getAllAuthors } from '@/lib/authors'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

const SITE_URL = 'https://biorise-clinic.ru'

export const metadata: Metadata = {
  title: 'Врачи клиники BIORISE в Самаре | BIORISE',
  description:
    'Врачи и специалисты клиники BIORISE в Самаре: терапевт, эндокринолог, диетолог, косметолог-эстетист и массажист. Опыт, специализация, запись на приём.',
  keywords: [
    'врачи биорайз',
    'врачи клиники самара',
    'терапевт самара',
    'эндокринолог самара',
    'диетолог самара',
    'косметолог самара',
  ],
  alternates: {
    canonical: `${SITE_URL}/vrachi/`,
  },
  openGraph: {
    title: 'Врачи клиники BIORISE в Самаре',
    description:
      'Терапевт, эндокринолог, диетолог, косметолог-эстетист и массажист клиники BIORISE в Самаре.',
    url: `${SITE_URL}/vrachi/`,
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function VrachiPage() {
  const authors = getAllAuthors()

  const webPageJsonLd = createWebPageJsonLd({
    url: '/vrachi/',
    name: 'Врачи клиники BIORISE',
    description: 'Врачи и специалисты клиники BIORISE в Самаре.',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/vrachi/',
    name: 'Врачи клиники BIORISE',
    items: authors.map((author) => ({
      url: `/vrachi/${author.id}/`,
      name: author.name,
    })),
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, itemListJsonLd]} />
      <Header />
      <VrachiContent authors={authors} />
      <Footer />
    </main>
  )
}
