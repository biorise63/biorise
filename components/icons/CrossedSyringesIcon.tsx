import type { SVGProps } from 'react'

// Бустер-инъекции - две перекрещенные капельницы/шприца, в lucide-react есть
// одиночный Syringe, но не парный вариант. Собрана из двух копий пути
// lucide Syringe, повёрнутых и совмещённых по центру - масштаб и повороты
// подобраны визуально, чтобы обе иконки уместились в те же 24x24.
export default function CrossedSyringesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <g transform="rotate(-20 12 12) scale(0.72) translate(4.6 4.6)">
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" />
        <path d="m5 19-3 3" />
        <path d="m14 4 6 6" />
      </g>
      <g transform="rotate(70 12 12) scale(0.72) translate(4.6 4.6)">
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" />
        <path d="m5 19-3 3" />
        <path d="m14 4 6 6" />
      </g>
    </svg>
  )
}
