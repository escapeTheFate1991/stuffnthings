# 05 — Trust & Social Proof

## Why Trust Is the #1 Conversion Lever
Visitors don't convert because they **don't believe** the promise. Trust removes the psychological barrier to action. Every page needs trust signals above the fold AND adjacent to every CTA.

---

## The Trust Signal Hierarchy

Place in order of impact:
1. **Specific statistics** ("12,847 teams · $2.4M saved")
2. **Named testimonials** with photo/avatar + title + company
3. **Logo walls** ("trusted by" brands they recognize)
4. **Third-party ratings** (G2, Capterra, Google ★★★★★)
5. **Certifications/badges** (SOC 2, SSL, HIPAA, BBB, LEED)
6. **Media mentions** ("As seen in Forbes, TechCrunch")
7. **Guarantees** ("30-day money-back," "no questions asked")

---

## Testimonial Formula (The STAR Format)

```
Situation  → What was their problem before?
Task       → What did they need to solve it?
Action     → What did [product] do?
Result     → Specific, measurable outcome
```

**Example:**
> "Our team was juggling 5 different tools and still missing deadlines.
> We needed one place to manage everything. FlowSync gave us that.
> In 90 days our on-time delivery rate jumped from 64% to 91%."
> — **Marcus Webb**, VP Engineering @ Stackline

**Rules:**
- Full name + job title + company name = 3x more credible than first name only
- Photo avatar (even initials) beats no avatar
- Specific numbers beat vague praise ("transformed our business" is weak)
- "Verified Buyer / Verified Customer" tag adds credibility
- 3 testimonials minimum; 2-column grid works well

---

## Stat/Number Blocks

These work best in a horizontal strip directly below the hero or above the CTA:

```html
<div class="stats-strip">
  <div class="stat">
    <span class="stat-num" data-count="12847" data-suffix="+">12,847+</span>
    <span class="stat-label">Teams Onboarded</span>
  </div>
  <div class="stat">
    <span class="stat-num" data-count="98" data-suffix="%">98%</span>
    <span class="stat-label">Customer Satisfaction</span>
  </div>
  <div class="stat">
    <span class="stat-num" data-count="4.9">4.9</span>
    <span class="stat-label">Average Rating</span>
  </div>
</div>
```

**Stat credibility rules:**
- Odd numbers feel more real: "12,847" beats "13,000"
- Include units/context: "sq ft" not just "1.2M"
- Source data if possible ("G2 Spring 2025 report")
- Animate with counter JS (see 03-animations) for engagement

---

## Logo Walls

Show 5–8 logos of recognizable companies. Rules:
- All logos same height (~28px), grayscale at 40% opacity
- Label: "TRUSTED BY TEAMS AT" or "JOIN COMPANIES LIKE"
- If B2C: use press logos ("AS FEATURED IN") instead of client logos
- Arrange roughly by brand recognition left → right

```css
.logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  opacity: 0.4;
  filter: grayscale(1);
}
.logo-row img { height: 28px; object-fit: contain; }
```

---

## Guarantee Blocks

Place **directly below** primary CTA:

```html
<div class="guarantee">
  <span class="g-icon">🛡️</span>
  <div>
    <strong>30-Day Money-Back Guarantee</strong>
    <p>Not satisfied? Get a full refund — no questions, no hassle.</p>
  </div>
</div>
```

**Guarantee types by industry:**
- SaaS → "Free 14-day trial, cancel anytime, no credit card"
- E-commerce → "Free returns within 30 days"
- Daycare → "Free 2-week trial enrollment"
- Consulting → "Results or we work for free"
- Warehouse → "First month prorated, 30-day notice to exit"
- Hotel → "Best rate guarantee / free cancellation 48h"

---

## Trust Badges (Security & Certification)

```css
.trust-badges {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: var(--muted);
  font-weight: 600;
}
.badge::before { content: '✓'; color: var(--green); font-weight: 900; }
```

---

## Review Platform Integration

For real client sites, embed or link to:
- **Google Reviews** widget / star rating
- **G2 or Capterra** badge (SaaS)
- **TripAdvisor** (Hotel)
- **Yelp** (Local services, Daycare)
- **BBB Accredited** badge

Always show **aggregate rating + review count**: `★★★★★ 4.8 (312 reviews)`

---

## Anti-Trust Signals to Avoid
- ❌ Stock photos of "corporate" handshakes or generic teams
- ❌ Fake testimonials without names
- ❌ Outdated copyright years in footer
- ❌ Broken links or 404s anywhere on page
- ❌ "Award-winning" without naming the award
- ❌ Vague guarantees ("satisfaction guaranteed" with no terms)

