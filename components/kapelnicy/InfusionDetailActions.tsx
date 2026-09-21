'use client'

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'

interface InfusionDetailActionsProps {
  slug: string
}

export default function InfusionDetailActions({ slug }: InfusionDetailActionsProps) {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={openBookingModal}
        className="inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-base font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
      >
        Записаться на капельницу
      </button>
      <Link
        href="/kapelnicy/"
        onClick={() => {
          window.sessionStorage.setItem('biorise-focus-infusion', slug)
        }}
        className="inline-flex items-center justify-center rounded-full border border-olive-primary/20 bg-white/80 px-6 py-3 text-base font-semibold text-olive-primary transition-all hover:-translate-y-0.5 hover:bg-white"
      >
        Вернуться к выбору капельниц
      </Link>
    </div>
  )
}
