'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ============================================================================
// PRICING TOGGLE COMPONENT
// ============================================================================

interface PricingToggleProps {
  billingCycle: 'monthly' | 'annual'
  onToggle: (cycle: 'monthly' | 'annual') => void
  annualDiscount?: number
  className?: string
}

export default function PricingToggle({ 
  billingCycle, 
  onToggle, 
  annualDiscount = 29,
  className = '' 
}: PricingToggleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center space-x-6 ${className}`}>
        <div className="h-10 w-48 bg-gray-100 rounded-full animate-pulse" />
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center space-x-6 ${className}`}>
      <span 
        className={`text-lg font-medium transition-colors duration-200 ${
          billingCycle === 'monthly' 
            ? 'text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Monthly
      </span>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => onToggle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            billingCycle === 'annual' 
              ? 'bg-blue-600' 
              : 'bg-gray-300'
          }`}
          aria-pressed={billingCycle === 'annual'}
          aria-label={`Switch to ${billingCycle === 'monthly' ? 'annual' : 'monthly'} billing`}
        >
          <motion.span
            className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
            animate={{
              x: billingCycle === 'annual' ? 32 : 4
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <span 
          className={`text-lg font-medium transition-colors duration-200 ${
            billingCycle === 'annual' 
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Annual
        </span>
        
        {annualDiscount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            className="relative"
          >
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Save {annualDiscount}%
            </span>
            
            {/* Pulse animation when annual is selected */}
            {billingCycle === 'annual' && (
              <motion.div
                className="absolute inset-0 rounded-full bg-green-200"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// BILLING CYCLE INDICATOR
// ============================================================================

interface BillingCycleIndicatorProps {
  billingCycle: 'monthly' | 'annual'
  annualSavings?: number
  className?: string
}

export function BillingCycleIndicator({ 
  billingCycle, 
  annualSavings,
  className = '' 
}: BillingCycleIndicatorProps) {
  return (
    <div className={`text-center space-y-2 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900">
        {billingCycle === 'monthly' ? 'Monthly Billing' : 'Annual Billing'}
      </h3>
      
      {billingCycle === 'annual' && annualSavings && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-green-600 font-semibold"
        >
          💰 You&apos;re saving ${annualSavings.toLocaleString()} per year!
        </motion.p>
      )}
      
      <p className="text-gray-600 max-w-lg mx-auto">
        {billingCycle === 'monthly' 
          ? 'Pay monthly with the flexibility to cancel anytime. Perfect for trying out our courses.'
          : 'Get the best value with our annual plan. Save money while committing to your GitHub mastery journey.'
        }
      </p>
    </div>
  )
}

// ============================================================================
// COMPACT PRICING TOGGLE
// ============================================================================

interface CompactPricingToggleProps {
  billingCycle: 'monthly' | 'annual'
  onToggle: (cycle: 'monthly' | 'annual') => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal'
}

export function CompactPricingToggle({ 
  billingCycle, 
  onToggle,
  size = 'md',
  variant = 'default'
}: CompactPricingToggleProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const toggleSizes = {
    sm: 'h-5 w-10',
    md: 'h-6 w-12', 
    lg: 'h-8 w-16'
  }

  const switchSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle('monthly')}
          className={`${sizeClasses[size]} font-medium transition-colors ${
            billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Monthly
        </button>
        
        <button
          onClick={() => onToggle('annual')}
          className={`${sizeClasses[size]} font-medium transition-colors ${
            billingCycle === 'annual' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Annual
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <span className={`${sizeClasses[size]} font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
        Monthly
      </span>
      
      <button
        onClick={() => onToggle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
        className={`relative inline-flex ${toggleSizes[size]} items-center rounded-full transition-colors ${
          billingCycle === 'annual' ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <motion.span
          className={`inline-block ${switchSizes[size]} transform rounded-full bg-white shadow-lg`}
          animate={{
            x: billingCycle === 'annual' ? (size === 'sm' ? 20 : size === 'md' ? 24 : 32) : 2
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      <span className={`${sizeClasses[size]} font-medium ${billingCycle === 'annual' ? 'text-blue-600' : 'text-gray-500'}`}>
        Annual
      </span>
    </div>
  )
}