 'use client'

import { useState } from 'react'
import InfusionCard, { InfusionCardProps } from './InfusionCard'
import { getIcon } from './icon-map'

type CategorySectionProps = {
  id: string
  title: string
  items: InfusionCardProps[]
  icon?: string
  onBook?: () => void
}

export default function CategorySection({ id, title, items, icon, onBook }: CategorySectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (cardId: string) => {
    setOpenId((prev) => (prev === cardId ? null : cardId))
  }

  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-olive-primary flex items-center gap-2">
        {icon && <span className="kapelnicy-category-icon">{getIcon(icon)}</span>}
        <span>{title}</span>
      </h2>
      <div className="cards-grid">
        {items.map((item) => (
          <InfusionCard
            key={item.id}
            {...item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
            onBook={onBook}
          />
        ))}
      </div>
    </section>
  )
}

