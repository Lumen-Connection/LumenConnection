import { SITE } from '@/lib/site'
import { CONTACT } from '@/lib/contact'
import type { Locale } from '@/lib/i18n/translations'
import { SERVICE_LINKS, servicePath } from '@/data/service-links'
import { getServiceContent, type ServiceSeo } from '@/data/services-seo'

const SOCIAL_PROFILES = [
  'https://www.instagram.com/lumenconnection',
  'https://x.com/LumenConnection',
]

export function professionalServiceLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}/favicon.svg`,
    email: CONTACT.email,
    telephone: `+${CONTACT.phoneE164}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'João Pessoa',
      addressRegion: 'PB',
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT.email,
      telephone: `+${CONTACT.phoneE164}`,
      areaServed: 'BR',
      availableLanguage: ['Portuguese', 'English'],
    },
    sameAs: SOCIAL_PROFILES,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços',
      itemListElement: SERVICE_LINKS.map((link) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: link.labelPt,
          url: `${SITE.url}${servicePath('pt', link)}`,
        },
      })),
    },
  }
}

export function websiteLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: locale === 'en' ? 'en-US' : 'pt-BR',
  }
}

export function serviceLd(service: ServiceSeo, locale: Locale) {
  const content = getServiceContent(service, locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.h1,
    description: content.metaDescription,
    url: `${SITE.url}${servicePath(locale, service.link)}`,
    image: `${SITE.url}${service.cover}`,
    serviceType: locale === 'en' ? service.link.labelEn : service.link.labelPt,
    provider: {
      '@type': 'ProfessionalService',
      name: SITE.name,
      url: SITE.url,
      telephone: `+${CONTACT.phoneE164}`,
      email: CONTACT.email,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
  }
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  }
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
