'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnalysesFloatingActions() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDownloadOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDownloadOpen])

  return (
    <div ref={rootRef} className="fixed bottom-5 right-4 z-[85] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={`origin-bottom-right rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-all duration-200 ${
          isDownloadOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <a
          href="/docs/prajs-analizy.csv"
          download="prajs-analizy.csv"
          className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Скачать прайс анализов
        </a>
      </div>

      <button
        type="button"
        onClick={() => setIsDownloadOpen((prev) => !prev)}
        aria-label={isDownloadOpen ? 'Скрыть ссылку на скачивание прайса анализов' : 'Показать ссылку на скачивание прайса анализов'}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_16px_32px_rgba(37,99,235,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Прокрутить страницу вверх"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#2563EB] shadow-[0_12px_26px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 14 6-6 6 6" />
        </svg>
      </button>
    </div>
  )
}
