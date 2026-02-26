# 02 — Visual Design: Color, Typography, Layout & Imagery

## Color Theory for High-Converting Pages

### Palette Architecture (4-Color System)
```
Background  → Near-white or deep dark (never pure #000 or #FFF)
Primary     → Brand accent (CTA, links, highlights)
Text        → Near-black for body (#111 – #1C1917)
Muted       → Secondary text, icons (#6B7280 – #9CA3AF)
```

### Industry Color Palettes

| Industry | Background | Primary | Accent | Feel |
|----------|-----------|---------|--------|------|
| SaaS | #F7F5FF (light violet) | #4F46E5 indigo | #7C3AED violet | Tech/energy |
| Consulting | #0B1D3A deep navy | #C9A84C gold | #E8C97A light gold | Authority |
| Daycare | #FFFFFF white | #F97316 orange | #FCD34D yellow | Joy/warmth |
| Hotel | #0A0A0A near-black | #B8975A bronze-gold | #F5F0E8 cream | Luxury |
| E-commerce | #FAFAF8 warm white | #C2410C rust | #EA580C terracotta | Premium/natural |
| Warehouse | #292524 steel | #EA580C orange | #FDE68A amber | Industrial/bold |

### CTA Button Colors
- Primary: **High contrast** — light bg → dark/colored button; dark bg → bright button
- Hover state: 10–15% darker shade, subtle lift (`translateY(-2px)`)
- Never use red for primary CTA (reads as "warning/error")
- Avoid gray CTAs — they signal disabled

---

## Typography System

### Font Pairings by Industry

| Industry | Display/Hero | Body | Weight System |
|----------|-------------|------|--------------|
| SaaS | Plus Jakarta Sans | Same | 400/600/800/900 |
| Consulting | Inter (tight) | Inter | 300/500/700/900 |
| Daycare | Nunito | Inter | 700/800/900 |
| Hotel | Cormorant Garamond | Inter | 400italic/600 |
| E-commerce | Playfair Display | Inter | 400/700 |
| Warehouse | Barlow | Same | 700/800/900 |

### Type Scale (clamp-based for responsive)
```css
H1:   clamp(2.5rem, 5vw, 5rem)    /* Hero headline */
H2:   clamp(1.9rem, 3vw, 3rem)    /* Section headline */
H3:   1.15–1.4rem                  /* Card/feature title */
Body: 1rem (16px base)             /* Never below 0.875rem for paragraphs */
Label/Tag: 0.65–0.75rem            /* All-caps, tracked */
```

### Typography Rules
- **Letter spacing on all-caps:** 0.08–0.2em
- **Line height:** 1.6–1.75 for body; 1.0–1.15 for headlines
- **Max measure:** 65–70 characters per line for body text
- **Bold italics** in headlines for emphasis (Playfair/Cormorant)

---

## Layout Patterns

### Hero Layouts
1. **Split-screen** (SaaS, Warehouse, E-commerce): Text left, visual right — `grid-template-columns: 1fr 1fr`
2. **Centered overlay** (Hotel): Full-bleed image + overlay gradient + centered copy
3. **Centered dark** (Consulting): Max-width container, image below or side
4. **Illustrated** (Daycare): Flat color sections with wavy SVG dividers

### Grid Systems
- Products: 4-col desktop → 2-col tablet → 1-col mobile
- Features: 3-col desktop → 1-col mobile
- Testimonials: 3-col → 1-col
- Stats strip: flex, `justify-content: center`, `gap: 3–5rem`

### Section Anatomy
```
[Label — tiny uppercase tracking]
[H2 Headline — with accent color on key word]
[Subtext — max 480px width, centered or left]
[Content grid or component]
```

---

## Imagery Principles

### Photo Selection
- **Real humans** outperform illustrations by 12–25% (Unbounce data)
- Face direction: subjects looking **toward** the CTA
- **Before/after contrast** signals — show "messy" state, then "clean" state
- Unsplash categories per industry:
  - SaaS → workspace, screens, collaboration
  - Daycare → children playing, warm light, classrooms
  - Hotel → lobbies, rooms with natural light, food plating
  - E-commerce → lifestyle product shots, styled rooms
  - Warehouse → clean, orderly aisles with motion

### Image Optimizations
- Always use `object-fit: cover` with fixed height containers
- `loading="lazy"` on all below-fold images
- `width` and `height` attributes set to prevent layout shift
- Use Unsplash `?w=800&auto=format&fit=crop&q=80` parameters
- `alt` text: describe the scene, not "image of..."

---

## Whitespace & Visual Hierarchy

- **Section padding:** `5rem 5%` desktop → `3rem 5%` mobile
- **Card padding:** `1.75–2rem`
- **Above-fold breathing room:** Never crowd; one element per visual zone
- **Negative space** is a luxury signal — more whitespace = more premium
- Cards on light bg: `background:#fff; box-shadow: 0 4px 24px rgba(0,0,0,.06)`
- Cards on dark bg: `border: 1px solid rgba(255,255,255,.08)`

