# 04 — Technical & SEO

## Core Web Vitals Targets
| Metric | Target | Impact |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | #1 ranking factor |
| FID / INP (Interaction) | < 100ms | UX quality |
| CLS (Cumulative Layout Shift) | < 0.1 | Prevents "jumping" |
| TTFB (Time to First Byte) | < 800ms | Server speed |

---

## HTML Document Head — Template

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO -->
  <title>Brand Name | Primary Keyword — Secondary Keyword</title>
  <meta name="description" content="65–160 char benefit-led description with primary keyword." />
  <link rel="canonical" href="https://domain.com/page" />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Same as <title>" />
  <meta property="og:description" content="Same as meta description" />
  <meta property="og:image" content="https://domain.com/og-image.jpg" />
  <meta property="og:url" content="https://domain.com/page" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Same as title" />
  <meta name="twitter:description" content="Same as description" />
  <meta name="twitter:image" content="https://domain.com/og-image.jpg" />

  <!-- Fonts — preconnect first, then stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

  <!-- Critical CSS inline, deferred CSS external -->
</head>
```

---

## Semantic HTML Structure

```html
<body>
  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main>
    <section aria-label="Hero">...</section>
    <section aria-label="Features">...</section>
    <section aria-label="Testimonials">...</section>
  </main>
  <footer role="contentinfo">...</footer>
</body>
```

**One `<h1>` per page** — the hero headline.
All section titles → `<h2>`. Card/feature titles → `<h3>`.

---

## Image Performance

```html
<!-- Hero (above fold) — never lazy load -->
<img src="hero.jpg" alt="Descriptive text" width="1200" height="800"
     fetchpriority="high" />

<!-- Below fold — always lazy -->
<img src="photo.jpg" alt="Descriptive text" width="600" height="400"
     loading="lazy" />
```

Use `srcset` for responsive images:
```html
<img src="img-800.jpg"
     srcset="img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="..." loading="lazy" />
```

---

## Structured Data (JSON-LD)

### Local Business (Daycare, Hotel, Warehouse)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "...",
  "url": "https://domain.com",
  "telephone": "+1-555-000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "ST",
    "postalCode": "00000"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "240"
  }
}
</script>
```

### SaaS / Software
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FlowSync",
  "applicationCategory": "BusinessApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
```

---

## Page Speed Checklist

- [ ] Google Fonts: `&display=swap` always present
- [ ] `<link rel="preconnect">` before font href
- [ ] No unused CSS (inline only what's needed)
- [ ] Hero image: WebP format, `fetchpriority="high"`
- [ ] No render-blocking scripts (defer or module)
- [ ] `<script>` tags at bottom of `<body>`
- [ ] SVG icons inline vs. font-icon library (avoid icon font CDNs)
- [ ] `will-change: transform` on animated elements only

---

## URL & On-Page SEO

- **URL slug:** `/portfolio/saas-project-management` not `/portfolio/page1`
- **Title tag:** Brand | Primary Keyword (50–60 chars)
- **Meta description:** Action verb + benefit + keyword (150–160 chars)
- **H1:** Contains primary keyword naturally
- **Alt text:** Descriptive, contains keyword where natural
- **Internal links:** Footer nav links back to main site sections

---

## Accessibility (WCAG 2.1 AA)

- Color contrast body text: **4.5:1 minimum**
- Large text / buttons: **3:1 minimum**
- All interactive elements: visible focus ring
- `aria-label` on icon-only buttons
- Form inputs: always paired `<label>`
- Skip nav link: `<a href="#main" class="skip-link">Skip to content</a>`

