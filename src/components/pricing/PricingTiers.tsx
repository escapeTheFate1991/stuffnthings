'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Shield, Users, Clock, ArrowRight } from 'lucide-react'
import PricingToggle from './PricingToggle'
import { PRICING_TIERS, type PricingTier } from '../../types/pricing'

// ============================================================================
// MAIN PRICING TIERS COMPONENT
// ============================================================================

interface PricingTiersProps {
  onSelectPlan?: (tier: string, billingCycle: 'monthly' | 'annual') => void
  currentTier?: string
  loading?: boolean
  className?: string
}

export default function PricingTiers({ 
  onSelectPlan,
  currentTier,
  loading = false,
  className = ''
}: PricingTiersProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelectPlan = (tierName: string) => {
    if (onSelectPlan) {
      onSelectPlan(tierName, billingCycle)
    }
  }

  if (!mounted) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Choose Your AI Automation Journey
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From AI fundamentals to full-spectrum transformation. Unlock progressive repository access and join our community.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PricingToggle 
              billingCycle={billingCycle}
              onToggle={setBillingCycle}
              annualDiscount={29}
              className="mb-8"
            />
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard 
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              onSelect={() => handleSelectPlan(tier.name)}
              isCurrentTier={currentTier === tier.name}
              loading={loading}
              animationDelay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturesComparison billingCycle={billingCycle} />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <PricingFAQ />
        </motion.div>
      </div>
    </div>
  )
}

// ============================================================================
// PRICING CARD COMPONENT
// ============================================================================

interface PricingCardProps {
  tier: PricingTier
  billingCycle: 'monthly' | 'annual'
  onSelect: () => void
  isCurrentTier?: boolean
  loading?: boolean
  animationDelay?: number
}

function PricingCard({ 
  tier, 
  billingCycle, 
  onSelect, 
  isCurrentTier = false,
  loading = false,
  animationDelay = 0 
}: PricingCardProps) {
  const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice
  const originalPrice = billingCycle === 'annual' ? tier.monthlyPrice : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`relative rounded-2xl ${
        tier.popular 
          ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
          : 'ring-1 ring-gray-200 shadow-lg'
      } ${isCurrentTier ? 'ring-green-500' : ''} bg-white`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </span>
        </div>
      )}

      {/* Current Tier Badge */}
      {isCurrentTier && (
        <div className="absolute -top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
            <Check className="w-4 h-4 mr-1" />
            Current Plan
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">{tier.displayName}</h3>
          <p className="mt-2 text-gray-600">{tier.description}</p>
          
          {/* Pricing */}
          <div className="mt-6">
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-gray-900">${price}</span>
              <span className="ml-2 text-xl text-gray-500">/month</span>
            </div>
            
            {billingCycle === 'annual' && originalPrice && (
              <div className="mt-2">
                <span className="text-lg text-gray-500 line-through">${originalPrice}/mo</span>
                <span className="ml-2 text-green-600 font-semibold">Save 29%</span>
              </div>
            )}
            
            {billingCycle === 'annual' && (
              <p className="text-sm text-gray-500 mt-1">
                Billed annually (${(price * 12).toLocaleString()}/year)
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="mt-8 space-y-4">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: animationDelay + index * 0.05 }}
              className="flex items-start"
            >
              <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Repository Access */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Repository Access:</h4>
          <div className="flex flex-wrap gap-2">
            {tier.repositoryAccess.map((repo) => (
              <span 
                key={repo}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {repo}
              </span>
            ))}
          </div>
        </div>

        {/* Special Features */}
        {tier.supportHours && (
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {tier.supportHours} hours monthly video support
          </div>
        )}

        {tier.community && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            Discord community access
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={onSelect}
          disabled={loading || isCurrentTier}
          className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            tier.popular
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
              : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-200'
          } ${
            isCurrentTier 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : ''
          } ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          } disabled:hover:transform-none flex items-center justify-center group`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isCurrentTier ? (
            'Current Plan'
          ) : (
            <>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

// ============================================================================
// FEATURES COMPARISON TABLE
// ============================================================================

function FeaturesComparison({ billingCycle }: { billingCycle: 'monthly' | 'annual' }) {
  const features = [
    {
      name: 'AI Fundamentals Course',
      spark: true,
      synapse: true,
      cortex: true,
      singularity: true
    },
    {
      name: 'Community Discord Access',
      spark: true,
      synapse: true,
      cortex: true,
      singularity: true
    },
    {
      name: 'Advanced AI Workflows Course',
      spark: false,
      synapse: true,
      cortex: true,
      singularity: true
    },
    {
      name: 'Business Automation Course',
      spark: false,
      synapse: false,
      cortex: true,
      singularity: true
    },
    {
      name: 'Enterprise Integration Library',
      spark: false,
      synapse: false,
      cortex: false,
      singularity: true
    },
    {
      name: 'Monthly Video Support',
      spark: false,
      synapse: false,
      cortex: false,
      singularity: '8 hours'
    },
    {
      name: 'Priority Support',
      spark: false,
      synapse: true,
      cortex: true,
      singularity: 'Urgent'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Feature Comparison</h3>
        <p className="text-gray-600 mt-1">See what's included in each tier</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
              {PRICING_TIERS.map((tier) => (
                <th key={tier.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <div>
                    <div>{tier.displayName}</div>
                    <div className="text-lg font-bold">
                      ${billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}/mo
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {feature.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.spark === true ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : feature.spark === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="text-sm text-blue-600 font-medium">{feature.spark}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.synapse === true ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : feature.synapse === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="text-sm text-blue-600 font-medium">{feature.synapse}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.cortex === true ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : feature.cortex === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="text-sm text-blue-600 font-medium">{feature.cortex}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.singularity === true ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : feature.singularity === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="text-sm text-blue-600 font-medium">{feature.singularity}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================================
// PRICING FAQ
// ============================================================================

function PricingFAQ() {
  const faqs = [
    {
      question: "What's included with repository access?",
      answer: "Each tier unlocks specific GitHub repositories containing real-world AI automation code examples, templates, and projects. Higher tiers include more advanced business automation and enterprise integration patterns."
    },
    {
      question: "Can I switch between monthly and annual billing?",
      answer: "Yes! You can change your billing cycle at any time. Annual billing gives you a 29% discount compared to monthly pricing."
    },
    {
      question: "What happens to my progress if I downgrade?",
      answer: "Your progress is always saved. If you downgrade, you'll keep access to completed courses but won't be able to start new courses outside your tier until you upgrade again."
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 7-day free trial for any paid tier. Cancel anytime during the trial for a full refund."
    },
    {
      question: "What's included in video support for Singularity?",
      answer: "Singularity members get 8 hours of monthly 1-on-1 video consultation for custom AI workflows, enterprise setup, and troubleshooting complex automation challenges."
    }
  ]

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Frequently Asked Questions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}