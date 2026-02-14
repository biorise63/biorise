'use client'

import { motion } from 'framer-motion'
import { PromotionCard } from './ui/promotion-card'
import { cn } from '@/lib/utils'

const promotions = [
  {
    title: '🎉 Розыгрыш в честь открытия «Биорайз»!',
    buttonText: 'Участвовать',
    buttonHref: 'https://vk.ru/wall-233125534_24',
    content: (
      <div className="space-y-4 text-olive-primary">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base leading-relaxed"
        >
          Сделайте репост до 11 марта и получите шанс бесплатно пройти чек-ап и курс капельниц.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="bg-olive-primary/10 rounded-xl p-4 border border-olive-primary/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              🎁
            </motion.span>
            <span className="text-lg font-semibold">Призовой фонд — 250 000 ₽</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-xl"
            >
              👥
            </motion.span>
            <span className="text-base">15 победителей</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-2 text-sm"
        >
          <div className="flex items-start gap-2">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="text-lg"
            >
              🏆
            </motion.span>
            <span>Главные призы: консультации терапевта, комплексная диагностика и индивидуальные программы капельниц</span>
          </div>
          <div className="flex items-start gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="text-lg"
            >
              💥
            </motion.span>
            <span>Скидки до 50% для участников</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-base font-medium mt-4"
        >
          Участвуйте и заботьтесь о здоровье вместе с «Биорайз»!
        </motion.p>
      </div>
    ),
  },
  {
    title: 'Акция на расширенный витаминный анализ крови',
    description: 'Комплексный анализ витаминов и микроэлементов по выгодной цене',
    features: [
      'Витамин B9',
      'Ферритин',
      'Витамин D',
      'Общий белок',
      'Цинк',
      'Железо',
      'Магний',
      'Кальций',
    ],
    price: '2 500 ₽',
    oldPrice: '5 790 ₽',
    buttonText: 'Записаться',
    buttonHref: '#booking',
  },
]

export default function ClinicGallery() {
  return (
    <section id="gallery" className="section-spacing bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary mb-4 font-light">
            Акции
          </h2>
        </motion.div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            {/* Первый набор - дублируем для бесконечного эффекта */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(6)].map((_, setIndex) => (
                promotions.map((promotion, i) => (
                  <PromotionCard
                    key={`set1-${setIndex}-${i}`}
                    {...promotion}
                  />
                ))
              ))}
            </div>
            {/* Второй набор - идентичный первому для бесшовного перехода */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(6)].map((_, setIndex) => (
                promotions.map((promotion, i) => (
                  <PromotionCard
                    key={`set2-${setIndex}-${i}`}
                    {...promotion}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 sm:w-1/3 bg-gradient-to-r from-white sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 sm:w-1/3 bg-gradient-to-l from-white sm:block" />
        </div>
      </div>
    </section>
  )
}
