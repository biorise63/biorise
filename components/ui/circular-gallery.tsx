'use client'

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

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
    pos?: string
    by: string
  }
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[]
  radius?: number
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 460, ...props }, ref) => {
    const [rotation, setRotation] = useState(0)
    const manualAnimationRef = useRef<number | null>(null)
    const isManualAnimatingRef = useRef(false)

    useEffect(() => {
      return () => {
        if (manualAnimationRef.current) cancelAnimationFrame(manualAnimationRef.current)
      }
    }, [])

    if (!items.length) return null

    const anglePerItem = 360 / items.length
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
                className="absolute left-1/2 top-1/2 h-[300px] w-[220px] md:h-[390px] md:w-[290px]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: 'opacity 0.3s linear',
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-olive-primary/20 bg-white/70 shadow-premium backdrop-blur-sm">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-black/65 p-4 md:p-5 text-white overflow-y-auto">
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold leading-tight mb-1">{item.common}</h3>
                        {item.subtitle && (
                          <p className="text-xs md:text-sm opacity-90 leading-snug">{item.subtitle}</p>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-xs md:text-sm leading-relaxed opacity-95">
                          {item.description}
                        </p>
                      )}

                      {item.features && item.features.length > 0 && (
                        <div className="space-y-1.5">
                          {item.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-olive-primary">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="text-xs md:text-sm opacity-95">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.prizes && item.prizes.length > 0 && (
                        <div className="space-y-1.5">
                          {item.prizes.map((prize, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-olive-primary">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                              <span className="text-xs md:text-sm opacity-95">
                                <span className="font-medium">{prize.place}</span> — {prize.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.price && (
                        <div className="pt-1 space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg md:text-xl font-bold">{item.price.current}</span>
                            {item.price.old && (
                              <span className="text-xs md:text-sm line-through opacity-60">{item.price.old}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {item.period && (
                        <div className="flex items-center gap-2 pt-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-80">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-xs md:text-sm opacity-90">{item.period}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3">
                      <a
                        href={item.buttonHref || '#booking'}
                        target={(item.buttonHref || '').startsWith('http') ? '_blank' : undefined}
                        rel={(item.buttonHref || '').startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block w-full rounded-full bg-olive-primary px-4 py-2.5 text-center text-xs font-medium text-white transition hover:bg-olive-light md:text-sm"
                      >
                        {item.buttonText || 'Записаться'}
                      </a>
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
