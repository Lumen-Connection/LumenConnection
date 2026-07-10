import '@/app/globals.css'
import { Toaster } from '@/components/ui/toaster'
import { PWAInstaller } from '@/components/PWAInstaller'
import { CookieConsent } from '@/components/CookieConsent'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'
import { MotionProvider } from '@/components/MotionProvider'
import { geistSans } from '@/lib/fonts'
import { JsonLd, professionalServiceLd, websiteLd } from '@/lib/seo/jsonld'
import { LOCALE_HTML_LANG, type Locale } from '@/lib/i18n/translations'

const SKIP_LINK: Record<Locale, string> = {
  pt: 'Pular para o conteúdo principal',
  en: 'Skip to main content',
}

/**
 * Documento compartilhado pelos dois root layouts ((pt) e (en)):
 * garante <html lang> correto no SSR por idioma sem middleware.
 */
export function RootDocument({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <html lang={LOCALE_HTML_LANG[locale]} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- este é o
          <head> do root layout do App Router (fatorado para cá); a regra
          só se aplica ao Pages Router */}
      <head>
        <link
          rel="preload"
          as="image"
          href="/LC - Logos/Lumen Connection white logo.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/LC - Logos/Lumen Connection white fonte.webp"
          fetchPriority="low"
        />
        <JsonLd data={professionalServiceLd()} />
        <JsonLd data={websiteLd(locale)} />
      </head>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-black focus:font-semibold focus:rounded focus:shadow-lg"
        >
          {SKIP_LINK[locale]}
        </a>
        <LocaleProvider forcedLocale={locale === 'en' ? 'en' : undefined}>
          <MotionProvider>
            {children}
            <Toaster />
            <PWAInstaller />
            <CookieConsent />
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
