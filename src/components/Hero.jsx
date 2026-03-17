import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  return (
    <section className="hero">
      {/* Ultra-subtle ambient light */}
      <div className="hero__ambient" aria-hidden="true" />

      <div className="hero__inner">
        {/* Badge */}
        <motion.div className="hero__badge" {...fadeUp(0.1)}>
          <span className="hero__badge-dot" />
          In development
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero__h1" {...fadeUp(0.22)}>
          Hydration,
          <br />
          <span className="hero__h1-dim">perfected.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p className="hero__sub" {...fadeUp(0.38)}>
          The world's first smart rechargeable thermal bottle.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero__ctas" {...fadeUp(0.52)}>
          <a href="#waitlist" className="hero__cta-primary">
            Get early access <span aria-hidden="true">→</span>
          </a>
          <a href="#features" className="hero__cta-ghost">
            Learn more <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      />

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px 80px;
          overflow: hidden;
        }

        /* Single, barely-visible ambient glow at dead center bottom */
        .hero__ambient {
          position: absolute;
          bottom: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 720px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(123,45,139,0.09) 0%, transparent 68%);
          pointer-events: none;
          filter: blur(40px);
        }

        .hero__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          max-width: 860px;
        }

        /* Badge — Apple-style minimal */
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 999px;
          padding: 6px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #86868b;
          text-transform: uppercase;
        }
        .hero__badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d946a8;
          box-shadow: 0 0 8px rgba(217,70,168,0.7);
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        /* Headline — full-bleed Apple scale */
        .hero__h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.6rem, 9.5vw, 7.6rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #f5f5f7;
          margin: 0;
        }
        .hero__h1-dim {
          color: #6e6e73; /* Apple's secondary label gray */
        }

        /* Sub */
        .hero__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          font-weight: 400;
          color: #6e6e73;
          line-height: 1.6;
          margin: 0;
          max-width: 460px;
        }

        /* CTAs */
        .hero__ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }
        .hero__cta-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #000;
          background: #f5f5f7;
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          letter-spacing: -0.01em;
        }
        .hero__cta-primary:hover {
          background: #fff;
          transform: translateY(-1px);
        }
        .hero__cta-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #3b9eff;
          padding: 13px 24px;
          border-radius: 999px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hero__cta-ghost:hover { color: #6ab8ff; }

        /* Scroll indicator */
        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%) scaleY(1);
          transform-origin: top center;
          width: 1px;
          height: 52px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
        }

        @media (max-width: 600px) {
          .hero__h1 { letter-spacing: -0.03em; }
          .hero__ctas { flex-direction: column; align-items: center; }
        }
      `}</style>
    </section>
  )
}
