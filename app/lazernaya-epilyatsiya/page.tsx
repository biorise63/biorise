import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LazernayaEpilyatsiyaContent from './LazernayaEpilyatsiyaContent'
import JsonLd from '@/components/JsonLd'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Лазерная эпиляция | BIORISE',
  description:
    'Лазерная эпиляция в клинике BIORISE в Самаре. Безопасные протоколы, комфортная процедура и пакетные предложения.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/lazernaya-epilyatsiya/',
  },
}

export default function LazernayaEpilyatsiyaPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/lazernaya-epilyatsiya/',
    name: 'Лазерная эпиляция',
    description: 'Лазерная эпиляция в клинике BIORISE в Самаре. Безопасные протоколы, комфортная процедура и пакетные предложения.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/lazernaya-epilyatsiya/',
    name: 'Лазерная эпиляция в Самаре',
    description: 'Лазерная эпиляция в клинике BIORISE в Самаре.',
    serviceType: 'Лазерная эпиляция',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <LazernayaEpilyatsiyaContent />
      <Footer />
    </main>
  )
}
