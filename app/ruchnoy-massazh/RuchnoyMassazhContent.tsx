'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useBookingModal } from '@/components/BookingModalProvider'

const singleSessions = [
  { duration: 60, price: 3500 },
  { duration: 90, price: 4500 },
  { duration: 120, price: 5500 },
]

const subscriptions = [
  {
    sessions: 5,
    saving: 'до 7 000 ₽',
    prices: [
      { duration: 60, price: 12000, oldPrice: 17500 },
      { duration: 90, price: 17500, oldPrice: 22500 },
      { duration: 120, price: 20500, oldPrice: 27500 },
    ],
  },
  {
    sessions: 10,
    saving: 'до 15 000 ₽',
    prices: [
      { duration: 60, price: 24000, oldPrice: 35000 },
      { duration: 90, price: 33000, oldPrice: 45000 },
      { duration: 120, price: 40000, oldPrice: 55000 },
    ],
  },
  {
    sessions: 15,
    saving: 'до 21 000 ₽',
    prices: [
      { duration: 60, price: 36000, oldPrice: 52500 },
      { duration: 90, price: 52500, oldPrice: 67500 },
      { duration: 120, price: 61500, oldPrice: 82500 },
    ],
  },
]

const benefits = [
  'Снимает напряжение и усталость',
  'Устраняет боли в спине и мышечные зажимы',
  'Улучшает кровообращение и обмен веществ',
  'Укрепляет иммунитет и повышает тонус организма',
]

const massageTypes = [
  {
    title: 'Медицинский массаж',
    text: 'Подходит при мышечном напряжении, дискомфорте в спине, шее и плечевом поясе. Специалист работает с зонами перегрузки аккуратно и последовательно.',
    icon: 'medical',
  },
  {
    title: 'Восстановительный массаж',
    text: 'Помогает вернуть ощущение легкости после стресса, сидячей работы, тренировок и общей усталости.',
    icon: 'recovery',
  },
  {
    title: 'Антицеллюлитный массаж',
    text: 'Направлен на улучшение микроциркуляции, тонуса кожи и качества тканей. Хорошо работает курсом.',
    icon: 'body',
  },
]

const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`

function MassageIcon({ type }: { type: string }) {
  const common = 'h-6 w-6'

  if (type === 'medical') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      </svg>
    )
  }

  if (type === 'recovery') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 14c3.2-7.5 11.8-7.5 16 0" />
        <path d="M7 16c2.3 3 7.6 4.1 11 0" />
        <path d="M12 5v3" />
        <path d="m8.8 6.2 1.5 2.6" />
        <path d="m15.2 6.2-1.5 2.6" />
      </svg>
    )
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 4c2.5 2.8 2.5 13.2 0 16" />
      <path d="M17 4c-2.5 2.8-2.5 13.2 0 16" />
      <path d="M9 8h6" />
      <path d="M8.5 12h7" />
      <path d="M9 16h6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function RuchnoyMassazhContent() {
  const { openBookingModal } = useBookingModal()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Ручной медицинский массаж',
    description:
      'Ручной, медицинский и антицеллюлитный массаж в клинике BIORISE в Самаре. Сеансы 60, 90 и 120 минут, абонементы на курс.',
    provider: {
      '@type': 'MedicalClinic',
      name: 'BIORISE',
      address: 'Самара',
      url: 'https://biorise-clinic.ru/ruchnoy-massazh',
    },
    offers: singleSessions.map((session) => ({
      '@type': 'Offer',
      name: `Ручной массаж ${session.duration} минут`,
      price: session.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    })),
  }

  return (
    <div className="overflow-hidden bg-beige-background pb-20 pt-28 text-olive-primary sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-12 overflow-hidden rounded-[34px] border border-olive-primary/12 bg-[#f6efe4] shadow-premium"
        >
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-olive-primary/12 blur-3xl" />

          <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-stretch">
            <div className="p-6 sm:p-9 lg:p-12">
              <span className="inline-flex rounded-full border border-olive-primary/20 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/75">
                Медицинский массаж
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
                Ручной массаж в Самаре
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-olive-primary/78 sm:text-xl">
                Профессиональный подход к вашему здоровью и комфорту: мягкая работа с напряжением, мышечными зажимами, усталостью и качеством тканей.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {singleSessions.map((session) => (
                  <div key={session.duration} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-[0.12em] text-olive-primary/50">Сеанс</span>
                    <strong className="mt-1 block text-2xl text-olive-primary">{session.duration} мин</strong>
                    <span className="mt-1 block text-sm font-semibold text-olive-primary/70">{formatPrice(session.price)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={openBookingModal}
                  className="rounded-full bg-olive-primary px-6 py-3 text-base font-medium text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
                >
                  Записаться на массаж
                </button>
                <a
                  href="#prices"
                  className="rounded-full border border-olive-primary/25 bg-white/80 px-6 py-3 text-base font-medium text-olive-primary transition-colors hover:bg-white"
                >
                  Смотреть стоимость
                </a>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
              <Image
                src="/services/apparatnyy-massazh/massage-2.jpg"
                alt="Ручной массаж в клинике BIORISE в Самаре"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-primary/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/35 bg-white/80 p-4 text-olive-primary shadow-premium backdrop-blur-md sm:left-auto sm:w-[320px]">
                <p className="text-sm font-semibold">Курс подбирается индивидуально</p>
                <p className="mt-1 text-sm leading-relaxed text-olive-primary/70">
                  Интенсивность, длительность и зоны работы специалист определяет после консультации.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-4 md:grid-cols-3"
        >
          {massageTypes.map((item) => (
            <article key={item.title} className="rounded-3xl border border-olive-primary/10 bg-white p-6 shadow-premium">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-olive-primary/10 text-olive-primary">
                <MassageIcon type={item.icon} />
              </div>
              <h2 className="text-2xl font-heading font-light text-olive-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-olive-primary/72 sm:text-base">{item.text}</p>
            </article>
          ))}
        </motion.section>

        <section className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[30px] border border-olive-primary/10 bg-white p-6 shadow-premium sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/50">Эффект курса</p>
            <h2 className="mt-3 text-3xl font-heading font-light text-olive-primary sm:text-4xl">Что даёт ручной массаж</h2>
            <div className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 rounded-2xl bg-beige-background/75 p-4 text-olive-primary/78">
                  <span className="text-olive-primary"><CheckIcon /></span>
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative overflow-hidden rounded-[30px] border border-white/70 bg-olive-primary p-6 text-white shadow-premium sm:p-8"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Подход BIORISE</p>
              <h2 className="mt-3 text-3xl font-heading font-light sm:text-4xl">Не просто расслабление</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78">
                Ручной массаж в клинике BIORISE рассматривается как часть восстановительной медицины: специалист учитывает жалобы, образ жизни, уровень нагрузки и противопоказания. Такой подход особенно важен при болях в спине, мышечных зажимах, отёчности и снижении общего тонуса.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {['Спина и шейно-воротниковая зона', 'Общий массаж тела', 'Антицеллюлитные протоколы', 'Курсовое восстановление'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm text-white/82">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="prices"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 rounded-[30px] border border-olive-primary/10 bg-white p-6 shadow-premium sm:p-8"
        >
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/50">Стоимость</p>
              <h2 className="mt-3 text-3xl font-heading font-light text-olive-primary sm:text-4xl">Разовые сеансы</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-olive-primary/68">
              Выберите длительность под задачу: короткий восстановительный сеанс, полноценная работа с несколькими зонами или глубокий расширенный протокол.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {singleSessions.map((session) => (
              <div key={session.duration} className="rounded-3xl border border-olive-primary/10 bg-beige-background/70 p-6">
                <span className="text-sm text-olive-primary/55">{session.duration} минут</span>
                <strong className="mt-2 block text-3xl text-olive-primary">{formatPrice(session.price)}</strong>
                <button
                  onClick={openBookingModal}
                  className="mt-5 w-full rounded-full bg-olive-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-olive-light"
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 rounded-[30px] border border-olive-primary/10 bg-[#f8f3ea] p-6 shadow-premium sm:p-8"
        >
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/50">Абонементы</p>
              <h2 className="mt-3 text-3xl font-heading font-light text-olive-primary sm:text-4xl">Курс массажа выгоднее</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-olive-primary/68">
              Абонемент удобен, если цель требует регулярной работы: восстановление после нагрузки, антицеллюлитный курс, коррекция мышечных зажимов.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {subscriptions.map((pack) => (
              <article key={pack.sessions} className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-[0.13em] text-olive-primary/50">Абонемент</span>
                    <h3 className="mt-1 text-3xl font-heading font-light text-olive-primary">{pack.sessions} сеансов</h3>
                  </div>
                  <span className="rounded-full bg-olive-primary/10 px-3 py-1 text-xs font-semibold text-olive-primary">{pack.saving}</span>
                </div>

                <div className="space-y-3">
                  {pack.prices.map((item) => (
                    <div key={`${pack.sessions}-${item.duration}`} className="rounded-2xl bg-beige-background/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-olive-primary">{item.duration} мин</span>
                        <div className="text-right">
                          <span className="block text-lg font-semibold text-olive-primary">{formatPrice(item.price)}</span>
                          <span className="text-xs text-olive-primary/45 line-through">{formatPrice(item.oldPrice)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-5 lg:grid-cols-[1fr_0.72fr]"
        >
          <div className="relative min-h-[300px] overflow-hidden rounded-[30px] shadow-premium">
            <Image
              src="/services/apparatnyy-massazh/massage-3.jpg"
              alt="Кабинет массажа BIORISE"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-primary/55 via-transparent to-transparent" />
          </div>
          <div className="rounded-[30px] border border-olive-primary/10 bg-white p-6 shadow-premium sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive-primary/50">Важно</p>
            <h2 className="mt-3 text-3xl font-heading font-light text-olive-primary">Перед процедурой</h2>
            <p className="mt-4 text-base leading-relaxed text-olive-primary/72">
              Имеются противопоказания. Необходима консультация специалиста. Если есть хронические заболевания, выраженные боли, травмы, беременность или недавние операции, сообщите об этом до начала сеанса.
            </p>
            <button
              onClick={openBookingModal}
              className="mt-7 rounded-full bg-olive-primary px-6 py-3 text-base font-medium text-white shadow-premium transition hover:bg-olive-light"
            >
              Получить консультацию
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
