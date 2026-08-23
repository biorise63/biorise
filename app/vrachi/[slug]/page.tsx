import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import DoctorContent from './DoctorContent'
import { getAllAuthors, getAuthor } from '@/lib/authors'
import { createDoctorPersonJsonLd, createWebPageJsonLd } from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = 'https://biorise-clinic.ru'

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.id }))
}

export function generateMetadata({ params }: PageProps) {
  const author = getAuthor(params.slug)
  if (!author) return {}

  const title = `${author.name} — ${author.role} в клинике BIORISE в Самаре`
  const description = `${author.name}, ${author.role.toLowerCase()} клиники BIORISE в Самаре. ${author.shortBio}. Запись на приём онлайн или по телефону.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/vrachi/${author.id}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/vrachi/${author.id}/`,
      siteName: 'BIORISE',
      locale: 'ru_RU',
      type: 'profile',
      images: [{ url: `${SITE_URL}${author.avatar}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function DoctorPage({ params }: PageProps) {
  const author = getAuthor(params.slug)
  if (!author) notFound()

  const personJsonLd = createDoctorPersonJsonLd(author)
  const webPageJsonLd = createWebPageJsonLd({
    url: `/vrachi/${author.id}/`,
    name: `${author.name} — ${author.role}`,
    description: `${author.name}, ${author.role.toLowerCase()} клиники BIORISE в Самаре.`,
  })

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[personJsonLd, webPageJsonLd]} />
      <Header />
      <DoctorContent author={author} />
      <Footer />
    </main>
  )
}
