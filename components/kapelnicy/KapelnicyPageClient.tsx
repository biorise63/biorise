'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfusionPageLayout from '@/components/kapelnicy/InfusionPageLayout'
import CategorySection from '@/components/kapelnicy/CategorySection'
import OffCanvasMenu from '@/components/kapelnicy/OffCanvasMenu'
import DownloadPdfButton from '@/components/kapelnicy/DownloadPdfButton'
import CatalogButton from '@/components/kapelnicy/CatalogButton'
import { useBookingModal } from '@/components/BookingModalProvider'
import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'

type InfusionItem = {
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
}

type MenuCategory = {
  id: string
  title: string
  items: { id: string; title: string }[]
  icon?: string
}

interface KapelnicyPageClientProps {
  categories: Array<{
    id: string
    title: string
    items: InfusionItem[]
    icon?: string
  }>
  menu: MenuCategory[]
}

export default function KapelnicyPageClient({ categories, menu }: KapelnicyPageClientProps) {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const { openBookingModal } = useBookingModal()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focus = params.get('focus')
    if (!focus) return

    const timer = window.setTimeout(() => {
      const target = document.getElementById(focus)
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      window.history.replaceState(null, '', '/kapelnicy/')
    }, 250)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      <CatalogButton onClick={() => setIsOffCanvasOpen(true)} />
      <OffCanvasMenu isOpen={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)} categories={menu} />
      <InfusionPageLayout sidebarCategories={menu}>
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <CategorySection key={cat.id} id={cat.id} title={cat.title} items={cat.items} icon={cat.icon} onBook={openBookingModal} />
          ))}
        </div>
      </InfusionPageLayout>
      <Footer />
      <DownloadPdfButton />
      <ExitIntentOffersPopup />
    </>
  )
}
