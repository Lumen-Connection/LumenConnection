import type { Metadata } from 'next'
import { Portfolio } from '@/components/Portfolio'
import { homeMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = homeMetadata('pt')

export default function HomePage() {
  return <Portfolio />
}
