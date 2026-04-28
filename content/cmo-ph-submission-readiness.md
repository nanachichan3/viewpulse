# Viewpulse PH Submission — Readiness Status
**Date:** 2026-04-28 19:00 UTC | **Originally Due:** 2026-04-28 00:01 UTC | **Rescheduled:** 2026-05-05 00:01 UTC
**Status:** 🚨 POSTPONED — Production site still unreachable

---

## Launch Decision Log

| Time (UTC) | Event | Decision |
|------------|-------|----------|
| 2026-04-27 06:30 | Site unreachable (curl 000) | Escalate to CTO |
| 2026-04-27 13:39 | Readiness doc updated | Set drop-dead at 22:00 UTC |
| 2026-04-28 00:01 | Launch window missed | No submission executed — site still down |
| 2026-04-28 19:00 | CMO Work Session check | Confirmed site still unreachable |
| 2026-04-28 19:00 | **POSTPONEMENT DECISION** | Next available Tuesday: May 5, 2026 |

---

## What's Ready ✅

- [x] PH submission form content (`cmo-product-hunt-submission.md`) — fully filled
- [x] Twitter/X launch thread copy (4 tweets) — ready to post
- [x] Creator outreach DM templates (10 templates in `cmo-outreach-messages-TOP10.md`)
- [x] Top 25 creator outreach tracker (`viewpulse-outreach-tracker.csv`)
- [x] HN launch day checklist (`cmo-hn-launch-day-checklist.md`)
- [x] DevTo blog post (`devto-how-i-built-viewpulse.md`) — ready
- [x] Post-PH LinkedIn post (cmo-post-ph-linkedin-READY.md)
- [x] Post-PH Reddit posts (cmo-post-ph-reddit-READY.md)
- [x] Post-PH Twitter thread (cmo-post-ph-twitter-READY.md)

## Critical Blocker 🚨

**Production site viewpulse.rachkovan.com is STILL NOT reachable** (confirmed 2026-04-28 19:00 UTC: curl returns 000 / connection refused)

**New launch target:** Tuesday, May 5, 2026 at 00:01 UTC

### CTO Requirements Before May 5 Launch
- [ ] Site live and returning HTTP 200
- [ ] 3 PH screenshots captured (see below)
- [ ] Confirmation 24h before launch (May 4 19:00 UTC)

## Post-Submission (First 6 Hours) — Ready for May 5

1. Immediately self-upvote from own account (1x)
2. Post Twitter/X thread (copy in `twitter-launch.md`)
3. DM 10-15 creator friends for upvotes + feedback
4. Engage every PH comment within 2 hours
5. Post to r/contentcreation and r/newtubers (contextually)
6. Post live link to #📣-viewpulse-social

## CTO Handoff — Screenshot Requirements (URGENT)

If site goes live, capture these 3 screenshots:

**Screenshot 1 — Hero Dashboard:**
- Full dashboard with 4 metric cards (total views, watch time, subscriber delta, avg view duration)
- Date range selector visible (7d / 28d / 90d)

**Screenshot 2 — Video Performance Table:**
- Sortable columns: thumbnail, title, views, CTR, avg duration
- Clean data table, minimal chrome

**Screenshot 3 — Retention/Views Chart:**
- Views over time line chart
- Annotated retention patterns
- Clean, readable at small sizes

Save screenshots to `/data/workspace/viewpulse/content/ph-screenshots/`

## PH Submission Protocol (May 5, 2026)

1. Go to https://www.producthunt.com/submit
2. **Name:** Viewpulse
3. **Tagline:** Privacy-first YouTube analytics — your data, your browser.
4. **URL:** viewpulse.rachkovan.com
5. **Description:** Viewpulse is a privacy-first YouTube analytics dashboard that shows you what YouTube Studio hides. CTR by traffic source, avg view duration patterns, subscriber deltas, and watch time trends — all processed client-side. No data collection, no Google OAuth required beyond initial connection.
6. **Topics:** Productivity, AI, Developer Tools, SaaS, Analytics
7. **Submit at exactly 00:01 UTC** (not 00:00 — avoid spam filter)
8. Immediately self-upvote (1x, from own account)

---

*Updated by CMO Work Session | 2026-04-28 19:00 UTC | Next review: May 4, 2026*
