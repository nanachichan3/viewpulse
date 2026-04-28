# OAuth Status (Archived)

## ⚠️ This Feature Has Been Removed

As of **Viewpulse v2.0**, the YouTube OAuth flow has been **fully deprecated and removed**.

**SPEC.md (v2.0):** *"Out of Scope (Post-MVP): YouTube Data API integration (privacy-first — no API keys)"*

The current Viewpulse architecture is **100% client-side**:
1. User uploads Google Takeout `watch-history.html` or `watch-history.json`
2. Parsing and analytics happen entirely in the user's browser via `DOMParser`
3. **No YouTube API calls** — no data leaves the browser
4. **No OAuth tokens** — no server-side state

## What Was Removed

| Component | Original Purpose | Status |
|-----------|-----------------|--------|
| `lib/auth.ts` | OAuth2 client setup, token exchange | 🗑️ Removed |
| `app/api/youtube/auth/route.ts` | OAuth initiation redirect | 🗑️ Removed |
| `app/api/youtube/auth/callback/route.ts` | Token exchange & cookie storage | 🗑️ Removed |
| `app/api/youtube/auth/logout/route.ts` | Cookie clearing | 🗑️ Removed |
| `app/api/youtube/auth/status/route.ts` | Auth status check | 🗑️ Removed |
| `app/api/youtube/auth/start/route.ts` | Alternative OAuth start | 🗑️ Removed |
| `app/api/youtube/route.ts` | YouTube Data API proxy | 🗑️ Removed |
| `app/api/analytics/connect/route.ts` | Connection tracking | 🗑️ Removed |

## Why?

- **Privacy-first approach** — users don't need to authorize third-party access
- **No API quota limits** — Google Takeout data is unlimited
- **Simpler architecture** — no token management, no rate limiting, no error handling for API failures
- **Works offline** — all processing is in-browser

## If OAuth Is Reconsidered (Future Premium Feature)

See `docs/oauth-edge-case-audit-2026-04-27.md` for a comprehensive audit of the legacy OAuth implementation, including critical fixes required (token refresh, CSRF protection, token rotation).

---

**Last updated:** 2026-04-27  
**Context:** CTO OAuth Edge Case Audit (Todo #254)