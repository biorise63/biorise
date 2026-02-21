'use client'

interface CatalogButtonProps {
  onClick: () => void
}

export default function CatalogButton({ onClick }: CatalogButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed z-40 bg-olive-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-olive-light transition-all catalog-button"
      aria-label="Открыть каталог капельниц"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}
