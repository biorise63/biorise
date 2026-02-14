'use client'

import { motion } from 'framer-motion'
import ElegantCarousel from './ui/elegant-carousel'

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
          <h2 className="font-heading text-olive-primary mb-4 font-light" style={{ fontSize: '2.75rem' }}>
            Индивидуальный подбор программы для вашего здоровья
          </h2>
        </motion.div>

        <ElegantCarousel />
      </div>
    </section>
  )
}
