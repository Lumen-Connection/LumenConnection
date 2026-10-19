import type { Locale } from '@/lib/i18n/translations'
import { formatFreq, type Station } from '../dashboard/stations'

export function StationHeader({
  locale,
  station,
  title,
  body,
}: {
  locale: Locale
  station: Station
  title: string
  body?: string
}) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="text-[10px] tracking-[0.35em] uppercase text-[#5ce1ff] mb-3">
        FM {formatFreq(station.freq)} · {station.name[locale]}
      </p>
      <h2 className="font-[family-name:var(--font-vice-serif)] text-3xl sm:text-5xl leading-[1.05] text-white max-w-3xl">
        {title}
      </h2>
      {body && <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">{body}</p>}
    </header>
  )
}

export function formatShortDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
