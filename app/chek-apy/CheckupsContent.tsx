import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { checkupPrograms } from '@/lib/checkups'

function SectionIcon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  } as const

  switch (name) {
    case 'intro':
      return (
        <svg {...props}>
          <path d="M6 5.5h12A1.5 1.5 0 0 1 19.5 7v10A1.5 1.5 0 0 1 18 18.5H6A1.5 1.5 0 0 1 4.5 17V7A1.5 1.5 0 0 1 6 5.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'analysis':
      return (
        <svg {...props}>
          <path d="M12 3c3.4 4.3 5.3 7.1 5.3 9.6A5.3 5.3 0 1 1 6.7 12.6C6.7 10.1 8.6 7.3 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...props}>
          <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h2.2a1 1 0 0 1 1 .7l1 3a1 1 0 0 1-.4 1.2l-1.5.9a11 11 0 0 0 4.4 4.4l.9-1.5a1 1 0 0 1 1.2-.4l3 1a1 1 0 0 1 .7 1v2.2A1.5 1.5 0 0 1 17.5 20h-1C10.7 20 5 14.3 5 7.5v-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'baseline':
      return (
        <svg {...props}>
          <path d="M6 18h12M8 18V9m4 9V6m4 12v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'advanced':
      return (
        <svg {...props}>
          <path d="M6.5 16.5 10 13l2.5 2.5L17.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'vip':
      return (
        <svg {...props}>
          <path d="m12 4 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.2l5-.7L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    case 'mother':
      return (
        <svg {...props}>
          <circle cx="10" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6.5 18c.7-2.6 2-4.3 3.5-5.3 1.8 1 3.1 2.7 3.8 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16.8" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'iron':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5.8" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'sport':
      return (
        <svg {...props}>
          <path d="M7 16c1.8-4.3 5-7.5 9.3-9.3M9 18h6M7.5 10.5l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="16.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'detox':
      return (
        <svg {...props}>
          <path d="M12 4v7m0 0 3-3m-3 3L9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 15.5c1.8 2 3.8 3 6 3s4.2-1 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'weight':
      return (
        <svg {...props}>
          <path d="M6.5 18h11A1.5 1.5 0 0 0 19 16.5v-5A6 6 0 0 0 7 11.5v5A1.5 1.5 0 0 0 8.5 18Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 10.5 14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'energy':
      return (
        <svg {...props}>
          <path d="M13 3 7.5 12H12l-1 9 5.5-9H12L13 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'age':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8.5v4l2.5 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'male':
      return (
        <svg {...props}>
          <circle cx="10" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13.2 10.8 18 6m0 0v4.2M18 6h-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function CheckupsContent() {
  return (
    <div className="pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.25rem)' }}>
      <div className="container mx-auto max-w-[1080px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Чек-апы', href: '/chek-apy/' },
          ]}
        />

        <section className="rounded-[2rem] border border-olive-primary/10 bg-white px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-[760px]">
            <h1 className="text-[38px] font-light leading-[1.05] text-olive-primary sm:text-[44px] lg:text-[48px]">
              Чек-ап организма в Самаре
            </h1>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          {checkupPrograms.map((program, index) => (
            <details
              key={program.slug}
              className="overflow-hidden rounded-[1.5rem] border border-olive-primary/10 bg-white"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-beige-background/50 sm:px-6">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-beige-background text-olive-primary">
                    <SectionIcon name={program.icon} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-[22px] font-medium leading-snug text-olive-primary sm:text-[24px]">
                      {program.title}
                    </h2>
                    <p className="mt-2 max-w-[700px] text-sm leading-[1.7] text-olive-primary/70 sm:text-[15px]">
                      {program.summary}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-olive-primary/55">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-olive-primary/8 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex items-center gap-2 text-sm font-medium text-olive-primary/72">
                  <SectionIcon name="analysis" className="h-4 w-4" />
                  Что входит в программу
                </div>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {program.items.map((item) => (
                    <li key={item} className="rounded-[1.25rem] border border-olive-primary/8 bg-beige-background/45 px-4 py-3 text-sm leading-[1.65] text-olive-primary/78">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-olive-primary/10 bg-white px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[620px]">
              <h2 className="text-[24px] font-medium text-olive-primary sm:text-[28px]">Нужен не чек-ап, а отдельные анализы?</h2>
              <p className="mt-3 text-sm leading-[1.7] text-olive-primary/72 sm:text-[15px]">
                Откройте полный каталог анализов BIORISE. Там собраны отдельные исследования с названиями, сроками и навигацией по разделам.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/analizy/"
                className="inline-flex items-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
              >
                Перейти к анализам
              </Link>
              <a
                href="tel:+79967499747"
                className="inline-flex items-center rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-beige-background/70"
              >
                +7 996 749 97 47
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
