'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'

interface UserButtonProps {
  className?: string
}

export function UserButton({ className = '' }: UserButtonProps) {
  return (
    <div className={className}>
      <ClerkUserButton 
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
            userButtonPopoverCard: "bg-black border border-gray-800",
            userButtonPopoverActions: "text-white",
            userButtonPopoverActionButton: "text-white hover:bg-gray-800",
            userButtonPopoverActionButtonText: "text-white",
          }
        }}
      />
    </div>
  )
}