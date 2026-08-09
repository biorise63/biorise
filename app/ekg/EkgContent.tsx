'use client'

import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'
import { Activity, CalendarDays, CheckCircle2, ClipboardCheck, Clock3, HeartPulse, PhoneCall, Stethoscope } from 'lucide-react'

const PHONE = '+7 996 749 9747'
const PHONE_HREF = 'tel:+79967499747'

const indications = [
  'Боль, тяжесть или дискомфорт в груди.',
  'Одышка, перебои в работе сердца, учащенное сердцебиение.',
  'Головокружение, слабость, обмороки.',
  'Повышенное давление или контроль уже назначенного лечения.',
  'Плановая проверка перед тренировками, операцией или госпитализацией.',
  'Профилактический осмотр при чек-апе организма.',
]

const reasons = [
  {
    icon: Activity,
    title: 'Современный аппарат',
    text: 'Исследование проводится на оборудовании для регистрации электрической активности сердца.',
  },
  {
    icon: Clock3,
    title: '5-10 минут',
    text: 'Процедура проходит быстро и не требует сложной подготовки.',
  },
  {
    icon: ClipboardCheck,
    title: 'Расшифровка входит в стоимость',
    text: 'Вы получаете кардиограмму и профессиональное заключение по результату.',
  },
  {
    icon: CalendarDays,
    title: 'По записи',
    text: 'Комфортный прием без очередей в удобное время.',
  },
]

const resultItems = [
  'Электрокардиограмму.',
  'Профессиональную расшифровку.',
  'Оценку состояния сердца по данным ЭКГ.',
  'Рекомендацию специалиста по дальнейшим действиям.',
]

const relatedLinks = [
  {
    href: '/analizy/',
    title: 'Анализы',
    text: 'Если врач рекомендует проверить воспаление, железо, гормоны или обмен веществ.',
  },
  {
    href: '/chek-apy/',
    title: 'Чек-апы',
    text: 'Готовые программы обследования для комплексной оценки здоровья.',
  },
  {
    href: '/bioimpedance/',
    title: 'Биоимпедансный анализ',
    text: 'Оценка состава тела, воды, мышечной и жировой массы.',
  },
]

function EkgLine() {
  return (
    <svg viewBox="0 0 640 220" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M34 118H118L145 118L168 74L205 170L242 30L286 118H348L378 118L401 89L426 144L453 118H606"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-olive-primary"
      />
      <circle cx="494" cy="118" r="52" className="fill-white/70 stroke-olive-primary/18" strokeWidth="2" />
      <path
        d="M494 92c15 18 30 34 30 52a30 30 0 0 1-60 0c0-18 15-34 30-52Z"
        className="fill-olive-primary/12 stroke-olive-primary"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 178H612" className="stroke-olive-primary/10" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function EkgContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1240px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'ЭКГ', href: '/ekg/' },
          ]}
        />

        <section className="mt-4 overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-gradient-to-br from-beige-background via-white to-beige-background/60">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.04fr_0.96fr] md:px-10 md:py-12 lg:px-12">
            <div className="max-w-[720px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-olive-primary/12 bg-white/70 px-4 py-2 text-sm font-medium text-olive-text">
                <HeartPulse className="h-4 w-4" aria-hidden="true" />
                ЭКГ с расшифровкой - 1100 ₽
              </div>

              <h1 className="mt-5 text-[38px] font-light leading-[1.05] text-olive-primary sm:text-[44px] lg:text-[54px]">
                ЭКГ в Самаре: запись онлайн или по телефону.
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                Электрокардиограмма помогает оценить ритм сердца, признаки перегрузки и нарушения проводимости. В БИОРАЙЗ исследование проходит по записи, без очередей, с готовой расшифровкой.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.7] text-olive-text">
                Если нужна более широкая проверка здоровья, ЭКГ можно дополнить <Link href="/analizy/" className="font-medium text-olive-primary underline underline-offset-4">анализами</Link> или включить в плановый <Link href="/chek-apy/" className="font-medium text-olive-primary underline underline-offset-4">чек-ап</Link>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white shadow-premium transition-colors hover:bg-olive-light"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  {PHONE}
                </a>
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center gap-2 rounded-full border border-olive-primary/18 bg-white/70 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Записаться онлайн
                </button>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-white/70 p-6 shadow-premium md:min-h-[420px]">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-olive-primary/8" />
              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-beige-accent/45" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-primary">Кардиограмма</p>
                    <p className="mt-2 text-2xl font-light text-olive-primary">5-10 минут</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-olive-primary text-white">
                    <Stethoscope className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>
                <div className="my-8 h-[180px] text-olive-text">
                  <EkgLine />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-olive-text">
                  <div className="rounded-2xl bg-beige-background/70 px-4 py-3">
                    Расшифровка входит в стоимость
                  </div>
                  <div className="rounded-2xl bg-beige-background/70 px-4 py-3">
                    Прием по предварительной записи
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-[30px] font-light leading-tight text-olive-primary sm:text-[36px]">
              Когда стоит пройти ЭКГ
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              ЭКГ часто назначают при жалобах со стороны сердца, перед нагрузками или как часть профилактического обследования. При выраженной боли в груди, резкой одышке или обмороке нужно обращаться за неотложной медицинской помощью.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {indications.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-olive-primary/10 bg-beige-background/55 px-4 py-4 text-[15px] leading-[1.6] text-olive-text">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="max-w-3xl">
            <h2 className="text-[30px] font-light leading-tight text-olive-primary sm:text-[36px]">
              Почему выбирают ЭКГ в БИОРАЙЗ
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 shadow-premium">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-medium leading-snug text-olive-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.65] text-olive-text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 rounded-[2rem] border border-olive-primary/10 bg-olive-primary px-6 py-8 text-white sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:py-10">
          <div>
            <h2 className="text-[30px] font-light leading-tight sm:text-[36px]">
              Что вы получите после обследования
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/75">
              Результат можно использовать для консультации врача, плановой проверки или дальнейшей диагностики по показаниям.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {resultItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-white/12 bg-white/10 px-4 py-4 text-[15px] leading-[1.55] text-white/88">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 transition-colors hover:border-olive-primary/22 hover:bg-beige-background/40"
            >
              <div className="text-lg font-medium text-olive-primary">{item.title}</div>
              <p className="mt-2 text-sm leading-[1.65] text-olive-primary">{item.text}</p>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-olive-primary/10 bg-beige-background/70 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[24px] font-medium text-olive-primary sm:text-[28px]">Записаться на ЭКГ</h2>
              <p className="mt-2 text-sm leading-[1.7] text-olive-text">
                Выберите удобный способ связи. Администратор подскажет свободное время приема.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-light"
              >
                {PHONE}
              </a>
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex items-center justify-center rounded-full border border-olive-primary/18 bg-white px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white/80"
              >
                Записаться онлайн
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
