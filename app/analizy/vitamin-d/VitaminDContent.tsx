"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, CalendarDays, Clock3, FlaskConical, PhoneCall, ShieldCheck } from 'lucide-react'
import { allAnalyses } from '@/lib/analyses'
import ReferenceRangeTable from '@/components/analizy/ReferenceRangeTable'
import AnalysisFaq from '@/components/analizy/AnalysisFaq'
import { faqItems } from './faq'

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const BIOCHEMISTRY_URL = '/analizy/biohimicheskiy-analiz-krovi/'
const VITAMIN_DRIP_URL = '/kapelnicy/vitaminnaya/'
const VITAMIN_D_ARTICLE_URL = '/articles/analiz-na-vitamin-d-kogda-i-zachem-sdavat/'

const vitaminDAnalysis = allAnalyses.find((item) => item.code === '928')

const referenceRows = [
  { parameter: 'Дефицит', range: 'менее 20 нг/мл' },
  { parameter: 'Недостаточность', range: '20–29 нг/мл' },
  { parameter: 'Норма', range: '30–100 нг/мл' },
  { parameter: 'Избыток', range: 'более 100 нг/мл' },
]

const facts = [
  {
    icon: FlaskConical,
    title: 'Что показывает',
    text: 'Уровень 25-OH витамина D, основной показатель обеспеченности организма витамином D.',
  },
  {
    icon: Clock3,
    title: 'Срок',
    text: vitaminDAnalysis?.turnaround || '1 р.д.',
  },
  {
    icon: CalendarDays,
    title: 'Цена',
    text: vitaminDAnalysis?.price || '2 065 ₽',
  },
]

const relatedLinks = [
  {
    title: 'Каталог анализов',
    href: ANALYSES_URL,
    text: 'Открыть полный список лабораторных исследований.',
  },
  {
    title: 'Биохимический анализ крови',
    href: BIOCHEMISTRY_URL,
    text: 'Посмотреть более широкий обмен веществ вместе с витамином D.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Выбрать готовую программу обследования под задачу.',
  },
  {
    title: 'Анализ на витамин Д: когда и зачем сдавать',
    href: VITAMIN_D_ARTICLE_URL,
    text: 'Разобрать, кому и по каким жалобам обычно назначают этот анализ.',
  },
]

export default function VitaminDContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'Витамин Д', href: '/analizy/vitamin-d/' },
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
                Анализ витамина Д в Самаре
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                Анализ на витамин Д показывает, достаточно ли в организме этого витамина. Его часто назначают при усталости, частых простудах, боли в костях и мышцах, а также при малом пребывании на солнце.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-olive-text">
                Врач обычно оценивает результат вместе с{' '}
                <Link href={BIOCHEMISTRY_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                  биохимическим анализом крови
                </Link>
                , жалобами и образом жизни. Один показатель без контекста не всегда даёт полную картину.
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
              Когда проверяют витамин Д
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>При постоянной усталости, слабости и снижении работоспособности.</li>
              <li>При частых простудах и медленном восстановлении после болезни.</li>
              <li>При боли в костях и мышцах, судорогах.</li>
              <li>При малом пребывании на солнце, ограничениях в питании или возрасте старше 50 лет.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Почему витамин Д не оценивают отдельно
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Обмен витамина D связан с кальцием, фосфором и работой паращитовидных желёз. Поэтому врач сопоставляет результат с другими показателями, а не делает вывод по одной цифре.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
              Если нужен более широкий взгляд на обмен веществ, врач может добавить{' '}
              <Link href={BIOCHEMISTRY_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                биохимический анализ крови
              </Link>{' '}
              или подобрать готовый чек-ап.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как подготовиться
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Кровь на витамин Д обычно сдают в течение дня, специальной подготовки чаще не требуется. Если вы принимаете витаминные комплексы или препараты кальция, стоит заранее сообщить об этом врачу.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Что делать при низком уровне витамина Д
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Тактика зависит от степени дефицита, сопутствующих заболеваний и жалоб. Врач может предложить схему приёма препаратов или, при показаниях, обсудить{' '}
              <Link href={VITAMIN_DRIP_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                капельницу с витаминами
              </Link>{' '}
              как часть поддержки в дополнение к основной схеме.
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
              Записаться на анализ витамина Д можно онлайн или по телефону. Если есть жалобы, удобнее обсудить с врачом, какие показатели стоит сдать вместе.
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
                    Низкий витамин Д не равен автоматическому назначению капельницы или высоких доз добавок. Тактику подбирает врач после оценки анализов, жалоб и противопоказаний.
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
          rows={referenceRows}
          note="Пороговые значения приведены по распространённой классификации и могут немного отличаться между лабораториями - ориентируйтесь на диапазон, указанный в бланке результата."
        />
        <AnalysisFaq items={faqItems} />
      </div>
    </div>
  )
}
