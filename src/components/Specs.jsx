import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SPECS = [
  { label: 'Temp Range',    value: '10 – 85°C' },
  { label: 'Battery',       value: '6 – 8 hrs' },
  { label: 'Charging',      value: 'USB-C 18W' },
  { label: 'Connectivity',  value: 'Bluetooth 5.0' },
  { label: 'Capacity',      value: '500 ml' },
  { label: 'Material',      value: '316 Steel' },
  { label: 'Price',         value: '₹1,999' },
  { label: 'Finish',        value: 'Matte Black' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Specs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="specs">
      <motion.div
        className="specs__header"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="specs__eyebrow">Technical specs</p>
        <h2 className="specs__h2">The numbers.</h2>
      </motion.div>

      <motion.div
        className="specs__grid"
        ref={ref}
        variants={grid}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {SPECS.map((s) => (
          <motion.div key={s.label} className="specs__row" variants={item}>
            <span className="specs__label">{s.label}</span>
            <span className="specs__value">{s.value}</span>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .specs {
          background: #000;
          border-top: 1px solid #1a1a1a;
          padding: 120px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 64px;
        }

        .specs__header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
        .specs__eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #00e5c4;
          margin: 0;
        }
        .specs__h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          color: #f5f5f7;
          letter-spacing: -0.04em;
          margin: 0;
        }

        /* Apple-style spec table — two columns, full-bleed rows */
        .specs__grid {
          width: 100%;
          max-width: 700px;
          display: flex;
          flex-direction: column;
        }

        .specs__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 22px 0;
          border-bottom: 1px solid #1a1a1a;
          gap: 24px;
        }
        .specs__row:first-child { border-top: 1px solid #1a1a1a; }

        .specs__label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #6e6e73;
          font-weight: 400;
          flex-shrink: 0;
        }
        .specs__value {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f5f5f7;
          letter-spacing: -0.02em;
          text-align: right;
        }
      `}</style>
    </section>
  )
}
