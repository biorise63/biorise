"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, CalendarDays, Clock3, FlaskConical, PhoneCall, ShieldCheck } from 'lucide-react'
import { allAnalyses } from '@/lib/analyses'

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const BLOOD_ANALYSIS_URL = '/analizy/analiz-krovi/'
const BIOCHEMISTRY_URL = '/analizy/biohimicheskiy-analiz-krovi/'
const IRON_DRIP_URL = '/kapelnicy/zhelezo-standart/'
const LOW_FERRITIN_ARTICLE_URL = '/articles/kapelnitsa-zheleza-pri-nizkom-ferritine/'
const FATIGUE_ARTICLE_URL = '/articles/analizy-pri-khronicheskoy-ustalosti/'

const ferritinAnalysis = allAnalyses.find((item) => item.code === '51')

const facts = [
  {
    icon: FlaskConical,
    title: 'Что показывает',
    text: 'Ферритин помогает оценить запасы железа в организме.',
  },
  {
    icon: Clock3,
    title: 'Срок',
    text: ferritinAnalysis?.turnaround || '1 р.д.',
  },
  {
    icon: CalendarDays,
    title: 'Цена',
    text: ferritinAnalysis?.price || '520 ₽',
  },
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
    text: 'Посмотреть базовый анализ, который часто оценивают вместе с ферритином.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Выбрать готовую программу обследования под задачу.',
  },
  {
    title: 'Капельница железа при низком ферритине',
    href: LOW_FERRITIN_ARTICLE_URL,
    text: 'Разобрать, когда врач может обсуждать внутривенное железо.',
  },
]

export default function FerritinContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'Ферритин', href: '/analizy/ferritin/' },
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
                Ферритин в Самаре
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                Анализ на ферритин помогает оценить запас железа. Его часто назначают при усталости, выпадении волос, снижении выносливости, обильных менструациях и подозрении на железодефицит.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-olive-text">
                Врач обычно смотрит ферритин вместе с{' '}
                <Link href={BLOOD_ANALYSIS_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                  общим анализом крови
                </Link>
                , показателями обмена железа и жалобами. Один ферритин без контекста не всегда показывает полную картину.
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
              Когда проверяют ферритин
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>При постоянной усталости, слабости и снижении работоспособности.</li>
              <li>При выпадении волос, ломкости ногтей, сухости кожи.</li>
              <li>При подозрении на дефицит железа или анемию.</li>
              <li>При обильных менструациях, ограничительном питании или восстановлении после кровопотери.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Почему ферритин не оценивают отдельно
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Ферритин может меняться при воспалении и некоторых хронических состояниях. Поэтому врач сопоставляет результат с гемоглобином, С-реактивным белком, трансферрином, сывороточным железом и симптомами.
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
              Кровь на ферритин обычно сдают утром. Если вы принимаете препараты железа, витамины, противовоспалительные средства или проходили лечение недавно, лучше заранее сообщить об этом врачу.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Что делать при низком ферритине
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Тактика зависит от уровня ферритина, гемоглобина, причины дефицита и переносимости препаратов. Иногда достаточно таблеток железа, а в отдельных случаях врач может обсуждать{' '}
              <Link href={IRON_DRIP_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                капельницу железа
              </Link>
              .
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
              Записаться на ферритин можно онлайн или по телефону. Если есть жалобы, удобнее обсудить с врачом, какие показатели стоит сдать вместе.
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
                    Низкий ферритин не равен автоматическому назначению капельницы. Решение принимает врач после оценки анализов, жалоб и противопоказаний.
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
              <Link
                href={FATIGUE_ARTICLE_URL}
                className="block rounded-[1.25rem] border border-olive-primary/10 bg-white px-4 py-4 transition-colors hover:border-olive-primary/20 hover:bg-white/90"
              >
                <div className="text-base font-medium text-olive-primary">Анализы при хронической усталости</div>
                <p className="mt-1 text-sm leading-relaxed text-olive-primary">
                  Посмотреть, какие показатели врач часто проверяет при слабости и снижении энергии.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
