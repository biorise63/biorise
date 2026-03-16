'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Link from 'next/link'
import { useBookingModal } from './BookingModalProvider'

interface ClinicAddress {
  id: string
  address: string
  hours: string
  phone: string
}

const clinics: ClinicAddress[] = [
  {
    id: '1',
    address: 'г. Самара ул. Дыбенко 27Б',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
  {
    id: '2',
    address: 'г. Самара ул. Стара Загора 48',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
  {
    id: '3',
    address: 'г. Самара ул. Молодежная 18',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState<ClinicAddress | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { openBookingModal } = useBookingModal()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClinicSelect = (clinic: ClinicAddress) => {
    setSelectedClinic(clinic)
    setIsDropdownOpen(false)
  }

  return (
    <>
      {/* Top Bar with Location and Clinic Selection - Fixed, separate from Hero */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-olive-primary/10" style={{ backgroundColor: 'rgba(94, 111, 82, 0.5)' }}>
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-wrap min-w-0 flex-1">
              {/* City */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white font-menu font-medium text-xs sm:text-sm">Самара</span>
              </div>

              {/* Clinic Address Dropdown */}
              <div className="relative flex-shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-white/80 transition-colors font-menu text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline text-white/80">Адреса клиник:</span>
                  <span className="text-white font-medium truncate max-w-[140px] sm:max-w-none text-xs sm:text-sm">
                    {selectedClinic ? selectedClinic.address : 'Выбрать адрес'}
                  </span>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-premium border border-olive-primary/10 min-w-[280px] sm:min-w-[300px] max-w-[90vw] z-50">
                    {clinics.map((clinic) => (
                      <button
                        key={clinic.id}
                        onClick={() => handleClinicSelect(clinic)}
                        className="w-full text-left px-4 py-3 hover:bg-beige-background transition-colors border-b border-olive-primary/5 last:border-b-0 text-sm sm:text-base"
                      >
                        <div className="text-olive-primary font-medium">{clinic.address}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Clinic Info - Show on all devices */}
              {selectedClinic && (
                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-wrap min-w-0">
                  {/* Hours - Hidden on mobile */}
                  <div className="hidden sm:flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-white/80">{selectedClinic.hours}</span>
                  </div>

                  {/* Phone - Show on all devices */}
                  <a
                    href={`tel:${selectedClinic.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                    className="flex items-center gap-1 sm:gap-2 text-white hover:text-white/80 transition-colors font-semibold cursor-pointer flex-shrink-0"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">{selectedClinic.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/98 backdrop-blur-sm shadow-premium' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-menu">
              <Link href="/" className="text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base">
                Главная
              </Link>

              <div
                className="relative has-dropdown"
                ref={servicesRef}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base leading-none py-1"
                >
                  Услуги
                  <svg
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute left-0 top-[calc(100%-2px)] w-64 bg-white rounded-lg shadow-premium border border-olive-primary/10 z-50">
                    <Link
                      href="/kapelnicy"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Капельницы
                    </Link>
                    <Link
                      href="/bioimpedance"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Биоимпедансный анализ композитного состава тела
                    </Link>
                    <Link
                      href="/spravki"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Справки
                    </Link>
                    <Link
                      href="/analizy"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Анализы
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/#why-us" className="text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base">
                О нас
              </Link>
              <Link href="/#gallery" className="text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base">
                Акции
              </Link>
              <Link href="/#doctors" className="text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base">
                Врачи
              </Link>
              <button
                onClick={openBookingModal}
                className="bg-olive-primary text-white px-4 lg:px-6 py-2 rounded-full hover:bg-olive-light transition-all shadow-premium text-sm lg:text-base"
              >
                Записаться
              </button>
            </nav>
            
            {/* Social Media Links */}
            <div className="hidden md:flex items-center gap-4 ml-4">
              <a
                href="https://t.me/biorise_smr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0088cc] transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.665 3.447 17.03 19.139c-.26 1.176-.944 1.466-1.911.912l-5.278-3.897-2.548 2.453c-.283.283-.52.52-1.07.52l.383-5.436 9.9-8.94c.43-.382-.093-.594-.67-.212L5.58 11.82.314 10.17c-1.15-.36-1.176-1.15.24-1.7L19.067 2.04c.944-.34 1.77.212 1.599 1.407Z" />
                </svg>
              </a>
              <a
                href="https://vk.ru/biorise63"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0077FF] transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.893 16.07h-1.32c-.493 0-.646-.399-1.54-1.3-.78-.77-1.125-.87-1.32-.87-.267 0-.344.077-.344.45v1.54c0 .32-.103.492-.95.492-1.4 0-2.958-1.507-4.224-4.312-1.709-3.556-2.026-4.95-2.026-5.212 0-.23.09-.45.84-.45h1.32c.38 0 .52.18.664.58.72 2.1 1.93 4.073 2.394 4.073.19 0 .28-.09.28-.57V8.45c-.06-1.01-.6-1.1-.6-1.46 0-.17.14-.34.35-.34h2.07c.44 0 .6.19.6.6v3.58c0 .34.15.46.24.46.19 0 .35-.12.69-.46.97-1.08 1.67-2.77 1.67-2.77.12-.28.33-.43.62-.43h1.32c.44 0 .53.22.44.52-.18.81-1.94 3.33-1.94 3.33-.16.26-.23.39 0 .65.17.2.72.7 1.07 1.13.66.75 1.16 1.38 1.29 1.81.14.43-.09.65-.55.65Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/biorise_samara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#E4405F] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0Zm12 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                </svg>
              </a>
              <a
                href="https://max.ru/join/Gpyg9NQKBcX0qF1kzBQ370763KR744lBw_hKHAEfLdY"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-6 h-6"
                aria-label="Мессенджер MAX"
              >
                <img src="/max.svg" alt="Мессенджер MAX" className="w-6 h-6 rounded-lg shadow-sm" />
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-olive-primary p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-olive-primary/10 pt-4"
            >
              <div className="flex flex-col space-y-4 font-menu">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-olive-primary hover:text-olive-light transition-colors py-2"
                >
                  Главная
                </Link>
                <div className="flex flex-col gap-1">
                  <span className="text-olive-primary font-semibold">Услуги</span>
                  <Link
                    href="/kapelnicy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="pl-3 text-olive-primary hover:text-olive-light transition-colors py-1"
                  >
                    Капельницы
                  </Link>
                  <Link
                    href="/bioimpedance"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="pl-3 text-olive-primary hover:text-olive-light transition-colors py-1"
                  >
                    Биоимпедансный анализ
                  </Link>
                  <Link
                    href="/spravki"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="pl-3 text-olive-primary hover:text-olive-light transition-colors py-1"
                  >
                    Справки
                  </Link>
                  <Link
                    href="/analizy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="pl-3 text-olive-primary hover:text-olive-light transition-colors py-1"
                  >
                    Анализы
                  </Link>
                </div>
                <Link
                  href="/#why-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-olive-primary hover:text-olive-light transition-colors py-2"
                >
                  О нас
                </Link>
                <Link
                  href="/#gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-olive-primary hover:text-olive-light transition-colors py-2"
                >
                  Акции
                </Link>
                <Link
                  href="/#doctors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-olive-primary hover:text-olive-light transition-colors py-2"
                >
                  Врачи
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openBookingModal()
                  }}
                  className="bg-olive-primary text-white px-6 py-3 rounded-full hover:bg-olive-light transition-all shadow-premium text-center mt-2 w-full"
                >
                  Записаться
                </button>
                
                {/* Social Media Links - Mobile */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-olive-primary/10">
                  <a
                    href="https://t.me/biorise_smr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#0088cc] transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.665 3.447 17.03 19.139c-.26 1.176-.944 1.466-1.911.912l-5.278-3.897-2.548 2.453c-.283.283-.52.52-1.07.52l.383-5.436 9.9-8.94c.43-.382-.093-.594-.67-.212L5.58 11.82.314 10.17c-1.15-.36-1.176-1.15.24-1.7L19.067 2.04c.944-.34 1.77.212 1.599 1.407Z" />
                    </svg>
                  </a>
                  <a
                    href="https://vk.ru/biorise63"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#0077FF] transition-colors"
                    aria-label="ВКонтакте"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.893 16.07h-1.32c-.493 0-.646-.399-1.54-1.3-.78-.77-1.125-.87-1.32-.87-.267 0-.344.077-.344.45v1.54c0 .32-.103.492-.95.492-1.4 0-2.958-1.507-4.224-4.312-1.709-3.556-2.026-4.95-2.026-5.212 0-.23.09-.45.84-.45h1.32c.38 0 .52.18.664.58.72 2.1 1.93 4.073 2.394 4.073.19 0 .28-.09.28-.57V8.45c-.06-1.01-.6-1.1-.6-1.46 0-.17.14-.34.35-.34h2.07c.44 0 .6.19.6.6v3.58c0 .34.15.46.24.46.19 0 .35-.12.69-.46.97-1.08 1.67-2.77 1.67-2.77.12-.28.33-.43.62-.43h1.32c.44 0 .53.22.44.52-.18.81-1.94 3.33-1.94 3.33-.16.26-.23.39 0 .65.17.2.72.7 1.07 1.13.66.75 1.16 1.38 1.29 1.81.14.43-.09.65-.55.65Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/biorise_samara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#E4405F] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0Zm12 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                    </svg>
                  </a>
                  <a
                    href="https://max.ru/join/Gpyg9NQKBcX0qF1kzBQ370763KR744lBw_hKHAEfLdY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-6 h-6"
                    aria-label="Мессенджер MAX"
                  >
                    <img src="/max.svg" alt="Мессенджер MAX" className="w-6 h-6 rounded-lg shadow-sm" />
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>
    </>
  )
}
