'use client'

import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs'
import { UserPlus } from 'lucide-react'

interface SignUpButtonProps {
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  children?: React.ReactNode
}

export function SignUpButton({ className = '', variant = 'default', children }: SignUpButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700 px-4 py-2',
    ghost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2'
  }

  return (
    <ClerkSignUpButton mode="modal">
      <button className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children || (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </>
        )}
      </button>
    </ClerkSignUpButton>
  )
}