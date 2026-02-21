'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Биоимпедансный анализ на «МЕДАСС»',
    binomial: '✨ 800 ₽ вместо 1800 ₽ • 21.02–08.03',
    description:
      'Узнайте состав тела: жир, мышцы, вода, скорость обмена и биологический возраст. После обследования — персональные рекомендации врача. Количество мест ограничено.',
    buttonText: 'Участвовать',
    buttonHref: '#booking',
    photo: {
      url: '/promo-1.jpg',
      text: 'Аппарат биоимпеданса',
      by: 'Акция: анализ тела',
    },
  },
  {
    common: 'Розыгрыш к открытию BIORISE',
    binomial: 'Призы на 250 000 ₽ • Итоги 11 марта в 19:00',
    description:
      '15 победителей получат: 🏆 1 место — чек-ап, консультации и курс капельниц; 🥈 2 место — чек-ап и приём врача; 🥉 3–5 места — скидка 50%; 🎁 6–15 места — скидка 30%. Условия: подписка, репост, сообщение «+» в сообщество.',
    buttonText: 'Участвовать',
    buttonHref: 'https://vk.ru/wall-233125534_24',
    photo: {
      url: '/promo-2.jpg',
      text: 'Розыгрыш BIORISE',
      by: 'Призы до 250 000 ₽',
    },
  },
  {
    common: 'Чек-ап «Витаминный»',
    binomial: '💥 2 500 ₽ вместо 5 790 ₽',
    description:
      'Включает: Витамин B9, Ферритин, Витамин D, Общий белок, Цинк, Железо, Магний, Кальций. Специальное предложение на февраль.',
    buttonText: 'Участвовать',
    buttonHref: '#booking',
    photo: {
      url: '/promo-3.jpg',
      text: 'Чек-ап витаминный',
      by: 'Спецпредложение февраля',
    },
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-olive-primary">
              {getIcon('promotion')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary font-light">
              Акции
            </h2>
          </div>
        </motion.div>

        <div className="relative h-[180vh] w-full">
          <div className="sticky top-24 h-[78vh] overflow-hidden rounded-3xl border border-olive-primary/15 bg-beige-background/60">
            <div className="absolute inset-x-0 top-6 z-10 px-6 text-center">
              <p className="text-sm text-olive-primary/70 md:text-base">
                Листайте акции стрелками влево и вправо
              </p>
            </div>
            <CircularGallery items={galleryData} radius={420} />
          </div>
        </div>
      </div>
    </section>
  )
}
