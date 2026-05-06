import { NextResponse } from 'next/server';

export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f23"/>
      <stop offset="100%" style="stop-color:#1a1a3e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="200" cy="200" r="300" fill="#f59e0b" opacity="0.06"/>
  <circle cx="1000" cy="500" r="400" fill="#6366f1" opacity="0.08"/>
  <rect x="80" y="180" width="8" height="260" rx="4" fill="url(#accent)" opacity="0.9"/>
  <rect x="100" y="220" width="8" height="220" rx="4" fill="url(#accent)" opacity="0.7"/>
  <rect x="120" y="260" width="8" height="180" rx="4" fill="url(#accent)" opacity="0.5"/>
  <rect x="140" y="290" width="8" height="150" rx="4" fill="url(#accent)" opacity="0.35"/>
  <text x="200" y="280" font-family="system-ui, sans-serif" font-size="64" font-weight="800" fill="#fff">ViewPulse</text>
  <text x="200" y="370" font-family="system-ui, sans-serif" font-size="28" fill="#94a3b8">YouTube Watch History Analyzer</text>
  <text x="200" y="430" font-family="system-ui, sans-serif" font-size="22" fill="#64748b">100% client-side · No data leaves your browser</text>
  <circle cx="1050" cy="300" r="120" fill="url(#accent)" opacity="0.15"/>
  <path d="M990 300 L1020 270 L1060 320 L1100 280 L1110 300 L1060 340 L1020 310 Z" fill="url(#accent)" opacity="0.6"/>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
