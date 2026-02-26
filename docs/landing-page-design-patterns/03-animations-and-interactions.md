# 03 — Animations & Interactions

## Core Principle: Motion With Purpose
Every animation must do one of:
1. **Guide attention** to the primary CTA
2. **Signal interactivity** (hover states, buttons)
3. **Reward scroll** (reveal content progressively)
4. **Communicate brand personality** (playful vs. precise)

Performance rule: All animations must be `transform` or `opacity` only. Never animate `width`, `height`, `top`, `left`, `margin` — they trigger layout reflow.

---

## Scroll-Reveal (The Universal Pattern)

Add to every portfolio page. Uses IntersectionObserver — zero dependencies.

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Stagger siblings with delay */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
```

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## Animated Stat Counters

Apply `data-count` to any statistic number. Fires once when in viewport.

```javascript
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const decimals = el.dataset.decimals || 0;
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    const value = target * ease;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
```

---

## Hero Gradient Orbs (Stripe/Linear-Style)

```css
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: float 8s ease-in-out infinite;
  pointer-events: none;
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #4F46E5, transparent); top: -10%; right: -5%; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #7C3AED, transparent); bottom: 10%; left: -5%; animation-delay: -4s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-24px) scale(1.04); }
}
```

---

## Marquee / Ticker Strip

```css
.ticker-track {
  display: flex;
  gap: 3rem;
  animation: marquee 28s linear infinite;
  white-space: nowrap;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```
Double the content HTML so the loop is seamless.
Pause on hover: `.ticker-track:hover { animation-play-state: paused; }`

---

## Hover Micro-interactions

```css
/* Card lift */
.card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }

/* Button press */
.btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
.btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.35); }
.btn:active { transform: translateY(0); box-shadow: none; }

/* Image zoom on parent hover */
.img-wrap { overflow: hidden; }
.img-wrap img { transition: transform 0.55s ease; }
.img-wrap:hover img { transform: scale(1.06); }
```

---

## Animated Gradient Background (Consulting/SaaS)

```css
@keyframes gradShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.grad-bg {
  background: linear-gradient(-45deg, #0B1D3A, #162B50, #1E3A5F, #0B1D3A);
  background-size: 400% 400%;
  animation: gradShift 12s ease infinite;
}
```

---

## Floating UI Elements (SaaS Hero)

Small "notification cards" floating near dashboard mockup — signal real product activity.

```css
.float-card {
  position: absolute;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  animation: floatCard 6s ease-in-out infinite;
  font-size: 0.78rem;
  font-weight: 600;
}
@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
```

---

## Performance Budget for Animations
- Max 3 CSS animations running simultaneously on page load
- Ticker: use `will-change: transform` on the animated element
- Orbs: `will-change: transform` — remove after animation stabilizes
- Always add `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`

