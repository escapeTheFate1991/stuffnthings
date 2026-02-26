# 06 — Above-the-Fold Checklist

## Universal First Fold Requirements

Use this checklist on **every page we build** before launch. No exceptions.

---

## ✅ Messaging

- [ ] **H1 headline:** 6–12 words, leads with benefit, not product name
- [ ] **H1 contains primary keyword** naturally (not stuffed)
- [ ] **Subheadline/descriptor:** 1–2 sentences clarifying who it's for and what they get
- [ ] **Primary CTA:** visible without scrolling on desktop AND mobile
- [ ] **CTA copy:** specific action + benefit (not "Submit" or "Click Here")
- [ ] **Secondary CTA** (if any): ghost/outline only, clearly subordinate
- [ ] **Trust micro-copy** below CTA: "No CC required" / "Free for X days" / "Join X+ users"

---

## ✅ Visual Design

- [ ] **Logo** visible top-left (or top-center for luxury brands)
- [ ] **Navigation** present but not distracting (max 4 links + CTA)
- [ ] **Hero visual** (photo/illustration/UI mockup) supports headline message
- [ ] **Color contrast** on headline: minimum 4.5:1 ratio
- [ ] **CTA button contrast** stands out from background — passes 3:1
- [ ] **No clutter:** hero has one focal point, not multiple competing elements
- [ ] **Brand colors** applied consistently (no inconsistent accent colors)

---

## ✅ Trust (First Scroll)

- [ ] **Social proof strip** appears by second scroll at latest:
  - Stat numbers ("12,000+ teams") OR
  - Logo wall ("Trusted by [brands]") OR
  - Star rating ("★★★★★ 4.8 from 500+ reviews")
- [ ] **Testimonial** from a named, titled individual in first 3 sections
- [ ] **Guarantee or de-risk statement** near primary CTA

---

## ✅ Technical

- [ ] `<title>` tag: Brand | Primary Keyword (50–60 chars)
- [ ] `<meta name="description">` set (150–160 chars)
- [ ] Viewport meta tag present
- [ ] Google Fonts loaded with `display=swap` and `preconnect`
- [ ] Hero image has `fetchpriority="high"` (no `loading="lazy"`)
- [ ] No render-blocking scripts above the fold
- [ ] `<h1>` appears exactly once on the page
- [ ] Mobile: all CTAs are thumb-reachable (bottom half of screen)

---

## ✅ Mobile (375px viewport)

- [ ] Hero text readable without zooming
- [ ] CTA button full-width or minimum 44px tap target
- [ ] Navigation collapses (hamburger or simplified)
- [ ] No horizontal scroll
- [ ] Images don't overflow container
- [ ] Font size minimum 16px for body (prevents iOS zoom on input focus)

---

## ✅ Animations (If Present)

- [ ] Page loads without animation jank (no flash/jump on initial render)
- [ ] Hero animations start within 1s of page load
- [ ] Scroll animations use IntersectionObserver (not scroll event listener)
- [ ] `prefers-reduced-motion` media query respected
- [ ] Ticker/marquee does not distract from H1 and CTA

---

## ✅ Conversion Architecture

- [ ] **One dominant CTA** above fold (never two equal-weight CTAs)
- [ ] Navigation does **not** link to competitor or distraction pages
- [ ] Form (if present) has 3 fields or fewer (name, email, phone max)
- [ ] Urgency/scarcity element present (optional but recommended)
- [ ] Page has a clear "next step" at every scroll depth

---

## Section Order Best Practice

```
1. NAV (fixed, translucent, backdrop-blur)
2. HERO (headline + subtext + CTA + hero visual)
3. SOCIAL PROOF STRIP (logos or stats — small section)
4. PROBLEM / PAIN (what life is like without the product)
5. SOLUTION / HOW IT WORKS (3-step or feature grid)
6. BENEFITS (feature → outcome mapping)
7. TESTIMONIALS (3 minimum)
8. FINAL CTA (big, bold, de-risked)
9. FOOTER (legal + nav + copyright)
```

---

## Above-Fold Score Card

Rate 1–5 on each dimension before shipping:

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity (what is it?) | /5 | |
| Relevance (for me?) | /5 | |
| CTA prominence | /5 | |
| Trust signals | /5 | |
| Visual appeal | /5 | |
| Mobile experience | /5 | |
| **TOTAL** | /30 | Ship at 24+ |

