'use client'

import { motion } from 'framer-motion'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { getIcon } from './kapelnicy/icon-map'

const doctors = [
  {
    quote: 'Аппаратное, безинъекционное омоложение, удаление волос "навсегда".',
    name: 'Малофеева Кристина Владимировна',
    designation: 'Косметолог-эстетист, Мастер лазерной эпиляции',
    src: '/doctors/malofeeva.jpg',
    location: 'Самара, Дыбенко, 27 Б, клиника "Биорайз"',
  },
  {
    quote: 'Стаж 19 лет',
    name: 'Потемкина Ольга Владимировна',
    designation: 'Врач-терапевт',
    src: '/doctors/potemkina.jpg',
    location: 'Самара, Дыбенко, 27 Б, клиника "Биорайз"',
  },
  {
    quote: 'Активно работает с группой пациентов с хроническими заболеваниями (сахарный диабет 1 и 2 типов, диффузный токсический зоб, микроаденома гипофиза, хронический аутоиммунный тиреодит, аденома надпочечников, хроническая надпочечная недостаточность, несахарный диабет).',
    name: 'Бобоева Наталья',
    designation: 'Врач-эндокринолог',
    src: '/doctors/boboeva.jpg',
    location: 'Самара, Дыбенко, 27 Б, клиника',
  },
  {
    quote: 'Врач интегративной превентивной и антивозрастной медицины.',
    name: 'Трегубова Лиана Игоревна',
    designation: 'Врач-диетолог',
    src: '/doctors/tregubova.jpg',
    location: 'Самара, Дыбенко, 27 Б, Клиника "Биорайз"',
  },
  {
    quote: 'Мягкие мануальные техники (ПИР, МФР, грыжи, головные боли). Антицеллюлитный массаж, лимфодренажный массаж. Рефлекторный массаж стоп, баночный массаж.',
    name: 'Захаров Александр Владимирович',
    designation: 'Косметик эстетист по уходу за телом, Массажист',
    src: '/doctors/zakharov.jpg',
    location: 'Самара, Дыбенко, 27 Б, клиника "Биорайз"',
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
          <p className="text-base sm:text-lg text-olive-primary/70 max-w-2xl mx-auto">
            Профессионалы с многолетним опытом в области внутривенной терапии
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={doctors} autoplay={false} />
      </div>
    </section>
  )
}
