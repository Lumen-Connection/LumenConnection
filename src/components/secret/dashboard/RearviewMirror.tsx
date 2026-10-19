import type { RefObject } from 'react'
import { ExternalLink, X } from 'lucide-react'
import type { Locale } from '@/lib/i18n/translations'

const COPY = {
  pt: {
    title: 'O YouTube pediu uma verificação.',
    body: 'Resolva direto no retrovisor (entre na sua conta do YouTube) ou ouça a faixa no próprio YouTube.',
    open: 'Abrir no YouTube',
    close: 'Fechar aviso',
  },
  en: {
    title: 'YouTube asked for a check.',
    body: 'Sort it out right in the mirror (sign in to YouTube) or listen to the track on YouTube itself.',
    open: 'Open on YouTube',
    close: 'Dismiss notice',
  },
} as const

/**
 * Retrovisor com o player do YouTube. Fica sempre montado (e visível, como
 * pedem os termos do YouTube) para a música seguir tocando entre estações.
 * Se o play não engata, ele cresce para a pessoa interagir com o player.
 */
export function RearviewMirror({
  locale,
  hostRef,
  playing,
  stalled,
  label,
  youtubeId,
  onDismiss,
}: {
  locale: Locale
  hostRef: RefObject<HTMLDivElement | null>
  playing: boolean
  stalled: boolean
  label: string
  youtubeId: string
  onDismiss: () => void
}) {
  const copy = COPY[locale]
  return (
    <div className="flex flex-col items-center">
      <span aria-hidden="true" className="h-2 sm:h-3 w-1.5 bg-gradient-to-b from-black to-[#1a1320]" />
      <div className={`vice-mirror ${playing ? 'vice-mirror-on' : ''} ${stalled ? 'vice-mirror-open' : ''}`}>
        <div className="absolute inset-[3px] overflow-hidden rounded-[10px] bg-black">
          {/* Reflexo enquanto o player não carrega. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -scale-x-100 bg-[url(/images/secret/vice-city-sunset.jpg)] bg-cover bg-center opacity-50"
          />
          <div ref={hostRef} title={label} className="vice-mirror-host" />
        </div>
      </div>
      {stalled && (
        <div
          role="status"
          className="mt-2 w-[min(22rem,calc(100vw-1.5rem))] border border-[#ff4ad8]/40 bg-[#07040c]/95 p-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.6)] backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold text-white">{copy.title}</p>
            <button
              type="button"
              onClick={onDismiss}
              className="-m-1 p-1 text-white/50 hover:text-white"
              aria-label={copy.close}
            >
              <X aria-hidden="true" className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-white/65">{copy.body}</p>
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#ffb4e6] hover:text-white"
          >
            <ExternalLink aria-hidden="true" className="w-3 h-3" />
            {copy.open}
          </a>
        </div>
      )}
    </div>
  )
}
