import { projects } from '@/data/projects'
import type { ProjectItem } from '@/data/types'
import type { Locale } from '@/lib/i18n/translations'
import { SERVICE_LINKS, type ServiceId, type ServiceLink } from './service-links'

export type ServiceFaq = { q: string; a: string }

export type ServiceLocaleContent = {
  /** Título da aba/SERP sem a marca — o template do layout acrescenta " | Lumen Connection" */
  metaTitle: string
  metaDescription: string
  keywords: string[]
  h1: string
  intro: string[]
  sections: { heading: string; body: string[] }[]
  tools: string[]
  faq: ServiceFaq[]
  ctaTitle: string
  ctaLabel: string
  whatsappMessage: string
}

export type ServiceSeo = {
  id: ServiceId
  link: ServiceLink
  /** Strings exatas de `category` em src/data/projects.ts usadas para montar o portfólio */
  projectCategories: string[]
  cover: string
  color: string
  pt: ServiceLocaleContent
  en: ServiceLocaleContent
}

function link(id: ServiceId): ServiceLink {
  const found = SERVICE_LINKS.find((s) => s.id === id)
  if (!found) throw new Error(`ServiceLink não encontrado: ${id}`)
  return found
}

export const SERVICES_SEO: ServiceSeo[] = [
  {
    id: 'web',
    link: link('web'),
    projectCategories: ['Desenvolvimento Web'],
    cover: '/images/covers/web-development.jpeg',
    color: '#f97316',
    pt: {
      metaTitle: 'Desenvolvimento Web: Criação de Sites Profissionais',
      metaDescription:
        'Criação de sites profissionais e sistemas web sob medida com Next.js e React. Faça seu site com quem une engenharia de software e design. Orçamento grátis.',
      keywords: [
        'desenvolvimento web',
        'criação de sites',
        'fazer site',
        'faça seu site',
        'desenvolver site',
        'site profissional',
        'criação de site para empresa',
        'desenvolvimento de sites João Pessoa',
        'Next.js',
        'React',
      ],
      h1: 'Desenvolvimento Web e Criação de Sites Profissionais',
      intro: [
        'Quer desenvolver o site da sua empresa, lançar uma loja virtual ou tirar um sistema web do papel? A Lumen Connection é um estúdio digital que projeta e desenvolve sites profissionais de ponta a ponta: do design da interface ao código, da hospedagem ao SEO.',
        'Trabalhamos com as tecnologias mais modernas do mercado — Next.js, React, TypeScript e Tailwind CSS — para entregar sites rápidos, seguros, responsivos e prontos para aparecer no Google. Cada projeto é construído sob medida: nada de templates genéricos.',
      ],
      sections: [
        {
          heading: 'Por que criar seu site com a Lumen Connection?',
          body: [
            'Um site profissional é o principal cartão de visita do seu negócio na internet. Nós unimos engenharia de software e estética visual para que o seu site não apenas funcione bem, mas também represente a identidade da sua marca — com performance de carregamento, acessibilidade e otimização para mecanismos de busca (SEO) desde a primeira linha de código.',
            'Já desenvolvemos plataformas como o Queridas Compras, vitrine online de lojas regionais de João Pessoa, e o MariDicas, plataforma de economia inteligente com ofertas curadas — ambos construídos em Next.js e no ar hoje.',
          ],
        },
        {
          heading: 'Como funciona o desenvolvimento do seu site',
          body: [
            'Começamos entendendo o objetivo do projeto: institucional, portfólio, e-commerce ou sistema web completo. Em seguida desenhamos o layout, desenvolvemos, testamos em todos os dispositivos e publicamos — com prazos claros e acompanhamento em cada etapa. Depois do lançamento, oferecemos manutenção e evolução contínua.',
          ],
        },
      ],
      tools: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Python', 'Java', 'C#', 'HTML5', 'CSS3'],
      faq: [
        {
          q: 'Quanto custa para fazer um site?',
          a: 'O valor depende do escopo: um site institucional simples custa menos que um e-commerce ou um sistema web sob medida. Fale com a gente pelo WhatsApp e receba um orçamento gratuito e sem compromisso, adequado ao seu projeto.',
        },
        {
          q: 'Quanto tempo demora para desenvolver um site?',
          a: 'Sites institucionais costumam ficar prontos em poucas semanas; projetos maiores, como plataformas e sistemas web, variam conforme a complexidade. Definimos o cronograma junto com você antes de começar.',
        },
        {
          q: 'Meu site vai aparecer no Google?',
          a: 'Sim. Todos os nossos sites são desenvolvidos com SEO técnico desde o início: estrutura semântica, performance de carregamento, dados estruturados, sitemap e boas práticas recomendadas pelo Google.',
        },
        {
          q: 'O site funciona bem no celular?',
          a: 'Sim. Todo projeto é responsivo por padrão e testado em celulares, tablets e desktops — a maior parte do tráfego brasileiro hoje vem de dispositivos móveis.',
        },
        {
          q: 'Vocês fazem manutenção depois da entrega?',
          a: 'Sim. Oferecemos planos de manutenção, atualização de conteúdo e evolução contínua para o seu site continuar rápido, seguro e atualizado.',
        },
      ],
      ctaTitle: 'Faça seu site com a Lumen Connection',
      ctaLabel: 'Pedir orçamento no WhatsApp',
      whatsappMessage: 'Olá! Quero fazer um site com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Web Development & Professional Websites',
      metaDescription:
        'Custom websites and web systems built with Next.js and React. Get a fast, responsive, SEO-ready site from a studio that blends engineering and design.',
      keywords: [
        'web development',
        'website creation',
        'build a website',
        'professional website',
        'custom web development',
        'Next.js',
        'React',
      ],
      h1: 'Web Development & Professional Website Creation',
      intro: [
        'Need a website for your business, an online store or a full web system? Lumen Connection is a digital studio that designs and builds professional websites end to end: from interface design to code, from hosting to SEO.',
        'We work with modern technologies — Next.js, React, TypeScript and Tailwind CSS — to deliver fast, secure, responsive websites that are ready to rank on Google. Every project is custom-built: no generic templates.',
      ],
      sections: [
        {
          heading: 'Why build your website with Lumen Connection?',
          body: [
            'A professional website is your business card on the internet. We combine software engineering and visual aesthetics so your site not only works well but also expresses your brand identity — with loading performance, accessibility and search engine optimization baked in from the first line of code.',
            'We have shipped platforms like Queridas Compras, an online showcase for regional shops in João Pessoa, and MariDicas, a smart-savings platform with curated deals — both built in Next.js and live today.',
          ],
        },
        {
          heading: 'How the development process works',
          body: [
            'We start by understanding the goal: institutional site, portfolio, e-commerce or a complete web system. Then we design the layout, develop, test across devices and launch — with clear deadlines and follow-up at every step. After launch, we offer maintenance and continuous improvement.',
          ],
        },
      ],
      tools: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Python', 'Java', 'C#', 'HTML5', 'CSS3'],
      faq: [
        {
          q: 'How much does a website cost?',
          a: 'It depends on the scope: a simple institutional site costs less than an e-commerce or a custom web system. Message us on WhatsApp for a free, no-commitment quote tailored to your project.',
        },
        {
          q: 'How long does it take to build a website?',
          a: 'Institutional sites are usually ready in a few weeks; larger projects like platforms and web systems vary with complexity. We define the timeline with you before starting.',
        },
        {
          q: 'Will my website show up on Google?',
          a: 'Yes. All our websites are built with technical SEO from day one: semantic structure, loading performance, structured data, sitemap and Google-recommended best practices.',
        },
        {
          q: 'Does the website work well on mobile?',
          a: 'Yes. Every project is responsive by default and tested on phones, tablets and desktops.',
        },
      ],
      ctaTitle: 'Build your website with Lumen Connection',
      ctaLabel: 'Get a quote on WhatsApp',
      whatsappMessage: 'Hi! I want to build a website with Lumen Connection.',
    },
  },
  {
    id: 'software',
    link: link('software'),
    projectCategories: ['Desenvolvimento de Software'],
    cover: '/images/covers/software-development.jpeg',
    color: '#eab308',
    pt: {
      metaTitle: 'Desenvolvimento de Software Sob Medida',
      metaDescription:
        'Desenvolvimento de software sob medida e aplicações desktop nativas para Windows com Rust, C++ e Qt. Performance, leveza e design cuidadoso em cada entrega.',
      keywords: [
        'desenvolvimento de software',
        'software sob medida',
        'aplicação desktop',
        'programa para Windows',
        'desenvolvimento em Rust',
        'desenvolvimento em C++',
      ],
      h1: 'Desenvolvimento de Software Sob Medida',
      intro: [
        'Nem todo problema se resolve com um site. Quando o seu negócio precisa de uma ferramenta própria — um aplicativo desktop, um utilitário interno ou um produto completo — a Lumen Connection desenvolve software sob medida com foco em performance e experiência de uso.',
        'Somos especializados em desenvolvimento nativo para Windows com Rust, C++17, Qt 6, WinUI e Razor: aplicações leves, rápidas e com a identidade visual do seu projeto.',
      ],
      sections: [
        {
          heading: 'Software que criamos e mantemos',
          body: [
            'O Lumen Music é um reprodutor de áudio desktop para Windows, feito em C++17 com Qt 6: biblioteca local com playlists, fila estilo Spotify, edição de metadados e seis temas personalizáveis — tudo offline. O Lumen Chat, escrito em Rust, é um cliente de IA nativo que conecta a dezenas de modelos de linguagem com armazenamento seguro de chaves. Os dois estão disponíveis para download gratuito no nosso site.',
            'Essa mesma engenharia — atenção a memória, velocidade e polimento de interface — é o que aplicamos no software da sua empresa.',
          ],
        },
      ],
      tools: ['Rust', 'C++17', 'Qt 6', 'WinUI', 'Razor', 'SQLite'],
      faq: [
        {
          q: 'Que tipo de software vocês desenvolvem?',
          a: 'Aplicações desktop nativas para Windows, utilitários internos, ferramentas de automação e produtos completos. Se a sua necessidade for web ou mobile, também atendemos — veja nossas páginas de desenvolvimento web e mobile.',
        },
        {
          q: 'Por que desenvolvimento nativo em vez de web?',
          a: 'Aplicações nativas em Rust e C++ consomem menos memória, iniciam mais rápido e funcionam offline. Para ferramentas de uso diário e intensivo, a diferença de experiência é grande.',
        },
        {
          q: 'Vocês assinam contrato e NDA?',
          a: 'Sim. Trabalhamos com escopo, prazo e confidencialidade acordados em contrato antes do início do projeto.',
        },
        {
          q: 'Como recebo o software e as atualizações?',
          a: 'Entregamos instalador, código-fonte (quando contratado) e um canal de atualizações. Também oferecemos manutenção evolutiva contínua.',
        },
      ],
      ctaTitle: 'Precisa de um software sob medida?',
      ctaLabel: 'Falar com um desenvolvedor',
      whatsappMessage: 'Olá! Preciso de um software sob medida e quero conversar com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Custom Software Development',
      metaDescription:
        'Custom software and native Windows desktop applications built with Rust, C++ and Qt. Performance, low footprint and careful design in every delivery.',
      keywords: [
        'software development',
        'custom software',
        'desktop application',
        'Windows app development',
        'Rust development',
        'C++ development',
      ],
      h1: 'Custom Software Development',
      intro: [
        'Not every problem is solved with a website. When your business needs its own tool — a desktop application, an internal utility or a complete product — Lumen Connection builds custom software focused on performance and user experience.',
        'We specialize in native Windows development with Rust, C++17, Qt 6, WinUI and Razor: lightweight, fast applications carrying your project’s visual identity.',
      ],
      sections: [
        {
          heading: 'Software we build and maintain',
          body: [
            'Lumen Music is a native Windows desktop audio player built in C++17 with Qt 6: local library with playlists, a Spotify-style queue, metadata editing and six customizable themes — all offline. Lumen Chat, written in Rust, is a native AI client that connects to dozens of language models with secure key storage. Both are available as free downloads on our site.',
            'That same engineering — attention to memory, speed and interface polish — is what we bring to your company’s software.',
          ],
        },
      ],
      tools: ['Rust', 'C++17', 'Qt 6', 'WinUI', 'Razor', 'SQLite'],
      faq: [
        {
          q: 'What kind of software do you build?',
          a: 'Native Windows desktop applications, internal utilities, automation tools and complete products. If you need web or mobile, we cover those too — see our web and mobile development pages.',
        },
        {
          q: 'Why native instead of web?',
          a: 'Native applications in Rust and C++ use less memory, start faster and work offline. For tools used intensively every day, the difference in experience is significant.',
        },
        {
          q: 'Do you sign contracts and NDAs?',
          a: 'Yes. Scope, timeline and confidentiality are agreed in a contract before the project starts.',
        },
        {
          q: 'How do I receive the software and updates?',
          a: 'We deliver an installer, source code (when contracted) and an update channel, plus ongoing maintenance if you want it.',
        },
      ],
      ctaTitle: 'Need custom software?',
      ctaLabel: 'Talk to a developer',
      whatsappMessage: 'Hi! I need custom software and would like to talk to Lumen Connection.',
    },
  },
  {
    id: 'mobile',
    link: link('mobile'),
    projectCategories: ['Desenvolvimento Mobile'],
    cover: '/images/covers/mobile-development.jpeg',
    color: '#22c55e',
    pt: {
      metaTitle: 'Desenvolvimento de Aplicativos Mobile',
      metaDescription:
        'Criação de aplicativos para Android e iOS com Flutter, React Native e Kotlin. Desenvolva o app da sua empresa com design e engenharia no mesmo time.',
      keywords: [
        'desenvolvimento mobile',
        'criação de aplicativos',
        'desenvolver aplicativo',
        'app para empresa',
        'aplicativo Android',
        'aplicativo iOS',
        'Flutter',
        'React Native',
      ],
      h1: 'Desenvolvimento de Aplicativos Mobile',
      intro: [
        'Seu negócio na palma da mão dos seus clientes. A Lumen Connection cria aplicativos para Android e iOS usando Flutter, React Native e Kotlin — frameworks que permitem desenvolvimento rápido sem abrir mão de uma experiência nativa e fluida.',
        'Do conceito à publicação nas lojas, cuidamos de tudo: design de interface, desenvolvimento, testes e publicação na Google Play e App Store.',
      ],
      sections: [
        {
          heading: 'Um app com a cara da sua marca',
          body: [
            'Por sermos um estúdio que une engenharia e design, o seu aplicativo nasce com identidade visual consistente, animações cuidadosas e uma interface pensada para o usuário — não um template adaptado. E como usamos frameworks multiplataforma, um mesmo código atende Android e iOS, reduzindo custo e prazo.',
          ],
        },
      ],
      tools: ['Flutter', 'React Native', 'Kotlin', 'TypeScript', 'Firebase'],
      faq: [
        {
          q: 'Quanto custa desenvolver um aplicativo?',
          a: 'Depende das funcionalidades: um MVP enxuto custa bem menos que um app completo com login, pagamentos e notificações. Envie sua ideia pelo WhatsApp e receba uma estimativa gratuita.',
        },
        {
          q: 'O app funciona em Android e iPhone?',
          a: 'Sim. Com Flutter e React Native, o mesmo código roda em Android e iOS com aparência e performance nativas.',
        },
        {
          q: 'Vocês publicam o app nas lojas?',
          a: 'Sim. Acompanhamos todo o processo de publicação na Google Play e na App Store, incluindo os requisitos técnicos e de revisão.',
        },
        {
          q: 'E se eu já tiver um app que precisa de melhorias?',
          a: 'Também assumimos aplicativos existentes para corrigir problemas, modernizar o design ou adicionar funcionalidades.',
        },
      ],
      ctaTitle: 'Vamos tirar o seu aplicativo do papel?',
      ctaLabel: 'Conversar sobre meu app',
      whatsappMessage: 'Olá! Quero desenvolver um aplicativo com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Mobile App Development',
      metaDescription:
        'Android and iOS app development with Flutter, React Native and Kotlin. Build your company’s app with design and engineering on the same team.',
      keywords: [
        'mobile development',
        'app development',
        'build an app',
        'Android app',
        'iOS app',
        'Flutter',
        'React Native',
      ],
      h1: 'Mobile App Development',
      intro: [
        'Your business in your customers’ hands. Lumen Connection builds Android and iOS apps using Flutter, React Native and Kotlin — frameworks that enable fast development without giving up a fluid, native-feeling experience.',
        'From concept to store release, we handle everything: interface design, development, testing and publishing on Google Play and the App Store.',
      ],
      sections: [
        {
          heading: 'An app that carries your brand',
          body: [
            'Because we are a studio that combines engineering and design, your app is born with a consistent visual identity, careful animations and a user-first interface — not an adapted template. And since we use cross-platform frameworks, one codebase serves both Android and iOS, reducing cost and time.',
          ],
        },
      ],
      tools: ['Flutter', 'React Native', 'Kotlin', 'TypeScript', 'Firebase'],
      faq: [
        {
          q: 'How much does an app cost?',
          a: 'It depends on the features: a lean MVP costs far less than a full app with login, payments and notifications. Send us your idea on WhatsApp for a free estimate.',
        },
        {
          q: 'Does the app work on Android and iPhone?',
          a: 'Yes. With Flutter and React Native, the same codebase runs on Android and iOS with native look and performance.',
        },
        {
          q: 'Do you publish the app to the stores?',
          a: 'Yes. We handle the whole publishing process on Google Play and the App Store, including technical and review requirements.',
        },
        {
          q: 'What if I already have an app that needs improvement?',
          a: 'We also take over existing apps to fix issues, modernize the design or add features.',
        },
      ],
      ctaTitle: 'Let’s get your app off the ground',
      ctaLabel: 'Talk about my app',
      whatsappMessage: 'Hi! I want to build an app with Lumen Connection.',
    },
  },
  {
    id: 'video',
    link: link('video'),
    projectCategories: ['Edição de Vídeo e Mídia Social'],
    cover: '/images/covers/video-editor.jpeg',
    color: '#3b82f6',
    pt: {
      metaTitle: 'Edição de Vídeos para YouTube, Reels e Marcas',
      metaDescription:
        'Edição de vídeos profissional com Premiere Pro e After Effects: YouTube, reels, stories e comerciais. Corte dinâmico, motion graphics, cor e som.',
      keywords: [
        'edição de vídeos',
        'editor de vídeo profissional',
        'edição de vídeo para YouTube',
        'edição de reels',
        'vídeo para redes sociais',
        'motion graphics',
        'Premiere Pro',
        'After Effects',
      ],
      h1: 'Edição de Vídeos Profissional para YouTube, Reels e Marcas',
      intro: [
        'Vídeo é a linguagem da internet — e a qualidade da edição é o que separa conteúdo que prende a atenção de conteúdo que é pulado. A Lumen Connection edita vídeos profissionalmente com Adobe Premiere Pro, After Effects e Blender.',
        'Editamos de tudo: vídeos longos para YouTube com estilo dinâmico, reels e stories otimizados para retenção, comerciais de produto e vídeos institucionais para empresas.',
      ],
      sections: [
        {
          heading: 'O que entra na nossa edição',
          body: [
            'Corte ritmado e storytelling, legendas animadas, motion graphics, correção de cor, tratamento de áudio, efeitos sonoros e trilha. Cada vídeo é pensado para a plataforma onde vai viver: o que funciona no YouTube não é o que funciona num reel de 30 segundos.',
            'No portfólio: edições dinâmicas para o canal Universo Nerdístico Studios e o comercial de adesivos da Copa do Mundo 2026 do DylannArts, entre outros trabalhos para criadores e marcas.',
          ],
        },
      ],
      tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Blender', 'DaVinci Resolve'],
      faq: [
        {
          q: 'Quanto custa a edição de um vídeo?',
          a: 'Depende da duração e da complexidade (motion graphics, legendas, efeitos). Trabalhamos por vídeo avulso ou pacotes mensais para criadores e empresas — peça um orçamento pelo WhatsApp.',
        },
        {
          q: 'Vocês editam vídeos para YouTube e para reels?',
          a: 'Sim. Editamos vídeos longos para YouTube e adaptamos cortes verticais para reels, stories, Shorts e TikTok, otimizados para cada formato.',
        },
        {
          q: 'Como envio o material bruto?',
          a: 'Você compartilha os arquivos por Google Drive ou serviço similar. Devolvemos o vídeo finalizado no formato e resolução da plataforma de destino.',
        },
        {
          q: 'Qual o prazo de entrega?',
          a: 'Vídeos curtos costumam ficar prontos em poucos dias; projetos com motion graphics ou VFX exigem mais tempo. O prazo é combinado antes do início.',
        },
      ],
      ctaTitle: 'Precisa de um editor de vídeo profissional?',
      ctaLabel: 'Pedir orçamento de edição',
      whatsappMessage: 'Olá! Preciso de edição de vídeos e quero um orçamento da Lumen Connection.',
    },
    en: {
      metaTitle: 'Video Editing for YouTube, Reels & Brands',
      metaDescription:
        'Professional video editing with Premiere Pro and After Effects: YouTube, Reels, stories and commercials. Dynamic cuts, motion graphics, color and sound.',
      keywords: [
        'video editing',
        'professional video editor',
        'YouTube video editing',
        'Reels editing',
        'social media video',
        'motion graphics',
        'Premiere Pro',
        'After Effects',
      ],
      h1: 'Professional Video Editing for YouTube, Reels & Brands',
      intro: [
        'Video is the language of the internet — and editing quality is what separates content that holds attention from content that gets skipped. Lumen Connection edits video professionally with Adobe Premiere Pro, After Effects and Blender.',
        'We edit everything: long-form YouTube videos with a dynamic style, Reels and stories optimized for retention, product commercials and institutional videos for companies.',
      ],
      sections: [
        {
          heading: 'What goes into our editing',
          body: [
            'Rhythmic cuts and storytelling, animated captions, motion graphics, color grading, audio treatment, sound effects and music. Every video is designed for the platform it will live on: what works on YouTube is not what works in a 30-second Reel.',
            'In the portfolio: dynamic edits for the Universo Nerdístico Studios channel and DylannArts’ 2026 World Cup stickers commercial, among other work for creators and brands.',
          ],
        },
      ],
      tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Blender', 'DaVinci Resolve'],
      faq: [
        {
          q: 'How much does video editing cost?',
          a: 'It depends on length and complexity (motion graphics, captions, effects). We work per video or on monthly packages for creators and companies — ask for a quote on WhatsApp.',
        },
        {
          q: 'Do you edit for YouTube and for Reels?',
          a: 'Yes. We edit long-form YouTube videos and adapt vertical cuts for Reels, stories, Shorts and TikTok, optimized for each format.',
        },
        {
          q: 'How do I send the raw footage?',
          a: 'You share files via Google Drive or a similar service. We deliver the finished video in the target platform’s format and resolution.',
        },
        {
          q: 'What is the turnaround time?',
          a: 'Short videos are usually ready in a few days; projects with motion graphics or VFX take longer. The deadline is agreed before we start.',
        },
      ],
      ctaTitle: 'Need a professional video editor?',
      ctaLabel: 'Get an editing quote',
      whatsappMessage: 'Hi! I need video editing and would like a quote from Lumen Connection.',
    },
  },
  {
    id: 'design',
    link: link('design'),
    projectCategories: ['Design Gráfico, Branding e Identidade Visual', 'Posters'],
    cover: '/images/covers/design.jpeg',
    color: '#a855f7',
    pt: {
      metaTitle: 'Design Gráfico, Identidade Visual e Criação de Logo',
      metaDescription:
        'Design gráfico profissional: criação de logo, identidade visual, branding, banners, posters e materiais para redes sociais. Design que valoriza sua marca.',
      keywords: [
        'design',
        'design gráfico',
        'identidade visual',
        'criação de logo',
        'branding',
        'designer profissional',
        'posters',
        'banner para empresa',
      ],
      h1: 'Design Gráfico, Branding e Identidade Visual',
      intro: [
        'Design não é enfeite: é a forma como a sua marca se apresenta ao mundo. A Lumen Connection cria logos, identidades visuais completas, banners, cartões de visita, posters artísticos e materiais para redes sociais — sempre com conceito por trás de cada escolha.',
        'Atendemos empresas que estão nascendo e precisam de uma identidade do zero, e marcas estabelecidas que querem renovar sua presença visual.',
      ],
      sections: [
        {
          heading: 'Do logo ao design em movimento',
          body: [
            'Além do design estático, criamos motion design — logos animados e vinhetas em After Effects que dão vida à marca em vídeos e redes sociais, como a animação do logo Queridas Compras. Também assinamos posters artísticos e ilustrações digitais com identidade marcante, e o design de interfaces completas como a revista digital DemoDisc.',
          ],
        },
      ],
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Figma', 'Blender'],
      faq: [
        {
          q: 'O que está incluso na criação de uma identidade visual?',
          a: 'Logo em todas as variações, paleta de cores, tipografia, aplicações (cartão, papelaria, redes sociais) e um guia de uso da marca. O escopo é ajustável ao tamanho do seu projeto.',
        },
        {
          q: 'Quanto custa a criação de um logo?',
          a: 'Varia com a profundidade do projeto: um logo pontual custa menos que uma identidade visual completa com manual de marca. Peça um orçamento gratuito pelo WhatsApp.',
        },
        {
          q: 'Recebo os arquivos em quais formatos?',
          a: 'Você recebe os arquivos finais em alta resolução e formatos editáveis (PNG, SVG, PDF e os arquivos-fonte), prontos para impressão e uso digital.',
        },
        {
          q: 'Vocês criam artes para redes sociais?',
          a: 'Sim. Criamos posts, capas, thumbnails e templates alinhados à identidade da sua marca — pontualmente ou em pacotes mensais.',
        },
      ],
      ctaTitle: 'Sua marca merece um design profissional',
      ctaLabel: 'Falar com um designer',
      whatsappMessage: 'Olá! Quero um projeto de design com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Graphic Design, Visual Identity & Logo Creation',
      metaDescription:
        'Professional graphic design: logo creation, visual identity, branding, banners, posters and social media assets. Design that elevates your brand.',
      keywords: [
        'graphic design',
        'visual identity',
        'logo design',
        'branding',
        'professional designer',
        'posters',
        'social media design',
      ],
      h1: 'Graphic Design, Branding & Visual Identity',
      intro: [
        'Design is not decoration: it is how your brand presents itself to the world. Lumen Connection creates logos, complete visual identities, banners, business cards, artistic posters and social media assets — always with a concept behind every choice.',
        'We serve businesses that are just starting and need an identity from scratch, and established brands looking to refresh their visual presence.',
      ],
      sections: [
        {
          heading: 'From logo to motion design',
          body: [
            'Beyond static design, we create motion design — animated logos and idents in After Effects that bring brands to life in videos and social media, like the Queridas Compras logo animation. We also craft artistic posters and digital illustrations with a strong identity, and full interface designs like the DemoDisc digital magazine.',
          ],
        },
      ],
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Figma', 'Blender'],
      faq: [
        {
          q: 'What is included in a visual identity project?',
          a: 'Logo in all variations, color palette, typography, applications (cards, stationery, social media) and a brand usage guide. The scope adjusts to the size of your project.',
        },
        {
          q: 'How much does a logo cost?',
          a: 'It varies with the depth of the project: a standalone logo costs less than a complete visual identity with brand guidelines. Ask for a free quote on WhatsApp.',
        },
        {
          q: 'Which file formats do I receive?',
          a: 'You receive final files in high resolution and editable formats (PNG, SVG, PDF and source files), ready for print and digital use.',
        },
        {
          q: 'Do you design social media assets?',
          a: 'Yes. We create posts, covers, thumbnails and templates aligned with your brand identity — one-off or in monthly packages.',
        },
      ],
      ctaTitle: 'Your brand deserves professional design',
      ctaLabel: 'Talk to a designer',
      whatsappMessage: 'Hi! I want a design project with Lumen Connection.',
    },
  },
  {
    id: '3d',
    link: link('3d'),
    projectCategories: ['Modelagem 3D'],
    cover: '/images/covers/blender-3d.jpeg',
    color: '#06b6d4',
    pt: {
      metaTitle: 'Modelagem 3D e Renderização no Blender',
      metaDescription:
        'Modelagem 3D profissional no Blender: personagens, cenários, produtos e animações. Renderização de alta fidelidade para comerciais, jogos e marcas.',
      keywords: [
        'modelagem 3D',
        'renderização 3D',
        'Blender',
        'animação 3D',
        'modelagem de produto',
        'artista 3D',
      ],
      h1: 'Modelagem 3D, Animação e Renderização no Blender',
      intro: [
        'Do conceito ao render final: a Lumen Connection modela, texturiza, anima e renderiza em 3D usando Blender. Criamos personagens, cenários, objetos e visualizações de produto com acabamento de alta fidelidade.',
        'O 3D abre possibilidades que a fotografia não alcança: mostrar um produto que ainda não existe, criar um comercial inteiro sem sair do estúdio ou dar vida a um personagem da sua marca.',
      ],
      sections: [
        {
          heading: 'O que produzimos em 3D',
          body: [
            'Comerciais e trailers — como o nosso trailer comercial da Ferrari, modelado, animado e renderizado inteiramente no Blender —, visualização de produtos para e-commerce e marketing, cenários e ambientes, personagens estilizados e elementos 3D para vídeos e VFX.',
          ],
        },
      ],
      tools: ['Blender', 'Cycles', 'EEVEE', 'Adobe After Effects', 'Substance Painter'],
      faq: [
        {
          q: 'Quanto custa um projeto de modelagem 3D?',
          a: 'Depende da complexidade do modelo, da texturização e se há animação. Um objeto de produto é mais simples que um comercial completo — envie sua ideia e receba uma estimativa gratuita.',
        },
        {
          q: 'Vocês fazem animação além da modelagem?',
          a: 'Sim. Entregamos desde o modelo estático (para render ou impressão 3D) até animações completas com câmera, iluminação e pós-produção.',
        },
        {
          q: 'Em que formato recebo o trabalho?',
          a: 'Renders em imagem (PNG/EXR), vídeo finalizado (MP4/WebM) ou os arquivos-fonte do Blender e modelos exportados (FBX, glTF, OBJ), conforme o contratado.',
        },
        {
          q: '3D serve para o marketing da minha empresa?',
          a: 'Sim — visualizações 3D de produto elevam o padrão de anúncios, sites e redes sociais, e permitem mostrar variações e detalhes impossíveis numa foto.',
        },
      ],
      ctaTitle: 'Vamos criar em 3D?',
      ctaLabel: 'Conversar sobre meu projeto 3D',
      whatsappMessage: 'Olá! Quero um projeto de modelagem 3D com a Lumen Connection.',
    },
    en: {
      metaTitle: '3D Modeling & Rendering in Blender',
      metaDescription:
        'Professional 3D modeling in Blender: characters, environments, products and animation. High-fidelity rendering for commercials, games and brands.',
      keywords: [
        '3D modeling',
        '3D rendering',
        'Blender',
        '3D animation',
        'product visualization',
        '3D artist',
      ],
      h1: '3D Modeling, Animation & Rendering in Blender',
      intro: [
        'From concept to final render: Lumen Connection models, textures, animates and renders in 3D using Blender. We create characters, environments, objects and product visualizations with high-fidelity finishing.',
        '3D opens possibilities photography cannot reach: showing a product that does not exist yet, producing an entire commercial without leaving the studio, or bringing your brand’s character to life.',
      ],
      sections: [
        {
          heading: 'What we produce in 3D',
          body: [
            'Commercials and trailers — like our Ferrari commercial trailer, modeled, animated and rendered entirely in Blender —, product visualization for e-commerce and marketing, environments, stylized characters and 3D elements for video and VFX.',
          ],
        },
      ],
      tools: ['Blender', 'Cycles', 'EEVEE', 'Adobe After Effects', 'Substance Painter'],
      faq: [
        {
          q: 'How much does a 3D project cost?',
          a: 'It depends on model complexity, texturing and whether there is animation. A product asset is simpler than a full commercial — send your idea for a free estimate.',
        },
        {
          q: 'Do you animate as well as model?',
          a: 'Yes. We deliver anything from a static model (for rendering or 3D printing) to complete animations with camera, lighting and post-production.',
        },
        {
          q: 'In which formats do I receive the work?',
          a: 'Image renders (PNG/EXR), finished video (MP4/WebM) or Blender source files and exported models (FBX, glTF, OBJ), as contracted.',
        },
        {
          q: 'Is 3D useful for my company’s marketing?',
          a: 'Yes — 3D product visualization raises the bar for ads, websites and social media, showing variations and details impossible in a photo.',
        },
      ],
      ctaTitle: 'Let’s create in 3D',
      ctaLabel: 'Talk about my 3D project',
      whatsappMessage: 'Hi! I want a 3D modeling project with Lumen Connection.',
    },
  },
  {
    id: 'vfx',
    link: link('vfx'),
    projectCategories: ['Edição de VFX'],
    cover: '/images/covers/vfx.jpeg',
    color: '#f59e0b',
    pt: {
      metaTitle: 'Efeitos Visuais (VFX) e Motion Graphics',
      metaDescription:
        'Criação de efeitos visuais com After Effects e Blender: composição, motion graphics, integração 3D e VFX para vídeos, comerciais e redes sociais.',
      keywords: [
        'efeitos visuais',
        'VFX',
        'motion graphics',
        'composição de vídeo',
        'After Effects',
        'pós-produção de vídeo',
      ],
      h1: 'Efeitos Visuais (VFX) e Motion Graphics',
      intro: [
        'Efeitos visuais transformam um vídeo comum em algo memorável. A Lumen Connection cria VFX com Adobe After Effects, Blender e outras ferramentas profissionais: composição, rastreamento de movimento, integração de elementos 3D e motion graphics.',
        'Aplicamos VFX em comerciais, vídeos para redes sociais, conteúdo para criadores e projetos audiovisuais que precisam daquele acabamento de cinema.',
      ],
      sections: [
        {
          heading: 'VFX e 3D no mesmo estúdio',
          body: [
            'Como também dominamos modelagem 3D no Blender, integramos elementos tridimensionais em filmagens reais com iluminação e perspectiva consistentes — do produto flutuando na cena ao cenário inteiramente digital. Tudo em um único fluxo de trabalho, sem depender de terceiros.',
          ],
        },
      ],
      tools: ['Adobe After Effects', 'Blender', 'Adobe Premiere Pro'],
      faq: [
        {
          q: 'Que tipo de efeitos visuais vocês criam?',
          a: 'Composição e limpeza de cena, rastreamento de movimento, integração de objetos 3D, simulações, motion graphics, legendas animadas e vinhetas.',
        },
        {
          q: 'VFX funciona em vídeo para redes sociais?',
          a: 'Sim — efeitos bem aplicados aumentam muito a retenção em reels e Shorts. Adaptamos a complexidade ao formato e ao prazo do seu conteúdo.',
        },
        {
          q: 'Posso contratar VFX junto com a edição do vídeo?',
          a: 'Sim, e é o ideal: cuidamos da edição completa e dos efeitos no mesmo projeto, garantindo ritmo e consistência visual.',
        },
        {
          q: 'Como é o processo de um projeto de VFX?',
          a: 'Você envia o material bruto e a referência do resultado desejado; alinhamos escopo e prazo, produzimos uma prévia para aprovação e entregamos o vídeo final em alta qualidade.',
        },
      ],
      ctaTitle: 'Seu vídeo com acabamento de cinema',
      ctaLabel: 'Pedir orçamento de VFX',
      whatsappMessage: 'Olá! Quero efeitos visuais (VFX) em um projeto com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Visual Effects (VFX) & Motion Graphics',
      metaDescription:
        'Visual effects with After Effects and Blender: compositing, motion graphics, 3D integration and VFX for videos, commercials and social media.',
      keywords: [
        'visual effects',
        'VFX',
        'motion graphics',
        'video compositing',
        'After Effects',
        'video post-production',
      ],
      h1: 'Visual Effects (VFX) & Motion Graphics',
      intro: [
        'Visual effects turn an ordinary video into something memorable. Lumen Connection creates VFX with Adobe After Effects, Blender and other professional tools: compositing, motion tracking, 3D integration and motion graphics.',
        'We apply VFX to commercials, social media videos, creator content and audiovisual projects that need that cinematic finish.',
      ],
      sections: [
        {
          heading: 'VFX and 3D in the same studio',
          body: [
            'Since we also master 3D modeling in Blender, we integrate three-dimensional elements into real footage with consistent lighting and perspective — from a product floating in the scene to a fully digital environment. All in a single workflow, with no third parties involved.',
          ],
        },
      ],
      tools: ['Adobe After Effects', 'Blender', 'Adobe Premiere Pro'],
      faq: [
        {
          q: 'What kind of visual effects do you create?',
          a: 'Compositing and scene cleanup, motion tracking, 3D object integration, simulations, motion graphics, animated captions and idents.',
        },
        {
          q: 'Does VFX work for social media video?',
          a: 'Yes — well-applied effects significantly increase retention on Reels and Shorts. We adapt complexity to your format and deadline.',
        },
        {
          q: 'Can I hire VFX together with video editing?',
          a: 'Yes, and that is ideal: we handle the full edit and the effects in the same project, ensuring rhythm and visual consistency.',
        },
        {
          q: 'What does a VFX project look like?',
          a: 'You send the raw footage and a reference of the desired result; we align scope and deadline, produce a preview for approval and deliver the final video in high quality.',
        },
      ],
      ctaTitle: 'Your video with a cinematic finish',
      ctaLabel: 'Get a VFX quote',
      whatsappMessage: 'Hi! I want visual effects (VFX) for a project with Lumen Connection.',
    },
  },
]

export function getServiceBySlug(locale: Locale, slug: string): ServiceSeo | undefined {
  return SERVICES_SEO.find((s) => (locale === 'en' ? s.link.slugEn : s.link.slugPt) === slug)
}

export function getServiceContent(service: ServiceSeo, locale: Locale): ServiceLocaleContent {
  return locale === 'en' ? service.en : service.pt
}

const COMING_SOON_TITLES = new Set(['Em breve', 'Em Breve', 'Coming soon', 'Coming Soon'])

/** Itens de portfólio reais (sem placeholders "Em breve") das categorias do serviço. */
export function getPortfolioItems(service: ServiceSeo): ProjectItem[] {
  return projects
    .filter((p) => service.projectCategories.includes(p.category))
    .flatMap((p) => p.items)
    .filter((item) => item.image !== '/' && !COMING_SOON_TITLES.has(item.title))
}
