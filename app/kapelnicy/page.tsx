import type { Metadata } from 'next'
import KapelnicyPageClient from '@/components/kapelnicy/KapelnicyPageClient'
import { getInfusionCategories } from '@/lib/kapelnicy'

export const metadata: Metadata = {
  title: 'Капельницы в Самаре — виды и цены | BIORISE',
  description:
    'Капельницы в Самаре в клинике BIORISE: витаминные, восстановительные, детокс и другие программы. Подбор состава врачом, актуальные цены, запись онлайн и выезд на дом.',
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
      'Витаминные, восстановительные, детокс и другие капельницы в Самаре. Подбор программы врачом, актуальные цены, запись онлайн и выезд на дом.',
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
      'Витаминные, восстановительные и детокс-капельницы в Самаре. Подбор врачом, цены и запись в клинику BIORISE.',
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
