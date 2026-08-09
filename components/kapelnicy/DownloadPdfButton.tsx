'use client'

import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_STORAGE_KEY } from '@/lib/cookie-consent'

export default function DownloadPdfButton() {
  const [isHovered, setIsHovered] = useState(false)
  // Пока баннер cookie не закрыт, кнопка перекрывает его "ОК" в углу экрана
  // на мобильных — прячем до решения пользователя по cookie.
  const [consentResolved, setConsentResolved] = useState(false)

  useEffect(() => {
    const syncConsent = () => {
      const saved = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
      setConsentResolved(saved === 'accepted' || saved === 'declined')
    }

    syncConsent()
    window.addEventListener('cookie-consent-changed', syncConsent)
    return () => window.removeEventListener('cookie-consent-changed', syncConsent)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/docs/prajs-kapelnicy.pdf'
    link.download = 'Прайс Капельницы.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!consentResolved) return null

  return (
    <button
      type="button"
      onClick={handleDownload}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="download-pdf-button"
      aria-label="Прайс капельниц, скачать PDF"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="download-icon"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="download-text">Прайс капельниц</span>
    </button>
  )
}
