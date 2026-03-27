'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import PricingTiers from '@/components/pricing/PricingTiers'
import { PRICING_TIERS } from '@/types/pricing'

// ============================================================================
// PRICING PAGE
// ============================================================================

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentTier, setCurrentTier] = useState<string>('free')

  // Get user's current subscription tier
  useEffect(() => {
    if (user) {
      // This would typically come from your database
      // For now, we'll assume free tier
      setCurrentTier('free')
    }
  }, [user])

  const handleSelectPlan = async (tier: string, billingCycle: 'monthly' | 'annual') => {
    if (!user) {
      // Redirect to sign up if not authenticated
      router.push('/sign-up?redirect=/pricing')
      return
    }

    setLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tier,
          billingCycle,
          returnUrl: window.location.origin + '/profile?success=true'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }

    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            Master GitHub.
            <span className="block text-blue-600">Transform Your Workflow.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            From basic commits to enterprise automation. Unlock progressive repository access, 
            join our community, and accelerate your GitHub mastery journey.
          </p>
        </motion.div>
      </div>

      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              📚
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Progressive Learning</h3>
            <p className="text-gray-600">
              Start with fundamentals and advance to enterprise-level automation. 
              Each tier unlocks new repositories and advanced concepts.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              🏗️
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-World Projects</h3>
            <p className="text-gray-600">
              Access production-ready code examples, business automation templates, 
              and integration patterns used by top companies.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
              👥
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Community</h3>
            <p className="text-gray-600">
              Join our Discord community for peer support, code reviews, 
              and direct access to GitHub automation experts.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pricing Tiers */}
      <PricingTiers 
        onSelectPlan={handleSelectPlan}
        currentTier={currentTier}
        loading={loading}
        className="pb-20"
      />

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Join Thousands of Developers Mastering GitHub
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              From startups to Fortune 500 companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-600">Lead DevOps Engineer</div>
                </div>
              </div>
              <p className="text-gray-700">
                "The business automation repository alone saved our team 20+ hours per week. 
                The GitHub Actions templates are production-ready."
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Marcus Johnson</div>
                  <div className="text-sm text-gray-600">Startup CTO</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Started as a complete GitHub beginner. Now I'm implementing enterprise-level 
                workflows. The progressive learning approach is perfect."
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Alex Rivera</div>
                  <div className="text-sm text-gray-600">Senior Developer</div>
                </div>
              </div>
              <p className="text-gray-700">
                "The Discord community is incredible. Getting code reviews from GitHub experts 
                has accelerated my learning beyond what I thought possible."
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Repository Access Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Progressive Repository Access
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Each tier unlocks new repositories with advanced GitHub patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{tier.displayName}</h3>
                <div className="space-y-2">
                  {tier.repositoryAccess.map((repo, repoIndex) => (
                    <div key={repo} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">{repo}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                How does progressive repository access work?
              </h3>
              <p className="text-gray-600">
                Each subscription tier unlocks access to specific GitHub repositories containing 
                real-world code examples and templates. Start with fundamentals and progress to 
                enterprise automation patterns as you advance through the tiers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What's included in the Discord community?
              </h3>
              <p className="text-gray-600">
                Our Discord community includes dedicated channels for each tier, weekly office hours 
                with GitHub experts, code review sessions, and peer networking opportunities. 
                Higher tiers get priority support and exclusive channels.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your access will continue until 
                the end of your current billing period. You'll keep any progress made and can 
                reactivate at any time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee for all plans. If you're not satisfied 
                within the first week, contact support for a full refund.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-blue-600 py-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Master GitHub?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of developers already transforming their workflow
          </p>
          <div className="mt-8">
            <button
              onClick={() => {
                document.querySelector('[data-pricing-cards]')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Choose Your Plan
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}