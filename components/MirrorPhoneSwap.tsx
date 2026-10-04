'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Номер телефона на основном сайте зашит в ~15 разных файлах в чуть
// разном написании ("+7 996 749 9747" и "+7 996 749 97 47"), отдельного
// общего источника правды нет. Переписывать все файлы под два домена -
// ненадёжно (легко пропустить формат), поэтому на зеркале
// biorise-clinics.ru номер подменяется один раз здесь, глобально по DOM,
// после каждой клиентской навигации.
const MIRROR_HOSTNAME = 'biorise-clinics.ru'
const OLD_HREF = 'tel:+79967499747'
const OLD_E164 = '+79967499747'
const NEW_HREF = 'tel:+79022951976'
const NEW_DISPLAY = '+7 902 295-19-76'
const PHONE_TEST_RE = /\+7\s?996\s?749\s?97\s?47/
const PHONE_REPLACE_RE = /\+7\s?996\s?749\s?97\s?47/g

export default function MirrorPhoneSwap() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hostname !== MIRROR_HOSTNAME) return

    document.querySelectorAll(`a[href="${OLD_HREF}"]`).forEach((a) => {
      a.setAttribute('href', NEW_HREF)
    })

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const parentTag = n.parentElement?.tagName
        if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return NodeFilter.FILTER_REJECT
        return PHONE_TEST_RE.test(n.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      },
    })
    const textNodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text)
    }
    textNodes.forEach((n) => {
      n.nodeValue = (n.nodeValue || '').replace(PHONE_REPLACE_RE, NEW_DISPLAY)
    })

    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      if (script.textContent && script.textContent.includes(OLD_E164)) {
        script.textContent = script.textContent.split(OLD_E164).join('+79022951976')
      }
    })
  }, [pathname])

  return null
}
