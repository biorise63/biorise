import analysesData from '@/data/analyses.generated.json'

export type AnalysisItem = {
  code: string
  name: string
  section: string
  subsection: string
  biomaterial: string
  turnaround: string
  price: string
  priceValue: number
}

type GroupedItems = {
  title: string
  slug: string
  items: AnalysisItem[]
}

const analyses = analysesData.analyses as AnalysisItem[]
const checkups = analysesData.checkups as AnalysisItem[]

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function shortName(value: string) {
  return value
    .replace(/\s*\([^)]*[A-Za-z][^)]*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function groupBySection(items: AnalysisItem[], key: 'section' | 'subsection'): GroupedItems[] {
  const groups = new Map<string, AnalysisItem[]>()

  for (const item of items) {
    const title = item[key] || 'Без раздела'
    const current = groups.get(title) ?? []
    current.push(item)
    groups.set(title, current)
  }

  return Array.from(groups.entries()).map(([title, groupedItems]) => ({
    title,
    slug: toSlug(title),
    items: groupedItems,
  }))
}

function findAnalysis(code: string) {
  return analyses.find((item) => item.code === code)
}

function findCheckup(code: string) {
  return checkups.find((item) => item.code === code)
}

export const allAnalyses = analyses
export const allCheckups = checkups
export const analysisSections = groupBySection(analyses, 'section')
export const checkupSections = groupBySection(checkups, 'subsection')

export const popularAnalyses = [
  {
    code: '5',
    title: 'Общий анализ крови',
    description: 'Базовый анализ для оценки воспаления, анемии и общего состояния организма.',
    icon: 'blood',
  },
  {
    code: '116',
    title: 'Общий анализ мочи',
    description: 'Часто нужен для скрининга почек, мочевыводящих путей и обменных нарушений.',
    icon: 'urine',
  },
  {
    code: '51',
    title: 'Ферритин',
    description: 'Помогает понять, есть ли дефицит железа и почему держится слабость.',
    icon: 'iron',
  },
  {
    code: '56',
    title: 'ТТГ',
    description: 'Один из самых частых анализов при жалобах на усталость, вес и перепады настроения.',
    icon: 'thyroid',
  },
  {
    code: '928',
    title: 'Витамин D',
    description: 'Актуален при дефицитах, частых простудах, снижении энергии и болях в мышцах.',
    icon: 'vitamin',
  },
  {
    code: '1601ОСТ',
    title: 'Энтеробиоз',
    description: 'Популярное исследование для детей перед садом, школой и справками.',
    icon: 'children',
  },
].map((item) => {
  const analysis = findAnalysis(item.code)

  return {
    ...item,
    price: analysis?.price ?? 'Уточняйте',
    turnaround: analysis?.turnaround ?? 'По готовности лаборатории',
    code: analysis?.code ?? item.code,
    name: shortName(analysis?.name ?? item.title),
  }
})

export const featuredCheckups = [
  {
    code: 'ОБС45 (1601)',
    label: 'Детям',
    title: 'Анализы для детского сада и школы',
    note: 'Подойдет перед новым учебным сезоном и оформлением справок.',
  },
  {
    code: 'ОБС266',
    label: 'Женщинам',
    title: 'Профиль для женщин базовый 18+',
    note: 'Базовый профилактический чек-ап без лишних исследований.',
  },
  {
    code: 'ОБС276',
    label: 'Мужчинам',
    title: 'Мужское здоровье 18+ базовое обследование',
    note: 'Подходит как стартовая точка для плановой проверки.',
  },
  {
    code: 'ОБС46',
    label: '40+',
    title: 'Ежегодное профилактическое обследование после 40 лет',
    note: 'Для тех, кто хочет держать под контролем основные риски.',
  },
  {
    code: 'ОБС212',
    label: 'Дефициты',
    title: 'Оценка витаминного статуса',
    note: 'Когда нужно проверить сразу несколько ключевых дефицитов.',
  },
  {
    code: 'ОБС75',
    label: 'Щитовидная железа',
    title: 'Щитовидная железа: расширенное обследование',
    note: 'Подходит при жалобах на вес, усталость и колебания самочувствия.',
  },
].map((item) => {
  const checkup = findCheckup(item.code)

  return {
    ...item,
    code: checkup?.code ?? item.code,
    name: shortName(checkup?.name ?? item.title),
    price: checkup?.price ?? 'Уточняйте',
  }
})

export const analysesStats = {
  analysesCount: allAnalyses.length,
  checkupsCount: allCheckups.length,
  sectionsCount: analysisSections.length,
}
