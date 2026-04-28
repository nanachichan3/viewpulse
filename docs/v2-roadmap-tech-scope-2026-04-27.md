# Viewpulse v2 — Technical Scope & Design Document

**Version:** 2.0  
**Date:** 2026-04-27  
**Stage:** Spec / Pre-Build  
**Author:** CTO  
**Related:** [SPEC.md](../SPEC.md), [v2-roadmap.md](./v2-roadmap.md), [ROADMAP.md](./ROADMAP.md)

---

## 1. Context & Product Direction

Viewpulse v1 is a **100% client-side, privacy-first YouTube watch history analyzer**. Users upload their Google Takeout `watch-history.html` or `watch-history.json` and get an instant dashboard — no data ever leaves the browser, no accounts, no backend.

**The v2 features described below are built for this watcher product, not the old creator analytics dashboard.** All three features (video comparison, trend analysis, alert thresholds) operate on the user's own Takeout export data. They require **no YouTube Data API integration** and maintain the core privacy-first principle.

### Design Principles for v2

| Principle | Implication |
|-----------|-------------|
| **100% client-side** | No new API routes, no server endpoints, no database. Everything runs in the browser. |
| **No backend dependencies** | All state in memory or localStorage. No auth, no accounts, no Stripe (for v2). |
| **Progressive enhancement** | v2 features layer on top of existing `computeAnalytics()` and `WatchEvent[]` data. |
| **File-size aware** | Multi-file comparison doubles memory pressure. Must handle gracefully. |

---

## 2. Feature 1: Side-by-Side Video Comparison

### 2.1 Description

Allow users to upload two Google Takeout exports (or two time periods from the same export) and compare their watch patterns side-by-side. Shows deltas in channels watched, total volume, peak hours, keyword shifts, binge changes.

### 2.2 User Flow

```
1. User lands on dashboard after first file upload
2. Clicks "Compare" button in dashboard header
3. Presented with two options:
   a) Upload a second Takeout file (different time period, different account)
   b) Split current data into two periods (e.g., "first half vs second half")
4. Side-by-side dashboard renders with:
   - Dual metric cards (left = Period A, right = Period B, delta = Δ)
   - Merged charts (overlaid monthly trends, dual bar columns)
   - Delta table (channels gained/lost, top channel ranking shifts)
```

### 2.3 Data Model Changes

```typescript
// New types needed in lib/analytics.ts

interface ComparisonResult {
  periodA: AnalyticsResult;
  periodB: AnalyticsResult;
  deltas: {
    totalWatchedDelta: number;        // B - A
    totalWatchedPct: number;          // ((B - A) / A) * 100
    uniqueChannelsDelta: number;
    avgPerDayDelta: number;
    peakHourDelta: number;            // absolute hour difference
    youtubePctDelta: number;          // YT vs Music mix change
    bingeDayDelta: number;
  };
  channelChanges: {
    topGained: Array<{ name: string; aCount: number; bCount: number; delta: number }>;
    topLost: Array<{ name: string; aCount: number; bCount: number; delta: number }>;
    rankingShifts: Array<{ name: string; rankA: number; rankB: number; shift: number }>;
  };
  periodOptions: {
    type: 'two-files' | 'split-period';
    labelA: string;
    labelB: string;
  };
}

// New type for dual-export state management
interface ComparisonState {
  fileA: { events: WatchEvent[]; label: string } | null;
  fileB: { events: WatchEvent[]; label: string } | null;
  mode: 'single' | 'comparing';
  splitPoint: Date | null; // for split-period mode
}
```

### 2.4 API / New Modules Required

**No API endpoints** — all computation is client-side.

| New Module | Purpose | Lines Est. |
|------------|---------|-----------|
| `lib/comparison.ts` | `computeComparison(a: WatchEvent[], b: WatchEvent[])` — delta logic + channel ranking shifts | ~80 |
| `lib/union.ts` | Merge + deduplicate events from two files (same-title, same-channel dedup within N minutes) | ~50 |

### 2.5 Frontend Component Architecture

```
components/
  CompareButton.tsx          — "Compare" button in dashboard header
  CompareModeSelector.tsx    — "Upload another file" vs "Split current"
  SecondaryFileUpload.tsx    — Drag-and-drop zone for second file (reuses upload styling)
  ComparisonDashboard.tsx    — Wrapper for comparison view
    ├── PeriodLabels.tsx     — A vs B indicator badges
    ├── MetricTrio.tsx       — {Label, Value, ΔBadge} component (reused 6-8 times)
    ├── OverlayTrendChart.tsx — Two line series on same chart (Period A + Period B)
    ├── ChannelDeltaTable.tsx — Gained, lost, riser, faller rows
    ├── KeywordShift.tsx     — Word clouds side by side or top keyword changes
    └── ExportComparison.tsx — Combined export with both periods
```

### 2.6 Build Effort

| Task | Hours | Dependencies |
|------|-------|-------------|
| `lib/comparison.ts` — delta computation | 4h | `lib/analytics.ts` |
| `lib/union.ts` — merge/dedup | 2h | `lib/parser.ts` |
| `CompareButton` + `CompareModeSelector` | 2h | None |
| `SecondaryFileUpload` (reuse upload-zone CSS) | 1h | Existing upload-zone styles |
| `ComparisonDashboard` wrapper + state mgmt | 4h | Above components |
| `MetricTrio` with Δ badges | 2h | shadcn-style badge variants |
| `OverlayTrendChart` (Recharts `Line` overlay) | 3h | Recharts, existing trend area |
| `ChannelDeltaTable` | 3h | Existing channel-row styles |
| `KeywordShift` side-by-side | 2h | Existing keyword-bubble classes |
| `ExportComparison` | 2h | Existing export-PDF flow |
| **Total** | **25h** | — |

### 2.7 Edge Cases

- **File A has all events, File B has none** → Show "no data" placeholder, Δ = N/A
- **Overlapping time periods** → Warn if periods overlap significantly (70%+ date range overlap)
- **Deduplication** → Same video watched in both files → count only once per period? Decision: count per period independently, warn on dedup
- **Large files (10K+ each)** → 20K events total in memory. If approaching memory limits, show warning before comparison
- **Up to 17 components (5-6 tiles × 2 periods)** → Use consistent wrappers to keep JSX manageable

---

## 3. Feature 2: Trend Analysis

### 3.1 Description

Compute rolling and cumulative trends from the user's watch history over time — not from YouTube API data, but from the **timestamp data within their Takeout export**. Shows which channels are rising/falling in their personal watch rotation, subscriber-like deltas (watch count deltas), and engagement shifts by time window.

### 3.2 What "Trend Analysis" Means Here

| Concept | Personal Takeout Equivalent |
|---------|---------------------------|
| **Subscriber delta** | Watch count delta per channel period-over-period |
| **Video upload frequency** | User's own watch frequency (videos/day, not creator uploads) |
| **Channel growth velocity** | How fast a channel's watch share is increasing/decreasing in *your* history |
| **Engagement correlation** | Do you watch certain channels at certain times? On certain days? |

### 3.3 Data Model Changes

```typescript
// New types in lib/analytics.ts

interface TrendResult {
  channelTrends: ChannelTrend[];
  rollingDaily: RollingMetric[];
  weeklyPattern: WeekPattern[];
  seasonality: SeasonalityResult;
  anomalyDays: AnomalyDay[];
}

interface ChannelTrend {
  channelName: string;
  totalCount: number;
  // Split history into thirds — compare early vs late
  earlyCount: number;      // first 33% of time range
  lateCount: number;       // last 33% of time range
  delta: number;            // late - early
  deltaPct: number;         // ((late - early) / early) * 100
  direction: 'rising' | 'falling' | 'stable';
  velocity: number;         // delta / timeSpan (growth per day)
}

interface RollingMetric {
  date: string;           // ISO date
  weekEnding: string;
  dailyCount: number;
  rolling7Day: number;    // trailing 7-day avg
  rolling30Day: number;   // trailing 30-day avg
  zScore: number;         // deviation from personal mean
  isAnomaly: boolean;     // |zScore| > 2.5
}

interface WeekPattern {
  dayOfWeek: number;      // 0=Sun
  avgCount: number;
  variance: number;
}

interface SeasonalityResult {
  monthlyAvgs: Array<{ month: number; avgDaily: number }>;
  mostSeasonalMonth: number;
  leastSeasonalMonth: number;
}

interface AnomalyDay {
  date: string;
  count: number;
  rollingAvg: number;
  deviation: number;      // standard deviations from mean
  topTitle: string;
}
```

### 3.4 API / New Modules Required

| New Module | Purpose | Lines Est. |
|------------|---------|-----------|
| `lib/trends.ts` | `computeTrends(events: WatchEvent[])` → `TrendResult` | ~150 |
| `lib/stats.ts` | Shared statistics helpers (mean, stddev, z-score, rolling average, linear regression) | ~60 |

### 3.5 Frontend Component Architecture

```
components/
  TrendPanel.tsx                 — Container, period selector (7d/30d/90d/all)
    ├── ChannelTrendSection.tsx  — "Rising/Falling Channels" with direction arrows
    │   ├── ChannelTrendRow.tsx  — One channel row with delta bar + direction badge
    │   └── TrendMiniSparkline.tsx — Tiny inline SVG spark (reuses area chart pattern)
    ├── RollingChart.tsx         — Recharts Line chart: daily count + rolling avg + anomaly markers
    ├── WeekPatternHeatmap.tsx   — 7-day bar set grouped by hour (24h × 7d grid or weekly bars)
    ├── AnomalyList.tsx          — "Unusual Days" — days that deviated significantly
    └── SeasonalityCard.tsx      — Monthly average breakdown, strongest/weakest month
```

### 3.6 Build Effort

| Task | Hours | Dependencies |
|------|-------|-------------|
| `lib/stats.ts` — mean, stddev, z-score, rolling avg | 1.5h | None |
| `lib/trends.ts` — channel trends, rolling daily, anomaly detection | 4h | `stats.ts`, `analytics.ts` |
| `TrendPanel` container + state | 2h | None |
| `ChannelTrendSection` + rows + sparklines | 3h | Existing tile-card styles, SVG spark |
| `RollingChart` (Recharts with anomaly scatter overlay) | 4h | Recharts |
| `WeekPatternHeatmap` | 3h | Custom SVG grid or Recharts heatmap |
| `AnomalyList` | 2h | Existing binge-list styles |
| `SeasonalityCard` | 1.5h | Existing tile-card |
| Integrate into Dashboard (tab or collapsible section) | 1h | Dashboard layout |
| **Total** | **22h** | — |

### 3.7 Performance Consideration

Rolling 30-day averages over 5+ years (~30K events) requires computing sliding windows. To avoid O(n²), use a **cumulative sum approach**:

```
rolling7day[i] = (cumulative[i] - cumulative[i-7]) / 7
```

This is O(n). Pre-compute once, store in a `Map<Date, number>` keyed by ISO date.

### 3.8 Edge Cases

- **Fewer than 7 unique days of data** → Cannot compute rolling 7-day → show "Add more data for trends"
- **Channel appears only once** → Direction = 'stable' (insufficient data)
- **All viewing in last week** → Rolling avgs equal daily counts → disable anomaly detection
- **Gaps in history (user didn't watch for 2 months)** → Rolling averages should handle discontinuities. Flag gaps as "data gaps" in the chart
- **Zero-division** → If earlyCount === 0, deltaPct = Infinity → show "+∞" or "new" badge

---

## 4. Feature 3: Alert Thresholds

### 4.1 Description

User-configurable thresholds that trigger inline warnings on the dashboard when personal watching behavior crosses defined boundaries. All thresholds are stored client-side in `localStorage`. No server, no notifications, no email — the alerts display as colored badges and collapsible warnings on the dashboard.

### 4.2 Alert Types

| Alert ID | Name | Logic | Default | Example |
|----------|------|-------|---------|---------|
| `max_daily` | Max Daily Count | Flag days where count > threshold | Off | Flag days with >50 videos watched |
| `channel_dominance` | Channel Dominance | Flag if any channel >X% of total | 30% | "YouTube is 45% of your history" |
| `night_owl` | Night Watching | Flag if >X% of views between 23:00-06:00 | 40% | "52% of your watching is late night" |
| `binge_streak` | Binge Streak | Flag if any day has >2× the rolling avg | 2× | "You watched 3× your normal amount on Dec 25" |
| `channel_rise` | Channel Rising | Flag if a channel's watch share grew >X% period-over-period | 50% | "TechTok's share grew 80% vs last period" |
| `channel_decline` | Channel Declining | Flag if a channel's watch share dropped >X% | 50% | "MusicVids dropped 65% in your rotation" |
| `new_channel_ratio` | New Channel Ratio | Flag if >X% of views are new (never-seen) channels | 40% | "60% of recent views are new channels" |
| `weekend_bias` | Weekend Bias | Flag if weekend avg >X% of weekday avg | 150% | "You watch 2.2× more on weekends" |
| `quiet_period` | Quiet Period | Flag any period >X days with <1 video/day | 14 days | "No YouTube for 20 days" |
| `total_volume` | Total Volume Alert | Flag if last period's count changed >X% from prior period | ±30% | "You watched 45% less this month" |

### 4.3 Data Model Changes

```typescript
// New types

interface AlertConfig {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  threshold: number;
  direction?: 'above' | 'below' | 'both';
  unit: 'percent' | 'count' | 'days' | 'multiplier';
  icon: string; // lucide icon name
}

interface AlertResult {
  config: AlertConfig;
  triggered: boolean;
  value: number;
  label: string;      // "52% of your watching is late night"
  severity: 'info' | 'warning' | 'danger';
  detail?: string;
  relatedChannel?: string;
}

// Default alert configs (no need for DB — hardcoded with localStorage overrides)
const DEFAULT_ALERTS: AlertConfig[] = [...]
```

### 4.4 API / New Modules Required

| New Module | Purpose | Lines Est. |
|------------|---------|-----------|
| `lib/alerts.ts` | `evaluateAlerts(events: WatchEvent[], configs: AlertConfig[])` → `AlertResult[]` | ~120 |
| `lib/alert-config.ts` | Default alert definitions + localStorage persistence | ~50 |

### 4.5 Frontend Component Architecture

```
components/
  AlertBanner.tsx              — Thin inline banner if any alerts triggered (collapsible)
  AlertBadge.tsx               — Colored pill showing triggered count
  AlertConfigModal.tsx         — Dialog: toggle alerts on/off, set thresholds
    ├── AlertConfigRow.tsx     — One row: toggle + name + threshold slider/input
    └── AlertPresets.tsx       — "Reset to defaults" + recommended presets
  AlertList.tsx                — Bottom section on dashboard listing triggered alerts
    └── AlertCard.tsx          — One triggered alert: icon + message + value
  AlertDashboard.tsx           — (optional) dedicated page/section with all alerts
```

### 4.6 Build Effort

| Task | Hours | Dependencies |
|------|-------|-------------|
| `lib/alert-config.ts` — defaults + localStorage | 1h | None |
| `lib/alerts.ts` — evaluation logic | 3h | `analytics.ts`, `trends.ts` |
| `AlertBanner` + `AlertBadge` | 1.5h | Dashboard header CSS |
| `AlertConfigModal` + `AlertConfigRow` | 3h | shadcn dialog, slider, toggle |
| `AlertPresets` + reset | 1h | localStorage |
| `AlertList` + `AlertCard` | 2h | Existing tile-card patterns |
| Integrate into Dashboard | 1h | Dashboard layout |
| **Total** | **12.5h** | — |

### 4.7 localStorage Schema

```typescript
interface ViewpulseSettings {
  version: number;               // settings schema version
  alerts: Record<string, {       // keyed by alert id
    enabled: boolean;
    threshold: number;
    direction?: 'above' | 'below' | 'both';
  }>;
  v2Features: {
    showComparison: boolean;
    showTrends: boolean;
    showAlerts: boolean;
  };
}

const ALERTS_KEY = 'viewpulse:alerts';
// Settings persisted to localStorage as JSON
```

### 4.8 Edge Cases

- **No events** → Evaluation returns empty (no triggered alerts). Graceful.
- **User clears localStorage** → Reset to defaults. No crash path.
- **Corrupted localStorage** → Catch JSON.parse, reset to defaults, console.warn once.
- **Threshold set to 0** → Treated as "off" for meaningful metrics only. Throw warning: "Useful thresholds start above 0."
- **Multiple alerts triggered** → Collapse into single `AlertBanner` with count badge. Show full list in expandable section.
- **Channel name changes** → Alerts reference channel names as parsed. If user watches "TechTok" under "TechTok Official" in different files, they're separate channels. Document as known limitation.

---

## 5. Build Summary & Prioritization

### 5.1 Effort by Feature

| Feature | Estimate | Components | New Libs | Risk |
|---------|----------|------------|----------|------|
| **F3: Alert Thresholds** | **12.5h** | 5-6 | 2 | Low |
| **F2: Trend Analysis** | **22h** | 7-8 | 2 | Low-Med |
| **F1: Side-by-Side Comparison** | **25h** | 10-11 | 2 | Medium (memory) |
| **Total v2** | **~60h** | 22-25 | 6 | — |

### 5.2 Priority Ordering

| Priority | Feature | Effort | User Value | Rationale |
|----------|---------|--------|------------|-----------|
| **🟢 P1** | F3: Alert Thresholds | 12.5h | High | Smallest effort, highest delight factor. Users who upload their data want to learn something surprising. "You're a night owl" or "You watch 3× your normal on weekends" is instantly shareable. Differentiates from generic "here are your stats" tools. |
| **🟢 P1** | F2: Trend Analysis | 22h | High | Core analytics upgrade. Channel rise/fall detection makes the dashboard feel alive, not static. Rolling charts give users insight into their own changing habits. The anomaly detection ("unusual day") combines trend + alert naturally. |
| **🟡 P2** | F1: Side-by-Side Comparison | 25h | Medium | High effort for comparably lower usage. Comparison is a ⭐ feature for power users but most users upload once and are done. Pro feature (after monetization) or Phase 4. |

### 5.3 Recommended v2 Release Plan

```
v2.0 Sprint (Week 1-2): Alert Thresholds → Trend Analysis
├── Week 1: F3 (Alert Thresholds) — 12.5h build + 3h test/polish
│   ├── lib/alert-config.ts       [1h]
│   ├── lib/alerts.ts               [3h]
│   ├── AlertConfigModal           [3h]  
│   ├── AlertBanner + AlertBadge [1.5h]
│   ├── AlertList + AlertCard     [2h]
│   ├── Dashboard integration    [1h]
│   └── Test: 10 threshold scenarios, edge cases [3h]
│
├── Week 2: F2 (Trend Analysis) — 22h build + 3h test
│   ├── lib/stats.ts               [1.5h]
│   ├── lib/trends.ts               [4h]
│   ├── TrendPanel + state       [2h]
│   ├── ChannelTrendSection      [3h]
│   ├── RollingChart (Recharts) [4h]
│   ├── WeekPatternHeatmap      [3h]
│   ├── AnomalyList + Seasonality [3.5h]
│   ├── Dashboard integration    [1h]
│   └── Test: rolling avg math, edge cases [3h] 

v2.1 Sprint (Week 3-4): Side-by-Side Comparison (P2)
├── lib/comparison.ts + dedup  [6h]
├── Upload/Compare UX          [3h]
├── ComparisonDashboard        [4h]
├── MetricTrio + Δ badges     [2h]
├── OverlayTrendChart         [3h]
├── ChannelDeltaTable         [3h]
├── KeywordShift + Export     [4h]
└── Test: 2×10K files in memory [needs profiling]
```

### 5.4 Prerequisites / Shared Infrastructure

| Need | Why | Effort |
|------|-----|--------|
| **IndexedDB for large datasets** | 20K+ events in memory for comparison may OOM. Optional persistent store. | 4h (deferred) |
| **Extract parser into Web Worker** | DOMParser blocks main thread for large files. Needed before comparison (two files = double blocking). | 3h (Phase 1) |
| **CSS alert badge variants** | Danger/warning/info badge classes needed for both alerts and comparison Δs. | 30min (can piggyback on alert PR) |
| **Unit test framework** | Stats (z-score, rolling avg) need correctness testing. No framework currently. Vitest + jsdom. | 1h (setup) |

---

## 6. Dependencies on Existing YouTube API Integration

**Zero dependencies on YouTube Data API v3.** The old product direction had `googleapis` in `package.json`, but v2 features work entirely on parsed Takeout data (`WatchEvent[]` timestamps, channel names, video titles, watch counts). 

| Feature | YouTube API Needed? | Data Source |
|---------|-------------------|-------------|
| F1: Comparison | **No** | Two parsed WatchEvent arrays |
| F2: Trend Analysis | **No** | Timestamps + channel names from parsed data |
| F3: Alert Thresholds | **No** | Metrics from `computeAnalytics()` + `computeTrends()` |

**However**, if YouTube API integration is added later as an opt-in enrichment (e.g., filling in thumbnails, subscriber counts), the `videoId` field already in `WatchEvent` would be the hook point. But it's deferred indefinitely to maintain privacy-first positioning.

### 6.1 What We DO Depend On

| Dependency | For What | Status |
|------------|----------|--------|
| **Recharts** | F1 overlay charts, F2 rolling line charts | ✅ Already in package.json |
| **lucide-react** | Alert icons (trending-up, alert-triangle, etc.) | ✅ Already in package.json |
| **localStorage** | F3 alert config persistence | ✅ No deps needed |
| **DOMParser** | Parsing original + second file (F1) | ✅ Already working |
| **FileReader** | Double file reading (F1) | ✅ Already in page.tsx pattern |

---

## 7. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| **Comparison memory pressure** — 2 × large Takeout files exceed browser heap | Medium | High | Add IndexedDB for F1. Keep F1 as P2 until memory strategy is validated with real large files. |
| **Alert threshold tuning** — defaults are too aggressive or too lenient | Medium | Low | Start with fewer alerts (5, not 10). Tune after user feedback. Conservative defaults (don't flag unless clearly interesting). |
| **Trend computation perf** — rolling 7/30 on 30K events in main thread | Low | Medium | Cumulative sum O(n) approach + requestIdleCallback for large datasets. |
| **User confusion** — alerts feel like "judgment" rather than insight | Low | High | Frame all alerts as "interesting patterns," not good/bad. Use color: info first, warning only for extreme values. |
| **localStorage corruption** — from manual edit or version mismatch | Low | Low | Schema version field + `try/catch` on parse → silent reset to defaults. |

---

## 8. UI/UX Patterns (Consistency Guide)

All v2 features should reuse these existing UI patterns from Dashboard.tsx:

| Pattern | Where Used | Reuse in v2 |
|---------|-----------|-------------|
| `.tile-card` / `.tile-dark` | All dashboard tiles | Trend charts, alert cards |
| `.channel-row` buttons | Top Channels | Channel delta rows |
| `.tile-big` | Metric cards (total watched, peak hour) | MetricTrio values |
| `.binge-list` / `.binge-date` | Binge Days | Alert details, anomaly list |
| `.tile-tag` | Tile headers | Section headers |
| `.keyword-bubble.w1-w5` | Keyword Cloud | New for component but same pattern: weighted tags by severity |
| `.db-reset-btn` | Header buttons | Alert config, comparison controls |
| `.export-panel` | Export section | Alert config modal styling |

**New CSS needed:**
- `alert-badge` (danger/warning/info colored pills, ~20 lines)
- `delta-arrow` (up/down/neutral arrows for comparison, ~15 lines)
- `trend-row` (channel direction rows with mini sparkline, ~25 lines)
- `comparison-dashboard` (left/right split layout, ~30 lines)

Total new CSS: ~90 lines (appended to `globals.css` or a new `v2.css`)

---

## 9. File-by-File Change Summary

### New Files

```
lib/
├── stats.ts              [~60 lines]    — mean, stddev, z-score, rolling avg, linreg
├── trends.ts             [~150 lines]   — computeTrends(), anomaly detection
├── alert-config.ts       [~50 lines]    — default alert defs + localStorage persistence
├── alerts.ts             [~120 lines]   — evaluateAlerts()
├── comparison.ts         [~80 lines]    — computeComparison()
└── union.ts              [~50 lines]    — merge/dedup two WatchEvent arrays

components/
├── CompareButton.tsx           [~30 lines]
├── CompareModeSelector.tsx     [~40 lines]
├── SecondaryFileUpload.tsx     [~50 lines]
├── ComparisonDashboard.tsx     [~200 lines]
├── MetricTrio.tsx              [~40 lines]
├── OverlayTrendChart.tsx       [~70 lines]
├── ChannelDeltaTable.tsx       [~80 lines]
├── KeywordShift.tsx            [~60 lines]
├── TrendPanel.tsx              [~100 lines]
├── ChannelTrendSection.tsx     [~80 lines]
├── ChannelTrendRow.tsx         [~30 lines]
├── TrendMiniSparkline.tsx      [~25 lines]
├── RollingChart.tsx            [~90 lines]
├── WeekPatternHeatmap.tsx      [~60 lines]
├── AnomalyList.tsx             [~40 lines]
├── SeasonalityCard.tsx         [~30 lines]
├── AlertBanner.tsx             [~50 lines]
├── AlertBadge.tsx              [~20 lines]
├── AlertConfigModal.tsx        [~150 lines]
├── AlertConfigRow.tsx          [~40 lines]
├── AlertPresets.tsx            [~30 lines]
├── AlertList.tsx               [~40 lines]
└── AlertCard.tsx               [~30 lines]
```

### Modified Files

```
app/globals.css         [+~90 lines] — alert badges, trend rows, comparison layout
components/Dashboard.tsx [+~60 lines] — alert banner integration, trend toggle, compare button mount
lib/analytics.ts        [+~30 lines] — export TrendResult types, add comparison types
```

---

## 10. Build Sequence (Recommended Order)

```
Phase A: Alert Thresholds (v2.0a — 1 week) — 12.5h
  └── Begin with F3 because it's smallest, highest value, and teaches us about dashboard extension patterns

Phase B: Trend Analysis (v2.0b — 1 week) — 22h
  └── Core analytics upgrade. Trend module also feeds alert evaluation (channel_rise, binge_streak)

Phase C: Memory & Infrastructure (v2.0c — ~3 days)
  └── Web Worker for parser, perf monitoring for 20K+ events. Blocking for Phase D.

Phase D: Side-by-Side Comparison (v2.1 — 1.5 weeks) — 25h  
  └── Wait for perf infra (Phase C). Only ship if user feedback requires it.
```

---

## Appendix A: Comparison of v2 Roadmap v1 vs This Doc

The earlier [v2-roadmap.md](./v2-roadmap.md) document defined v2 features in a world where the product was still "watcher" but the features were less technically detailed. This document supersedes it:

| Aspect | v2-roadmap.md (earlier) | This Doc (current) |
|--------|------------------------|-------------------|
| F1 description | "Dual upload zone" | Full component tree + merge/dedup strategy + memory consideration |
| F2 description | "SubscriberDeltaCard" (confusing for watcher product) | Rebranded as rolling trends + channel velocity + anomaly detection |
| F3 description | 4 simple alerts | 10 alert types, localStorage persistence, config modal design |
| Effort | 26-36h total | **60h** total (more detailed, accurate) |
| Priority | F3→F2→F1 (same) | F3→F2→F1 (same, but with time-boxed sprints) |
| YouTube API | "Optional, opt-in only" | **Removed entirely** from v2 scope — all client-side |
| Performance | "Add IndexedDB" (vague) | Specific O(n) cumulative sum strategy + when to defer to Phase C |

---

*Prepared by CTO | Viewpulse v2 Technical Scope | 2026-04-27*