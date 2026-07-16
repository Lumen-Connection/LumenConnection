import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { SERVICE_LINKS, servicePath } from '@/data/service-links'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const homeLanguages = {
    'pt-BR': `${SITE.url}/`,
    'en-US': `${SITE.url}/en`,
    'x-default': `${SITE.url}/`,
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${SITE.url}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
  ]

  for (const link of SERVICE_LINKS) {
    const ptUrl = `${SITE.url}${servicePath('pt', link)}`
    const enUrl = `${SITE.url}${servicePath('en', link)}`
    const languages = {
      'pt-BR': ptUrl,
      'en-US': enUrl,
      'x-default': ptUrl,
    }
    entries.push(
      {
        url: ptUrl,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages },
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      },
    )
  }

  const upcomingPt = `${SITE.url}/novosprojetos`
  const upcomingEn = `${SITE.url}/en/upcoming-projects`
  const upcomingLanguages = {
    'pt-BR': upcomingPt,
    'en-US': upcomingEn,
    'x-default': upcomingPt,
  }
  entries.push(
    {
      url: upcomingPt,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: { languages: upcomingLanguages },
    },
    {
      url: upcomingEn,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: { languages: upcomingLanguages },
    },
  )

  const cookiePt = `${SITE.url}/politica-de-cookies`
  const cookieEn = `${SITE.url}/en/cookie-policy`
  const cookieLanguages = {
    'pt-BR': cookiePt,
    'en-US': cookieEn,
    'x-default': cookiePt,
  }
  entries.push(
    {
      url: cookiePt,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: cookieLanguages },
    },
    {
      url: cookieEn,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: cookieLanguages },
    },
  )

  return entries
}
