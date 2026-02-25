'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Link from 'next/link'

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
              <Link
                href="/#booking"
                className="bg-olive-primary text-white px-4 lg:px-6 py-2 rounded-full hover:bg-olive-light transition-all shadow-premium text-sm lg:text-base"
              >
                Записаться
              </Link>
            </nav>
            
            {/* Social Media Links */}
            <div className="hidden md:flex items-center gap-3 ml-4">
              <a
                href="https://t.me/biorise_smr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-primary hover:text-olive-light transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://vk.ru/biorise63"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-primary hover:text-olive-light transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.095-1.492.077-1.492.077l-.35-.5s-.525-.722-1.184-1.45c-.72-.84-1.732-2.45-1.732-2.45s-.105-.21.015-.33c.105-.105.35-.21.35-.21s2.85-2.55 3.195-2.85c.21-.15.35-.105.35.015 0 .15.015.945.015.945s.09 1.35-.21 1.65c-.21.21-.525.525-.525.525s-.09.12-.015.24c.06.12.24.24.42.36.36.24.75.525 1.05.84.735.735 1.23 1.545 1.23 1.545s.09.18.015.3c-.06.12-.21.21-.21.21l-.525.36s-.39.24-.75.015c-.24-.15-1.545-1.545-2.1-2.55-.15-.24-.09-.36 0-.48.06-.09.24-.24.36-.36.36-.36.75-.75 1.05-1.05.15-.15.24-.24.15-.36-.09-.12-.24-.24-.24-.24l-.66-.51s-.525-.39-.15-.75c.24-.24.75-.75 1.35-1.35.66-.66 1.23-1.23 1.545-1.545.24-.24.36-.18.36-.03 0 .24.015.615.015.615s-.015.525.09.75c.09.24.3.36.3.36l1.05.69s.21.12.3.24c.09.12.09.24.09.24s-.015 1.05-.015 1.545c0 .495.09.75.24.84.15.09.36.09.36.09h.84c.15 0 .24.09.24.24 0 .15-.09.24-.24.24z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/biorise_samara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-primary hover:text-olive-light transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
                <Link
                  href="/#booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-olive-primary text-white px-6 py-3 rounded-full hover:bg-olive-light transition-all shadow-premium text-center mt-2"
                >
                  Записаться
                </Link>
                
                {/* Social Media Links - Mobile */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-olive-primary/10">
                  <a
                    href="https://t.me/biorise_smr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-primary hover:text-olive-light transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <a
                    href="https://vk.ru/biorise63"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-primary hover:text-olive-light transition-colors"
                    aria-label="ВКонтакте"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.095-1.492.077-1.492.077l-.35-.5s-.525-.722-1.184-1.45c-.72-.84-1.732-2.45-1.732-2.45s-.105-.21.015-.33c.105-.105.35-.21.35-.21s2.85-2.55 3.195-2.85c.21-.15.35-.105.35.015 0 .15.015.945.015.945s.09 1.35-.21 1.65c-.21.21-.525.525-.525.525s-.09.12-.015.24c.06.12.24.24.42.36.36.24.75.525 1.05.84.735.735 1.23 1.545 1.23 1.545s.09.18.015.3c-.06.12-.21.21-.21.21l-.525.36s-.39.24-.75.015c-.24-.15-1.545-1.545-2.1-2.55-.15-.24-.09-.36 0-.48.06-.09.24-.24.36-.36.36-.36.75-.75 1.05-1.05.15-.15.24-.24.15-.36-.09-.12-.24-.24-.24-.24l-.66-.51s-.525-.39-.15-.75c.24-.24.75-.75 1.35-1.35.66-.66 1.23-1.23 1.545-1.545.24-.24.36-.18.36-.03 0 .24.015.615.015.615s-.015.525.09.75c.09.24.3.36.3.36l1.05.69s.21.12.3.24c.09.12.09.24.09.24s-.015 1.05-.015 1.545c0 .495.09.75.24.84.15.09.36.09.36.09h.84c.15 0 .24.09.24.24 0 .15-.09.24-.24.24z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/biorise_samara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-primary hover:text-olive-light transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
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
