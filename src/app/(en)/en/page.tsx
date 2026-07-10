import type { Metadata } from 'next'
import { Portfolio } from '@/components/Portfolio'
import { homeMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = homeMetadata('en')

export default function EnHomePage() {
  return <Portfolio />
}
