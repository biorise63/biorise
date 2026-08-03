import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BioimpedanceContent from './BioimpedanceContent'
import JsonLd from '@/components/JsonLd'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Биоимпедансный анализ композитного состава тела | BIORISE',
  description: 'Биоимпедансный анализ состава тела на аппарате МЕДАСС. Быстрая и неинвазивная диагностика в клинике BIORISE в Самаре.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/bioimpedance/',
  },
}

export default function BioimpedancePage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/bioimpedance/',
    name: 'Биоимпедансный анализ композитного состава тела',
    description: 'Биоимпедансный анализ состава тела на аппарате МЕДАСС. Быстрая и неинвазивная диагностика в клинике BIORISE в Самаре.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/bioimpedance/',
    name: 'Биоимпедансный анализ в Самаре',
    description: 'Биоимпедансный анализ состава тела на аппарате МЕДАСС в клинике BIORISE.',
    serviceType: 'Диагностика состава тела',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <BioimpedanceContent />
      <Footer />
    </main>
  )
}
