import { CONTACT } from '@/lib/contact'
import type { Locale } from '@/lib/i18n/translations'
import { OpenCookieSettingsButton } from './OpenCookieSettingsButton'

type PolicySection = { heading: string; body: string[]; list?: string[] }

const CONTENT: Record<
  Locale,
  {
    title: string
    updated: string
    intro: string[]
    sections: PolicySection[]
    manageHeading: string
    manageBody: string
    manageButton: string
  }
> = {
  pt: {
    title: 'Política de Cookies',
    updated: 'Atualizada em 10 de julho de 2026',
    intro: [
      'Esta política explica o que a Lumen Connection guarda no seu navegador quando você visita lumenconnection.com.br, para que serve cada item e como você controla isso.',
      'Usamos o mínimo necessário. Não vendemos dados, não criamos perfis de publicidade e não usamos rastreadores de terceiros.',
    ],
    sections: [
      {
        heading: 'O que são cookies e armazenamento local',
        body: [
          'Cookies são pequenos arquivos que sites guardam no seu dispositivo. Também usamos o armazenamento local do navegador (localStorage), que cumpre papel parecido: lembrar suas preferências entre visitas, sem enviar nada a servidores de terceiros.',
        ],
      },
      {
        heading: 'O que guardamos e por quê',
        body: ['Itens essenciais, sempre ativos:'],
        list: [
          'Preferência de idioma (lc-locale): lembra se você escolheu português ou inglês.',
          'Sua decisão sobre cookies (lc-cookie-consent): guarda a escolha feita neste aviso.',
          'Ajustes de acessibilidade: tamanho do texto e demais opções do widget de acessibilidade.',
          'Cache do aplicativo (service worker): permite instalar o site como aplicativo e acelera o carregamento.',
        ],
      },
      {
        heading: 'Análise e melhorias',
        body: [
          'Hoje o site não usa nenhuma ferramenta de análise de tráfego. A categoria existe no aviso de consentimento para que, se um dia adotarmos métricas anônimas de uso, a sua escolha já esteja registrada e seja respeitada.',
        ],
      },
      {
        heading: 'Links e serviços de terceiros',
        body: [
          'Algumas partes do site levam a serviços externos: YouTube e Instagram (portfólio), GitHub (downloads do Lumen Music e do Lumen Chat) e WhatsApp (contato). Ao abrir esses links, valem as políticas de privacidade de cada serviço.',
        ],
      },
      {
        heading: 'Contato',
        body: [
          `Dúvidas sobre esta política? Escreva para ${CONTACT.email} ou fale com a gente pelo WhatsApp ${CONTACT.phoneDisplay}.`,
        ],
      },
    ],
    manageHeading: 'Como gerenciar suas preferências',
    manageBody:
      'Você pode rever sua escolha a qualquer momento pelo botão abaixo, ou apagar os dados do site nas configurações do navegador.',
    manageButton: 'Abrir configurações de cookies',
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Updated on July 10, 2026',
    intro: [
      'This policy explains what Lumen Connection stores in your browser when you visit lumenconnection.com.br, what each item is for and how you control it.',
      'We keep it to the minimum. We do not sell data, build advertising profiles or use third-party trackers.',
    ],
    sections: [
      {
        heading: 'What cookies and local storage are',
        body: [
          'Cookies are small files that websites store on your device. We also use the browser’s local storage (localStorage), which plays a similar role: remembering your preferences between visits, without sending anything to third-party servers.',
        ],
      },
      {
        heading: 'What we store and why',
        body: ['Essential items, always on:'],
        list: [
          'Language preference (lc-locale): remembers whether you chose Portuguese or English.',
          'Your cookie decision (lc-cookie-consent): stores the choice made in this notice.',
          'Accessibility settings: text size and the other options in the accessibility widget.',
          'App cache (service worker): lets you install the site as an app and speeds up loading.',
        ],
      },
      {
        heading: 'Analytics & improvements',
        body: [
          'The site currently uses no traffic analytics tool. The category exists in the consent notice so that, if we ever adopt anonymous usage metrics, your choice is already recorded and respected.',
        ],
      },
      {
        heading: 'Third-party links and services',
        body: [
          'Some parts of the site lead to external services: YouTube and Instagram (portfolio), GitHub (Lumen Music and Lumen Chat downloads) and WhatsApp (contact). When you open those links, each service’s own privacy policy applies.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Questions about this policy? Write to ${CONTACT.email} or message us on WhatsApp at ${CONTACT.phoneDisplay}.`,
        ],
      },
    ],
    manageHeading: 'How to manage your preferences',
    manageBody:
      'You can review your choice at any time using the button below, or clear the site’s data in your browser settings.',
    manageButton: 'Open cookie settings',
  },
}

export function CookiePolicyContent({ locale }: { locale: Locale }) {
  const content = CONTENT[locale]

  return (
    <article className="pt-28 pb-16 sm:pb-24">
      <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-orange-500 mb-4">
          {content.updated}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          {content.title}
        </h1>
        <div className="space-y-4 mb-12">
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-white/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-10">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-white/75 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2 text-white/75 text-sm leading-relaxed list-disc pl-5">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 32)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {content.manageHeading}
            </h2>
            <p className="text-white/75 leading-relaxed mb-5">{content.manageBody}</p>
            <OpenCookieSettingsButton label={content.manageButton} />
          </section>
        </div>
      </div>
    </article>
  )
}
