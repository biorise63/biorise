import type { Metadata } from 'next'
import DirectTrackerContent from '../direct-tracker/DirectTrackerContent'

export const metadata: Metadata = {
  title: 'Учёт заявок +7 996 749 97 47',
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

export default function DirectTrackerMainPage() {
  return <DirectTrackerContent pageTitle="Учет заявок +7 996 749 97 47" sourceLine="organic_996" />
}
