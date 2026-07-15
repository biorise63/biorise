'use client'

import { motion } from 'framer-motion'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'

const spravkiData = [
  {
    name: 'Справка № 182н',
    description: 'Медицинская справка установленной формы',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Форма рецептурного бланка №107-1/у',
    description: 'Рецептурный бланк для получения лекарственных препаратов',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Справка №086/у',
    description: 'Медицинское заключение для работы, учебы, водительского удостоверения',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'МЕДИЦИНСКОЕ ЗАКЛЮЧЕНИЕ форма № 315/у',
    description: 'Медицинское заключение установленной формы',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Справка № 405',
    description: 'Медицинская справка установленной формы',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'ВРАЧЕБНОЕ ЗАКЛЮЧЕНИЕ форма № 084/у',
    description: 'Врачебное заключение для различных целей',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Паспорт здоровья Учетная форма № 025 /у-ГС',
    description: 'Паспорт здоровья для прохождения медицинских осмотров',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Заключение Учетная форма № 001-ГС/у',
    description: 'Медицинское заключение установленной формы',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Медицинское заключение №1144н о допуске спортсменов спортивной команды к участия в спортивном мероприятии',
    description: 'Медицинское заключение для участия в спортивных мероприятиях',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Медицинское заключение №1144н о допуске к участию в физкультурных и спортивных мероприятиях (учебно-тренировочных мероприятиях и спортивных соревнованиях), мероприятиях по оценке выполнения нормативов испытаний (тестов) Всероссийского физкультурно-спортивного комплекса "Готов к труду и обороне" (ГТО)',
    description: 'Медицинское заключение для участия в физкультурных и спортивных мероприятиях, ГТО',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'РЕЦЕПТУРНЫЙ БЛАНК Форма № 148-1/у-88',
    description: 'Рецептурный бланк для получения лекарственных препаратов',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'СПРАВКА Форма № 095/у',
    description: 'Справка о временной нетрудоспособности',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'МЕДИЦИНСКАЯ СПРАВКА форма №083/У-89',
    description: 'Медицинская справка для водителей',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Корешок к медицинской справке 082/у',
    description: 'Корешок к медицинской справке для выезда за границу',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'ЗАКЛЮЧЕНИЕ по результатам предварительного (периодического) медицинского осмотра (обследования)',
    description: 'Медицинское заключение по результатам профосмотра',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Карта учета диспансеризации (профилактических медицинских осмотров) Учетная форма № 131/у',
    description: 'Карта учета диспансеризации и профилактических медицинских осмотров',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'Справка для получения путевки Форма № 070/у-04',
    description: 'Медицинская справка для получения санаторно-курортной путевки',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
  {
    name: 'САНАТОРНО-КУРОРТНАЯ КАРТА Форма N 076/у-04',
    description: 'Санитарно-курортная карта для лечения в санатории',
    price: '1 000-1 600 ₽',
    duration: '1-2 дня',
  },
]

export default function SpravkiContent() {
  const { openBookingModal } = useBookingModal()

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Медицинские справки', href: '/spravki/' },
          ]}
        />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-olive-primary font-light mb-6">
            Медицинские справки
          </h1>
          <p className="text-lg md:text-xl text-olive-primary/80 max-w-3xl mx-auto leading-relaxed">
            Официальное оформление медицинских справок в клинике BIORISE. Быстро, надежно, с соблюдением всех требований законодательства.
          </p>
        </motion.div>

        {/* Price Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-olive-primary/20 shadow-premium overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-olive-primary/10 to-olive-primary/5 border-b border-olive-primary/20 p-6">
              <div className="grid grid-cols-12 gap-4 font-heading text-olive-primary">
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                  <h3 className="text-xl font-semibold">Название услуги</h3>
                </div>
                <div className="col-span-6 md:col-span-3 lg:col-span-2 text-center">
                  <h3 className="text-xl font-semibold">Стоимость</h3>
                </div>
                <div className="col-span-6 md:col-span-3 lg:col-span-3 text-center">
                  <h3 className="text-xl font-semibold">Срок оформления</h3>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-olive-primary/10">
              {spravkiData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="group grid grid-cols-12 gap-4 p-6 hover:bg-olive-primary/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="col-span-12 md:col-span-6 lg:col-span-7">
                    <h4 className="text-lg font-semibold text-olive-primary mb-2 group-hover:text-olive-light transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-olive-primary/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-3 lg:col-span-2 flex items-center justify-center">
                    <span className="text-xl font-bold text-olive-primary group-hover:text-olive-light transition-colors">
                      {item.price}
                    </span>
                  </div>
                  <div className="col-span-6 md:col-span-3 lg:col-span-3 flex items-center justify-center">
                    <span className="text-base text-olive-primary/80 group-hover:text-olive-primary transition-colors">
                      {item.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <div className="bg-beige-background/50 rounded-2xl p-8 border border-olive-primary/10">
            <h3 className="text-2xl font-heading text-olive-primary mb-4">
              Важная информация
            </h3>
            <ul className="text-left space-y-3 text-olive-primary/80">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-olive-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Все справки оформляются официально с печатями и подписями врачей</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-olive-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>При необходимости проводится медицинский осмотр и необходимые анализы</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-olive-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Возможна доставка готовых справок (уточняйте при записи)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-olive-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Прием ведется по предварительной записи</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={openBookingModal}
            className="bg-olive-primary text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1"
          >
            Записаться
          </button>
        </motion.div>
      </div>
    </div>
  )
}
