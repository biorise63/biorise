'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfusionPageLayout from '@/components/kapelnicy/InfusionPageLayout'
import CategorySection from '@/components/kapelnicy/CategorySection'
import OffCanvasMenu from '@/components/kapelnicy/OffCanvasMenu'
import DownloadPdfButton from '@/components/kapelnicy/DownloadPdfButton'
import CatalogButton from '@/components/kapelnicy/CatalogButton'

type InfusionItem = {
  id: string
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
  const [isWidgetReady, setIsWidgetReady] = useState(false)
  const widgetInitRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || widgetInitRef.current) return
    widgetInitRef.current = true

    const hideStyleId = 'clientix-widget-hide-button'
    if (!document.getElementById(hideStyleId)) {
      const styleEl = document.createElement('style')
      styleEl.id = hideStyleId
      styleEl.innerHTML = '#clientixAppointmentButton{display:none!important;}'
      document.head.appendChild(styleEl)
    }

    const initWidget = () => {
      const clientix = (window as any).clientixWidget
      if (!clientix?.load) return
      clientix.load({
        baseUrl: 'https://klientiks.ru',
        alias: '/app2/biorise-clinic',
        text: 'Записаться онлайн',
        color: '#d9b9a5',
        color2: 'white',
        border: '1px solid #d9b9a5',
        borderRadius: '0 8px 8px 8px',
        develop: false,
        log: false,
      })
      setTimeout(() => setIsWidgetReady(true), 500)
    }

    if ((window as any).clientixWidget) {
      initWidget()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://klientiks.ru/js/online/clientixWidget.js'
    script.async = true
    script.onload = () => initWidget()
    document.body.appendChild(script)
  }, [])

  const handleOpenBooking = () => {
    if (!isWidgetReady && typeof window !== 'undefined') {
      window.open('https://klientiks.ru/app2/biorise-clinic', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <Header />
      <CatalogButton onClick={() => setIsOffCanvasOpen(true)} />
      <OffCanvasMenu isOpen={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)} categories={menu} />
      <InfusionPageLayout sidebarCategories={menu}>
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <CategorySection key={cat.id} id={cat.id} title={cat.title} items={cat.items} icon={cat.icon} onBook={handleOpenBooking} />
          ))}
        </div>
      </InfusionPageLayout>
      <Footer />
      <DownloadPdfButton />
    </>
  )
}
