import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PopularDrips from '@/components/PopularDrips'
import WhyUs from '@/components/WhyUs'
import Doctors from '@/components/Doctors'
import ClinicGallery from '@/components/ClinicGallery'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
// import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'

export const metadata: Metadata = {
  title: 'Капельницы в Самаре - клиника БИОРАЙЗ | Чек-апы | Анализы',
  description:
    'BIORISE в Самаре: капельницы, анализы и чек-апы под контролем врача. Подбор программы, выезд на дом, цены и онлайн-запись.',
  keywords: [
    'капельница самара',
    'капельницы в самаре',
    'клиника капельниц самара',
    'капельница на дому самара',
    'капельница самара цена',
    'поставить капельницу самара',
    'витаминные капельницы самара',
    'медсестра на дом капельницы самара',
    'BIORISE Самара',
  ],
  openGraph: {
    title: 'Капельницы в Самаре - клиника БИОРАЙЗ | Чек-апы | Анализы',
    description:
      'BIORISE в Самаре: капельницы, анализы и чек-апы под контролем врача. Подбор программы, выезд на дом, цены и онлайн-запись.',
    url: 'https://biorise-clinic.ru/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Капельницы в Самаре - клиника БИОРАЙЗ | Чек-апы | Анализы',
    description:
      'BIORISE в Самаре: капельницы, анализы и чек-апы под контролем врача. Подбор программы, выезд на дом, цены и онлайн-запись.',
  },
  alternates: {
    canonical: 'https://biorise-clinic.ru/',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PopularDrips />
      <WhyUs />
      <Doctors />
      <ClinicGallery />
      <BookingForm />
      <Footer />
      {/* <ExitIntentOffersPopup /> */}
    </main>
  )
}
