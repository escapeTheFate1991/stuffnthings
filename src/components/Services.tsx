'use client'

import { useEffect, useRef } from 'react'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      name: "Foundation",
      price: "$299",
      period: "/month",
      description: "Perfect for small businesses ready to establish their digital presence",
      features: [
        "Professional website design & development",
        "Mobile-optimized responsive design",
        "Basic SEO setup & optimization",
        "Contact forms & lead capture",
        "SSL certificate & security basics",
        "Monthly performance reports",
        "Email support",
        "1 design revision per month"
      ],
      popular: false,
      cta: "Start with Foundation",
      ideal: "Ideal for: Consultants, local services, small retailers"
    },
    {
      name: "Operational",
      price: "$599",
      priceRange: " - $899",
      period: "/month",
      description: "For growing businesses that need advanced functionality and integrations",
      features: [
        "Everything in Foundation, plus:",
        "Advanced SEO & content optimization",
        "E-commerce capabilities (if needed)",
        "CRM & email marketing integrations",
        "Analytics & conversion tracking",
        "A/B testing & optimization",
        "Priority support & monthly strategy calls",
        "Unlimited design revisions",
        "Custom functionality development",
        "Social media integration"
      ],
      popular: true,
      cta: "Choose Operational",
      ideal: "Ideal for: Growing businesses, online stores, B2B companies"
    },
    {
      name: "Growth",
      price: "$1,200",
      priceRange: "+",
      period: "/month",
      description: "Enterprise-grade solution for businesses serious about digital dominance",
      features: [
        "Everything in Operational, plus:",
        "Enterprise-grade performance optimization",
        "Advanced conversion rate optimization",
        "Custom web applications",
        "Multi-site management",
        "Advanced integrations & automation",
        "Dedicated account manager",
        "Weekly strategy & optimization calls",
        "Priority development queue",
        "Advanced analytics & reporting",
        "24/7 monitoring & support"
      ],
      popular: false,
      cta: "Scale with Growth",
      ideal: "Ideal for: Established businesses, enterprises, high-traffic sites"
    }
  ]

  const handleCTAClick = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-slate-950 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Website-as-a-Service</span>
              <br />
              <span className="text-white">Built for Growth</span>
            </h2>
          </div>
          
          <div className="animate-on-scroll">
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Choose the plan that matches your ambition. Every plan includes ongoing optimization, 
              maintenance, and support. No hidden fees, no surprises.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`animate-on-scroll card relative ${
                service.popular 
                  ? 'border-electric-blue shadow-electric-blue/20 transform scale-105' 
                  : 'border-slate-700'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-electric-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-electric-blue">
                    {service.price}
                  </span>
                  {service.priceRange && (
                    <span className="text-2xl text-electric-blue">
                      {service.priceRange}
                    </span>
                  )}
                  <span className="text-slate-400 ml-1">
                    {service.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-emerald mr-3 mt-0.5 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className={`text-sm ${feature.includes('Everything in') ? 'text-electric-blue font-semibold' : 'text-slate-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-700 pt-6 mb-6">
                <p className="text-emerald text-sm font-medium text-center">
                  {service.ideal}
                </p>
              </div>

              <button
                onClick={handleCTAClick}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  service.popular
                    ? 'btn btn-primary'
                    : 'btn btn-secondary'
                }`}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="animate-on-scroll">
            <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                All Plans Include
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-emerald mb-2">🚀</div>
                  <p className="text-slate-300">99.9% Uptime Guarantee</p>
                </div>
                <div className="text-center">
                  <div className="text-emerald mb-2">⚡</div>
                  <p className="text-slate-300">PageSpeed Score 95+</p>
                </div>
                <div className="text-center">
                  <div className="text-emerald mb-2">🔒</div>
                  <p className="text-slate-300">Enterprise Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}