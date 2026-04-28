"use client";

import { useState, useRef } from "react";
import { Dashboard } from "@/components/Dashboard";
import { parseHTMLExport, type WatchEvent } from "@/lib/parser";
import { Metadata } from "next";

export default function HomePage() {
  const [events, setEvents] = useState<WatchEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const html = reader.result as string;
        const parsed = parseHTMLExport(html);
        if (parsed.length === 0) {
          setError("No watch events found. Make sure this is a Google Takeout watch-history.html file.");
          setLoading(false);
          return;
        }
        setEvents(parsed);
        setLoading(false);
      } catch (err) {
        setError("Failed to parse file. Make sure it's a valid Google Takeout watch-history.html.");
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setLoading(false);
    };
    reader.readAsText(file);
  }

  if (events) {
    return <Dashboard events={events} onReset={() => { setEvents(null); setError(null); }} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-3">Viewpulse</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Upload your Google Takeout watch history and see your YouTube habits like never before.
      </p>

      <div className="space-y-2">
        <label
          htmlFor="takeout-upload"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium cursor-pointer hover:opacity-90 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {loading ? "Analyzing..." : "Upload watch-history.html"}
        </label>
        <input
          ref={fileRef}
          id="takeout-upload"
          type="file"
          accept=".html,.htm"
          className="hidden"
          onChange={handleFile}
          disabled={loading}
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive max-w-sm">{error}</p>
      )}

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl text-left">
        {[
          { title: "📊 Top Channels", desc: "See which creators you watch most, ranked by watch count." },
          { title: "⏰ Watch Patterns", desc: "Peak hours, weekday trends, and monthly binge days." },
          { title: "🔍 Keyword Cloud", desc: "Discover themes in your watch history at a glance." },
        ].map((f) => (
          <div key={f.title} className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        🔒 All processing is in your browser. Nothing is uploaded to any server.
      </p>
    </main>
  );
}