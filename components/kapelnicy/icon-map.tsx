import React from 'react'

export const iconSet: Record<string, JSX.Element> = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5.5 12 3l8 2.5v5.75c0 4.2-3.3 8.1-8 9.75-4.7-1.65-8-5.55-8-9.75V5.5Z" />
    </svg>
  ),
  leaf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 3s-4 1-7 4-4 7-4 7 4-1 7-4 4-7 4-7Z" />
      <path d="M14 7c0 4.418-3.582 8-8 8" />
    </svg>
  ),
  brain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5a3 3 0 1 0-6 0v7a3 3 0 1 0 6 0V5Z" />
      <path d="M18 5a3 3 0 1 0-6 0v7a3 3 0 1 0 6 0V5Z" />
      <path d="M6 8h6" />
      <path d="M12 9h6" />
      <path d="M6 13h6" />
      <path d="M12 15h6" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-6.5-4.35-9-8.5C1.2 10 1.6 6.3 4.5 4.8 7.4 3.3 10 5.2 12 7.2c2-2 4.6-3.9 7.5-2.4 2.9 1.5 3.3 5.2 1.5 7.7-2.5 4.15-9 8.5-9 8.5Z" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m7 13 5-11-1 9h6l-5 11 1-9H7Z" />
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v18" />
      <path d="m3 7 5 12 4-9 4 9 5-12H3Z" />
      <path d="M2 9h20" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 1.7 4.6L18 9.3l-4 3.4 1.2 5.3L12 15.7l-3.2 2.3L10 12.7 6 9.3l4.3-1.7L12 3Z" />
    </svg>
  ),
  baby: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="9" r="4" />
      <path d="M7 22c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M12 13v4" />
    </svg>
  ),
  alert: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="m10.29 3.86-8.37 14.5A1 1 0 0 0 2.76 20h18.48a1 1 0 0 0 .84-1.64l-8.37-14.5a1 1 0 0 0-1.68 0Z" />
    </svg>
  ),
  plus: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  ),
}

export const getIcon = (name?: string) => (name ? iconSet[name] || null : null)
