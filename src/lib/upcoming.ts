import type { UpcomingProject } from '@/data/upcoming-projects'
import type { Locale } from '@/lib/i18n/translations'

/** Abaixo desta janela o item mostra o cronômetro "T-"; acima, a data formatada. */
export const COUNTDOWN_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

export function formatCountdown(msLeft: number): string {
  const total = Math.max(0, Math.floor(msLeft / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return days > 0 ? `T-${days}d ${clock}` : `T-${clock}`
}

/** Depende do fuso da máquina: só use depois da hidratação. */
export function localTimezoneLabel(locale: Locale): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const city = (tz.split('/').pop() ?? tz).replace(/_/g, ' ')
  return locale === 'en' ? `${city} Time` : `Horário de ${city}`
}

/** Depende do fuso da máquina: só use depois da hidratação. */
export function formatLaunchDate(launchAt: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(launchAt))
}

/**
 * Projetos ainda não lançados, dos mais próximos aos mais distantes,
 * com os sem data no fim da lista.
 */
export function getUpcomingProjects(
  projects: UpcomingProject[],
  now: number,
): UpcomingProject[] {
  return projects
    .filter((p) => !p.launchAt || Date.parse(p.launchAt) > now)
    .sort((a, b) => {
      if (!a.launchAt) return 1
      if (!b.launchAt) return -1
      return Date.parse(a.launchAt) - Date.parse(b.launchAt)
    })
}
