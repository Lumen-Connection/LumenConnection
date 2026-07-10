'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { SuccessCasesSection } from '@/components/SuccessCasesSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SecondBanner } from '@/components/SecondBanner'
import { AboutSection } from '@/components/AboutSection'
import { CTASection } from '@/components/CTASection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ActiveColorProvider, useActiveColor } from '@/lib/active-color'

const AccessibilityWidget = dynamic(
  () => import('@/components/AccessibilityWidget').then((mod) => mod.AccessibilityWidget),
  { ssr: false },
)

function HeroGlow() {
  const { activeColor } = useActiveColor()
  return (
    <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[200px] rounded-full blur-[100px] transition-all duration-[1200ms] ease-in-out"
        style={{ background: `radial-gradient(ellipse, ${activeColor}20 0%, transparent 70%)` }}
      />
    </div>
  )
}

export function Portfolio() {
  const [pendingCategory, setPendingCategory] = useState<string | null>(null)
  const [viewAllTrigger, setViewAllTrigger] = useState(0)

  const handleVerProjeto = (category: string) => {
    setPendingCategory(category)
    setTimeout(() => {
      document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleVerPortfolio = () => {
    setViewAllTrigger((n) => n + 1)
    setTimeout(() => {
      document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <ActiveColorProvider>
    <Header />
    <div id="a11y-content" className="min-h-screen bg-black text-white overflow-x-hidden">
      <main id="main-content" tabIndex={-1}>
        <HeroSection onVerProjeto={handleVerProjeto} />
        <HeroGlow />
        <AboutSection />
        <SuccessCasesSection />
        <ProjectsSection pendingCategory={pendingCategory} viewAllTrigger={viewAllTrigger} />
        <SecondBanner />
        <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] rounded-full blur-[110px] bg-orange-500/5" />
        </div>
        <CTASection onVerPortfolio={handleVerPortfolio} />
        <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] rounded-full blur-[110px] bg-orange-500/5" />
        </div>
        <ContactSection />
      </main>
      <Footer />
      </div>
      <AccessibilityWidget />
    </ActiveColorProvider>
  )
}
