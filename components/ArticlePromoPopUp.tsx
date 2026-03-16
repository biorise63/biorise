'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import BookingFormFields from './BookingFormFields'

const SESSION_KEY = 'biorise_article_promo_dismissed'

type ArticlePromoPopUpProps = {
  coverImage: string
}

export default function ArticlePromoPopUp({ coverImage }: ArticlePromoPopUpProps) {
  const [visible, setVisible] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const hasShownRef = useRef(false)

  const markDismissed = useCallback(() => {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(SESSION_KEY, '1')
  }, [])

  const checkScroll = useCallback(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') return
    if (hasShownRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const ratio = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 1
    if (ratio >= 0.4) {
      hasShownRef.current = true
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    window.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => window.removeEventListener('scroll', checkScroll)
  }, [mounted, checkScroll])

  const handleClose = () => {
    setVisible(false)
    setMinimized(false)
    markDismissed()
  }

  const handleMinimize = () => {
    setVisible(false)
    setMinimized(true)
  }

  const handleExpand = () => {
    setMinimized(false)
    setVisible(true)
  }

  if (!mounted) return null

  return (
    <>
      {/* Minimized pill */}
      {minimized && (
        <button
          type="button"
          onClick={handleExpand}
          className="fixed bottom-4 right-4 z-[100] px-4 py-2.5 rounded-full bg-olive-primary text-white text-sm font-heading shadow-premium hover:bg-olive-light transition-all duration-200"
          aria-label="Заполнить форму"
        >
          Заполнить форму
        </button>
      )}

      {/* Backdrop + popup */}
      {visible && (
        <div
          className="fixed inset-0 z-[99] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
        >
          <div
            className="absolute inset-0 bg-black/30 animate-popup-fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            className="relative w-[90vw] max-w-lg bg-white rounded-[16px] overflow-hidden max-h-[90vh] flex flex-col animate-popup-scale-in"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(94,111,82,0.06)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image — компактная высота, чтобы форма помещалась на 1366×768 */}
            <div className="relative w-full h-32 sm:h-36 bg-beige-background shrink-0 overflow-hidden rounded-t-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Header with close/minimize */}
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <button
                type="button"
                onClick={handleMinimize}
                className="w-8 h-8 rounded-full bg-white/90 text-olive-primary flex items-center justify-center hover:bg-white transition-colors font-heading text-lg leading-none"
                aria-label="Свернуть"
              >
                –
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/90 text-olive-primary flex items-center justify-center hover:bg-white transition-colors font-heading text-xl leading-none"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {/* Content — прокручиваемый контейнер: min-h-0 для flex, overflow-y: auto для тачпада/колеса */}
            <div className="p-4 sm:p-5 flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <h2 id="promo-popup-title" className="text-lg sm:text-xl font-heading text-olive-primary font-medium mb-1">
                Скидка 20% на капельницы для спортсменов
              </h2>
              <p className="text-olive-primary/80 text-xs sm:text-sm mb-4">
                До <strong>25.03.2026</strong> — промокод <strong>АТЛЕТ</strong>.
              </p>
              <BookingFormFields
                defaultPromoCode="АТЛЕТ"
                submitButtonText="Записаться"
                compact
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
