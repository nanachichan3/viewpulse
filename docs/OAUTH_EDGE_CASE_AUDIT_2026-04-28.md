# Viewpulse — OAuth Edge Case Audit

**Date:** 2026-04-28
**Author:** CTO
**Status:** Complete
**Project:** Viewpulse (Project 28)

---

## 1. Scope

This audit covers the YouTube OAuth 2.0 flow planned for Viewpulse Creator Mode (v2.2). The current MVP has **no OAuth** — it is 100% client-side file upload. OAuth is only needed for the optional Creator Mode feature.

**Reference:** `OAUTH_SETUP.md` in viewpulse repo

---

## 2. OAuth Flow Overview

```
1. User clicks "Connect YouTube Channel"
2. Redirect to Google OAuth consent screen
3. User grants youtube.readonly scope
4. Google redirects to viewpulse.rachkovan.com/oauth/callback?code=...
5. Backend exchanges code for access_token + refresh_token
6. Tokens stored in httpOnly cookie
7. Client calls /api/youtube/* with cookie auth
```

---

## 3. Edge Case Audit

### E1: Expired Access Tokens
**Scenario:** Access token expires after 1 hour (Google default).

**Current Handling:** Not yet implemented.

**Required Fix:**
- Store refresh_token server-side (or in httpOnly cookie)
- On 401 from YouTube API, auto-refresh using `refresh_token`
- If refresh fails, redirect to re-auth

**Implementation:**
```typescript
// Server-side token refresh
async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID!,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  return data.access_token;
}
```

**Risk Level:** 🔴 High — will break creator mode after 1 hour without fix

---

### E2: Revoked Permissions
**Scenario:** User revokes Viewpulse access in Google Account settings.

**Current Handling:** Not yet implemented.

**Required Fix:**
- YouTube API returns 401 with `error: "invalid_grant"`
- Detect this specific error and clear tokens
- Show user-friendly message: "YouTube access was revoked. Please reconnect your channel."
- Redirect to OAuth consent screen

**Risk Level:** 🟡 Medium

---

### E3: Rate Limit Responses
**Scenario:** YouTube Data API quota exceeded (10,000 units/day).

**Current Handling:** Not yet implemented.

**Required Fix:**
- YouTube API returns 403 with `reason: "quotaExceeded"`
- Display message: "Daily API limit reached. Quotas reset at midnight Pacific Time."
- Implement client-side request caching (IndexedDB) to reduce API calls
- Consider multiple API keys with round-robin fallback ( advanced )

**Risk Level:** 🟡 Medium

---

### E4: User Denies Scope
**Scenario:** User clicks "Cancel" on Google consent screen.

**Current Handling:** Not yet implemented.

**Required Fix:**
- Google redirects with `?error=access_denied`
- Show message: "YouTube connection is required for Creator Mode. You can still use all watch-history analytics."
- Offer "Try Again" button
- Do NOT show error stack traces

**Risk Level:** 🟢 Low

---

### E5: Multiple Google Accounts
**Scenario:** User is signed into multiple Google accounts and picks the wrong one.

**Current Handling:** Not yet implemented.

**Required Fix:**
- Pass `prompt=select_account` in OAuth URL to force account picker
- Show connected account email in UI
- Offer "Switch Account" button that re-auths with `prompt=select_account`

**Risk Level:** 🟢 Low

---

### E6: CSRF / State Parameter
**Scenario:** OAuth callback is hit with a forged `state` parameter.

**Current Handling:** Not yet implemented.

**Required Fix:**
- Generate random `state` nonce before redirect
- Store in httpOnly cookie or session
- Validate `state` in callback handler
- Reject mismatch with 403

**Implementation:**
```typescript
const state = crypto.randomUUID();
// Store state in cookie
response.cookies.set('oauth_state', state, { httpOnly: true, maxAge: 600 });
// Redirect with state
const url = `https://accounts.google.com/o/oauth2/v2/auth?...&state=${state}`;
```

**Risk Level:** 🔴 High — security vulnerability without fix

---

### E7: Token Storage Security
**Scenario:** XSS attack attempts to steal tokens.

**Current Handling:** Not yet implemented.

**Required Fix:**
- NEVER store tokens in localStorage
- Use httpOnly, secure, sameSite=lax cookies
- Set short maxAge (7 days) with refresh token rotation
- Implement logout endpoint that clears cookies

**Risk Level:** 🔴 High

---

### E8: OAuth Callback Errors
**Scenario:** Google returns unexpected error parameters.

**Common Errors:**
- `invalid_request`
- `unauthorized_client`
- `unsupported_response_type`
- `server_error`

**Required Fix:**
- Catch all error params in callback handler
- Log server-side for debugging
- Show generic user message: "Connection failed. Please try again or contact support."
- Include error code in message for support tickets

**Risk Level:** 🟡 Medium

---

### E9: Channel Not Found
**Scenario:** User authenticates but has no YouTube channel (Google account only).

**Current Handling:** Not yet implemented.

**Required Fix:**
- After OAuth, call `channels?mine=true`
- If empty response, show: "No YouTube channel found for this Google account."
- Offer to connect a different account

**Risk Level:** 🟢 Low

---

### E10: Scope Downgrade
**Scenario:** User previously granted broader scope, now we only need `youtube.readonly`.

**Current Handling:** Not yet implemented.

**Required Fix:**
- Always request minimum required scope
- If user has broader scope, Google silently approves
- If user has narrower scope, Google re-prompts
- No special handling needed — standard OAuth behavior

**Risk Level:** 🟢 Low

---

## 4. Error Handling Matrix

| Error | HTTP Status | User Message | Retry? |
|-------|-------------|--------------|--------|
| Token expired | 401 | (auto-refresh) | Yes |
| Revoked | 401 | "Please reconnect your channel" | Yes (re-auth) |
| Quota exceeded | 403 | "Daily limit reached, try tomorrow" | No |
| Access denied | 302 + error | "Connection optional, try again if you want" | Yes |
| Invalid state | 403 | "Session expired, please try again" | Yes |
| Server error | 500 | "YouTube is having issues, try later" | Yes |
| No channel | 200 (empty) | "No channel found on this account" | Yes (different account) |

---

## 5. Recommendations

1. **Implement before Creator Mode launch:** E1 (token refresh), E6 (CSRF), E7 (secure storage)
2. **Implement before public beta:** E2 (revoked), E3 (quota), E8 (callback errors)
3. **Nice to have:** E4 (denied), E5 (multi-account), E9 (no channel)

---

## 6. Implementation Checklist

- [ ] Add `state` nonce generation and validation
- [ ] Store tokens in httpOnly cookies only
- [ ] Implement server-side token refresh
- [ ] Handle `invalid_grant` (revoked) gracefully
- [ ] Handle `quotaExceeded` with user-friendly message
- [ ] Add CSRF protection to callback endpoint
- [ ] Implement logout/token revocation
- [ ] Add request caching (IndexedDB) for API responses
- [ ] Log all OAuth errors server-side
- [ ] Test with multiple Google accounts

*CTO | Viewpulse | 2026-04-28*
