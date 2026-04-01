'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyPromptButtonProps {
  promptContent: string
  accentColor?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CopyPromptButton({ 
  promptContent, 
  accentColor = '#22d3ee', 
  size = 'md',
  className = ''
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 
        ${sizeClasses[size]}
        bg-white/[0.05] hover:bg-white/[0.1] 
        border-2 border-white/[0.1] hover:border-white/[0.2]
        rounded-xl font-semibold text-white 
        transition-all duration-300 
        hover:scale-105 hover:shadow-lg
        ${className}
      `}
      style={{ 
        borderColor: copied ? accentColor : undefined,
        backgroundColor: copied ? `${accentColor}20` : undefined
      }}
    >
      {copied ? (
        <>
          <Check className={`${iconSizeClasses[size]} text-green-400`} />
          Copied!
        </>
      ) : (
        <>
          <Copy className={iconSizeClasses[size]} />
          Copy Prompt
        </>
      )}
    </button>
  )
}