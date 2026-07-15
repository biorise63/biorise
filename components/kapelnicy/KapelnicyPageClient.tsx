'use client'

import { useEffect, useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfusionPageLayout from '@/components/kapelnicy/InfusionPageLayout'
import CategorySection from '@/components/kapelnicy/CategorySection'
import OffCanvasMenu from '@/components/kapelnicy/OffCanvasMenu'
import DownloadPdfButton from '@/components/kapelnicy/DownloadPdfButton'
import CatalogButton from '@/components/kapelnicy/CatalogButton'
import { useBookingModal } from '@/components/BookingModalProvider'
// import ExitIntentOffersPopup from '@/components/ExitIntentOffersPopup'

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
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Капельницы', href: '/kapelnicy/' },
            ]}
          />
          <section className="relative overflow-hidden rounded-[28px] border border-olive-primary/10 bg-white/80 p-5 shadow-premium sm:p-7">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-olive-primary/10 blur-3xl" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary/50">Выезд на дом</p>
                <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                  Капельница в комфортных условиях
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-olive-primary/70 sm:text-base">
                  Врач может приехать к вам домой по Самаре: оценить состояние, уточнить противопоказания и подобрать состав процедуры.
                </p>
              </div>
              <div className="rounded-3xl bg-olive-primary px-5 py-4 text-white shadow-premium sm:px-6">
                <span className="block text-xs uppercase tracking-[0.14em] text-white/60">Стоимость выезда</span>
                <strong className="mt-1 block text-2xl sm:text-3xl">2 500 ₽</strong>
                <span className="mt-1 block text-sm text-white/75">+ стоимость выбранной капельницы</span>
              </div>
            </div>
          </section>
          {categories.map((cat) => (
            <CategorySection key={cat.id} id={cat.id} title={cat.title} items={cat.items} icon={cat.icon} onBook={openBookingModal} />
          ))}
        </div>
      </InfusionPageLayout>
      <Footer />
      <DownloadPdfButton />
      {/* <ExitIntentOffersPopup /> */}
    </>
  )
}
