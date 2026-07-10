import { LocaleProvider } from '@/lib/i18n/LocaleContext'

/**
 * As páginas /servicos/* são sempre em português: força o locale para que
 * o chrome client (Footer, LanguageSwitcher) acompanhe o conteúdo mesmo
 * quando o visitante tem 'en' salvo no localStorage.
 */
export default function ServicosLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LocaleProvider forcedLocale="pt">{children}</LocaleProvider>
}
