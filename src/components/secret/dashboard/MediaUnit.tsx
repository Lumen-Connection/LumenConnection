'use client'

import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import type { Locale } from '@/lib/i18n/translations'
import { formatTime, type LeonidaRadio } from './useLeonidaRadio'

const COPY = {
  pt: { label: 'Rádio Leonida', play: 'Tocar', pause: 'Pausar', prev: 'Faixa anterior', next: 'Próxima faixa' },
  en: { label: 'Leonida Radio', play: 'Play', pause: 'Pause', prev: 'Previous track', next: 'Next track' },
} as const

export function MediaUnit({ locale, radio }: { locale: Locale; radio: LeonidaRadio }) {
  const copy = COPY[locale]
  const { track } = radio
  return (
    <div className="min-w-0 flex items-center gap-3 lg:flex-col lg:items-stretch lg:gap-2">
      <div className="min-w-0 flex-1 lg:flex-none">
        <p className="hidden lg:block text-[10px] tracking-[0.28em] uppercase text-[#ff4ad8]">
          {copy.label}
        </p>
        <p className="truncate text-sm text-white lg:mt-1">{track.title}</p>
        <p className="truncate text-[11px] text-white/50">{track.artist}</p>
        <div className="mt-1.5 h-0.5 bg-white/10">
          <div className="h-full bg-[#ff4ad8]" style={{ width: `${radio.progress}%` }} />
        </div>
        <p className="hidden lg:flex mt-1 justify-between font-mono text-[10px] tabular-nums text-white/40">
          <span>{formatTime(radio.currentTime)}</span>
          <span>{formatTime(radio.duration)}</span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 lg:justify-between">
        <button type="button" onClick={radio.prev} className="vice-key h-9 w-9" aria-label={copy.prev}>
          <SkipBack aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={radio.toggle}
          className="inline-flex h-10 w-10 lg:h-11 lg:flex-1 items-center justify-center rounded-sm bg-[#ff4ad8] text-black hover:bg-[#ff74e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={radio.playing ? copy.pause : copy.play}
        >
          {radio.playing ? (
            <Pause aria-hidden="true" className="w-4 h-4 fill-current" />
          ) : (
            <Play aria-hidden="true" className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
        <button type="button" onClick={radio.next} className="vice-key h-9 w-9" aria-label={copy.next}>
          <SkipForward aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
