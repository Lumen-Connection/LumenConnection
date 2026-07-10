import type { Metadata } from 'next'
import { RootDocument } from '@/components/RootDocument'
import { buildBaseMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildBaseMetadata('en')
export { viewport } from '@/lib/seo/metadata'

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootDocument locale="en">{children}</RootDocument>
}
