# Show HN: Viewpulse — Privacy-first YouTube analytics for creators

**Link:** [viewpulse.rachkovan.com](https://viewpulse.rachkovan.com)

---

## The story

I kept asking myself: "Why does video A outperform video B?"

YouTube Studio has the answer somewhere — but it buries it under noise, graphs that don't tell you anything, and a UI that feels designed to confuse. I was exporting CSVs just to answer basic questions about my own channel.

So I built Viewpulse. A clean analytics dashboard that shows what actually matters:

- **CTR per video** — not just the aggregate
- **Avg view duration trends** — week over week
- **Subscriber deltas** — gained/lost per video
- **Watch time patterns** — what's working, what's not

## What makes it different

Most creator analytics tools track **you**. They collect your data, sell it back as "insights," and build a product around your audience. VidIQ does this. TubeBuddy does this.

Viewpulse is different by design:

- **No data collection** — your YouTube OAuth token goes directly to Google's API, only you see your data
- **No accounts** — there's nothing to hack or leak
- **No third-party scripts** — zero trackers on the site
- **Your data stays yours** — the server fetches it, displays it, and throws it away

This isn't a privacy feature I added later. It's the entire reason Viewpulse exists.

## Tech stack

Built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Recharts. Uses YouTube Data API v3 via OAuth 2.0. Deployed on Vercel.

```
YouTube OAuth → Your Browser → Viewpulse Server → Google API → Your Browser
                         ↓
                  Nothing is stored.
                  Nothing is tracked.
```

## What YouTube Studio hides

YouTube Studio shows you views. It doesn't show you:

- Why one thumbnail drives 8% CTR and another drives 2%
- Whether viewers are dropping off at 0:30 or 2:00
- If you're gaining subscribers or just getting casual viewers
- Which videos are building your channel vs. which are one-hit wonders

Viewpulse surfaces these patterns so you can actually learn from your data.

## Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 channel, 7d/28d view data, 20 videos |
| **Pro** | $9/mo | All date ranges, unlimited videos, export-ready data |
| **Studio** | $29/mo | 5 channels, comparative analytics |

## Try it out

**[viewpulse.rachkovan.com](https://viewpulse.rachkovan.com)** — Connect your YouTube channel and see your real stats.

No sign-up required. No email. No "we'll send you updates." Just your data, displayed clearly.

---

**Submission notes:**
- Post at 9am UTC for best visibility
- Maintain karma > 10 before posting
- Reply to every comment for the first 2 hours
- Keep an eye on the thread through the day
- If it gets traction, consider a follow-up post the next day with "thanks for the feedback, here's what I changed"
