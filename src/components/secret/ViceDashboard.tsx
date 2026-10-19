'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { GTA_VI_LAUNCH_AT } from '@/data/gta-vi'
import { GTA_VI_RADIO } from '@/data/gta-vi-radio'
import { homePath } from '@/data/service-links'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { MediaUnit } from './dashboard/MediaUnit'
import { Odometer } from './dashboard/Odometer'
import { RearviewMirror } from './dashboard/RearviewMirror'
import { Tuner } from './dashboard/Tuner'
import { STATIONS, stationById, type StationId } from './dashboard/stations'
import { useLeonidaRadio } from './dashboard/useLeonidaRadio'
import { BulletinStation } from './stations/BulletinStation'
import { CinemaStation } from './stations/CinemaStation'
import { MapStation } from './stations/MapStation'
import { NextStationStation } from './stations/NextStationStation'
import { OfficialDialStation } from './stations/OfficialDialStation'
import { RadioStation } from './stations/RadioStation'

const COPY = {
  pt: {
    heading: 'Vice City — painel do GTA VI',
    back: 'Voltar para a Lumen',
    backShort: 'Lumen',
    mirror: 'Rádio Leonida',
    odometer: 'Leonida em',
    keys: '← → sintoniza · 1–6 presets',
  },
  en: {
    heading: 'Vice City — the GTA VI dashboard',
    back: 'Back to Lumen',
    backShort: 'Lumen',
    mirror: 'Leonida Radio',
    odometer: 'Leonida in',
    keys: '← → tune · 1–6 presets',
  },
} as const

const LAUNCH_MS = Date.parse(GTA_VI_LAUNCH_AT)

function isStationId(value: string): value is StationId {
  return STATIONS.some((station) => station.id === value)
}

/** Chiado curto de troca de estação. */
function useTuningStatic() {
  const ctxRef = useRef<AudioContext | null>(null)
  return useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = (ctxRef.current ??= new AudioCtx())
      const length = Math.floor(ctx.sampleRate * 0.22)
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length)
      const source = ctx.createBufferSource()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()
      source.buffer = buffer
      filter.type = 'bandpass'
      filter.frequency.value = 2400
      gain.gain.value = 0.05
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    } catch {
      /* áudio bloqueado — a troca segue em silêncio */
    }
  }, [])
}

export function ViceDashboard() {
  const { locale } = useLocale()
  const copy = COPY[locale]
  const radio = useLeonidaRadio(GTA_VI_RADIO)
  const [stationId, setStationId] = useState<StationId>('boletim')
  const [staticKey, setStaticKey] = useState(0)
  const [now, setNow] = useState<number | null>(null)
  const stationRef = useRef<StationId>('boletim')
  const panelRef = useRef<HTMLDivElement>(null)
  const playStatic = useTuningStatic()

  const station = stationById(stationId)
  const msLeft = now === null ? null : LAUNCH_MS - now

  useEffect(() => {
    const fromHash = window.location.hash.slice(1)
    if (isStationId(fromHash)) {
      stationRef.current = fromHash
      setStationId(fromHash)
    }
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const tune = useCallback(
    (id: StationId) => {
      if (id === stationRef.current) return
      const tabFocused = document.activeElement?.getAttribute('role') === 'tab'
      stationRef.current = id
      setStationId(id)
      setStaticKey((key) => key + 1)
      playStatic()
      window.history.replaceState(null, '', `#${id}`)
      panelRef.current?.scrollTo({ top: 0 })
      if (tabFocused) {
        window.requestAnimationFrame(() => document.getElementById(`vice-tab-${id}`)?.focus())
      }
    },
    [playStatic],
  )

  const step = useCallback(
    (direction: 1 | -1) => {
      const index = STATIONS.findIndex((item) => item.id === stationRef.current)
      tune(STATIONS[(index + direction + STATIONS.length) % STATIONS.length].id)
    },
    [tune],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target as HTMLElement | null
      if (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) return
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        step(event.key === 'ArrowRight' ? 1 : -1)
        return
      }
      const preset = Number(event.key)
      if (Number.isInteger(preset) && preset >= 1 && preset <= STATIONS.length) {
        tune(STATIONS[preset - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, tune])

  return (
    <div className="vice-secret relative flex h-dvh flex-col overflow-hidden bg-[#07040c] text-white">
      <h1 className="sr-only">{copy.heading}</h1>

      {/* Para-brisa: a foto oficial da estação sintonizada. */}
      <div aria-hidden="true" className="absolute inset-0">
        {STATIONS.map((item) => (
          <Image
            key={item.id}
            src={item.image}
            alt=""
            fill
            priority={item.id === stationId}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${item.id === stationId ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-[#07040c]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07040c]/80 via-transparent to-[#07040c]" />
        <div className="vice-windshield" />
        <div className="vice-scanlines" />
        <div className="vice-grain" />
        {staticKey > 0 && <div key={staticKey} className="vice-static" />}
      </div>

      {/* Topo: saída, retrovisor e marca. O conteúdo rola por baixo. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 sm:px-6">
        <a
          href={homePath(locale)}
          className="pointer-events-auto mt-3 inline-flex items-center gap-2 px-2.5 sm:px-3 py-2 text-[10px] font-medium tracking-[0.22em] uppercase text-white/60 hover:text-white bg-black/40 border border-white/10 hover:border-white/30 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4ad8]"
        >
          <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{copy.back}</span>
          <span className="sm:hidden">{copy.backShort}</span>
        </a>
        <div className="pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2">
          <RearviewMirror
            locale={locale}
            hostRef={radio.hostRef}
            playing={radio.playing}
            stalled={radio.stalled}
            label={copy.mirror}
            youtubeId={radio.track.youtubeId}
            onDismiss={radio.dismissStall}
          />
        </div>
        <p
          aria-hidden="true"
          className="mt-3 font-[family-name:var(--font-vice-display)] text-lg sm:text-2xl tracking-[0.16em] leading-none text-right"
        >
          <span className="vice-neon-white">VICE</span> <span className="vice-neon">CITY</span>
          <span className="block font-[family-name:var(--font-vice-serif)] text-sm sm:text-base tracking-normal text-white/35">
            VI
          </span>
        </p>
      </div>

      <div
        ref={panelRef}
        id="vice-station-panel"
        role="tabpanel"
        aria-labelledby={`vice-tab-${station.id}`}
        tabIndex={0}
        className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain focus-visible:outline-none"
      >
        <div
          key={station.id}
          className="vice-station-in container mx-auto max-w-6xl px-4 sm:px-8 pt-28 sm:pt-44 pb-10"
        >
          {station.id === 'boletim' && <BulletinStation locale={locale} station={station} msLeft={msLeft} />}
          {station.id === 'cinema' && <CinemaStation locale={locale} station={station} onWatch={radio.pause} />}
          {station.id === 'radio' && <RadioStation locale={locale} station={station} radio={radio} />}
          {station.id === 'dial' && <OfficialDialStation locale={locale} station={station} />}
          {station.id === 'mapa' && <MapStation locale={locale} station={station} />}
          {station.id === 'nextstation' && (
            <NextStationStation locale={locale} station={station} onWatch={radio.pause} />
          )}
        </div>
      </div>

      {/* Painel */}
      <footer className="vice-dashboard relative z-20 shrink-0">
        <div className="mx-auto grid max-w-7xl gap-2.5 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)_15rem] lg:items-center lg:gap-8 lg:py-4">
          <div className="hidden lg:block">
            <p className="mb-2 text-[10px] tracking-[0.28em] uppercase text-[#ff4ad8]">{copy.odometer}</p>
            <Odometer locale={locale} msLeft={msLeft} />
            <p className="mt-2 text-[10px] tracking-[0.14em] text-white/30">{copy.keys}</p>
          </div>
          <Tuner locale={locale} station={station} onTune={tune} onStep={step} />
          <MediaUnit locale={locale} radio={radio} />
        </div>
      </footer>
    </div>
  )
}
