'use client'

import { useEffect, useState } from 'react'
import KimiNavigation from '@/components/lms/KimiNavigation'
import KimiHero from '@/components/lms/KimiHero'
import KimiCourses from '@/components/lms/KimiCourses'
import LMSFeatures from '@/components/lms/LMSFeatures'
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
      <KimiNavigation scrollY={scrollY} />
      <main>
        <KimiHero />
        <KimiCourses />
        <LMSFeatures />
      </main>
      <LMSFooter />
    </div>
  )
}
