# Viewpulse — HN Launch Day Checklist
**Project:** Viewpulse | **Status:** Ready to Execute
**Best posting time:** Saturday 9am EST / 2pm UTC (or Tuesday–Thursday 9am EST)

---

## Pre-Launch (24–48 hrs before)

- [ ] Confirm product is live at viewpulse.rachkovan.com
- [ ] Check all features working: takeout.zip upload, retention curves, CTR breakdown
- [ ] Ensure GitHub repo is public and README is polished
- [ ] Prepare 3–5 HN comment reply templates (see `cmo-hn-launch-post.md`)
- [ ] Set up HN account (if not already)
- [ ] Draft "launch day" tweet announcing HN post + link

## Post Titles (A/B Options — Pick One)

**Option A (Recommended):**
> Viewpulse — I built a YouTube analytics dashboard because YouTube Studio couldn't answer "why does this video outperform that one?"

**Option B:**
> Viewpulse — privacy-first YouTube analytics (no Google OAuth, all client-side)

---

## At Time of Posting

- [ ] Go to https://news.ycombinator.com/submit
- [ ] Submit as "Show HN" (not "Ask HN")
- [ ] Paste exact post body from `cmo-hn-launch-post.md`
- [ ] Double-check links: viewpulse.rachkovan.com + GitHub link
- [ ] Submit
- [ ] Immediately check post appears in "new" queue

## Engagement Protocol (First 2 Hours)

- [ ] Refresh HN every 5–10 min
- [ ] Reply to every comment within 10 minutes
- [ ] Be genuine, not promotional — thank people for trying it
- [ ] Acknowledge bugs/feedback honestly ("you're right, that's a gap")
- [ ] Share post in Twitter thread as backup distribution

## If Post Gets Traction

- [ ] Upvote own post (1x, from own account only)
- [ ] Share to r/youtube and r/contentcreation as backup
- [ ] Prepare follow-up comment with updated metrics/feedback
- [ ] Post to lobste.rs if applicable

## Post-HN Follow-up (Week 1)

- [ ] Track GitHub stars (trending potential)
- [ ] DM top HN commenters a thank-you + early access offer
- [ ] Review feedback — surface top 3 feature requests
- [ ] Update distribution plan based on feedback

## HN Comment Templates (copy-paste ready)

**Technical question:**
> Great question! Viewpulse parses your YouTube takeout ZIP entirely in-browser. Data never leaves your machine — it's just a local JSON parse that renders the dashboard. No backend, no server calls.

**Privacy concern:**
> No Google OAuth, no server-side processing. Takeout.zip is parsed entirely in-browser using JavaScript. Source is open — you can self-host or audit the code. Everything runs client-side.

**Feature comparison (vs. TubeBuddy/VidIQ):**
> The big difference is philosophy — Viewpulse doesn't collect your data or use your Google account. No accounts, no tracking. It's purely for understanding your own data. TubeBuddy/VidIQ if you want discovery features and don't mind data sharing. Viewpulse if you want a clean, privacy-first look at your own numbers.
