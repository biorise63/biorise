import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { getInfusionCategories } from '@/lib/kapelnicy'
import { createItemListJsonLd, createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

const pageTitle = 'Капельница на дому в Самаре — выезд медсестры | BIORISE'
const pageDescription =
  'Капельница на дому в Самаре с выездом медицинской сестры BIORISE. Врач оценивает состояние, подбирает состав и решает, какую программу можно безопасно провести дома.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'капельница на дому самара',
    'капельницы на дому самара',
    'капельницы на дому в самаре',
    'поставить капельницу на дому самара',
    'капельницы с выездом на дом самара',
    'капельница от головной боли на дому самара',
    'медсестра на дом капельницы самара',
    'витаминные капельницы на дому самара',
  ],
  alternates: {
    canonical: 'https://biorise-clinic.ru/kapelnicy/na-domu/',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://biorise-clinic.ru/kapelnicy/na-domu/',
    siteName: 'BIORISE',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: 'https://biorise-clinic.ru/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Капельница на дому в Самаре BIORISE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://biorise-clinic.ru/hero-bg.jpg'],
  },
}

const steps = [
  {
    text: 'Вы оставляете заявку и коротко описываете состояние.',
    icon: (
      <path
        d="M5 6.5A1.5 1.5 0 0 1 6.5 5h2.2a1 1 0 0 1 1 .7l1 3a1 1 0 0 1-.4 1.2l-1.5.9a11 11 0 0 0 4.4 4.4l.9-1.5a1 1 0 0 1 1.2-.4l3 1a1 1 0 0 1 .7 1v2.2A1.5 1.5 0 0 1 17.5 20h-1C10.7 20 5 14.3 5 7.5v-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    text: 'Врач уточняет жалобы, противопоказания и решает, нужен ли выезд.',
    icon: (
      <path
        d="M12 3.5c4.7 0 8.5 3 8.5 6.7 0 3.7-3.8 6.7-8.5 6.7-1 0-1.9-.1-2.8-.4L5 18l1-3.4C4.7 13.4 3.5 11.9 3.5 10.2 3.5 6.5 7.3 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    text: 'Специалист приезжает домой и подбирает капельницу по состоянию.',
    icon: (
      <path
        d="M4.5 11 12 5l7.5 6M6.5 10v8a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    text: 'После процедуры врач объясняет дальнейшие шаги и схему курса.',
    icon: (
      <>
        <path
          d="M8 4.5h8a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="m9.2 12 1.8 1.8 3.8-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

const scenarios = [
  {
    title: 'Вывод из запоя и восстановление после алкоголя',
    text: 'На дом чаще вызывают врача при похмелье, выраженной слабости, тошноте, обезвоживании и алкогольной интоксикации. После осмотра врач решает, какой состав подойдёт и можно ли провести инфузию дома.',
  },
  {
    title: 'Детокс и поддержка печени',
    text: 'Детокс-программы вызывают при перегрузке, тяжести, слабости, восстановлении после болезни и состояниях, когда нужно снять интоксикацию и вернуть нормальное самочувствие.',
  },
  {
    title: 'Головная боль, слабость и обезвоживание',
    text: 'Домашний выезд удобен, когда трудно добраться до клиники: после высокой температуры, бессонной ночи, перелёта, тяжёлой нагрузки или резкого падения сил.',
  },
  {
    title: 'Витаминные и восстановительные капельницы',
    text: 'Если вам нужен курс с витаминами, магнием, железом или восстановительными составами, врач сначала смотрит ваше состояние и только потом подтверждает домашний формат.',
  },
]

export default function HomeInfusionsPage() {
  const categories = getInfusionCategories()
  const seen = new Set<string>()
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (seen.has(item.slug)) return false
        seen.add(item.slug)
        return true
      }),
    }))
    .filter((category) => category.items.length > 0)
  const totalPrograms = filteredCategories.reduce((sum, category) => sum + category.items.length, 0)
  const infusions = filteredCategories.flatMap((category) => category.items)
  const webPageJsonLd = createWebPageJsonLd({
    url: '/kapelnicy/na-domu/',
    name: 'Капельница на дому в Самаре',
    description: pageDescription,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: '/kapelnicy/na-domu/',
    name: 'Капельница на дому в Самаре',
    description: pageDescription,
    serviceType: 'Выезд медицинской сестры на дом',
    price: '2 500 ₽',
  })
  const itemListJsonLd = createItemListJsonLd({
    url: '/kapelnicy/na-domu/',
    name: 'Капельницы BIORISE, доступные для подбора на дому',
    items: infusions.map((item) => ({
      url: `/kapelnicy/${item.slug}/`,
      name: item.title,
    })),
  })

  return (
    <>
      <JsonLd data={[webPageJsonLd, serviceJsonLd, itemListJsonLd]} />
      <Header />
      <main
        className="min-h-screen bg-beige-background pb-20 text-olive-primary"
        style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}
      >
        <section className="container mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Капельницы', href: '/kapelnicy/' },
              { name: 'Капельницы на дому', href: '/kapelnicy/na-domu/' },
            ]}
          />

          <div className="rounded-[32px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-olive-primary">
                Выезд по Самаре
              </p>
              <h1 className="text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl lg:text-6xl">
                Капельница на дому в Самаре
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-olive-text sm:text-xl">
                Врач приезжает на дом, оценивает состояние и решает, какую капельницу можно поставить дома. Этот формат выбирают при выводе из запоя, детоксе, головной боли, слабости, обезвоживании, восстановлении после болезни и курсе витаминных капельниц.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+79967499747"
                  className="inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-base font-medium text-white shadow-premium transition-colors hover:bg-olive-light"
                >
                  Позвонить врачу
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-beige-background/80 p-4">
                  <span className="block text-xs uppercase tracking-[0.14em] text-olive-primary">Стоимость выезда</span>
                  <strong className="mt-2 block text-2xl text-olive-primary">2 500 ₽</strong>
                  <span className="mt-1 block text-sm text-olive-primary">+ стоимость выбранной капельницы</span>
                </div>
                <div className="rounded-2xl bg-beige-background/80 p-4">
                  <span className="block text-xs uppercase tracking-[0.14em] text-olive-primary">Где работаем</span>
                  <strong className="mt-2 block text-2xl text-olive-primary">Самара</strong>
                  <span className="mt-1 block text-sm text-olive-primary">Выезд по городу после согласования с врачом</span>
                </div>
                <div className="rounded-2xl bg-beige-background/80 p-4">
                  <span className="block text-xs uppercase tracking-[0.14em] text-olive-primary">Программ в каталоге</span>
                  <strong className="mt-2 block text-2xl text-olive-primary">более 26</strong>
                  <span className="mt-1 block text-sm text-olive-primary">Полный каталог представлен ниже</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {scenarios.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium"
              >
                <h2 className="text-2xl font-heading font-light text-olive-primary">{item.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-olive-text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10 sm:px-6">
          <div className="rounded-[32px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8">
            <h2 className="text-3xl font-heading font-light text-olive-primary sm:text-4xl">
              Как проходит выезд
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {steps.map((step) => (
                <div key={step.text} className="rounded-2xl bg-olive-primary/5 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-olive-primary shadow-premium">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      {step.icon}
                    </svg>
                  </span>
                  <p className="mt-3 leading-relaxed text-olive-text">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10 sm:px-6">
          <div className="rounded-[32px] border border-olive-primary/10 bg-white/85 p-6 shadow-premium sm:p-8">
            <h2 className="text-3xl font-heading font-light text-olive-primary sm:text-4xl">
              Все капельницы BIORISE
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-text sm:text-lg">
              Ниже собран полный каталог. Врач на выезде смотрит ваше состояние и говорит, какую программу можно безопасно провести дома. Если вы уже знаете нужную капельницу, откройте её страницу и посмотрите состав, показания и цену.
            </p>

            <div className="mt-8 space-y-8">
              {filteredCategories.map((category) => (
                <section key={category.id}>
                  <h3 className="text-2xl font-heading font-light text-olive-primary">
                    {category.title}
                  </h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item) => (
                      <article
                        key={item.slug}
                        className="rounded-2xl border border-olive-primary/10 bg-beige-background/70 p-5"
                      >
                        <h4 className="text-xl font-heading text-olive-primary">{item.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-olive-text">
                          {item.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div>
                            {item.price && (
                              <strong className="block text-lg text-olive-primary">{item.price}</strong>
                            )}
                            {item.duration && (
                              <span className="text-sm text-olive-primary">{item.duration}</span>
                            )}
                          </div>
                          <Link
                            href={`/kapelnicy/${item.slug}/`}
                            className="inline-flex items-center justify-center rounded-full border border-olive-primary/20 bg-white px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-white/70"
                          >
                            Открыть
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10 sm:px-6">
          <div className="rounded-[32px] border border-olive-primary/10 bg-olive-primary p-6 text-white shadow-premium sm:p-8">
            <h2 className="text-3xl font-heading font-light sm:text-4xl">
              Нужна капельница на дому
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              Если состояние не даёт приехать в клинику, оставьте заявку. Врач скажет, нужен ли срочный осмотр, возможен ли домашний формат и какую капельницу лучше выбрать под ваше состояние.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+79967499747"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-olive-primary transition-colors hover:bg-white/90"
              >
                Позвонить врачу
              </a>
              <Link
                href="/kapelnicy/"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                Вернуться к каталогу капельниц
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
