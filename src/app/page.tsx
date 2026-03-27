'use client'

import { useEffect, useState } from 'react'
import AnnouncementBar from '@/components/lms/AnnouncementBar'
import KimiNavigation from '@/components/lms/KimiNavigation'
import KimiHero from '@/components/lms/KimiHero'
import Companies from '@/components/lms/Companies'
import KimiCourses from '@/components/lms/KimiCourses'
import TechdegreeSection from '@/components/lms/TechdegreeSection'
import LMSFeatures from '@/components/lms/LMSFeatures'
import FAQ from '@/components/lms/FAQ'
import LMSFooter from '@/components/lms/LMSFooter'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnnouncementBar />
      <KimiNavigation scrollY={scrollY} />
      <main>
        <KimiHero />
        <Companies />
        <KimiCourses />
        <TechdegreeSection />
        <LMSFeatures />
        <FAQ />
      </main>
      <LMSFooter />
    </div>
  )
}
