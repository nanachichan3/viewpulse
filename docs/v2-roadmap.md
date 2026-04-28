# Viewpulse v2 — Technical Roadmap

**Date:** 2026-04-27  
**Status:** Draft for CEO Review  
**Related:** [SPEC.md](../SPEC.md)

---

## Current State (v1 MVP)

Viewpulse v1 is a **100% client-side** YouTube watch history analyzer:
- Upload Google Takeout `watch-history.html`
- Parse via DOMParser
- Dashboard with channels, patterns, top binge days, keyword cloud, timeline filter
- Export (Noir/Ivory themes, Executive/Studio/Minimal layouts)
- **No backend, no auth, no data ever leaves the browser**

---

## v2 Feature Candidates

### F1: Side-by-Side Video Comparison

**Description:** Compare two Takeout exports to see how watch patterns changed over time.

**Component Tree:**
```
UploadTab → DualUploadZone
         → ComparisonDashboard
              → ChannelDelta (top new/lost/increased channels)
              → CategoryShift (genre preference changes)
              → TimeComparison (hourly/weekly diff)
              → VolumeComparison (watch count delta)
```

**Technical Requirements:**
- Second file upload zone (parallel to first)
- Dual parsing pipeline (both files kept in memory)
- Diff logic: subtract analytics results
- Diff visualization using Recharts (grouped bar charts, line overlays)

**Build Effort:** 12-16 hours

---

### F2: Trend Analysis

**Description:** Show subscriber count growth, video upload frequency, and channel activity deltas over customizable time windows.

**Component Tree:**
```
TrendPanel → ChannelActivityTimeline
           → SubscriberDeltaCard
           → UploadFrequencyChart
           → EngagementCorrelationMatrix
```

**Technical Requirements:**
- YouTube Takeout data includes timestamps per event → group by day/week
- Rolling average calculations (7-day, 30-day)
- Best-fit lines and anomaly detection (watch count deviation from mean)
- No external API calls (everything computed from local data)

**Build Effort:** 8-12 hours

---

### F3: Alert Thresholds

**Description:** User-configurable thresholds that detect unusual patterns in their YouTube activity.

**Component Tree:**
```
AlertConfigModal → ThresholdSliders
                → AddAlertButton
AlertList → AlertCard
          → AlertBadge
```

**Technical Requirements:**
- LocalStorage for alert configurations (no backend needed)
- Check these against analytics at upload time:
  - `maxDailyWatchCount` — flag day if > N videos watched
  - `channelDominance` — flag if any channel > X% of total
  - `newChannelRatio` — flag if > X% of views are new (never-seen-before) channels
  - `watchWindow` — detect if user watches only at night, only weekends, etc.
- UI: inline warning badges on dashboard + alert detail modal

**Build Effort:** 6-8 hours

---

### F4: YouTube Data API Integration (Optional)

**Description:** Fetch real-time channel metadata (subscriber counts, video titles, thumbnails) to enrich local Takeout data.

**Trade-off:** This **breaks** the "privacy-first, no API keys" principle. Add as opt-in only.

**Technical Requirements:**
- OAuth 2.0 flow (already partially exists — needs credential wiring)
- Rate limit: 10,000 quota units/day for free YouTube Data API tier
- Graceful degradation when quota exhausted

**Build Effort:** 8-10 hours (*deferred — opt-in only*)

---

## Priority Ordering

| Priority | Feature | Effort | Impact | Risk |
|----------|---------|--------|--------|------|
| **🟢 P1** | F3: Alert Thresholds | 6-8h | High (differentiator) | Low |
| **🟢 P1** | F2: Trend Analysis | 8-12h | High (core analytics) | Low |
| **🟡 P2** | F1: Side-by-Side Comparison | 12-16h | Medium (advanced feature) | Low |
| **🔵 P3** | F4: YouTube API Integration | 8-10h | Low (privacy trade-off) | Medium |

**Suggested v2 release:** F2 + F3 (14-20h total build)

---

## Tech Debt / Prerequisites for v2

1. **Add `IndexedDB` for large files** — currently all data is in-memory. For 10k+ event histories, browser memory may be insufficient for dual-file comparison. Add optional IndexedDB storage layer.
2. **Extract parser into a Worker** — parsing large Takeout files blocks the main thread. Move `DOMParser` logic into a Web Worker.
3. **Add unit tests for diff/analytics logic** — trend differencing has edge cases (empty periods, overlapping time ranges).

---

*Defined by CTO | Viewpulse | 2026-04-27*