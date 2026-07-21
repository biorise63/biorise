'use client'

interface CatalogButtonProps {
  onClick: () => void
}

export default function CatalogButton({ onClick }: CatalogButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-olive-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-olive-light md:hidden"
      aria-label="Открыть каталог капельниц"
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
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span>Каталог капельниц</span>
    </button>
  )
}
