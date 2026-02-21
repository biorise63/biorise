'use client'

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

const cn = (...classes: Array<string | undefined | null | false>) => classes.filter(Boolean).join(' ')

export interface GalleryItem {
  common: string
  binomial: string
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

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Галерея акций BIORISE"
        className={cn('relative flex h-full w-full items-center justify-center', className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
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
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                    <h3 className="text-base font-semibold md:text-xl">{item.common}</h3>
                    <p className="text-xs italic opacity-90 md:text-sm">{item.binomial}</p>
                    <p className="mt-2 text-[10px] opacity-80 md:text-xs">{item.photo.by}</p>
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
