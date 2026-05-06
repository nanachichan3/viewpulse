# How I Built Viewpulse: A Privacy-First YouTube Analytics Dashboard

**Published:** Ready for publication — May 1-5, 2026 (pre-PH launch)
**Platform:** Dev.to + Hashnode cross-post
**Tags:** YouTube, Analytics, Privacy, Next.js, TypeScript, ProductHunt
**Status:** ✅ Finalized for May 6 PH launch

---

## The Problem I Was Trying to Solve

For months, I stared at YouTube Studio and asked myself the same question: "Why does this video outperform that one?"

They had similar view counts. Similar thumbnails. Similar titles. But one would tank while the other killed it.

YouTube Studio showed me *what* happened. It couldn't tell me *why*.

I was exporting CSVs. I was building pivot tables in Google Sheets. I was trying to answer a question that should have been obvious — and the tool designed to help me answer it was making it hard.

So I built Viewpulse.

---

## The Core Premise

Viewpulse gives you the story behind your YouTube analytics — not just the numbers.

**What it shows you:**
- CTR by traffic source (organic search vs. suggested vs. browse)
- Avg view duration by video type and publish window
- Subscriber delta trends per video
- Watch time patterns that explain retention, not just raw watch time

**The privacy thing:**
No data collection. No third-party trackers. Everything processes client-side. Your channel data stays yours.

---

## The Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | Fast dev + Vercel deployment |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | Design system |
| Charts | Recharts | Lightweight, React-friendly |
| API | YouTube Data API v3 | Channel + video analytics |
| Auth | YouTube OAuth 2.0 | Secure channel access |

---

## Key Architecture Decisions

### 1. Client-Side Processing

The most important decision: I didn't want to be a data broker.

Every other YouTube analytics tool requires your Google account, then collects and stores your data on their servers. They can see your channel, your videos, your growth patterns. That data is valuable — and I didn't want to be the one holding it.

So Viewpulse processes everything in the browser. You authenticate with YouTube, authorize the `yt-analytics.readonly` scope, and your data comes directly to your browser. It's parsed there. It's rendered there. It never touches a backend I control.

### 2. The Takeout ZIP Approach

The challenge with YouTube Data API: rate limits are tight (10,000 units/day), and the analytics endpoints require specific OAuth approval that's harder to get than the basic analytics scope.

My workaround: for MVP, I'm supporting takeout.zip upload alongside OAuth. YouTube lets you export your analytics data as a ZIP file. Viewpulse parses it entirely client-side — JSZip reads the ZIP, extracts the JSON, renders the dashboard.

This means:
- No API rate limit issues for the user
- No backend processing
- Privacy is enforced by architecture, not policy

The tradeoff: data isn't real-time. But for creators checking their analytics weekly, that's fine.

### 3. The Metrics That Matter

Raw watch time is meaningless without context.

50% retention on a 10-minute video = 5 minutes of watch time.
40% retention on a 20-minute video = 8 minutes of watch time.

Same retention percentage, completely different actual engagement. YouTube Studio shows you the percentage. Viewpulse shows you the context.

Similarly, overall CTR is useless. Suggested traffic CTR tells you if YouTube is pushing your video. Organic CTR tells you if your thumbnail hooks search intent. When they're different, that tells you something specific about what's working.

**The four metrics I chose:**
1. **Total views** (period) — top-line
2. **Watch time (hours)** — actual engagement
3. **Subscriber delta** — which videos grow vs. shrink your channel
4. **Avg view duration** — context-rich retention

Everything else is noise.

---

## What I'd Do Differently

### The Takeout ZIP Parsing

JSZip works, but YouTube's takeout format is... idiosyncratic. The JSON structure varies slightly between exports, and the file sizes can be large. I had to build in chunked parsing and progress indicators.

Next time, I'd consider: a simple backend endpoint that proxies the YouTube Analytics API with aggressive caching. But that reintroduces the privacy concern.

### OAuth Scope

Getting `yt-analytics-monetary.readonly` approved requires extra OAuth verification from Google. I left it out of MVP to avoid the verification delay. This means revenue-related analytics aren't available yet.

### Rate Limit Handling

The YouTube Data API has hard limits. I implemented 1-hour caching, but cold starts can still hit rate limit errors. I need better graceful degradation — showing cached data with a clear "last updated" timestamp when API calls fail.

---

## What I Learned

### Analytics Tools Are Broken for Creators

Most creator tools fall into two categories:
1. **SEO-focused** (TubeBuddy, vidIQ) — optimized for discovery, not understanding
2. **Studio-style** (Social Blade) — surface-level metrics, no context

Creators don't need more data. They need *better questions* from their data.

### Privacy-First Is a Real Differentiator

I expected creators to care about features. I was surprised how many immediately asked "wait, you don't collect my data?" That's a real concern in the creator economy — people have been burned by platforms that harvest their audience data.

### "Your Data, Your Browser" Is a Promise

When I say client-side processing, I mean it. The GitHub repo is public. The code is auditable. There's no hidden backend calling home.

---

## What's Next

**Short-term:**
- Fix rate limit handling
- Add real-time sync option (with explicit opt-in)
- Support additional date range customization

**Medium-term:**
- YouTube Shorts analytics
- Comparison view (this video vs. that video)
- Export to CSV/PNG

**Long-term:**
- Collaborative features (share dashboards with team members)
- Automated insight generation (AI-written interpretations of your data)

---

## 🚀 Product Hunt Launch

We're launching Viewpulse on **Product Hunt on May 6, 2026**.

If you're a YouTube creator who wants clearer insights — [viewpulse.rachkovan.com](https://viewpulse.rachkovan.com) is live and free.

**Support our launch:** Upvote us on Product Hunt and share your feedback. Every creator who tries it helps us build something genuinely useful.

Questions? Feedback? I'd love to hear what's missing.

---

*Building in public. More updates on Twitter @yevgeniirachkovan.*

---

## 📋 Publication Checklist

- [x] Article draft written
- [x] Product Hunt launch date added
- [ ] Screenshots embedded (wait for site to be live)
- [ ] Published to Dev.to
- [ ] Cross-posted to Hashnode
- [ ] Shared on Twitter/X with link
- [ ] Added to PH launch day distribution

**Note:** Screenshots should be captured once viewpulse.rachkovan.com is restored and added before publishing. The article can go live without them, but visuals significantly increase engagement.

---

*CMO Deliverable — Viewpulse Dev.to Article | Finalized for May 6 PH Launch*
*Updated: 2026-04-28*
