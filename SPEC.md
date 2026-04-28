# Viewpulse — Specification

**Version:** 2.0.0  
**Date:** 2026-04-27  
**Stage:** MVP Cleanup  
**Owner:** CTO

---

## Overview

Viewpulse is a **privacy-first YouTube watch history analyzer**. Upload your Google Takeout watch-history.html and get instant, client-side analytics — no data ever leaves your browser.

**Core differentiator:** 100% client-side. Upload a file, get a dashboard. No accounts, no servers, no data collection.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14 (App Router) | Fast dev + Vercel deployment |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS + shadcn/ui | Design system |
| **Charts** | Recharts | Lightweight, React-native |
| **Parser** | DOMParser (client-side) | Parses Google Takeout HTML |
| **Backend** | None | Everything runs in the browser |
| **Hosting** | Vercel | viewpulse.rachkovan.com |

---

## User Flow

```
1. User visits viewpulse.rachkovan.com
2. Uploads their Google Takeout watch-history.html
3. Dashboard loads instantly with analytics
4. User can filter by date range, source (YouTube / YouTube Music)
5. Export report or start over with a new file
```

---

## MVP Features

### F1: File Upload
- Upload `watch-history.html` (Google Takeout export)
- Parse via `DOMParser` on the client
- Validate: error if no events found or invalid format
- Drag-and-drop + click-to-upload

### F2: Dashboard Overview
- **Top channels** — ranked by watch count
- **Total watch events** — period breakdown
- **Source breakdown** — YouTube vs YouTube Music
- **Unique channels** — diversity metric

### F3: Watch Patterns
- **Hourly distribution** — 24-hour heatmap
- **Weekday distribution** — 7-day bar chart
- **Monthly trend** — watch count by month
- **Yearly breakdown** — year-over-year comparison

### F4: Top Binge Days
- Days with the highest watch counts
- Shows the top title watched that day

### F5: Keyword Cloud
- Extracts keywords from video titles
- Filters stop words, renders a weighted cloud

### F6: Export
- Themed export (Noir / Ivory)
- Multiple layout variants (Executive / Studio / Minimal)

### F7: Timeline Filter
- Date range slider (month-level granularity)
- Adjustable start/end dates
- Updates all analytics in real-time

---

## Out of Scope (Post-MVP)

- [ ] YouTube Data API integration (privacy-first — no API keys)
- [ ] Accounts / auth system
- [ ] Server-side storage
- [ ] Social features or sharing
- [ ] Mobile app

---

## Data Model

```typescript
interface WatchEvent {
  title: string
  videoId?: string
  channelName: string
  channelUrl?: string
  watchedAt: Date
  source: 'youtube' | 'youtube-music'
}
```

---

## Analytics Output

```typescript
interface AnalyticsResult {
  totalWatched: number
  youtubeCount: number
  musicCount: number
  uniqueChannels: number
  dateFrom: Date
  dateTo: Date
  daysSpan: number
  avgPerDay: number
  topChannels: Array<{ name: string; count: number; pct: number; url?: string }>
  hourlyDist: number[]      // 24 values
  weekdayDist: number[]     // 7 values (Sun=0)
  monthlyTrend: Array<{ key: string; label: string; count: number }>
  yearlyBreakdown: Array<{ year: number; count: number }>
  topBingeDays: Array<{ dateLabel: string; count: number; topTitle: string }>
  peakHour: number
  peakDay: string
  topYear: number
}
```

---

## Milestones

| Sprint | Deliverable |
|--------|-------------|
| 1 | Clean up — remove OAuth/creator dead code, update landing page |
| 2 | Polish upload UX (drag-and-drop, progress states) |
| 3 | Monetization — freemium tier (see cmo-icp-pricing.md) |
| 4 | SEO + content pages for watcher keywords |
| 5 | Launch on Product Hunt + creator communities |

---

## Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "@radix-ui/react-*": "latest",
  "recharts": "2.x",
  "lucide-react": "latest"
}
```

## Success Criteria

1. User uploads Takeout file → dashboard loads in < 2 seconds
2. All analytics views render with correct data
3. No server-side data processing (confirmed via network tab)
4. File upload handles large histories (5k+ events) without freezing UI