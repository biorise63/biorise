'use client'

import { useEffect, useRef, useState, type TouchEventHandler } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const PHONE_HREF = 'tel:+79967499747'
const SESSION_KEY = 'biorise_exit_popup_seen_session_v1'
const CLOSED_UNTIL_KEY = 'biorise_exit_popup_closed_until_v1'
const COOLDOWN_MS = 24 * 60 * 60 * 1000
const ARM_DELAY_MS = 4500
const MIN_SCROLL_DEPTH = 280
const SWIPE_MIN_DISTANCE = 42
const ALWAYS_SHOW_ON_REFRESH = true

const SLIDES = [
  {
    id: 'drips-1',
    imageSrc: '/promo/exit-offers/drips-1.jpg',
  },
  {
    id: 'drips-2',
    imageSrc: '/promo/exit-offers/drips-2.jpg',
  },
  {
    id: 'drips-3',
    imageSrc: '/promo/exit-offers/drips-3.jpg',
  },
  {
    id: 'checkups-1',
    imageSrc: '/promo/exit-offers/checkups-1.jpg',
  },
  {
    id: 'checkups-2',
    imageSrc: '/promo/exit-offers/checkups-2.jpg',
  },
  {
    id: 'checkups-3',
    imageSrc: '/promo/exit-offers/checkups-3.jpg',
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

  const openPopup = (force = false) => {
    if (typeof window === 'undefined') return
    if (!force && sessionStorage.getItem(SESSION_KEY) === '1') return

    setIsOpen(true)
    sessionStorage.setItem(SESSION_KEY, '1')
    reachGoal('popup_open')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (ALWAYS_SHOW_ON_REFRESH) {
      const immediateTimer = window.setTimeout(() => {
        openPopup(true)
      }, 220)
      return () => window.clearTimeout(immediateTimer)
    }

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
    if (typeof window !== 'undefined' && !ALWAYS_SHOW_ON_REFRESH) {
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
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/45 p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-popup-title"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 12px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
      }}
    >
      <div className="absolute inset-0" onClick={closePopup} aria-hidden="true" />

      <div className="relative h-[82dvh] w-full max-w-[760px] overflow-hidden rounded-[20px] border border-white/40 bg-[#f3efe6] shadow-[0_18px_44px_rgba(23,30,18,0.28)] animate-popup-scale-in sm:h-[78dvh] sm:max-h-[720px]">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-olive-primary transition-colors hover:bg-white"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative h-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="relative h-full min-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.imageSrc} alt={`Акция ${index + 1}`} className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:left-3 sm:h-11 sm:w-11"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:right-3 sm:h-11 sm:w-11"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 pb-5 sm:p-6">
            <h2
              id="exit-intent-popup-title"
              className="mx-auto max-w-[380px] text-center font-heading text-[22px] font-semibold leading-tight text-white sm:text-[28px]"
            >
              До конца акций осталось 3 дня
            </h2>

            <a
              href={PHONE_HREF}
              onClick={() => reachGoal('popup_zvonok')}
              className="mx-auto mt-4 inline-flex w-full max-w-[360px] items-center justify-center rounded-[14px] bg-olive-primary px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-olive-light"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
