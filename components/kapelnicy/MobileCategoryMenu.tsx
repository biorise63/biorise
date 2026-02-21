'use client'

import { useState, useRef, useEffect } from 'react'
import { getIcon } from './icon-map'

type MenuItem = {
  id: string
  title: string
}

type MenuCategory = {
  id: string
  title: string
  items: MenuItem[]
  icon?: string
}

interface MobileCategoryMenuProps {
  categories: MenuCategory[]
}

export default function MobileCategoryMenu({ categories }: MobileCategoryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveCategory(null)
  }

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeCategory && scrollContainerRef.current && !scrollContainerRef.current.contains(event.target as Node)) {
        setActiveCategory(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeCategory])

  return (
    <div className="mobile-category-menu md:hidden" ref={scrollContainerRef}>
      {/* Горизонтальный свайп-слайдер с иконками */}
      <div className="mobile-category-slider">
        <div className="mobile-category-icons">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`mobile-category-icon-btn ${activeCategory === cat.id ? 'active' : ''}`}
              aria-label={cat.title}
            >
              {cat.icon && <span className="mobile-category-icon">{getIcon(cat.icon)}</span>}
              <span className="mobile-category-title">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Раскрывающееся подменю */}
      {activeCategory && (
        <div className="mobile-category-dropdown">
          {categories
            .find((cat) => cat.id === activeCategory)
            ?.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="mobile-category-item"
              >
                {item.title}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
