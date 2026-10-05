import type { Metadata } from 'next'
import DirectTrackerContent from './DirectTrackerContent'

export const metadata: Metadata = {
  title: 'Учёт заявок',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DirectTrackerPage() {
  return <DirectTrackerContent />
}
