'use client';

import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

interface NavigationProps {
  scrollY: number
}

export default function KimiNavigation({ scrollY }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsScrolled(scrollY > 50)
  }, [scrollY])

  const navItems = [
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Hire Us!', href: 'https://stuffnthings.io/ai-agency' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center group-hover:glow-primary transition-all">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">stuffnthings</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="/auth/signin" 
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a 
              href="/auth/signup" 
              className="btn-gradient text-sm px-5 py-2.5 rounded-full"
            >
              Free Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-[rgba(10,10,10,0.98)] backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="block text-lg font-medium text-zinc-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <a 
              href="/auth/signin" 
              className="block text-center text-lg font-medium text-zinc-300 hover:text-white transition-colors py-2"
            >
              Sign In
            </a>
            <a 
              href="/auth/signup" 
              className="block text-center btn-gradient text-lg px-5 py-3 rounded-full"
            >
              Free Trial
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}