import type { Metadata } from 'next'
import KapelnicyPageClient from '@/components/kapelnicy/KapelnicyPageClient'
import { getInfusionCategories } from '@/lib/kapelnicy'

export const metadata: Metadata = {
  title: 'Капельницы в Самаре — виды и цены | BIORISE',
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
    title: 'Капельницы в Самаре — виды и цены | BIORISE',
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
    title: 'Капельницы в Самаре — виды и цены | BIORISE',
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

  const menu = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    items: cat.items.map((item) => ({ id: item.id, title: item.title })),
  }))

  return <KapelnicyPageClient categories={categories} menu={menu} />
}
