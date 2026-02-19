import Link from 'next/link'

const categories: { title: string; items: string[] }[] = [
  {
    title: 'Иммунитет и восстановление',
    items: ['Капельница с витаминами', 'Коктейль Майерса', 'Капельница при ОРВИ', 'Капельница после ковида'],
  },
  {
    title: 'Детокс и печень',
    items: ['Капельница «Детокс»', 'Капельница для печени', 'Капельница при отравлении', 'Капельница с Гептралом'],
  },
  {
    title: 'Нервная система и мозг',
    items: ['Капельница от стресса и нервов', 'Капельница для мозга'],
  },
  {
    title: 'Сердце и сосуды',
    items: ['Капельница для сердца', 'Капельница для мозга'],
  },
  {
    title: 'Энергия и спорт',
    items: ['Капельница для спортсменов'],
  },
  {
    title: 'Обмен веществ и вес',
    items: ['Капельница для похудения', 'Капельница при диабете'],
  },
  {
    title: 'Красота и Anti-Age',
    items: ['Капельница «Золушка»', 'Капельница с глутатионом', 'Капельница с железом'],
  },
  {
    title: 'Беременность',
    items: ['Капельница при беременности'],
  },
  {
    title: 'Аллергия',
    items: ['Капельница при аллергии'],
  },
  {
    title: 'Дополнительные капельницы',
    items: ['Капельница с глюкозой', 'Капельница Лаеннек', 'Капельница Феринжект'],
  },
]

export const metadata = {
  title: 'Капельницы | BIORISE',
  description: 'Категории капельниц BIORISE: иммунитет, детокс, сердце, спорт, красота и другое.',
}

export default function DripsPage() {
  return (
    <main className="min-h-screen bg-beige-background text-olive-primary">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10 sm:mb-12">
          <p className="text-sm text-olive-primary/70 uppercase tracking-[0.2em] mb-2">Услуги</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-olive-primary">Капельницы</h1>
          <p className="mt-3 text-olive-primary/80 text-base sm:text-lg max-w-3xl">
            Выберите категорию, чтобы посмотреть список капельниц и перейти к записи. Все позиции кликабельны и ведут к
            форме записи.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl shadow-premium border border-olive-primary/10 p-6 flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold text-olive-primary">{category.title}</h2>
              <div className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <Link
                    key={item}
                    href="/#booking"
                    className="flex items-center justify-between px-3 py-2 rounded-lg border border-olive-primary/10 hover:border-olive-primary/40 hover:shadow-sm transition-all text-olive-primary/90"
                  >
                    <span>{item}</span>
                    <span className="text-olive-primary/60">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

