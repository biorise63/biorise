import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LazernayaEpilyatsiyaContent from './LazernayaEpilyatsiyaContent'

export const metadata = {
  title: 'Лазерная эпиляция | BIORISE',
  description:
    'Лазерная эпиляция в клинике BIORISE в Самаре. Безопасные протоколы, комфортная процедура и пакетные предложения.',
}

export default function LazernayaEpilyatsiyaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <LazernayaEpilyatsiyaContent />
      <Footer />
    </main>
  )
}
