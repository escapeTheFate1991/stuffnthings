'use client'

import { useState, useEffect, useMemo } from 'react'
import { useActiveSection } from '@/lib/hooks'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sectionIds = useMemo(
    () => ['hero', 'problem', 'services', 'portfolio', 'how-it-works', 'testimonials', 'contact'],
    []
  )
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#problem', label: 'Problem' },
    { href: '#how-it-works', label: 'Process' },
    { href: '#testimonials', label: 'Results' },
    { href: '#services', label: 'Pricing' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick('#hero')
              }}
              className="text-2xl font-bold gradient-text tracking-tight hover:opacity-80 transition-opacity"
            >
              stuffnthings
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full" />
                    )}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick('#contact')
                }}
                className="btn btn-primary text-sm !px-6 !py-2.5 ml-4"
              >
                Get Free Audit
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 glass rounded-2xl mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <div className="pt-2 px-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick('#contact')
                }}
                className="btn btn-primary w-full text-center !py-3"
              >
                Get Free Audit
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}