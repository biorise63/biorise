export type Author = {
  id: string
  name: string
  role: string
  avatar: string
}

// Реальные врачи и специалисты клиники BIORISE (см. components/Doctors.tsx).
// Используются как авторы статей для E-E-A-T — без вымышленных персон.
export const authors: Record<string, Author> = {
  potemkina: {
    id: 'potemkina',
    name: 'Потемкина Ольга Владимировна',
    role: 'Врач-терапевт, стаж 19 лет',
    avatar: '/optimized/doctors/potemkina.webp',
  },
  boboeva: {
    id: 'boboeva',
    name: 'Бобоева Наталья',
    role: 'Врач-эндокринолог',
    avatar: '/optimized/doctors/boboeva.webp',
  },
  tregubova: {
    id: 'tregubova',
    name: 'Трегубова Лиана Игоревна',
    role: 'Врач-диетолог',
    avatar: '/optimized/doctors/tregubova.webp',
  },
  malofeeva: {
    id: 'malofeeva',
    name: 'Малофеева Кристина Владимировна',
    role: 'Косметолог-эстетист',
    avatar: '/optimized/doctors/malofeeva.webp',
  },
}

export function getAuthor(authorId?: string): Author | null {
  if (!authorId) return null
  return authors[authorId] || null
}
