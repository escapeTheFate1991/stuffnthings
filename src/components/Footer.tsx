export default function Footer() {
  const navItems = [
    { label: 'Problem', href: '#problem' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Results', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-bold gradient-text mb-4 tracking-tight">stuffnthings</h3>
            <p className="text-slate-400 max-w-md leading-relaxed mb-3">
              High-Performance Digital Presence. Zero Technical Friction.
              We build, optimize, and maintain your entire digital presence so you can focus on growth.
            </p>
            <p className="text-slate-600 text-sm mb-6">
              Built by Eddy — independent studio, founding clients welcome.
            </p>
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              All systems operational
            </div>
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
              Free friction audit — complete website analysis delivered in 48 hours. No strings attached.
            </p>
            <a href="#contact" className="btn btn-primary text-sm !px-6 !py-3 inline-block">
              Get Free Audit →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Stuff N Things. All rights reserved.
          </p>
          <p className="text-sm text-slate-700">
            Crafted with care · 95+ Lighthouse guaranteed
          </p>
        </div>
      </div>
    </footer>
  )
}