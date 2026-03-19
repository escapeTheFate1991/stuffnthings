'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'
import FloatingLogos from './FloatingLogos'
import AnimatedStreaks from './AnimatedStreaks'

/* ── Animated Stat -- no icon boxes, just big numbers ── */
function Stat({ end, suffix, label, prefix }: { end: number; suffix: string; label: string; prefix?: string }) {
  const { ref, value } = useCountUp(end, 2200)
  return (
    <div ref={ref} className="text-center cursor-default">
      <div className="text-4xl md:text-5xl font-black gradient-text mb-1" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(168, 85, 247, 0.15)' }}>
        {prefix || ''}{value}{suffix}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  )
}

const standards = [
  {
    icon: (
      <svg className="w-9 h-9 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Always-On Operations. Zero Busywork.',
    commitment:
      "ALEC deployments are engineered for real business processes -- qualifying leads, triaging support tickets, and keeping your pipeline moving while your team focuses on higher-leverage work.",
    proof: 'Included: Custom ALEC Agents · Lead Qualification · Workflow Automation · Performance Dashboards',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    icon: (
      <svg className="w-9 h-9 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'ALEC That Does Real Work.',
    commitment:
      "We don't just hand you a login and wish you luck. ALEC automates your workflows, qualifies your leads, and monitors your performance -- so things keep moving even when you're not looking.",
    proof: 'Included: ALEC Workflows · Lead Capture · Performance Monitoring',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    icon: (
      <svg className="w-9 h-9 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'Built to Integrate, Not Disrupt.',
    commitment:
      "Your team already has tools they rely on -- CRMs, calendars, email, messaging platforms. We don't ask anyone to learn new software. ALEC plugs directly into the systems your team already uses, working alongside them, not in front of them.",
    proof: 'Supported: Slack · WhatsApp · Telegram · Google Workspace · CRM Integrations · Custom APIs',
    gradient: 'from-brand-green to-emerald-400',
  },
]

const stats = [
  { end: 2, suffix: ' min', label: 'avg response', prefix: '< ' },
  { end: 78, suffix: '%', label: 'routine tasks automated' },
  { end: 2400, suffix: '/mo', label: 'avg savings', prefix: '$' },
  { end: 15, suffix: ' min', label: 'deploy time' },
]

export default function SocialProof() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden">
      {/* ── Part 1: Floating Logo Cloud ── */}
      <div className="py-16 md:py-28 lg:py-36 relative bg-black">
        {/* Edge glow lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

        <AnimatedStreaks opacity={0.12} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <FloatingLogos />
          </div>
        </div>
      </div>

      {/* ── Part 2: Stats + Standards ── */}
      <div className="py-16 md:py-28 lg:py-36 relative bg-black">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

        {/* Aurora orbs */}
        <div className="absolute top-[5%] right-[-8%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.07] blur-[130px] animate-aurora-1" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px] animate-aurora-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="reveal">
              <h2 className="section-heading mb-6">
                <span className="gradient-text">Measured.</span>
                <br />
                <span className="text-white">Reported. Verified.</span>
              </h2>
            </div>
            <div className="reveal stagger-1">
              <p className="section-subtext">
                Your ALEC dashboard shows agent activity, cost-per-action, and ROI in real time. No black boxes.
              </p>
            </div>
          </div>

          {/* Stats -- clean, no icon boxes */}
          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((s, i) => (
              <div key={i} className={`stagger-${i + 1}`}>
                <Stat {...s} />
              </div>
            ))}
          </div>

          {/* Build Standards -- open layout, no cards */}
          <div className="grid md:grid-cols-3 gap-12">
            {standards.map((s, i) => {
              const revealClass = i === 0 ? 'reveal-slide-left' : i === 2 ? 'reveal-slide-right' : 'reveal'
              return (
                <div key={i} className={`${revealClass} stagger-${i + 1}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">{s.icon}</div>
                    <h4 className={`text-xl font-bold font-display bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                      {s.title}
                    </h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">{s.commitment}</p>
                  <p className="text-brand-green font-semibold text-sm font-mono">{s.proof}</p>
                  {i < standards.length - 1 && (
                    <div className="gradient-divider mt-8 md:hidden" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Part 3: Testimonials ── */}
      <div className="py-16 md:py-28 lg:py-36 relative bg-black">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />
        
        {/* Aurora orbs */}
        <div className="absolute top-[10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-brand-green/[0.07] blur-[130px] animate-aurora-1" />
        <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.06] blur-[120px] animate-aurora-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="reveal">
              <h2 className="section-heading mb-6">
                <span className="gradient-text">Real Results.</span>
                <br />
                <span className="text-white">Real Stories.</span>
              </h2>
            </div>
            <div className="reveal stagger-1">
              <p className="section-subtext">
                These are averages across our client base. Not cherry-picked.
                Not theoretical. Just what happens when you deploy ALEC right.
              </p>
            </div>
          </div>

          {/* Testimonials -- stacked, full-width, large quote */}
          <div className="space-y-16 max-w-4xl mx-auto">
            <div className="reveal-slide-left stagger-1">
              {/* Gradient line above */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent mb-10" />

              <div className="text-center">
                <p className="text-white text-2xl md:text-3xl leading-relaxed italic font-light">
                  "Now our AI agent handles it and I actually get to do my job."
                </p>
                <div className="mt-6">
                  <div className="text-white font-semibold">Sarah</div>
                  <div className="text-slate-500 text-sm">Bright Smile Dental</div>
                </div>
              </div>

              {/* Gradient line below */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent mt-10" />
            </div>

            <div className="reveal-slide-right stagger-2">
              {/* Gradient line above */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent mb-10" />

              <div className="text-center">
                <p className="text-white text-2xl md:text-3xl leading-relaxed italic font-light">
                  "Within a month of deploying our agents, the pipeline started filling itself."
                </p>
                <div className="mt-6">
                  <div className="text-white font-semibold">James</div>
                  <div className="text-slate-500 text-sm">Summit Contractors</div>
                </div>
              </div>

              {/* Gradient line below */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-coral/30 to-transparent mt-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
