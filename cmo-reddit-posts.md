**Title:** I built a privacy-first YouTube analytics tool after getting frustrated with YouTube Studio

**Body:**

I've been creating on YouTube for a while and was always frustrated with YouTube Studio. It shows numbers but not insights.

So I built Viewpulse — a tool that:
- Shows you trends, not just raw numbers
- Helps you see what's working before your next upload
- Doesn't collect or track your data

Looking for honest feedback from fellow creators.

**What it does:**
- **CTR trend analysis** — See when your click-through rate started trending up or down, with benchmarking
- **Avg view duration patterns** — Understand which video formats keep people watching
- **Subscriber delta tracking** — Spot the videos that gained (or lost) subscribers
- **Privacy-first** — No data collection, no tracking. Your data stays on your device.

YouTube Studio shows you *what* happened. Viewpulse shows you *what's changing* and — more importantly — *why it matters*.

**The pain point:** I've watched friends obsess over YouTube Studio numbers daily, exporting CSV reports to track tiny fluctuations. Half the battle is knowing what you're looking at. Viewpulse tries to surface the signal, not just the noise.

Would love thoughts from the r/YouTube community:

1. Does this solve a real problem for you?
2. What metrics do you wish YouTube Studio showed that it doesn't?
3. Any features you'd want to see?

**Link:** [viewpulse.rachkovan.com](https://viewpulse.rachkovan.com)

Happy to answer questions about the tech stack too (Next.js, TypeScript, YouTube Data API v3).

---

**Title:** Built Viewpulse — privacy-first YouTube analytics that shows trends instead of raw numbers

**Body:**

YouTube Studio gives you a spreadsheet. Viewpulse gives you a dashboard.

I got tired of exporting data to Google Sheets just to see if my CTR was improving or if I was losing subscribers on a specific video. So I built something that does the analysis for you.

**What Viewpulse tracks:**
- CTR trend analysis with historical context
- Average view duration patterns across your content
- Subscriber delta trends per video
- Benchmarks so you know if your numbers are "good"

**The privacy angle:** This is important to me. I don't want to track you. I don't want your data sitting on some server. Viewpulse connects to your YouTube account via OAuth, pulls your analytics, and does the math. Your data doesn't leave your browser (or our server, depending on hosting choice).

Self-hosted version available if you want zero data outside your control.

Looking for feedback from r/contentcreator — does this solve a real workflow problem for you?

**Link:** [viewpulse.rachkovan.com](https://viewpulse.rachkovan.com)

AMA.