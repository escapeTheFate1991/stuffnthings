// Generate OG image for stuffnthings.io
// Run: node scripts/generate-og.js

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background — dark slate like the hero
ctx.fillStyle = '#0f172a';
ctx.fillRect(0, 0, W, H);

// Gradient orbs (hero-style)
const drawOrb = (x, y, r, color, alpha) => {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
};

drawOrb(150, 100, 350, 'rgb(6, 182, 212)', 0.12);   // cyan top-left
drawOrb(1050, 530, 350, 'rgb(168, 85, 247)', 0.1);   // purple bottom-right
drawOrb(600, 350, 250, 'rgb(251, 113, 133)', 0.05);   // coral center

// Particle dots
const rng = (min, max) => Math.random() * (max - min) + min;
for (let i = 0; i < 60; i++) {
  const x = rng(0, W), y = rng(0, H);
  const r = rng(1, 3), o = rng(0.1, 0.4);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(6, 182, 212, ${o})`;
  ctx.fill();
}

// Connection lines between some particles
const particles = Array.from({ length: 30 }, () => ({ x: rng(0, W), y: rng(0, H) }));
particles.forEach((p, i) => {
  particles.slice(i + 1).forEach(q => {
    const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
    if (d < 200) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - d / 200)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  });
});

// Subtle grid pattern
ctx.strokeStyle = 'rgba(148, 163, 184, 0.03)';
ctx.lineWidth = 0.5;
for (let x = 0; x < W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y < H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// Main heading — gradient text effect
const drawGradientText = (text, x, y, size, w) => {
  ctx.font = `900 ${size}px "Inter", "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  const grad = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y);
  grad.addColorStop(0, '#06b6d4');   // cyan
  grad.addColorStop(1, '#a855f7');   // purple
  ctx.fillStyle = grad;
  ctx.fillText(text, x, y);
};

// "Run Your Business." in gradient
drawGradientText('Run Your Business.', W / 2, 200, 72, 600);

// "Let AI Handle the Rest." in white
ctx.font = '900 72px "Inter", "Segoe UI", sans-serif';
ctx.textAlign = 'center';
ctx.fillStyle = '#ffffff';
ctx.fillText('Let AI Handle', W / 2, 280);
ctx.fillText('the Rest.', W / 2, 360);

// Subheading
ctx.font = '500 24px "Inter", "Segoe UI", sans-serif';
ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
ctx.fillText('ALEC deploys into your stack, manages your CRM, qualifies your leads.', W / 2, 415);

// CTA Button
const btnW = 340, btnH = 56, btnX = (W - btnW) / 2, btnY = 460;
const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
btnGrad.addColorStop(0, '#06b6d4');
btnGrad.addColorStop(1, '#a855f7');
ctx.fillStyle = btnGrad;

// Rounded rect
const r = 14;
ctx.beginPath();
ctx.moveTo(btnX + r, btnY);
ctx.lineTo(btnX + btnW - r, btnY);
ctx.quadraticCurveTo(btnX + btnW, btnY, btnX + btnW, btnY + r);
ctx.lineTo(btnX + btnW, btnY + btnH - r);
ctx.quadraticCurveTo(btnX + btnW, btnY + btnH, btnX + btnW - r, btnY + btnH);
ctx.lineTo(btnX + r, btnY + btnH);
ctx.quadraticCurveTo(btnX, btnY + btnH, btnX, btnY + btnH - r);
ctx.lineTo(btnX, btnY + r);
ctx.quadraticCurveTo(btnX, btnY, btnX + r, btnY);
ctx.closePath();
ctx.fill();

// Glow behind button
ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
ctx.shadowBlur = 30;
ctx.fill();
ctx.shadowBlur = 0;

// Button text
ctx.font = '700 20px "Inter", "Segoe UI", sans-serif';
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'center';
ctx.fillText('Get Your Free Assessment →', W / 2, btnY + 36);

// Trust bar at bottom
const trustY = 555;
ctx.font = '500 14px "Inter", "Segoe UI", sans-serif';
ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
const trustItems = ['No contracts', 'Cancel anytime', '48-hour assessment', '< 2 min response'];
const totalWidth = trustItems.length * 200;
const startX = (W - totalWidth) / 2;
trustItems.forEach((item, i) => {
  const x = startX + i * 200 + 100;
  // Green dot
  ctx.beginPath();
  ctx.arc(x - 60, trustY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#22c55e';
  ctx.fill();
  // Text
  ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
  ctx.textAlign = 'left';
  ctx.fillText(item, x - 50, trustY + 5);
});

// Brand name — bottom left
ctx.font = '800 16px "Inter", "Segoe UI", sans-serif';
ctx.textAlign = 'left';
const nameGrad = ctx.createLinearGradient(40, H - 30, 200, H - 30);
nameGrad.addColorStop(0, '#06b6d4');
nameGrad.addColorStop(1, '#a855f7');
ctx.fillStyle = nameGrad;
ctx.fillText('STUFF N THINGS', 40, H - 25);

// URL — bottom right
ctx.font = '500 14px "Inter", "Segoe UI", sans-serif';
ctx.textAlign = 'right';
ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
ctx.fillText('stuffnthings.io', W - 40, H - 25);

// Save
const out = path.join(__dirname, '..', 'public', 'og-image.png');
const buf = canvas.toBuffer('image/png');
fs.writeFileSync(out, buf);
console.log(`✅ OG image saved: ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
