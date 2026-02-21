'use client'

import { motion } from 'framer-motion'
import ElegantCarousel from './ui/elegant-carousel'
import { getIcon } from './kapelnicy/icon-map'

export default function PopularDrips() {
  return (
    <section id="services" className="section-spacing bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-olive-primary">
              {getIcon('health')}
            </div>
            <h2 className="font-heading text-olive-primary font-light text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              Индивидуальный подбор программы для вашего здоровья
            </h2>
          </div>
        </motion.div>

        <ElegantCarousel />
      </div>
    </section>
  )
}
