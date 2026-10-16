'use client'

import { motion } from 'framer-motion'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { getIcon } from './kapelnicy/icon-map'

const doctors = [
  {
    quote: 'Стаж 19 лет',
    name: 'Потемкина Ольга Владимировна',
    designation: 'Врач-терапевт',
    src: '/optimized/doctors/potemkina.webp',
    location: 'Самара, Дыбенко, 27 Б, клиника "Биорайз"',
    href: '/vrachi/potemkina/',
  },
  {
    quote: 'Ожирение, гипотиреоз, сахарный диабет, НАЖБП, железодефицитная анемия и андрогенный дефицит.',
    name: 'Гайлис Алёна Алексеевна',
    designation: 'Врач-эндокринолог',
    src: '/optimized/doctors/gaylis-2.webp',
    location: 'Самара, Дыбенко, 27 Б, клиника "Биорайз"',
    href: '/vrachi/gaylis/',
  },
  {
    quote: 'Врач интегративной превентивной и антивозрастной медицины.',
    name: 'Трегубова Лиана Игоревна',
    designation: 'Врач-диетолог',
    src: '/optimized/doctors/tregubova.webp',
    location: 'Самара, Дыбенко, 27 Б, Клиника "Биорайз"',
    href: '/vrachi/tregubova/',
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-olive-primary">
              {getIcon('doctors')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary font-light">
              Наши врачи
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-base text-olive-text sm:text-lg">
            Врачи и специалисты, которые ведут пациентов BIORISE
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={doctors} autoplay={false} />
      </div>
    </section>
  )
}
