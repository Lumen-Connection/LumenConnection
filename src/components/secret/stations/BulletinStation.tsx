import { ArrowUpRight } from 'lucide-react'
import {
  GTA_VI_FACTS,
  GTA_VI_LAUNCH_AT,
  GTA_VI_NEWSWIRE,
  GTA_VI_OFFICIAL_URL,
  GTA_VI_PLATFORMS,
} from '@/data/gta-vi'
import { formatLaunchDate, localTimezoneLabel } from '@/lib/upcoming'
import type { Locale } from '@/lib/i18n/translations'
import { Odometer } from '../dashboard/Odometer'
import type { Station } from '../dashboard/stations'
import { StationHeader, formatShortDate } from './StationHeader'

const COPY = {
  pt: {
    title: 'Faltam poucos quilômetros para Leonida.',
    body: 'Jason e Lucia chegam em 19 de novembro. A Rockstar reconfirmou a data em outubro e o Launch Trailer já está no ar.',
    arrival: 'Chegada em',
    facts: 'Ficha oficial',
    newswire: 'Últimas da Newswire',
    hub: 'rockstargames.com/VI',
    note: 'Homenagem de fã da Lumen Connection. Sem afiliação com Rockstar Games ou Take-Two Interactive. Imagens e trailers oficiais © Rockstar Games.',
  },
  en: {
    title: 'Only a few miles left to Leonida.',
    body: 'Jason and Lucia arrive on November 19. Rockstar reconfirmed the date in October and the Launch Trailer is already out.',
    arrival: 'Arriving',
    facts: 'Official sheet',
    newswire: 'Latest from the Newswire',
    hub: 'rockstargames.com/VI',
    note: 'A Lumen Connection fan tribute. Not affiliated with Rockstar Games or Take-Two Interactive. Official images and trailers © Rockstar Games.',
  },
} as const

export function BulletinStation({
  locale,
  station,
  msLeft,
}: {
  locale: Locale
  station: Station
  msLeft: number | null
}) {
  const copy = COPY[locale]
  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <div className="mb-12">
        <Odometer locale={locale} msLeft={msLeft} size="lg" />
        <p className="mt-4 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/50">
          {msLeft === null ? (
            <>&nbsp;</>
          ) : (
            <>
              {copy.arrival} {formatLaunchDate(GTA_VI_LAUNCH_AT, locale)} · {localTimezoneLabel(locale)} ·{' '}
              {GTA_VI_PLATFORMS}
            </>
          )}
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-14">
        <section aria-labelledby="vice-facts">
          <h3 id="vice-facts" className="text-[10px] tracking-[0.3em] uppercase text-[#ff4ad8] mb-4">
            {copy.facts}
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/10">
            {GTA_VI_FACTS.map((fact) => (
              <div key={fact.label.en} className="border-b border-white/10 py-3 sm:pr-4">
                <dt className="text-[10px] tracking-[0.22em] uppercase text-white/40">{fact.label[locale]}</dt>
                <dd className="mt-1 text-sm sm:text-base text-white">{fact.value[locale]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="vice-newswire">
          <h3 id="vice-newswire" className="text-[10px] tracking-[0.3em] uppercase text-[#ff4ad8] mb-4">
            {copy.newswire}
          </h3>
          <ol className="border-l border-white/15">
            {GTA_VI_NEWSWIRE.map((item) => (
              <li key={item.url} className="relative pl-5 pb-4 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-[#5ce1ff]" />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4ad8]"
                >
                  <span className="block font-mono text-[11px] text-white/40">{formatShortDate(item.date, locale)}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-white/85 group-hover:text-white">
                    {item.title[locale]}
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 text-white/35 group-hover:text-[#ff4ad8]" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href={GTA_VI_OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-[11px] tracking-[0.18em] uppercase text-[#ffb4e6] hover:text-white"
          >
            {copy.hub}
          </a>
        </section>
      </div>

      <p className="mt-12 max-w-2xl text-[11px] leading-relaxed tracking-[0.06em] text-white/35">{copy.note}</p>
    </div>
  )
}
