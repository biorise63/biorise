'use client'

import { useState, useEffect } from 'react'
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

interface OffCanvasMenuProps {
  isOpen: boolean
  onClose: () => void
  categories: MenuCategory[]
}

export default function OffCanvasMenu({ isOpen, onClose, categories }: OffCanvasMenuProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  const handleScroll = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="off-canvas-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className="off-canvas-sidebar">
        {/* Header with close button */}
        <div className="off-canvas-header">
          <h2 className="off-canvas-title">Категории капельниц</h2>
          <button
            onClick={onClose}
            className="off-canvas-close"
            aria-label="Закрыть меню"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Accordion Menu */}
        <div className="off-canvas-content">
          {categories.map((cat) => {
            const isOpen = openCategories.has(cat.id)
            return (
              <div key={cat.id} className="off-canvas-category">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="off-canvas-category-btn"
                >
                  <div className="off-canvas-category-title">
                    {cat.icon && <span className="off-canvas-category-icon">{getIcon(cat.icon)}</span>}
                    <span>{cat.title}</span>
                  </div>
                  <svg
                    className={`off-canvas-chevron ${isOpen ? 'open' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`off-canvas-items ${isOpen ? 'open' : ''}`}>
                  {cat.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleScroll(item.id)}
                      className="off-canvas-item"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}
