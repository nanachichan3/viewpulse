# Viewpulse — Launch Plan
**Version:** 1.0 | **Date:** 2026-04-26 | **Owner:** CMO
**Status:** MVP shipped 2026-04-25 — executing launch plan now

---

## 1. Product Status

Viewpulse MVP is live at **viewpulse.rachkovan.com** — privacy-first YouTube analytics dashboard for content creators. All core features are functional: OAuth connection, dashboard with 4 metric cards, video performance table, views-over-time chart, top-videos chart, date range selector.

**What shipped:**
- YouTube OAuth connection (`yt-analytics.readonly` scope)
- Dashboard: total views, watch time, subscriber delta, avg view duration
- Video performance table (sort, paginate)
- Views over time chart (Recharts, line/bar)
- Top videos horizontal bar chart (top 10 by views)
- Date range selector (7d / 28d / 90d / custom)
- Vercel deployment + domain

**Known gaps being tracked:**
- Rate limit handling (1hr cache implemented; cold start resets)
- OAuth token refresh (not tested with real expired tokens)
- `yt-analytics-monetary.readonly` scope (requires extra OAuth approval)

---

## 2. ICP

### Primary: Mid-Tier YouTube Creators (10K–500K subscribers)
- Actively tracking analytics in YouTube Studio
- Want clearer insights (CTR vs. just views)
- Care about watch time patterns, not just subscriber count
- Privacy-conscious — don't want another analytics platform harvesting their data

### Secondary: Small Business YouTube Channels
- Using YouTube for business/marketing
- Want to understand which content drives subscribers
- SEO-focused content creators

### Tertiary: New Creators (under 10K)
- Learning analytics for the first time
- Want a cleaner UI than YouTube Studio
- Attracted by "privacy-first" positioning

---

## 3. Positioning Statement

> *"Your YouTube analytics — without the noise. Privacy-first, no data collection."*

Viewpulse gives creators the insights YouTube Studio doesn't make obvious: CTR trends, avg view duration patterns, subscriber delta over time, watch time per video. The privacy-first promise: no data collection, no third-party trackers, your channel data stays yours.

---

## 4. Launch Plan (7-Day Sprint)

### Day 1 — Launch Day
- **Product Hunt submission** — submit at 00:01 UTC for max visibility
- **Twitter/X launch thread** — announce with key screenshots, "Privacy-first YouTube analytics"
- **Send DM to 10–15 creator friends** — ask for feedback + retweet
- **Update Linktree/bio links** — point to viewpulse.rachkovan.com

### Day 2–3
- **Reddit: r/contentcreation** — "I built a privacy-first YouTube analytics dashboard"
- **Reddit: r/newtubers** — "Tools for tracking your first 10K subscribers"
- **Reddit: r/YouTube** — share with community context (not spam)
- **Monitor Product Hunt comments** — respond within 2 hours

### Day 4–5
- **Indie Hackers "Showcase"** — post launch update
- **Twitter/X follow-up** — share first traction metrics (if available)
- **Dev.to / Hashnode** — "How I built Viewpulse" technical post (CTO angles + CMO visibility)
- **Hacker News (if traction)** — "Show HN" retrospective

### Day 6–7
- **Thank-you DMs** to everyone who engaged
- **Collect testimonials** from early users
- **Update launch assets** with real user quotes
- **Post-launch report** — what worked, what to iterate

---

## 5. Distribution Channels

### Tier 1: High-Impact, Low-Effort
| Channel | Type | Effort | Notes |
|---------|------|--------|-------|
| Product Hunt | Launch platform | Medium | Submit 00:01 UTC for best ranking |
| r/contentcreation | Reddit | Low | 1.2M members, very relevant |
| r/YouTube | Reddit | Low | 4M members, share contextually |
| r/newtubers | Reddit | Low | Beginners, high tool openness |
| Twitter/X threads | Organic | Medium | Creator tool ecosystem |

### Tier 2: Community-Based
| Channel | Type | Effort | Notes |
|---------|------|--------|-------|
| r/videosEditing | Reddit | Low | Engagement-focused creators |
| r/Twitch | Cross-platform | Low | Streamers who cross-post to YouTube |
| YouTube creator Discord servers | Discord | High | Hard to find organically |

### Tier 3: Long-Term / Relationship
| Channel | Type | Effort | Notes |
|---------|------|--------|-------|
| Creator newsletters | Email | High | 50+ identified in prior research |
| Podcast guesting | Audio | High | "Creator Economy" podcasts |
| YouTuber sponsorship | Paid | Very High | Post-MVP |

---

## 6. Key Messaging Angles

- **Privacy-first:** "YouTube Studio shows your data. We don't collect it."
- **Clarity over noise:** "Four charts that actually tell you something — not 20 you have to interpret."
- **For creators who care about growth:** "avg view duration tells you more than views. Viewpulse makes it obvious."
- **Anti-hype:** "No gamification, no social features, no distractions. Just your data."

---

## 7. Post-Launch 30-Day Plan

| Week | Focus | Key Actions |
|------|-------|-------------|
| Week 1 | Launch spike | Product Hunt + Reddit + Twitter |
| Week 2 | Community engagement | Reply to all feedback, collect testimonials |
| Week 3 | Content marketing | Dev.to "how I built" post, Hashnode cross-post |
| Week 4 | Iteration signals | Analyze traffic sources, identify top channels |

---

## 8. Assets Needed

- [ ] Product Hunt launch post (tagline, 3 screenshots, video walkthrough)
- [ ] Twitter/X launch thread (5 tweets, screenshots, "privacy-first" angle)
- [ ] Reddit posts (2–3 versions for different communities)
- [ ] Dev.to blog post (technical build story)
- [ ] Real-time analytics dashboard screenshot
- [ ] 30-second demo video

---

## 9. Launch Metrics (7-Day)

- Product Hunt upvotes: 100+
- Website visitors: 500+
- Waitlist/signups: 50+
- Twitter impressions: 5,000+
- r/contentcreation karma: 20+

---

## 10. Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| YouTube OAuth rate limits | 1hr cache implemented; graceful error messages |
| Low Product Hunt ranking | Focus on early engagement (first 6 hours critical) |
| Reddit post removed as spam | Lead with genuine context, participate before posting |
| No GitHub (product, not SaaS) | Target creator communities, not dev platforms |
