import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
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
