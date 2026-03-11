'use client'

const logos = [
  { name: 'Claude', color: '#d4a574', drift: 'animate-drift-1', pos: 'top-[8%] left-[8%]' },
  { name: 'GPT-4', color: '#74aa9c', drift: 'animate-drift-2', pos: 'top-[5%] right-[12%]' },
  { name: 'Gemini', color: '#4285f4', drift: 'animate-drift-3', pos: 'top-[45%] left-[3%]' },
  { name: 'Perplexity', color: '#20b8cd', drift: 'animate-drift-4', pos: 'top-[42%] right-[5%]' },
  { name: 'Grok', color: '#e8e8e8', drift: 'animate-drift-5', pos: 'bottom-[12%] left-[10%]' },
  { name: 'OpenClaw', color: '#f97316', drift: 'animate-drift-6', pos: 'bottom-[15%] right-[8%]' },
]

export default function FloatingLogos() {
  return (
    <div className="relative min-h-[420px] md:min-h-[480px] flex items-center justify-center">
      {/* Floating logo elements */}
      {logos.map((logo) => (
        <div
          key={logo.name}
          className={`absolute ${logo.pos} ${logo.drift} hidden md:block`}
        >
          <div
            className="px-4 py-2 rounded-xl backdrop-blur-sm border border-white/[0.08] bg-white/[0.03] shadow-lg"
            style={{ boxShadow: `0 0 20px ${logo.color}15` }}
          >
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: logo.color }}
            >
              {logo.name}
            </span>
          </div>
        </div>
      ))}

      {/* Center content */}
      <div className="text-center relative z-10 max-w-3xl mx-auto px-4">
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-display tracking-tight">
          Built on the world&apos;s{' '}
          <span className="gradient-text">most powerful AI</span>
        </h3>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Every site we build runs on enterprise-grade AI — from content generation
          to workflow automation to real-time monitoring.
        </p>

        {/* Mobile: show logos inline */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 md:hidden">
          {logos.map((logo) => (
            <span
              key={logo.name}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-white/[0.08] bg-white/[0.03]"
              style={{ color: logo.color }}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
