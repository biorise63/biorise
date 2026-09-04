'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Капельницы — скидка до 15%',
    subtitle: 'Специальная цена на популярные капельницы',
    description:
      'Скидка действует на капельницы «Железо 1», «Снижение веса» и «Иммуносуппорт». Можно выбрать курс из 3 процедур по специальной цене.',
    prizes: [
      { place: 'Железо 1', text: '4 250 ₽' },
      { place: 'Снижение веса', text: '4 165 ₽' },
      { place: 'Иммуносуппорт', text: '3 825 ₽' },
    ],
    period: 'до 30 сентября 2026',
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
      'Расшифровка результатов врачом - в подарок',
    ],
    price: {
      current: '5 990 ₽',
    },
    period: 'до 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-kompleksny-chekap.webp',
      text: 'Комплексный чек-ап',
      alt: 'Комплексный чек-ап на 72 показателя в BIORISE Самара',
      pos: 'center 40%',
      by: '72 показателя',
    },
  },
  {
    common: 'БАДы — 3 по цене 2',
    subtitle: 'Выберите любые 3 продукта - платите за 2',
    description:
      'Выберите любые 3 подходящих продукта и оплатите только 2.',
    period: 'до 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/gallery/promo-bady-3po2.webp',
      text: 'БАДы 3 по цене 2',
      alt: 'Акция 3 БАДа по цене 2 в BIORISE Самара',
      pos: 'center 45%',
      by: '3 по цене 2',
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
    period: 'до 30 сентября 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-tspot.jpg',
      text: 'T-SPOT',
      alt: 'T-SPOT диагностика туберкулезной инфекции в BIORISE Самара',
      pos: 'center 45%',
      by: 'Скидка до конца сентября',
    },
  },
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
    period: 'до 30 сентября 2026',
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
    period: 'до 30 сентября 2026',
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
    period: 'до 31 декабря 2026',
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
    period: 'до 31 декабря 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-3.webp',
      text: 'Чек-ап витаминный',
      by: 'Спецпредложение февраля',
    },
  },
  {
    common: 'Женское здоровье Premium',
    subtitle: 'Премиальный чек-ап с приемом терапевта в подарок',
    features: [
      'Общий анализ крови и оценка запасов железа',
      'Исследование функции щитовидной железы',
      'Женский гормональный профиль',
      'Витамины и микроэлементы',
      'Расширенная биохимия крови',
      'Оценка сердечно-сосудистых рисков',
      'Исследование углеводного обмена',
      'Онкологический профиль',
      'Скрининг социально значимых инфекций',
      'Общеклинические исследования',
    ],
    price: {
      current: '31 990 ₽',
      old: '51 095 ₽',
    },
    period: 'с 24 июля по 31 декабря 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/promo-womens-health-premium.jpg',
      text: 'Женское здоровье Premium',
      pos: 'center 38%',
      by: 'Выгода — 19 105 ₽',
    },
  },
  {
    common: 'Женское здоровье Optimal',
    subtitle: 'Чек-ап с консультацией терапевта и расшифровкой',
    features: [
      'Общий анализ крови и запасы железа',
      'Функция щитовидной железы',
      'Женский гормональный профиль',
      'Витамины и микроэлементы',
      'Биохимический анализ крови',
      'Сердечно-сосудистые риски',
      'Углеводный обмен',
      'Общий анализ мочи',
      'Индивидуальные рекомендации',
    ],
    price: {
      current: '13 980 ₽',
      old: '32 485 ₽',
    },
    period: 'с 24 июля по 31 декабря 2026',
    buttonText: 'Записаться',
    buttonHref: '#booking',
    photo: {
      url: '/optimized/promo/promo-womens-health-optimal.jpg',
      text: 'Женское здоровье Optimal',
      alt: 'Чек-ап Женское здоровье Optimal в BIORISE Самара',
      pos: 'center 42%',
      by: 'Женский чек-ап',
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
