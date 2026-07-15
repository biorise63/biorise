'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'
import { CheckCircle2, Droplets, Leaf, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Sparkles,
    text: 'Эффективное удаление нежелательных волос',
  },
  {
    icon: Leaf,
    text: 'Безболезненная процедура и комфорт',
  },
  {
    icon: Droplets,
    text: 'Длительный результат после курса процедур',
  },
  {
    icon: ShieldCheck,
    text: 'Индивидуальный подход и безопасное оборудование',
  },
]

const packages = [
  {
    title: 'Пакет №1',
    zones: 'Бикини глубокое с перианальной зоной + подмышки',
    price: '1 700 ₽',
  },
  {
    title: 'Пакет №2',
    zones: 'Голени + бикини глубокое с перианальной зоной + подмышки',
    price: '3 300 ₽',
  },
  {
    title: 'Пакет №3',
    zones:
      'Ноги полностью + глубокое бикини с перианальной зоной + подмышки + дорожка + подбородок + верхняя губа',
    price: '5 500 ₽',
  },
]

export default function LazernayaEpilyatsiyaContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="container mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Лазерная эпиляция', href: '/lazernaya-epilyatsiya/' },
          ]}
        />
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 overflow-hidden rounded-3xl border border-olive-primary/15 bg-gradient-to-br from-white to-beige-background shadow-premium"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            <div className="p-6 sm:p-8 md:p-10">
              <h1 className="text-4xl font-heading font-light text-olive-primary sm:text-5xl md:text-6xl">
                Лазерная эпиляция
              </h1>
              <p className="mt-4 text-2xl font-heading text-olive-light sm:text-3xl">
                Гладкая кожа надолго
              </p>

              <ul className="mt-7 space-y-4">
                {benefits.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm leading-relaxed text-olive-primary/85 sm:text-base">
                        {item.text}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={openBookingModal}
                  className="rounded-full bg-olive-primary px-6 py-3 text-base font-medium text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
                >
                  Записаться
                </button>
                <a
                  href="#laser-packages"
                  className="rounded-full border border-olive-primary/25 bg-white px-6 py-3 text-base font-medium text-olive-primary transition-colors hover:bg-beige-background"
                >
                  Посмотреть пакеты
                </a>
              </div>
            </div>

            <div className="relative min-h-[360px] lg:min-h-full">
              <Image
                src="/services/lazernaya-epilyatsiya/laser-main.jpg"
                alt="Лазерная эпиляция BIORISE"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>

        <motion.section
          id="laser-packages"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="mb-5 text-3xl font-heading font-light text-olive-primary sm:text-4xl">
            Пакеты лазерной эпиляции
          </h2>
          <div className="space-y-4">
            {packages.map((pkg, idx) => (
              <article
                key={pkg.title}
                className="rounded-2xl border border-olive-primary/15 bg-white p-4 shadow-premium sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-olive-primary text-xl font-semibold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading text-olive-primary">
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-olive-primary/80 sm:text-base">
                        {pkg.zones}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center rounded-xl bg-olive-primary px-4 py-2 text-2xl font-semibold text-white">
                    {pkg.price}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-olive-primary/15 bg-white/90 p-5 sm:p-7"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive-primary" />
            <p className="text-sm leading-relaxed text-olive-primary/80 sm:text-base">
              Мы выбираем главное — безопасность и здоровье наших пациентов.
              Перед курсом специалист подбирает параметры процедуры
              индивидуально по фототипу кожи и зоне обработки.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
