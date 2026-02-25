'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: '8 марта',
    subtitle: 'Курс «Золушка с глутатионом» + чек-апы и консультации',
    description: 'Омоложение, детокс и сияние кожи. Праздничные скидки на капельницы и чек-апы.',
    features: [
      'Курс 5 капельниц «Золушка с глутатионом»: 17 150 ₽ вместо 24 500 ₽',
      'Чек-ап «Контроль веса и метаболизма»: 5 900 ₽ вместо 8 900 ₽',
      'Чек-ап «Хроническая усталость»: 9 500 ₽ вместо 14 900 ₽',
      'Консультация терапевта или диетолога: скидка 50% (1 100 ₽)',
    ],
    price: {
      current: '17 150 ₽',
      old: '24 500 ₽',
    },
    period: '01.08–08.03',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/promo-4.png',
      text: 'Весенняя акция 8 марта',
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
    period: '21.02–08.03',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/promo-1.jpg',
      text: 'Аппарат биоимпеданса',
      by: 'Акция: анализ тела',
    },
  },
  {
    common: 'Розыгрыш к открытию BIORISE',
    subtitle: 'Призы и услуги на 250 000 ₽',
    description:
      '15 победителей получат медицинские услуги и индивидуальные программы восстановления.',
    prizes: [
      { place: '1 место', text: 'чек-ап + курс капельниц' },
      { place: '2 место', text: 'чек-ап + консультация' },
      { place: '3–5 места', text: 'скидка 50%' },
      { place: '6–15 места', text: 'скидка 30%' },
    ],
    period: 'Итоги 11 марта, 19:00',
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
    period: 'Февраль',
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
