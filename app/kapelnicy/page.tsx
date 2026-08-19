import type { Metadata } from 'next'
import KapelnicyPageClient from '@/components/kapelnicy/KapelnicyPageClient'
import { getInfusionCategories } from '@/lib/kapelnicy'
import JsonLd from '@/components/JsonLd'
import { createItemListJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Виды капельниц в Самаре: цены и состав | BIORISE',
  description:
    'Капельницы BIORISE в Самаре: витаминные, восстановительные и детокс-программы. Подбор врачом, цены, выезд на дом и онлайн-запись.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/kapelnicy/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://biorise-clinic.ru/kapelnicy/',
    siteName: 'BIORISE',
    title: 'Виды капельниц в Самаре: цены и состав | BIORISE',
    description:
      'Капельницы BIORISE в Самаре: витаминные, восстановительные и детокс-программы. Подбор врачом, цены и выезд на дом.',
    images: [
      {
        url: 'https://biorise-clinic.ru/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Капельницы в клинике BIORISE в Самаре',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Виды капельниц в Самаре: цены и состав | BIORISE',
    description:
      'Капельницы BIORISE в Самаре: витаминные, восстановительные и детокс-программы. Подбор врачом, цены и запись.',
    images: ['https://biorise-clinic.ru/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'капельницы самара',
    'капельница самара цена',
    'поставить капельницу самара',
    'клиника капельниц самара',
    'витаминные капельницы самара',
    'инфузионная терапия самара',
    'капельница на дому самара',
  ],
}

export default function KapelnicyPage() {
  const categories = getInfusionCategories()
  const infusions = categories.flatMap((category) => category.items)

  const menu = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    items: cat.items.map((item) => ({ id: item.id, title: item.title })),
  }))

  const collectionPageJsonLd = createWebPageJsonLd({
    url: '/kapelnicy/',
    name: 'Виды капельниц в Самаре: цены и состав',
    description:
      'Капельницы BIORISE в Самаре: витаминные, восстановительные и детокс-программы. Подбор врачом, цены, выезд на дом и онлайн-запись.',
    type: 'CollectionPage',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/kapelnicy/',
    name: 'Каталог капельниц BIORISE',
    items: infusions.map((item) => ({
      url: `/kapelnicy/${item.slug}/`,
      name: item.title,
    })),
  })

  return (
    <>
      <JsonLd data={[collectionPageJsonLd, itemListJsonLd]} />
      <KapelnicyPageClient categories={categories} menu={menu} />
    </>
  )
}
