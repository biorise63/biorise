import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApparatnyyMassazhContent from './ApparatnyyMassazhContent'
import JsonLd from '@/components/JsonLd'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Аппаратный массаж | BIORISE',
  description:
    'Аппаратный массаж в клинике BIORISE в Самаре. Индивидуальные протоколы, комфортные процедуры и полный прайс для скачивания.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/apparatnyy-massazh/',
  },
}

export default function ApparatnyyMassazhPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/apparatnyy-massazh/',
    name: 'Аппаратный массаж',
    description: 'Аппаратный массаж в клинике BIORISE в Самаре. Индивидуальные протоколы, комфортные процедуры и полный прайс для скачивания.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/apparatnyy-massazh/',
    name: 'Аппаратный массаж в Самаре',
    description: 'Аппаратный массаж в клинике BIORISE в Самаре.',
    serviceType: 'Аппаратный массаж',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <ApparatnyyMassazhContent />
      <Footer />
    </main>
  )
}
