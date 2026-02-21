import generatedInfusions from '@/data/kapelnicy.generated.json'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfusionPageLayout from '@/components/kapelnicy/InfusionPageLayout'
import CategorySection from '@/components/kapelnicy/CategorySection'
import DownloadPdfButton from '@/components/kapelnicy/DownloadPdfButton'

type InfusionItem = {
  id: string
  title: string
  description: string
  price?: string
  duration?: string
  imageUrl?: string
  details?: string
  indications?: string[]
  effect?: string[]
  contraindications?: string[]
  composition?: string[]
}

const categoriesConfig = [
  {
    title: 'Иммунитет и восстановление',
    icon: 'shield',
    items: ['Капельница с витаминами', 'Капельница Коктейль Майерса', 'Капельница при ОРВИ', 'Капельница после ковида'],
  },
  {
    title: 'Детокс и печень',
    icon: 'leaf',
    items: ['Капельница «Детокс»', 'Капельница для печени', 'Капельница при отравлении', 'Капельница с Гептралом'],
  },
  {
    title: 'Нервная система и мозг',
    icon: 'brain',
    items: ['Капельница от стресса и нервов', 'Капельница для мозга'],
  },
  {
    title: 'Сердце и сосуды',
    icon: 'heart',
    items: ['Капельница для сердца', 'Капельница для мозга'],
  },
  {
    title: 'Энергия и спорт',
    icon: 'bolt',
    items: ['Спорт силовая', 'Спорт кардио', 'Протеин буст'],
  },
  {
    title: 'Обмен веществ и вес',
    icon: 'scale',
    items: ['Капельница для похудения', 'Капельница при диабете'],
  },
  {
    title: 'Красота и Anti-Age',
    icon: 'star',
    items: ['Капельница «Золушка»', 'Капельница с глутатионом', 'Капельница с железом'],
  },
  {
    title: 'Беременность',
    icon: 'baby',
    items: ['Капельница при беременности'],
  },
  {
    title: 'Аллергия',
    icon: 'alert',
    items: ['Капельница при аллергии'],
  },
  {
    title: 'Половая система',
    icon: 'heart',
    items: ['Половая система', 'Мужское здоровье'],
  },
  {
    title: 'Дополнительные капельницы',
    icon: 'plus',
    items: ['Капельница с глюкозой', 'Капельница Лаеннек', 'Капельница Феринжект'],
  },
]

const nameToSlug: Record<string, string> = {
  'Капельница с витаминами': 'vitaminnaya',
  'Капельница Коктейль Майерса': 'multivitaminnaya',
  'Капельница при ОРВИ': 'antivirus',
  'Капельница после ковида': 'postkovid',
  'Капельница «Детокс»': 'detoks-standart',
  'Капельница для печени': 'detoksikatsiya-pechen',
  'Капельница при отравлении': 'detoksikatsiya-otravlenie',
  'Капельница с Гептралом': 'detoksikatsiya-geptral',
  'Капельница от стресса и нервов': 'antistress',
  'Капельница для мозга': 'breynstorm',
  'Капельница для сердца': 'zdorovye-sosudy',
  'Спорт силовая': 'sport-silovaya',
  'Спорт кардио': 'sport-kardio',
  'Протеин буст': 'protein-bust',
  'Капельница для похудения': 'snizhenie-vesa',
  'Капельница при диабете': 'sahar-v-norme',
  'Капельница «Золушка»': 'krasota-i-omolozhenie',
  'Капельница с глутатионом': 'antieydzh-premium',
  'Капельница с железом': 'zhelezo-standart',
  'Капельница при беременности': 'mame-mozhno',
  'Капельница при аллергии': 'antigistaminnaya',
  'Половая система': 'polovaya-sistema',
  'Мужское здоровье': 'muzhskoe-zdorove',
  'Капельница с глюкозой': 'posle-vecherinki',
  'Капельница Лаеннек': 'laennek',
  'Капельница Феринжект': 'zhelezo-2-0',
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
const infusionMap = generatedInfusions as unknown as Record<string, InfusionItem>

export const metadata = {
  title: 'Капельницы | BIORISE',
  description: 'Категории капельниц BIORISE: иммунитет, детокс, сердце, спорт, красота и другое.',
}

export default function KapelnicyPage() {
  // Если данных нет, возвращаем пустую страницу с сообщением
  if (Object.keys(infusionMap).length === 0) {
    return (
      <>
        <Header />
        <InfusionPageLayout sidebarCategories={[]}>
          <div className="text-center py-20">
            <p className="text-olive-primary/60 text-lg">Данные загружаются...</p>
          </div>
        </InfusionPageLayout>
        <Footer />
      </>
    )
  }

  const categories = categoriesConfig.map((cat) => {
    const items: InfusionItem[] = cat.items
      .map((name) => {
        const slug = nameToSlug[name]
        if (!slug) return null
        const base = infusionMap[slug]
        if (!base) return null
        return {
          ...base,
          title: name,
          id: `${slugify(cat.title)}-${base.id}`,
        }
      })
      .filter((v): v is InfusionItem => Boolean(v))

    return { id: slugify(cat.title), title: cat.title, items, icon: cat.icon }
  })

  const menu = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    items: cat.items.map((item) => ({ id: item.id, title: item.title })),
  }))

  return (
    <>
      <Header />
      <InfusionPageLayout sidebarCategories={menu}>
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <CategorySection key={cat.id} id={cat.id} title={cat.title} items={cat.items} icon={cat.icon} />
          ))}
        </div>
      </InfusionPageLayout>
      <Footer />
      <DownloadPdfButton />
    </>
  )
}

