'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Crown, Calendar, CreditCard, Settings, ArrowUpRight } from 'lucide-react'
import { PRICING_TIERS, getTierByName } from '@/types/pricing'

// ============================================================================
// SUBSCRIPTION STATUS COMPONENT
// ============================================================================

interface SubscriptionStatusProps {
  className?: string
  showUpgradeButton?: boolean
  compact?: boolean
}

export default function SubscriptionStatus({ 
  className = '', 
  showUpgradeButton = true,
  compact = false 
}: SubscriptionStatusProps) {
  const { user } = useUser()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/stripe/portal', {
          method: 'GET'
        })

        if (response.ok) {
          const data = await response.json()
          setSubscription(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST'
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        alert('Unable to open billing portal. Please try again.')
      }
    } catch (error) {
      console.error('Error opening billing portal:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const handleUpgrade = () => {
    window.location.href = '/pricing'
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const currentTier = getTierByName(subscription?.tier || 'free')
  const isActive = subscription?.status === 'active'
  const expiresAt = subscription?.expiresAt ? new Date(subscription.expiresAt) : null

  if (compact) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2">
          {currentTier ? (
            <Crown className="w-4 h-4 text-yellow-500" />
          ) : (
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          )}
          <span className="text-sm font-medium">
            {currentTier?.displayName || 'Free'}
          </span>
        </div>
        
        {showUpgradeButton && (!currentTier || currentTier.id !== 'premium') && (
          <button
            onClick={handleUpgrade}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Upgrade
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {currentTier ? (
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-400 rounded-full" />
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-gray-900">
              {currentTier?.displayName || 'Free Tier'}
            </h3>
            <p className="text-sm text-gray-600">
              {isActive ? 'Active Subscription' : 'Free Plan'}
            </p>
          </div>
        </div>

        {isActive && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )}
      </div>

      {/* Subscription Details */}
      {currentTier && subscription && (
        <div className="space-y-3">
          {/* Current Plan Features */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Current Access:</h4>
            <div className="flex flex-wrap gap-2">
              {currentTier.repositoryAccess.map((repo) => (
                <span 
                  key={repo}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {repo}
                </span>
              ))}
            </div>
          </div>

          {/* Expiration */}
          {expiresAt && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Renews {expiresAt.toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6">
        {isActive ? (
          <button
            onClick={handleManageSubscription}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Billing
          </button>
        ) : (
          showUpgradeButton && (
            <button
              onClick={handleUpgrade}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upgrade Plan
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </button>
          )
        )}

        {currentTier && currentTier.id !== 'premium' && showUpgradeButton && (
          <button
            onClick={handleUpgrade}
            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade
          </button>
        )}
      </div>

      {/* Free Tier CTA */}
      {!currentTier && (
        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-2">Ready to unlock more?</h4>
          <p className="text-sm text-gray-600 mb-3">
            Access advanced GitHub workflows, business automation, and join our community.
          </p>
          <button
            onClick={handleUpgrade}
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Plans
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ============================================================================
// REPOSITORY ACCESS DISPLAY
// ============================================================================

interface RepositoryAccessProps {
  userTier?: string
  className?: string
}

export function RepositoryAccess({ userTier = 'free', className = '' }: RepositoryAccessProps) {
  const currentTier = getTierByName(userTier)

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h4 className="font-medium text-gray-900 mb-3">Your Repository Access</h4>
      
      {currentTier ? (
        <div className="space-y-2">
          {currentTier.repositoryAccess.map((repo, index) => (
            <motion.div
              key={repo}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">{repo}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Crown className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-3">No repository access yet</p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Upgrade to unlock repositories
          </button>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// BILLING CYCLE BADGE
// ============================================================================

interface BillingCycleBadgeProps {
  billingCycle?: 'monthly' | 'annual'
  className?: string
}

export function BillingCycleBadge({ billingCycle, className = '' }: BillingCycleBadgeProps) {
  if (!billingCycle) return null

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      billingCycle === 'annual' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800'
    } ${className}`}>
      {billingCycle === 'annual' ? '💰 Annual' : '📅 Monthly'}
    </span>
  )
}