import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BadyContent from './BadyContent'

export const metadata = {
  title: 'БАДЫ | BIORISE',
  description:
    'Каталог БАДов BIORISE в Самаре: B-complex, Iron Chelate, Magnesium, Omega-3, Marine Collagen, Vitamin D3 + K2 и другие позиции с описанием состава и формы выпуска.',
}

export default function BadyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BadyContent />
      <Footer />
    </main>
  )
}
