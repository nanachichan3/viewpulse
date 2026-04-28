export interface WatchEvent {
  title: string;
  videoId?: string;
  channelName: string;
  channelUrl?: string;
  watchedAt: Date;
  source: 'youtube' | 'youtube-music';
}

const MIN_VALID_WATCH_DATE = new Date('2005-01-01T00:00:00.000Z');

function getMaxValidWatchDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
}

function isValidWatchDate(value: Date): boolean {
  const time = value.getTime();
  if (Number.isNaN(time)) return false;
  return time >= MIN_VALID_WATCH_DATE.getTime() && time <= getMaxValidWatchDate().getTime();
}

/**
 * Parses Google Takeout watch-history.html
 * Note: Uses DOMParser – only call from client-side code.
 */
export function parseHTMLExport(content: string): WatchEvent[] {
  if (typeof window === 'undefined') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const cells = doc.querySelectorAll('.outer-cell');
  const events: WatchEvent[] = [];

  cells.forEach((cell) => {
    try {
      // Detect source from header cell
      const headerText = cell.querySelector('.header-cell p')?.textContent?.trim() ?? '';
      const source: 'youtube' | 'youtube-music' = headerText.includes('Music')
        ? 'youtube-music'
        : 'youtube';

      const contentCell = cell.querySelector('.content-cell');
      if (!contentCell) return;

      const links = Array.from(contentCell.querySelectorAll('a'));
      if (links.length === 0) return; // Deleted/removed video

      // First link is the video
      const videoHref = links[0].getAttribute('href') ?? '';
      const title = links[0].textContent?.trim() ?? '';
      if (!title) return;

      // Extract videoId from URL
      let videoId: string | undefined;
      const vidMatch = videoHref.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      if (vidMatch) videoId = vidMatch[1];

      // Second link is channel
      let channelName = 'Unknown';
      let channelUrl: string | undefined;
      if (links.length > 1) {
        channelName = links[1].textContent?.trim() || 'Unknown';
        channelUrl = links[1].getAttribute('href') ?? undefined;
      }

      // Date: find the text node that looks like a date (contains 4-digit year)
      const fullText = contentCell.textContent ?? '';
      const lines = fullText.split('\n').map((s) => s.trim()).filter(Boolean);
      const dateLine = lines.find(
        (l) => /\d{4}/.test(l) && /[A-Z][a-z]{2}/.test(l)
      );
      if (!dateLine) return;

      // Strip timezone suffix (e.g. "EST", "PDT", "CEST") and "at" separator
      // Google Takeout format: "Dec 25, 2023 at 3:45:22 PM EST"
      const cleanDate = dateLine
        .replace(/\s+[A-Z]{2,5}$/, '')
        .replace(/\s+at\s+/i, ' ')
        .replace(/\s*(\d{1,2}:\d{2}:\d{2}\s*(?:AM|PM)?)\s*$/i, ' $1')
        .trim();
      // Parse date components manually since new Date() doesn't handle this format reliably
      const dateParts = cleanDate.match(/([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\s+(?:(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)?)?/i);
      let watchedAt: Date;
      if (dateParts) {
        const [, monthStr, dayStr, yearStr, hoursStr = '0', minutesStr = '0', secondsStr = '0', ampm] = dateParts;
        const monthMap: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        const month = monthMap[monthStr.toLowerCase().slice(0, 3)] ?? 0;
        const day = parseInt(dayStr, 10);
        const year = parseInt(yearStr, 10);
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        const seconds = parseInt(secondsStr, 10);
        if (ampm?.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (ampm?.toUpperCase() === 'AM' && hours === 12) hours = 0;
        watchedAt = new Date(year, month, day, hours, minutes, seconds);
      } else {
        watchedAt = new Date(cleanDate);
      }
      if (!isValidWatchDate(watchedAt)) return;

      events.push({ title, videoId, channelName, channelUrl, watchedAt, source });
    } catch {
      // Skip malformed entries
    }
  });

  return events;
}

/**
 * Parses Google Takeout watch-history.json
 * Pure JS – no browser APIs required.
 */
export function parseJSONExport(content: string): WatchEvent[] {
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    return [];
  }

  if (!Array.isArray(data)) return [];

  const events: WatchEvent[] = [];

  for (const item of data) {
    try {
      if (typeof item !== 'object' || item === null) continue;
      const record = item as Record<string, unknown>;

      // Filter by activityControls
      const controls = record.activityControls;
      if (!Array.isArray(controls)) continue;
      const strs = controls as string[];
      const isYT = strs.some((c) => c.includes('YouTube watch history'));
      const isMusic = strs.some((c) => c.includes('YouTube Music watch history'));
      if (!isYT && !isMusic) continue;

      // Source detection
      const products = record.products;
      const source: 'youtube' | 'youtube-music' =
        Array.isArray(products) && (products as string[]).includes('YouTube Music')
          ? 'youtube-music'
          : 'youtube';

      // Title – strip "Watched " prefix
      let title = String(record.title ?? '').replace(/^Watched\s+/, '').trim();
      if (!title || title === 'Watched') continue;

      // videoId from titleUrl
      const titleUrl = record.titleUrl as string | undefined;
      let videoId: string | undefined;
      if (titleUrl) {
        const m = titleUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (m) videoId = m[1];
      }

      // Channel from subtitles array
      let channelName = 'Unknown';
      let channelUrl: string | undefined;
      const subs = record.subtitles;
      if (Array.isArray(subs) && subs.length > 0) {
        const sub = subs[0] as Record<string, unknown>;
        channelName = String(sub.name ?? 'Unknown');
        channelUrl = sub.url as string | undefined;
      }

      // Time (ISO 8601)
      const timeStr = record.time as string;
      if (!timeStr) continue;
      const watchedAt = new Date(timeStr);
      if (!isValidWatchDate(watchedAt)) continue;

      events.push({ title, videoId, channelName, channelUrl, watchedAt, source });
    } catch {
      // Skip malformed entries
    }
  }

  return events;
}

/** Auto-detects format from filename and parses accordingly. */
export async function parseExportFile(file: File): Promise<WatchEvent[]> {
  const content = await file.text();
  if (file.name.toLowerCase().endsWith('.json')) {
    return parseJSONExport(content);
  }
  return parseHTMLExport(content);
}
