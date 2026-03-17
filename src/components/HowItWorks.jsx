import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Snap the base.',
    desc: 'Attach the magnetic charging puck. It clicks perfectly into place.',
  },
  {
    n: '02',
    title: 'Set your temp.',
    desc: 'Use the companion app or the OLED dial to choose hot or cold.',
  },
  {
    n: '03',
    title: 'Drink perfectly.',
    desc: 'Every sip tracked. Every temperature held. Every goal met.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' })

  return (
    <section className="hiw">
      <motion.div
        className="hiw__header"
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="hiw__eyebrow">How it works</p>
        <h2 className="hiw__h2">Three steps.<br />That's it.</h2>
      </motion.div>

      <div className="hiw__track" ref={lineRef}>
        {/* Connector line */}
        <div className="hiw__line-bg" aria-hidden="true">
          <motion.div
            className="hiw__line-fill"
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            className="hiw__step"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hiw__node">
              <span className="hiw__num">{s.n}</span>
            </div>
            <h3 className="hiw__title">{s.title}</h3>
            <p className="hiw__desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hiw {
          background: #000;
          padding: 120px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 72px;
          border-top: 1px solid #1a1a1a;
        }

        .hiw__header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }
        .hiw__eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3b9eff;
          margin: 0;
        }
        .hiw__h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          color: #f5f5f7;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin: 0;
        }

        /* ── Track ── */
        .hiw__track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          width: 100%;
          max-width: 900px;
        }
        @media (max-width: 640px) {
          .hiw__track { grid-template-columns: 1fr; }
          .hiw__line-bg { display: none; }
        }

        /* Connector */
        .hiw__line-bg {
          position: absolute;
          top: 18px;          /* vertically centre with node */
          left: calc(16.66% + 12px);
          right: calc(16.66% + 12px);
          height: 1px;
          background: #222;
          overflow: hidden;
        }
        .hiw__line-fill {
          position: absolute;
          inset: 0;
          background: #f5f5f7;
          transform-origin: left;
        }

        /* Step */
        .hiw__step {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }
        .hiw__node {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 1px solid #2e2e2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hiw__num {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #6e6e73;
          letter-spacing: 0.05em;
        }
        .hiw__title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f5f5f7;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .hiw__desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #6e6e73;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
    </section>
  )
}
