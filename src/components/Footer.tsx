export default function Footer() {
  const navItems = [
    { label: 'Why Us', href: '#problem' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Results', href: '#testimonials' },
    { label: 'Pricing', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative bg-black border-t border-slate-800/50 overflow-hidden">
      {/* Gradient glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-bold gradient-text mb-4 tracking-tight" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)' }}>stuffnthings</h3>
            <p className="text-slate-400 max-w-md leading-relaxed mb-3">
              We design, deploy, and manage intelligent automation systems -- so your team can focus on the work that actually drives growth.
            </p>
            <p className="text-slate-600 text-sm mb-6">
              Independent studio. Founding partners welcome.
            </p>
            <p className="text-slate-500 text-sm">All systems operational</p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-brand-cyan transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get Started</h4>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Free efficiency assessment -- full analysis delivered in 48 hours. No strings attached.
            </p>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl opacity-30 group-hover:opacity-60 blur-lg transition-opacity duration-700" />
              <a href="#contact" className="relative btn btn-primary text-sm !px-6 !py-3 inline-block">
                Get Free Audit →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Stuff N Things LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span className="text-slate-800">·</span>
            <a href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span className="text-slate-800">·</span>
            <a href="/deletion" className="hover:text-slate-400 transition-colors">Data Deletion</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
