import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnalizyContent from './AnalizyContent'

export const metadata = {
  title: 'Анализы | BIORISE',
  description: 'Популярные лабораторные анализы и чек-апы в клинике BIORISE в Самаре. Быстрые сроки и удобная онлайн-запись.',
}

export default function AnalizyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AnalizyContent />
      <Footer />
    </main>
  )
}
