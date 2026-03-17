import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '🔥',
    title: 'Active Heating',
    desc: 'Maintains your drink at up to 74 °C for 6 continuous hours.',
  },
  {
    icon: '❄️',
    title: 'Active Cooling',
    desc: 'Keeps beverages ice-cold at 4 °C even in extreme heat.',
  },
  {
    icon: '💧',
    title: 'Hydration Tracking',
    desc: 'Smart sensors log every sip toward your daily goal.',
  },
  {
    icon: '📲',
    title: 'Bluetooth App Sync',
    desc: 'Seamless iOS & Android pairing for real-time insights.',
  },
  {
    icon: '🔌',
    title: 'Magnetic Base',
    desc: 'Detachable wireless puck. Click. Charge. Done.',
  },
  {
    icon: '🖥️',
    title: 'OLED Display',
    desc: 'Always-on screen shows temp, battery and mode at a glance.',
  },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="feat" id="features">
      <motion.div
        className="feat__header"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        ref={ref}
      >
        <p className="feat__eyebrow">Capabilities</p>
        <h2 className="feat__h2">Built different.</h2>
      </motion.div>

      <motion.div
        className="feat__grid"
        variants={grid}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {FEATURES.map((f) => (
          <motion.div key={f.title} className="feat__card" variants={card}>
            <span className="feat__icon" role="img" aria-label={f.title}>{f.icon}</span>
            <h3 className="feat__name">{f.title}</h3>
            <p className="feat__desc">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .feat {
          background: #000;
          padding: 120px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 64px;
        }

        .feat__header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
        .feat__eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3b9eff;
          margin: 0;
        }
        .feat__h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          color: #f5f5f7;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1.05;
        }

        .feat__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px; /* Apple uses razor-thin gaps */
          width: 100%;
          max-width: 1000px;
          background: #1a1a1a; /* gap color */
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #1a1a1a;
        }
        @media (max-width: 860px) {
          .feat__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .feat__grid { grid-template-columns: 1fr; }
        }

        .feat__card {
          background: #0a0a0a;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.25s ease;
        }
        .feat__card:hover { background: #111; }

        .feat__icon {
          font-size: 28px;
          line-height: 1;
        }
        .feat__name {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f5f5f7;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .feat__desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #6e6e73;
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </section>
  )
}
