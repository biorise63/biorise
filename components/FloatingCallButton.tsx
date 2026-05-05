'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDays, Phone, X } from 'lucide-react'
import { useBookingModal } from './BookingModalProvider'

const PHONE_DISPLAY = '+7 996 749 97 47'
const PHONE_HREF = 'tel:+79967499747'

export default function FloatingCallButton() {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const { openBookingModal } = useBookingModal()

  useEffect(() => {
    if (!isOpen) return

    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isOpen])

  return (
    <div ref={rootRef} className="fixed bottom-5 right-4 z-[85] sm:bottom-6 sm:right-6">
      <div
        className={`mb-3 w-[260px] origin-bottom-right rounded-2xl border border-olive-primary/20 bg-white/95 p-4 shadow-[0_12px_32px_rgba(36,48,25,0.22)] backdrop-blur transition-all duration-200 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <p className="text-xs uppercase tracking-[0.1em] text-olive-primary/65">
          Связаться с клиникой
        </p>
        <a
          href={PHONE_HREF}
          className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-olive-primary hover:text-olive-light"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>

        <button
          onClick={() => {
            setIsOpen(false)
            openBookingModal()
          }}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-olive-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-olive-light"
        >
          <CalendarDays className="h-4 w-4" />
          Записаться онлайн
        </button>
      </div>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Закрыть блок звонка' : 'Открыть блок звонка'}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive-primary text-white shadow-[0_10px_26px_rgba(44,58,34,0.35)] transition-all hover:-translate-y-0.5 hover:bg-olive-light"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>
    </div>
  )
}
