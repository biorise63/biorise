'use client'

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useBookingModal } from '@/components/BookingModalProvider'
import { getSeoImageAlt } from '@/lib/seo-image-alt'

const cn = (...classes: Array<string | undefined | null | false>) => classes.filter(Boolean).join(' ')

export interface GalleryItem {
  common: string
  binomial?: string
  description?: string
  subtitle?: string
  price?: {
    current: string
    old?: string
  }
  period?: string
  features?: string[]
  prizes?: Array<{ place: string; text: string }>
  buttonText?: string
  buttonHref?: string
  photo: {
    url: string
    text: string
    alt?: string
    pos?: string
    by: string
  }
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[]
  radius?: number
}

function GalleryActionButton({
  item,
  openBookingModal,
}: {
  item: GalleryItem
  openBookingModal: () => void
}) {
  if (!item.buttonHref || item.buttonHref === '#booking' || (!item.buttonHref.startsWith('http') && !item.buttonHref.startsWith('/'))) {
    return (
      <button
        onClick={openBookingModal}
        className="block w-full rounded-full bg-olive-primary px-3 py-2 text-center text-[10px] font-medium text-white transition hover:bg-olive-light md:text-xs md:py-2.5"
      >
        {item.buttonText || 'Записаться'}
      </button>
    )
  }

  return (
    <a
      href={item.buttonHref}
      target={item.buttonHref.startsWith('http') ? '_blank' : undefined}
      rel={item.buttonHref.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block w-full rounded-full bg-olive-primary px-3 py-2 text-center text-[10px] font-medium text-white transition hover:bg-olive-light md:text-xs md:py-2.5"
    >
      {item.buttonText || 'Записаться'}
    </a>
  )
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 460, ...props }, ref) => {
    const [rotation, setRotation] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const manualAnimationRef = useRef<number | null>(null)
    const isManualAnimatingRef = useRef(false)
    const touchStartXRef = useRef<number | null>(null)
    const { openBookingModal } = useBookingModal()

    useEffect(() => {
      return () => {
        if (manualAnimationRef.current) cancelAnimationFrame(manualAnimationRef.current)
      }
    }, [])

    useEffect(() => {
      if (typeof window === 'undefined') return

      const mediaQuery = window.matchMedia('(max-width: 767px)')
      const update = () => setIsMobile(mediaQuery.matches)

      update()
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }, [])

    if (!items.length) return null

    const anglePerItem = 360 / items.length
    const showPrevious = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
    const showNext = () => setActiveIndex((prev) => (prev + 1) % items.length)

    const animateRotationTo = (target: number) => {
      if (manualAnimationRef.current) cancelAnimationFrame(manualAnimationRef.current)
      isManualAnimatingRef.current = true

      const start = rotation
      const delta = target - start
      const duration = 450
      const startTime = performance.now()

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = easeInOutCubic(progress)
        setRotation(start + delta * eased)
        if (progress < 1) {
          manualAnimationRef.current = requestAnimationFrame(tick)
        } else {
          isManualAnimatingRef.current = false
          manualAnimationRef.current = null
        }
      }

      manualAnimationRef.current = requestAnimationFrame(tick)
    }

    const rotateLeft = () => animateRotationTo(rotation + anglePerItem)
    const rotateRight = () => animateRotationTo(rotation - anglePerItem)

    if (isMobile) {
      const activeItem = items[activeIndex]
      const mobileFeatureCount = activeItem.features?.length ?? 0
      const isMobileDenseCard = mobileFeatureCount > 6

      return (
        <div
          ref={ref}
          role="region"
          aria-label="Галерея акций BIORISE"
          className={cn('relative flex h-full w-full flex-col justify-center px-3 py-4', className)}
          {...props}
        >
          <div className="relative mx-auto w-full max-w-[330px]">
            <button
              type="button"
              aria-label="Предыдущая акция"
              onClick={showPrevious}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-olive-primary/25 bg-white/90 p-2.5 text-olive-primary shadow-premium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Следующая акция"
              onClick={showNext}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-olive-primary/25 bg-white/90 p-2.5 text-olive-primary shadow-premium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div
              role="group"
              aria-label={activeItem.common}
              className={cn(
                'group relative mx-auto w-full overflow-hidden rounded-[24px] border border-olive-primary/20 bg-white/80 shadow-premium',
                isMobileDenseCard ? 'h-[560px]' : 'h-[430px]'
              )}
              onTouchStart={(event) => {
                touchStartXRef.current = event.touches[0]?.clientX ?? null
              }}
              onTouchEnd={(event) => {
                const startX = touchStartXRef.current
                const endX = event.changedTouches[0]?.clientX ?? null

                if (startX === null || endX === null) return

                const deltaX = endX - startX
                if (Math.abs(deltaX) < 40) return

                if (deltaX > 0) {
                  showPrevious()
                } else {
                  showNext()
                }

                touchStartXRef.current = null
              }}
            >
              <img
                src={activeItem.photo.url}
                alt={activeItem.photo.alt || getSeoImageAlt(activeItem.common)}
                loading="lazy"
                decoding="async"
                fetchPriority={activeIndex === 0 ? 'high' : 'low'}
                className="absolute inset-0 h-full w-full object-cover brightness-75"
                style={{ objectPosition: activeItem.photo.pos || 'center' }}
              />
              <div className={cn(
                'absolute inset-0 flex flex-col justify-between bg-olive-primary/52 p-4 text-white font-heading',
                isMobileDenseCard && 'p-3.5'
              )}>
                <div className={cn('space-y-2', isMobileDenseCard && 'space-y-1.5')}>
                  <div>
                    <h3 className="text-base font-semibold leading-tight">{activeItem.common}</h3>
                    {activeItem.subtitle && (
                      <p className="mt-1 text-xs leading-tight opacity-90">{activeItem.subtitle}</p>
                    )}
                  </div>

                  {activeItem.description && (
                    <p className={cn('text-xs leading-relaxed opacity-95', isMobileDenseCard && 'text-[11px] leading-[1.3]')}>
                      {activeItem.description}
                    </p>
                  )}

                  {activeItem.features && activeItem.features.length > 0 && (
                    <div className={cn('space-y-1.5', isMobileDenseCard && 'space-y-1')}>
                      {activeItem.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-olive-primary">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className={cn('text-xs leading-tight opacity-95', isMobileDenseCard && 'text-[10.5px] leading-[1.2]')}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                <div className="space-y-3 pt-2">
                  {(activeItem.price || activeItem.period) && (
                    <div className="space-y-2 rounded-2xl bg-black/18 px-3 py-2.5 backdrop-blur-[1px]">
                      {activeItem.price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">{activeItem.price.current}</span>
                          {activeItem.price.old ? (
                            <span className="text-xs line-through opacity-60">{activeItem.price.old}</span>
                          ) : null}
                        </div>
                      ) : null}

                      {activeItem.period ? (
                        <div className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-80">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-xs leading-tight opacity-90">{activeItem.period}</span>
                        </div>
                      ) : null}
                    </div>
                  )}

                  <GalleryActionButton item={activeItem} openBookingModal={openBookingModal} />
                  <div className="flex items-center justify-center gap-2">
                    {items.map((item, index) => (
                      <button
                        key={item.photo.url}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Открыть акцию ${index + 1}`}
                        className={cn(
                          'h-2.5 rounded-full transition-all',
                          index === activeIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/45'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Галерея акций BIORISE"
        className={cn('relative flex h-full w-full items-center justify-center', className)}
        style={{ perspective: '2000px', touchAction: 'pan-y' }}
        {...props}
      >
        <button
          type="button"
          aria-label="Прокрутить акции влево"
          onClick={rotateLeft}
          className="absolute left-3 z-20 rounded-full border border-olive-primary/30 bg-white/85 p-3 text-olive-primary shadow-premium transition hover:bg-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Прокрутить акции вправо"
          onClick={rotateRight}
          className="absolute right-3 z-20 rounded-full border border-olive-primary/30 bg-white/85 p-3 text-olive-primary shadow-premium transition hover:bg-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem
            const totalRotation = rotation % 360
            const relativeAngle = (itemAngle + totalRotation + 360) % 360
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
            const opacity = Math.max(0.35, 1 - normalizedAngle / 180)

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className={cn(
                  'absolute left-1/2 top-1/2 h-[300px] w-[220px] md:w-[290px]',
                  (item.features?.length ?? 0) > 6 ? 'md:h-[500px]' : 'md:h-[390px]'
                )}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: 'opacity 0.3s linear',
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-olive-primary/20 bg-white/70 shadow-premium backdrop-blur-sm">
                  <img
                    src={item.photo.url}
                    alt={item.photo.alt || getSeoImageAlt(item.common)}
                    loading="lazy"
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className={cn(
                    'absolute inset-0 flex flex-col justify-between bg-olive-primary/50 p-3 text-white font-heading md:p-4',
                    (item.features?.length ?? 0) > 6 && 'md:p-3.5'
                  )}>
                    <div className={cn(
                      'space-y-1.5 md:space-y-2',
                      (item.features?.length ?? 0) > 6 && 'md:space-y-1.5'
                    )}>
                      <div>
                        <h3 className="text-sm md:text-base font-semibold leading-tight mb-0.5">{item.common}</h3>
                        {item.subtitle && (
                          <p className="text-[10px] md:text-xs opacity-90 leading-tight">{item.subtitle}</p>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className={cn(
                          'text-[10px] leading-tight opacity-95 md:text-xs',
                          (item.features?.length ?? 0) > 6 && 'md:text-[11px] md:leading-[1.25]'
                        )}>
                          {item.description}
                        </p>
                      )}

                      {item.features && item.features.length > 0 && (
                        <div className={cn(
                          'space-y-1',
                          (item.features?.length ?? 0) > 6 && 'md:space-y-0.5'
                        )}>
                          {item.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-olive-primary">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className={cn(
                                'text-[10px] leading-tight opacity-95 md:text-xs',
                                (item.features?.length ?? 0) > 6 && 'md:text-[10.5px] md:leading-[1.15]'
                              )}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.prizes && item.prizes.length > 0 && (
                        <div className="space-y-1">
                          {item.prizes.map((prize, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-olive-primary">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                              <span className="text-[10px] md:text-xs opacity-95 leading-tight">
                                <span className="font-medium">{prize.place}</span> — {prize.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.price && (
                        <div className="pt-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base md:text-lg font-bold">{item.price.current}</span>
                            {item.price.old && (
                              <span className="text-[10px] md:text-xs line-through opacity-60">{item.price.old}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {item.period && (
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-80">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-[10px] md:text-xs opacity-90 leading-tight">{item.period}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <GalleryActionButton item={item} openBookingModal={openBookingModal} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

CircularGallery.displayName = 'CircularGallery'

export { CircularGallery }
