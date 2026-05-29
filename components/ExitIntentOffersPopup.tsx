'use client'

import { useEffect, useMemo, useRef, useState, type TouchEventHandler } from 'react'
import { ChevronLeft, ChevronRight, Phone, X } from 'lucide-react'

const PHONE_HREF = 'tel:+79967499747'
const SESSION_KEY = 'biorise_exit_popup_seen_session_v1'
const CLOSED_UNTIL_KEY = 'biorise_exit_popup_closed_until_v1'
const COOLDOWN_MS = 24 * 60 * 60 * 1000
const ARM_DELAY_MS = 4500
const MIN_SCROLL_DEPTH = 280
const SWIPE_MIN_DISTANCE = 42

const SLIDES = [
  {
    id: 'drips-1',
    title: 'Капельницы BIORISE',
    description:
      'Восстановительные и витаминные программы под контролем специалистов клиники.',
    imageSrc: '/promo/exit-offers/drips-1.jpg',
    badge: 'Капельницы',
  },
  {
    id: 'drips-2',
    title: 'Капельницы BIORISE',
    description:
      'Комплексы для энергии, восстановления и поддержки тонуса в премиальном формате.',
    imageSrc: '/promo/exit-offers/drips-2.jpg',
    badge: 'Капельницы',
  },
  {
    id: 'drips-3',
    title: 'Капельницы BIORISE',
    description:
      'Подберем подходящую схему под ваши цели и самочувствие.',
    imageSrc: '/promo/exit-offers/drips-3.jpg',
    badge: 'Капельницы',
  },
  {
    id: 'checkups-1',
    title: 'Чекапы BIORISE',
    description:
      'Базовые и расширенные программы диагностики для контроля ключевых показателей организма.',
    imageSrc: '/promo/exit-offers/checkups-1.jpg',
    badge: 'Чек-апы',
  },
  {
    id: 'checkups-2',
    title: 'Чекапы BIORISE',
    description:
      'Комфортный формат обследования с фокусом на профилактику и ясную интерпретацию результатов.',
    imageSrc: '/promo/exit-offers/checkups-2.jpg',
    badge: 'Чек-апы',
  },
  {
    id: 'checkups-3',
    title: 'Чекапы BIORISE',
    description:
      'Системный подход к здоровью: анализы, рекомендации и сопровождение.',
    imageSrc: '/promo/exit-offers/checkups-3.jpg',
    badge: 'Чек-апы',
  },
] as const

type YandexWindow = Window & {
  ym?: (counterId: number, action: 'reachGoal', goal: string) => void
}

function reachGoal(goal: 'popup_open' | 'popup_close' | 'popup_zvonok') {
  if (typeof window === 'undefined') return
  const typedWindow = window as YandexWindow
  if (typeof typedWindow.ym !== 'function') return
  typedWindow.ym(106878489, 'reachGoal', goal)
}

function isDesktop() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
}

export default function ExitIntentOffersPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isArmed, setIsArmed] = useState(false)

  const maxScrollRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  const shouldRender = isOpen && SLIDES.length > 0

  const activeSlide = useMemo(() => SLIDES[activeIndex], [activeIndex])

  const openPopup = () => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY) === '1') return

    setIsOpen(true)
    sessionStorage.setItem(SESSION_KEY, '1')
    reachGoal('popup_open')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const closedUntilRaw = localStorage.getItem(CLOSED_UNTIL_KEY)
    const closedUntil = closedUntilRaw ? Number(closedUntilRaw) : 0
    if (closedUntil > Date.now()) return

    const armTimer = window.setTimeout(() => {
      setIsArmed(true)
      lastScrollYRef.current = window.scrollY
      maxScrollRef.current = window.scrollY
    }, ARM_DELAY_MS)

    return () => window.clearTimeout(armTimer)
  }, [])

  useEffect(() => {
    if (!isArmed || isOpen || typeof window === 'undefined') return

    const onMouseOut = (event: MouseEvent) => {
      if (!isDesktop()) return
      if (event.clientY > 8) return
      if (event.relatedTarget !== null) return
      if (maxScrollRef.current < MIN_SCROLL_DEPTH) return
      openPopup()
    }

    const onScroll = () => {
      const currentY = window.scrollY
      const prevY = lastScrollYRef.current

      if (currentY > maxScrollRef.current) {
        maxScrollRef.current = currentY
      }

      const isScrollingUp = currentY < prevY - 16
      if (isScrollingUp && maxScrollRef.current > MIN_SCROLL_DEPTH) {
        openPopup()
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isArmed, isOpen])

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return

    const prevBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBodyOverflow
    }
  }, [isOpen])

  const closePopup = () => {
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      const until = Date.now() + COOLDOWN_MS
      localStorage.setItem(CLOSED_UNTIL_KEY, String(until))
      sessionStorage.setItem(SESSION_KEY, '1')
    }
    reachGoal('popup_close')
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length)
  }

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
    touchEndXRef.current = null
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    touchEndXRef.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = () => {
    const start = touchStartXRef.current
    const end = touchEndXRef.current
    if (start === null || end === null) return

    const distance = start - end
    if (Math.abs(distance) < SWIPE_MIN_DISTANCE) return

    if (distance > 0) {
      goNext()
    } else {
      goPrev()
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center overflow-y-auto bg-black/45 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-popup-title"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 12px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
      }}
    >
      <div className="absolute inset-0" onClick={closePopup} aria-hidden="true" />

      <div className="relative my-1 w-full max-w-[760px] max-h-[calc(100dvh-24px)] overflow-auto rounded-[20px] border border-white/40 bg-[#f3efe6] shadow-[0_18px_44px_rgba(23,30,18,0.28)] animate-popup-scale-in sm:max-h-[calc(100dvh-40px)]">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-olive-primary transition-colors hover:bg-white"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="grid grid-cols-1 md:grid-cols-[1.06fr_1fr]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative min-h-[180px] sm:min-h-[240px] md:min-h-[420px]">
            <div
              className="flex h-full w-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {SLIDES.map((slide) => (
                <div key={slide.id} className="relative h-full min-w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.imageSrc} alt={slide.title} className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 pb-5 sm:p-6 md:p-7">
            <p className="inline-flex rounded-full border border-olive-primary/20 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-olive-primary/85">
              {activeSlide.badge}
            </p>

            <h2
              id="exit-intent-popup-title"
              className="mt-3 font-heading text-[26px] font-semibold leading-[1.12] text-[#34422d] sm:text-[30px]"
            >
              {activeSlide.title}
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-[#4c5b3b]/95 sm:text-base">
              {activeSlide.description}
            </p>

            <a
              href={PHONE_HREF}
              onClick={() => reachGoal('popup_zvonok')}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-olive-primary px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-olive-light"
            >
              <Phone className="h-4 w-4" />
              Получить консультацию
            </a>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-6 bg-olive-primary' : 'w-2 bg-olive-primary/30'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Слайд ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-olive-primary/30 bg-white/90 text-olive-primary transition-colors hover:bg-white"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-olive-primary/30 bg-white/90 text-olive-primary transition-colors hover:bg-white"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
