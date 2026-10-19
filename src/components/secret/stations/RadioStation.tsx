import { Download } from 'lucide-react'
import { LUMEN_MUSIC_DOWNLOAD, LUMEN_MUSIC_GITHUB, type RadioSource } from '@/data/gta-vi-radio'
import type { Locale } from '@/lib/i18n/translations'
import type { LeonidaRadio } from '../dashboard/useLeonidaRadio'
import type { Station } from '../dashboard/stations'
import { StationHeader } from './StationHeader'

const COPY = {
  pt: {
    title: 'Tudo o que a Rockstar já deixou tocar.',
    body: 'As músicas ouvidas nos trailers oficiais, no Extended Look e no Launch Trailer. Escolha uma faixa: ela toca pelo retrovisor e segue no ar enquanto você troca de estação.',
    homage: 'Os selos ao lado de cada faixa homenageiam as rádios do Vice City de 2002 — não são estações do VI.',
    sources: {
      launch: 'Launch Trailer',
      extended: 'An Extended Look',
      trailer2: 'Trailer 2',
      trailer1: 'Trailer 1',
    },
    track: 'faixa',
    tracks: 'faixas',
    lumenEyebrow: 'Lumen Music',
    lumenTitle: 'Leve a avenida para o desktop.',
    lumenBody:
      'O Lumen Music é o reprodutor nativo da Lumen para Windows: biblioteca local, playlists, fila e temas — offline, sem cadastro. Baixa e monta a sua própria rádio.',
    lumenCta: 'Baixar Lumen Music',
    lumenOs: 'Windows · C++17 · Qt 6',
    lumenSource: 'Código aberto',
  },
  en: {
    title: 'Everything Rockstar has let play so far.',
    body: 'Songs heard in the official trailers, the Extended Look and the Launch Trailer. Pick a track: it plays through the rear-view mirror and stays on air while you change stations.',
    homage: 'The tags next to each track homage the 2002 Vice City stations — they are not VI stations.',
    sources: {
      launch: 'Launch Trailer',
      extended: 'An Extended Look',
      trailer2: 'Trailer 2',
      trailer1: 'Trailer 1',
    },
    track: 'track',
    tracks: 'tracks',
    lumenEyebrow: 'Lumen Music',
    lumenTitle: 'Take the avenue to the desktop.',
    lumenBody:
      'Lumen Music is Lumen’s native Windows player: local library, playlists, queue and themes — offline, no account. Download it and build your own radio.',
    lumenCta: 'Download Lumen Music',
    lumenOs: 'Windows · C++17 · Qt 6',
    lumenSource: 'Open source',
  },
} as const

const SOURCE_ORDER: RadioSource[] = ['launch', 'extended', 'trailer2', 'trailer1']

export function RadioStation({
  locale,
  station,
  radio,
}: {
  locale: Locale
  station: Station
  radio: LeonidaRadio
}) {
  const copy = COPY[locale]
  const indexed = radio.tracks.map((track, index) => ({ track, index }))

  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
        <div className="space-y-8">
          {SOURCE_ORDER.map((source) => {
            const group = indexed.filter(({ track }) => track.source === source)
            if (group.length === 0) return null
            return (
              <section key={source} aria-label={copy.sources[source]}>
                <p className="flex items-baseline justify-between border-b border-white/15 pb-2 mb-1">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#ff4ad8]">{copy.sources[source]}</span>
                  <span className="font-mono text-[10px] text-white/35">
                    {group.length} {group.length === 1 ? copy.track : copy.tracks}
                  </span>
                </p>
                <ol>
                  {group.map(({ track, index }, position) => {
                    const active = index === radio.index
                    return (
                      <li key={track.id}>
                        <button
                          type="button"
                          onClick={() => radio.play(index)}
                          aria-current={active ? 'true' : undefined}
                          className={`group w-full grid grid-cols-[1.25rem_minmax(0,1fr)_auto] items-center gap-3 px-2 py-2.5 text-left border-b border-white/[0.06] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4ad8] ${
                            active ? 'bg-[#ff4ad8]/10' : ''
                          }`}
                        >
                          <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
                            {active && radio.playing ? (
                              <>
                                <span className="vice-eq" />
                                <span className="vice-eq [animation-delay:-0.3s]" />
                                <span className="vice-eq [animation-delay:-0.6s]" />
                              </>
                            ) : (
                              <span className="font-mono text-[10px] text-white/30">{position + 1}</span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className={`block truncate text-sm ${active ? 'text-[#ff4ad8]' : 'text-white'}`}>
                              {track.title}
                            </span>
                            <span className="block truncate text-xs text-white/50">
                              {track.artist} · {track.year}
                            </span>
                          </span>
                          <span className="hidden sm:inline font-[family-name:var(--font-vice-lcd)] text-sm text-white/35 uppercase">
                            {track.station}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </section>
            )
          })}
          <p className="text-[11px] tracking-[0.08em] text-white/35">{copy.homage}</p>
        </div>

        <aside className="lg:sticky lg:top-0 border border-orange-500/35 bg-orange-500/[0.07] p-5 sm:p-6">
          <p className="text-[10px] tracking-[0.28em] uppercase text-orange-400 mb-2">{copy.lumenEyebrow}</p>
          <h3 className="text-lg font-semibold text-white mb-2">{copy.lumenTitle}</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-4">{copy.lumenBody}</p>
          <p className="text-[11px] text-white/45 mb-4">{copy.lumenOs}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={LUMEN_MUSIC_DOWNLOAD}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white/90"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              {copy.lumenCta}
            </a>
            <a
              href={LUMEN_MUSIC_GITHUB}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] tracking-[0.16em] uppercase text-white/55 hover:text-white"
            >
              {copy.lumenSource}
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
