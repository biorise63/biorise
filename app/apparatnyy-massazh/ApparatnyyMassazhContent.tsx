'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'

const benefits = [
  {
    title: 'Точечная работа с зонами',
    description:
      'Специалист работает с конкретной зоной и держит нагрузку под контролем.',
  },
  {
    title: 'Комфортный формат курса',
    description:
      'Курс и интенсивность подбирают под вашу задачу и переносимость процедуры.',
  },
  {
    title: 'Поддержка тонуса тела',
    description:
      'После курса тело чувствует себя легче, а кожа выглядит ровнее.',
  },
]

const galleryImages = [
  '/services/apparatnyy-massazh/massage-1.jpg',
  '/services/apparatnyy-massazh/massage-2.jpg',
  '/services/apparatnyy-massazh/massage-3.jpg',
  '/services/apparatnyy-massazh/massage-4.jpg',
]

export default function ApparatnyyMassazhContent() {
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
            { name: 'Аппаратный массаж', href: '/apparatnyy-massazh/' },
          ]}
        />
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 overflow-hidden rounded-3xl border border-olive-primary/15 bg-gradient-to-br from-beige-background to-white shadow-premium"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-10">
              <span className="inline-flex rounded-full border border-olive-primary/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-olive-primary">
                Новая услуга
              </span>
              <h1 className="mt-4 text-4xl font-heading font-light text-olive-primary sm:text-5xl md:text-6xl">
                Аппаратный массаж
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-olive-primary/80 sm:text-lg">
                Аппаратный массаж помогает убрать отёчность, проработать проблемные зоны и вернуть телу тонус. Специалист подбирает курс под вашу задачу, а не по общей схеме.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={openBookingModal}
                  className="rounded-full bg-olive-primary px-6 py-3 text-base font-medium text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
                >
                  Записаться на процедуру
                </button>
                <a
                  href="/docs/apparatnyy-massazh-price.xlsx"
                  download
                  className="rounded-full border border-olive-primary/25 bg-white px-6 py-3 text-base font-medium text-olive-primary transition-colors hover:bg-beige-background"
                >
                  Скачать полный прайс
                </a>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-full">
              <Image
                src="/services/apparatnyy-massazh/massage-1.jpg"
                alt="Аппаратный массаж в клинике BIORISE"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {benefits.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-olive-primary/10 bg-white p-6 shadow-premium"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-olive-primary/10 text-olive-primary">
                <span className="text-sm font-semibold">{index + 1}</span>
              </div>
              <h2 className="text-2xl font-heading text-olive-primary">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-olive-primary/75 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-olive-primary/15 bg-white p-4 shadow-premium sm:p-6"
        >
          <h2 className="mb-5 text-3xl font-heading font-light text-olive-primary sm:text-4xl">
            Галерея процедуры
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {galleryImages.map((src, idx) => (
              <div
                key={src}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`Аппаратный массаж BIORISE фото ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
