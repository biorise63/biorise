'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Supplement = {
  name: string
  title: string
  image: string
  excerpt: string
  benefits: string[]
  form: string
  composition: string
}

const supplements: Supplement[] = [
  {
    name: 'B Complex',
    title: 'B Complex',
    image: '/supplements/b-complex.jpg',
    excerpt:
      'По данным каталога BIORISE: дает энергию, поддерживает нервную систему, помогает в поддержании здоровья кожи и волос.',
    benefits: [
      'Поддержка нервной системы',
      'Важен для нормального функционирования пищеварительной системы',
      'Участвует в образовании и функции гормонов',
    ],
    form: 'Форма выпуска: капсулы 700 мг, 60 капсул.',
    composition:
      'Состав: микрокристаллическая целлюлоза, аскорбиновая кислота, диоксид кремния, никотинамид, токоферола ацетат, пантотеновая кислота, пиридоксина гидрохлорид, рибофлавин, тиамина гидрохлорид, цианокобаламин, фолиевая кислота, желатиновая капсула.',
  },
  {
    name: 'Iron Chelate',
    title: 'Iron Chelate 40 mg',
    image: '/supplements/iron-chelate.jpg',
    excerpt:
      'По каталогу BIORISE: акцент на профилактике дефицита железа, поддержку сердца и сосудов, а также в составе комплексных программ.',
    benefits: [
      'Профилактика анемии',
      'Поддержка сердца',
      'Поддержка сосудов',
    ],
    form: 'Форма выпуска: капсулы 610 мг, 90 капсул.',
    composition:
      'Состав: железа бисглицинат, микрокристаллическая целлюлоза (носитель), желатиновая капсула.',
  },
  {
    name: '5-HTP + B6',
    title: '5-HTP 100 mg + Витамин B6',
    image: '/supplements/5-htp-b6.jpg',
    excerpt:
      'Согласно каталогу BIORISE: используется для поддержки сна, когнитивных функций и контроля аппетита в рамках персонального плана.',
    benefits: [
      'Регуляция сна и циркадных ритмов',
      'Улучшение когнитивных функций',
      'Управление аппетитом и контроль веса',
    ],
    form: 'Форма выпуска: капсулы 460 мг, 60 капсул.',
    composition:
      'Состав: микрокристаллическая целлюлоза (носитель), 5-гидрокситриптофан, диоксид кремния, пиридоксина гидрохлорид (витамин B6), желатиновая капсула.',
  },
  {
    name: 'Magnesium Chelate',
    title: 'Magnesium Chelate',
    image: '/supplements/magnesium-chelate.jpg',
    excerpt:
      'По данным PDF BIORISE: направлен на поддержку обмена веществ и костно-мышечной системы, в том числе при повышенных нагрузках.',
    benefits: [
      'Регуляция уровня глюкозы в крови',
      'Поддержка здоровья костей и зубов',
      'Улучшение пищеварения и обмена веществ',
    ],
    form: 'Форма выпуска: капсулы 720 мг, 60 капсул.',
    composition:
      'Состав: магния бисглицинат, микрокристаллическая целлюлоза (носитель), желатиновая капсула.',
  },
  {
    name: 'Magnesium Citrate + B6',
    title: 'Magnesium Citrate 872 mg + B6',
    image: '/supplements/magnesium-citrate-b6.jpg',
    excerpt:
      'Согласно каталогу BIORISE: комбинация магния и B6 для поддержки сердечно-сосудистой системы, памяти и мышечного тонуса.',
    benefits: [
      'Поддержка здоровья сердца и сосудов',
      'Улучшение памяти и когнитивных функций',
      'Поддержка здоровья костей и мышц',
    ],
    form: 'Форма выпуска: капсулы 850 мг, 90 капсул.',
    composition:
      'Состав: магния цитрат, микрокристаллическая целлюлоза, пиридоксина гидрохлорид (витамин B6), желатиновая капсула.',
  },
  {
    name: 'Marine Collagen',
    title: 'Marine Collagen 750 mg',
    image: '/supplements/marine-collagen.jpg',
    excerpt:
      'По описанию BIORISE: коллагеновый комплекс для кожи и соединительной ткани с антиоксидантной поддержкой.',
    benefits: [
      'Укрепление соединительной ткани и суставов',
      'Антиоксидантная защита',
      'Поддержка иммунной системы',
    ],
    form: 'Форма выпуска: капсулы 535 мг, 90 капсул.',
    composition:
      'Состав: гидролизованный рыбный коллаген, микрокристаллическая целлюлоза, аскорбиновая кислота, гиалуроновая кислота, диоксид кремния, желатиновая капсула.',
  },
  {
    name: 'Vitamin D3 + K2',
    title: 'Vitamin D3 5000 ME + K2',
    image: '/supplements/vitamin-d3-k2.jpg',
    excerpt:
      'По каталогу BIORISE: поддерживает иммунную функцию и используется как часть профилактических программ в сезон дефицитов.',
    benefits: [
      'Поддержка иммунной функции',
      'Поддержка баланса витаминов D и K',
      'Дополнение к программам профилактики дефицитов',
    ],
    form: 'Форма выпуска: капсулы 610 мг, 90 капсул.',
    composition:
      'Состав: витамин D3 (холекальциферол), менахинон-7 (K2), микрокристаллическая целлюлоза (носитель), желатиновая капсула.',
  },
  {
    name: 'Calcium Citrate',
    title: 'Calcium Citrate',
    image: '/supplements/calcium-citrate.jpg',
    excerpt:
      'Согласно каталогу BIORISE: продукт для поддержки костной ткани, нервной системы и комплексной профилактики возрастных дефицитов.',
    benefits: [
      'Здоровые и крепкие кости',
      'Профилактика остеопороза',
      'Поддержка нервной системы',
    ],
    form: 'Форма выпуска: капсулы 420 мг, 90 капсул.',
    composition:
      'Состав: кальция цитрат, микрокристаллическая целлюлоза, желатиновая капсула.',
  },
  {
    name: 'Omega-3',
    title: 'Omega-3',
    image: '/supplements/omega-3.jpg',
    excerpt:
      'По каталогу BIORISE: омега-3 для поддержки зрения, суставов и эмоционального благополучия.',
    benefits: [
      'Поддержка здоровья суставов и костей',
      'Важен для здоровья глаз и зрения',
      'Поддержка эмоционального благополучия',
    ],
    form: 'Форма выпуска: капсулы 1392 мг, 30 капсул.',
    composition:
      'Состав: рыбный жир, оболочка (желатин, глицерин).',
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function BadyContent() {
  return (
    <main className="bg-[#f8f4ec]">
      <section className="section-spacing pt-12 sm:pt-14">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-2xl font-heading text-olive-primary sm:text-3xl">
              Подборка БАДов BIORISE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {supplements.map((item, idx) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="group overflow-hidden rounded-2xl border border-olive-primary/10 bg-white shadow-[0_10px_25px_rgba(36,48,25,0.09)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(36,48,25,0.16)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {item.name}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <h3 className="text-xl font-heading leading-tight text-olive-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-olive-primary/75">
                    {item.excerpt}
                  </p>

                  <ul className="space-y-2">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-olive-primary/90">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-olive-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-[#dbd1bf] bg-[#faf7f2] p-3">
                    <p className="text-[13px] text-olive-primary/90">{item.form}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-olive-primary/75">
                      {item.composition}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-9 rounded-2xl border border-olive-primary/15 bg-white/80 p-5 sm:p-7"
          >
            <p className="text-sm leading-relaxed text-olive-primary/75 sm:text-base">
              БАДы не являются лекарственными средствами. Оптимальную схему приема и сочетания подбирает специалист BIORISE с учетом состояния здоровья, анализов и текущих задач.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
