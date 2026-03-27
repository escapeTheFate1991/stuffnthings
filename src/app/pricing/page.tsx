'use client'

import { useState } from 'react'
import { Check, X, Crown, Zap, Star, ArrowRight } from 'lucide-react'
import { Header } from '@/components/ui/header-1'
import LMSFooter from '@/components/lms/LMSFooter'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const tiers = [
    {
      name: 'Basic',
      description: 'Perfect for getting started',
      monthlyPrice: 29,
      annualPrice: 21, // 29% discount
      features: [
        'Access to 200+ beginner courses',
        'Basic project templates',
        'Community forum access',
        'Email support',
        'Mobile app access',
        'Progress tracking'
      ],
      limitations: [
        'No advanced courses',
        'No certificates',
        'No 1-on-1 mentoring'
      ],
      popular: false,
      cta: 'Start Learning',
      gradient: 'from-slate-600 to-slate-700'
    },
    {
      name: 'Pro',
      description: 'Most popular for serious learners',
      monthlyPrice: 49,
      annualPrice: 35, // 29% discount
      features: [
        'Access to 500+ courses (all levels)',
        'Premium project templates',
        'Priority community support',
        'Live Q&A sessions',
        'Course certificates',
        'Offline downloads',
        'Advanced analytics'
      ],
      limitations: [
        'No 1-on-1 mentoring',
        'No enterprise features'
      ],
      popular: true,
      cta: 'Get Pro Access',
      gradient: 'from-violet-600 to-fuchsia-600'
    },
    {
      name: 'Premium',
      description: 'Everything you need to master tech',
      monthlyPrice: 99,
      annualPrice: 70, // 29% discount
      features: [
        'Access to 1000+ courses + bootcamps',
        'All certificates & credentials',
        '1-on-1 monthly mentoring call',
        'Priority email & chat support',
        'Custom learning paths',
        'Beta course access',
        'Career coaching',
        'Portfolio reviews'
      ],
      limitations: [],
      popular: false,
      cta: 'Go Premium',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      monthlyPrice: 199,
      annualPrice: 141, // 29% discount
      features: [
        'Everything in Premium',
        'Team management dashboard',
        'Custom branding',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Custom course creation',
        'API access',
        'Priority support',
        'Onboarding & training'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ]

  const handleGetStarted = async (tier: typeof tiers[0]) => {
    // For now, redirect to sign up - will implement Stripe checkout later
    window.location.href = '/auth/signup'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Choose Your</span>{' '}
              <span className="gradient-text">Learning Path</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
              Unlock your potential with courses designed by industry experts. 
              Start free, upgrade anytime.
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-violet-600' : 'bg-zinc-600'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                    isAnnual ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>
                Annual
              </span>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Save 29%
              </span>
            </div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
              {tiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`relative glass rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                    tier.popular ? 'ring-2 ring-violet-500 scale-105' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{tier.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                      </span>
                      <span className="text-zinc-400">/month</span>
                      {isAnnual && (
                        <div className="text-xs text-zinc-500 mt-1">
                          Billed annually (${tier.annualPrice * 12})
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{feature}</span>
                        </li>
                      ))}
                      {tier.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-3 text-sm">
                          <X className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleGetStarted(tier)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      tier.popular
                        ? 'btn-gradient'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-zinc-400 mb-6">
                Not sure which plan is right for you? Start with our free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/auth/signup'}
                  className="btn-gradient px-8 py-3 rounded-lg font-semibold"
                >
                  Start 7-Day Free Trial
                </button>
                <button 
                  onClick={() => window.location.href = '/auth/signin'}
                  className="px-8 py-3 rounded-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LMSFooter />
    </div>
  )
}