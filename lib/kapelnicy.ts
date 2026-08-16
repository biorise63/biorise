import generatedInfusions from '@/data/kapelnicy.generated.json'

export type InfusionItem = {
  id: string
  slug: string
  categoryId?: string
  categoryTitle?: string
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

export type InfusionCategory = {
  id: string
  title: string
  items: InfusionItem[]
  icon?: string
}

export const categoriesConfig = [
  {
    title: 'Иммунитет и восстановление',
    icon: 'shield',
    items: [
      'Капельница с витаминами',
      'Капельница Коктейль Майерса',
      'Капельница при ОРВИ',
      'Капельница после ковида',
      'Капельница Иммуносуппорт',
      'Капельница Джетлаг',
      'Капельница Восстановление обоняния',
    ],
  },
  {
    title: 'Детокс и печень',
    icon: 'leaf',
    items: [
      'Капельница «Детокс»',
      'Капельница для печени',
      'Капельница при отравлении',
      'Капельница с Гептралом',
      'Капельница Антиаммиак',
      'Капельница Детоксикация',
    ],
  },
  {
    title: 'Нервная система и мозг',
    icon: 'brain',
    items: ['Капельница от стресса и нервов', 'Капельница для мозга', 'Капельница Антимигрень'],
  },
  {
    title: 'Сердце и сосуды',
    icon: 'heart',
    items: ['Капельница для сердца', 'Капельница для мозга', 'Капельница Гипертонический криз', 'Капельница Нет холестерину'],
  },
  {
    title: 'Энергия и спорт',
    icon: 'bolt',
    items: ['Капельница Энергия+', 'Спорт силовая', 'Спорт кардио', 'Протеин буст'],
  },
  {
    title: 'Обмен веществ и вес',
    icon: 'scale',
    items: ['Капельница для похудения', 'Капельница при диабете'],
  },
  {
    title: 'Красота и Anti-Age',
    icon: 'star',
    items: [
      'Капельница «Золушка»',
      'Капельница с глутатионом',
      'Капельница с железом',
      'Капельница Айронмен',
      'Капельница Бархатная кожа',
      'Капельница Густые волосы',
    ],
  },
  {
    title: 'Беременность',
    icon: 'baby',
    items: ['Капельница при беременности', 'Капельница Подготовка к беременности'],
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
    title: 'Противовоспалительные капельницы',
    icon: 'shield',
    items: [
      'Капельница бронхо-легочная противовоспалительная',
      'Капельница Гинекологическая противовоспалительная',
      'Капельница Стоматологическая противовоспалительная',
      'Капельница суставная противовоспалительная',
    ],
  },
  {
    title: 'ЖКТ и пищеварение',
    icon: 'leaf',
    items: ['Капельница ЖКТ 1', 'Капельница ЖКТ 2'],
  },
  {
    title: 'Дополнительные капельницы',
    icon: 'plus',
    items: [
      'Капельница с глюкозой',
      'Капельница Лаеннек',
      'Капельница Феринжект',
      'Капельница Предоперационная',
      'Капельница Антиклимакс',
    ],
  },
] as const

export const nameToSlug: Record<string, string> = {
  'Капельница с витаминами': 'vitaminnaya',
  'Капельница Коктейль Майерса': 'multivitaminnaya',
  'Капельница при ОРВИ': 'antivirus',
  'Капельница после ковида': 'postkovid',
  'Капельница Иммуносуппорт': 'immuno-support',
  'Капельница «Детокс»': 'detoks-standart',
  'Капельница для печени': 'detoksikatsiya-pechen',
  'Капельница при отравлении': 'detoksikatsiya-otravlenie',
  'Капельница с Гептралом': 'detoksikatsiya-geptral',
  'Капельница от стресса и нервов': 'antistress',
  'Капельница для мозга': 'breynstorm',
  'Капельница для сердца': 'zdorovye-sosudy',
  'Капельница Энергия+': 'energiya',
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
  'Капельница Антиаммиак': 'antiammiak',
  'Капельница Антиклимакс': 'antiklimaks',
  'Капельница Антимигрень': 'antimigren',
  'Капельница Айронмен': 'ayronmen',
  'Капельница Бархатная кожа': 'barhatnaya-kozha',
  'Капельница бронхо-легочная противовоспалительная': 'bronho-legochnaya-protivovospalitelnaya',
  'Капельница Детоксикация': 'detoksikatsiya',
  'Капельница Джетлаг': 'dzhetlag',
  'Капельница Гинекологическая противовоспалительная': 'ginekologicheskaya-protivovospalitelnaya',
  'Капельница Гипертонический криз': 'gipertonicheskiy-kriz',
  'Капельница Густые волосы': 'gustye-volosy',
  'Капельница Нет холестерину': 'net-holesterinu',
  'Капельница Подготовка к беременности': 'podgotovka-k-beremennosti',
  'Капельница Предоперационная': 'predoperatsionnaya',
  'Капельница Стоматологическая противовоспалительная': 'stomatologicheskaya-protivovospalitelnaya',
  'Капельница суставная противовоспалительная': 'sustavnaya-protivovospalitelnaya',
  'Капельница Восстановление обоняния': 'vosstanovlenie-obonyaniya',
  'Капельница ЖКТ 1': 'zhkt-1',
  'Капельница ЖКТ 2': 'zhkt-2',
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

const infusionMap = generatedInfusions as unknown as Record<string, Omit<InfusionItem, 'slug'>>

export function getInfusionCategories(): InfusionCategory[] {
  return categoriesConfig.map((cat) => {
    const categoryId = slugify(cat.title)
    const items: InfusionItem[] = cat.items
      .flatMap((name) => {
        const slug = nameToSlug[name]
        if (!slug) return []
        const base = infusionMap[slug]
        if (!base) return []
        return [{
          ...base,
          slug,
          categoryId,
          categoryTitle: cat.title,
          title: name,
          id: slug,
        }]
      })

    return { id: categoryId, title: cat.title, items, icon: cat.icon }
  })
}

export function getUniqueInfusions(): InfusionItem[] {
  const seen = new Set<string>()
  return getInfusionCategories()
    .flatMap((category) => category.items)
    .filter((item) => {
      if (seen.has(item.slug)) return false
      seen.add(item.slug)
      return true
    })
}

export function getInfusionBySlug(slug: string) {
  return getUniqueInfusions().find((item) => item.slug === slug) ?? null
}
