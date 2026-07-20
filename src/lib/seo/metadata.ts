import type { Metadata, Viewport } from 'next'
import { SITE } from '@/lib/site'
import type { Locale } from '@/lib/i18n/translations'
import { homePath, servicePath } from '@/data/service-links'
import { getServiceContent, type ServiceSeo } from '@/data/services-seo'

const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

const HOME_TITLE: Record<Locale, string> = {
  pt: 'Lumen Connection — Criação de Sites, Apps, Vídeo e Design | João Pessoa',
  en: 'Lumen Connection — Websites, Apps, Video & Design Studio',
}

const HOME_LANGUAGES = {
  'pt-BR': '/',
  'en-US': '/en',
  'x-default': '/',
} as const

function siteDescription(locale: Locale): string {
  return locale === 'en' ? SITE.descriptionEn : SITE.description
}

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

function baseOpenGraph(locale: Locale): NonNullable<Metadata['openGraph']> {
  // As imagens vêm dos arquivos opengraph-image.tsx por rota (ver src/lib/seo/og.tsx);
  // por isso não declaramos `images` aqui.
  return {
    type: 'website',
    locale: OG_LOCALE[locale],
    url: homePath(locale),
    siteName: SITE.name,
    title: HOME_TITLE[locale],
    description: siteDescription(locale),
  }
}

/** Metadata comum aos dois root layouts ((pt) e (en)); páginas definem canonical/hreflang próprios. */
export function buildBaseMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: HOME_TITLE[locale],
      template: `%s | ${SITE.name}`,
    },
    description: siteDescription(locale),
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    applicationName: SITE.name,
    generator: 'Next.js',
    category: 'technology',
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      title: SITE.name,
      statusBarStyle: 'black-translucent',
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/icons/icon-192.png',
    },
    openGraph: baseOpenGraph(locale),
    twitter: {
      // Sem `images`: o X reaproveita a og:image gerada pelos arquivos opengraph-image.tsx.
      card: 'summary_large_image',
      title: HOME_TITLE[locale],
      description: siteDescription(locale),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: 'o92WqKJ0J2PgDdBqHcELb6dObAIjgzRJMFrf-GcIufs',
    },
  }
}

export function homeMetadata(locale: Locale): Metadata {
  return {
    // O título default do layout já é o da home; aqui entram canonical/hreflang e a URL de OG.
    alternates: {
      canonical: homePath(locale),
      languages: { ...HOME_LANGUAGES },
    },
    openGraph: baseOpenGraph(locale),
  }
}

export function serviceMetadata(service: ServiceSeo, locale: Locale): Metadata {
  const content = getServiceContent(service, locale)
  const path = servicePath(locale, service.link)
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: {
      canonical: path,
      languages: {
        'pt-BR': servicePath('pt', service.link),
        'en-US': servicePath('en', service.link),
        'x-default': servicePath('pt', service.link),
      },
    },
    openGraph: {
      // A imagem vem de servicos/[slug]/opengraph-image.tsx (landscape 1200x630);
      // a antiga capa retrato deformava o preview.
      type: 'website',
      locale: OG_LOCALE[locale],
      url: path,
      siteName: SITE.name,
      title: `${content.metaTitle} | ${SITE.name}`,
      description: content.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.metaTitle} | ${SITE.name}`,
      description: content.metaDescription,
    },
  }
}
