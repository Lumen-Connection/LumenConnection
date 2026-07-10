import type { Metadata } from 'next'
import { RootDocument } from '@/components/RootDocument'
import { buildBaseMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildBaseMetadata('pt')
export { viewport } from '@/lib/seo/metadata'

export default function PtRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootDocument locale="pt">{children}</RootDocument>
}
