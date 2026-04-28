# Viewpulse — Product Decision Brief

**Date:** 2026-04-26
**Status:** Decision Required
**Author:** CEO Review Draft

---

## Problem Statement

The Viewpulse codebase currently contains two distinct products that were conflated during development:

1. **Personal watch history analyzer** — parses a user's own Google Takeout watch history (HTML/JSON exports), shows what *they* watched, when, from which channels, peak hours, binge days, keyword trends.
2. **Creator analytics dashboard** — OAuth-connected, shows channel performance (views, watch time, CTR, subscriber delta) for *content creators'* own channels.

These share the Viewpulse brand but have different users, data sources, and business models. **One decision is needed: which direction is Viewpulse?**

---

## Option A: Personal Watch History Analyzer

### What it is
A tool where any YouTube user uploads their Google Takeout export and gets rich analytics on their own watching habits — total videos watched, favorite channels, peak watching hours, binge patterns, monthly trends, keyword clouds.

### User
Regular YouTube user (not a creator) who wants to understand their own consumption patterns.

### Data source
User's own Google Takeout export (watch-history.html or watch-history.json). No API needed. Works offline. Privacy-first by design.

### Revenue model
Freemium ($0/$20). Limited history size on free tier.

### Current state
**Fully built and functional.** `lib/parser.ts` handles HTML and JSON Takeout parsing. `lib/analytics.ts` computes all metrics. `Dashboard.tsx` renders a rich client-side UI with timeline brushing, channel drilldown, export PDF, keyword bubbles.

### What's missing
- No landing page focused on this product
- No clear monetization (no Stripe, no tier enforcement)
- No mobile UX

### Key technical decisions
- **Pure client-side** — all processing in the browser, no server-side storage
- **No backend needed** for core product (except static hosting)
- **PDF export** via print dialog — functional but rough
- Privacy is the core selling point (data never leaves the browser)

---

## Option B: Creator Analytics Dashboard

### What it is
A SaaS tool where YouTube creators connect their channel via OAuth and see metrics YouTube Studio doesn't surface clearly: views over time, subscriber delta trends, avg view duration, top videos, CTR.

### User
YouTube content creators (1K–500K subscribers) who want better analytics than YouTube Studio provides.

### Data source
YouTube Data API v3 + YouTube Analytics API (if available) via OAuth 2.0.

### Revenue model
Freemium ($0/$20/$50). Free = 1 channel, basic metrics. Pro = unlimited channels, advanced features.

### Current state
**Partially built.** OAuth flow exists (`app/api/youtube/auth/`). Landing page says "For YouTube Creators." SPEC.md fully describes the dashboard. **But the dashboard itself still renders the personal watch history analyzer** (Dashboard.tsx) — not creator analytics. No video performance table, no metric cards pulling from YouTube API.

### What's missing
- Actual YouTube API integration for channel/video analytics
- Video performance table (views, CTR, avg duration)
- Charts for subscriber trends, views over time
- Stripe + payment flow
- All the OAuth-aware dashboard UI

### Key technical decisions
- **Server-side API proxy** required (to protect API keys + handle OAuth tokens)
- **YouTube Data API v3** for channel stats and video lists
- **YouTube Analytics API** (if accessible) for time-series data
- Rate limiting: 10K units/day — cache aggressively
- OAuth tokens need secure storage (cookies/server-side)

---

## Option C: Both as Separate Product Modes

Keep building Viewpulse as a single codebase with a mode selector on the landing page:

- **Mode 1: Personal** — "Understand your own watching habits" (current takeout parser)
- **Mode 2: Creator** — "Grow your channel with better analytics" (OAuth dashboard)

Shared brand, separate UIs, separate data flows, possibly separate pricing.

**Risks:**
- Two distinct products = two distinct GTM motions = doubled marketing effort
- Team bandwidth is limited (1 CTO + 1 CMO + CEO oversight)
- Brand confusion: is Viewpulse for creators or for watchers?

---

## Recommendation: Option B — Creator Analytics Dashboard

### Rationale

**1. Revenue potential is orders of magnitude higher.**
A creator analytics SaaS at $20/month with 50 users = $1K MRR. Personal watch history is a "fun" tool — there's no clear willingness to pay. Distribution plan already targets creators with real pain and $.

**2. Creator pain is real and documented.**
YouTube Studio shows data but buries it. Creators actively seek TubeBuddy, vidIQ, Social Blade alternatives. The distribution plan already targets this market.

**3. The current "creator" dashboard is mislabeled.**
What currently runs at `/dashboard` is the personal watch history analyzer. The SPEC.md describing creator analytics was written as a spec but the code was never built. So we are not "switching" — we are **building the creator product fresh**.

**4. Personal watch history has no competitive moat.**
Many tools do this (Google Takeout itself, various third-party parsers). It's technically fun but not defensible. Creator analytics integrated with YouTube OAuth has real switching costs and lock-in potential.

**5. Single focus = faster execution.**
CTO + CMO have 30-minute work sessions. Two products split that attention. One clear direction = cleaner priorities = faster to revenue.

### What to do with the personal analyzer code
Archive it — don't delete. The code in `lib/parser.ts`, `lib/analytics.ts`, and `Dashboard.tsx` is well-built and could be spun off as a separate project or even a "Viewpulse Personal" mode later. But **the Viewpulse project should ship the creator dashboard first.**

---

## MVP Scope (Creator Dashboard)

Based on SPEC.md, the MVP for Option B is:

| # | Feature | Priority |
|---|---------|----------|
| 1 | YouTube OAuth connection (verify working) | Critical |
| 2 | Channel overview metrics (total views, watch time, subscriber delta, avg view duration) | Critical |
| 3 | Views over time chart (line chart, date range) | High |
| 4 | Top videos chart (horizontal bar, top 10 by views) | High |
| 5 | Video performance table (thumbnail, title, views, date) | High |
| 6 | Date range selector (7d / 28d / 90d) | Medium |
| 7 | Landing page with clear "Connect YouTube" CTA | High |

**Out of scope for MVP:** Stripe/payments, email capture, export to PNG/PDF, AI insights, dark mode, team features.

**Estimated build:** 5–7 days if CTO focuses exclusively on this.

---

## Key Technical Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Framework | Next.js 14 (already in use) | Keep current scaffold |
| Auth | YouTube OAuth 2.0 | Existing code works; needs testing |
| API | YouTube Data API v3 | Channel + video stats |
| Analytics API | YouTube Analytics API v1 | If accessible; fallback to video list polling |
| Caching | 1-hour cache on channel data | Reduce quota burn |
| Deployment | Vercel (viewpulse.rachkovan.com) | Keep existing setup |
| Charts | Recharts | Already in spec |
| Payments | Stripe | Post-MVP only |

---

## Next Steps

1. **CEO approves** Option B direction (this brief)
2. **CTO** archives `Dashboard.tsx` personal analyzer reference (keep parser/analytics libs as fallback)
3. **CTO** builds creator dashboard per SPEC.md MVP table above
4. **CMO** updates landing page copy to remove any personal analyzer references
5. **CTO** + **CMO** agree on 1-week milestone for first working creator dashboard deploy
6. **CEO** reviews deployed MVP before distribution push

---

*Brief prepared for CEO review — 2026-04-26*
