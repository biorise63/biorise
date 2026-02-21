import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BioimpedanceContent from './BioimpedanceContent'

export const metadata = {
  title: 'Биоимпедансный анализ композитного состава тела | BIORISE',
  description: 'Биоимпедансный анализ состава тела на аппарате МЕДАСС. Быстрая и неинвазивная диагностика в клинике BIORISE в Самаре.',
}

export default function BioimpedancePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BioimpedanceContent />
      <Footer />
    </main>
  )
}
