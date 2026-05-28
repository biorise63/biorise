'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_STORAGE_KEY, CookieConsentStatus } from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    setVisible(saved !== 'accepted' && saved !== 'declined')
  }, [])

  const setConsent = (status: CookieConsentStatus) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status)
    setVisible(false)
    window.dispatchEvent(new Event('cookie-consent-changed'))
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[95] sm:bottom-6 sm:left-6 sm:right-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-olive-primary/20 bg-white/95 p-4 shadow-[0_18px_45px_rgba(34,46,24,0.26)] backdrop-blur">
        <p className="text-sm leading-relaxed text-olive-primary/85 sm:text-base">
          Мы используем cookie и сервисы аналитики (включая обработку IP-адреса)
          для улучшения работы сайта. Продолжая использовать сайт, вы можете
          дать согласие на обработку таких данных.
          {' '}
          <Link href="/cookie-policy" className="underline hover:text-olive-light">
            Политика обработки cookie
          </Link>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setConsent('accepted')}
            className="rounded-full bg-olive-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-olive-light"
          >
            Принять согласие
          </button>
          <button
            onClick={() => setConsent('declined')}
            className="rounded-full border border-olive-primary/30 bg-white px-5 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-beige-background"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  )
}

