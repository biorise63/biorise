'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Золушка с глутатионом, чек-апы',
    subtitle: 'Курс «Золушка с глутатионом» + чек-апы и консультации',
    description: 'Омоложение, детокс и сияние кожи. Праздничные скидки на капельницы и чек-апы.',
    features: [
      'Курс 5 капельниц «Золушка с глутатионом»: 17 150 ₽ вместо 24 500 ₽',
      'Чек-ап «Контроль веса и метаболизма»: 5 900 ₽ вместо 8 900 ₽',
      'Чек-ап «Хроническая усталость»: 9 500 ₽ вместо 14 900 ₽',
      'Консультация терапевта или диетолога: скидка 50% (1 100 ₽)',
    ],
    period: 'до 30 апреля 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/promo-4.png',
      text: 'Золушка с глутатионом, чек-апы',
      by: 'Праздничное предложение',
    },
  },
  {
    common: 'Биоимпедансный анализ «МЕДАСС»',
    subtitle: 'Диагностика состава тела за 10 минут',
    description:
      'Определение жира, мышц, воды, метаболизма и биологического возраста с консультацией врача.',
    features: [
      'Индивидуальная расшифровка',
      'Рекомендации специалиста',
      'Современное оборудование',
    ],
    price: {
      current: '800 ₽',
      old: '1800 ₽',
    },
    period: 'до 30 апреля 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/promo-1.jpg',
      text: 'Аппарат биоимпеданса',
      by: 'Акция: анализ тела',
    },
  },
  {
    common: 'Чек-ап «Витаминный»',
    subtitle: 'Комплексная диагностика дефицитов',
    description:
      'Анализ ключевых витаминов и микроэлементов для оценки состояния организма.',
    features: [
      'Витамин B9',
      'Витамин D',
      'Ферритин',
      'Цинк, Магний',
      'Железо, Кальций',
      'Общий белок',
    ],
    price: {
      current: '2 500 ₽',
      old: '5 790 ₽',
    },
    period: 'до 30 апреля 2026',
    buttonText: 'Записаться',
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

        <div className="relative w-full">
          <div className="relative h-[520px] md:h-[640px] overflow-hidden rounded-3xl border border-olive-primary/15 bg-beige-background/60">
            <CircularGallery items={galleryData} radius={380} />
          </div>
        </div>
      </div>
    </section>
  )
}
