import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import ALECIntro from '@/components/ALECIntro'
import UseCases from '@/components/UseCases'
import SocialProof from '@/components/SocialProof'
import Integrations from '@/components/Integrations'
import Differentiation from '@/components/Differentiation'
import Services from '@/components/Services'
import BlogTeaser from '@/components/BlogTeaser'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'AI Agency - Automate Your Business with AI | stuffnthings',
  description: 'Transform your business with AI automation. Custom AI agents, workflow optimization, and intelligent solutions that scale.',
}

export default function AIAgencyPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <ALECIntro />
        <UseCases />
        <SocialProof />
        <Integrations />
        <Differentiation />
        <Services />
        <BlogTeaser />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}