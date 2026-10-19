import type { Locale } from '@/lib/i18n/translations'

export type StationId = 'boletim' | 'cinema' | 'radio' | 'dial' | 'mapa' | 'nextstation'

export type Station = {
  id: StationId
  freq: number
  /** Fundo do para-brisa quando a estação está sintonizada. */
  image: string
  name: Record<Locale, string>
  /** Rótulo curto dos presets no celular. */
  short: Record<Locale, string>
  tagline: Record<Locale, string>
}

export const BAND_MIN = 87.5
export const BAND_MAX = 108

export const STATIONS: Station[] = [
  {
    id: 'boletim',
    freq: 88.6,
    image: '/images/secret/vice-city-sunset.jpg',
    name: { pt: 'Boletim Leonida', en: 'Leonida Bulletin' },
    short: { pt: 'Boletim', en: 'News' },
    tagline: { pt: 'Contagem, fatos e Newswire', en: 'Countdown, facts and Newswire' },
  },
  {
    id: 'cinema',
    freq: 92.4,
    image: '/images/secret/vice-city-sign.jpg',
    name: { pt: 'Cine Vice', en: 'Cine Vice' },
    short: { pt: 'Cinema', en: 'Cinema' },
    tagline: { pt: 'Os quatro trailers oficiais', en: 'The four official trailers' },
  },
  {
    id: 'radio',
    freq: 98.3,
    image: '/images/secret/ocean-view-neon.jpg',
    name: { pt: 'Rádio Leonida', en: 'Leonida Radio' },
    short: { pt: 'Rádio', en: 'Radio' },
    tagline: { pt: 'As faixas dos trailers', en: 'Songs from the trailers' },
  },
  {
    id: 'dial',
    freq: 101.9,
    image: '/images/secret/vice-city-night.jpg',
    name: { pt: 'Dial oficial', en: 'Official dial' },
    short: { pt: 'Dial', en: 'Dial' },
    tagline: { pt: 'As rádios reveladas do VI', en: 'The revealed VI stations' },
  },
  {
    id: 'mapa',
    freq: 104.2,
    image: '/images/secret/regions/leonida-keys.jpg',
    name: { pt: 'Mapa de Leonida', en: 'Leonida Map' },
    short: { pt: 'Mapa', en: 'Map' },
    tagline: { pt: 'Seis regiões, um estado', en: 'Six regions, one state' },
  },
  {
    id: 'nextstation',
    freq: 107.7,
    image: '/images/secret/jason-lucia-sunset.jpg',
    name: { pt: 'NextStation', en: 'NextStation' },
    short: { pt: 'Next', en: 'Next' },
    tagline: { pt: 'O canal da Lumen sobre o VI', en: 'Lumen’s channel on VI' },
  },
]

export function stationById(id: StationId): Station {
  return STATIONS.find((station) => station.id === id) ?? STATIONS[0]
}

export function bandPosition(freq: number): number {
  return ((freq - BAND_MIN) / (BAND_MAX - BAND_MIN)) * 100
}

export function nearestStation(freq: number): Station {
  return STATIONS.reduce((best, station) =>
    Math.abs(station.freq - freq) < Math.abs(best.freq - freq) ? station : best,
  )
}

export function formatFreq(freq: number): string {
  return freq.toFixed(1)
}
