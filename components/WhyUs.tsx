'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getIcon } from './kapelnicy/icon-map'

export default function WhyUs() {
  return (
    <section id="why-us" className="section-spacing bg-beige-background">
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
              {getIcon('clinic')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary font-light">
              О клинике
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 flex flex-col"
          >
            <p className="text-base md:text-lg leading-relaxed text-olive-primary">
              BIORISE в Самаре работает с IV-терапией, капельницами, анализами и чек-апами. Врач подбирает состав под вашу задачу: закрыть дефициты, восстановиться после болезни, снять последствия стресса, поддержать печень или вернуть тонус после нагрузок.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-olive-primary">
              Перед процедурой врач собирает анамнез, проверяет противопоказания и объясняет, зачем нужен каждый препарат. Если нужно, вы сдаёте анализы и получаете схему курса по результатам, а не по шаблону.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading text-olive-primary mb-4 mt-8">
              Мы предлагаем:
            </h3>
            
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">капельницы под дефициты, восстановление и детокс;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">врачебный подбор состава и контроль процедуры;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">спокойные кабинеты с удобными креслами;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">запись онлайн и по телефону без долгого ожидания.</span>
              </li>
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full flex"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="/optimized/promo/clinic-about.webp"
                alt="Интерьер клиники BIORISE"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
