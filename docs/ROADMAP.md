# Viewpulse — Development Roadmap

**Version:** 1.0  
**Date:** 2026-04-27  
**Status:** Pending Founder Approval  
**Author:** CEO (Nanachi), with CMO strategic input

---

## 🧭 Strategic Direction

Viewpulse is a **privacy-first YouTube watch history analyzer**. Upload your Google Takeout, get instant analytics — 100% client-side, no accounts, no backend, no data leaves your browser. It has pivoted definitively away from the old creator analytics product (OAuth, subscriptions, backend API) to a **watcher product** that serves any YouTube user curious about their own consumption patterns.

**Core differentiator:** Privacy-first + zero friction. No signup, no data collection, instant results.

**Target user:** Anyone with a YouTube history who wants to see *what they actually watch* — data-curious consumers, digital self-awareness seekers, privacy-conscious users, data hoarders.

---

## 📋 Phase Overview

| Phase | Focus | Timeline | Key Goal |
|-------|-------|----------|----------|
| Phase 1 | MVP Polish | Week 1-2 (Apr 27 – May 10) | Land on a polished, launch-ready product |
| Phase 2 | Launch | Week 2-3 (May 11 – May 17) | Drive initial users + validate demand |
| Phase 3 | Monetization | Week 3-5 (May 18 – May 31) | First revenue, sustainable model |
| Phase 4 | Growth + Features | Month 2-3 (June – July) | Scale usage, deeper analytics |

---

## Phase 1: MVP Polish (Week 1-2)

**Theme:** "Make it launchable."

The core product works (parser, analytics engine, dashboard all functional). What's missing is polish, error handling, and a landing page that doesn't look like a prototype.

### P0 — Must Ship Before Launch

#### 1.1 Landing Page Redesign
- **What:** The current page.tsx uses inline styles. Integrate with the existing globals.css design system which already has hero bands, bento grids, upload zones, and feature grids. The layout.tsx uses Syne + DM_Sans fonts with dark headers and styled components — the landing page should match.
- **Why:** First impression. Current page is functional but looks unfinished.
- **Effort:** ~4h
- **Owner:** CTO
- **Deliverable:** Polished landing page using existing CSS components (hero-band, upload-zone, feature-grid, cta-footer)

#### 1.2 Sample Data Onboarding
- **What:** Create a small fake `sample-watch-history.html` (50-100 events) and add a "Try a sample" button on the landing page that loads sample data automatically. This is critical because most visitors won't have their Takeout file ready.
- **Why:** Highest documented conversion barrier. If users need to Google Takeout before they can try the tool, most will bounce. Let them see the dashboard in 1 click.
- **Effort:** ~2h
- **Owner:** CTO
- **Deliverable:** Sample file + "Try demo data" button

#### 1.3 Large File Performance
- **What:** The parser and analytics engine both synchronously process the entire history. For users with 10K+ events this can freeze the UI. Implement:
  - Web Worker for parsing (offload DOMParser to worker thread)
  - Chunked analytics computation with requestIdleCallback or similar
  - Progress indicator during processing
- **Why:** A frozen tab is a bounce. Large histories are common (5+ years of daily watching = 15K+ events).
- **Effort:** ~6h
- **Owner:** CTO

#### 1.4 Error Handling & Edge Cases
- **What:** Handle these gracefully:
  - Empty HTML / malformed Takeout file
  - Takeout JSON format (different parser, same schema)
  - Extremely long channel lists (pagination or virtual scroll)
  - Browser compatibility issues with DOMParser
  - File too large for FileReader (blob stream alternative)
  - Race conditions on file re-upload
- **Why:** First-time users encountering errors will not return. Every edge case must show a helpful message, not a crash.
- **Effort:** ~4h
- **Owner:** CTO

#### 1.5 URL & Brand Cleanup
- **What:** Update SEO metadata (seo.ts references self-degree.com/site, needs to be viewpulse.rachkovan.com). Update robots.ts, sitemap.ts. Set NEXT_PUBLIC_GITHUB_URL. Remove remaining references to old creator product. Update the GitHub repo description/README.
- **Why:** SEO foundations, broken links, brand confusion.
- **Effort:** ~1h
- **Owner:** CTO

### P1 — Ship Within Phase 1 If Possible

#### 1.6 Mobile Responsiveness
- **What:** The dashboard grid (db-grid with CSS grid) works on desktop but needs testing and cleanup on mobile. The timeline filter may need touch optimization.
- **Why:** Significant traffic will come from mobile (Reddit, Twitter, HN).
- **Effort:** ~3h
- **Owner:** CTO

#### 1.7 Export UX Enhancement
- **What:** Export already exists (Noir/Ivory themes, Executive/Studio/Minimal variants) but triggers via dialog. Add:
  - "Copy to clipboard" for key stats
  - PNG export option via html2canvas
  - Better UX for the export theme picker
- **Why:** Export is a shareability driver. Better export = more sharing = more traffic.
- **Effort:** ~3h
- **Owner:** CTO

#### 1.8 Keyboard Navigation + Accessibility
- **What:** Add focus indicators, accessible labels to charts, ARIA roles to dashboard tiles, keyboard navigation for channel selection.
- **Why:** HN / developer communities notice accessibility. Good signal for a quality tool.
- **Effort:** ~2h
- **Owner:** CTO

### Phase 1 Success Gates

| Gate | Metric | How to Check |
|------|--------|-------------|
| Landing page polished | Consistent styling with globals.css | Visual review |
| Sample data works | 1-click → dashboard with 50+ events | Manual test |
| Large file OK | 10K events parse in <1s without freezing | Performance test |
| No error states | Upload invalid file → helpful message, not crash | Manual test |
| Mobile passable | All dashboard tiles visible on 375px width | Manual test |

---

## Phase 2: Launch (Week 2-3)

**Theme:** "Get users in the door."

### 2.0 — Launch Foundation (P0, Must Do Before Any Launch Posting)

| Task | Owner | Effort | Notes |
|------|-------|--------|-------|
| Finalize tagline & one-liner | CEO/CMO | — | Use CMO recommendation: "Upload your YouTube watch history. See what you actually watch." |
| Write Product Hunt submission | CMO | 2h | Incorporate watcher positioning; adapt from old PH draft |
| Draft Show HN post | CMO | 2h | Technical angle: "I built a fully client-side YouTube watch history analyzer" |
| Draft Reddit posts for r/privacy + r/DataHoarder | CMO | 3h | Different angles per subreddit |
| Create Twitter/X launch thread | CMO | 2h | 4-5 tweets with screenshots |
| Record 30-second demo GIF | CMO | 1h | Upload → dashboard flow |
| Wire up basic privacy-respecting analytics | CTO | 2h | Plausible or Umami or just Vercel Analytics — no trackers |
| Create Takeout guide page | CMO | 2h | SEO play: "how to download YouTube watch history" |
| Open source the parser lib on GitHub | CTO | 1h | Good developer community signal |

### 2.1 — Launch Cadence (Recommended)

| Day | Action | Channel | Owner |
|-----|--------|---------|-------|
| **Day 0** (Monday) | Pre-seed: r/privacy + r/DataHoarder Reddit posts | Reddit | CMO |
| **Day 1** (Tuesday) | **Product Hunt** launch (00:01 UTC, aim for Tuesday) | PH | CMO |
| **Day 2** (Wednesday) | **Show HN** post (9-11 AM PT optimal) | HN | CMO |
| **Day 3** (Thursday) | Twitter/X launch thread | Twitter | CMO |
| **Day 4-7** | Engage PH/HN/Reddit comments, iterate | All | CMO |
| **Day 5-7** | Dev.to technical blog post | Dev.to | CTO |

**Key launch insight:** HN and PH have very different audiences. PH rewards visual polish and "product" framing. HN rewards technical depth and "I built this" authenticity. **Draft both angles separately — don't cross-contaminate.**

### 2.2 — Launch Channels (Priority Matrix)

| Channel | Priority | Angle | Expected Impact |
|---------|----------|-------|----------------|
| **Hacker News (Show HN)** | **P0** | "Fully client-side, no backend, no accounts — just upload and see your YouTube diet" | 2K-10K visits if it gains traction |
| **Product Hunt** | **P0** | "Personal insight tool — understand your YouTube consumption, privacy-first" | 500-3K visits; social proof + backlinks |
| **r/privacy** | **P0** | "100% client-side YouTube history analyzer — your data never leaves the browser" | 200-1K visits; highly engaged |
| **r/DataHoarder** | **P0** | "I analyzed 5 years of my YouTube history with a local tool — here's what I built" | 1K-5K visits; exact audience match |
| **r/dataisbeautiful** | **P1** | Post an interesting data viz generated by the tool (anonymized) | Viral potential (21M subs) |
| **Twitter/X** | **P1** | Thread with screenshots + findings | 1K-5K impressions |
| **Dev.to** | **P1** | Technical writeup: architecture, parsing, client-side analytics | 500-2K visits; SEO value |
| **r/YouTube** | **P1** | Framed as "see what you actually watch" not "grow your channel" | 500-2K visits |
| **LinkedIn** | **P2** | Digital self-awareness / productivity angle | Slow burn, brand building |
| **GitHub** | **P2** | Open source the tool or parser component | Community building |

### 2.3 — Launch Content Assets Checklist

| Asset | Status | Priority |
|-------|--------|----------|
| Landing page rewritten for watcher product | ❌ Needs work | P0 |
| Product Hunt submission | ❌ Needs rewrite from old creator PH draft | P0 |
| Show HN post draft | ❌ Create new | P0 |
| r/privacy + r/DataHoarder posts | ❌ Create new | P0 |
| Twitter/X launch thread | ❌ Create new | P1 |
| 30-second demo GIF | ❌ Create | P0 |
| Sample watch-history.html | ❌ Create (CTO Phase 1) | P0 |
| Takeout guide page (SEO) | ❌ Create | P1 |
| Dev.to blog post | ❌ Create | P1 |
| GitHub repo README | ❌ Update from old product | P1 |

### Phase 2 Success Metrics

| Metric | 7-Day Target | 30-Day Target |
|--------|-------------|---------------|
| Dashboard sessions | 250 | 2,000+ |
| Upload completion rate | >50% | >60% |
| Avg time on dashboard | >60s | >90s |
| PH ranking | Top 15 | Top 10 |
| HN upvotes | >20 | >50 |
| Reddit engagement | >50 combined karma | — |
| Return rate | — | >15% (return within 14 days) |

---

## Phase 3: Monetization (Week 3-5)

**Theme:** "Turn attention into revenue."

### 3.0 — The Monetization Decision

The old product had a $12/mo subscription model for creators. For the **watcher product**, subscriptions don't fit — users analyze their history once or a few times, not monthly.

**Recommended model:** Freemium with one-time Pro unlock + donations.

| Tier | Price | Features | Rationale |
|------|-------|----------|-----------|
| **Free** | $0 | Up to 10MB files (~2-3yr history), full dashboard, basic CSV export | Genuinely useful — gets users hooked |
| **Pro** | **$9.99 one-time** | Unlimited files, year-over-year comparison, premium PDF export, deep keyword analysis, priority new features | Low friction, aligns with usage pattern (analyze once, pay once) |
| **Supporter** | **Free + tip** | Same as Free but with "Support Viewpulse" buy-me-a-coffee link | Supplementary income, good for goodwill |

**Why not subscription:**
- Watcher usage is episodic, not recurring
- Most users analyze once or twice a year
- Near-zero marginal cost doesn't justify monthly billing
- Subscription would create friction that contradicts "no accounts" positioning

**Revenue projection:**
- 3-8% Pro conversion (typical for freemium tools)
- At 10K users: 500 Pro × $9.99 = ~$5K
- Plus donations: 1-2% × $3 avg = $300-600

### P0 — Must Ship

#### 3.1 File Size Enforcement
- **What:** Detect file size client-side. Show a clear banner when file exceeds the free tier limit ("Your file is 15MB. Pro users can upload unlimited files.") with a "Go Pro" CTA.
- **Effort:** ~2h
- **Owner:** CTO
- **Note:** Enforcement is purely client-side (no backend to check). Can be bypassed by technical users — this is acceptable for MVP. The honest users will pay.

#### 3.2 One-Time Payment Flow
- **What:** Integrate Stripe Checkout or Gumroad for $9.99 one-time payment. No accounts needed — use a token-based unlock:
  1. User clicks "Go Pro"
  2. Stripe Checkout opens ($9.99)
  3. On success, generate a simple license key / store in localStorage
  4. Pro features unlock
- **Effort:** ~8h (first Stripe integration is always slow)
- **Owner:** CTO
- **Alternative:** Gumroad (faster integration, handles tax/compliance, ~$0.30 + 5% fee)

#### 3.3 Pro Feature Gating
- **What:** Gate these features behind Pro:
  - Unlimited file size (no 10MB limit)
  - Year-over-year comparison charts
  - Premium PDF report export (Noir/Ivory themed, full branding)
  - Deep keyword analysis (frequency over time, trend detection)
- **Effort:** ~3h
- **Owner:** CTO

### P1 — Ship Within Phase 3 If Possible

#### 3.4 Donation / Support Button
- **What:** Add "Support Viewpulse" button (Buy Me a Coffee or GitHub Sponsors) on the landing page and dashboard footer.
- **Effort:** ~30 min
- **Owner:** CMO

#### 3.5 Premium Reports (Microtransaction Option)
- **What:** For users who don't want Pro, offer single premium PDF exports at $2.99 each. This creates a lower-friction entry point to paying.
- **Effort:** ~2h (reuse Stripe/Gumroad integration)
- **Owner:** CTO

### Phase 3 Success Gates

| Gate | Metric | Notes |
|------|--------|-------|
| Pro launches | Revenue starts | Track via Stripe |
| Conversion rate | >3% of users | Free → Pro |
| Gross revenue | >$100 in first 30 days of monetization | Lean startup bar |
| No user friction complaints | Negative feedback on paywall | Monitor Reddit/PH comments |

---

## Phase 4: Growth + Features (Month 2-3)

**Theme:** "Deepen engagement, broaden reach."

### P0 — High Impact

#### 4.1 Multi-File Merge
- **What:** Allow users to upload multiple Takeout exports (e.g., from different Google accounts or multiple export downloads spanning different periods). Merge and deduplicate events before analysis.
- **Why:** Users with very long histories may have split Takeout exports. Also enables comparing different periods.
- **Effort:** ~4h
- **Owner:** CTO

#### 4.2 Yearly Comparison View
- **What:** Side-by-side comparison of two years (or periods). E.g., "2024 vs 2025: how did your watching change?" Shows channel ranking shifts, total watch count delta, hourly pattern changes.
- **Why:** High delight factor. "I can't believe I watched 40% less YouTube this year" is a shareable insight.
- **Effort:** ~6h
- **Owner:** CTO
- **Note:** This becomes a Pro feature (or Pro gets earlier access).

#### 4.3 Trend Detection
- **What:** Identify channels that are "rising" or "falling" in your watch history across the date range. Show which channels you're watching more/less of over time.
- **Why:** Medium effort, high stickiness — makes the dashboard a tool for self-reflection, not just a one-shot curiosity.
- **Effort:** ~6h
- **Owner:** CTO

### P1 — Medium Impact

#### 4.4 SEO Content Pages
- **What:** Create blog posts / landing pages targeting:
  - "YouTube watch history analyzer"
  - "How to view your YouTube watch history"
  - "Google Takeout YouTube analysis"
  - "YouTube Wrapped alternative"
- **Why:** Long-tail SEO. This is the primary long-term traffic driver.
- **Effort:** ~3h per post
- **Owner:** CMO

#### 4.5 Theme / Share Card Generation
- **What:** Generate a shareable "My YouTube Year" image card (1200×630) that users can screenshot and share on social media. Includes top 3 channels, total watched, peak hour, binge day.
- **Why:** Viral loop. Each share is free marketing.
- **Effort:** ~4h
- **Owner:** CTO

#### 4.6 Watch Time Estimation
- **What:** Add estimated watch time (total hours watched based on average YouTube video length, or more detailed estimation). Visualize "time spent" in relatable units (e.g., "That's 14 days of continuous watching").
- **Why:** Powerful emotional hook. "I've watched 3 months of YouTube" is more visceral than "10,000 videos."
- **Effort:** ~3h
- **Owner:** CTO

### P2 — Nice to Have

#### 4.7 Dark Mode
- **What:** Add dark theme toggle for the dashboard (already has both tile-dark and tile-card variants — just needs a toggle).
- **Effort:** ~2h
- **Owner:** CTO

#### 4.8 PWA / Offline Support
- **What:** Service worker to cache the app shell. Users who have visited once can use the tool offline — perfect for analyzing Takeout files on a plane or in low-connectivity environments.
- **Effort:** ~3h
- **Owner:** CTO

#### 4.9 Weekly Digest Email (Post-MVP)
- **What:** If we ever add accounts (big if), offer a weekly email with trends from users who opt in. Requires backend.
- **Effort:** ~8h
- **Owner:** CTO (blocked on accounts decision)

#### 4.10 Browser Extension
- **What:** A simple Chrome extension that detects when you're on YouTube and shows a "Viewpulse" button to open your watch history analysis. Could also offer real-time session stats ("You've watched 30 videos today").
- **Effort:** ~10h
- **Owner:** CTO
- **Note:** Only do this if Phase 2 shows strong traction. Not MVP.

### Phase 4 Success Gates

| Gate | Metric | Notes |
|------|--------|-------|
| Return rate | >20% return within 30 days | Users come back |
| Organic traffic | >30% of traffic from search | SEO starting to work |
| Revenue | >$500/mo | Sustainable |
| Shares | >100 share-card exports or social shares | Viral loop active |

---

## 💰 Monetization Model (Detailed Recommendation)

### Primary Model: Freemium + One-Time Pro

| Aspect | Detail |
|--------|--------|
| **Free tier** | Up to 10MB files. Full dashboard. Basic export (CSV). |
| **Pro ($9.99 once)** | Unlimited files. Year-over-year comparison. Premium PDF export. Deep keyword analysis. Priority new features. |
| **Supporter** | Buy Me a Coffee / GitHub Sponsors button. No feature difference. |

**Rationale:**
- Aligns with usage pattern (analyze once or twice, not every month)
- No subscription fatigue
- Near-zero marginal cost makes one-time pricing viable
- File size limit feels fair — not dark pattern, just "your history is big enough to need the paid version"
- No accounts required for Pro (localStorage token)

### Secondary Model: Premium Reports ($2.99 each)

Add as a lower-friction entry point to paying. Free users can purchase a single premium PDF report without buying full Pro.

---

## 🚀 Recommended Launch Sequence (Detailed)

```
Week 1 (Apr 27 – May 3): Phase 1 — Polish
  ├── Landing page redesign
  ├── Sample data onboarding
  ├── Large file perf + error handling
  └── URL/brand cleanup

Week 2 (May 4 – May 10): Phase 1 — Finish + Launch Prep
  ├── Mobile responsiveness (if not done)
  ├── Export UX enhancement (if not done)
  ├── Launch assets creation (CMO)
  ├── Open source parser lib
  └── Privacy-respecting analytics

Week 3 (May 11 – May 17): Phase 2 — Launch Week
  ├── Day 0: Reddit (r/privacy, r/DataHoarder)
  ├── Day 1: Product Hunt
  ├── Day 2: Hacker News Show HN
  ├── Day 3: Twitter/X thread
  └── Days 4-7: Engage, iterate, Dev.to post

Week 4 (May 18 – May 24): Phase 3 — Monetization
  ├── File size enforcement (Free tier limit)
  ├── Stripe/Gumroad integration
  ├── Pro feature gating
  └── Donation / Support button

Week 5 (May 25 – May 31): Phase 3 — Monetization Refine
  ├── Monitor conversion, fix friction points
  ├── Premium reports microtransaction (if warranted)
  └── Revenue optimization

Month 2-3 (June – July): Phase 4 — Growth + Features
  ├── Multi-file merge
  ├── Yearly comparison view (Pro feature)
  ├── Trend detection
  ├── SEO content pages
  ├── Share card generation
  ├── Watch time estimation
  └── Dark mode / PWA
```

---

## ⚠️ Key Risks & Unknowns

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Google Takeout barrier** — users have to export from Google before they can try the tool | **HIGH** | Sample data button (P0). Clear Takeout guide. Accept that this will always be a conversion bottleneck. |
| **One-time novelty** — users see their dashboard once and never return | **MEDIUM** | Yearly comparison, trend detection, share cards, multi-file merge all create reasons to come back. But the core experience is inherently one-shot. |
| **Takeout format variants** — Google changes the HTML structure or adds new JSON formats | **HIGH** | Monitor GitHub issues for parse failures. Write the parser defensively. Add JSON format support (already partially in parser.ts). |
| **Privacy scrutiny** — "privacy-first" promises invite auditing. Any tracker or analytics tool will be called out. | **MEDIUM** | Use Vercel Analytics (privacy-respecting) or Plausible. No cookies. No fingerprinting. Open source the code. |
| **Large file memory** — browser can only handle so much data in memory. 50K+ events may crash. | **LOW** | Web Worker + paginated processing. If a user has 50K events across all time, handle gracefully or add a "this is a lot of data" warning. |
| **Competition** — there are other YouTube Takeout analyzers, YouTube Wrapped clones | **LOW** | Privacy-first + open source + polished UX is the differentiator. Most competitors upload data to servers or look low-effort. |
| **No backend = no email capture** — hard to build a mailing list without accounts | **LOW** | Optional email input for "Notify me when year-over-year comparison launches" or similar. Don't require it. |
| **Revenue ceiling** — one-time $9.99 pricing limits revenue potential without huge scale | **MEDIUM** | Acceptable for a side project. If traction is strong, add annual Pro+ tier with cloud sync / account features. |

---

## 📊 Success Criteria (30-Day View)

### Tier 1: Must Hit (minimum viable launch)
- 500+ unique users who complete the upload flow
- >60% upload-to-dashboard completion rate
- Average 90s+ time on dashboard
- <5% error rate from file parsing
- No privacy complaints (social media or direct)

### Tier 2: Growth Signal (good launch)
- 2,000+ users
- Product Hunt Top 10
- HN >50 upvotes
- >3% Pro conversion rate
- First organic Reddit post (unprompted)

### Tier 3: PMF Signal (great launch)
- 5,000+ users
- >15% return rate (users who upload again with new data)
- Organic search traffic >30% of total
- 5+ unprompted social shares
- Revenue >$500

---

## 📁 Immediate Action Items

### CTO (This Week)
1. Redesign landing page to use globals.css design system
2. Create sample watch-history.html + "Try demo" button
3. Fix large file performance (Web Worker)
4. Harden error handling for edge cases
5. Update SEO metadata + brand references
6. (Phase 1.5) Open source parser lib on GitHub

### CMO (This Week)
1. Rewrite all CMO docs from creator → watcher positioning
2. Write new landing page copy (tagline, subhead, feature descriptions)
3. Draft Product Hunt submission (watcher positioning)
4. Draft Show HN post
5. Draft Reddit posts (r/privacy, r/DataHoarder)
6. Create demo GIF
7. Write Takeout guide page (SEO play)

### CEO (This Week)
1. ✅ Review and approve this roadmap
2. Align on launch week date (target: May 11)
3. Finalize pricing decision (recommendation: $9.99 one-time Pro)
4. Ensure CTO + CMO have clear priorities

---

## 📝 Appendix: Positioning Decision

**CMO recommended positioning:**

> **Primary: "Your YouTube diet, visualized."** — Digital self-awareness tool. Non-judgmental, curious, fun. Appeals to broadest audience.
>
> **Secondary: "They know. Now you know."** — Privacy empowerment angle. Used for HN, r/privacy, developer communities.
>
> **Tagline:** "Upload your YouTube watch history. See what you actually watch."

**Rejected:** "The Wrapped Experience" — too seasonal, invites unfavorable Spotify comparison, undermines "tool you use anytime" positioning.

---

*Prepared by CEO with CMO strategic input. Pending Yev's approval.*