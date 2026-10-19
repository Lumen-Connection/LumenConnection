import type { Locale } from '@/lib/i18n/translations'

const COPY = {
  pt: { days: 'dias', hours: 'h', minutes: 'min', seconds: 's', live: 'Nas ruas.' },
  en: { days: 'days', hours: 'h', minutes: 'min', seconds: 's', live: 'On the streets.' },
} as const

export function countdownParts(msLeft: number) {
  const total = Math.max(0, Math.floor(msLeft / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Contagem em dígitos de odômetro. `msLeft` nulo = antes da hidratação. */
export function Odometer({
  locale,
  msLeft,
  size = 'sm',
}: {
  locale: Locale
  msLeft: number | null
  size?: 'sm' | 'lg'
}) {
  const copy = COPY[locale]
  if (msLeft !== null && msLeft <= 0) {
    return (
      <p className="font-[family-name:var(--font-vice-display)] tracking-[0.12em] text-3xl text-[#ff4ad8] vice-neon">
        {copy.live}
      </p>
    )
  }
  const parts = msLeft === null ? null : countdownParts(msLeft)
  const cells: [string, string][] = [
    [parts ? String(parts.days) : '--', copy.days],
    [parts ? pad(parts.hours) : '--', copy.hours],
    [parts ? pad(parts.minutes) : '--', copy.minutes],
    [parts ? pad(parts.seconds) : '--', copy.seconds],
  ]
  const digit = size === 'lg' ? 'text-5xl sm:text-7xl md:text-8xl px-2 sm:px-3' : 'text-2xl px-1.5'
  return (
    <p className="flex items-end gap-1.5 sm:gap-2" role="timer">
      {cells.map(([value, unit]) => (
        <span key={unit} className="flex flex-col items-center">
          <span
            className={`vice-odometer font-[family-name:var(--font-vice-lcd)] leading-none tabular-nums ${digit}`}
          >
            {value}
          </span>
          <span className="mt-1 text-[9px] tracking-[0.2em] uppercase text-white/40">{unit}</span>
        </span>
      ))}
    </p>
  )
}
