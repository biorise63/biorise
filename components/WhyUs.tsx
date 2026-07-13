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
              BIORISE в Самаре — лицензированная клиника внутривенной инфузионной терапии и капельниц. Мы проводим процедуры в формате современной IV-терапии: витаминные инфузии для восполнения дефицитов, детокс-программы для поддержки печени и общего очищения организма, курсы для укрепления иммунитета и восстановления после ОРВИ, а также решения при стрессе, хронической усталости и повышенных физических нагрузках. Состав капельниц подбирается врачом-терапевтом индивидуально с учетом состояния здоровья и результатов анализов.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-olive-primary">
              Перед началом процедур специалист собирает подробный анамнез, оценивает возможные противопоказания и подробно объясняет принцип действия назначенных препаратов. При необходимости пациенты могут сдать лабораторные анализы или пройти комплексный чек-ап организма для точного определения дефицитов витаминов и микроэлементов и составления персональной программы восстановления.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading text-olive-primary mb-4 mt-8">
              Мы предлагаем:
            </h3>
            
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">витаминные и детокс-капельницы под различные цели и состояния;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">современные протоколы IV-терапии и внутривенных инфузий;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">комфортные кабинеты с удобными креслами для процедур;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-olive-primary mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed text-olive-primary">удобную запись на капельницы онлайн и по телефону.</span>
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
