'use client'

import { motion } from 'framer-motion'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'

const analysisCategories = [
  {
    title: 'Витаминный чек-ап',
    description: 'Показывает, хватает ли вам витаминов и микроэлементов, когда силы на нуле или иммунитет просел.',
    icon: 'spark',
  },
  {
    title: 'Гормональный профиль',
    description: 'Помогает разобраться с весом, циклом, настроением и скачками энергии.',
    icon: 'hormone',
  },
  {
    title: 'Базовый check-up',
    description: 'Набор анализов для ежегодной проверки без лишних исследований.',
    icon: 'shield',
  },
]

const basicAnalyses = [
  {
    code: '5',
    name: 'Общий анализ крови (ОАК)',
    category: 'Базовые анализы',
    turnaround: '1 к.д.',
    price: '270 ₽',
  },
  {
    code: '16',
    name: 'Глюкоза',
    category: 'Базовые анализы',
    turnaround: '1 к.д.',
    price: '190 ₽',
  },
  {
    code: '51',
    name: 'Ферритин',
    category: 'Дефициты',
    turnaround: '1 р.д.',
    price: '520 ₽',
  },
  {
    code: '56',
    name: 'Тиреотропный гормон (ТТГ)',
    category: 'Щитовидная железа',
    turnaround: '1 к.д.',
    price: '430 ₽',
  },
  {
    code: '928',
    name: '25-OH витамин D общий',
    category: 'Витаминный статус',
    turnaround: '1 к.д.',
    price: '2 065 ₽',
  },
  {
    code: '1317B12',
    name: 'Активный витамин B12',
    category: 'Витаминный статус',
    turnaround: 'до 4 к.д.',
    price: '1 520 ₽',
  },
]

const popularCheckups = [
  {
    code: 'ОБС156',
    name: 'Витамин D и минеральный обмен',
    description: 'Комплекс для оценки витаминного статуса и минералов.',
    price: '3 130 ₽',
  },
  {
    code: 'ОБС103',
    name: 'Гемостазиограмма (коагулограмма), скрининг',
    description: 'Базовая проверка свертывающей системы крови.',
    price: '1 000 ₽',
  },
  {
    code: 'ОБС89',
    name: 'Здоровый ребенок: комплекс 0-14 лет',
    description: 'Базовый скрининг для оценки здоровья ребенка.',
    price: '890 ₽',
  },
]

function CategoryIcon({ icon }: { icon: string }) {
  if (icon === 'spark') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3 14.4 8.1 20 10.5l-5.1 2.4L12.5 18l-2.4-5.1L5 10.5l5.1-2.4L12 3Z" />
      </svg>
    )
  }
  if (icon === 'hormone') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 7a3 3 0 1 1 6 0v2.5a3.5 3.5 0 1 1-2 3.16V7a1 1 0 1 0-2 0v10a3 3 0 1 1-2-2.83V7Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 14a3 3 0 1 1 6 0v3a3 3 0 1 1-2-2.83V14a1 1 0 1 0-2 0v.5" />
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3 4 7v5c0 5 3.4 7.9 8 9 4.6-1.1 8-4 8-9V7l-8-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m9 12 2 2 4-4" />
    </svg>
  )
}

export default function AnalizyContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div
      className="pb-20"
      style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Анализы и чек-апы', href: '/analizy/' },
          ]}
        />
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-olive-primary/20 bg-beige-background px-4 py-1.5 text-sm text-olive-primary/80">
                Услуга BIORISE
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-heading font-light text-olive-primary leading-tight">
                Анализы и check-up программы
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-olive-primary/80">
                Сдайте анализы без лишних назначений. Мы собрали исследования и чек-апы, с которых пациенты чаще всего начинают проверку здоровья.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={openBookingModal}
                  className="bg-olive-primary text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-0.5"
                >
                  Записаться онлайн
                </button>
                <a
                  href="/docs/prajs-analizy.csv"
                  download="Прайс Анализы.csv"
                  className="inline-flex items-center gap-2 border border-olive-primary/25 text-olive-primary px-6 py-3.5 rounded-full hover:bg-olive-primary/5 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10 5 5 5-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3" />
                  </svg>
                  Скачать прайс
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/analizy/analizy-1.jpg"
                alt="Лабораторная диагностика"
                className="rounded-2xl object-cover h-44 sm:h-56 w-full shadow-premium"
              />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/analizy/analizy-2.jpg"
                alt="Пробирки для анализов"
                className="rounded-2xl object-cover h-44 sm:h-56 w-full shadow-premium"
              />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/analizy/analizy-3.jpg"
                alt="Забор крови"
                className="rounded-2xl object-cover h-52 sm:h-64 w-full shadow-premium col-span-2"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {analysisCategories.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-olive-primary/15 bg-white p-6 shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-olive-primary/10 text-olive-primary flex items-center justify-center mb-4 group-hover:bg-olive-primary group-hover:text-white transition-colors">
                  <CategoryIcon icon={item.icon} />
                </div>
                <h3 className="text-xl font-heading text-olive-primary mb-2">{item.title}</h3>
                <p className="text-olive-primary/75 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mb-12"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading text-olive-primary">Популярные чек-апы</h2>
                <p className="mt-1 text-sm text-olive-primary/70 sm:text-base">Комплексы, которые пациенты выбирают чаще всего.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularCheckups.map((item, index) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.28 + index * 0.05 }}
                  className="rounded-2xl border border-olive-primary/15 bg-white p-5 shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="text-xs text-olive-primary/60 mb-2">Код: {item.code}</p>
                  <h3 className="text-base font-semibold text-olive-primary leading-snug mb-2">{item.name}</h3>
                  <p className="text-sm text-olive-primary/75 leading-relaxed mb-4">{item.description}</p>
                  <div className="text-xl font-bold text-olive-primary">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-olive-primary/20 shadow-premium overflow-hidden">
            <div className="bg-gradient-to-r from-olive-primary/10 to-olive-primary/5 border-b border-olive-primary/20 p-5 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-heading text-olive-primary mb-2">Базовые популярные анализы</h2>
              <p className="text-sm text-olive-primary/70 sm:text-base">Анализы, с которых чаще всего начинают проверку.</p>
            </div>
            <div className="divide-y divide-olive-primary/10">
              {basicAnalyses.map((item, index) => (
                <motion.div
                  key={`${item.code}-${item.name}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.28 + index * 0.04 }}
                  className="grid grid-cols-12 gap-4 px-5 py-5 sm:px-6 group hover:bg-olive-primary/5 transition-colors"
                >
                  <div className="col-span-12 md:col-span-6 lg:col-span-7">
                    <p className="text-xs text-olive-primary/60 mb-1">Код: {item.code} • {item.category}</p>
                    <h3 className="text-base sm:text-lg text-olive-primary font-semibold leading-snug group-hover:text-olive-light transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <div className="col-span-6 md:col-span-3 lg:col-span-2 flex items-center md:justify-center">
                    <span className="text-sm sm:text-base text-olive-primary/80">{item.turnaround}</span>
                  </div>
                  <div className="col-span-6 md:col-span-3 lg:col-span-3 flex items-center justify-end md:justify-center">
                    <span className="text-lg sm:text-xl text-olive-primary font-bold">{item.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={openBookingModal}
            className="bg-olive-primary text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1"
          >
            Записаться онлайн
          </button>
        </motion.section>
      </div>
    </div>
  )
}
