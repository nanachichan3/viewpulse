import { BarChart2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { githubUrl } from '@/lib/links';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        <BarChart2 size={18} />
        <span>ViewPulse</span>
        <span className="brand-dot" />
      </Link>

      <nav className="site-nav">
        <Link href="/#how">How it works</Link>
        <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="View source on GitHub">
          <ExternalLink size={16} />
        </a>
      </nav>
    </header>
  );
}
