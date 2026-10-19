'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n/translations'
import {
  BAND_MAX,
  BAND_MIN,
  STATIONS,
  bandPosition,
  formatFreq,
  nearestStation,
  type Station,
  type StationId,
} from './stations'

const COPY = {
  pt: { stations: 'Estações', seekBack: 'Estação anterior', seekNext: 'Próxima estação', searching: 'Sintonizando…' },
  en: { stations: 'Stations', seekBack: 'Previous station', seekNext: 'Next station', searching: 'Tuning…' },
} as const

const TICKS = Array.from({ length: BAND_MAX - Math.ceil(BAND_MIN) + 1 }, (_, i) => Math.ceil(BAND_MIN) + i)

export function Tuner({
  locale,
  station,
  onTune,
  onStep,
}: {
  locale: Locale
  station: Station
  onTune: (id: StationId) => void
  onStep: (direction: 1 | -1) => void
}) {
  const copy = COPY[locale]
  const bandRef = useRef<HTMLDivElement>(null)
  const [dragFreq, setDragFreq] = useState<number | null>(null)

  const freqAt = (clientX: number) => {
    const rect = bandRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return station.freq
    const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return BAND_MIN + t * (BAND_MAX - BAND_MIN)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragFreq(freqAt(event.clientX))
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragFreq !== null) setDragFreq(freqAt(event.clientX))
  }
  const onPointerUp = () => {
    if (dragFreq === null) return
    onTune(nearestStation(dragFreq).id)
    setDragFreq(null)
  }

  const shownFreq = dragFreq ?? station.freq
  const locked = dragFreq === null || Math.abs(nearestStation(dragFreq).freq - dragFreq) < 0.35
  const lcdStation = dragFreq === null ? station : nearestStation(dragFreq)

  return (
    <div className="min-w-0">
      {/* LCD */}
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="vice-key shrink-0 w-10 sm:w-11"
          aria-label={copy.seekBack}
        >
          <ChevronLeft aria-hidden="true" className="w-4 h-4" />
        </button>
        <div className="vice-lcd flex-1 min-w-0 flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-1.5">
          <p className="shrink-0 font-[family-name:var(--font-vice-lcd)] leading-none">
            <span className="mr-1 text-xs sm:text-sm text-[#5ce1ff]/60 align-top">FM</span>
            <span className="text-4xl sm:text-5xl tabular-nums text-[#5ce1ff] vice-lcd-glow">
              {formatFreq(shownFreq)}
            </span>
          </p>
          <div className="min-w-0" aria-live="polite">
            <p className="truncate font-[family-name:var(--font-vice-lcd)] text-xl sm:text-2xl leading-none text-[#ffb4e6] uppercase">
              {locked ? lcdStation.name[locale] : copy.searching}
            </p>
            <p className="mt-1 truncate text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/45">
              {locked ? lcdStation.tagline[locale] : '· · ·'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onStep(1)}
          className="vice-key shrink-0 w-10 sm:w-11"
          aria-label={copy.seekNext}
        >
          <ChevronRight aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>

      {/* Dial: arrastar a agulha, clicar ou rolar. Teclado usa presets e setas. */}
      <div
        ref={bandRef}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDragFreq(null)}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) < 4) return
          onStep(event.deltaY > 0 ? 1 : -1)
        }}
        className="vice-band relative mt-2 h-9 sm:h-11 cursor-ew-resize touch-none select-none"
      >
        {TICKS.map((tick) => (
          <span
            key={tick}
            className={`absolute bottom-0 w-px ${tick % 4 === 0 ? 'h-3 bg-white/45' : 'h-1.5 bg-white/20'}`}
            style={{ left: `${bandPosition(tick)}%` }}
          >
            {tick % 4 === 0 && (
              <span className="absolute bottom-3.5 left-1/2 -translate-x-1/2 font-[family-name:var(--font-vice-lcd)] text-[11px] text-white/35">
                {tick}
              </span>
            )}
          </span>
        ))}
        {STATIONS.map((item) => (
          <span
            key={item.id}
            className={`absolute top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
              item.id === station.id ? 'bg-[#ff4ad8] shadow-[0_0_8px_#ff4ad8]' : 'bg-[#ff4ad8]/45'
            }`}
            style={{ left: `${bandPosition(item.freq)}%` }}
          />
        ))}
        <span
          className={`vice-needle absolute inset-y-0 w-0.5 -translate-x-1/2 ${dragFreq === null ? 'transition-[left] duration-500 ease-out' : ''}`}
          style={{ left: `${bandPosition(shownFreq)}%` }}
        />
      </div>

      {/* Presets 1–6 */}
      <div role="tablist" aria-label={copy.stations} className="mt-2 grid grid-cols-6 gap-1.5">
        {STATIONS.map((item, i) => {
          const active = item.id === station.id
          return (
            <button
              key={item.id}
              id={`vice-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="vice-station-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => onTune(item.id)}
              className={`vice-key flex-col py-1.5 ${active ? 'vice-key-active' : ''}`}
            >
              <span className="font-[family-name:var(--font-vice-lcd)] text-base leading-none">{i + 1}</span>
              <span className="mt-0.5 max-w-full truncate px-0.5 text-[9px] tracking-[0.12em] uppercase">
                <span className="sm:hidden">{item.short[locale]}</span>
                <span className="hidden sm:inline">{formatFreq(item.freq)}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
