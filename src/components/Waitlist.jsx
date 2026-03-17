import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function Waitlist() {
  const [email, setEmail]       = useState('')
  const [error, setError]       = useState('')
  const [submitted, setSubmitted] = useState(
    () => !!localStorage.getItem('plevo_waitlist_email')
  )
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  function handleSubmit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    localStorage.setItem('plevo_waitlist_email', email)
    setSubmitted(true)
  }

  return (
    <section className="wl" id="waitlist" ref={ref}>
      {/* Faint bottom glow */}
      <div className="wl__glow" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            className="wl__body"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="wl__eyebrow">Join the waitlist</p>

            <h2 className="wl__h2">
              Something big<br />is brewing.
            </h2>

            <p className="wl__sub">
              Plevo One is currently in development.
              <br />
              Be the first to know when we launch.
            </p>

            <form className="wl__form" onSubmit={handleSubmit} noValidate>
              <div className={`wl__field${error ? ' wl__field--err' : ''}`}>
                <input
                  className="wl__input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  autoComplete="email"
                  aria-label="Email address"
                />
                <button className="wl__btn" type="submit">
                  Join waitlist
                </button>
              </div>
              {error && <p className="wl__err" role="alert">{error}</p>}
            </form>

            <p className="wl__launch">Expected launch: 2025</p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="wl__success"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="wl__check"><CheckIcon /></div>
            <h3 className="wl__ok-h">You're on the list. 🎉</h3>
            <p className="wl__ok-p">We'll notify you the moment Plevo One drops.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .wl {
          position: relative;
          min-height: 100vh;
          background: #000;
          border-top: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          overflow: hidden;
          text-align: center;
        }
        .wl__glow {
          position: absolute;
          bottom: -15%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(217,70,168,0.07) 0%, transparent 68%);
          filter: blur(60px);
          pointer-events: none;
        }

        .wl__body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          max-width: 560px;
          width: 100%;
        }
        .wl__eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #d946a8;
          margin: 0;
        }
        .wl__h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 6vw, 4.8rem);
          font-weight: 800;
          color: #f5f5f7;
          letter-spacing: -0.04em;
          line-height: 1.0;
          margin: 0;
        }
        .wl__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #6e6e73;
          line-height: 1.7;
          margin: 0;
        }

        /* Form */
        .wl__form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }
        .wl__field {
          display: flex;
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 999px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .wl__field:focus-within {
          border-color: rgba(59,158,255,0.5);
          box-shadow: 0 0 0 3px rgba(59,158,255,0.08);
        }
        .wl__field--err {
          border-color: rgba(255,80,80,0.5) !important;
        }
        .wl__input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 15px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #f5f5f7;
          min-width: 0;
        }
        .wl__input::placeholder { color: #3d3d3d; }
        .wl__btn {
          background: #f5f5f7;
          color: #000;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 12px 22px;
          margin: 4px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .wl__btn:hover { background: #fff; transform: scale(1.02); }
        .wl__err {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,80,80,0.85);
          padding-left: 20px;
          text-align: left;
          margin: 0;
        }
        .wl__launch {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: #333;
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* Success */
        .wl__success {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          max-width: 380px;
        }
        .wl__check {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: rgba(0,229,196,0.08);
          border: 1px solid rgba(0,229,196,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wl__ok-h {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          color: #f5f5f7;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .wl__ok-p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #6e6e73;
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </section>
  )
}
