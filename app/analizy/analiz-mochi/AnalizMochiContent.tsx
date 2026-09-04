"use client"

import Link from 'next/link'
import { useBookingModal } from '@/components/BookingModalProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowLeft, CalendarDays, Clock3, FlaskConical, PhoneCall } from 'lucide-react'
import { allAnalyses } from '@/lib/analyses'
import ReferenceRangeTable from '@/components/analizy/ReferenceRangeTable'
import AnalysisFaq from '@/components/analizy/AnalysisFaq'
import { faqItems } from './faq'

const referenceRows = [
  { parameter: 'Цвет', range: 'соломенно-жёлтый' },
  { parameter: 'Прозрачность', range: 'прозрачная' },
  { parameter: 'Плотность', range: '1,010–1,025' },
  { parameter: 'pH', range: '5,0–7,0' },
  { parameter: 'Белок', range: 'отсутствует или следы' },
  { parameter: 'Глюкоза', range: 'отсутствует' },
  { parameter: 'Лейкоциты, мужчины', range: '0–3 в поле зрения' },
  { parameter: 'Лейкоциты, женщины', range: '0–6 в поле зрения' },
  { parameter: 'Эритроциты', range: '0–2 в поле зрения' },
  { parameter: 'Бактерии, соли', range: 'отсутствуют' },
]

const PHONE_HREF = 'tel:+79967499747'
const ANALYSES_URL = '/analizy/'
const CHECKUPS_URL = '/chek-apy/'
const BLOOD_ANALYSIS_URL = '/analizy/analiz-krovi/'
const ARTICLES_URL = '/articles/analizy-pri-khronicheskoy-ustalosti/'

const urineAnalysis = allAnalyses.find((item) => item.code === '116')

const facts = [
  {
    icon: FlaskConical,
    title: 'Что смотрят',
    text: 'Белок, лейкоциты, эритроциты, бактерии, соли и плотность мочи.',
  },
  {
    icon: Clock3,
    title: 'Срок',
    text: urineAnalysis?.turnaround || 'Результат обычно готов за 1 к.д.',
  },
  {
    icon: CalendarDays,
    title: 'Цена',
    text: urineAnalysis?.price || 'Уточняйте у администратора.',
  },
]

const relatedLinks = [
  {
    title: 'Каталог анализов',
    href: ANALYSES_URL,
    text: 'Открыть весь список исследований.',
  },
  {
    title: 'Общий анализ крови',
    href: BLOOD_ANALYSIS_URL,
    text: 'Сравнить результат с базовым исследованием крови.',
  },
  {
    title: 'Чек-апы',
    href: CHECKUPS_URL,
    text: 'Посмотреть готовые программы обследований.',
  },
  {
    title: 'Анализы при хронической усталости',
    href: ARTICLES_URL,
    text: 'Разобрать, какие показатели врач смотрит вместе с симптомами.',
  },
]

export default function AnalizMochiContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы', href: ANALYSES_URL },
            { name: 'Анализ мочи', href: '/analizy/analiz-mochi/' },
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
                Анализ мочи в Самаре
              </h1>

              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                Общий анализ мочи помогает увидеть воспаление, работу почек и мочевыводящих путей, а также признаки потери белка или крови. В BIORISE результат обычно готов за 1 к.д.
              </p>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-olive-text">
                Если в результате есть белок, лейкоциты или кровь, врач обычно сопоставляет его с{' '}
                <Link href={BLOOD_ANALYSIS_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                  общим анализом крови
                </Link>{' '}
                и оценивает, нужен ли{' '}
                <Link href={CHECKUPS_URL} className="font-medium text-olive-primary underline underline-offset-4 transition-colors hover:text-olive-light">
                  чек-ап
                </Link>{' '}
                или другой анализ.
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
              Что обычно смотрят в анализе мочи
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>Белок и глюкозу.</li>
              <li>Лейкоциты, эритроциты и бактерии.</li>
              <li>Соли, плотность и кислотность.</li>
              <li>Признаки воспаления и нагрузки на почки.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Когда врач назначает
            </h2>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.7] text-olive-text">
              <li>При боли в пояснице, отеках или изменении мочеиспускания.</li>
              <li>Перед чек-апом и плановой проверкой здоровья.</li>
              <li>Когда нужно понять, есть ли воспаление или потеря белка.</li>
              <li>Для контроля лечения и динамики по анализам.</li>
            </ul>

            <h2 className="mt-10 text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">
              Как подготовиться
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-olive-text">
              Для общего анализа мочи обычно берут утреннюю порцию в стерильный контейнер. Перед сбором соблюдают обычную гигиену, а о лекарствах и менструации лучше заранее сказать врачу или администратору.
            </p>
          </div>

          <div className="rounded-[2rem] border border-olive-primary/10 bg-beige-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-[26px] font-light leading-tight text-olive-primary sm:text-[28px]">
                Что еще посмотреть
              </h2>
            </div>

            <p className="mt-4 text-[16px] leading-[1.7] text-olive-text">
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
                  <p className="mt-1 text-sm leading-relaxed text-olive-primary">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ReferenceRangeTable
          rows={referenceRows}
          note="Референсные значения приведены для взрослых и могут отличаться в зависимости от лаборатории - ориентируйтесь на диапазон, указанный в бланке результата."
        />
        <AnalysisFaq items={faqItems} />
      </div>
    </div>
  )
}
