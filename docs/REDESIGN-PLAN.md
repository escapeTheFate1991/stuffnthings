# Stuff N Things — Website Redesign Plan
## From Generic AI Agency → Production AI Operations Platform

**Date:** 2026-03-19
**Status:** DRAFT — Awaiting Eddy's approval before execution

---

## Strategic Context

### The Problem (from Nadia's LinkedIn article)
The AI automation agency model as currently promoted is broken:
- Small budgets ($2K and under) lead to mispriced complexity
- One-off project work is unsustainable — the real model is **managed services**
- Clients come with broken processes and expect AI to fix them
- One person can't do sales + architecture + implementation + support
- Estimation is nearly impossible due to AI unpredictability

### Our Position
We're not selling one-off automations. We're selling **managed AI operations** — ongoing retainers where we own the full stack (deploy, monitor, optimize, upgrade). This is the model that actually works per Nadia's analysis.

### Brand Architecture
- **Stuff N Things** = The agency (the company, the team, the service provider)
- **ALEC** (Artificial Learning Execution Client) = The product/platform (War Room going to market). ALEC is what we deploy into client businesses.

### Reference Sites & What to Steal
| Site | Pattern to Steal |
|---|---|
| **AgentOps** | Dark, developer-credible aesthetic. "Trace, Debug, Deploy" — action verbs. SDK-first feel. |
| **RelevanceAI** | Enterprise trust signals (SOC2, GDPR, SSO, RBAC). Trust center. Version control. Monitoring dashboards. |
| **Agency.inc (Kai)** | "Old Way vs Kai Way" comparison format. Single autonomous agent that replaces workflows, not assists. Named product (Kai = their agent, ALEC = ours). |
| **21st.dev** | Modern hero patterns, 3D elements, widget designs, glass morphism, creative layouts |

---

## Current Section Audit

### Current Page Order (page.tsx)
```
Navigation
Hero                    → KEEP (already reverted to good version)
AIAutomation            → REWORK (OpenClaw features — good content, needs design refresh)
Problem                 → REWORK (rename to Opportunity, already has good copy)
HowItWorks             → DELETE (3 generic steps — doesn't differentiate us)
SocialProof            → REWORK (metrics + testimonials — fix web dev language)
Results                → MERGE into SocialProof (duplicate metrics section)
Services               → REWORK (already updated to AI services — needs design pass)
UseCases               → KEEP (6 use cases — strong)
Integrations           → KEEP (already good)
Differentiation        → KEEP (comparison table — strong)
BlogTeaser             → REWORK (fix titles, add real value)
ContactForm            → KEEP (fix field label + CTA text)
Footer                 → FIX (tagline + metrics)
```

### Components NOT in page.tsx (orphaned)
- `Portfolio.tsx` (519 lines) — Old web dev portfolio. **DELETE.**
- `Industries.tsx` (252 lines) — May be useful. Review content.
- `FloatingLogos.tsx` (150 lines) — Decorative. Keep if used by other components.
- `AnimatedStreaks.tsx` (11 lines) — Decorative. Keep.

---

## New Page Structure

### Proposed Section Order

```
1. Navigation           — Fix "Get Free Audit" → "Get Free Assessment"
2. Hero                 — KEEP as-is (Run Your Business. Let AI Handle)
3. Problem/Opportunity  — REWORK: "Old Way vs ALEC Way" (Agency.inc pattern)
4. ALEC Introduction    — NEW: Introduce ALEC as the product. Named agent, not generic.
5. UseCases             — KEEP: 6 use cases (rename to "What ALEC Does")
6. SocialProof+Results  — MERGE: One section with real metrics + testimonials (scrub web dev)
7. Integrations         — KEEP as-is
8. Differentiation      — KEEP: Comparison table (add ALEC branding)
9. Services/Pricing     — REWORK: Managed service tiers, not generic services list
10. BlogTeaser          — REWORK: Fix titles, real AI ops content
11. ContactForm         — FIX: Field label + CTA
12. Footer              — FIX: Tagline, metrics, CTA
```

### Sections to DELETE
- **HowItWorks** — Generic 3-step process. Every agency site has this. It adds no differentiation. The "Old Way vs ALEC Way" comparison is more powerful.
- **Portfolio** — Web dev showcase. Already orphaned from page.tsx.
- **Industries** — Review, but likely too generic. If we keep it, rebrand as "Industries We Serve" with AI-specific language.

### Sections to CREATE
- **ALEC Introduction** — The "Meet ALEC" moment. This is where we name the product and show what makes it different from generic AI chatbots. Think Agency.inc's "Introducing Kai" section. Show ALEC as an autonomous operations agent, not an assistant.

---

## Section-by-Section Plan

### 1. Navigation
- "Get Free Audit" → "Get Free Assessment"
- Consider: Add "Meet ALEC" as a nav item
- Keep dark, clean aesthetic

### 2. Hero (KEEP)
Already good: "Run Your Business. Let AI Handle the Rest."
- Minor: Make sure trust bar says AI/OpenClaw, not web dev
- Consider: Add subtle 3D element or animated widget (21st.dev inspiration) — but don't overdo it, the particle canvas is already nice

### 3. Problem → "Old Way vs ALEC Way" (REWORK)
**Kill the current "Your Team Is Capable of More" framing.**
Replace with Agency.inc's comparison pattern:

| Old Way | With ALEC |
|---|---|
| Hire a $17K/mo ops team | Deploy ALEC in 48 hours |
| 45-min response times | 2-min response times |
| Manual CRM updates | Automatic pipeline management |
| 40hrs/week of admin | Redirected to strategy |
| Data lives in 6 different tools | One intelligence layer |

This is more visceral and immediately communicates value. Two columns, animated transitions, dark aesthetic.

### 4. ALEC Introduction (NEW)
The anchor section. This is the "what" and "why."

**Headline:** "Meet ALEC."
**Subhead:** "Your Artificial Learning Execution Client. Not an assistant — an operator."

Key points (cards or animated reveals):
- **Autonomous Execution** — ALEC doesn't wait for instructions. It monitors, decides, and acts.
- **Institutional Memory** — Learns your business rules, brand voice, customer history. Retains context across every interaction.
- **Multi-Channel Presence** — Lives in your email, Slack, WhatsApp, CRM — wherever your business communicates.
- **Security-First** — Self-hosted option. Your data never leaves your infrastructure. Private skills repo.
- **Continuous Learning** — Gets smarter every week. We optimize agent logic based on real performance data.

Design: Dark background, glowing accent elements, maybe a 3D orb or agent visualization. Think AgentOps aesthetic but warmer.

### 5. Use Cases (KEEP, rebrand)
**Rename:** "What ALEC Does" or "ALEC at Work"
The 6 use cases are strong. Keep them. Minor copy tweaks to reference ALEC instead of generic "AI agents."

### 6. Social Proof + Results (MERGE)
Combine SocialProof + Results into one section.

**Metrics (scrub all web dev):**
- < 2 min average response time
- 60-80% routine inquiries automated
- $2,400 avg monthly savings
- 48 hrs assessment to roadmap

**Testimonials (scrub web dev language):**
- "Now our AI agent handles it and I actually get to do my job."
- "Within a month of deploying our agents, the pipeline started filling itself."

**Design:** Counter animations, dark cards, maybe video testimonials later.

### 7. Integrations (KEEP)
Already strong. 7 categories, MCP messaging. No changes needed.

### 8. Differentiation (KEEP, add ALEC)
Comparison table is effective. Add ALEC column header instead of just "Stuff N Things."
"ChatGPT / Claude / Gemini" vs "ALEC by Stuff N Things"

### 9. Services → Pricing/Managed Services (REWORK)
Kill the generic services grid. Replace with pricing tiers that emphasize **managed service** (the model that works per Nadia's article).

Tiers (already defined):
- **Foundation** $499/mo — 1 ALEC agent, support automation, CRM integration, weekly reports
- **Growth** $999-1,499/mo — Up to 3 ALEC agents, lead qualification, multi-app workflows, monthly strategy calls
- **Enterprise** Custom — Unlimited agents, custom integrations, dedicated engineer, 24/7 monitoring

Emphasize: "This is managed. We don't hand you a tool and walk away."

### 10. Blog (REWORK)
Fix titles:
- "How AI Agents Are Replacing $17K/Month Operations Teams"
- "5 AI Automations Every Growing Business Should Deploy First"
- "The Hidden Cost of Manual Processes (And How to Measure It)"

### 11. Contact Form (FIX)
- "Current Website URL" → "Company Website or LinkedIn"
- "Get Free Audit" → "Get Free Assessment"

### 12. Footer (FIX)
- Tagline: "We design, deploy, and manage intelligent automation systems -- so your team can focus on the work that actually drives growth."
- Metrics: Agent response time, automation rate, uptime SLA, assessment turnaround
- CTA: "Free efficiency assessment"

---

## Design Direction

### Aesthetic
- **Dark-first** (already is — keep it)
- **Accent:** Keep cyan/brand-cyan gradient
- **Typography:** Current display font is good. Consider upgrading body font for more character.
- **3D Elements:** Add a subtle 3D orb or agent visualization in the ALEC Introduction section. Can use Three.js or CSS 3D transforms. Don't overdo it — one hero 3D element is enough.
- **Motion:** Current scroll reveals are solid. Add staggered card animations for use cases and integrations.
- **Glass morphism:** Use sparingly for cards (backdrop-blur, subtle borders)

### What NOT to do
- Don't make it look like every other Tailwind/Vercel template
- Don't use Inter, Roboto, or system fonts for display
- Don't use purple gradients
- Don't add too many 3D elements — one showpiece, rest is clean

---

## Execution Plan

### Track 1: Content & Copy (Sub-agent, Sonnet)
- Rewrite Problem → Old Way vs ALEC Way
- Create ALEC Introduction section
- Rebrand UseCases to reference ALEC
- Merge SocialProof + Results
- Fix all remaining web dev language (global sweep)
- Fix Navigation, ContactForm, Footer
- Delete HowItWorks from page.tsx
- Update page.tsx section order

### Track 2: Design & 3D (Sub-agent, Sonnet)
- ALEC Introduction section with 3D orb/visualization
- Refresh card designs with glass morphism
- Add staggered animation to use case and integration cards
- Review overall flow and spacing
- Ensure dark aesthetic consistency

### Track 3: Build Verification
- `npm run build` passes
- No smart quotes
- Push to main
- Verify on stuffnthings.io

---

## Decisions (Confirmed by Eddy)

1. **ALEC is the product.** Stuff N Things is the lab/agency. ALEC is front and center.
2. **Keep pricing visible.**
3. **Use ALEC** (not Alex) everywhere on the site.
4. **Kill Industries section.** Use cases cover multiple industries — no need for a separate section.
5. **UseCases cards need design work.** The AI Operations Assistant card specifically has font size/capitalization inconsistency and doesn't flow with the rest of the section. All use case cards need visual consistency — same card format, same typography hierarchy, integrated into the design system.

---

*Once approved, I'll delegate Track 1 and Track 2 to sub-agents simultaneously.*
