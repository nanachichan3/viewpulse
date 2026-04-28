import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

type UseCasePageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  children?: ReactNode;
};

export function UseCasePage({ eyebrow, title, lead, bullets, children }: UseCasePageProps) {
  return (
    <main className="page-shell">
      <section className="use-case-hero">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lead">{lead}</p>
      </section>

      <div className="use-case-body">
        <div className="use-case-sidebar">
          <div className="use-case-card">
            <h3>Key capabilities</h3>
            <ul className="use-case-list">
              {bullets.map((bullet) => (
                <li key={bullet} className="use-case-list__item">
                  <CheckCircle2 className="use-case-list__icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="use-case-content">
          {children}
        </div>
      </div>
    </main>
  );
}
