'use client'

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback()
        router.push('/')
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/signin')
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Completing sign in...</h2>
        <p className="text-zinc-400">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  )
}