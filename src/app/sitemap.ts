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

  return entries
}
