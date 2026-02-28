'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import BookingModal from './kapelnicy/BookingModal'

interface BookingModalContextType {
  openBookingModal: () => void
  closeBookingModal: () => void
  isOpen: boolean
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined)

export function useBookingModal() {
  const context = useContext(BookingModalContext)
  if (!context) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }
  return context
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openBookingModal = () => setIsOpen(true)
  const closeBookingModal = () => setIsOpen(false)

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal, isOpen }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} />
    </BookingModalContext.Provider>
  )
}
