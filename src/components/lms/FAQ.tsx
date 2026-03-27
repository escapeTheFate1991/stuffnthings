import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const faqs: FAQItem[] = [
    {
      question: 'What makes stuffnthings different from other coding platforms?',
      answer: `stuffnthings combines unlimited access with premium quality instruction. Unlike platforms that charge per course, you get everything for one monthly price.

Our advantages:
• All-Access Membership: 1,000+ courses for one price
• Expert Instructors: Learn from industry professionals  
• Hands-On Projects: Build real applications for your portfolio
• Career Support: Resume help, interview prep, job placement assistance
• Community Access: Connect with 50,000+ learners worldwide
• Mobile Learning: Download content for offline study`
    },
    {
      question: 'Do you offer financing options or scholarships?',
      answer: `Yes! stuffnthings is committed to making tech education accessible to everyone.

Financial Options Available:
• 7-Day Free Trial: Try everything risk-free
• Monthly Plans: Pay as you go at $29/month
• Annual Discounts: Save 40% with yearly subscription
• Student Discounts: Special rates for full-time students
• Military Discounts: Support for veterans and active service
• Scholarship Program: Need-based financial assistance available

Contact our support team to discuss scholarship opportunities if cost is a barrier to your education.`
    },
    {
      question: 'How does the subscription model work?',
      answer: `Our all-access subscription gives you unlimited learning power:

What's Included:
• Complete access to 1,000+ courses
• New content added weekly
• Download courses for offline learning
• Premium bootcamp programs included
• Career support and job placement help
• Community forum and live Q&A sessions

Pricing:
• 7 days free trial (no credit card required)
• $29/month after trial period
• Cancel anytime with no penalties
• Pause subscription for up to 3 months if needed

Unlike other platforms charging $50-200 per course, you get everything for less than $1 per day.`
    },
    {
      question: 'What level of support do you provide?',
      answer: `We provide comprehensive support to ensure your success:

Learning Support:
• Live Q&A sessions with instructors
• Community forums with expert moderators  
• Direct messaging with course instructors
• Peer-to-peer study groups and project collaboration

Career Support:
• Resume and portfolio reviews
• Mock interview sessions
• Job search strategy guidance
• LinkedIn optimization help
• Networking event invitations
• Direct connections to hiring partners

Technical Support:
• 24/7 platform technical support
• Course content questions answered within 24 hours
• Live coding help sessions twice weekly
• Debugging assistance for your projects`
    },
    {
      question: 'Can I get certificates and how are they recognized?',
      answer: `Yes! stuffnthings offers industry-recognized certification:

Certificate Types:
• Course Completion Certificates: For individual courses
• Bootcamp Certificates: For intensive program completion
• Skill Verification Badges: LinkedIn-compatible digital badges
• Portfolio Certifications: Project-based skill demonstrations

Recognition:
• Accepted by top tech companies including Google, Meta, Amazon
• LinkedIn integration for professional credibility
• Employer verification system available
• Industry partnership program with 200+ companies

Career Impact:
• 89% of certificate holders report career advancement
• Average 40% salary increase within 12 months
• Direct job placement assistance for bootcamp graduates
• Ongoing career coaching included with premium certificates`
    },
    {
      question: 'What technologies and skills do you cover?',
      answer: `stuffnthings covers the most in-demand tech skills:

Programming Languages:
• JavaScript, Python, Java, C++, Go, Rust
• HTML/CSS, TypeScript, PHP, Ruby
• SQL, NoSQL, GraphQL

Frameworks & Tools:
• React, Angular, Vue.js, Next.js
• Node.js, Django, Flask, Express
• Docker, Kubernetes, AWS, Azure
• Git, GitHub, CI/CD pipelines

Specialized Tracks:
• Artificial Intelligence & Machine Learning
• Mobile App Development (iOS/Android)
• Cloud Computing & DevOps
• Cybersecurity & Ethical Hacking
• Data Science & Analytics
• UI/UX Design
• Blockchain Development

All content is updated regularly to match current industry demands and emerging technologies.`
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h2 
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass rounded-xl overflow-hidden transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 text-zinc-400 whitespace-pre-line leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}