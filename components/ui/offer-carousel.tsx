'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

type Category = 'popular' | 'recovery' | 'beauty' | 'women' | 'sport' | 'health' | 'wellness'

export interface Offer {
  id: string
  imageSrc: string
  imageAlt: string
  tag: string
  title: string
  description: string
  brandLogoSrc: string
  brandName: string
  promoCode?: string
  href: string
  category: Category
  price?: string
}

const categories: { id: Category; name: string }[] = [
  { id: 'popular', name: 'Популярные' },
  { id: 'recovery', name: 'Восстановление' },
  { id: 'beauty', name: 'Красота' },
  { id: 'women', name: 'Женское здоровье' },
  { id: 'sport', name: 'Спорт' },
  { id: 'health', name: 'Здоровье' },
  { id: 'wellness', name: 'Wellness' },
]

const defaultBrand = {
  brandLogoSrc: '/logo-cube.png',
  brandName: 'BIORISE',
}

const offers: Offer[] = [
  {
    id: 'terzapatid',
    imageSrc: '/optimized/promo-transparent/promo-terzapatid-cutout.webp',
    imageAlt: 'Терзапатид 10 мг',
    tag: 'Популярное',
    title: 'Терзапатид 10 мг',
    description: 'Современная поддержка снижения веса под контролем врача.',
    promoCode: '5 500 ₽',
    href: '/#booking',
    category: 'popular',
    price: '5 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'vitamin-d-shot',
    imageSrc: '/optimized/promo-transparent/promo-vitamin-d-shot-cutout.webp',
    imageAlt: 'Витамин D 300 000 МЕ',
    tag: 'Популярное',
    title: 'Витамин D 300 000 МЕ',
    description: 'Один укол для поддержки иммунитета, энергии и общего тонуса.',
    promoCode: '1 900 ₽',
    href: '/#booking',
    category: 'popular',
    price: '1 900 ₽',
    ...defaultBrand,
  },
  {
    id: 'zhelezo-standart',
    imageSrc: '/optimized/drips/iron.webp',
    imageAlt: 'Железо стандарт',
    tag: 'Популярное',
    title: 'Железо стандарт',
    description: 'Поддержка кроветворения и энергии при дефиците железа.',
    promoCode: 'от 4 500 ₽',
    href: '/kapelnicy/zhelezo-standart/',
    category: 'popular',
    price: 'от 4 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'energiya',
    imageSrc: '/optimized/drips/energy.webp',
    imageAlt: 'Энергия',
    tag: 'Популярное',
    title: 'Энергия',
    description: 'Быстрое восстановление тонуса и ресурса после нагрузок.',
    promoCode: 'от 3 900 ₽',
    href: '/kapelnicy/energiya/',
    category: 'popular',
    price: 'от 3 900 ₽',
    ...defaultBrand,
  },
  {
    id: 'detoks-standart-popular',
    imageSrc: '/optimized/drips/detox.webp',
    imageAlt: 'Детокс',
    tag: 'Популярное',
    title: 'Детокс',
    description: 'Мягкая инфузионная поддержка естественных процессов очищения.',
    promoCode: 'от 3 950 ₽',
    href: '/kapelnicy/detoks-standart/',
    category: 'popular',
    price: 'от 3 950 ₽',
    ...defaultBrand,
  },
  {
    id: 'zolushka-popular',
    imageSrc: '/optimized/drips/beauty.webp',
    imageAlt: 'Золушка',
    tag: 'Популярное',
    title: 'Золушка',
    description: 'Сияние кожи и свежий вид в премиальном формате IV-терапии.',
    promoCode: 'от 4 000 ₽',
    href: '/kapelnicy/krasota-i-omolozhenie/',
    category: 'popular',
    price: 'от 4 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'vitaminnaya-popular',
    imageSrc: '/optimized/drips/vitamins.webp',
    imageAlt: 'Витаминная',
    tag: 'Популярное',
    title: 'Витаминная',
    description: 'Восполнение ключевых витаминов и микроэлементов для ежедневного ресурса.',
    promoCode: 'от 4 500 ₽',
    href: '/kapelnicy/vitaminnaya/',
    category: 'popular',
    price: 'от 4 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'detoks-standart',
    imageSrc: '/optimized/drips/detox.webp',
    imageAlt: 'Детокс',
    tag: 'Восстановление',
    title: 'Детокс',
    description: 'Очищение организма от токсической нагрузки и поддержка печени.',
    promoCode: 'от 3 950 ₽',
    href: '/kapelnicy/detoks-standart/',
    category: 'recovery',
    price: 'от 3 950 ₽',
    ...defaultBrand,
  },
  {
    id: 'posle-vecherinki',
    imageSrc: '/optimized/drips/after-party.webp',
    imageAlt: 'После вечеринки',
    tag: 'Восстановление',
    title: 'После вечеринки',
    description: 'Быстрая поддержка самочувствия после бессонной ночи и перегрузки.',
    promoCode: 'от 2 000 ₽',
    href: '/kapelnicy/posle-vecherinki/',
    category: 'recovery',
    price: 'от 2 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'jetlag',
    imageSrc: '/optimized/drips/jetlag.webp',
    imageAlt: 'Джетлаг',
    tag: 'Восстановление',
    title: 'Джетлаг',
    description: 'Помогает быстрее адаптироваться после перелётов и смены режима.',
    promoCode: 'от 2 500 ₽',
    href: '/kapelnicy/dzhetlag/',
    category: 'recovery',
    price: 'от 2 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'postkovid',
    imageSrc: '/optimized/drips/postcovid.webp',
    imageAlt: 'Постковид',
    tag: 'Восстановление',
    title: 'Постковид',
    description: 'Комплексная поддержка ресурса, дыхания и восстановления после болезни.',
    promoCode: 'от 3 800 ₽',
    href: '/kapelnicy/postkovid/',
    category: 'recovery',
    price: 'от 3 800 ₽',
    ...defaultBrand,
  },
  {
    id: 'krasota-i-omolozhenie',
    imageSrc: '/optimized/drips/beauty.webp',
    imageAlt: 'Красота и омоложение',
    tag: 'Красота',
    title: 'Красота и омоложение',
    description: 'Премиальная IV-поддержка для кожи, тонуса и свежего внешнего вида.',
    promoCode: 'от 4 000 ₽',
    href: '/kapelnicy/krasota-i-omolozhenie/',
    category: 'beauty',
    price: 'от 4 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'gustye-volosy',
    imageSrc: '/optimized/drips/hair.webp',
    imageAlt: 'Густые волосы',
    tag: 'Красота',
    title: 'Густые волосы',
    description: 'Поддержка волосяных фолликулов и качества волос изнутри.',
    promoCode: 'от 3 200 ₽',
    href: '/kapelnicy/gustye-volosy/',
    category: 'beauty',
    price: 'от 3 200 ₽',
    ...defaultBrand,
  },
  {
    id: 'laennek',
    imageSrc: '/optimized/drips/laennec.webp',
    imageAlt: 'Лаеннек',
    tag: 'Красота',
    title: 'Лаеннек',
    description: 'Премиальная программа регенерации и anti-age поддержки.',
    promoCode: 'от 5 000 ₽',
    href: '/kapelnicy/laennek/',
    category: 'beauty',
    price: 'от 5 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'antieydzh-premium',
    imageSrc: '/optimized/drips/antiage.webp',
    imageAlt: 'Антиэйдж премиум',
    tag: 'Красота',
    title: 'Антиэйдж премиум',
    description: 'Клеточная anti-age терапия для ресурса, кожи и общего тонуса.',
    promoCode: 'от 5 500 ₽',
    href: '/kapelnicy/antieydzh-premium/',
    category: 'beauty',
    price: 'от 5 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'polovaya-sistema',
    imageSrc: '/optimized/drips/reproductive.webp',
    imageAlt: 'Половая система',
    tag: 'Женское здоровье',
    title: 'Половая система',
    description: 'Поддержка репродуктивного здоровья и восстановления женского организма.',
    promoCode: 'от 3 800 ₽',
    href: '/kapelnicy/polovaya-sistema/',
    category: 'women',
    price: 'от 3 800 ₽',
    ...defaultBrand,
  },
  {
    id: 'mame-mozhno',
    imageSrc: '/optimized/drips/mom.webp',
    imageAlt: 'Маме можно',
    tag: 'Женское здоровье',
    title: 'Маме можно',
    description: 'Бережная программа поддержки для будущих и кормящих мам.',
    promoCode: 'от 3 500 ₽',
    href: '/kapelnicy/mame-mozhno/',
    category: 'women',
    price: 'от 3 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'podgotovka-k-beremennosti',
    imageSrc: '/optimized/drips/pregnancy.webp',
    imageAlt: 'Подготовка к беременности',
    tag: 'Женское здоровье',
    title: 'Подготовка к беременности',
    description: 'Комплексная IV-поддержка на этапе планирования беременности.',
    promoCode: 'от 4 000 ₽',
    href: '/kapelnicy/podgotovka-k-beremennosti/',
    category: 'women',
    price: 'от 4 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'antiklimaks',
    imageSrc: '/optimized/drips/menopause.webp',
    imageAlt: 'Анти Климакс',
    tag: 'Женское здоровье',
    title: 'Анти Климакс',
    description: 'Поддержка организма в период менопаузы и гормональной перестройки.',
    promoCode: 'от 4 000 ₽',
    href: '/kapelnicy/antiklimaks/',
    category: 'women',
    price: 'от 4 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'sport-standart',
    imageSrc: '/optimized/drips/sport.webp',
    imageAlt: 'Спорт стандарт',
    tag: 'Спорт',
    title: 'Спорт стандарт',
    description: 'Восстановление после тренировок и поддержка мышечного ресурса.',
    promoCode: 'от 3 500 ₽',
    href: '/kapelnicy/sport-silovaya/',
    category: 'sport',
    price: 'от 3 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'protein-bust',
    imageSrc: '/optimized/drips/protein.webp',
    imageAlt: 'Протеин буст',
    tag: 'Спорт',
    title: 'Протеин буст',
    description: 'Поддержка белкового обмена, восстановления и мышечного тонуса.',
    promoCode: 'от 3 500 ₽',
    href: '/kapelnicy/protein-bust/',
    category: 'sport',
    price: 'от 3 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'ayronmen',
    imageSrc: '/optimized/drips/ironman.webp',
    imageAlt: 'Айронмен',
    tag: 'Спорт',
    title: 'Айронмен',
    description: 'Интенсивная поддержка выносливости и работоспособности для активных людей.',
    promoCode: 'от 4 200 ₽',
    href: '/kapelnicy/ayronmen/',
    category: 'sport',
    price: 'от 4 200 ₽',
    ...defaultBrand,
  },
  {
    id: 'zdorovye-sosudy',
    imageSrc: '/optimized/drips/vessels.webp',
    imageAlt: 'Здоровые сосуды',
    tag: 'Здоровье',
    title: 'Здоровые сосуды',
    description: 'Поддержка сердечно-сосудистой системы и микроциркуляции.',
    promoCode: 'от 3 000 ₽',
    href: '/kapelnicy/zdorovye-sosudy/',
    category: 'health',
    price: 'от 3 000 ₽',
    ...defaultBrand,
  },
  {
    id: 'immuno-suppert',
    imageSrc: '/optimized/drips/immuno.webp',
    imageAlt: 'Иммуно суппорт',
    tag: 'Здоровье',
    title: 'Иммуно суппорт',
    description: 'Поддержка иммунитета и ресурса организма в сезон нагрузок.',
    promoCode: 'от 3 500 ₽',
    href: '/kapelnicy/immuno-support/',
    category: 'health',
    price: 'от 3 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'sahar-v-norme',
    imageSrc: '/optimized/drips/sugar.webp',
    imageAlt: 'Сахар в норме',
    tag: 'Здоровье',
    title: 'Сахар в норме',
    description: 'Поддержка обмена веществ и метаболического баланса.',
    promoCode: 'от 3 200 ₽',
    href: '/kapelnicy/sahar-v-norme/',
    category: 'health',
    price: 'от 3 200 ₽',
    ...defaultBrand,
  },
  {
    id: 'breynstorm',
    imageSrc: '/optimized/drips/brainstorm.webp',
    imageAlt: 'Брейнсторм',
    tag: 'Wellness',
    title: 'Брейнсторм',
    description: 'Поддержка концентрации, памяти и когнитивной работоспособности.',
    promoCode: 'от 3 600 ₽',
    href: '/kapelnicy/breynstorm/',
    category: 'wellness',
    price: 'от 3 600 ₽',
    ...defaultBrand,
  },
  {
    id: 'antistress',
    imageSrc: '/optimized/drips/antistress.webp',
    imageAlt: 'Антистресс+',
    tag: 'Wellness',
    title: 'Антистресс+',
    description: 'Мягкая поддержка нервной системы, сна и устойчивости к стрессу.',
    promoCode: 'от 3 200 ₽',
    href: '/kapelnicy/antistress/',
    category: 'wellness',
    price: 'от 3 200 ₽',
    ...defaultBrand,
  },
  {
    id: 'mnogokomponentnaya-vitaminnaya',
    imageSrc: '/optimized/drips/vitamins.webp',
    imageAlt: 'Много-компонентная витаминная',
    tag: 'Wellness',
    title: 'Много-компонентная витаминная',
    description: 'Комплексная нутритивная поддержка в одном инфузионном протоколе.',
    promoCode: 'от 4 500 ₽',
    href: '/kapelnicy/multivitaminnaya/',
    category: 'wellness',
    price: 'от 4 500 ₽',
    ...defaultBrand,
  },
  {
    id: 'snizhenie-vesa',
    imageSrc: '/optimized/drips/weight.webp',
    imageAlt: 'Снижение веса',
    tag: 'Wellness',
    title: 'Снижение веса',
    description: 'Инфузионная поддержка метаболизма в рамках программы коррекции веса.',
    promoCode: 'от 3 500 ₽',
    href: '/kapelnicy/snizhenie-vesa/',
    category: 'wellness',
    price: 'от 3 500 ₽',
    ...defaultBrand,
  },
]

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Link
        href={offer.href}
        className="group relative flex h-[368px] w-[248px] shrink-0 overflow-hidden rounded-[24px] border border-olive-primary/10 bg-white transition-transform duration-300 hover:-translate-y-1 sm:h-[432px] sm:w-[312px] sm:rounded-[28px]"
      >
        <div className="absolute inset-x-0 top-0 h-[44%] overflow-hidden sm:h-[50%]">
          <Image
            src={offer.imageSrc}
            alt={offer.imageAlt}
            fill
            sizes="(max-width: 640px) 248px, 312px"
            className="object-contain scale-[0.86] object-center transition-transform duration-700 group-hover:scale-[0.9] sm:object-contain sm:scale-[0.84] sm:group-hover:scale-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-black/10" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex h-[60%] flex-col justify-between rounded-t-[24px] bg-white px-4 pb-5 pt-4 sm:h-[54%] sm:rounded-t-[30px] sm:p-5">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-olive-primary/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-olive-primary/70 sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-[0.14em]">
              <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{offer.tag}</span>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-[1.12rem] font-semibold leading-[1.1] text-olive-primary sm:text-[1.45rem] sm:leading-tight">
                {offer.title}
              </h3>
              <p className="text-[13px] leading-5 text-olive-primary/72 sm:text-sm sm:leading-6">
                {offer.description}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-olive-primary/10 pt-3.5 sm:gap-4 sm:pt-4">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-olive-primary/10 bg-white sm:h-10 sm:w-10">
                <Image
                  src={offer.brandLogoSrc}
                  alt={`${offer.brandName} logo`}
                  fill
                  sizes="(max-width: 640px) 36px, 40px"
                  className="object-contain p-2"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-olive-primary/55 sm:text-xs sm:tracking-[0.14em]">
                  {offer.brandName}
                </p>
                <p className="truncate text-[15px] font-semibold text-olive-primary sm:text-base">
                  {offer.promoCode ?? offer.price ?? 'Подробнее'}
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive-primary text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-olive-light sm:h-11 sm:w-11">
              <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCategory?: Category
}

const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ className, defaultCategory = 'popular', ...props }, ref) => {
    const [selectedCategory, setSelectedCategory] = React.useState<Category>(defaultCategory)
    const [activeCardIndex, setActiveCardIndex] = React.useState(0)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const cardRefs = React.useRef<Array<HTMLDivElement | null>>([])

    const filteredOffers = React.useMemo(
      () => offers.filter((offer) => offer.category === selectedCategory),
      [selectedCategory],
    )

    React.useEffect(() => {
      setActiveCardIndex(0)
      cardRefs.current = []

      const container = scrollContainerRef.current
      if (!container) return

      requestAnimationFrame(() => {
        container.scrollTo({ left: 0, behavior: 'auto' })
      })
    }, [selectedCategory])

    const scrollToCard = React.useCallback((index: number) => {
      const container = scrollContainerRef.current
      const card = cardRefs.current[index]

      if (!container || !card) return

      setActiveCardIndex(index)
      container.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth',
      })
    }, [])

    const updateActiveCard = React.useCallback(() => {
      const container = scrollContainerRef.current
      if (!container || !cardRefs.current.length) return

      const currentScroll = container.scrollLeft
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const distance = Math.abs(card.offsetLeft - currentScroll)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveCardIndex(closestIndex)
    }, [])

    const scroll = React.useCallback((direction: 'left' | 'right') => {
      if (!filteredOffers.length) return

      const nextIndex =
        direction === 'left'
          ? Math.max(activeCardIndex - 1, 0)
          : Math.min(activeCardIndex + 1, filteredOffers.length - 1)

      scrollToCard(nextIndex)
    }, [activeCardIndex, filteredOffers.length, scrollToCard])

    return (
        <div
          ref={ref}
          className={cn(
          'relative overflow-hidden rounded-[28px] border border-olive-primary/10 bg-white px-3 py-5 shadow-[0_30px_80px_rgba(79,93,60,0.10)] sm:rounded-[36px] sm:px-6 sm:py-7 lg:px-8',
          className,
        )}
        {...props}
      >
        <div className="relative z-[1] mb-5 flex flex-col gap-3 sm:mb-6 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-primary/12 bg-white text-olive-primary transition-colors hover:bg-olive-primary hover:text-white"
              aria-label="Прокрутить влево"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-primary/12 bg-white text-olive-primary transition-colors hover:bg-olive-primary hover:text-white"
              aria-label="Прокрутить вправо"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative z-[1] mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-2 text-[13px] font-medium transition-all duration-300 sm:px-4 sm:text-sm',
                selectedCategory === category.id
                  ? 'border-olive-primary bg-olive-primary text-white shadow-[0_12px_28px_rgba(79,93,60,0.18)]'
                  : 'border-olive-primary/12 bg-white/75 text-olive-primary/72 hover:border-olive-primary/25 hover:text-olive-primary',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div
          ref={scrollContainerRef}
          className="relative z-[1] flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
          onScroll={updateActiveCard}
        >
          {filteredOffers.map((offer, index) => (
            <div
              key={offer.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="snap-start"
            >
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>

        <div className="relative z-[1] mt-2 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-olive-primary/12 bg-white text-olive-primary transition-colors hover:bg-olive-primary hover:text-white"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-olive-primary/12 bg-white text-olive-primary transition-colors hover:bg-olive-primary hover:text-white"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  },
)

OfferCarousel.displayName = 'OfferCarousel'

export { OfferCarousel, categories as offerCategories, offers as dripOffers }
