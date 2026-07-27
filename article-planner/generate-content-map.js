const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const PROJECT_ROOT = path.resolve(ROOT, '..')
const INFUSIONS_FILE = path.join(PROJECT_ROOT, 'data', 'kapelnicy.generated.json')
const ARTICLES_FILE = path.join(ROOT, 'data', 'articles.json')
const PUBLISHED_ARTICLES_DIR = path.join(PROJECT_ROOT, 'out', 'articles')
const OUTPUT_FILE = path.join(ROOT, 'data', 'content-map.json')

const infusionCategories = [
  {
    title: 'Иммунитет и восстановление',
    slugs: ['vitaminnaya', 'multivitaminnaya', 'antivirus', 'postkovid'],
  },
  {
    title: 'Детокс и печень',
    slugs: ['detoks-standart', 'detoksikatsiya-pechen', 'detoksikatsiya-otravlenie', 'detoksikatsiya-geptral', 'detoksikatsiya', 'antiammiak', 'zhkt-1', 'zhkt-2'],
  },
  {
    title: 'Нервная система и восстановление ресурса',
    slugs: ['antistress', 'breynstorm', 'antimigren', 'dzhetlag', 'energiya'],
  },
  {
    title: 'Сердце, сосуды и давление',
    slugs: ['zdorovye-sosudy', 'gipertonicheskiy-kriz', 'net-holesterinu'],
  },
  {
    title: 'Спорт и физические нагрузки',
    slugs: ['sport-silovaya', 'sport-kardio', 'protein-bust', 'ayronmen'],
  },
  {
    title: 'Обмен веществ и вес',
    slugs: ['snizhenie-vesa', 'sahar-v-norme'],
  },
  {
    title: 'Красота и anti-age',
    slugs: ['krasota-i-omolozhenie', 'antieydzh-premium', 'barhatnaya-kozha', 'gustye-volosy', 'laennek'],
  },
  {
    title: 'Железо и дефицитные состояния',
    slugs: ['zhelezo-standart', 'zhelezo-2-0'],
  },
  {
    title: 'Женское здоровье и беременность',
    slugs: ['mame-mozhno', 'podgotovka-k-beremennosti', 'ginekologicheskaya-protivovospalitelnaya', 'antiklimaks'],
  },
  {
    title: 'Аллергия и иммунные реакции',
    slugs: ['antigistaminnaya'],
  },
  {
    title: 'Мужское здоровье и половая система',
    slugs: ['polovaya-sistema', 'muzhskoe-zdorove'],
  },
  {
    title: 'Дополнительные программы и специальные сценарии',
    slugs: ['posle-vecherinki', 'vosstanovlenie-obonyaniya', 'predoperatsionnaya', 'stomatologicheskaya-protivovospalitelnaya', 'bronho-legochnaya-protivovospalitelnaya', 'sustavnaya-protivovospalitelnaya'],
  },
]

const checkupPrograms = [
  { slug: 'bazovyy', title: 'Чек-ап базовый', summary: 'Стартовый профиль для общей оценки состояния.' },
  { slug: 'rasshirennyy', title: 'Чек-ап расширенный', summary: 'Расширенный профилактический профиль.' },
  { slug: 'vip', title: 'VIP чек-ап', summary: 'Самая полная программа обследования.' },
  { slug: 'posle-rodov', title: 'После родов', summary: 'Профиль для контроля восстановления после беременности и родов.' },
  { slug: 'zheleznoe-zdorove', title: 'Железное здоровье', summary: 'Программа под дефицит железа и связанные жалобы.' },
  { slug: 'dlya-sportsmenov', title: 'Для спортсменов', summary: 'Контроль восстановления, нагрузки и дефицитов.' },
  { slug: 'detoks-i-zhkt', title: 'Детокс и ЖКТ', summary: 'Программа под ЖКТ, печень и обменные процессы.' },
  { slug: 'kontrol-vesa-i-metabolizm', title: 'Контроль веса и метаболизм', summary: 'Профиль под вес, инсулин и обмен веществ.' },
  { slug: 'khronicheskaya-ustalost', title: 'Хроническая усталость и снижение энергии', summary: 'Программа для поиска причин слабости и снижения ресурса.' },
  { slug: 'anti-age', title: 'Anti-age', summary: 'Возрастной расширенный профилактический профиль.' },
  { slug: 'muzhskoe-zdorove-bazovyy', title: 'Мужское здоровье: базовый', summary: 'Базовый мужской check-up.' },
  { slug: 'muzhskoe-zdorove-rasshirennyy', title: 'Мужское здоровье: расширенный', summary: 'Расширенный мужской check-up.' },
  { slug: 'muzhskoy-maksimum', title: 'Мужской максимум', summary: 'Максимально полный мужской профиль.' },
  { slug: 'fitnes-i-energiya', title: 'Фитнес и энергия', summary: 'Профиль для тренирующихся и активных пациентов.' },
]

const analysisCategories = [
  { slug: 'obshcheklinicheskie', title: 'Общеклинические', anchors: ['общий анализ крови', 'общий анализ мочи', 'кал'] },
  { slug: 'biokhimiya', title: 'Биохимия', anchors: ['алт', 'аст', 'глюкоза', 'ферритин'] },
  { slug: 'gormony', title: 'Гормоны', anchors: ['ттг', 'т4 свободный', 'инсулин'] },
  { slug: 'immunologiya', title: 'Иммунология', anchors: ['с-реактивный белок', 'аутоиммунные маркеры'] },
  { slug: 'genetika', title: 'Генетика', anchors: ['генетические исследования'] },
  { slug: 'allergologiya', title: 'Аллергология', anchors: ['аллергопробы', 'IgE'] },
  { slug: 'infektsii', title: 'Инфекции', anchors: ['вирусные инфекции', 'бактериальные инфекции'] },
  { slug: 'onkodiagnostika', title: 'Онкодиагностика', anchors: ['онкомаркеры', 'цитология', 'гистология'] },
]

const stopWords = new Set([
  'капельница', 'капельницы', 'чек', 'ап', 'и', 'для', 'при', 'после', 'с', 'в', 'на', 'что', 'как', 'это', 'какие', 'кому', 'может', 'быть', 'biоrise', 'biorise', 'организма', 'здоровье', 'здоровья', 'программа', 'программы'
])

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function stripTags(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function readPublishedArticlesFromOut() {
  if (!fs.existsSync(PUBLISHED_ARTICLES_DIR)) return []

  const entries = fs.readdirSync(PUBLISHED_ARTICLES_DIR, { withFileTypes: true })
  const pages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const htmlPath = path.join(PUBLISHED_ARTICLES_DIR, entry.name, 'index.html')
    if (!fs.existsSync(htmlPath)) continue

    const html = fs.readFileSync(htmlPath, 'utf8')
    const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '')
    const h1 = stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '')
    const headings = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((match) =>
      stripTags(match[1] || ''),
    )

    pages.push({
      id: entry.name,
      keyword: '',
      secondaryKeywords: [],
      title,
      h1,
      sections: headings,
      internalLinks: [],
      notes: '',
      url: `/articles/${entry.name}/`,
      published: true,
    })
  }

  return pages
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function cleanTitle(value) {
  return String(value).replace(/[«»]/g, '').trim()
}

function tokenize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[«»"'()/:,+]/g, ' ')
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item.length > 2)
    .filter((item) => !stopWords.has(item))
}

function overlapScore(a, b) {
  const aTokens = [...new Set(tokenize(a))]
  const bTokens = [...new Set(tokenize(b))]
  if (!aTokens.length || !bTokens.length) return 0
  let shared = 0
  for (const tokenA of aTokens) {
    if (bTokens.some((tokenB) => tokenMatches(tokenA, tokenB))) shared += 1
  }
  return shared / Math.max(1, Math.min(aTokens.length, bTokens.length))
}

function tokenMatches(a, b) {
  if (a === b) return true
  const shortA = a.slice(0, Math.min(a.length, 6))
  const shortB = b.slice(0, Math.min(b.length, 6))
  return shortA === shortB || a.startsWith(shortB) || b.startsWith(shortA)
}

function findCoverage(entityText, articles) {
  const matches = []
  for (const article of articles) {
    const haystack = [
      article.keyword,
      ...(article.secondaryKeywords || []),
      article.title,
      article.h1,
      ...(article.sections || []),
      ...(article.internalLinks || []),
      article.notes,
    ].join(' ')
    const score = overlapScore(entityText, haystack)
    if (score >= 0.4) {
      matches.push({
        articleId: article.id,
        title: article.title,
        url: article.url,
        score: Number(score.toFixed(2)),
      })
    }
  }
  return matches.sort((a, b) => b.score - a.score)
}

function infusionAngles(title) {
  const label = cleanTitle(title)
  return [
    `Когда обсуждают программу «${label}»`,
    `Кому может подойти программа «${label}»`,
    `Какие анализы проверяют перед программой «${label}»`,
    `Противопоказания к программе «${label}»`,
    `Что может быть после программы «${label}»`,
    `Сколько процедур может входить в курс «${label}»`,
    `Как врач отличает программу «${label}» от других капельниц`,
    `Когда одной программы «${label}» недостаточно`,
    `Частые ошибки пациентов перед программой «${label}»`,
  ]
}

function checkupAngles(title) {
  const label = cleanTitle(title)
  return [
    `Что входит в программу «${label}»`,
    `Кому подходит программа «${label}»`,
    `Какие анализы важнее всего в программе «${label}»`,
    `Как подготовиться к программе «${label}»`,
    `Как часто проходить программу «${label}»`,
    `Когда базовой программы мало и чем расширяют «${label}»`,
    `Как связаны программа «${label}» и последующие назначения врача`,
  ]
}

function analysisAngles(title) {
  const label = cleanTitle(title)
  return [
    `Какие анализы входят в категорию «${label}»`,
    `С чего начать обследование по категории «${label}»`,
    `Какие симптомы чаще приводят к анализам категории «${label}»`,
    `Как подготовиться к анализам категории «${label}»`,
    `Как часто сдавать анализы категории «${label}»`,
    `Когда врач выбирает расширенный профиль по категории «${label}»`,
    `Частые ошибки пациентов при сдаче анализов категории «${label}»`,
    `Как категория «${label}» связана с check-up программами`,
  ]
}

function buildInfusionClusters(infusions, articles) {
  const categoryBySlug = new Map()
  for (const category of infusionCategories) {
    for (const slug of category.slugs) categoryBySlug.set(slug, category.title)
  }

  return Object.entries(infusions)
    .map(([slug, item]) => {
      const title = item.title || slug
      const category = categoryBySlug.get(slug) || 'Прочие капельницы'
      return {
        id: `infusion-${slug}`,
        entityType: 'infusion',
        title,
        slug,
        url: `/kapelnicy/${slug}/`,
        category,
        summary: item.description || '',
        suggestedArticles: infusionAngles(title).map((articleTitle) => ({
          title: articleTitle,
          h1: articleTitle,
          keyword: articleTitle.toLowerCase(),
          status: 'planned',
        })),
        publishedCoverage: findCoverage(`${title} ${item.description || ''}`, articles),
      }
    })
    .sort((a, b) => a.category.localeCompare(b.category, 'ru') || a.title.localeCompare(b.title, 'ru'))
}

function buildCheckupClusters(articles) {
  return checkupPrograms.map((item) => ({
    id: `checkup-${item.slug}`,
    entityType: 'checkup',
    title: item.title,
    slug: item.slug,
    url: '/chek-apy/',
    category: 'Чек-апы',
    summary: item.summary,
    suggestedArticles: checkupAngles(item.title).map((articleTitle) => ({
      title: articleTitle,
      h1: articleTitle,
      keyword: articleTitle.toLowerCase(),
      status: 'planned',
    })),
    publishedCoverage: findCoverage(`${item.title} ${item.summary}`, articles),
  }))
}

function buildAnalysisClusters(articles) {
  return analysisCategories.map((item) => ({
    id: `analysis-${item.slug}`,
    entityType: 'analysis-category',
    title: item.title,
    slug: item.slug,
    url: '/analizy/',
    category: 'Анализы',
    summary: `Категория анализов: ${item.anchors.join(', ')}.`,
    suggestedArticles: analysisAngles(item.title).map((articleTitle) => ({
      title: articleTitle,
      h1: articleTitle,
      keyword: articleTitle.toLowerCase(),
      status: 'planned',
    })),
    publishedCoverage: findCoverage(`${item.title} ${item.anchors.join(' ')}`, articles),
  }))
}

function statsFor(clusters) {
  const suggestedArticles = clusters.reduce((sum, cluster) => sum + cluster.suggestedArticles.length, 0)
  const withCoverage = clusters.filter((cluster) => cluster.publishedCoverage.length > 0).length
  return {
    clusters: clusters.length,
    suggestedArticles,
    clustersWithPublishedCoverage: withCoverage,
    clustersWithoutCoverage: clusters.length - withCoverage,
  }
}

function main() {
  const infusions = readJson(INFUSIONS_FILE)
  const plannerArticles = readJson(ARTICLES_FILE)
  const publishedArticles = readPublishedArticlesFromOut()

  const infusionClusters = buildInfusionClusters(infusions, publishedArticles)
  const checkupClusters = buildCheckupClusters(publishedArticles)
  const analysisClusters = buildAnalysisClusters(publishedArticles)

  const output = {
    generatedAt: new Date().toISOString(),
    source: {
      infusions: 'data/kapelnicy.generated.json',
      plannerArticles: 'article-planner/data/articles.json',
      publishedArticles: 'out/articles/*/index.html',
      checkups: 'lib/checkups.ts',
      analyses: 'lib/analyses.ts',
    },
    summary: {
      publishedArticles: publishedArticles.length,
      totalPlannerArticles: plannerArticles.length,
      infusions: statsFor(infusionClusters),
      checkups: statsFor(checkupClusters),
      analyses: statsFor(analysisClusters),
    },
    targetPotential: {
      serviceDrivenArticlesPotential:
        statsFor(infusionClusters).suggestedArticles + statsFor(checkupClusters).suggestedArticles + statsFor(analysisClusters).suggestedArticles,
      note: 'Это базовая безопасная контент-карта вокруг существующих услуг и диагностических направлений. При расширении на под-кластеры и НЧ-вопросы объём вырастет выше 500 материалов.',
    },
    sections: [
      {
        id: 'kapelnicy',
        title: 'Капельницы',
        clusters: infusionClusters,
      },
      {
        id: 'checkups',
        title: 'Чек-апы',
        clusters: checkupClusters,
      },
      {
        id: 'analyses',
        title: 'Анализы',
        clusters: analysisClusters,
      },
    ],
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8')
  console.log(`Generated ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`)
  console.log(JSON.stringify(output.summary, null, 2))
  console.log(`Potential articles: ${output.targetPotential.serviceDrivenArticlesPotential}`)
}

main()
