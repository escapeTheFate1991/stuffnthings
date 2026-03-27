'use client'

import { useUser } from '@clerk/nextjs'
import { SignInButton } from './SignInButton'
import { SignUpButton } from './SignUpButton'
import { UserButton } from './UserButton'

interface AuthStatusProps {
  className?: string
  showSignUp?: boolean
}

export function AuthStatus({ className = '', showSignUp = true }: AuthStatusProps) {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <UserButton />
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <SignInButton variant="ghost" />
      {showSignUp && <SignUpButton />}
    </div>
  )
}