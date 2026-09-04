"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, CalendarDays, Clock3, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react'
import ReferenceRangeTable from '@/components/analizy/ReferenceRangeTable'
import AnalysisFaq from '@/components/analizy/AnalysisFaq'
import { faqItems } from './faq'

const referenceRows = [
  { parameter: 'Отрицательный', range: 'Данных за туберкулёзную инфекцию не получено' },
  { parameter: 'Положительный', range: 'Есть данные за туберкулёзную инфекцию - нужна консультация врача' },
  { parameter: 'Сомнительный (неопределённый)', range: 'Требуется повторное исследование по решению врача' },
]

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const BLOOD_ANALYSIS_URL = '/analizy/analiz-krovi/'
const DETSKIY_CHEKAP_URL = '/articles/detskiy-chek-ap/'

const facts = [
  {
    icon: Sparkles,
    title: 'Что это',
    text: 'Диагностика туберкулёзной инфекции по крови, без кожных проб.',
  },
  {
    icon: Clock3,
    title: 'Забор крови',
    text: 'Оплачивается отдельно, 180 ₽.',
  },
  {
    icon: CalendarDays,
    title: 'Цена по акции',
    text: '6 500 ₽ вместо 7 900 ₽, до 30 сентября.',
  },
]

const indications = [
  'Нужна высокоточная диагностика на ранней стадии.',
  'Пробы Манту или Диаскинтест противопоказаны или нежелательны.',
  'Есть аллергические реакции на компоненты кожных проб.',
  'Требуется обследование перед госпитализацией.',
]

const relatedLinks = [
  {
    title: 'Каталог анализов',
    href: ANALYSES_URL,
    text: 'Открыть полный список лабораторных исследований.',
  },
  {
    title: 'Общий анализ крови',
    href: BLOOD_ANALYSIS_URL,
    text: 'Базовое исследование, которое врач может назначить вместе с T-SPOT.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Выбрать готовую программу обследования под задачу.',
  },
  {
    title: 'Детский чек-ап',
    href: DETSKIY_CHEKAP_URL,
    text: 'Что входит в обследование ребёнка перед школой и садом.',
  },
]

export default function TSpotContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'T-SPOT', href: '/analizy/t-spot/' },
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

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-olive-primary/10 px-4 py-1.5 text-xs font-medium text-olive-primary">
                Акция до 30 сентября 2026
              </div>

              <h1 className="mt-4 text-[38px] font-light leading-[1.05] text-olive-primary sm:text-[42px] lg:text-[48px]">
                T-spot в Самаре
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                T-SPOT - современное исследование крови для диагностики туберкулёзной инфекции без кожных проб. Подходит взрослым и детям по назначению врача.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-olive-text">
                До 30 сентября анализ можно сдать по акционной цене{' '}
                <span className="font-medium text-olive-primary">6 500 ₽</span> вместо{' '}
                <span className="line-through text-olive-primary">7 900 ₽</span>. Забор крови оплачивается отдельно, 180 ₽.
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
                  className="inline-flex items-center rounded-full border border-olive-primary/18 px-6 py-3 text-sm font-medium text-olive-primary transition-colors hover:bg-white/80"
                >
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
              Что показывает T-SPOT
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              T-SPOT.TB - иммунологический анализ крови, который выявляет клетки иммунной системы, реагирующие на возбудителя туберкулёза. В отличие от кожных проб, результат не зависит от предыдущих прививок БЦЖ и не требует повторного визита для оценки реакции на коже.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Решение о том, нужен ли именно этот анализ, принимает врач на основании жалоб, контактов с больными туберкулёзом, планов по госпитализации или требований учебного заведения.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Когда назначают T-SPOT
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              {indications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Чем T-SPOT отличается от Манту и Диаскинтеста
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Манту и Диаскинтест - кожные пробы: препарат вводят под кожу и через несколько дней оценивают реакцию визуально. T-SPOT работает иначе: это лабораторный анализ крови, результат которого не зависит от состояния кожи, аллергических реакций на компоненты пробы и не требует повторного визита на осмотр реакции.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как проходит анализ
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Для исследования берут венозную кровь, процедура занимает несколько минут. Специальной подготовки обычно не требуется, но если вы принимаете препараты, влияющие на иммунитет, стоит сообщить об этом врачу заранее.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Забор крови оплачивается отдельно от стоимости самого анализа. Точный срок готовности результата уточняйте при записи.
            </p>
          </div>

          <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-[26px] font-light leading-tight text-olive-primary sm:text-[28px]">
                Запись и полезные разделы
              </h2>
            </div>

            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Записаться на T-SPOT можно онлайн или по телефону. Акционная цена действует до 30 сентября 2026 года.
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

            <div className="mt-8 rounded-[1.5rem] border border-olive-primary/10 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-olive-primary">Важно</h3>
                  <p className="mt-2 text-sm leading-relaxed text-olive-primary">
                    Какой именно анализ нужен: T-SPOT, Манту или Диаскинтест, решает врач, исходя из ситуации, возраста и противопоказаний. Материал носит информационный характер и не заменяет консультацию врача.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {relatedLinks.map((item) => (
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
          title="Как читать результат"
          columnLabels={['Результат', 'Что означает']}
          rows={referenceRows}
          note="Интерпретацию результата всегда даёт врач с учётом клинической картины и других обследований."
        />
        <AnalysisFaq items={faqItems} />
      </div>
    </div>
  )
}
