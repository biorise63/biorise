'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'biorise_vk_contest_popup_closed_v1'
const CONTEST_URL = 'https://vk.com/wall-233125534_102'

export default function VkContestPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY) === '1') return

    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
  }

  if (!isMounted || !isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vk-contest-popup-title"
    >
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-popup-fade-in"
        onClick={closePopup}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-[860px] overflow-hidden rounded-[22px] border border-white/35 bg-[#f5ede0] shadow-[0_24px_70px_rgba(17,18,16,0.32)] animate-popup-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-20 h-9 w-9 rounded-full bg-white/90 text-xl leading-none text-[#4f5e3b] transition-colors hover:bg-white"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[220px] md:min-h-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/promo/vk-contest-main.jpg"
              alt="Конкурс BIORISE во ВКонтакте"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              VK конкурс
            </div>
          </div>

          <div className="relative p-5 sm:p-7 md:p-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#7b8f5d]/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4f5e3b]">
              Разыгрываем курс красоты!
            </div>

            <h2
              id="vk-contest-popup-title"
              className="font-heading text-[28px] font-bold leading-[1.08] text-[#334129] sm:text-[34px]"
            >
              Участвуйте в конкурсе
              <br />
              ВКонтакте от BIORISE
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-[#4c5b3b]/90 sm:text-base">
              Получите шанс выиграть премиальные процедуры и бонусы от клиники.
              Переходите по кнопке и участвуйте прямо сейчас.
            </p>

            <a
              href={CONTEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex w-full items-center justify-center rounded-[16px] bg-gradient-to-b from-[#7f945a] to-[#667a43] px-5 py-4 text-center text-lg font-semibold text-white shadow-[0_14px_32px_rgba(60,77,34,0.35)] transition-all duration-300 hover:-translate-y-[1px] hover:brightness-105"
            >
              Принять участие
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <p className="mt-3 text-center text-xs text-[#5d694a]/80">
              Откроется в новом окне VK
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
