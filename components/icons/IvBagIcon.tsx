import type { SVGProps } from 'react'

// Капельница / IV-мешок - в lucide-react нет подходящей иконки, отрисована
// вручную в том же визуальном языке (24x24, скруглённые концы, currentColor).
export default function IvBagIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2v2.5" />
      <path d="M8 4.5h8l1 5.5a5 5 0 0 1-10 0Z" />
      <path d="M12 12v3" />
      <path d="M12 18v2.5" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
