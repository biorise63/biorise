'use client'

import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getIcon } from '@/components/kapelnicy/icon-map'
import type { Author } from '@/lib/authors'

interface VrachiContentProps {
  authors: Author[]
}

export default function VrachiContent({ authors }: VrachiContentProps) {
  return (
    <div className="bg-white pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Врачи', href: '/vrachi/' },
          ]}
        />

        <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
          <div className="text-olive-primary">{getIcon('doctors')}</div>
          <h1 className="text-3xl font-light leading-tight text-olive-primary sm:text-4xl md:text-5xl">
            Врачи клиники BIORISE
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-center text-base text-olive-text sm:text-left sm:text-lg">
          Врачи и специалисты, которые ведут пациентов BIORISE в Самаре.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {authors.map((author) => (
            <article
              key={author.id}
              className="flex flex-col overflow-hidden rounded-[1.5rem] border border-olive-primary/10 bg-white shadow-premium transition-all duration-200 hover:-translate-y-1 hover:shadow-premium-hover"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-lg font-medium leading-snug text-olive-primary sm:text-xl">
                  {author.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-olive-primary/80">{author.role}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-olive-text">{author.shortBio}</p>

                <Link
                  href={`/vrachi/${author.id}/`}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-olive-primary px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-olive-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-primary"
                >
                  Подробнее
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
