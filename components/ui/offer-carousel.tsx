'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag } from 'lucide-react'
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
    imageSrc: '/promo-terzapatid.jpg',
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
    imageSrc: '/promo-vitamin-d-shot.jpg',
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
    imageSrc: '/drips/iron.png',
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
    imageSrc: '/drips/energy.png',
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
    imageSrc: '/drips/detox.png',
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
    imageSrc: '/drips/beauty.png',
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
    imageSrc: '/drips/vitamins.png',
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
    imageSrc: '/drips/detox.png',
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
    imageSrc: '/drips/after-party.png',
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
    imageSrc: '/drips/jetlag.png',
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
    imageSrc: '/drips/postcovid.png',
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
    imageSrc: '/drips/beauty.png',
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
    imageSrc: '/drips/hair.png',
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
    imageSrc: '/drips/laennec.png',
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
    imageSrc: '/drips/antiage.png',
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
    imageSrc: '/drips/reproductive.png',
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
    imageSrc: '/drips/mom.png',
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
    imageSrc: '/drips/pregnancy.png',
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
    imageSrc: '/drips/menopause.png',
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
    imageSrc: '/drips/sport.png',
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
    imageSrc: '/drips/protein.png',
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
    imageSrc: '/drips/ironman.png',
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
    imageSrc: '/drips/vessels.png',
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
    imageSrc: '/drips/immuno.png',
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
    imageSrc: '/drips/sugar.png',
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
    imageSrc: '/drips/brainstorm.png',
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
    imageSrc: '/drips/antistress.png',
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
    imageSrc: '/drips/vitamins.png',
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
    imageSrc: '/drips/weight.png',
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
      className="snap-start"
    >
      <Link
        href={offer.href}
        className="group relative flex h-[336px] w-[248px] shrink-0 overflow-hidden rounded-[24px] border border-olive-primary/10 bg-[#f4efe6] shadow-[0_20px_48px_rgba(79,93,60,0.10)] transition-transform duration-300 hover:-translate-y-1 sm:h-[408px] sm:w-[312px] sm:rounded-[28px]"
      >
        <div className="absolute inset-x-0 top-0 h-[48%] overflow-hidden sm:h-[52%]">
          <Image
            src={offer.imageSrc}
            alt={offer.imageAlt}
            fill
            sizes="(max-width: 640px) 248px, 312px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4efe6] via-[#f4efe6]/10 to-black/10" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex h-[56%] flex-col justify-between rounded-t-[24px] bg-[linear-gradient(180deg,rgba(244,239,230,0.92)_0%,#f4efe6_18%,#ffffff_100%)] p-4 sm:h-[53%] sm:rounded-t-[30px] sm:p-5">
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
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    const filteredOffers = React.useMemo(
      () => offers.filter((offer) => offer.category === selectedCategory),
      [selectedCategory],
    )

    const scroll = React.useCallback((direction: 'left' | 'right') => {
      if (!scrollContainerRef.current) return
      const scrollAmount = Math.max(scrollContainerRef.current.clientWidth * 0.82, 260)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }, [])

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[28px] border border-olive-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f6f1e8_100%)] px-3 py-5 shadow-[0_30px_80px_rgba(79,93,60,0.10)] sm:rounded-[36px] sm:px-6 sm:py-7 lg:px-8',
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute right-[-72px] top-[-72px] h-48 w-48 rounded-full bg-olive-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-100px] left-[-60px] h-56 w-56 rounded-full bg-[#d8cab3]/45 blur-3xl" />

        <div className="relative z-[1] mb-5 flex flex-col gap-3 sm:mb-6 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-olive-primary/10 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-primary/60 sm:mb-3 sm:text-[11px] sm:tracking-[0.16em]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>IV Therapy BIORISE</span>
            </div>
          </div>

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
        >
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
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
