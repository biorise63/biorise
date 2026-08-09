'use client'

import {
  Bone,
  Brain,
  Eye,
  HeartPulse,
  MoonStar,
  ShieldPlus,
  Sparkles,
  Zap,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CardItem, ExpandingCards } from '@/components/ui/expanding-cards'

const supplements: CardItem[] = [
  {
    id: 'b-complex',
    title: 'B Complex',
    description:
      'Энергия, поддержка нервной системы и участие в гормональном и пищеварительном обмене.',
    imgSrc: '/supplements/b-complex.jpg',
    icon: <Zap size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'iron-chelate',
    title: 'Iron Chelate 40 mg',
    description:
      'Профилактика дефицита железа, поддержка сердца и сосудов в комплексных программах.',
    imgSrc: '/supplements/iron-chelate.jpg',
    icon: <HeartPulse size={22} />,
    linkHref: '/#booking',
  },
  {
    id: '5-htp-b6',
    title: '5-HTP 100 mg + B6',
    description:
      'Поддержка сна и когнитивных функций, помощь в контроле аппетита.',
    imgSrc: '/supplements/5-htp-b6.jpg',
    icon: <MoonStar size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'magnesium-chelate',
    title: 'Magnesium Chelate',
    description:
      'Поддержка обмена веществ, костно-мышечной системы и пищеварения.',
    imgSrc: '/supplements/magnesium-chelate.jpg',
    icon: <Brain size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'magnesium-citrate-b6',
    title: 'Magnesium Citrate + B6',
    description:
      'Поддержка сердца, памяти и мышечного тонуса при высоких нагрузках.',
    imgSrc: '/supplements/magnesium-citrate-b6.jpg',
    icon: <ShieldPlus size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'marine-collagen',
    title: 'Marine Collagen 750 mg',
    description:
      'Поддержка кожи и соединительной ткани, антиоксидантный эффект и иммунный ресурс.',
    imgSrc: '/supplements/marine-collagen.jpg',
    icon: <Sparkles size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'vitamin-d3-k2',
    title: 'Vitamin D3 5000 ME + K2',
    description:
      'Поддержка иммунной функции и баланса витаминов D и K в сезон дефицитов.',
    imgSrc: '/supplements/vitamin-d3-k2.jpg',
    icon: <ShieldPlus size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'calcium-citrate',
    title: 'Calcium Citrate',
    description:
      'Здоровые кости, профилактика остеопороза и поддержка нервной системы.',
    imgSrc: '/supplements/calcium-citrate.jpg',
    icon: <Bone size={22} />,
    linkHref: '/#booking',
  },
  {
    id: 'omega-3',
    title: 'Omega-3',
    description:
      'Поддержка суставов и зрения, баланс эмоционального благополучия.',
    imgSrc: '/supplements/omega-3.jpg',
    icon: <Eye size={22} />,
    linkHref: '/#booking',
  },
]

export default function BadyContent() {
  return (
    <main className="bg-beige-background">
      <section className="pb-14 pt-[calc(var(--header-height)+90px)] sm:pb-16 sm:pt-[calc(var(--header-height)+96px)] lg:pb-20 lg:pt-[calc(var(--header-height)+88px)]">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <Breadcrumbs
              items={[
                { name: 'Главная', href: '/' },
                { name: 'БАДЫ', href: '/bady/' },
              ]}
              className="justify-center"
            />
            <h1 className="text-3xl font-heading font-light text-olive-primary sm:text-4xl md:text-5xl">
              БАДЫ BIORISE
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-olive-text sm:text-base">
              Современный каталог в формате интерактивных карточек.
              Выберите продукт, чтобы увидеть описание.
            </p>
          </div>

          <div className="flex justify-center">
            <ExpandingCards items={supplements} defaultActiveIndex={0} />
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-olive-primary/15 bg-white/80 p-5 sm:p-7">
            <p className="text-sm leading-relaxed text-olive-text sm:text-base">
              БАДы не являются лекарственными средствами. Подбор, дозировку и
              сочетание определяет специалист BIORISE по результатам
              консультации и анализов.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
