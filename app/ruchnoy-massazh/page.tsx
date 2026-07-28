import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RuchnoyMassazhContent from './RuchnoyMassazhContent'

export const metadata = {
  title: 'Ручной массаж в Самаре | Медицинский массаж BIORISE',
  description:
    'Ручной и медицинский массаж BIORISE в Самаре: расслабляющие, восстановительные и антицеллюлитные сеансы. Есть абонементы.',
  keywords: [
    'массаж в Самаре',
    'ручной массаж Самара',
    'медицинский массаж Самара',
    'антицеллюлитный массаж Самара',
    'лечебный массаж Самара',
    'массаж спины Самара',
    'массаж тела Самара',
    'массаж BIORISE',
    'БИОРАЙЗ массаж',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/ruchnoy-massazh',
  },
  openGraph: {
    title: 'Ручной массаж в Самаре | BIORISE',
    description:
      'Ручной и медицинский массаж BIORISE в Самаре: комфортные сеансы и абонементы для курса восстановления.',
    url: 'https://biorise-clinic.ru/ruchnoy-massazh',
    type: 'website',
    images: [{ url: 'https://biorise-clinic.ru/services/apparatnyy-massazh/massage-2.jpg' }],
  },
}

export default function RuchnoyMassazhPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <RuchnoyMassazhContent />
      <Footer />
    </main>
  )
}
