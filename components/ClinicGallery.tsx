'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Капельницы — скидка до 15%',
    subtitle: '-10% на капельницы, -15% на курс от 5',
    description:
      'Скидка -10% действует на капельницы «Железо 2.0», «Снижение веса» и «Иммуносуппорт». При покупке курса от 5 капельниц любых видов скидка увеличивается до 15%.',
    prizes: [
      { place: 'Железо 2.0', text: '8 100 ₽' },
      { place: 'Снижение веса', text: '4 410 ₽' },
      { place: 'Иммуносуппорт', text: '4 050 ₽' },
    ],
    period: 'до 31 октября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-kapelnicy-skidka.webp',
      text: 'Капельницы со скидкой',
      alt: 'Скидка до 15% на капельницы в BIORISE Самара',
      pos: 'center 40%',
      by: 'Скидка до 15%',
    },
  },
  {
    common: 'Комплексный чек-ап',
    subtitle: '72 показателя за один визит',
    description:
      'Одним комплексом сразу оцениваем ключевые показатели организма.',
    features: [
      'Кровь',
      'Моча',
      'Биохимия',
      'Гормоны',
      'Витамины',
      'Микро- и макроэлементы',
      'Расшифровка с терапевтом или диетологом - в подарок',
    ],
    price: {
      current: '5 990 ₽',
    },
    period: 'до 31 октября 2026',
    buttonText: 'Подробнее',
    buttonHref: '/akcii/kompleksnyy-chek-ap-72-pokazatelya/',
    photo: {
      url: '/optimized/promo/gallery/promo-kompleksny-chekap.webp',
      text: 'Комплексный чек-ап',
      alt: 'Комплексный чек-ап на 72 показателя в BIORISE Самара',
      pos: 'center 40%',
      by: '72 показателя',
    },
  },
  {
    common: 'T-SPOT',
    subtitle: 'Диагностика туберкулезной инфекции',
    description:
      'Современное исследование крови без кожных проб. Подходит взрослым и детям по назначению врача.',
    features: [
      'Высокоточная диагностика на ранней стадии',
      'Без Манту и Диаскинтеста',
      'При аллергических реакциях',
      'Перед госпитализацией',
      'Забор крови оплачивается отдельно - 180 ₽',
    ],
    price: {
      current: '6 500 ₽',
      old: '7 900 ₽',
    },
    period: 'до 31 октября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-tspot.jpg',
      text: 'T-SPOT',
      alt: 'T-SPOT диагностика туберкулезной инфекции в BIORISE Самара',
      pos: 'center 45%',
      by: 'Скидка до конца октября',
    },
  },
  {
    common: 'Чекап «Контроль веса»',
    subtitle: 'Анализы + биоимпеданс + приём диетолога',
    description:
      'Комплексная оценка организма для грамотного контроля веса - не просто цифра на весах, а понимание того, что происходит в организме.',
    features: [
      '23 показателя лабораторной диагностики',
      'Биоимпедансометрия «Медасс»',
      'Приём диетолога в подарок',
      'Разбор результатов и дальнейшая тактика',
    ],
    price: {
      current: '9 800 ₽',
      old: '15 410 ₽',
    },
    period: 'до 31 декабря 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-kontrol-vesa.webp',
      text: 'Чекап Контроль веса',
      pos: 'center 40%',
      by: 'Анализы + биоимпеданс + диетолог',
    },
  },
  {
    common: 'Программа «Восстановление и укрепление»',
    subtitle: 'В сезон простуд и повышенных нагрузок',
    description:
      'Чекап, два приёма терапевта и курс капельниц «Детокс» и «Иммуносуппорт» в единой программе.',
    features: [
      'Чекап «Базовый»',
      'Первичный и повторный приём терапевта',
      '2 капельницы «Детокс»',
      '3 капельницы «Иммуносуппорт»',
    ],
    price: {
      current: '21 990 ₽',
      old: '28 890 ₽',
    },
    period: 'до 31 декабря 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-vosstanovlenie-ukreplenie.webp',
      text: 'Восстановление и укрепление',
      pos: 'center 35%',
      by: 'Комплексная программа',
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
          <div className="relative min-h-[470px] md:h-[640px] overflow-hidden rounded-3xl border border-olive-primary/15 bg-beige-background/60">
            <CircularGallery items={galleryData} radius={380} />
          </div>
        </div>
      </div>
    </section>
  )
}
