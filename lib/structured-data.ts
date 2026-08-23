export const SITE_URL = 'https://biorise-clinic.ru'

export const absoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'BIORISE',
  alternateName: 'БИОРАЙЗ',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo-cube.png`,
    contentUrl: `${SITE_URL}/logo-cube.png`,
  },
  telephone: '+79967499747',
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Самара',
      streetAddress: 'ул. Дыбенко, 27Б',
      addressCountry: 'RU',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Самара',
      streetAddress: 'ул. Стара Загора, 48',
      addressCountry: 'RU',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Самара',
      streetAddress: 'ул. Молодежная, 18',
      addressCountry: 'RU',
    },
  ],
  sameAs: [
    'https://t.me/biorise_smr',
    'https://vk.ru/biorise63',
    'https://www.instagram.com/biorise_samara',
    'https://max.ru/join/I8dvtxIVQ_gEOELaXkiwDZPefgBrLT6ojztVLP17oiQ',
  ],
}

export const medicalClinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${SITE_URL}/#medical-clinic`,
  name: 'BIORISE',
  alternateName: 'БИОРАЙЗ',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-cube.png`,
  image: `${SITE_URL}/clinic-about.jpg`,
  telephone: '+79967499747',
  medicalSpecialty: ['IV therapy', 'Laboratory diagnostics', 'Preventive medicine'],
  priceRange: '₽₽',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Самара',
    streetAddress: 'ул. Дыбенко, 27Б',
    addressCountry: 'RU',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '15:00',
    },
  ],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'BIORISE',
  alternateName: 'БИОРАЙЗ',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'ru-RU',
}

export const articleAuthorPersonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#medical-editorial-author`,
  name: 'Медицинская редакция BIORISE',
  url: `${SITE_URL}/articles/`,
  worksFor: { '@id': `${SITE_URL}/#organization` },
  affiliation: { '@id': `${SITE_URL}/#medical-clinic` },
  sameAs: ['https://vk.ru/biorise63'],
}

export function createWebPageJsonLd({
  url,
  name,
  description,
  type = 'WebPage',
}: {
  url: string
  name: string
  description?: string
  type?: 'WebPage' | 'CollectionPage'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(url)}#webpage`,
    url: absoluteUrl(url),
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'ru-RU',
  }
}

export function createItemListJsonLd({
  url,
  name,
  items,
}: {
  url: string
  name: string
  items: Array<{ url: string; name: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(url)}#itemlist`,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
      item: absoluteUrl(item.url),
    })),
  }
}

export function createServiceJsonLd({
  url,
  name,
  description,
  serviceType,
  price,
  priceValidUntil,
}: {
  url: string
  name: string
  description: string
  serviceType: string
  price?: string
  priceValidUntil?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(url)}#service`,
    name,
    description,
    serviceType,
    provider: { '@id': `${SITE_URL}/#medical-clinic` },
    areaServed: {
      '@type': 'City',
      name: 'Самара',
    },
    url: absoluteUrl(url),
    offers: price
      ? {
          '@type': 'Offer',
          priceCurrency: 'RUB',
          price: price.replace(/[^\d]/g, ''),
          availability: 'https://schema.org/InStock',
          url: absoluteUrl(url),
          ...(priceValidUntil ? { priceValidUntil } : {}),
        }
      : undefined,
  }
}

export function createImageObjectJsonLd({
  url,
  name,
  caption,
}: {
  url: string
  name: string
  caption?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${absoluteUrl(url)}#image`,
    url: absoluteUrl(url),
    contentUrl: absoluteUrl(url),
    name,
    caption: caption || name,
    creator: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'BIORISE' },
    copyrightHolder: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'BIORISE' },
    license: `${SITE_URL}/privacy/`,
    acquireLicensePage: `${SITE_URL}/privacy/`,
  }
}

export function createBlogPostingJsonLd({
  url,
  headline,
  description,
  publishedAt,
  modifiedAt,
  image,
  authorId,
}: {
  url: string
  headline: string
  description: string
  publishedAt: string
  modifiedAt?: string
  image?: string
  authorId?: string
}) {
  const absolutePageUrl = absoluteUrl(url)
  const imageUrl = image ? absoluteUrl(image) : `${SITE_URL}/logo-cube.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absolutePageUrl}#blogposting`,
    headline,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@id': authorId ? `${SITE_URL}/#author-${authorId}` : `${SITE_URL}/#medical-editorial-author`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${absolutePageUrl}#webpage`,
    },
    image: imageUrl,
    inLanguage: 'ru-RU',
  }
}

export function createDoctorPersonJsonLd(author: {
  id: string
  name: string
  role: string
  avatar: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#author-${author.id}`,
    name: author.name,
    jobTitle: author.role,
    image: absoluteUrl(author.avatar),
    url: `${SITE_URL}/vrachi/${author.id}/`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    affiliation: { '@id': `${SITE_URL}/#medical-clinic` },
  }
}

export function createVideoObjectJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${SITE_URL}/#hero-video`,
    name: 'Клиника капельниц BIORISE в Самаре',
    description: 'Фоновое видео главного экрана сайта BIORISE о клинике капельниц, анализах и чек-апах в Самаре.',
    thumbnailUrl: [`${SITE_URL}/optimized/video/hero-poster.webp`],
    uploadDate: '2026-07-01',
    contentUrl: `${SITE_URL}/optimized/video/hero-desktop-720p.mp4`,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}
