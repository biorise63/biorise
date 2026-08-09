'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'
import AnalysesFloatingActions from './AnalysesFloatingActions'
import { analysesFaq, analysisCategories, analysisSections, popularAnalyses } from '@/lib/analyses'

const PHONE_DISPLAY = '+7 996 749 97 47'
const PHONE_HREF = 'tel:+79967499747'
const BLOOD_ANALYSIS_HREF = '/analizy/analiz-krovi/'
const FERRITIN_HREF = '/analizy/ferritin/'

function SectionIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  } as const

  switch (name) {
    case 'blood-drop':
      return (
        <svg {...props}>
          <path d="M12 3c3.6 4.4 5.6 7.4 5.6 10a5.6 5.6 0 1 1-11.2 0C6.4 10.4 8.4 7.4 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'iron-cell':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2.5v2.5M21.5 12H19M12 21.5V19M5 12H2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'thyroid':
      return (
        <svg {...props}>
          <path d="M10 4a2 2 0 1 1 4 0v4.5a4.5 4.5 0 1 1-4 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2.5v2.3M12 19.2v2.3M4.8 4.8 6.4 6.4M17.6 17.6l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.8 19.2l1.6-1.6M17.6 6.4l1.6-1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'kidney':
      return (
        <svg {...props}>
          <path d="M10 5c-2.8 0-5 2.4-5 5.3 0 3.7 2.3 6.7 5 8.7 2.7-2 5-5 5-8.7C15 7.4 12.8 5 10 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 7c2.8 0 5 2.4 5 5.3 0 3.7-2.3 6.7-5 8.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'glucose':
      return (
        <svg {...props}>
          <path d="M8 4.5h8l4 7-4 7H8l-4-7 4-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 4.5 12 11l-4 7M16 4.5 12 11l4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'children':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="16.5" cy="9.5" r="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5.5 19c.8-2.7 2.3-4.5 4.5-5.5 2.2 1 3.7 2.8 4.5 5.5M14 18.5c.5-1.7 1.5-2.8 3-3.5 1.5.7 2.5 1.8 3 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'shield-lab':
      return (
        <svg {...props}>
          <path d="M12 3 5 6v5c0 4.4 2.8 7.2 7 8 4.2-.8 7-3.6 7-8V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 8h4M9.5 11h5M10.5 14h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'clinical':
      return (
        <svg {...props}>
          <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'biochemistry':
      return (
        <svg {...props}>
          <circle cx="7" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" />
          <path d="M9.5 11 14.5 8.8M9.5 13l5 2.2M17 10.5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'hormones':
      return (
        <svg {...props}>
          <path d="M8 4h8v3.5a4 4 0 1 1-3 0V4h-2v7.2a4.5 4.5 0 1 1-3 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'immunity':
      return (
        <svg {...props}>
          <path d="M12 3 5 6v5c0 4.4 2.8 7.2 7 8 4.2-.8 7-3.6 7-8V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9.5 12 1.6 1.7 3.4-3.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'genetics':
      return (
        <svg {...props}>
          <path d="M8 4c0 4 8 4 8 8s-8 4-8 8M16 4c0 4-8 4-8 8s8 4 8 8M9 6h6M9 18h6M8.5 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'allergy':
      return (
        <svg {...props}>
          <path d="M12 4c3.6 4.4 5.6 7.3 5.6 9.9A5.6 5.6 0 1 1 6.4 14c0-2.6 2-5.5 5.6-10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'infections':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2.5v2.8M12 18.7v2.8M21.5 12h-2.8M5.3 12H2.5M18.9 5.1l-2 2M7.1 16.9l-2 2M18.9 18.9l-2-2M7.1 7.1l-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'oncology':
      return (
        <svg {...props}>
          <path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="2" rx="4" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="14" cy="14" r="1.5" fill="currentColor" />
          <path d="m11.2 11.2 1.6 1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'lab-search':
      return (
        <svg {...props}>
          <path d="M10.5 4h3l.5 4.2L18 19H6l4-10.8L10.5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17.5" cy="17.5" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'faq':
      return (
        <svg {...props}>
          <path d="M12 20c4.4 0 8-3.1 8-7s-3.6-7-8-7-8 3.1-8 7c0 1.7.7 3.3 2 4.5L6 21l3.2-1.6c.9.4 1.8.6 2.8.6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.7 10.8a1.6 1.6 0 1 1 2.7 1.1c-.6.6-1.2 1-1.4 1.8M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'contact':
      return (
        <svg {...props}>
          <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h2.2a1 1 0 0 1 1 .7l1 3a1 1 0 0 1-.4 1.2l-1.5.9a11 11 0 0 0 4.4 4.4l.9-1.5a1 1 0 0 1 1.2-.4l3 1a1 1 0 0 1 .7 1v2.2A1.5 1.5 0 0 1 17.5 20h-1C10.7 20 5 14.3 5 7.5v-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function AnalizyContent() {
  const { openBookingModal } = useBookingModal()
  const [query, setQuery] = useState('')
  const [openSections, setOpenSections] = useState<string[]>([])

  const filteredSections = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase()

    if (!trimmedQuery) {
      return analysisSections
    }

    return analysisSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const haystack = [
            item.code,
            item.name,
            item.section,
            item.subsection,
            item.biomaterial,
            item.turnaround,
          ]
            .join(' ')
            .toLowerCase()
          return haystack.includes(trimmedQuery)
        }),
      }))
      .filter((section) => section.items.length > 0)
  }, [query])

  const resultsCount = useMemo(
    () => filteredSections.reduce((sum, section) => sum + section.items.length, 0),
    [filteredSections],
  )

  const quickResults = useMemo(
    () =>
      filteredSections
        .flatMap((section) =>
          section.items.map((item) => ({
            ...item,
            sectionSlug: section.slug,
            sectionTitle: section.title,
          })),
        )
        .slice(0, 8),
    [filteredSections],
  )

  useEffect(() => {
    if (!query.trim()) return

    setOpenSections(filteredSections.map((section) => section.slug))
  }, [filteredSections, query])

  const toggleSection = (slug: string) => {
    setOpenSections((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug],
    )
  }

  const openSearchResult = (sectionSlug: string) => {
    setOpenSections((prev) => (prev.includes(sectionSlug) ? prev : [...prev, sectionSlug]))
    requestAnimationFrame(() => {
      document.getElementById(`section-${sectionSlug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const openCategory = (slugs: string[]) => {
    setQuery('')
    setOpenSections(slugs)
    const firstSlug = slugs[0]
    requestAnimationFrame(() => {
      document.getElementById(`section-${firstSlug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const focusSearch = () => {
    document.getElementById('analysis-search')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    requestAnimationFrame(() => {
      const input = document.getElementById('analysis-search-input') as HTMLInputElement | null
      input?.focus()
    })
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: analysesFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
        <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Анализы', href: '/analizy/' },
            ]}
          />

          <section className="mt-4 overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-white">
            <div className="px-6 py-8 md:px-10 md:py-9 lg:px-12">
              <div className="max-w-[700px]">
                <h1 className="text-[40px] font-light leading-[1.05] text-olive-primary sm:text-[44px] lg:text-[48px]">
                  Анализы в Самаре
                </h1>
                <p className="mt-5 max-w-[620px] text-[17px] leading-[1.6] text-olive-text sm:text-[18px]">
                  Лабораторные исследования для взрослых и детей. Более 2700 анализов с прозрачными ценами и быстрыми сроками выполнения.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={focusSearch}
                    className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
                  >
                    Найти анализ
                  </button>
                  <Link
                    href="/chek-apy/"
                    className="inline-flex items-center rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-beige-background/70"
                  >
                    Чек-ап программы
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section id="analysis-search" className="mt-24">
            <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-4 rounded-[1.5rem] border border-olive-primary/12 bg-white px-5 py-4 shadow-premium">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                  <SectionIcon name="lab-search" className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <label htmlFor="analysis-search-input" className="sr-only">
                    Поиск анализа
                  </label>
                  <input
                    id="analysis-search-input"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Введите название анализа..."
                    className="w-full border-0 bg-transparent p-0 text-[18px] text-olive-primary outline-none placeholder:text-olive-primary"
                  />
                </div>
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-full px-3 py-2 text-sm text-olive-primary transition-colors hover:bg-olive-primary/10"
                  >
                    Сбросить
                  </button>
                ) : null}
              </div>
              {query ? (
                <div className="mt-4">
                  <p className="text-sm text-olive-primary">
                    Найдено {resultsCount} {resultsCount === 1 ? 'позиция' : resultsCount < 5 ? 'позиции' : 'позиций'}.
                  </p>

                  {quickResults.length > 0 ? (
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {quickResults.map((item) => (
                        <div
                          key={`${item.sectionSlug}-${item.code}-${item.name}`}
                          className="rounded-2xl border border-olive-primary/10 bg-white px-4 py-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[11px] uppercase tracking-[0.16em] text-olive-primary">
                                {item.sectionTitle}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-olive-primary">
                                {item.name}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-sm font-medium text-olive-primary">{item.price}</p>
                              <p className="mt-1 text-xs text-olive-primary">{item.turnaround}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => openSearchResult(item.sectionSlug)}
                            className="mt-3 inline-flex items-center rounded-full border border-olive-primary/18 px-3 py-1.5 text-xs font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
                          >
                            Показать в каталоге
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>

          <section className="mt-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[32px] font-light leading-tight text-olive-primary">Популярные анализы</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {popularAnalyses.map((item) => (
                <article
                  key={item.code}
                  className="flex min-h-[330px] h-full flex-col rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium sm:min-h-[360px] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary sm:h-12 sm:w-12">
                      <SectionIcon name={item.icon} />
                    </div>
                    {item.showCode === false ? null : (
                      <span className="text-[10px] uppercase tracking-[0.16em] text-olive-primary sm:text-xs">
                        {item.code}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-[18px] font-medium leading-snug text-olive-primary sm:text-[19px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.55] text-olive-primary sm:text-[15px]">{item.description}</p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-olive-primary sm:text-xs">Срок</p>
                        <p className="mt-1 text-sm text-olive-text">{item.turnaround}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-olive-primary sm:text-xs">Цена</p>
                        <p className="mt-1 text-[19px] font-medium text-olive-primary sm:text-[20px]">{item.price}</p>
                      </div>
                    </div>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="relative z-[90] mt-4 inline-flex w-fit items-center rounded-full border border-olive-primary/18 px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
                      >
                        Подробнее
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(item.title)
                          document.getElementById('analyses-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="relative z-[90] mt-4 inline-flex w-fit items-center rounded-full border border-olive-primary/18 px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
                      >
                        Подробнее
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24">
            <div>
              <h2 className="text-[32px] font-light leading-tight text-olive-primary">Категории анализов</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {analysisCategories.map((category) => (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => openCategory(category.sectionSlugs)}
                  className="group rounded-[1.5rem] border border-olive-primary/10 bg-beige-background/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-olive-primary/18 hover:bg-white hover:shadow-premium"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-olive-primary ring-1 ring-olive-primary/10">
                      <SectionIcon name={category.icon} />
                    </div>
                    <span className="text-olive-primary transition-transform duration-200 group-hover:translate-x-1">↗</span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-medium text-olive-primary">{category.title}</h3>
                  <p className="mt-2 text-sm text-olive-primary">{category.count} исследований</p>
                </button>
              ))}
            </div>
          </section>

          <section id="analyses-catalog" className="mt-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[32px] font-light leading-tight text-olive-primary">Каталог анализов</h2>
              </div>
              <p className="max-w-[420px] text-sm leading-[1.6] text-olive-primary sm:text-right">
                Категории раскрываются отдельно. Если вы используете поиск, таблица покажет только подходящие позиции.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {filteredSections.length === 0 ? (
                <div className="rounded-[1.5rem] border border-olive-primary/10 bg-beige-background/70 px-6 py-8 text-olive-text">
                  По запросу ничего не найдено. Попробуйте изменить формулировку или убрать часть слов.
                </div>
              ) : (
                filteredSections.map((section) => {
                  const isOpen = openSections.includes(section.slug)

                  return (
                    <div key={section.slug} id={`section-${section.slug}`} className="overflow-hidden rounded-[1.5rem] border border-olive-primary/10 bg-white">
                      <button
                        type="button"
                        onClick={() => toggleSection(section.slug)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-beige-background/70 sm:px-6"
                      >
                        <div>
                          <h3 className="text-[20px] font-medium text-olive-primary">{section.title}</h3>
                          <p className="mt-1 text-sm text-olive-primary">{section.items.length} позиций</p>
                        </div>
                        <span className={`text-olive-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="overflow-x-auto border-t border-olive-primary/10">
                          <table className="min-w-full text-left">
                            <thead className="bg-beige-background/70 text-xs uppercase tracking-[0.18em] text-olive-primary">
                              <tr>
                                <th className="px-5 py-4 font-medium sm:px-6">Название</th>
                                <th className="px-5 py-4 font-medium">Срок</th>
                                <th className="px-5 py-4 text-right font-medium">Цена</th>
                                <th className="px-5 py-4 text-right font-medium sm:px-6">Действие</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.items.map((item) => (
                                <tr key={`${section.slug}-${item.code}-${item.name}`} className="border-t border-olive-primary/8 align-top">
                                  <td className="px-5 py-4 sm:px-6">
                                    <div className="text-[11px] uppercase tracking-[0.16em] text-olive-primary">Код {item.code}</div>
                                    <div className="mt-1 text-[15px] leading-[1.6] text-olive-primary">{item.name}</div>
                                  </td>
                                  <td className="px-5 py-4 text-sm text-olive-primary">{item.turnaround || 'По готовности лаборатории'}</td>
                                  <td className="px-5 py-4 text-right text-[15px] font-medium text-olive-primary">{item.price}</td>
                                  <td className="px-5 py-4 text-right sm:px-6">
                                    {item.code === '5' || item.code === '51' ? (
                                      <Link
                                        href={item.code === '51' ? FERRITIN_HREF : BLOOD_ANALYSIS_HREF}
                                        className="relative z-[90] inline-flex rounded-full border border-olive-primary/18 px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
                                      >
                                        Подробнее
                                      </Link>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={openBookingModal}
                                        className="relative z-[90] rounded-full border border-olive-primary/18 px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
                                      >
                                        Записаться
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                    </div>
                  )
                })
              )}
            </div>
          </section>

          <section className="mt-24 rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 px-6 py-8 sm:px-8 md:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[720px]">
                <h2 className="text-[32px] font-light leading-tight text-olive-primary">Чек-ап программы</h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-olive-text">
                  Если нужен готовый набор исследований, откройте страницу с чек-апами. Там собраны базовые, расширенные, мужские, послеродовые и профильные программы.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/chek-apy/"
                  className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
                >
                  Открыть чек-ап программы
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-24">
            <div className="flex items-center gap-3 text-olive-primary">
              <SectionIcon name="faq" className="h-7 w-7" />
              <h2 className="text-[32px] font-light leading-tight text-olive-primary">FAQ</h2>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {analysesFaq.map((item) => (
                <article key={item.question} className="rounded-[1.5rem] border border-olive-primary/10 bg-white p-6">
                  <h3 className="text-[20px] font-medium leading-snug text-olive-primary">{item.question}</h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-olive-text">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

        </div>

        <AnalysesFloatingActions />
      </div>
    </>
  )
}
