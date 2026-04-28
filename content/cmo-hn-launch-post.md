# Viewpulse — Show HN Launch Post
**Project:** Viewpulse | **Output:** `/data/workspace/viewpulse/content/cmo-hn-launch-post.md`
**Date:** 2026-04-25 | **Status:** Draft — Ready to submit (NOT YET POSTED)
**Submission URL:** https://news.ycombinator.com/submit
**Best time to post:** 9:00 AM EST, Tuesday–Thursday

---

## Show HN Submission

**Title (Recommended):**
```
Viewpulse — I built a YouTube analytics dashboard because YouTube Studio couldn't answer "why does this video outperform that one?"
```

**Body:**

> Hey HN! I built [Viewpulse](https://viewpulse.rachkovan.com) — a YouTube analytics dashboard for creators who want to understand their data, not just count views.
>
> **The problem I was trying to solve:**
> YouTube Studio shows you views. It doesn't show you *why*.
>
> I'd post a video, watch it outperform another one, and have no idea what happened. YouTube Studio gave me charts. What I needed was answers.
>
> So I started exporting CSVs and building my own views. Viewpulse is what I ended up with.
>
> **What it does:**
> - Upload your YouTube watch history (takeout.zip — 100% client-side, nothing leaves your browser)
> - See retention curves with annotated drop-off points
> - CTR breakdown by traffic source (organic search vs. suggested vs. browse)
> - Subscriber delta trends per video — which ones grow your channel vs. which ones just get views
> - Peak watching hours and day-of-week patterns for your audience
> - Average view duration by video type (context matters — 50% retention on a 10-min video ≠ 50% on a 20-min video)
>
> **Why privacy-first?**
> Every other YouTube analytics tool requires your Google account and collects your data. Viewpulse doesn't even ask. No OAuth. No server-side processing. Your watch history never touches a server — everything runs in your browser.
>
> I built it because I wanted to understand my own viewing patterns. Turns out, so do a lot of creators I talked to.
>
> **To try it:**
> → [viewpulse.rachkovan.com](https://viewpulse.rachkovan.com)
>
> First 500 creators get early access during launch week. No signup spam. Just the dashboard.
>
> Would genuinely love your honest feedback — especially from creators who actually live in their analytics and know what they're missing in YouTube Studio.

---

## Alternative Title Options (A/B Test)

1. `Viewpulse — I built a YouTube analytics dashboard because YouTube Studio couldn't answer "why does this video outperform that one?"`
2. `Show HN: Viewpulse — privacy-first YouTube analytics (no Google OAuth, all client-side)`
3. `Viewpulse — a YouTube analytics dashboard that surfaces what YouTube Studio buries`

---

## HN Comment Reply Templates

### When someone asks how it works / technical question:
> Great question! Viewpulse parses your YouTube takeout ZIP entirely in-browser. The data never leaves your machine — it's just a local JSON parse that renders the dashboard. No backend, no server calls.

### When someone asks about the privacy claim:
> Correct — no Google OAuth, no server-side processing. Your takeout.zip is parsed entirely in the browser using JavaScript. The only external calls are loading the app itself (JS/CSS). Your view history, watch patterns, everything stays local.

### When someone asks how it compares to TubeBuddy/VidIQ:
> Good question. The big difference is philosophy — Viewpulse doesn't collect your data or use your Google account. No accounts, no tracking. That means it won't do channel comparisons, keyword research, or "discover what your audience wants" features. It's purely for understanding your own data.
>
> TubeBuddy/VidIQ if you want discovery features and don't mind data sharing. Viewpulse if you want a clean, privacy-first look at your own numbers.

### When someone says "I don't trust uploading my data":
> Totally fair. The source is open ([github.com/rachkovan/viewpulse](https://github.com/rachkovan/viewpulse)) — you can self-host or audit the code. Everything runs client-side, so you can verify what I'm saying with browser devtools. No network calls to any data collection endpoint.

### When someone asks about future features:
> On my list: trend overlays (compare any two videos side by side), audience overlap analysis, and exportable reports. If there's something specific you'd want, I'm tracking everything in a public repo.

### When someone gives critical feedback:
> This is exactly the feedback I needed — thank you. [Acknowledge the specific point]. You're right, that's a real gap. I'm [planning to fix / thinking about how to approach] it.
>
> Would you be open to me following up once I've addressed it?

---

## Launch Checklist for HN Day

- [ ] Post Show HN at 9 AM EST (Tue–Thu)
- [ ] Monitor HN continuously for 4+ hours after posting
- [ ] Reply to every comment within 30 minutes
- [ ] Watch for "dead taps" — low-engagement early votes — and rally with genuine engagement
- [ ] After HN post gains traction (~50+ points), begin creator outreach Phase 1 (Simon Hørup, Swyx, Andrew Chen DMs)
- [ ] Post link in related HN threads if the opportunity arises naturally
- [ ] If post gets flagged/removed, revise and retry 24h later with softer language

---

*Prepared by: CMO Subagent — Viewpulse HN Launch Post*
*Date: 2026-04-25*
*HN NOT YET POSTED — submit on preferred launch day*
