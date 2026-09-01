'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import BookingModal from './kapelnicy/BookingModal'

interface BookingModalContextType {
  openBookingModal: () => void
  closeBookingModal: () => void
  isOpen: boolean
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined)
const KLIENTIKS_BOOKING_URL = 'https://klientiks.ru/app/united/BIORISE'

function isIosSafariBrowser() {
  if (typeof window === 'undefined') return false

  const ua = window.navigator.userAgent
  const isIOSDevice =
    /iPhone|iPad|iPod/i.test(ua) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua)

  return isIOSDevice && isSafari
}

function isNarrowViewport() {
  if (typeof window === 'undefined') return false
  // Klientiks widget layout has a hard ~480px min-width and doesn't rescale inside an
  // iframe (unlike a direct page load, where the mobile browser auto-zooms it to fit) —
  // below that the "выбрать филиал" step and its "Перейти к записи" button render
  // outside the visible modal area and can't be tapped.
  return window.innerWidth < 640
}

export function useBookingModal() {
  const context = useContext(BookingModalContext)
  if (!context) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }
  return context
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openBookingModal = () => {
    // iOS Safari may fail SMS code verification inside iframe due to storage/session restrictions.
    // Narrow viewports hit a separate issue: the widget doesn't rescale inside the iframe,
    // so its buttons render past the edge of the modal. Both cases open the widget directly instead.
    if (isIosSafariBrowser() || isNarrowViewport()) {
      window.location.href = KLIENTIKS_BOOKING_URL
      return
    }
    setIsOpen(true)
  }
  const closeBookingModal = () => setIsOpen(false)

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal, isOpen }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} />
    </BookingModalContext.Provider>
  )
}
