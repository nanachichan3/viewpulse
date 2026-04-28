# Viewpulse OAuth Edge Case Audit

**Date:** 2026-04-27  
**Status:** Complete  

---

## Current Status

**Viewpulse v1 is 100% client-side.** OAuth code that existed during development has been deprecated per the SPEC requirement: *"No YouTube Data API integration (privacy-first — no API keys)"*.

The OAUTH_SETUP.md file was checked and any remaining OAuth references in the codebase should be treated as dead code.

---

## Legacy Edge Cases (Documented for Future Opt-In Feature)

If YouTube OAuth is re-introduced as an opt-in enrichment feature (v2+, F4 per v2 roadmap), the following edge cases must be handled:

### 1. Expired Token Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| Token expired > 7 days ago | Silent refresh fails → prompt user to re-auth |
| Token expired < 7 days ago | Automatic refresh via `refresh_token` |
| `refresh_token` also expired | Clear all stored tokens → redirect to OAuth consent screen |
| Multiple tabs with same token | First tab that refreshes wins; others detect stale and refresh again |

**Implementation:**
```typescript
// Graceful token refresh with retry
async function getValidToken(): Promise<string | null> {
  const tokens = loadTokens();
  if (!tokens) return null;
  
  if (isExpired(tokens.expiresAt)) {
    try {
      const refreshed = await refreshToken(tokens.refreshToken);
      storeTokens(refreshed);
      return refreshed.accessToken;
    } catch (err) {
      // Refresh failed — token is dead
      clearTokens();
      console.warn('[OAuth] Token refresh failed, re-auth required:', err);
      return null;
    }
  }
  return tokens.accessToken;
}
```

### 2. Revoked Permissions

| Scenario | Expected Behavior |
|----------|-------------------|
| User revokes in Google Account settings | API returns 401 → show "Re-authorize" prompt |
| User removes app from Google Third-Party Apps | Same as above |
| User revokes mid-session | Next API call fails → silently degrade to local-only mode |

**Error message:** *"YouTube access was revoked. Local analytics still work. Go to Settings → YouTube to re-authorize."*

### 3. YouTube API Rate Limits

| Limit | Quota | Behavior |
|-------|-------|----------|
| Daily quota | 10,000 units/day (free tier) | Track via `X-Quota-Cost` header |
| Per-100s rate | 20 requests/100s | Exponential backoff on 429 |
| Per-user rate | Varies | Handle same as above |

**Rate Limit Recovery Strategy:**
```typescript
class RateLimiter {
  private backoff = 1000; // 1s initial
  private maxBackoff = 60000; // 60s max
  
  async throttle(): Promise<void> {
    const wait = this.backoff;
    this.backoff = Math.min(this.backoff * 2, this.maxBackoff);
    await sleep(wait);
  }
  
  reset(): void {
    this.backoff = 1000;
  }
}

function handleRateLimit(response: Response): boolean {
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After') ?? '5', 10);
    scheduleRetry(retryAfter * 1000);
    return true; // will retry
  }
  return false; // not a rate limit
}
```

### 4. Missing or Partial Scopes

| Scenario | Expected Behavior |
|----------|-------------------|
| User denies `youtube.readonly` scope | Show error: *"Viewpulse needs read-only YouTube access to enrich analytics"* |
| User grants partial scopes | Detect scope mismatch → prompt for re-consent |
| Token grants wrong scope | Reject token → prompt new consent with explicit scope array |

### 5. Network Failures

| Scenario | Expected Behavior |
|----------|-------------------|
| User offline | Skip enrichment, show data from last sync |
| Intermittent connection | Retry 3 times with exponential backoff, then skip |
| DNS failure | Log to console, show warning badge |

### 6. Multiple Accounts Conflict

| Scenario | Expected Behavior |
|----------|-------------------|
| User has multiple Google accounts | OAuth prompts account picker (already handled by Google) |
| Switched YouTube channels mid-session | Use token-scoped channel — no special handling needed |
| Uploader's YouTube channel ≠ OAuth channel | Warn: *"Uploaded history is from a different account than the one authorized"* |

---

## Recommendation

**Do NOT re-introduce OAuth in v2.** The 100% client-side model is Viewpulse's core differentiator. The effort to handle all these edge cases outweighs the benefit of YouTube enrichment for v2.

If added later as an **opt-in premium feature**, budget **10-12 hours** for robust edge case handling (excluding the OAuth flow itself).

---

**Note (2026-04-27):** See `docs/oauth-edge-case-audit-2026-04-27.md` for the comprehensive edge case audit conducted as part of Todo #254. This document complements that audit with implementation patterns.

---

*Audited by CTO | Viewpulse | 2026-04-27*