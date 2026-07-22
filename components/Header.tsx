'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    hours: 'Будни: 8:00 - 19:00, сб: 8:00 - 15:00, вс: выходной',
    phone: '+7 996 749 9747',
  },
  {
    id: '2',
    address: 'г. Самара ул. Стара Загора 48',
    hours: 'Будни: 8:00 - 19:00, сб: 8:00 - 15:00, вс: выходной',
    phone: '+7 901 940 7027',
  },
  {
    id: '3',
    address: 'г. Самара ул. Молодежная 18',
    hours: 'Будни: 8:00 - 19:00, сб: 8:00 - 15:00, вс: выходной',
    phone: '+7 996 749 9747',
  },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState<ClinicAddress | null>(clinics[0] ?? null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const scrollPositionRef = useRef(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { openBookingModal } = useBookingModal()
  const isHomePage = pathname === '/'
  const isKapelnicyPage = pathname === '/kapelnicy' || pathname.startsWith('/kapelnicy/')
  const useRelativeMobileHeader = isHomePage || isKapelnicyPage

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

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen || typeof window === 'undefined') return

    scrollPositionRef.current = window.scrollY
    setIsDropdownOpen(false)
    setIsServicesOpen(false)

    document.body.classList.add('menu-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollPositionRef.current)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMobileMenu()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [closeMobileMenu])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const mobileLinkClass =
    'flex min-h-11 items-center rounded-xl px-3 py-2 text-base text-olive-primary transition-colors hover:bg-white/60'

  return (
    <>
      {/* Top Bar with Location and Clinic Selection - Fixed, separate from Hero */}
      <div
        className={`left-0 right-0 z-[110] border-b border-olive-primary/10 backdrop-blur-sm ${
          useRelativeMobileHeader ? 'relative sm:fixed sm:top-0' : 'fixed top-0'
        }`}
        style={{ backgroundColor: 'rgba(94, 111, 82, 0.5)' }}
      >
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

      {/* Opening Announcement */}
      <div
        className={`left-0 right-0 z-[105] border-b border-olive-primary/10 bg-[#f4efe6]/95 backdrop-blur-sm ${
          useRelativeMobileHeader ? 'relative sm:fixed sm:top-10' : 'fixed top-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex min-h-8 flex-wrap items-center justify-center gap-1.5 py-1.5 text-center text-[10px] font-medium leading-tight text-olive-primary sm:min-h-10 sm:gap-2 sm:py-2 sm:text-sm">
            <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#b48a3c] shadow-sm sm:inline-flex">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v3M12 17v3M4 12h3M17 12h3M6.34 6.34l2.12 2.12M15.54 15.54l2.12 2.12M17.66 6.34l-2.12 2.12M8.46 15.54l-2.12 2.12" />
                <circle cx="12" cy="12" r="2.5" strokeWidth={2} />
              </svg>
            </span>
            <span>
              <span className="sm:hidden">
                <strong className="font-semibold">25 июля</strong> — открытие клиники на Молодежной, 18
              </span>
              <span className="hidden sm:inline">
                <strong className="font-semibold">25 июля</strong> — открытие новой клиники «Биорайз» ул. Молодежная, 18.
              </span>
            </span>
            <a
              href="https://vk.ru/biorise63"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-olive-primary shadow-sm transition hover:bg-white sm:px-2.5 sm:text-xs"
              aria-label="Акции в честь открытия во ВКонтакте"
            >
              <svg className="h-4 w-4 text-[#0077FF]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.893 16.07h-1.32c-.493 0-.646-.399-1.54-1.3-.78-.77-1.125-.87-1.32-.87-.267 0-.344.077-.344.45v1.54c0 .32-.103.492-.95.492-1.4 0-2.958-1.507-4.224-4.312-1.709-3.556-2.026-4.95-2.026-5.212 0-.23.09-.45.84-.45h1.32c.38 0 .52.18.664.58.72 2.1 1.93 4.073 2.394 4.073.19 0 .28-.09.28-.57V8.45c-.06-1.01-.6-1.1-.6-1.46 0-.17.14-.34.35-.34h2.07c.44 0 .6.19.6.6v3.58c0 .34.15.46.24.46.19 0 .35-.12.69-.46.97-1.08 1.67-2.77 1.67-2.77.12-.28.33-.43.62-.43h1.32c.44 0 .53.22.44.52-.18.81-1.94 3.33-1.94 3.33-.16.26-.23.39 0 .65.17.2.72.7 1.07 1.13.66.75 1.16 1.38 1.29 1.81.14.43-.09.65-.55.65Z" />
              </svg>
              <span className="sm:hidden">Акции VK</span>
              <span className="hidden sm:inline">Акции в честь открытия</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={`left-0 right-0 z-[100] transition-all duration-300 ${
          useRelativeMobileHeader ? 'relative sm:fixed sm:top-[80px]' : 'fixed top-[98px] sm:top-[80px]'
        } ${
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
                      href="/kapelnicy/na-domu"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Капельницы на дому
                    </Link>
                    <Link
                      href="/bady"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      БАДЫ
                    </Link>
                    <Link
                      href="/apparatnyy-massazh"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Аппаратный массаж
                    </Link>
                    <Link
                      href="/ruchnoy-massazh"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Ручной массаж
                    </Link>
                    <Link
                      href="/lazernaya-epilyatsiya"
                      className="block px-4 py-2 text-sm text-olive-primary hover:bg-beige-background rounded-lg transition-colors"
                    >
                      Лазерная эпиляция
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
                      Анализы и ЧЕК-АПЫ
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
              <Link href="/articles" className="text-olive-primary hover:text-olive-light transition-colors text-sm lg:text-base">
                Статьи
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
                href="https://max.ru/join/I8dvtxIVQ_gEOELaXkiwDZPefgBrLT6ojztVLP17oiQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#4C6FFF] transition-colors"
                aria-label="Мессенджер MAX"
              >
                <svg className="w-6 h-6" viewBox="0 0 720 720" aria-hidden="true" fill="currentColor">
                  <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
                </svg>
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            {!useRelativeMobileHeader && (
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-olive-primary"
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
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
            )}
          </div>
        </div>
      </motion.header>

      {useRelativeMobileHeader && !isMobileMenuOpen && (
        <button
          onClick={toggleMobileMenu}
          className="fixed right-4 z-[210] inline-flex h-12 w-12 items-center justify-center rounded-full border border-olive-primary/10 bg-[#f4efe6] text-olive-primary shadow-premium backdrop-blur-sm md:hidden"
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          style={{ top: 'calc(env(safe-area-inset-top, 0px) + 132px)' }}
        >
          <svg
            className="h-6 w-6"
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
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] opacity-100 transition-opacity duration-300 md:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            className="absolute inset-0 bg-black/28 backdrop-blur-[2px]"
            onClick={closeMobileMenu}
          />

          <nav
            className="absolute inset-0 flex h-[100dvh] w-full translate-y-0 flex-col overflow-hidden bg-[#f4efe6] text-olive-primary transition-transform duration-300"
            aria-label="Мобильное меню"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 88px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
            }}
          >
            <div className="flex items-center justify-between px-4 pb-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/55">Меню</p>
                <p className="mt-1 text-lg font-medium text-olive-primary">BIORISE</p>
              </div>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-olive-primary/10 bg-white/70 px-3 text-olive-primary"
                aria-label="Закрыть меню"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 sm:px-6">
              <div className="flex flex-col space-y-3 font-menu">
                <Link href="/" onClick={closeMobileMenu} className={mobileLinkClass}>
                  Главная
                </Link>

                <div className="rounded-2xl border border-olive-primary/10 bg-white/45 p-2">
                  <span className="px-3 pb-2 pt-1 text-sm font-semibold text-olive-primary">Услуги</span>
                  <div className="mt-1 flex flex-col gap-1">
                    <Link href="/kapelnicy" onClick={closeMobileMenu} className={mobileLinkClass}>Капельницы</Link>
                    <Link href="/kapelnicy/na-domu" onClick={closeMobileMenu} className={mobileLinkClass}>Капельницы на дому</Link>
                    <Link href="/bioimpedance" onClick={closeMobileMenu} className={mobileLinkClass}>Биоимпедансный анализ</Link>
                    <Link href="/bady" onClick={closeMobileMenu} className={mobileLinkClass}>БАДЫ</Link>
                    <Link href="/apparatnyy-massazh" onClick={closeMobileMenu} className={mobileLinkClass}>Аппаратный массаж</Link>
                    <Link href="/ruchnoy-massazh" onClick={closeMobileMenu} className={mobileLinkClass}>Ручной массаж</Link>
                    <Link href="/lazernaya-epilyatsiya" onClick={closeMobileMenu} className={mobileLinkClass}>Лазерная эпиляция</Link>
                    <Link href="/spravki" onClick={closeMobileMenu} className={mobileLinkClass}>Справки</Link>
                    <Link href="/analizy" onClick={closeMobileMenu} className={mobileLinkClass}>Анализы и ЧЕК-АПЫ</Link>
                  </div>
                </div>

                <Link href="/#why-us" onClick={closeMobileMenu} className={mobileLinkClass}>О нас</Link>
                <Link href="/#gallery" onClick={closeMobileMenu} className={mobileLinkClass}>Акции</Link>
                <Link href="/articles" onClick={closeMobileMenu} className={mobileLinkClass}>Статьи</Link>
                <Link href="/#doctors" onClick={closeMobileMenu} className={mobileLinkClass}>Врачи</Link>

                <button
                  onClick={() => {
                    closeMobileMenu()
                    openBookingModal()
                  }}
                  className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-center text-base text-white transition-colors hover:bg-olive-light"
                >
                  Записаться
                </button>

                <div className="mt-4 border-t border-olive-primary/10 pt-4">
                  <div className="flex items-center gap-4">
                    <a href="https://t.me/biorise_smr" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/60 text-gray-600 transition-colors hover:text-[#0088cc]" aria-label="Telegram">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.665 3.447 17.03 19.139c-.26 1.176-.944 1.466-1.911.912l-5.278-3.897-2.548 2.453c-.283.283-.52.52-1.07.52l.383-5.436 9.9-8.94c.43-.382-.093-.594-.67-.212L5.58 11.82.314 10.17c-1.15-.36-1.176-1.15.24-1.7L19.067 2.04c.944-.34 1.77.212 1.599 1.407Z" /></svg>
                    </a>
                    <a href="https://vk.ru/biorise63" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/60 text-gray-600 transition-colors hover:text-[#0077FF]" aria-label="ВКонтакте">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.893 16.07h-1.32c-.493 0-.646-.399-1.54-1.3-.78-.77-1.125-.87-1.32-.87-.267 0-.344.077-.344.45v1.54c0 .32-.103.492-.95.492-1.4 0-2.958-1.507-4.224-4.312-1.709-3.556-2.026-4.95-2.026-5.212 0-.23.09-.45.84-.45h1.32c.38 0 .52.18.664.58.72 2.1 1.93 4.073 2.394 4.073.19 0 .28-.09.28-.57V8.45c-.06-1.01-.6-1.1-.6-1.46 0-.17.14-.34.35-.34h2.07c.44 0 .6.19.6.6v3.58c0 .34.15.46.24.46.19 0 .35-.12.69-.46.97-1.08 1.67-2.77 1.67-2.77.12-.28.33-.43.62-.43h1.32c.44 0 .53.22.44.52-.18.81-1.94 3.33-1.94 3.33-.16.26-.23.39 0 .65.17.2.72.7 1.07 1.13.66.75 1.16 1.38 1.29 1.81.14.43-.09.65-.55.65Z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/biorise_samara" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/60 text-gray-600 transition-colors hover:text-[#E4405F]" aria-label="Instagram">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0Zm12 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>
                    </a>
                    <a href="https://max.ru/join/I8dvtxIVQ_gEOELaXkiwDZPefgBrLT6ojztVLP17oiQ" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/60 text-gray-600 transition-colors hover:text-[#4C6FFF]" aria-label="Мессенджер MAX">
                      <svg className="h-6 w-6" viewBox="0 0 720 720" aria-hidden="true" fill="currentColor"><path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
