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
        'web design',
        'webdesign',
        'criação de sites',
        'fazer site',
        'faça seu site',
        'desenvolver site',
        'site profissional',
        'criação de site para empresa',
        'desenvolvimento de sites João Pessoa',
        'ajuda com IA',
        'site com inteligência artificial',
        'Next.js',
        'React',
      ],
      h1: 'Desenvolvimento Web e Criação de Sites Profissionais',
      intro: [
        'Quer desenvolver o site da sua empresa, lançar uma loja virtual ou tirar um sistema web do papel? A Lumen Connection projeta e desenvolve sites profissionais completos: web design, código, hospedagem e SEO ficam com a gente.',
        'Trabalhamos com Next.js, React, TypeScript e Tailwind CSS para entregar sites rápidos, seguros e prontos para aparecer no Google. Cada projeto é construído sob medida, sem templates genéricos.',
      ],
      sections: [
        {
          heading: 'Por que criar seu site com a Lumen Connection?',
          body: [
            'Boa parte dos seus clientes pesquisa no Google antes de fechar qualquer negócio. Nós unimos engenharia de software e estética visual para que o seu site funcione bem e represente a identidade da sua marca, com velocidade de carregamento, acessibilidade e otimização para mecanismos de busca (SEO) planejadas desde o início do projeto.',
            'Já desenvolvemos plataformas como o Queridas Compras, vitrine online de lojas regionais de João Pessoa, e o MariDicas, plataforma de economia inteligente com ofertas curadas. Ambos foram construídos em Next.js e estão no ar hoje.',
          ],
        },
        {
          heading: 'Como funciona o desenvolvimento do seu site',
          body: [
            'Começamos entendendo o objetivo do projeto: institucional, portfólio, e-commerce ou sistema web completo. Em seguida desenhamos o layout, desenvolvemos, testamos em todos os dispositivos e publicamos, com prazos claros e acompanhamento em cada etapa. Depois do lançamento, você pode contar com manutenção e evolução contínua.',
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
          a: 'Sim. Todo projeto é responsivo por padrão e testado em celulares, tablets e desktops. A maior parte do tráfego brasileiro hoje vem do celular.',
        },
        {
          q: 'Vocês fazem manutenção depois da entrega?',
          a: 'Sim. Oferecemos planos de manutenção, atualização de conteúdo e evolução contínua para o seu site continuar rápido, seguro e atualizado.',
        },
        {
          q: 'Vocês cuidam do web design ou só da programação?',
          a: 'Dos dois. O web design (layout, cores, tipografia e experiência de navegação) e o código são feitos pelo mesmo time, então o visual aprovado é exatamente o que vai ao ar.',
        },
        {
          q: 'Consigo ajuda com IA no meu site?',
          a: 'Sim. Integramos inteligência artificial a sites e sistemas, como assistentes virtuais e chatbots de atendimento. O Lumen AI, assistente do nosso próprio site, é um exemplo funcionando na prática.',
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
        'web design',
        'website creation',
        'build a website',
        'professional website',
        'custom web development',
        'AI help',
        'AI integration',
        'Next.js',
        'React',
      ],
      h1: 'Web Development & Professional Website Creation',
      intro: [
        'Need a website for your business, an online store or a full web system? Lumen Connection designs and builds complete professional websites: web design, code, hosting and SEO, all handled by one team.',
        'We work with Next.js, React, TypeScript and Tailwind CSS to deliver fast, secure websites that are ready to rank on Google. Every project is custom-built, without generic templates.',
      ],
      sections: [
        {
          heading: 'Why build your website with Lumen Connection?',
          body: [
            'Most customers research a business on Google before making contact. We combine software engineering and visual design so your site works well and expresses your brand identity, with loading speed, accessibility and search engine optimization planned from the start of the project.',
            'We have shipped platforms like Queridas Compras, an online showcase for regional shops in João Pessoa, and MariDicas, a smart-savings platform with curated deals. Both were built in Next.js and are live today.',
          ],
        },
        {
          heading: 'How the development process works',
          body: [
            'We start by understanding the goal: institutional site, portfolio, e-commerce or a complete web system. Then we design the layout, develop, test across devices and launch, with clear deadlines and follow-up at every step. After launch, you can count on maintenance and continuous improvement.',
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
        {
          q: 'Do you handle the web design or just the code?',
          a: 'Both. Web design (layout, colors, typography and navigation) and code are done by the same team, so the approved visual is exactly what goes live.',
        },
        {
          q: 'Can I get AI features on my website?',
          a: 'Yes. We integrate artificial intelligence into websites and systems, such as virtual assistants and support chatbots. Lumen AI, the assistant on our own site, is a working example.',
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
        'ajuda com IA',
        'integração de inteligência artificial',
        'automação com IA',
      ],
      h1: 'Desenvolvimento de Software Sob Medida',
      intro: [
        'Nem todo problema se resolve com um site. Quando o seu negócio precisa de uma ferramenta própria, seja um aplicativo desktop, um utilitário interno ou um produto completo, a Lumen Connection desenvolve o software sob medida, com foco em performance e experiência de uso.',
        'Somos especializados em desenvolvimento nativo para Windows com Rust, C++17, Qt 6, WinUI e Razor: aplicações leves, rápidas e com a identidade visual do seu projeto.',
      ],
      sections: [
        {
          heading: 'Software que criamos e mantemos',
          body: [
            'O Lumen Music é um reprodutor de áudio desktop para Windows, feito em C++17 com Qt 6: biblioteca local com playlists, fila estilo Spotify, edição de metadados e seis temas personalizáveis, tudo funcionando offline. O Lumen Chat, escrito em Rust, é um cliente de IA nativo que conecta a dezenas de modelos de linguagem com armazenamento seguro de chaves. Os dois estão disponíveis para download gratuito no nosso site.',
            'Aplicamos essa mesma engenharia no software da sua empresa: atenção ao consumo de memória, à velocidade e ao polimento da interface.',
          ],
        },
      ],
      tools: ['Rust', 'C++17', 'Qt 6', 'WinUI', 'Razor', 'SQLite'],
      faq: [
        {
          q: 'Que tipo de software vocês desenvolvem?',
          a: 'Aplicações desktop nativas para Windows, utilitários internos, ferramentas de automação e produtos completos. Se a sua necessidade for web ou mobile, também atendemos: veja nossas páginas de desenvolvimento web e mobile.',
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
        {
          q: 'Vocês oferecem ajuda com IA?',
          a: 'Sim. Conectamos modelos de inteligência artificial a programas e fluxos de trabalho, do chatbot interno à automação de tarefas repetitivas. O Lumen Chat, nosso cliente de IA escrito em Rust, nasceu dessa especialidade.',
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
        'AI help',
        'AI integration',
        'AI automation',
      ],
      h1: 'Custom Software Development',
      intro: [
        'Not every problem is solved with a website. When your business needs its own tool, whether a desktop application, an internal utility or a complete product, Lumen Connection builds custom software focused on performance and user experience.',
        'We specialize in native Windows development with Rust, C++17, Qt 6, WinUI and Razor: lightweight, fast applications carrying your project’s visual identity.',
      ],
      sections: [
        {
          heading: 'Software we build and maintain',
          body: [
            'Lumen Music is a native Windows desktop audio player built in C++17 with Qt 6: local library with playlists, a Spotify-style queue, metadata editing and six customizable themes, all working offline. Lumen Chat, written in Rust, is a native AI client that connects to dozens of language models with secure key storage. Both are available as free downloads on our site.',
            'We bring that same engineering to your company’s software: attention to memory use, speed and interface polish.',
          ],
        },
      ],
      tools: ['Rust', 'C++17', 'Qt 6', 'WinUI', 'Razor', 'SQLite'],
      faq: [
        {
          q: 'What kind of software do you build?',
          a: 'Native Windows desktop applications, internal utilities, automation tools and complete products. If you need web or mobile, we cover those too: see our web and mobile development pages.',
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
        {
          q: 'Do you offer help with AI?',
          a: 'Yes. We connect artificial intelligence models to programs and workflows, from internal chatbots to automating repetitive tasks. Lumen Chat, our AI client written in Rust, grew out of this specialty.',
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
        'A Lumen Connection cria aplicativos para Android e iOS com Flutter, React Native e Kotlin, frameworks que encurtam o desenvolvimento sem abrir mão de uma experiência fluida, com cara de app nativo.',
        'Cuidamos de todas as etapas: desenho das telas, desenvolvimento, testes e publicação na Google Play e na App Store.',
      ],
      sections: [
        {
          heading: 'Um app com a cara da sua marca',
          body: [
            'Como somos um estúdio que une engenharia e design, o seu aplicativo nasce com identidade visual consistente, animações cuidadosas e telas desenhadas para quem vai usá-las todos os dias. E um mesmo código atende Android e iOS, o que reduz custo e prazo.',
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
        'Lumen Connection builds Android and iOS apps with Flutter, React Native and Kotlin, frameworks that shorten development without giving up a fluid, native-feeling experience.',
        'We handle every stage: screen design, development, testing and publishing on Google Play and the App Store.',
      ],
      sections: [
        {
          heading: 'An app that carries your brand',
          body: [
            'Because we are a studio that combines engineering and design, your app is born with a consistent visual identity, careful animations and screens designed for the people who will use them every day. One codebase serves both Android and iOS, which cuts cost and time.',
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
        'Uma boa edição decide se o público assiste até o fim ou pula seu vídeo nos primeiros segundos. A Lumen Connection edita vídeos profissionalmente com Adobe Premiere Pro, After Effects e Blender.',
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
          a: 'Depende da duração e da complexidade (motion graphics, legendas, efeitos). Trabalhamos por vídeo avulso ou pacotes mensais para criadores e empresas. Peça um orçamento pelo WhatsApp.',
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
        'Good editing decides whether people watch to the end or skip your video in the first seconds. Lumen Connection edits video professionally with Adobe Premiere Pro, After Effects and Blender.',
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
          a: 'It depends on length and complexity (motion graphics, captions, effects). We work per video or on monthly packages for creators and companies. Ask for a quote on WhatsApp.',
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
        'web design',
        'identidade visual',
        'criação de logo',
        'branding',
        'designer profissional',
        'posters',
        'banner para empresa',
      ],
      h1: 'Design Gráfico, Branding e Identidade Visual',
      intro: [
        'Um logo amador afasta cliente; uma identidade bem construída passa confiança no primeiro contato. A Lumen Connection cria logos, identidades visuais completas, banners, cartões de visita, posters artísticos e materiais para redes sociais, com um conceito sustentando cada escolha.',
        'Atendemos empresas que estão nascendo e precisam de uma identidade do zero, e marcas estabelecidas que querem renovar sua presença visual.',
      ],
      sections: [
        {
          heading: 'Do logo ao design em movimento',
          body: [
            'Também criamos motion design: logos animados e vinhetas em After Effects para vídeos e redes sociais, como a animação do logo Queridas Compras. E assinamos posters artísticos, ilustrações digitais e interfaces completas, caso da revista digital DemoDisc.',
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
          a: 'Sim. Criamos posts, capas, thumbnails e templates alinhados à identidade da sua marca, avulsos ou em pacotes mensais.',
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
        'web design',
        'visual identity',
        'logo design',
        'branding',
        'professional designer',
        'posters',
        'social media design',
      ],
      h1: 'Graphic Design, Branding & Visual Identity',
      intro: [
        'An amateurish logo drives customers away; a well-built identity earns trust at first contact. Lumen Connection creates logos, complete visual identities, banners, business cards, artistic posters and social media assets, with a concept supporting every choice.',
        'We serve businesses that are just starting and need an identity from scratch, and established brands looking to refresh their visual presence.',
      ],
      sections: [
        {
          heading: 'From logo to motion design',
          body: [
            'We also create motion design: animated logos and idents in After Effects for video and social media, like the Queridas Compras logo animation. And we design artistic posters, digital illustrations and complete interfaces, such as the DemoDisc digital magazine.',
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
          a: 'Yes. We create posts, covers, thumbnails and templates aligned with your brand identity, one-off or in monthly packages.',
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
        'A Lumen Connection modela, texturiza, anima e renderiza em 3D usando Blender: personagens, cenários, objetos e visualizações de produto com acabamento de alta fidelidade.',
        'Com 3D dá para mostrar um produto que ainda nem foi fabricado, produzir um comercial inteiro sem locação e animar o personagem da sua marca. A fotografia não chega lá.',
      ],
      sections: [
        {
          heading: 'O que produzimos em 3D',
          body: [
            'Comerciais e trailers, como o nosso trailer da Ferrari, modelado, animado e renderizado inteiramente no Blender. Também produzimos visualização de produtos para e-commerce e marketing, cenários, personagens estilizados e elementos 3D para vídeos e VFX.',
          ],
        },
      ],
      tools: ['Blender', 'Cycles', 'EEVEE', 'Adobe After Effects', 'Substance Painter'],
      faq: [
        {
          q: 'Quanto custa um projeto de modelagem 3D?',
          a: 'Depende da complexidade do modelo, da texturização e se há animação. Um objeto de produto é mais simples que um comercial completo. Envie sua ideia e receba uma estimativa gratuita.',
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
          a: 'Sim. Visualizações 3D de produto deixam anúncios, sites e redes sociais com aparência mais profissional, além de mostrar variações e detalhes impossíveis numa foto.',
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
        'Lumen Connection models, textures, animates and renders in 3D using Blender: characters, environments, objects and product visualizations with high-fidelity finishing.',
        'With 3D you can show a product that has not been manufactured yet, produce an entire commercial without a film set, and animate your brand’s character. Photography cannot get there.',
      ],
      sections: [
        {
          heading: 'What we produce in 3D',
          body: [
            'Commercials and trailers, like our Ferrari trailer, modeled, animated and rendered entirely in Blender. We also produce product visualization for e-commerce and marketing, environments, stylized characters and 3D elements for video and VFX.',
          ],
        },
      ],
      tools: ['Blender', 'Cycles', 'EEVEE', 'Adobe After Effects', 'Substance Painter'],
      faq: [
        {
          q: 'How much does a 3D project cost?',
          a: 'It depends on model complexity, texturing and whether there is animation. A product asset is simpler than a full commercial. Send your idea for a free estimate.',
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
          a: 'Yes. 3D product visualization makes ads, websites and social media look more professional, and shows variations and details impossible in a photo.',
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
        'Aquela cena que parece impossível de ter sido filmada quase sempre é VFX. A Lumen Connection cria efeitos visuais com Adobe After Effects, Blender e outras ferramentas profissionais: composição, rastreamento de movimento, integração de elementos 3D e motion graphics.',
        'Aplicamos VFX em comerciais, vídeos para redes sociais, conteúdo para criadores e projetos audiovisuais que precisam daquele acabamento de cinema.',
      ],
      sections: [
        {
          heading: 'VFX e 3D no mesmo estúdio',
          body: [
            'Como também trabalhamos com modelagem 3D no Blender, integramos elementos tridimensionais em filmagens reais com iluminação e perspectiva consistentes: um produto flutuando na cena, um cenário inteiramente digital. Tudo dentro do mesmo estúdio, sem depender de terceiros.',
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
          a: 'Sim. Efeitos bem aplicados aumentam muito a retenção em reels e Shorts. Adaptamos a complexidade ao formato e ao prazo do seu conteúdo.',
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
        'That scene that looks impossible to have been filmed is almost always VFX. Lumen Connection creates visual effects with Adobe After Effects, Blender and other professional tools: compositing, motion tracking, 3D integration and motion graphics.',
        'We apply VFX to commercials, social media videos, creator content and audiovisual projects that need that cinematic finish.',
      ],
      sections: [
        {
          heading: 'VFX and 3D in the same studio',
          body: [
            'Since we also work with 3D modeling in Blender, we integrate three-dimensional elements into real footage with consistent lighting and perspective: a product floating in the scene, a fully digital environment. Everything inside the same studio, with no third parties involved.',
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
          a: 'Yes. Well-applied effects significantly increase retention on Reels and Shorts. We adapt complexity to your format and deadline.',
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
  {
    id: 'ai',
    link: link('ai'),
    projectCategories: ['Inteligência Artificial'],
    cover: '/images/projects/ai/farejador-cover.webp',
    color: '#a855f7',
    pt: {
      metaTitle: 'Inteligência Artificial: Assistentes de IA para Sites e Lojas',
      metaDescription:
        'Assistentes de IA sob medida para sites, e-commerces e sistemas: um chat que entende linguagem natural, consulta o seu catálogo e indica o que o seu negócio realmente tem. Orçamento grátis.',
      keywords: [
        'inteligência artificial',
        'assistente de IA',
        'chatbot com IA',
        'chatbot para site',
        'IA para e-commerce',
        'assistente virtual para site',
        'integração de IA',
        'agente de IA',
      ],
      h1: 'Inteligência Artificial: assistentes de IA para o seu site',
      intro: [
        'Um bom assistente de IA não é um chatbot genérico: ele conhece o seu catálogo, fala a língua do seu cliente e responde com o que o seu negócio realmente oferece. A Lumen Connection desenvolve assistentes de IA sob medida, integrados ao seu site ou sistema.',
        'O exemplo mais recente é o Farejador IA, do QC Promo: o visitante descreve o que procura — "tênis de corrida até R$150" — e o assistente consulta o catálogo do site para indicar produtos e farejar os menores preços.',
      ],
      sections: [
        {
          heading: 'Como funciona o Farejador IA',
          body: [
            'O Farejador fica num botão flutuante em todas as páginas do QC Promo. Ao abrir, ele se apresenta e oferece atalhos como "Produtos mais baratos", "Indique algo pra mim" e "Tênis em oferta"; a pessoa também pode escrever o pedido do jeito que falaria com um vendedor.',
            'Por trás, a OpenAI interpreta o pedido e conduz a conversa, enquanto a Algolia busca no catálogo do próprio QC Promo. Em vez de responder de memória, o assistente indica só o que encontrou — cada sugestão leva a uma oferta que existe no site.',
          ],
        },
        {
          heading: 'IA conectada aos dados do seu negócio',
          body: [
            'Construímos o assistente em cima dos seus dados — catálogo, preços, perguntas frequentes, políticas — e definimos o que ele pode e o que não pode responder. A IA ajuda a vender e a tirar dúvidas sem prometer o que a empresa não oferece.',
          ],
        },
        {
          heading: 'Integrado ao site, não um widget de terceiros',
          body: [
            'Como também desenvolvemos sites, o assistente nasce com a identidade visual do seu negócio, roda dentro da sua aplicação e é ajustado conforme o comportamento real de quem conversa com ele.',
          ],
        },
      ],
      tools: ['OpenAI', 'Algolia', 'Next.js', 'React', 'TypeScript'],
      faq: [
        {
          q: 'O assistente de IA funciona em qualquer site?',
          a: 'Ele rende mais quando é integrado ao próprio site ou sistema, com acesso aos seus dados. Se o seu site já existe, avaliamos a integração; se ainda não existe, desenvolvemos os dois juntos.',
        },
        {
          q: 'A IA pode responder algo errado?',
          a: 'Reduzimos esse risco fazendo o assistente consultar os seus dados em vez de responder de memória e limitando os assuntos que ele aborda. Também acompanhamos as conversas para ajustar o comportamento.',
        },
        {
          q: 'Qual modelo de IA vocês usam?',
          a: 'Depende do projeto: escolhemos o modelo conforme o custo, a velocidade e a qualidade necessários. No Farejador IA usamos a OpenAI para a conversa e a Algolia para a busca no catálogo.',
        },
        {
          q: 'Quanto custa manter um assistente de IA?',
          a: 'Além do desenvolvimento, existe o custo de uso do modelo, que varia com o volume de conversas. Incluímos uma estimativa no orçamento para você não ter surpresas.',
        },
      ],
      ctaTitle: 'Coloque um assistente de IA no seu site',
      ctaLabel: 'Pedir orçamento de IA',
      whatsappMessage: 'Olá! Quero um assistente de IA para o meu site com a Lumen Connection.',
    },
    en: {
      metaTitle: 'Artificial Intelligence: AI Assistants for Websites & Stores',
      metaDescription:
        'Custom AI assistants for websites, e-commerce and systems: a chat that understands natural language, queries your catalog and recommends what your business actually offers.',
      keywords: [
        'artificial intelligence',
        'AI assistant',
        'AI chatbot',
        'website chatbot',
        'AI for e-commerce',
        'AI integration',
        'AI agent',
      ],
      h1: 'Artificial Intelligence: AI assistants for your website',
      intro: [
        'A good AI assistant is not a generic chatbot: it knows your catalog, speaks your customer’s language and answers with what your business really offers. Lumen Connection builds custom AI assistants integrated into your website or system.',
        'Our latest example is QC Promo’s Farejador AI: visitors describe what they want — "running shoes under R$150" — and the assistant queries the site’s catalog to recommend products and sniff out the lowest prices.',
      ],
      sections: [
        {
          heading: 'How the Farejador AI works',
          body: [
            'The Farejador lives in a floating button on every QC Promo page. When opened, it introduces itself and offers shortcuts such as "Cheapest products", "Recommend something for me" and "Sneakers on sale"; people can also type their request the way they would ask a salesperson.',
            'Under the hood, OpenAI interprets the request and drives the conversation, while Algolia searches QC Promo’s own catalog. Instead of answering from memory, the assistant only recommends what it found — every suggestion leads to a deal that actually exists on the site.',
          ],
        },
        {
          heading: 'AI connected to your business data',
          body: [
            'We build the assistant on top of your data — catalog, prices, FAQs, policies — and define what it can and cannot answer. The AI helps sell and answer questions without promising what the company does not offer.',
          ],
        },
        {
          heading: 'Built into the site, not a third-party widget',
          body: [
            'Because we also build websites, the assistant ships with your brand’s visual identity, runs inside your application and is tuned according to how people actually talk to it.',
          ],
        },
      ],
      tools: ['OpenAI', 'Algolia', 'Next.js', 'React', 'TypeScript'],
      faq: [
        {
          q: 'Does the AI assistant work on any website?',
          a: 'It performs best when integrated into your own site or system, with access to your data. If your site already exists, we assess the integration; if not, we build both together.',
        },
        {
          q: 'Can the AI give wrong answers?',
          a: 'We reduce that risk by having the assistant query your data instead of answering from memory and by limiting the topics it covers. We also review conversations to tune its behavior.',
        },
        {
          q: 'Which AI model do you use?',
          a: 'It depends on the project: we pick the model based on the cost, speed and quality it needs. For the Farejador AI we use OpenAI for the conversation and Algolia for catalog search.',
        },
        {
          q: 'How much does it cost to run an AI assistant?',
          a: 'On top of development there is the model usage cost, which varies with conversation volume. We include an estimate in the quote so there are no surprises.',
        },
      ],
      ctaTitle: 'Put an AI assistant on your website',
      ctaLabel: 'Get an AI quote',
      whatsappMessage: 'Hi! I want an AI assistant for my website with Lumen Connection.',
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
