 'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type InfusionCardProps = {
  id: string
  slug?: string
  title: string
  description: string
  price?: string
  duration?: string
  imageUrl?: string
  details?: string
  indications?: string[]
  effect?: string[]
  contraindications?: string[]
  composition?: string[]
  isOpen?: boolean
  onToggle?: () => void
  onBook?: () => void
}

const tabsOrder = [
  { key: 'indications', label: 'Показания', icon: 'heart' },
  { key: 'effect', label: 'Эффект', icon: 'sparkle' },
  { key: 'contraindications', label: 'Противопоказания', icon: 'warn' },
  { key: 'composition', label: 'Состав', icon: 'lab' },
] as const

const icons: Record<string, JSX.Element> = {
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-6.5-4.35-9-8.5C1.2 10 1.6 6.3 4.5 4.8 7.4 3.3 10 5.2 12 7.2c2-2 4.6-3.9 7.5-2.4 2.9 1.5 3.3 5.2 1.5 7.7-2.5 4.15-9 8.5-9 8.5Z" />
    </svg>
  ),
  sparkle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 1.7 4.6L18 9.3l-4 3.4 1.2 5.3L12 15.7l-3.2 2.3L10 12.7 6 9.3l4.3-1.7L12 3Z" />
    </svg>
  ),
  warn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="m10.29 3.86-8.37 14.5A1 1 0 0 0 2.76 20h18.48a1 1 0 0 0 .84-1.64l-8.37-14.5a1 1 0 0 0-1.68 0Z" />
    </svg>
  ),
  lab: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h12" />
      <path d="M9 3v4.5" />
      <path d="M15 3v4.5" />
      <path d="M5 21h14l-2-12H7l-2 12Z" />
      <path d="M10 12h4" />
    </svg>
  ),
}

export default function InfusionCard({
  id,
  slug,
  title,
  description,
  price,
  duration,
  imageUrl,
  details,
  indications,
  effect,
  contraindications,
  composition,
  isOpen = false,
  onToggle,
  onBook,
}: InfusionCardProps) {
  const [activeTab, setActiveTab] = useState<'indications' | 'effect' | 'contraindications' | 'composition'>('indications')

  const moreText = details || description
  const detailHref = slug ? `/kapelnicy/${slug}/` : undefined

  const tabContent: Record<string, string[] | undefined> = {
    indications,
    effect,
    contraindications,
    composition,
  }

  const availableTabs = tabsOrder.filter((t) => tabContent[t.key]?.length)

  return (
    <div
      id={id}
      className={`infusion-card group bg-white rounded-2xl border border-olive-primary/10 shadow-premium overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isOpen ? 'open' : ''
      }`}
    >
      <div className="infusion-card-image relative w-full bg-beige-background">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-olive-primary/50 text-sm">Нет фото</div>
        )}
      </div>
      <div className="infusion-card-body p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-semibold text-olive-primary leading-tight">{title}</h3>
        <p className="infusion-card-desc text-olive-primary/80 text-sm leading-relaxed">{description}</p>

        {(price || duration) && (
          <div className="infusion-card-meta flex items-center gap-4 flex-wrap text-sm text-olive-primary/80">
            {price && (
              <span className="infusion-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M19 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                  <path d="M7 11h10" />
                  <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                </svg>
                <span className="font-medium">{price}</span>
              </span>
            )}
            {duration && (
              <span className="infusion-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 6v6l3 3" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="font-medium">{duration}</span>
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onBook) {
                onBook()
              } else if (typeof window !== 'undefined') {
                window.location.href = '/kapelnicy/form'
              }
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-olive-primary text-white text-sm font-medium hover:bg-olive-light transition-colors"
          >
            Записаться
          </button>
          {moreText && detailHref && (
            <Link
              href={detailHref}
              className="btn-more inline-flex items-center gap-1 text-olive-primary font-medium text-sm transition-all duration-300"
            >
              Подробнее
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
          {moreText && !detailHref && (
            <button
              type="button"
              onClick={onToggle}
              className="btn-more inline-flex items-center gap-1 text-olive-primary font-medium text-sm transition-all duration-300"
            >
              Подробнее
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          )}
        </div>
        {availableTabs.length > 0 && (
          <div
            className={`infusion-card-details text-sm text-olive-primary/80 leading-relaxed transition-all duration-400 ${
              isOpen ? 'max-h-[900px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
            }`}
            aria-hidden={!isOpen}
          >
            <div className="infusion-tabs">
              <div className="tabs-header">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span className="tab-icon">{icons[tab.icon]}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="tabs-content">
                {availableTabs.map((tab) => (
                  <div key={tab.key} className={`tab-panel ${activeTab === tab.key ? 'active' : ''}`}>
                    <ul className="infusion-list">
                      {(tabContent[tab.key] || [])
                        .map((item) => item.replace(/^\d+\s*[.)]?\s*/, '').trim())
                        .filter(Boolean)
                        .map((cleaned, idx) => {
                          const isEffect = tab.key === 'effect'
                          const isComposition = tab.key === 'composition'

                          return (
                            <li key={idx}>
                              {isEffect ? (
                                <span className="infusion-number">{idx + 1}</span>
                              ) : isComposition ? (
                                <span className="infusion-icon-bullet">{icons.lab}</span>
                              ) : (
                                <span className="infusion-bullet-dot" />
                              )}
                              <span>{cleaned}</span>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
