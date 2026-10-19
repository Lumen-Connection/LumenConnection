import { Bebas_Neue, Geist, Instrument_Serif, VT323 } from 'next/font/google'

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

/** Serif cinematográfica da página secreta /vice — só entra no layout dessa rota. */
export const viceSerif = Instrument_Serif({
  variable: '--font-vice-serif',
  subsets: ['latin'],
  weight: '400',
})

/** Condensada 80s da página secreta /vice. */
export const viceDisplay = Bebas_Neue({
  variable: '--font-vice-display',
  subsets: ['latin'],
  weight: '400',
})

/** Display de LCD do rádio do painel em /vice. */
export const viceLcd = VT323({
  variable: '--font-vice-lcd',
  subsets: ['latin'],
  weight: '400',
})
