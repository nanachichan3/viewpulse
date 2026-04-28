# Feedback Collection — ViewPulse

> Last updated: 2026-04-24
> Setup by: CEO agent

## Overview

ViewPulse is a free, client-side-only tool with no revenue and no dedicated support staff. Feedback collection must be **minimal, frictionless, and sustainable**.

## Options Evaluated

### Option A: GitHub Issues ✅ RECOMMENDED
**Pros:**
- Zero cost, zero maintenance
- Built-in labeling and triage
- Public transparency builds trust
- No account required for submitter (with GitHub)

**Cons:**
- Submitter needs GitHub account (minor barrier)
- No structured survey data

**Labels to use:**
- `feedback` — General suggestions
- `feature-request` — New feature ideas
- `bug` — Something broken
- `question` — Usage questions
- `privacy` — Privacy concerns/reports

**URL:** https://github.com/nanachichan3/youtube-analytic/issues/new/choose

---

### Option B: Embedded Feedback Button in Footer ✅ IMPLEMENTED
**Pros:**
- Extremely low friction — always accessible
- Works for all users regardless of GitHub account
- Encourages participation

**Cons:**
- Still redirects to GitHub Issues
- No in-app modal (keeps it simple)

**Implementation:**
- Added "Feedback?" link in Dashboard footer (components/Dashboard.tsx)
- Links directly to GitHub Issues new issue page
- Styled with muted text to avoid visual clutter

**Placement:** Dashboard export panel footer area (near GitHub link)

---

### Option C: Typeform / Jotform
**Pros:**
- Better UX, structured data
- No GitHub account needed

**Cons:**
- Requires external service
- Free tiers have limits
- Adds third-party dependency
- Over-engineering for free tool

**Verdict:** Reject for now. GitHub Issues is sufficient.

---

## Recommended Stack

| Component | Choice | Why |
|-----------|--------|-----|
| Primary feedback channel | GitHub Issues | Free, built-in, sufficient |
| In-app access point | Footer link | Ultra low-friction |
| Response strategy | Label + close | No sustained support commitment |

## Workflow

### User submits feedback
1. Clicks "Feedback?" in Dashboard footer
2. Opens GitHub Issues in new tab
3. Selects template (Bug / Feature Request / Feedback)
4. Submits

### Maintainer reviews
1. GitHub notifies via email
2. Apply appropriate label
3. Respond with acknowledgment
4. Close when resolved

### Response Guidelines

| Label | Response time | Action |
|-------|--------------|--------|
| `bug` | Within 1 week | Reproduce, fix or label `wontfix` |
| `feature-request` | Within 2 weeks | Comment with `planned` / `declined` if not fitting |
| `feedback` | Within 2 weeks | Acknowledge, close |
| `question` | Within 1 week | Answer, close |
| `privacy` | Within 24h | Escalate — privacy issues are critical |

## Implementation Notes

### Dashboard Footer Link (Implemented)
- Added to `components/Dashboard.tsx` in export panel footer
- Text: "Feedback?" — small, muted, non-intrusive
- Links to: `https://github.com/nanachichan3/youtube-analytic/issues/new`
- Opens in new tab (`target="_blank"`)

### Future Enhancements (Low Priority)
- [ ] Pre-fill issue body with version info
- [ ] Add "Upvote existing issues" link
- [ ] Monthly issue review in standup

## Security & Privacy Notes

- No feedback data stored in-app
- No analytics on feedback link clicks
- No third-party feedback services
- GitHub Issues are public by default — users should be warned not to share sensitive watch history data in issues
