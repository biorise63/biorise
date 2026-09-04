'use client'

import Link from 'next/link'
import {
  BadgePercent,
  CalendarClock,
  ClipboardCheck,
  Gift,
  ListChecks,
  PhoneCall,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'
import type { Promo } from '@/lib/promos'

const PHONE_HREF = 'tel:+79967499747'

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export default function PromoContent({ promo }: { promo: Promo }) {
  const { openBookingModal } = useBookingModal()
  const h1Text = promo.h1 || promo.title
  const totalItems = promo.categories.reduce((sum, c) => sum + c.items.length, 0)

  const badges = [
    {
      icon: BadgePercent,
      title: 'Стоимость',
      text: (
        <>
          {promo.oldPrice && (
            <span className="mr-2 text-olive-primary/50 line-through">{formatPrice(promo.oldPrice)}</span>
          )}
          <strong>{formatPrice(promo.price)}</strong>
        </>
      ),
    },
    {
      icon: ListChecks,
      title: 'Показателей',
      text: <strong>{totalItems}</strong>,
    },
    {
      icon: Gift,
      title: 'Расшифровка врача',
      text: <strong>В подарок</strong>,
    },
    {
      icon: CalendarClock,
      title: 'Акция действует',
      text: <strong>до {promo.validUntil}</strong>,
    },
  ]

  return (
    <div className="bg-beige-background text-olive-primary">
      <Header />
      <main style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}>
        <section className="container mx-auto px-4 pb-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Акции', href: '/#gallery' },
              { name: promo.title, href: `/akcii/${promo.slug}/` },
            ]}
          />

          <p className="mb-4 mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
            Акция BIORISE
          </p>
          <h1 className="max-w-4xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
            {h1Text}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-olive-text sm:text-xl">
            {promo.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-text">{promo.intro}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 shadow-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
                    <badge.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.1em] text-olive-primary/70">
                      {badge.title}
                    </span>
                    <span className="mt-0.5 block text-lg text-olive-primary">{badge.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
            >
              Записаться онлайн
            </button>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white/80"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              {PHONE_HREF.replace('tel:', '')}
            </a>
          </div>

          {promo.disclaimer && (
            <p className="mt-4 max-w-3xl text-sm text-olive-primary/60">{promo.disclaimer}</p>
          )}
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
                Что входит в чек-ап — {totalItems} показателя
              </h2>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-olive-text">
              Нажмите на категорию, чтобы посмотреть полный список показателей.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {promo.categories.map((category) => (
                <details
                  key={category.title}
                  className="group rounded-2xl border border-olive-primary/10 bg-beige-background/45 p-4 open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-olive-primary">
                    <span>
                      {category.title}
                      <span className="ml-2 font-normal text-olive-primary/60">
                        ({category.items.length})
                      </span>
                    </span>
                    <span
                      className="shrink-0 text-olive-primary/50 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-olive-text">
                    {category.items.map((item, i) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-olive-primary/50">{i + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Как проходит чек-ап
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Врач уточняет жалобы, анамнез и цель обследования.',
                'Вы сдаёте кровь и мочу за один визит — забор занимает около 15 минут.',
                'Материал обрабатывается в лаборатории по всем 72 показателям.',
                'Врач готовит разбор результатов и рассказывает о дальнейших шагах.',
              ].map((item, index) => (
                <div key={item} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="text-sm font-semibold text-olive-primary">0{index + 1}</span>
                  <p className="mt-2 text-sm text-olive-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 sm:px-6">
          <div className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-5 shadow-premium sm:p-7">
            <h2 className="mb-5 text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Частые вопросы
            </h2>
            <div className="space-y-3">
              {promo.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-olive-primary/10 bg-beige-background/45 p-4 open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium text-olive-primary">
                    {item.question}
                    <span
                      className="shrink-0 text-olive-primary/50 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-olive-text">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 sm:px-6">
          <section className="rounded-[28px] bg-olive-primary p-5 text-white shadow-premium sm:p-7">
            <h2 className="mb-4 text-2xl font-heading font-light">Смотрите также</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {promo.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/16"
                >
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm text-white/75">{item.text}</span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}
