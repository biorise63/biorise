"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, CalendarDays, Clock3, FlaskConical, PhoneCall } from 'lucide-react'
import ReferenceRangeTable from '@/components/analizy/ReferenceRangeTable'
import AnalysisFaq from '@/components/analizy/AnalysisFaq'
import { faqItems } from './faq'

const referenceRows = [
  { parameter: 'Гемоглобин, мужчины', range: '130–160 г/л' },
  { parameter: 'Гемоглобин, женщины', range: '120–150 г/л' },
  { parameter: 'Эритроциты, мужчины', range: '4,0–5,5 × 10¹²/л' },
  { parameter: 'Эритроциты, женщины', range: '3,5–5,0 × 10¹²/л' },
  { parameter: 'Лейкоциты', range: '4,0–9,0 × 10⁹/л' },
  { parameter: 'Тромбоциты', range: '150–400 × 10⁹/л' },
  { parameter: 'СОЭ, мужчины', range: 'до 10 мм/ч' },
  { parameter: 'СОЭ, женщины', range: 'до 15 мм/ч' },
]

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const ARTICLE_URL = '/articles/kakie-analizy-vkhodyat-v-chek-ap/'

const bloodFacts = [
  {
    icon: FlaskConical,
    title: 'Что смотрят',
    text: 'Гемоглобин, эритроциты, лейкоциты, тромбоциты и признаки воспаления.',
  },
  {
    icon: Clock3,
    title: 'Срок',
    text: 'Результат обычно готов за 1 к.д.',
  },
  {
    icon: CalendarDays,
    title: 'Цена',
    text: '270 ₽ за базовый анализ крови.',
  },
]

const relatedLinks = [
  {
    title: 'Каталог анализов',
    href: ANALYSES_URL,
    text: 'Вернуться к полному списку исследований.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Посмотреть готовые программы обследований.',
  },
  {
    title: 'Какие анализы входят в чек-ап',
    href: ARTICLE_URL,
    text: 'Понять, как врач собирает обследование под задачу.',
  },
]

export default function AnalizKroviContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'Анализ крови', href: '/analizy/analiz-krovi/' },
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
                Анализ крови в Самаре: виды, цены, запись онлайн или по телефону.
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                Сдать анализ крови можно в BIORISE быстро и без очередей. Результат базового исследования обычно готов за 1 день.
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
              {bloodFacts.map((item) => (
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
              Что обычно смотрят в анализе крови
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>Гемоглобин и эритроциты.</li>
              <li>Лейкоциты и лейкоцитарную формулу.</li>
              <li>Тромбоциты и СОЭ, если врач их назначает.</li>
              <li>Признаки воспаления, анемии и реакции на нагрузку.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Когда врач назначает
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>При усталости, слабости и частых простудах.</li>
              <li>Перед чек-апом и плановой проверкой здоровья.</li>
              <li>Когда нужно оценить воспаление или анемию.</li>
              <li>Для контроля лечения и динамики по анализам.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как подготовиться
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Для общего анализа крови специальная подготовка обычно не нужна. Лучше прийти отдохнувшим, без тяжелой тренировки накануне и с уведомлением о лекарствах, если вы их принимаете.
            </p>
          </div>

          <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-[26px] font-light leading-tight text-olive-primary sm:text-[28px]">
                Запись
              </h2>
            </div>

            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Записаться можно онлайн или по телефону. Если вам нужен не только общий анализ крови, посмотрите весь каталог и подберите нужный набор исследований.
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
          rows={referenceRows}
          note="Референсные значения могут немного отличаться в зависимости от лаборатории и используемого оборудования - ориентируйтесь на диапазон, указанный в бланке результата."
        />
        <AnalysisFaq items={faqItems} />
      </div>
    </div>
  )
}
