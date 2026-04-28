# Viewpulse — Agent Workspace

**Viewpulse** is a privacy-first, client-side YouTube watch history analyzer. All data processing happens in the browser — no backend, database, or API.

## Services

| Service | Command | Port | Notes |
|---|---|---|---|
| Next.js dev server | `pnpm dev` | 3013 | Fully self-contained |

## Key commands

- **Dev**: `pnpm dev` (port 3013)
- **Lint**: `pnpm lint`
- **Build**: `pnpm build`

## Gotchas

- The file parser (`lib/parser.ts`) uses `DOMParser` for HTML exports → HTML parsing only works client-side.
- `Dashboard.tsx` is ~37K lines; prefer targeted searches over full reads.
- No OAuth, no API keys, no YouTube API calls. Pure client-side.