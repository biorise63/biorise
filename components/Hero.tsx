'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useBookingModal } from './BookingModalProvider'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: 'Официальные препараты с регистрацией Минздрава РФ',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6M9 9h6M9 13h4M6 3h12a1 1 0 011 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 011-1z" />
      </svg>
    ),
    text: 'Чек-апы, анализы',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 11l9-7 9 7M5 10.5V20h14v-9.5M9 20v-6h6v6" />
      </svg>
    ),
    text: 'Выезд медсестры на дом по Самаре',
  },
]

export default function Hero() {
  const { openBookingModal } = useBookingModal()
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const quickLinks = [
    {
      href: '/kapelnicy/',
      label: 'Капельницы',
    },
    {
      href: '/analizy/',
      label: 'Анализы',
    },
    {
      href: '/chek-apy/',
      label: 'Чек-ап программы',
    },
    {
      href: '/ekg/',
      label: 'ЭКГ',
    },
  ]

  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (shouldReduceMotion) return

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
    }

    if (nav.connection?.saveData) return

    const pickSource = () =>
      window.matchMedia('(max-width: 767px)').matches
        ? '/optimized/video/hero-mobile-480p.mp4'
        : '/optimized/video/hero-desktop-720p.mp4'

    const activate = () => {
      setVideoReady(false)
      setVideoSrc(pickSource())
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(activate, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = setTimeout(activate, 2500)
    return () => clearTimeout(timer)
  }, [shouldReduceMotion])

  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden py-14 sm:py-0">
      <div className="absolute inset-0">
        <Image
          src="/optimized/video/hero-poster.webp"
          alt="Капельницы Самара"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center bottom' }}
        />

        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{
              objectPosition: 'center bottom',
              opacity: videoReady ? 1 : 0,
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-black mb-4 sm:mb-6 font-light leading-tight"
          >
            Капельницы в Самаре
          </h1>

          <div className="mb-5 sm:mb-6">
            <div className="border-y-2 border-black/10 py-3 sm:py-4">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-start sm:gap-0 sm:divide-x-2 sm:divide-olive-primary/30">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex min-h-[44px] min-w-0 items-center justify-center rounded-xl bg-olive-primary/5 px-2 text-center text-[14px] font-medium leading-[1.15] text-olive-text transition-colors duration-200 hover:text-olive-primary hover:bg-olive-primary/10 sm:min-h-0 sm:justify-start sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 sm:text-[16px] sm:leading-normal sm:whitespace-nowrap sm:hover:bg-transparent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <p
            className="text-base sm:text-lg md:text-xl text-black/90 mb-6 sm:mb-8 leading-relaxed"
          >
            BIORISE - клиника капельниц в Самаре, где доступны лабораторные анализы и чек-ап программы. Мы помогаем выявить дефициты, оценить состояние организма и подобрать индивидуальную программу восстановления.
          </p>

          {/* Features with icons */}
          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-olive-primary flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <p className="text-base md:text-lg text-black/90 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openBookingModal}
              className="bg-olive-primary text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 text-center"
            >
              Записаться на капельницу
            </button>
            <a
              href="https://biorise-clinic.ru/kapelnicy/"
              className="bg-white/95 text-olive-primary px-6 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-white transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 text-center border-2 border-olive-primary"
            >
              Подобрать капельницу
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
