import { motion } from 'framer-motion'

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <div style={s.root}>

      {/* Top-left wordmark */}
      <a href="/" style={s.topWordmark}>plevo</a>

      {/* Centered content */}
      <main style={s.main}>

        {/* Label */}
        <motion.span style={s.label} {...fade(0.1)}>
          ABOUT
        </motion.span>

        {/* Heading */}
        <motion.h1 style={s.heading} {...fade(0.3)}>
          We're building<br />
          something we<br />
          actually wanted.
        </motion.h1>

        {/* Body paragraphs */}
        <motion.p style={s.body} {...fade(0.5)}>
          Plevo started with a simple frustration. No water bottle in the world could heat, cool, track and sync — all in one. So we decided to build it ourselves.
        </motion.p>

        <motion.p style={s.body} {...fade(0.7)}>
          We're a small team based in Chennai, India. We're not backed by billions. Just driven by the belief that everyday objects deserve to be smarter.
        </motion.p>

        <motion.p style={s.body} {...fade(0.9)}>
          Plevo One is currently in development. Every detail is being engineered from scratch — the detachable magnetic base, the OLED display, the app. We're doing this right.
        </motion.p>

        {/* Location */}
        <motion.p style={s.location} {...fade(1.1)}>
          Chennai, India · Est. 2025
        </motion.p>

        {/* Back link */}
        <motion.a href="/" style={s.back} {...fade(1.3)}>
          ← plevo.com
        </motion.a>

      </main>
    </div>
  )
}

const s = {
  root: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    position: 'relative',
  },

  topWordmark: {
    position: 'fixed', top: 24, left: 28,
    fontFamily: "'Syne', sans-serif",
    fontSize: 17, fontWeight: 700,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    textTransform: 'lowercase',
    zIndex: 30,
  },

  main: {
    width: '100%',
    maxWidth: 640,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },

  label: {
    display: 'block',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.18em',
    color: '#444',
    textTransform: 'uppercase',
  },

  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: 700,
    color: '#f0f0f0',
    lineHeight: 1.12,
    letterSpacing: '-0.03em',
    margin: 0,
  },

  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    color: '#888',
    lineHeight: 1.8,
    margin: 0,
  },

  location: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: '#aaa',
    lineHeight: 1.6,
    margin: '8px 0 0',
    letterSpacing: '0.02em',
  },

  back: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: '#444',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    marginTop: 16,
    display: 'inline-block',
    transition: 'color 0.2s',
  },
}
