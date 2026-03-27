import { Header } from '@/components/ui/header-1'
import LMSHero from '@/components/lms/LMSHero'
import LMSFeatures from '@/components/lms/LMSFeatures'
import LMSCourses from '@/components/lms/LMSCourses'
import LMSFooter from '@/components/lms/LMSFooter'

export const metadata = {
  title: 'Learn Technology Skills That Matter | stuffnthings Learning Platform',
  description: 'Master web development, AI/ML, mobile apps, and more with hands-on courses from industry experts. Join 50,000+ learners transforming their careers.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <LMSHero />
        <LMSFeatures />
        <LMSCourses />
      </main>
      <LMSFooter />
    </div>
  )
}
