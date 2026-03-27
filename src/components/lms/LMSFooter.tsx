'use client'

import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function LMSFooter() {
  const footerLinks = {
    'Courses': [
      'Web Development',
      'Mobile Development',
      'Data Science',
      'AI & Machine Learning',
      'Cybersecurity',
      'Cloud Computing'
    ],
    'Resources': [
      'Documentation',
      'Tutorials',
      'Community Forum',
      'Blog',
      'Webinars',
      'Career Center'
    ],
    'Company': [
      'About Us',
      'Our Story',
      'Careers',
      'Press Kit',
      'Contact Us',
      'Partner With Us'
    ],
    'Support': [
      'Help Center',
      'Student Success',
      'Technical Support',
      'Refund Policy',
      'Terms of Service',
      'Privacy Policy'
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ]

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">stuffnthings</h3>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
              Empowering the next generation of tech professionals through hands-on learning 
              and real-world projects.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Agency CTA Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Custom Development?
            </h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Our AI-powered agency builds high-performance websites, mobile apps, and digital solutions. 
              Get expert development services for your business.
            </p>
            <a
              href="https://stuffnthings.io/ai-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Hire Our Agency
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © 2026 stuffnthings. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}