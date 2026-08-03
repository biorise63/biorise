import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SpravkiContent from './SpravkiContent'
import JsonLd from '@/components/JsonLd'
import { createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Медицинские справки | BIORISE',
  description: 'Оформление медицинских справок в клинике BIORISE в Самаре. Быстро, официально, с доставкой.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/spravki/',
  },
}

export default function SpravkiPage() {
  const webPageJsonLd = createWebPageJsonLd({
    url: '/spravki/',
    name: 'Медицинские справки',
    description: 'Оформление медицинских справок в клинике BIORISE в Самаре. Быстро, официально, с доставкой.',
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/spravki/',
    name: 'Медицинские справки в Самаре',
    description: 'Оформление медицинских справок в клинике BIORISE в Самаре.',
    serviceType: 'Медицинские справки',
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd]} />
      <Header />
      <SpravkiContent />
      <Footer />
    </main>
  )
}
