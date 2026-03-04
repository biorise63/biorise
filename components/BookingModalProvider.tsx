'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import BookingModal from './kapelnicy/BookingModal'

interface BookingModalContextType {
  openBookingModal: () => void
  closeBookingModal: () => void
  isOpen: boolean
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined)
const KLIENTIKS_BOOKING_URL = 'https://klientiks.ru/app2/biorise-clinic'

function isIosSafariBrowser() {
  if (typeof window === 'undefined') return false

  const ua = window.navigator.userAgent
  const isIOSDevice =
    /iPhone|iPad|iPod/i.test(ua) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua)

  return isIOSDevice && isSafari
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
    if (isIosSafariBrowser()) {
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
