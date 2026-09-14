'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

// Счётчик просмотров статьи. Бэкенд - тот же Python-сервис, что уже обслуживает
// форму записи (yc-pipeline/booking-api/booking_api.py, эндпоинты /api/views/<slug>),
// nginx проксирует весь /api/ на него же, отдельный сервис не заводили.
// Дедупликация - не более одного инкремента с одного браузера в день (localStorage),
// чтобы обновление страницы не накручивало счётчик.
export default function ArticleViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const storageKey = `biorise:viewed:${slug}`
    const today = new Date().toISOString().slice(0, 10)
    let lastViewed: string | null = null
    try {
      lastViewed = localStorage.getItem(storageKey)
    } catch {
      // localStorage недоступен (приватный режим и т.п.) - просто не дедуплицируем
    }

    const shouldIncrement = lastViewed !== today

    fetch(`/api/views/${slug}`, { method: shouldIncrement ? 'POST' : 'GET' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setCount(data.count)
        }
      })
      .catch(() => {
        // счётчик недоступен - молча скрываем блок, не мешаем чтению статьи
      })

    if (shouldIncrement) {
      try {
        localStorage.setItem(storageKey, today)
      } catch {
        // ignore
      }
    }
  }, [slug])

  if (count === null) return null

  return (
    <>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1.5">
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        {count.toLocaleString('ru-RU')}
      </span>
    </>
  )
}
