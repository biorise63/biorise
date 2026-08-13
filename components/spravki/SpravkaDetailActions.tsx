'use client'

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'

export default function SpravkaDetailActions() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={openBookingModal}
        className="inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-base font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
      >
        Записаться на оформление справки
      </button>
      <Link
        href="/spravki/"
        className="inline-flex items-center justify-center rounded-full border border-olive-primary/20 bg-white/80 px-6 py-3 text-base font-semibold text-olive-primary transition-all hover:-translate-y-0.5 hover:bg-white"
      >
        Все справки
      </Link>
    </div>
  )
}
