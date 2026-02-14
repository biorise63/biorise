import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PopularDrips from '@/components/PopularDrips'
import WhyUs from '@/components/WhyUs'
import Doctors from '@/components/Doctors'
import ClinicGallery from '@/components/ClinicGallery'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

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
    </main>
  )
}
