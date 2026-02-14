'use client'

import { motion } from 'framer-motion'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

const doctors = [
  {
    quote: 'Врач диетолог, врач интегральной превентивной и антивозрастной медицины. Стаж работы 5 лет.',
    name: 'Трегубова Лиана Игоревна',
    designation: 'Врач диетолог, врач интегральной превентивной и антивозрастной медицины',
    src: '/doctors/doctor-1.jpg',
  },
  {
    quote: 'Врач терапевт. Стаж работы 19 лет.',
    name: 'Потемкина Ольга Владимировна',
    designation: 'Врач терапевт',
    src: '/doctors/doctor-2.jpg',
  },
]

export default function Doctors() {
  return (
    <section id="doctors" className="section-spacing bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary mb-4 font-light">
            Наши врачи
          </h2>
          <p className="text-base sm:text-lg text-olive-primary/70 max-w-2xl mx-auto">
            Профессионалы с многолетним опытом в области внутривенной терапии
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={doctors} autoplay={true} />
      </div>
    </section>
  )
}
