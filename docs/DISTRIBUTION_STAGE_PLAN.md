# Viewpulse Distribution Stage Plan
## MRR Target: $X,XXX ARR by [12 months post-launch]

**Project:** Viewpulse — YouTube Creator Analytics Dashboard  
**Stage:** Distribution  
**Owner:** CTO  
**Date:** 2026-04-24  
**Status:** ⚠️ BLOCKED — No codebase exists. MVP build required before distribution can begin.

---

## 🚨 Critical Precondition

**Viewpulse has no application code.** The workspace at `/data/workspace/viewpulse/` contains only marketing content and business docs. The product direction (personal watch history analyzer vs. creator channel analytics dashboard) is unresolved and requires a CEO decision before CTO can proceed with development.

**Estimated MVP build time:** 5-7 days (Option B: Creator Dashboard)  
**Estimated time to first revenue:** 60-90 days from build start

---

## 1. Distribution Stage Goals

| Goal | Target | Metric |
|------|--------|--------|
| **Users** | 500 creators by month 3 | Connected YouTube accounts |
| **Revenue** | $X,XXX MRR by month 6 | Subscribers paying for pro |
| **Retention** | 60% month-over-month retention | DAU/MAU ratio |
| **NPS** | ≥ 40 NPS from early users | In-app survey |

---

## 2. Revenue Model

### Recommended Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Connect 1 channel, basic metrics, 7-day history |
| **Pro** | $9/mo | Unlimited channels, 90-day history, export, alerts |
| **Agency** | $29/mo | 10+ channels, team access, API access |

### MRR Roadmap

| Month | Milestone | MRR Target | Notes |
|-------|-----------|-----------|-------|
| 1 | Launch MVP | $0 | Free tier only, gather feedback |
| 2 | First paid users | $81 | 9 Pro subscribers |
| 3 | Product-market fit signal | $243 | 27 Pro or 9 Agency |
| 6 | Scale distribution | $X,XXX | Target: 50+ paying users |
| 12 | Full distribution | $X,XXX | Target: 150+ paying users |

---

## 3. Distribution Channels

### Primary (Month 1-3)
1. **Twitter/X organic** — #YouTube creator community, DMs to small creators
2. **Reddit** — r/youtube, r/PartneredYouTube, r/contentcreation
3. **YouTube tutorial content** — "How to use Viewpulse" videos (SEO)
4. **Product Hunt** — Launch day

### Secondary (Month 3-6)
5. **YouTube creator tool newsletters** — Sponsored placements
6. **Discord servers** — YouTube creator communities (Sponsor/ads)
7. **Affiliate program** — Creators with 10K+ subs earn commission

### Tertiary (Month 6+)
8. **TubeBuddy / VidIQ integration** — Partnership
9. **Agency partnerships** — MCN tool stacks

---

## 4. Go-to-Market Sequence

### Pre-Launch (Week -2 to 0)
- [ ] CEO decision: Product direction (Option A/B/C from tech assessment)
- [ ] MVP build completed and deployed
- [ ] Landing page live at viewpulse.rachkovan.com
- [ ] Free tier operational
- [ ] Social accounts created (Twitter, Reddit)

### Launch Week
- [ ] Product Hunt launch
- [ ] Twitter launch announcement
- [ ] 3-5 creator outreach DMs (warm introduction)
- [ ] Discord announcement in creator servers

### Month 1: Seed Users
- [ ] 50 creators signed up (free tier)
- [ ] 5-10 creators providing feedback
- [ ] Twitter content cadence: 3x/week
- [ ] First tutorial YouTube video

### Month 2: First Revenue
- [ ] Convert first 5+ paid users
- [ ] Implement in-app feedback widget
- [ ] Begin NPS tracking
- [ ] Reddit AMA in r/youtube

### Month 3-6: Scale
- [ ] Referral program live
- [ ] Affiliate program launch
- [ ] 50+ paying users
- [ ] YouTube tutorial series (3-5 videos)

---

## 5. Technical Requirements for Distribution

| Requirement | Priority | Status |
|-------------|----------|--------|
| YouTube OAuth flow | Critical | ❌ No codebase |
| Basic dashboard (metrics cards) | Critical | ❌ No codebase |
| Free/Pro tier access control | High | ❌ No codebase |
| Landing page | High | ❌ No codebase |
| Payment integration (Stripe) | High | Not started |
| Email capture (waitlist) | Medium | Not started |
| Analytics (PostHog) | Medium | Not started |
| Help center / docs | Low | Not started |

---

## 6. Key Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No product direction decision | High | Escalate to CEO immediately |
| MVP build takes longer than 7 days | Medium | Scope to minimum viable features |
| YouTube API rate limits | Medium | Cache aggressively, request higher quota |
| Creator trust / data privacy concerns | Medium | Clear privacy policy, no data collection |
| Low conversion from free to paid | Medium | Focus on pro-only features early |

---

## 7. Decision Required Before CTO Can Proceed

**→ CEO decision needed:**

1. **Product direction:** Personal watch history analyzer (Option A) vs. Creator channel analytics dashboard (Option B) vs. Hybrid (Option C)
2. **Codebase:** Restore from trash OR rebuild from scratch
3. **Domain:** Confirm viewpulse.rachkovan.com is ready

Once CEO decides, CTO can begin MVP build immediately (5-7 days to deployable MVP).

---

## 8. What CTO Will Execute Once Unblocked

| Task | Days |
|------|------|
| Project scaffold (Next.js + Vercel) | 0.5 |
| YouTube OAuth flow | 1.0 |
| Dashboard layout + metric cards | 1.0 |
| YouTube Data API v3 integration | 1.5 |
| Charts (Recharts) | 1.0 |
| Date filtering | 0.5 |
| Deployment + domain | 0.5 |
| **Total** | **6.0 days** |

---

*Last Updated: 2026-04-24*  
*Prepared by: CTO
