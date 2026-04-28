# Viewpulse — Reddit Launch Posts

> **Purpose:** Draft launch posts for r/youtube and r/contentcreation
> **Created:** 2026-04-24 | **Stage:** MVP | **Status:** Draft — ready to post

---

## POST 1 — r/youtube

**Title (Option A — "I Built This" angle):**
> I built Viewpulse because YouTube Studio doesn't show me what I actually need

**Title (Option B — Pain Point First):**
> YouTube Studio shows you views. It doesn't show you why your CTR is 2% on one video and 8% on another.

---

**Body:**

I run a YouTube channel (niche: [your niche]). YouTube Studio was fine for basics — views, likes, subscriber count. But I kept asking myself questions it couldn't answer:

- Why does Video A have 2% CTR but Video B has 8% when they're both about the same topic?
- My average view duration looks "fine" — but which parts are people dropping off?
- My subscriber count went up. My views went down. What's actually happening?

So I built Viewpulse to answer those questions.

**What Viewpulse shows you:**
- CTR breakdown per video (with audience retention context)
- Avg view duration with drop-off patterns
- Subscriber delta trends (gained vs lost per video, not just net change)
- Watch time patterns across your entire catalog

It's not a replacement for YouTube Studio — it's what you reach for when YouTube Studio tells you nothing useful.

Built with YouTube Data API v3. Connects via OAuth. No data collection — everything stays on your channel.

**→ viewpulse.rachkovan.com** (currently in MVP — connecting YouTube is the whole app)

---

**Why this post works:** Leads with the specific pain ("YouTube Studio doesn't show me what I actually need"), not the product. Authentic "I built this" tone. Includes real questions the creator was asking. Ends with clear CTA and honest MVP framing.

---

## POST 2 — r/contentcreation

**Title:**
> Built a free dashboard to see CTR, avg view duration, and subscriber trends your YouTube Studio doesn't show you

**Body:**

Question for other creators: when YouTube Studio tells you something looks off, how do you actually investigate it?

I've been building [tools/sites] as a side project, and I kept running into the same wall: YouTube Studio shows you the number. It doesn't show you the pattern.

So I put together a small dashboard that pulls from the YouTube Data API and shows:

- **CTR per video** — sorted, with thumbnail context so you can actually tell which video is which
- **Avg view duration** — not just the number, but the trend across your catalog
- **Subscriber delta** — gained vs lost per video, not just the net
- **Watch time patterns** — views grouped by day/week so you can see if your audience watches on mobile vs desktop, weekday vs weekend

No login required (OAuth with YouTube, you control everything). No data stored anywhere. It's just a dashboard connecting to your own channel data.

Still MVP — happy to hear what you'd want to see next.

**→ viewpulse.rachkovan.com**

*(Happy to answer questions about the build too — Next.js, YouTube Data API v3, Recharts for the charts)*

---

**Visual suggestion for both posts:** Screenshot of the Viewpulse dashboard showing real (or mock) channel data. Blur the channel name if private. Show the 4 metric cards + one chart clearly.

---

*Drafted by CMO | Viewpulse | 2026-04-24*
