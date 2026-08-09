'use client'

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
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-olive-primary/20 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(34,46,24,0.26)] backdrop-blur">
        <p className="text-sm text-olive-text sm:text-[15px]">
          Мы используем cookie
        </p>
        <div className="shrink-0">
          <button
            onClick={() => setConsent('accepted')}
            className="rounded-full bg-olive-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-olive-light"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  )
}
