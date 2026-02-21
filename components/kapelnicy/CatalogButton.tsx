'use client'

interface CatalogButtonProps {
  onClick: () => void
}

export default function CatalogButton({ onClick }: CatalogButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed top-20 left-4 z-40 bg-olive-primary text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-olive-light transition-all"
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
      <span className="font-medium text-sm">Каталог</span>
    </button>
  )
}
