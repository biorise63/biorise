'use client'

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

const cn = (...classes: Array<string | undefined | null | false>) => classes.filter(Boolean).join(' ')

export interface GalleryItem {
  common: string
  binomial: string
  description?: string
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
  autoRotateSpeed?: number
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 460, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
        setRotation(scrollProgress * 360)

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      }
    }, [])

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation((prev) => prev + autoRotateSpeed)
        animationFrameRef.current = requestAnimationFrame(autoRotate)
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate)
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      }
    }, [isScrolling, autoRotateSpeed])

    if (!items.length) return null

    const anglePerItem = 360 / items.length
    const rotateLeft = () => setRotation((prev) => prev + anglePerItem)
    const rotateRight = () => setRotation((prev) => prev - anglePerItem)

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Галерея акций BIORISE"
        className={cn('relative flex h-full w-full items-center justify-center', className)}
        style={{ perspective: '2000px' }}
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
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-black/50 p-4 text-white">
                    <div>
                      <h3 className="text-base font-semibold md:text-xl">{item.common}</h3>
                      <p className="text-xs italic opacity-90 md:text-sm">{item.binomial}</p>
                    </div>
                    <div className="space-y-3">
                      {item.description && (
                        <p className="text-xs leading-relaxed opacity-95 md:text-sm">
                          {item.description}
                        </p>
                      )}
                      <a
                        href={item.buttonHref || '#booking'}
                        target={(item.buttonHref || '').startsWith('http') ? '_blank' : undefined}
                        rel={(item.buttonHref || '').startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-block rounded-full bg-olive-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-olive-light md:text-sm"
                      >
                        {item.buttonText || 'Участвовать'}
                      </a>
                      <p className="text-[10px] opacity-80 md:text-xs">{item.photo.by}</p>
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
