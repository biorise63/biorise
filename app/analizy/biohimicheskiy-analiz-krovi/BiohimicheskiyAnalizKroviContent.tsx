"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, BookOpen, Clock3, FlaskConical, PhoneCall, ShieldCheck } from 'lucide-react'

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const FATIGUE_ARTICLE_URL = '/articles/analizy-pri-khronicheskoy-ustalosti/'
const LIVER_CHECKUP_ARTICLE_URL = '/articles/chek-ap-pecheni/'

const bloodFacts = [
  {
    icon: FlaskConical,
    title: 'Что смотрят',
    text: 'АЛТ, АСТ, билирубин, креатинин, мочевину, общий белок и глюкозу.',
  },
  {
    icon: Clock3,
    title: 'Срок',
    text: 'Срок зависит от набора показателей.',
  },
  {
    icon: ShieldCheck,
    title: 'Подготовка',
    text: 'Кровь обычно сдают натощак, если врач не сказал иначе.',
  },
]

const relatedLinks = [
  {
    title: 'Каталог анализов',
    href: ANALYSES_URL,
    text: 'Открыть весь список исследований.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Посмотреть готовые программы обследований.',
  },
  {
    title: 'Чек-ап печени',
    href: LIVER_CHECKUP_ARTICLE_URL,
    text: 'Разобрать, когда биохимии уже мало.',
  },
  {
    title: 'Анализы при хронической усталости',
    href: FATIGUE_ARTICLE_URL,
    text: 'Понять, какие показатели обычно смотрят сначала.',
  },
]

export default function BiohimicheskiyAnalizKroviContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'Биохимический анализ крови', href: '/analizy/biohimicheskiy-analiz-krovi/' },
          ]}
        />

        <section className="mt-4 overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-beige-background/70">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
            <div className="max-w-[760px]">
              <Link
                href={ANALYSES_URL}
                className="inline-flex items-center gap-2 text-sm font-medium text-olive-primary/68 transition-colors hover:text-olive-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                К анализам
              </Link>

              <h1 className="mt-4 text-[38px] font-light leading-[1.05] text-olive-primary sm:text-[42px] lg:text-[48px]">
                Биохимический анализ крови в Самаре
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-primary/78 sm:text-[18px]">
                Сдать биохимический анализ крови в BIORISE можно без очередей. Врач подскажет, какие показатели нужны под вашу задачу.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-olive-primary/74">
                Если жалобы связаны с усталостью, лишним весом или нагрузкой на печень, врач часто начинает с биохимии. Подробный разбор есть в статье про{' '}
                <Link href={FATIGUE_ARTICLE_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                  анализы при хронической усталости
                </Link>
                .
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
                      <p className="mt-1 text-sm leading-relaxed text-olive-primary/68">{item.text}</p>
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
              Что обычно смотрят
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-olive-primary/78">
              В базовой биохимии врач чаще смотрит АЛТ, АСТ, билирубин, креатинин, мочевину, общий белок, глюкозу и липидный профиль.
            </p>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Когда назначают
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-primary/78">
              <li>При усталости и слабости.</li>
              <li>При жалобах на печень, почки или обмен веществ.</li>
              <li>Перед чек-апом и плановой проверкой здоровья.</li>
              <li>Если врач хочет уточнить изменения по анализам.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как подготовиться
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-primary/78">
              Обычно кровь сдают утром натощак. Воду пить можно. Если вы принимаете лекарства, скажите об этом врачу заранее.
            </p>
          </div>

          <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-[26px] font-light leading-tight text-olive-primary sm:text-[28px]">
                Что еще посмотреть
              </h2>
            </div>

            <p className="mt-4 text-[16px] leading-[1.7] text-olive-primary/78">
              Если вам нужен не один анализ, откройте каталог или соберите готовый чек-ап.
            </p>

            <div className="mt-6 space-y-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-[1.25rem] border border-olive-primary/10 bg-white px-4 py-4 transition-colors hover:border-olive-primary/20 hover:bg-white/90"
                >
                  <div className="text-base font-medium text-olive-primary">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-olive-primary/68">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
