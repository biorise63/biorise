'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClipboardList, Droplets, FlaskConical } from 'lucide-react'
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
  const pathname = usePathname()
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const quickLinks = [
    {
      href: '/kapelnicy/',
      label: 'Капельницы',
      icon: Droplets,
      active: pathname === '/',
    },
    {
      href: '/chek-apy/',
      label: 'Чек-ап программы',
      icon: ClipboardList,
      active: false,
    },
    {
      href: '/analizy/',
      label: 'Анализы',
      icon: FlaskConical,
      active: false,
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-black/60 sm:mb-4">
            Клиника BIORISE
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-black mb-4 sm:mb-6 font-light leading-tight"
          >
            Капельницы в Самаре
          </h1>

          <div className="mb-5 sm:mb-6">
            <div className="border-y border-black/10 py-3 sm:py-4">
              <div className="overflow-x-auto">
                <div className="mx-auto flex w-max items-center justify-center px-1 sm:w-full sm:px-0">
                  {quickLinks.map((link, index) => {
                    const Icon = link.icon

                    return (
                      <div key={link.href} className="flex items-center">
                        {index > 0 ? (
                          <span
                            aria-hidden="true"
                            className="mx-2 h-7 w-px shrink-0 bg-black/12 sm:mx-4"
                          />
                        ) : null}
                        <Link
                          href={link.href}
                          aria-current={link.active ? 'page' : undefined}
                          className={[
                            'group inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-3',
                            'shadow-[0_12px_24px_rgba(38,48,34,0.08),inset_0_1px_0_rgba(255,255,255,0.72)]',
                            'hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(38,48,34,0.12),inset_0_1px_0_rgba(255,255,255,0.82)]',
                            link.active
                              ? 'border-olive-primary/25 bg-gradient-to-b from-white to-olive-primary/12 text-olive-primary'
                              : 'border-white/80 bg-gradient-to-b from-white/95 to-beige-background text-olive-primary/85 hover:border-olive-primary/18 hover:bg-white hover:text-olive-primary',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                              link.active
                                ? 'bg-olive-primary/12 text-olive-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                                : 'bg-white/80 text-olive-primary/80 ring-1 ring-black/5 group-hover:bg-olive-primary/10 group-hover:text-olive-primary',
                            ].join(' ')}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="whitespace-nowrap">{link.label}</span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
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
