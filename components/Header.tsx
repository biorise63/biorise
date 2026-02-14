'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

interface ClinicAddress {
  id: string
  address: string
  hours: string
  phone: string
}

const clinics: ClinicAddress[] = [
  {
    id: '1',
    address: '443068, Самара, ул. 27, д. 1',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
  {
    id: '2',
    address: '443068, Самара, ул. Примерная, д. 2',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
  {
    id: '3',
    address: '443068, Самара, пр-т Ленина, д. 10',
    hours: 'Ежедневно: 8:00 - 20:00',
    phone: '+7 996 749 9747',
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState<ClinicAddress | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              {/* City */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white font-menu font-medium">Самара</span>
              </div>

              {/* Clinic Address Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-menu"
                >
                  <span className="text-sm text-white/80">Адреса клиник:</span>
                  <span className="text-white font-medium">
                    {selectedClinic ? selectedClinic.address : 'Выбрать адрес'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-premium border border-olive-primary/10 min-w-[300px] z-50">
                    {clinics.map((clinic) => (
                      <button
                        key={clinic.id}
                        onClick={() => handleClinicSelect(clinic)}
                        className="w-full text-left px-4 py-3 hover:bg-beige-background transition-colors border-b border-olive-primary/5 last:border-b-0"
                      >
                        <div className="text-olive-primary font-medium">{clinic.address}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Clinic Info */}
              {selectedClinic && (
                <div className="flex items-center gap-6 flex-wrap">
                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-white/80">{selectedClinic.hours}</span>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${selectedClinic.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-semibold cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{selectedClinic.phone}</span>
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8 font-menu">
              <a href="#services" className="text-olive-primary hover:text-olive-light transition-colors">
                Капельницы
              </a>
              <a href="#why-us" className="text-olive-primary hover:text-olive-light transition-colors">
                О нас
              </a>
              <a href="#gallery" className="text-olive-primary hover:text-olive-light transition-colors">
                Акции
              </a>
              <a href="#doctors" className="text-olive-primary hover:text-olive-light transition-colors">
                Врачи
              </a>
              <a
                href="#booking"
                className="bg-olive-primary text-white px-6 py-2 rounded-full hover:bg-olive-light transition-all shadow-premium"
              >
                Записаться
              </a>
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  )
}
