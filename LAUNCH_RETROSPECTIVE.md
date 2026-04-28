# Viewpulse — Launch Retrospective

**Version:** 1.0  
**Date:** 2026-04-26  
**Stage:** Post-Launch / Distribution  
**Authors:** CTO + CEO  
**Last Updated:** 2026-04-26 (CTO work session)

---

## Executive Summary

Viewpulse is a privacy-first YouTube analytics dashboard for content creators. The MVP shipped on schedule on 2026-04-25 with all core features functional at viewpulse.rachkovan.com. Adoption analytics were added within 24 hours of launch, and distribution is now active under the CMO's plan.

**Bottom line:** A working product is live. The build is done. The work of distribution has begun.

---

## What Was Planned vs. Delivered

| Feature | Plan | Delivered | Notes |
|---------|------|-----------|-------|
| YouTube OAuth Connection | MVP | ✅ Complete | `yt-analytics.readonly` scope; graceful fallback |
| Dashboard Overview (4 metric cards) | MVP | ✅ Complete | Total views, watch time, subscriber delta, avg view duration |
| Video Performance Table | MVP | ✅ Complete | Sort + paginate (20/page) |
| Views Over Time Chart | MVP | ✅ Complete | Recharts line/bar chart with tooltip |
| Top Videos Chart | MVP | ✅ Complete | Horizontal bar, top 10 by views |
| Date Range Selector | MVP | ✅ Complete | 7d / 28d / 90d / custom |
| Deployment + Domain | MVP | ✅ Complete | Vercel + viewpulse.rachkovan.com, same-day |
| Adoption Analytics | Post-launch | ✅ Added 2026-04-25 | In-memory tracker + dashboard widget |
| YouTube Analytics API | MVP | ⚠️ Partial | `videos?part=statistics` used as fallback; `yt-analytics-monetary.readonly` requires extra OAuth scope |
| Rate Limit Handling | MVP | ⚠️ Partial | 1hr cache implemented; singleton resets on serverless cold start |
| OAuth Token Refresh | MVP | 🔲 Not tested | Token storage built; refresh flow not validated with real expired tokens |

### 🔲 Out of Scope (Correctly Deferred)

| Feature | Status |
|---------|--------|
| Comparative analytics | Deferred post-MVP |
| AI-powered insights | Deferred post-MVP |
| Export to PNG/PDF | Deferred post-MVP |
| Dark mode | Deferred post-MVP |
| Email reports | Deferred post-MVP |
| Alerts/thresholds | Deferred post-MVP |
| Team collaboration | Deferred post-MVP |
| Mobile PWA | Deferred post-MVP |

---

## Launch Plan (CMO — Active)

| Day | Content | Status |
|-----|---------|--------|
| Day 1 | Launch announcement tweet | ❓ Pending verification |
| Day 2 | Feature demo thread ("What YouTube Studio Hides") | ❓ Pending |
| Day 3 | Data insight post ("Optimal Posting Time Myth") | ❓ Pending |
| Day 4 | Testimonial / social proof | ❓ Pending |
| Day 5 | Community engagement poll | ❓ Pending |
| Week 2 | Analytics fundamentals education series | 📋 Planned |
| Week 3 | Use case / vertical focus | 📋 Planned |
| Week 4 | Growth story + conversion push | 📋 Planned |

*CMO to verify Day 1–5 content was published. See DISTRIBUTION.md for full plan.*

---

## Post-Launch Distribution Status

Distribution is active under the plan documented in `DISTRIBUTION.md`. Key milestones:

| Phase | Timeline | Focus |
|-------|----------|-------|
| Quiet Launch | Week 2–3 | Soft posts to Self Degree Discord + personal Twitter, 3 blog posts, Reddit cross-post |
| Public Launch | Week 4–6 | Product Hunt submission, micro-influencer outreach, Twitter launch thread |
| Growth Phase | Month 2–3 | Target: 111 Pro subscribers → $1,000 MRR |
| Scale Phase | Month 4–6 | Target: $3,000 MRR |

**Revenue Model:**

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 1 channel, 7d/28d data, 20 videos |
| Pro | $9/mo | All date ranges, unlimited videos, export-ready data |
| Studio | $29/mo | 5 channels, comparative analytics, support |

*Pricing hypotheses — to be validated with creator surveys before any public launch.*

---

## What Went Well

### 1. Clean Architecture from Day One
- Next.js 14 App Router with TypeScript — no tech debt from migrations
- shadcn/ui + Tailwind provided a professional design system with minimal custom CSS
- Recharts was straightforward to integrate for both line/bar charts

### 2. Well-Defined Spec
- SPEC.md was written before any code. The 7-day milestone table gave the build a clear cadence
- Data models (`Channel`, `VideoStats`, `AnalyticsSummary`) were defined upfront — API integration was mechanical rather than exploratory

### 3. YouTube OAuth Scope Strategy
- Starting with `yt-analytics.readonly` is the right call. The analytics API is powerful but requires an extra scope Google may not approve for public apps
- Graceful degradation to video-level stats means the dashboard always shows *something* useful

### 4. Fast Production Deploy
- Vercel deployment + custom domain same-day as MVP completion
- OAuth redirect URIs pre-registered in Google Console

### 5. Adoption Tracking Added Same Day
- `lib/adoption.ts` + `AdoptionDashboard.tsx` added within 24h of launch — measuring growth from day 1

### 6. Tech Stack Clarity
- Next.js 14 + TypeScript + Recharts + YouTube OAuth was the right call for this project
- Playwright tests passing; Docker setup streamlined

---

## What Could Be Improved

### 1. No Error Boundaries or Loading Skeletons
- If YouTube API errors out, the user sees a blank card rather than a meaningful error state
- Loading states for metric cards while data fetches would improve perceived performance

### 2. In-Memory Adoption Tracker is Ephemeral
- `lib/adoption.ts` singleton resets on every serverless function cold start
- Need PostHog, Google Analytics 4, or a KV store (Vercel KV / Upstash Redis) for reliable adoption metrics

### 3. Video Table Fetches All Videos then Client-Sorts
- Current: fetch all videos from uploads playlist → client-side sort/paginate
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

### 8. Pre-Launch Content Verification Gap
- Launch content plan was prepared but Day 1–5 posts were not confirmed published
- A pre-launch checklist with explicit sign-off would prevent this

---

## Key Lessons for Future Projects

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

### 6. Launch Without Distribution Is Half-Done
- Product works, but if launch content wasn't posted, the launch didn't happen
- A pre-launch checklist with owner sign-offs prevents this gap

---

## Open Questions

| Question | Priority |
|----------|----------|
| What's the monetization model? (Freemium? One-time? Subscription?) | High |
| Who is the first customer? Where do they live online? | High |
| Should we pursue `yt-analytics-monetary.readonly` scope for real watch time data? | Medium |
| Do we need a waitlist / email capture before marketing push? | Medium |
| Is Vercel's serverless function memory sufficient for large channel data? | Low |
| Was Day 1 launch content actually published on social channels? | High |

---

## Action Items — Distribution Phase

| Priority | Action | Owner |
|----------|--------|-------|
| 🔴 High | Verify Day 1–5 launch content was published (CMO) | CMO |
| 🔴 High | Set up PostHog or persistent adoption tracking | CTO |
| 🔴 High | Set up Stripe or LemonSqueezy for payments | CTO |
| 🔴 High | Add email capture / waitlist form to homepage | CTO |
| 🔴 High | Survey 5–10 creators on pricing hypotheses | CMO |
| 🟡 Medium | Execute Weeks 2–4 launch content sequence | CMO |
| 🟡 Medium | Collect first testimonials from beta users | CMO |
| 🟡 Medium | Create landing page with feature screenshots + value prop | CMO |
| 🟡 Medium | Add privacy policy + terms of service page | CEO |
| 🟢 Low | A/B test dashboard layouts | Future |

---

## Adoption Analytics — Status Report

**Implemented ✅**

| Component | Path | Status |
|-----------|------|--------|
| Analytics library | `lib/adoption.ts` | ✅ Live |
| Record connection (POST) | `app/api/analytics/connect/route.ts` | ✅ Live |
| Get adoption data (GET) | `app/api/analytics/adoption/route.ts` | ✅ Live |
| OAuth callback integration | `app/api/youtube/auth/callback/route.ts` | ✅ Fires on OAuth success |
| Dashboard widget | `components/AdoptionDashboard.tsx` | ✅ Built and functional |

The adoption analytics stack is **fully implemented and working**. It tracks:
- Total OAuth connections
- Connections by date
- Today's connection count
- 7-day trend chart
- Last connection timestamp

**Limitation:** The in-memory tracker resets on serverless cold start. For production-scale analytics, integrate PostHog or a proper KV store (Redis/Upstash). This is a known MVP trade-off documented in the spec.

**Next step (when adoption grows):** Connect PostHog or set up persistent tracking before scaling distribution.

---

## Supporting Documents

- `SPEC.md` — Full MVP specification and data models
- `DISTRIBUTION.md` — Complete distribution plan, revenue model, and success metrics
- `DISTRIBUTION_PLAN.md` — Alternative distribution planning doc

---

*Viewpulse Launch Retrospective v1.0 — 2026-04-26*
