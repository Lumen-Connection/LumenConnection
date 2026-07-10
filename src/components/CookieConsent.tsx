'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import {
  COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from '@/lib/cookie-consent'

const DISMISS_KEY = 'lc-cookie-banner-dismissed'

const secondaryButton =
  'relative inline-flex items-center justify-center px-5 py-3 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 bg-black/45 hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'

/**
 * Banner de consentimento de cookies (inspirado no do starlink.com, com a
 * estética da Lumen): texto + link para a política à esquerda, botões
 * empilhados à direita e painel de configurações expansível.
 */
export function CookieConsent() {
  const { t, locale } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = readCookieConsent()
    if (consent) {
      setAnalytics(consent.analytics)
      return
    }
    if (window.sessionStorage.getItem(DISMISS_KEY) !== '1') {
      setVisible(true)
    }
  }, [])

  // A página de política reabre o banner (já em modo configurações) via evento
  useEffect(() => {
    const onOpen = () => {
      const consent = readCookieConsent()
      if (consent) setAnalytics(consent.analytics)
      setSettingsOpen(true)
      setVisible(true)
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpen)
  }, [])

  const decide = (allowAnalytics: boolean) => {
    saveCookieConsent(allowAnalytics)
    setAnalytics(allowAnalytics)
    setSettingsOpen(false)
    setVisible(false)
  }

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, '1')
    setSettingsOpen(false)
    setVisible(false)
  }

  const policyHref = locale === 'en' ? '/en/cookie-policy' : '/politica-de-cookies'

  return (
    <AnimatePresence>
      {visible && (
        <m.aside
          aria-label={t('cookie.regionAria')}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.45)]"
        >
          <div className="container mx-auto px-5 sm:px-6 py-5 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
              <p className="flex-1 text-sm text-white/80 leading-relaxed pr-10 lg:pr-0">
                {t('cookie.text')}{' '}
                <a
                  href={policyHref}
                  className="underline underline-offset-4 text-white/95 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {t('cookie.policyLink')}
                </a>
                .
              </p>

              <div className="flex flex-col gap-2.5 w-full lg:w-[300px] shrink-0">
                <button
                  type="button"
                  onClick={() => setSettingsOpen((v) => !v)}
                  aria-expanded={settingsOpen}
                  aria-controls="cookie-settings-panel"
                  className={secondaryButton}
                >
                  <CornerBrackets />
                  {t('cookie.settings')}
                </button>
                <button type="button" onClick={() => decide(false)} className={secondaryButton}>
                  <CornerBrackets />
                  {t('cookie.rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={() => decide(true)}
                  className="inline-flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {t('cookie.acceptAll')}
                </button>
              </div>

              <button
                type="button"
                onClick={dismiss}
                aria-label={t('cookie.closeAria')}
                className="absolute top-4 right-4 lg:static lg:self-center p-2 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {settingsOpen && (
                <m.div
                  id="cookie-settings-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-white/10 grid gap-4 sm:grid-cols-2">
                    <div className="relative border border-white/10 bg-white/[0.02] p-4">
                      <CornerBrackets color="rgba(255,255,255,0.3)" size={8} inset={-3} />
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/90">
                          {t('cookie.essentialTitle')}
                        </p>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-orange-400">
                          {t('cookie.alwaysOn')}
                        </span>
                      </div>
                      <p className="text-xs text-white/65 leading-relaxed">
                        {t('cookie.essentialDesc')}
                      </p>
                    </div>

                    <div className="relative border border-white/10 bg-white/[0.02] p-4">
                      <CornerBrackets color="rgba(255,255,255,0.3)" size={8} inset={-3} />
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/90">
                          {t('cookie.analyticsTitle')}
                        </p>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={analytics}
                          aria-label={t('cookie.analyticsTitle')}
                          onClick={() => setAnalytics((v) => !v)}
                          className={`relative h-6 w-11 shrink-0 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                            analytics ? 'bg-white border-white' : 'bg-black/45 border-white/25'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute top-[3px] h-4 w-4 transition-all ${
                              analytics ? 'right-[3px] bg-black' : 'left-[3px] bg-white/60'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs text-white/65 leading-relaxed">
                        {t('cookie.analyticsDesc')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => decide(analytics)}
                    className={`${secondaryButton} mt-4 w-full sm:w-auto`}
                  >
                    <CornerBrackets />
                    {t('cookie.save')}
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  )
}
