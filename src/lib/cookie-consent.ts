export type CookieConsent = {
  /** Cookies/armazenamento essenciais (idioma, acessibilidade, este consentimento) — sempre ativos */
  necessary: true
  /** Métricas de uso — hoje o site não usa nenhuma; a escolha fica guardada para quando usar */
  analytics: boolean
  decidedAt: string
}

export const COOKIE_CONSENT_KEY = 'lc-cookie-consent'
export const COOKIE_SETTINGS_EVENT = 'lc-cookie-settings:open'

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CookieConsent>
    if (typeof parsed.analytics !== 'boolean') return null
    return { necessary: true, analytics: parsed.analytics, decidedAt: parsed.decidedAt ?? '' }
  } catch {
    return null
  }
}

export function saveCookieConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
  }
  return consent
}

/** Reabre o banner de cookies em modo configurações (usado na página de política). */
export function openCookieSettings(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
  }
}
