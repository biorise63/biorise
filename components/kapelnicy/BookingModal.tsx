'use client'

import { useEffect } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-4xl max-h-[90vh] m-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-olive-primary/10 bg-olive-primary/5">
          <h2 className="text-xl font-heading text-olive-primary">Записаться онлайн</h2>
          <button
            onClick={onClose}
            className="p-2 text-olive-primary hover:text-olive-light hover:bg-olive-primary/10 rounded-full transition-colors"
            aria-label="Закрыть"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Iframe container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src="https://klientiks.ru/app/united/BIORISE"
            className="w-full h-full border-0"
            title="Форма онлайн записи"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  )
}
