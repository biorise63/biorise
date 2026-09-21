import type { SVGProps } from 'react'

// Биоимпедансный анализ тела - силуэт человека + сигнальные дуги, в lucide-react
// прямого аналога нет. Стиль и толщина линии подобраны под остальные иконки сайта.
export default function BodyScanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="5" r="2" />
      <path d="M9 9c-1.7 0-3 1.3-3 3v7" />
      <path d="M9 9c1.7 0 3 1.3 3 3v7" />
      <path d="M15 7c1 1 1 3.5 0 4.5" />
      <path d="M17.5 5c2 2 2 6.5 0 8.5" />
    </svg>
  )
}
