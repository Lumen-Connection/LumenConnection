import type { Metadata } from 'next'
import { viceDisplay, viceLcd, viceSerif } from '@/lib/fonts'

export const metadata: Metadata = {
  title: { absolute: '1986' },
  description: 'Um canto escondido.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: '/vice',
  },
}

export default function ViceLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${viceSerif.variable} ${viceDisplay.variable} ${viceLcd.variable}`}>
      {children}
    </div>
  )
}
