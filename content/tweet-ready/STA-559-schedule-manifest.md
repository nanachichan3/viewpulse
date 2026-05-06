# STA-559 — Twitter Teaser Sequence Execution Manifest
**Created:** 2026-05-02 | **Status:** Ready to schedule

## Sequence Summary

5-post teaser sequence for May 6 Product Hunt launch. All times UTC.

| # | Date | Time | Theme | Thread Size |
|---|------|------|-------|-------------|
| 1 | May 3 | 09:00 UTC | Pain Point ("YouTube Studio is lying to you") | 4 tweets |
| 2 | May 4 | 09:00 UTC | Privacy Angle ("No OAuth required") | 4 tweets |
| 3 | May 5 | 09:00 UTC | Build Story ("3 months of CSVs") | 5 tweets |
| 4 | May 6 | 09:00 UTC | Feature Tease ("Avg view duration") | 5 tweets |
| 5 | May 5 | 12:00 UTC | Launch Imminent ("24 hours") | 4 tweets |

Post-PH launch thread (after 00:10 UTC May 6):
→ Use `/data/workspace/viewpulse/content/cmo-post-ph-twitter-READY.md`

## Tweet Files

All individual tweet text files are in:
`/data/workspace/viewpulse/content/tweet-ready/`

### Post 1 — May 3, 09:00 UTC
- Hook: `01-pain-point-hook.txt`
- Reply 1: `01-pain-point-reply-1.txt`
- Reply 2: `01-pain-point-reply-2.txt`
- CTA: `01-pain-point-cta.txt`

### Post 2 — May 4, 09:00 UTC
- Hook: `02-privacy-hook.txt`
- Reply 1: `02-privacy-reply-1.txt`
- Reply 2: `02-privacy-reply-2.txt`
- CTA: `02-privacy-cta.txt`

### Post 3 — May 5, 09:00 UTC (+ LinkedIn cross-post)
- Hook: `03-buildstory-hook.txt`
- Reply 1: `03-buildstory-reply-1.txt`
- Reply 2: `03-buildstory-reply-2.txt`
- Reply 3: `03-buildstory-reply-3.txt`
- CTA: `03-buildstory-cta.txt`

### Post 4 — May 6, 09:00 UTC
- Hook: `04-feature-hook.txt`
- Reply 1: `04-feature-reply-1.txt`
- Reply 2: `04-feature-reply-2.txt`
- Reply 3: `04-feature-reply-3.txt`
- CTA: `04-feature-cta.txt`

### Post 5 — May 5, 12:00 UTC (24h countdown)
- Hook: `05-launch-hook.txt`
- Reply 1: `05-launch-reply-1.txt`
- Reply 2: `05-launch-reply-2.txt`
- CTA: `05-launch-cta.txt`

## Cron Job Setup Required

Set up these 5 cron jobs to post the sequences:

```
May 3 09:00 UTC — Post 1 (Pain Point thread)
May 4 09:00 UTC — Post 2 (Privacy thread)
May 5 09:00 UTC — Post 3 (Build Story thread) + LinkedIn cross-post
May 5 12:00 UTC — Post 5 (Launch Countdown thread)
May 6 09:00 UTC — Post 4 (Feature Tease thread)
```

**Note:** Post 4 is scheduled for May 6 09:00 UTC which is AFTER the PH submission at 00:01 UTC. This is intentional — it serves as the "we're live!" announcement reinforcing the launch.

## Master Reference

Full sequence with all tweet text: `tweet-ready/STA-559-twitter-teaser-sequence.md`

## Post-PH Launch Thread

After PH submission at 00:01 UTC May 6, post the thread from `cmo-post-ph-twitter-READY.md` at ~00:10 UTC.

---

*STA-559 | CMO | Viewpulse | 2026-05-02*
