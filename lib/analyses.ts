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

type CategoryDefinition = {
  title: string
  icon: string
  sectionMatchers: string[]
}

type PopularAnalysisItem = {
  code: string
  title: string
  description: string
  icon: string
  href?: string
  price?: string
  turnaround?: string
  showCode?: boolean
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

  return Array.from(groups.entries())
    .map(([title, groupedItems]) => ({
      title,
      slug: toSlug(title),
      items: groupedItems.sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, 'ru'))
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

const categoryDefinitions: CategoryDefinition[] = [
  {
    title: 'Общеклинические',
    icon: 'clinical',
    sectionMatchers: ['ОБЩЕКЛИНИЧЕСКИЕ ИССЛЕДОВАНИЯ КРОВИ', 'ИССЛЕДОВАНИЯ МОЧИ', 'ИССЛЕДОВАНИЯ КАЛА'],
  },
  {
    title: 'Биохимия',
    icon: 'biochemistry',
    sectionMatchers: ['БИОХИМИЧЕСКИЕ ИССЛЕДОВАНИЯ КРОВИ', 'МИКРОЭЛЕМЕНТЫ'],
  },
  {
    title: 'Гормоны',
    icon: 'hormones',
    sectionMatchers: ['ОЦЕНКА ФУНКЦИИ ЭНДОКРИННОЙ СИСТЕМЫ'],
  },
  {
    title: 'Иммунология',
    icon: 'immunity',
    sectionMatchers: ['ИММУНОГЕМАТОЛОГИЯ', 'ИММУНОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ', 'ДИАГНОСТИКА АУТОИММУННЫХ ЗАБОЛЕВАНИЙ'],
  },
  {
    title: 'Генетика',
    icon: 'genetics',
    sectionMatchers: ['ЦИТОГЕНЕТИЧЕСКИЕ ИССЛЕДОВАНИЯ', 'ГЕНЕТИЧЕСКИЕ ПРЕДРАСПОЛОЖЕННОСТИ', 'НАСЛЕДСТВЕННЫЕ МОНОГЕННЫЕ ЗАБОЛЕВАНИЯ И СОСТОЯНИЯ'],
  },
  {
    title: 'Аллергология',
    icon: 'allergy',
    sectionMatchers: ['АЛЛЕРГОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ'],
  },
  {
    title: 'Инфекции',
    icon: 'infections',
    sectionMatchers: ['ДИАГНОСТИКА ИНФЕКЦИОННЫХ ЗАБОЛЕВАНИЙ', 'МИКРОБИОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ: НЕСПЕЦИФИЧЕСКИЕ ВОСПАЛИТЕЛЬНЫЕ ЗАБОЛЕВАНИЯ РАЗЛИЧНЫХ ЛОКАЛИЗАЦИЙ'],
  },
  {
    title: 'Онкодиагностика',
    icon: 'oncology',
    sectionMatchers: ['ОНКОГЕНЕТИЧЕСКИЕ ИССЛЕДОВАНИЯ', 'ГИСТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ', 'ЦИТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ'],
  },
]

export const analysisCategories = categoryDefinitions.map((category) => {
  const matchedSections = analysisSections.filter((section) =>
    category.sectionMatchers.includes(section.title),
  )

  return {
    ...category,
    count: matchedSections.reduce((sum, section) => sum + section.items.length, 0),
    sectionSlugs: matchedSections.map((section) => section.slug),
    sectionTitle: matchedSections[0]?.title ?? category.sectionMatchers[0],
  }
})

export const popularAnalyses: PopularAnalysisItem[] = [
  {
    code: '5',
    title: 'Общий анализ крови',
    description: 'Базовая оценка воспаления, анемии и общего состояния.',
    icon: 'blood-drop',
    href: '/analizy/analiz-krovi/',
  },
  {
    code: 'BIOHIM',
    title: 'Биохимический анализ крови',
    description: 'Показывает печень, почки, белковый и углеводный обмен.',
    icon: 'biochemistry',
    href: '/analizy/biohimicheskiy-analiz-krovi/',
    price: 'Уточняйте',
    turnaround: 'По составу',
    showCode: false,
  },
  {
    code: '116',
    title: 'Общий анализ мочи',
    description: 'Скрининг функции почек и мочевыводящих путей.',
    icon: 'kidney',
  },
  {
    code: '51',
    title: 'Ферритин',
    description: 'Помогает оценить запасы железа и дефицитные состояния.',
    icon: 'iron-cell',
  },
  {
    code: '56',
    title: 'ТТГ',
    description: 'Частый анализ при жалобах на вес, сон и утомляемость.',
    icon: 'thyroid',
  },
  {
    code: '928',
    title: 'Витамин D',
    description: 'Актуален при дефицитах, слабости и частых простудах.',
    icon: 'sun',
  },
  {
    code: '16',
    title: 'Глюкоза',
    description: 'Базовый показатель углеводного обмена.',
    icon: 'glucose',
  },
  {
    code: '1601ОСТ',
    title: 'Энтеробиоз',
    description: 'Часто нужен детям для справок в сад или школу.',
    icon: 'children',
  },
  {
    code: '159ЯГ',
    title: 'Яйца гельминтов',
    description: 'Профильное исследование кала для детских справок.',
    icon: 'shield-lab',
  },
].map((item) => {
  const analysis = findAnalysis(item.code)

  return {
    ...item,
    price: item.price ?? analysis?.price ?? 'Уточняйте',
    turnaround: item.turnaround ?? analysis?.turnaround ?? 'По готовности лаборатории',
    code: analysis?.code ?? item.code,
    name: shortName(analysis?.name ?? item.title),
    sectionSlug: analysis ? toSlug(analysis.section) : '',
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
    note: 'Базовый профилактический check-up без лишних исследований.',
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

export const analysesFaq = [
  {
    question: 'Можно ли сдать анализы без направления врача?',
    answer:
      'Да, большинство лабораторных исследований можно сдать самостоятельно. Если нужен подбор объема диагностики, врач клиники поможет выбрать нужные позиции без лишних анализов.',
  },
  {
    question: 'Как быстро готовы результаты?',
    answer:
      'Срок зависит от конкретного исследования. Базовые анализы часто готовы быстро, а более редкие профили требуют больше времени. Точный срок указан в каталоге рядом с каждой позицией.',
  },
  {
    question: 'Есть ли анализы для детей?',
    answer:
      'Да. В каталоге есть отдельные исследования и готовые программы для детей, включая анализы для справок в детский сад и школу.',
  },
  {
    question: 'Где посмотреть check-up программы?',
    answer:
      'Для комплексных обследований мы вынесли отдельную страницу с check-up программами. Там удобнее выбрать готовый набор для женщин, мужчин, детей и профилактики.',
  },
]
