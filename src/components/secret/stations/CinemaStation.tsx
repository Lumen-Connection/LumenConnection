'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { GTA_VI_TRAILERS } from '@/data/gta-vi'
import type { Locale } from '@/lib/i18n/translations'
import type { Station } from '../dashboard/stations'
import { StationHeader, formatShortDate } from './StationHeader'

const COPY = {
  pt: {
    title: 'Sessão da meia-noite no drive-in.',
    body: 'Do primeiro trailer, em dezembro de 2023, ao Launch Trailer de 15 de outubro. Ao dar play aqui, o rádio do painel pausa sozinho.',
    watch: 'Assistir',
    song: 'Faixa',
    latest: 'Mais recente',
  },
  en: {
    title: 'Midnight show at the drive-in.',
    body: 'From the first trailer in December 2023 to the October 15 Launch Trailer. Hit play here and the dashboard radio pauses itself.',
    watch: 'Watch',
    song: 'Track',
    latest: 'Latest',
  },
} as const

type Trailer = (typeof GTA_VI_TRAILERS)[number]

export function CinemaStation({
  locale,
  station,
  onWatch,
}: {
  locale: Locale
  station: Station
  onWatch: () => void
}) {
  const copy = COPY[locale]
  const [selected, setSelected] = useState<Trailer>(GTA_VI_TRAILERS[0])
  const [started, setStarted] = useState(false)

  const start = () => {
    onWatch()
    setStarted(true)
  }

  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-5">
        <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
          {started ? (
            <iframe
              key={selected.id}
              title={`Grand Theft Auto VI ${selected.title}`}
              src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1&rel=0`}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={start}
              className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4ad8]"
            >
              <img
                key={selected.id}
                src={`https://i.ytimg.com/vi/${selected.youtubeId}/maxresdefault.jpg`}
                onError={(event) => {
                  const fallback = `https://i.ytimg.com/vi/${selected.youtubeId}/hqdefault.jpg`
                  if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
                }}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-[#ff4ad8] bg-black/50 text-[#ff4ad8] group-hover:bg-[#ff4ad8] group-hover:text-black transition-colors">
                  <Play aria-hidden="true" className="w-7 h-7 fill-current ml-1" />
                </span>
                <span className="font-[family-name:var(--font-vice-display)] text-2xl sm:text-3xl tracking-[0.18em] text-white">
                  {copy.watch} · {selected.title}
                </span>
              </span>
            </button>
          )}
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3 content-start">
          {GTA_VI_TRAILERS.map((trailer, i) => {
            const active = trailer.id === selected.id
            return (
              <li key={trailer.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setSelected(trailer)
                    if (started) onWatch()
                  }}
                  className={`w-full text-left border p-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4ad8] ${
                    active ? 'border-[#ff4ad8]/60 bg-[#ff4ad8]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                  }`}
                >
                  <span className="flex flex-wrap items-baseline gap-x-2 text-[10px] tracking-[0.22em] uppercase text-[#5ce1ff]">
                    {trailer.title}
                    {i === 0 && <span className="text-[#ff4ad8]">{copy.latest}</span>}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-white/40">
                    {formatShortDate(trailer.date, locale)}
                  </span>
                  <span className="mt-1.5 block text-xs text-white/65 line-clamp-2">
                    {copy.song}: {trailer.song}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
