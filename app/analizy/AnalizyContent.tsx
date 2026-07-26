import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import AnalysesFloatingActions from './AnalysesFloatingActions'
import { analysesStats, analysisSections, popularAnalyses } from '@/lib/analyses'

function AnalysisIcon({ icon }: { icon: string }) {
  const common = 'h-5 w-5'

  if (icon === 'blood') {
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3c3.5 4.3 5.5 7.2 5.5 9.8A5.5 5.5 0 1 1 6.5 12.8C6.5 10.2 8.5 7.3 12 3Z" />
      </svg>
    )
  }

  if (icon === 'urine') {
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3h6m-5 0v4m4-4v4m-6 3h8l1.2 8.1A2 2 0 0 1 15.2 20H8.8a2 2 0 0 1-1.98-1.9L8 10Z" />
      </svg>
    )
  }

  if (icon === 'iron') {
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 4h8v5a4 4 0 1 1-8 0V4Zm4 9v7m-3-3h6" />
      </svg>
    )
  }

  if (icon === 'thyroid') {
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 4a2 2 0 1 1 4 0v4.5a4.5 4.5 0 1 1-4 0V4Z" />
      </svg>
    )
  }

  if (icon === 'vitamin') {
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 6h8l2 4-6 8-6-8 2-4Z" />
      </svg>
    )
  }

  return (
    <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 5h10v3H7zM6 8h12l1 11H5L6 8Z" />
    </svg>
  )
}

export default function AnalizyContent() {
  return (
    <div className="pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: '/analizy/' },
          ]}
        />

        <section className="mx-auto max-w-6xl rounded-[2rem] border border-olive-primary/12 bg-gradient-to-br from-beige-background via-white to-beige-background/60 px-6 py-8 shadow-[0_24px_60px_rgba(60,74,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-olive-primary/15 bg-white/80 px-4 py-1.5 text-sm text-olive-primary/80">
                Лабораторная диагностика BIORISE
              </span>
              <h1 className="mt-5 text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl">
                Анализы
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-olive-primary/80">
                Сдайте анализы в Самаре без лишнего скролла по прайсу. На странице собраны популярные исследования, полный лабораторный каталог и отдельный переход к программам check-up, если нужен комплексный формат обследования.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#analizy-table"
                  className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
                >
                  Перейти к таблице
                </a>
                <Link
                  href="/chek-apy/"
                  className="inline-flex items-center rounded-full border border-olive-primary/20 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white/80"
                >
                  Открыть чек-апы
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
              <div className="rounded-2xl border border-olive-primary/12 bg-white/90 p-4">
                <div className="text-2xl font-semibold text-olive-primary">{analysesStats.analysesCount}+</div>
                <p className="mt-1 text-sm leading-relaxed text-olive-primary/70">исследований в общем каталоге</p>
              </div>
              <div className="rounded-2xl border border-olive-primary/12 bg-white/90 p-4">
                <div className="text-2xl font-semibold text-olive-primary">{analysesStats.sectionsCount}</div>
                <p className="mt-1 text-sm leading-relaxed text-olive-primary/70">профильных направлений лаборатории</p>
              </div>
              <div className="rounded-2xl border border-olive-primary/12 bg-white/90 p-4">
                <div className="text-2xl font-semibold text-olive-primary">{analysesStats.checkupsCount}+</div>
                <p className="mt-1 text-sm leading-relaxed text-olive-primary/70">готовых check-up программ</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-olive-primary/45">Популярное</p>
              <h2 className="mt-2 text-3xl font-heading font-light text-olive-primary">Анализы, которые выбирают чаще всего</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-olive-primary/65 sm:text-right">
              Общий анализ крови, моча, ферритин, гормоны щитовидной железы, витамин D и детские справочные исследования.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {popularAnalyses.map((item) => (
              <article key={item.code} className="rounded-[1.75rem] border border-olive-primary/12 bg-white p-6 shadow-[0_14px_40px_rgba(51,64,35,0.06)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-beige-background text-olive-primary">
                    <AnalysisIcon icon={item.icon} />
                  </div>
                  <span className="rounded-full bg-olive-primary/8 px-3 py-1 text-xs font-medium text-olive-primary/70">
                    Код {item.code}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-olive-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-olive-primary/72">{item.description}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-olive-primary/45">Срок</p>
                    <p className="mt-1 text-sm font-medium text-olive-primary">{item.turnaround}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-olive-primary/45">Цена</p>
                    <p className="mt-1 text-2xl font-semibold text-olive-primary">{item.price}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl rounded-[1.75rem] border border-olive-primary/12 bg-white p-6 shadow-[0_14px_40px_rgba(51,64,35,0.05)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-olive-primary/45">Отдельная страница</p>
              <h2 className="mt-2 text-3xl font-heading font-light text-olive-primary">Нужен не один анализ, а программа обследования?</h2>
              <p className="mt-3 text-base leading-relaxed text-olive-primary/72">
                Для комплексных программ без ручного подбора по одному исследованию мы вынесли check-up направления в отдельный раздел. Там удобнее сравнивать готовые пакеты для женщин, мужчин, детей, дефицитов и профилактических обследований.
              </p>
            </div>
            <div className="flex shrink-0">
              <Link
                href="/chek-apy/"
                className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
              >
                Перейти к чек-апам
              </Link>
            </div>
          </div>
        </section>

        <section id="analizy-table" className="mx-auto mt-10 max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-olive-primary/45">Полный прайс</p>
              <h2 className="mt-2 text-3xl font-heading font-light text-olive-primary">Таблица анализов по разделам</h2>
            </div>
            <div className="flex max-w-2xl flex-wrap gap-2 sm:justify-end">
              {analysisSections.map((section) => (
                <a
                  key={section.slug}
                  href={`#section-${section.slug}`}
                  className="rounded-full border border-olive-primary/15 px-3 py-1.5 text-xs font-medium text-olive-primary/75 transition-colors hover:bg-beige-background"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {analysisSections.map((section, index) => (
              <details
                key={section.slug}
                id={`section-${section.slug}`}
                className="overflow-hidden rounded-[1.5rem] border border-olive-primary/12 bg-white shadow-[0_10px_28px_rgba(51,64,35,0.05)]"
                open={index < 2}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-beige-background/70 px-5 py-4 text-left transition-colors hover:bg-beige-background sm:px-6">
                  <div>
                    <h3 className="text-lg font-semibold text-olive-primary sm:text-xl">{section.title}</h3>
                    <p className="mt-1 text-sm text-olive-primary/65">{section.items.length} исследований в разделе</p>
                  </div>
                  <span className="rounded-full border border-olive-primary/12 bg-white px-3 py-1 text-xs font-medium text-olive-primary/65">
                    Открыть
                  </span>
                </summary>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-olive-primary/80">
                    <thead className="border-b border-olive-primary/10 bg-white/90 text-xs uppercase tracking-[0.18em] text-olive-primary/50">
                      <tr>
                        <th className="px-5 py-4 font-medium sm:px-6">Наименование</th>
                        <th className="px-5 py-4 font-medium">Биоматериал</th>
                        <th className="px-5 py-4 font-medium">Срок</th>
                        <th className="px-5 py-4 text-right font-medium sm:px-6">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr key={`${section.slug}-${item.code}-${item.name}`} className="border-b border-olive-primary/8 last:border-b-0">
                          <td className="px-5 py-4 align-top sm:px-6">
                            <div className="text-xs uppercase tracking-[0.16em] text-olive-primary/38">Код {item.code}</div>
                            <div className="mt-1 font-medium leading-relaxed text-olive-primary">{item.name}</div>
                            {item.subsection && item.subsection !== section.title ? (
                              <div className="mt-1 text-xs text-olive-primary/55">{item.subsection}</div>
                            ) : null}
                          </td>
                          <td className="px-5 py-4 align-top text-olive-primary/70">
                            {item.biomaterial || 'Уточняется'}
                          </td>
                          <td className="px-5 py-4 align-top text-olive-primary/70">
                            {item.turnaround || 'По готовности лаборатории'}
                          </td>
                          <td className="px-5 py-4 text-right align-top font-semibold text-olive-primary sm:px-6">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <AnalysesFloatingActions />
    </div>
  )
}
