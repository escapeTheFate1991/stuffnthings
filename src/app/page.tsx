import Hero from '@/components/Hero'
import AIAutomation from '@/components/AIAutomation'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import Results from '@/components/Results'
import Services from '@/components/Services'
import UseCases from '@/components/UseCases'
import Integrations from '@/components/Integrations'
import Differentiation from '@/components/Differentiation'
import BlogTeaser from '@/components/BlogTeaser'
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
        <Results />
        <Services />
        <UseCases />
        <Integrations />
        <Differentiation />
        <BlogTeaser />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
