import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import BiohimicheskiyAnalizKroviContent from './BiohimicheskiyAnalizKroviContent'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Биохимический анализ крови в Самаре | Клиника БИОРАЙЗ',
  description:
    'Сдать биохимический анализ крови в БИОРАЙЗ можно без очередей. Врач подскажет, какие показатели нужны под вашу задачу, запись онлайн или по телефону.',
  keywords: ['биохимический анализ крови самара', 'биохимия крови самара', 'сдать биохимический анализ крови'],
  alternates: {
    canonical: 'https://biorise-clinic.ru/analizy/biohimicheskiy-analiz-krovi/',
  },
  openGraph: {
    title: 'Биохимический анализ крови в Самаре | Клиника БИОРАЙЗ',
    description:
      'Сдать биохимический анализ крови в БИОРАЙЗ можно без очередей. Врач подскажет, какие показатели нужны под вашу задачу.',
    url: 'https://biorise-clinic.ru/analizy/biohimicheskiy-analiz-krovi/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Биохимический анализ крови в Самаре | Клиника БИОРАЙЗ',
    description:
      'Сдать биохимический анализ крови в БИОРАЙЗ можно без очередей. Врач подскажет, какие показатели нужны под вашу задачу.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BiohimPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/analizy/biohimicheskiy-analiz-krovi/',
    name: 'Биохимический анализ крови в Самаре',
    description:
      'Сдать биохимический анализ крови в БИОРАЙЗ можно без очередей. Врач подскажет, какие показатели нужны под вашу задачу, запись онлайн или по телефону.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/analizy/biohimicheskiy-analiz-krovi/',
    name: 'Биохимический анализ крови в Самаре',
    description:
      'Биохимический анализ крови в клинике БИОРАЙЗ в Самаре с подбором показателей под задачу.',
    serviceType: 'Лабораторная диагностика',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <BiohimicheskiyAnalizKroviContent />
      <Footer />
    </main>
  )
}
