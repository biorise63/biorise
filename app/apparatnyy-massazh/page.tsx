import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApparatnyyMassazhContent from './ApparatnyyMassazhContent'

export const metadata = {
  title: 'Аппаратный массаж | BIORISE',
  description:
    'Аппаратный массаж в клинике BIORISE в Самаре. Индивидуальные протоколы, комфортные процедуры и полный прайс для скачивания.',
  alternates: {
    canonical: 'https://biorise-clinic.ru/apparatnyy-massazh/',
  },
}

export default function ApparatnyyMassazhPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ApparatnyyMassazhContent />
      <Footer />
    </main>
  )
}
