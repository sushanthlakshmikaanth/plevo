export default function Footer() {
  return (
    <footer className="ft">

      {/* ── Top row ───────────────────────────────────────────────── */}
      <div className="ft__top">

        {/* Brand */}
        <div className="ft__brand">
          <a href="/" className="ft__wordmark" aria-label="Plevo home">plevo</a>
          <p className="ft__tagline">hydration, elevated.</p>
        </div>

        {/* Docs */}
        <div className="ft__col">
          <span className="ft__col-heading">Docs</span>
          <nav className="ft__links" aria-label="Documentation">
            <a href="/docs/getting-started" className="ft__link">Getting Started</a>
            <a href="/docs/api"             className="ft__link">API Reference</a>
            <a href="/docs/sdk"             className="ft__link">SDK</a>
            <a href="/docs/changelog"       className="ft__link">Changelog</a>
          </nav>
        </div>

        {/* Socials */}
        <div className="ft__col">
          <span className="ft__col-heading">Connect</span>
          <nav className="ft__links" aria-label="Social media">

            {/* Instagram */}
            <a
              href="https://instagram.com/drinkplevo"
              target="_blank"
              rel="noopener noreferrer"
              className="ft__link ft__social"
              aria-label="Follow Plevo on Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/plevo"
              target="_blank"
              rel="noopener noreferrer"
              className="ft__link ft__social"
              aria-label="Follow Plevo on LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4"/>
                <line x1="8" y1="11" x2="8" y2="17"/>
                <line x1="8" y1="7" x2="8" y2="7.5"/>
                <path d="M12 11v6M12 14a3 3 0 0 1 6 0v3"/>
              </svg>
              LinkedIn
            </a>

          </nav>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────────── */}
      <div className="ft__divider" aria-hidden="true" />

      {/* ── Bottom row ────────────────────────────────────────────── */}
      <div className="ft__bottom">
        <p className="ft__copy">© 2025 Plevo. All rights reserved.</p>
        <p className="ft__legal">
          <a href="/privacy" className="ft__legal-link">Privacy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms"   className="ft__legal-link">Terms</a>
        </p>
      </div>

      <style>{`
        /* ── Shell ─────────────────────────────────────────────────── */
        .ft {
          background: #000;
          border-top: 1px solid #1a1a1a;
          padding: 64px 40px 40px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Top grid ─────────────────────────────────────────────── */
        .ft__top {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 48px;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Brand ────────────────────────────────────────────────── */
        .ft__wordmark {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #f5f5f7;
          text-decoration: none;
          display: block;
          margin-bottom: 6px;
          transition: color 0.2s;
        }
        .ft__wordmark:hover { color: #fff; }

        .ft__tagline {
          font-size: 12px;
          color: #444;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Columns ──────────────────────────────────────────────── */
        .ft__col { display: flex; flex-direction: column; gap: 12px; }

        .ft__col-heading {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3b3b3b;
          margin-bottom: 2px;
        }

        .ft__links { display: flex; flex-direction: column; gap: 10px; }

        .ft__link {
          font-size: 13px;
          color: #5a5a5a;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .ft__link:hover { color: #f5f5f7; }

        .ft__social {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        /* ── Divider ──────────────────────────────────────────────── */
        .ft__divider {
          max-width: 1100px;
          margin: 48px auto 32px;
          border-top: 1px solid #111;
        }

        /* ── Bottom ───────────────────────────────────────────────── */
        .ft__bottom {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ft__copy {
          font-size: 11px;
          color: #2e2e2e;
          letter-spacing: 0.03em;
        }

        .ft__legal {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: #2e2e2e;
        }

        .ft__legal-link {
          color: #2e2e2e;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft__legal-link:hover { color: #888; }

        /* ── Responsive ───────────────────────────────────────────── */
        @media (max-width: 640px) {
          .ft { padding: 48px 24px 32px; }
          .ft__top {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .ft__bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}
