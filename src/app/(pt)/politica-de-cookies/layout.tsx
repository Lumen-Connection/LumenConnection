import { LocaleProvider } from '@/lib/i18n/LocaleContext'

/** Página sempre em português: força o locale para o chrome (header/footer). */
export default function PoliticaDeCookiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LocaleProvider forcedLocale="pt">{children}</LocaleProvider>
}
