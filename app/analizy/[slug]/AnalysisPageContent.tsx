'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock3, FlaskConical, PhoneCall } from 'lucide-react'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReferenceRangeTable from '@/components/analizy/ReferenceRangeTable'
import AnalysisFaq from '@/components/analizy/AnalysisFaq'
import type { AnalysisPage } from '@/lib/analysisPages'

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'

export default function AnalysisPageContent({ page }: { page: AnalysisPage }) {
  const { openBookingModal } = useBookingModal()

  const facts = [
    { icon: FlaskConical, title: 'Материал', text: page.material },
    { icon: Clock3, title: 'Срок', text: page.turnaround },
    { icon: CalendarDays, title: 'Цена', text: page.price },
  ]

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: page.title, href: `/analizy/${page.slug}/` },
          ]}
        />

        <section className="mt-4 overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-beige-background/70">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-10 lg:px-12">
            <div className="max-w-[760px]">
              <Link
                href={ANALYSES_URL}
                className="inline-flex items-center gap-2 text-sm font-medium text-olive-primary transition-colors hover:text-olive-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                К анализам
              </Link>

              <h1 className="mt-4 text-[38px] font-light leading-[1.05] text-olive-primary sm:text-[42px] lg:text-[48px]">
                {page.h1}
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                {page.intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
                >
                  Запись онлайн
                </button>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white/80"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  По телефону
                </a>
              </div>
            </div>

            <div className="grid gap-3 self-start">
              {facts.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 shadow-premium"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-olive-primary">{item.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-olive-primary">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-olive-primary/10 bg-white p-6 sm:p-8">
            <h2 className="text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Когда назначают
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              {page.whenOrdered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как подготовиться
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">{page.preparation}</p>
          </div>

          <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-[26px] font-light leading-tight text-olive-primary sm:text-[28px]">Запись</h2>
            </div>

            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Записаться можно онлайн или по телефону. Если нужен не только этот анализ, посмотрите весь каталог и подберите нужный набор исследований.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex w-full items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
              >
                Записаться онлайн
              </button>
              <a
                href={PHONE_HREF}
                className="inline-flex w-full items-center justify-center rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white"
              >
                {PHONE_HREF.replace('tel:', '')}
              </a>
            </div>

            <div className="mt-8 space-y-3">
              {page.related.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-[1.25rem] border border-olive-primary/10 bg-white px-4 py-4 transition-colors hover:border-olive-primary/20 hover:bg-white/90"
                >
                  <div className="text-base font-medium text-olive-primary">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-olive-primary">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ReferenceRangeTable
          title={page.referenceTitle}
          columnLabels={page.referenceColumnLabels}
          rows={page.referenceRows}
          note={page.referenceNote}
        />
        <AnalysisFaq items={page.faq} />
      </div>
    </div>
  )
}
