import Hero from '@/components/Hero'
import AIAutomation from '@/components/AIAutomation'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AIAutomation />
        <Problem />
        <HowItWorks />
        <SocialProof />
        <Services />
        <Portfolio />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
