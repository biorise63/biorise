'use client'

import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'
import { CircularGallery, GalleryItem } from './ui/circular-gallery'

const galleryData: GalleryItem[] = [
  {
    common: 'Розыгрыш в честь открытия',
    binomial: 'Призовой фонд 250 000 ₽',
    photo: {
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
      text: 'Врач в светлой клинике',
      by: 'BIORISE: репост и участие',
    },
  },
  {
    common: 'Расширенный витаминный анализ',
    binomial: '2 500 ₽ вместо 5 790 ₽',
    photo: {
      url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&auto=format&fit=crop&q=80',
      text: 'Лабораторная диагностика',
      by: 'Комплекс витаминов и микроэлементов',
    },
  },
  {
    common: 'Программа детокс',
    binomial: 'Индивидуальные протоколы',
    photo: {
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80',
      text: 'Капельница и мониторинг',
      by: 'Под контролем врача',
    },
  },
  {
    common: 'Чек-ап перед курсом',
    binomial: 'Точная диагностика дефицитов',
    photo: {
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
      text: 'Современная диагностика',
      by: 'Персональный план восстановления',
    },
  },
  {
    common: 'Скидки для участников',
    binomial: 'До 50% на отдельные программы',
    photo: {
      url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&auto=format&fit=crop&q=80',
      text: 'Премиальный медицинский сервис',
      by: 'Акции и спецпредложения',
    },
  },
]

export default function ClinicGallery() {
  return (
    <section id="gallery" className="section-spacing bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-olive-primary">
              {getIcon('promotion')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary font-light">
              Акции
            </h2>
          </div>
        </motion.div>

        <div className="relative h-[180vh] w-full">
          <div className="sticky top-24 h-[78vh] overflow-hidden rounded-3xl border border-olive-primary/15 bg-beige-background/60">
            <div className="absolute inset-x-0 top-6 z-10 px-6 text-center">
              <p className="text-sm text-olive-primary/70 md:text-base">
                Прокручивайте страницу — галерея акций вращается в 3D
              </p>
            </div>
            <CircularGallery items={galleryData} radius={420} autoRotateSpeed={0.03} />
          </div>
        </div>
      </div>
    </section>
  )
}
