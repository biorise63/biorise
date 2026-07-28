import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BadyContent from './BadyContent'

export const metadata = {
  title: 'БАДЫ | BIORISE',
  description:
    'Каталог БАДов BIORISE в Самаре: состав, форма выпуска и ключевые свойства популярных позиций.',
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
