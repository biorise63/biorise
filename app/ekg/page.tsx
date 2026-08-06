import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import EkgContent from './EkgContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'ЭКГ(кардиограмма) в Самаре - всего за 1100 ₽ | Клиника Биорайз',
  description:
    'ЭКГ в Самаре в клинике БИОРАЙЗ: кардиограмма за 5-10 минут, расшифровка входит в стоимость, запись онлайн или по телефону.',
  keywords: [
    'экг самара',
    'кардиограмма самара',
    'сделать экг самара',
    'экг цена самара',
    'экг с расшифровкой самара',
    'электрокардиограмма самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/ekg/',
  },
  openGraph: {
    title: 'ЭКГ(кардиограмма) в Самаре - всего за 1100 ₽ | Клиника Биорайз',
    description:
      'ЭКГ в Самаре: исследование за 5-10 минут, профессиональная расшифровка входит в стоимость, запись без очередей.',
    url: 'https://biorise-clinic.ru/ekg/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ЭКГ(кардиограмма) в Самаре - всего за 1100 ₽ | Клиника Биорайз',
    description:
      'ЭКГ в Самаре за 1100 ₽: кардиограмма, расшифровка, запись онлайн или по телефону.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function EkgPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/ekg/',
    name: 'ЭКГ в Самаре',
    description:
      'ЭКГ в Самаре в клинике БИОРАЙЗ: кардиограмма за 5-10 минут, расшифровка входит в стоимость.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/ekg/',
    name: 'ЭКГ в Самаре',
    description:
      'Электрокардиограмма с расшифровкой в клинике БИОРАЙЗ в Самаре.',
    serviceType: 'Функциональная диагностика',
    price: '1100 ₽',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <EkgContent />
      <Footer />
    </main>
  )
}
