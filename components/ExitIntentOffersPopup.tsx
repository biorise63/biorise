'use client'

import { useEffect, useRef, useState, type TouchEventHandler } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const PHONE_HREF = 'tel:+79967499747'
const SESSION_KEY = 'biorise_exit_popup_seen_session_v1'
const CLOSED_UNTIL_KEY = 'biorise_exit_popup_closed_until_v1'

const COOLDOWN_MS = 24 * 60 * 60 * 1000
const VIEW_THRESHOLD = 0.45
const MIN_UP_DISTANCE = 180
const INTENT_TOP_PX = 140
const SWIPE_MIN_DISTANCE = 42

const SLIDES = [
  { id: 'drips-1', imageSrc: '/promo/exit-offers/drips-1.jpg' },
  { id: 'drips-2', imageSrc: '/promo/exit-offers/drips-2.jpg' },
  { id: 'drips-3', imageSrc: '/promo/exit-offers/drips-3.jpg' },
  { id: 'checkups-1', imageSrc: '/promo/exit-offers/checkups-1.jpg' },
  { id: 'checkups-2', imageSrc: '/promo/exit-offers/checkups-2.jpg' },
  { id: 'checkups-3', imageSrc: '/promo/exit-offers/checkups-3.jpg' },
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

function isCooldownActive() {
  if (typeof window === 'undefined') return true
  const closedUntilRaw = localStorage.getItem(CLOSED_UNTIL_KEY)
  const closedUntil = closedUntilRaw ? Number(closedUntilRaw) : 0
  return closedUntil > Date.now()
}

export default function ExitIntentOffersPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  const lastScrollYRef = useRef(0)
  const maxScrollYRef = useRef(0)
  const prevDirectionRef = useRef<'up' | 'down' | 'none'>('none')
  const viewedEnoughRef = useRef(false)
  const upStartYRef = useRef<number | null>(null)
  const eligibleUpwardIntentRef = useRef(false)

  const shouldRender = isOpen && SLIDES.length > 0

  const openPopup = () => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY) === '1') return
    if (isCooldownActive()) return

    setIsOpen(true)
    sessionStorage.setItem(SESSION_KEY, '1')
    reachGoal('popup_open')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isCooldownActive()) return
    if (sessionStorage.getItem(SESSION_KEY) === '1') return

    lastScrollYRef.current = window.scrollY
    maxScrollYRef.current = window.scrollY

    const onMouseOut = (event: MouseEvent) => {
      if (!isDesktop()) return
      if (!viewedEnoughRef.current || !eligibleUpwardIntentRef.current) return
      if (event.clientY > 8) return
      if (event.relatedTarget !== null) return
      openPopup()
    }

    const onScroll = () => {
      if (isOpen) return

      const currentY = window.scrollY
      const lastY = lastScrollYRef.current
      const delta = currentY - lastY

      if (Math.abs(delta) < 4) return

      if (currentY > maxScrollYRef.current) {
        maxScrollYRef.current = currentY
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableHeight > 0) {
        const progress = maxScrollYRef.current / scrollableHeight
        if (progress >= VIEW_THRESHOLD) {
          viewedEnoughRef.current = true
        }
      }

      const direction: 'up' | 'down' = delta > 0 ? 'down' : 'up'

      if (!viewedEnoughRef.current) {
        prevDirectionRef.current = direction
        lastScrollYRef.current = currentY
        return
      }

      if (direction === 'down') {
        upStartYRef.current = null
        eligibleUpwardIntentRef.current = false
      }

      if (direction === 'up') {
        if (prevDirectionRef.current !== 'up') {
          upStartYRef.current = lastY
          eligibleUpwardIntentRef.current = false
        }

        if (upStartYRef.current !== null) {
          const upwardDistance = upStartYRef.current - currentY
          if (upwardDistance >= MIN_UP_DISTANCE) {
            eligibleUpwardIntentRef.current = true
          }
        }

        if (!isDesktop() && eligibleUpwardIntentRef.current) {
          openPopup()
        }

        if (isDesktop() && eligibleUpwardIntentRef.current && currentY <= INTENT_TOP_PX) {
          openPopup()
        }
      }

      prevDirectionRef.current = direction
      lastScrollYRef.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [isOpen])

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
      localStorage.setItem(CLOSED_UNTIL_KEY, String(Date.now() + COOLDOWN_MS))
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

    if (distance > 0) goNext()
    else goPrev()
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

      <div className="relative h-[80dvh] w-full max-w-[760px] overflow-hidden rounded-[20px] border border-white/40 bg-[#f3efe6] shadow-[0_18px_44px_rgba(23,30,18,0.28)] animate-popup-scale-in sm:h-[78dvh] sm:max-h-[720px]">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-olive-primary transition-colors hover:bg-white"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:left-3 sm:h-11 sm:w-11"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:right-3 sm:h-11 sm:w-11"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="flex h-full flex-col">
          <div
            className="relative min-h-0 flex-1 overflow-hidden"
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
                  <img
                    src={slide.imageSrc}
                    alt={`Акция ${index + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 bg-[#f3efe6] px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
            <h2
              id="exit-intent-popup-title"
              className="mx-auto max-w-[380px] text-center font-heading text-[20px] font-semibold leading-tight text-[#34422d] sm:text-[26px]"
            >
              До конца акций осталось 3 дня
            </h2>

            <a
              href={PHONE_HREF}
              onClick={() => reachGoal('popup_zvonok')}
              className="mx-auto mt-3 inline-flex w-full max-w-[360px] items-center justify-center rounded-[14px] bg-olive-primary px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-olive-light"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
