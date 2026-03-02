import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SpravkiContent from './SpravkiContent'

export const metadata = {
  title: 'Медицинские справки | BIORISE',
  description: 'Оформление медицинских справок в клинике BIORISE в Самаре. Быстро, официально, с доставкой.',
}

export default function SpravkiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SpravkiContent />
      <Footer />
    </main>
  )
}
