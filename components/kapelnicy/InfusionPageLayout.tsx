import { ReactNode } from 'react'
import SidebarMenu from './SidebarMenu'

type MenuCategory = {
  id: string
  title: string
  items: { id: string; title: string }[]
  icon?: string
}

interface InfusionPageLayoutProps {
  sidebarCategories: MenuCategory[]
  children: ReactNode
}

export default function InfusionPageLayout({ sidebarCategories, children }: InfusionPageLayoutProps) {
  return (
    <main className="kapelnicy-page min-h-screen bg-beige-background text-olive-primary">
      <div className="kapelnicy-container container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="kapelnicy-layout">
          <SidebarMenu categories={sidebarCategories} />
          <div className="kapelnicy-content space-y-12">{children}</div>
        </div>
      </div>
    </main>
  )
}

