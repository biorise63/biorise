'use client'

import { useState } from 'react'
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

interface SidebarMenuProps {
  categories: MenuCategory[]
}

export default function SidebarMenu({ categories }: SidebarMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  return (
    <aside className="kapelnicy-sidebar self-start">
      {/* Mobile toggle */}
      <button
        className="md:hidden w-full mb-4 px-4 py-3 rounded-xl border border-olive-primary/20 bg-white shadow-sm text-left flex justify-between items-center"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <span className="font-semibold text-olive-primary">Категории</span>
        <svg
          className={`w-5 h-5 text-olive-primary transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`kapelnicy-sidebar-shell bg-white rounded-2xl border border-olive-primary/10 shadow-premium ${
          mobileOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <div
          className="kapelnicy-sidebar-scroll p-4 space-y-4"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-olive-primary uppercase tracking-wide">
                {cat.icon && <span className="kapelnicy-category-icon">{getIcon(cat.icon)}</span>}
                <span>{cat.title}</span>
              </div>
              <div className="flex flex-col gap-1">
                {cat.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="text-left text-olive-primary/80 hover:text-olive-primary bg-olive-primary/0 hover:bg-olive-primary/5 rounded-lg px-2 py-2 transition-all"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

