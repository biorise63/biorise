'use client'

import { useState } from 'react'

export default function DownloadPdfButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/docs/prajs-kapelnicy.pdf'
    link.download = 'Прайс Капельницы.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="download-pdf-button"
      aria-label="Скачать прайс-лист капельниц"
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
