import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { UpcomingProjectsPageContent } from '@/components/upcoming/UpcomingProjectsPageContent'
import { homePath } from '@/data/service-links'
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Upcoming Projects',
  description:
    'What Lumen Connection is building and when it lands: the schedule of upcoming launches, with a countdown for the ones that already have a confirmed date.',
  alternates: {
    canonical: '/en/upcoming-projects',
    languages: {
      'pt-BR': '/novosprojetos',
      'en-US': '/en/upcoming-projects',
      'x-default': '/novosprojetos',
    },
  },
}

export default function UpcomingProjectsPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <UpcomingProjectsPageContent locale="en" />
        </main>
        <Footer />
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: homePath('en') },
          { name: 'Upcoming Projects', url: '/en/upcoming-projects' },
        ])}
      />
    </>
  )
}
