import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Записаться онлайн | BIORISE',
  description: 'Онлайн запись на капельницы в клинике BIORISE',
}

export default function BookingFormPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-heading text-olive-primary mb-6 text-center">
            Записаться онлайн
          </h1>
          <div className="w-full" style={{ minHeight: '800px' }}>
            <iframe
              src="https://klientiks.ru/app2/biorise-clinic"
              className="w-full h-full border-0"
              style={{ minHeight: '800px' }}
              title="Форма онлайн записи"
              allow="fullscreen"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
