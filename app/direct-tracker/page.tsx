import type { Metadata } from 'next'
import DirectTrackerContent from './DirectTrackerContent'

export const metadata: Metadata = {
  title: 'Учёт заявок +7 902 295-19-76',
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
  return <DirectTrackerContent pageTitle="Учет заявок +7 902 295-19-76" sourceLine="direct_902" />
}
