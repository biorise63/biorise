import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import AnalysisPageContent from './AnalysisPageContent'
import { analysisPages, getAnalysisPageBySlug } from '@/lib/analysisPages'
import { createFaqJsonLd, createServiceJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

export function generateStaticParams() {
  return analysisPages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const page = getAnalysisPageBySlug(params.slug)
  if (!page) return {}

  const title = `${page.h1} | BIORISE`

  return {
    title,
    description: page.metaDescription,
    keywords: [page.title, `${page.title} самара`, 'сдать анализ самара', 'BIORISE', 'БИОРАЙЗ'],
    alternates: {
      canonical: `${SITE_URL}/analizy/${page.slug}/`,
    },
    openGraph: {
      title,
      description: page.metaDescription,
      url: `${SITE_URL}/analizy/${page.slug}/`,
      siteName: 'BIORISE',
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function AnalysisSlugPage({ params }: PageProps) {
  const page = getAnalysisPageBySlug(params.slug)
  if (!page) notFound()

  const webPageJsonLd = createWebPageJsonLd({
    url: `/analizy/${page.slug}/`,
    name: page.h1,
    description: page.metaDescription,
  })
  const serviceJsonLd = createServiceJsonLd({
    url: `/analizy/${page.slug}/`,
    name: page.h1,
    description: page.intro,
    serviceType: 'Лабораторная диагностика',
    price: page.price,
  })
  const faqJsonLd = createFaqJsonLd(page.faq)

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[webPageJsonLd, serviceJsonLd, faqJsonLd]} />
      <Header />
      <AnalysisPageContent page={page} />
      <Footer />
    </main>
  )
}
