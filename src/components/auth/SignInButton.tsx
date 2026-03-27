'use client'

import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'

interface SignInButtonProps {
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  children?: React.ReactNode
}

export function SignInButton({ className = '', variant = 'default', children }: SignInButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2',
    ghost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2'
  }

  return (
    <ClerkSignInButton mode="modal">
      <button className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children || (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </>
        )}
      </button>
    </ClerkSignInButton>
  )
}