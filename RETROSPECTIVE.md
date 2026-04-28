# Viewpulse — Launch Retrospective

**Date:** 2026-04-26  
**Stage:** MVP Complete  
**Review:** CTO + CEO

---

## tl;dr

MVP shipped on schedule. Core features delivered. OAuth + dashboard + charts + video table all functional. Adoption tracking added post-launch. Net result: a working product at viewpulse.rachkovan.com.

---

## What Was Planned vs. Delivered

### ✅ Delivered as Planned

| Feature | Status |
|---------|--------|
| F1: YouTube OAuth Connection | ✅ Complete |
| F2: Dashboard Overview (4 metric cards) | ✅ Complete |
| F3: Video Performance Table (sort + paginate) | ✅ Complete |
| F4: Views Over Time Chart | ✅ Complete |
| F5: Top Videos Chart | ✅ Complete |
| Date range selector (7d/28d/90d/custom) | ✅ Complete |
| Deployment + domain setup | ✅ Complete (vercel + viewpulse.rachkovan.com) |
| Adoption analytics dashboard | ✅ Added post-launch |

### ⚠️ Partially Delivered / Modified

| Item | Notes |
|------|-------|
| Analytics API integration | Fallback to `videos?part=statistics` since `youtube/analytics/v1/reports` requires additional OAuth scope (`yt-analytics-monetary.readonly`) that most users don't grant. CTR and avg view duration derived from available data. |
| Rate limit handling | Caching implemented (1hr) but in-memory singleton resets on server restart. Acceptable for MVP. |

### 🔲 Out of Scope (Not Started — Correctly)

These were never in scope for MVP and remain deferred:

- Comparative analytics
- AI-powered insights
- Export to PNG/PDF
- Dark mode
- Email reports
- Alerts/thresholds
- Team collaboration
- Mobile PWA

---

## What Went Well

### 1. Clean Architecture Choices
- Next.js 14 App Router with TypeScript from day one — no tech debt from migrations
- shadcn/ui + Tailwind provided a professional design system with minimal custom CSS
- Recharts was straightforward to integrate for both line/bar charts

### 2. Well-Defined Spec
- SPEC.md was written before any code. The 7-day milestone table gave the build a clear cadence
- Data models (`Channel`, `VideoStats`, `AnalyticsSummary`) were defined upfront — API integration was mechanical rather than exploratory

### 3. YouTube OAuth Scope Strategy
- Starting with `yt-analytics.readonly` is the right call. The analytics API is powerful but requires an extra scope that Google may not approve for public apps
- Graceful degradation to video-level stats means the dashboard always shows *something* useful

### 4. Fast Production Deploy
- Vercel deployment + custom domain same-day as MVP completion
- OAuth redirect URIs pre-registered in Google Console

### 5. Adoption Tracking Added Same Day
- Adding `lib/adoption.ts` + `AdoptionDashboard.tsx` within 24h of launch means we're already measuring growth from day 1

---

## What Could Be Improved

### 1. No Error Boundaries or Loading Skeletons
- If YouTube API errors out, the user sees a blank card rather than a meaningful error state
- Loading states for metric cards while data fetches would improve perceived performance

### 2. In-Memory Adoption Tracker is Ephemeral
- `lib/adoption.ts` singleton resets on every serverless function cold start
- Need PostHog, Google Analytics 4, or a KV store (Vercel KV / Upstash Redis) for reliable adoption metrics

### 3. Video Table Fetches All Videos then Client-Sorts
- Current implementation: fetch all videos from uploads playlist → client-side sort/paginate
- For channels with 500+ videos, this is expensive and slow
- Should implement server-side pagination and sorting via YouTube API

### 4. No Unit or Integration Tests
- Zero test coverage on API routes, OAuth flow, and data transformation functions
- High-risk: any API contract change from YouTube breaks silently

### 5. Missing Responsive / Mobile Layout
- SPEC.md explicitly deferred mobile PWA — but the current table/charts break badly on small screens
- At minimum, the metric cards and charts should stack vertically on mobile

### 6. OAuth Token Refresh Not Tested in Production
- Tokens are stored but the refresh flow hasn't been validated with real expired tokens
- Long-running sessions may break after the initial 1-hour access token expires

### 7. No SEO / Landing Page
- `app/page.tsx` is the login/landing page but it's thin — no feature screenshots, no value proposition copy, no pricing signals
- First-time visitors have no context before clicking "Connect YouTube"

---

## Key Learnings for Future Projects

### 1. Define Success Metrics Before Build
- Viewpulse MVP has no defined revenue goal, no user research, no pre-launch waitlist
- **Next time:** Establish "$k MRR target" and "N creators by date X" goals *before* writing SPEC.md
- A product without a success metric is a hobby project with a domain name

### 2. Start with the Hardest Problem First
- We scaffolded OAuth (day 1) before dashboard (day 2) before API (day 3)
- OAuth is well-documented and predictable; the YouTube API rate limits and data shapes are the actual unknowns
- **Next time:** Spend day 1 on the API integration riskiest path

### 3. Build Adoption Tracking Infrastructure from Day 1
- We patched in-memory tracking the day after launch
- **Next time:** Integrate PostHog / GA4 / analytics SDK at project init, not post-launch
- You can't improve what you don't measure

### 4. Keep SPEC.md as a Living Document
- Adoption Analytics was added as a code comment in SPEC.md but the file structure wasn't updated
- **Next time:** Update file structure section + data models whenever scope changes

### 5. OAuth for External APIs Needs a Token Refresh Story Upfront
- We built token storage but didn't design the refresh flow
- **Next time:** Define the expired-token UX *in the spec* before building auth

---

## Open Questions

| Question | Priority |
|----------|----------|
| What's the monetization model? (Freemium? One-time? Subscription?) | High |
| Who is the first customer? Where do they live online? | High |
| Should we pursue `yt-analytics-monetary.readonly` scope for real watch time data? | Medium |
| Do we need a waitlist / email capture before marketing push? | Medium |
| Is Vercel's serverless function memory sufficient for large channel data? | Low |

---

*Next phase: Distribution (see DISTRIBUTION.md)*
