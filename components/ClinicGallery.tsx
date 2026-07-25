'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Подготовка к школе и детскому саду',
    subtitle: 'Детский чек-ап перед новым учебным годом',
    description:
      'Помогает проверить здоровье ребенка перед школой, садом и стартом новых нагрузок.',
    features: [
      'Клинический анализ крови с лейкоформулой',
      'Общий анализ мочи',
      'Глюкоза крови',
      'Кал на яйца гельминтов',
      'Анализ на энтеробиоз',
    ],
    price: {
      current: '1 490 ₽',
      old: '2 200 ₽',
    },
    period: 'с 24 июля по 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-school-checkup.webp',
      text: 'Подготовка к школе и детскому саду',
      pos: 'center 34%',
      by: 'Детский чек-ап',
    },
  },
  {
    common: 'Чек-ап «Диагностика дефицита железа»',
    subtitle: 'Комплексная оценка железа и витаминов B',
    description:
      'Помогает выявить скрытый дефицит железа, анемию и причины усталости.',
    features: [
      'Клинический анализ крови с СОЭ',
      'Ферритин, железо и трансферрин',
      'ОЖСС и ЛЖСС',
      'Витамины B12 и B9',
      'Результаты через 1–2 дня',
    ],
    price: {
      current: '2 200 ₽',
      old: '5 800 ₽',
    },
    period: 'до 30 июля 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-iron-deficiency-checkup.webp',
      text: 'Диагностика дефицита железа',
      pos: 'center 45%',
      by: 'Чек-ап железа',
    },
  },
  {
    common: 'Детский чек-ап',
    subtitle: 'Комплексная проверка здоровья ребёнка',
    description:
      'Помогает выявить дефициты, оценить иммунитет и заметить скрытые нарушения здоровья.',
    features: [
      'Общий анализ крови и ферритин',
      'Витамины D, B12 и фолиевая кислота',
      'Цинк, медь и общий белок',
      'Аллергии и паразитарные инфекции',
    ],
    price: {
      current: '4 290 ₽',
      old: '7 175 ₽',
    },
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-children-checkup.webp',
      text: 'Детский чек-ап',
      pos: 'center 38%',
      by: 'Профилактическое обследование',
    },
  },
  {
    common: 'Чек-ап «Забота о родителях»',
    subtitle: 'Комплексное обследование старшего поколения',
    description:
      'Помогает оценить состояние организма и выявить возможные риски на ранней стадии.',
    features: [
      'Сердечно-сосудистые риски',
      'Печень и обмен веществ',
      'Витамин D и общий белок',
      'Общий анализ крови и СРБ',
    ],
    price: {
      current: '3 999 ₽',
      old: '8 770 ₽',
    },
    period: 'до 1 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-care-for-parents.webp',
      text: 'Чек-ап Забота о родителях',
      pos: 'center 38%',
      by: 'Забота о здоровье близких',
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
      current: '3 500 ₽',
      old: '5 790 ₽',
    },
    period: 'до 1 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-3.webp',
      text: 'Чек-ап витаминный',
      by: 'Спецпредложение февраля',
    },
  },
  {
    common: 'ЖЕНСКОЕ И МУЖСКОЕ ЗДОРОВЬЕ',
    subtitle: 'Базовый чекап для контроля организма',
    description:
      'Здоровье — это не когда «ничего не болит», а когда всё под контролем.',
    features: [
      'Расширенный анализ крови',
      'Проверка гормонального фона',
      'Витамины и микроэлементы',
      'Оценка общего состояния организма',
    ],
    price: {
      current: '3 333 ₽',
      old: '8 565 ₽',
    },
    period: 'до 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-checkup-man-woman.webp',
      text: 'Женское и мужское здоровье',
      by: 'Выгода — 5 232 ₽',
    },
  },
  {
    common: 'ПАРНОЕ ПОСЕЩЕНИЕ — ЗАБОТА ВДВОЁМ',
    subtitle: 'Женский + мужской чекап',
    features: [
      'Расширенный анализ крови',
      'Проверка гормонального фона',
      'Витамины и микроэлементы',
      'Оценка общего состояния организма',
    ],
    price: {
      current: '5 555 ₽',
      old: '17 130 ₽',
    },
    period: 'до 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-couple-checkup.webp',
      text: 'Парное посещение',
      by: 'Выгода — 11 575 ₽',
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
