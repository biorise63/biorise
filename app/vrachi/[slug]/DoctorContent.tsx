'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useBookingModal } from '@/components/BookingModalProvider'
import type { Author } from '@/lib/authors'
import { articles } from '@/lib/articles'

interface DoctorContentProps {
  author: Author
}

export default function DoctorContent({ author }: DoctorContentProps) {
  const { openBookingModal } = useBookingModal()
  const authorArticles = articles.filter((article) => article.authorId === author.id)

  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Врачи', href: '/#doctors' },
            { name: author.name, href: `/vrachi/${author.id}/` },
          ]}
        />

        <Link
          href="/#doctors"
          className="inline-flex items-center gap-2 text-sm font-medium text-olive-primary transition-colors hover:text-olive-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Все врачи
        </Link>

        <section className="mt-4 overflow-hidden rounded-[2rem] border border-olive-primary/10 bg-beige-background/70">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-10 lg:px-12">
            <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-[1.5rem] shadow-premium">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-[32px] font-light leading-[1.1] text-olive-primary sm:text-[38px] lg:text-[44px]">
                {author.seoH1}
              </h1>
              <p className="mt-2 text-lg text-olive-primary">{author.role}</p>
              <p className="mt-1 text-sm text-olive-text">{author.shortBio}</p>

              <div className="mt-6 space-y-4">
                {author.bio.map((paragraph, index) => (
                  <p key={index} className="text-[17px] leading-[1.65] text-olive-text sm:text-[18px]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-6 text-sm text-olive-primary">{author.location}</p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center justify-center rounded-full bg-olive-primary px-6 py-3 text-base font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-olive-light"
                >
                  Записаться на приём
                </button>
              </div>
            </div>
          </div>
        </section>

        {authorArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
              Статьи автора
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}/`}
                  className="flex h-full flex-col rounded-[1.5rem] border border-olive-primary/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                >
                  <h3 className="text-[17px] font-medium leading-snug text-olive-primary">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.55] text-olive-text">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
