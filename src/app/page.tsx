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

export default function Home() {
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
