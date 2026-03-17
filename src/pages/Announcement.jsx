import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Formspree ─────────────────────────────── */
const FORMSPREE_ID  = 'YOUR_FORM_ID'
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`

/* ─── LocalStorage ──────────────────────────── */
const LS_KEY = 'plevo-waitlist'
function saveEmail(e) {
  try {
    const l = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    if (!l.includes(e)) { l.push(e); localStorage.setItem(LS_KEY, JSON.stringify(l)) }
  } catch (_) {}
}

/* ─── Icons ─────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="4"/>
    <line x1="8" y1="11" x2="8" y2="17"/>
    <line x1="8" y1="8" x2="8.01" y2="8"/>
    <path d="M12 11v6M12 14a3 3 0 0 1 6 0v3"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

/* ─── Canvas Animation Hook ─────────────────── */
function useSpaceCanvas(ref) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = 0, H = 0, sphereR = 0, sCX = 0, sCY = 0, frame

    const setSize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      sphereR = Math.min(W * 0.35, 300)
      sCX = W / 2
      sCY = H * 0.46
    }

    /* Stars */
    const makeStars = () => Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.1 + 0.15,
      base: Math.random() * 0.45 + 0.07,
      drift: (Math.random() - 0.5) * 0.12,
      speed: Math.random() * 0.08 + 0.02,
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() * 0.04 + 0.008,
    }))
    let stars = makeStars()

    /* Orbital ring dots */
    const N = 14
    const orbDots = Array.from({ length: N }, (_, i) => ({
      r: i % 4 === 0 ? 2.2 : i % 2 === 0 ? 1.4 : 0.8,
      speed: 0.28 + (i % 3) * 0.06,         // rad / sec
      phase: (2 * Math.PI * i) / N,
      opacity: 0.25 + (i % 3) * 0.18,
      colR: 150 + (i % 5) * 20,
      colG: 80  + (i % 4) * 15,
    }))

    /* Shooting stars */
    let shooters = []
    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: -20,
        vx: (Math.random() - 0.5) * 2,
        vy: 3 + Math.random() * 4,
        life: 1,
        len: 40 + Math.random() * 60,
      })
    }

    /* Tilt for orbital ellipse */
    const TILT = -10 * (Math.PI / 180)
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT)

    let t = 0, lastShoot = 0

    const draw = (ts) => {
      t = ts * 0.001   // seconds
      ctx.clearRect(0, 0, W, H)

      /* ── Stars ── */
      stars.forEach(s => {
        const alpha = s.base * (0.5 + 0.5 * Math.sin(t * s.twinkle * 60 + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
        s.x += s.drift; s.y += s.speed
        if (s.y > H + 4) { s.y = -4; s.x = Math.random() * W }
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0
      })

      /* ── Orbital ring (tilted ellipse around sphere) ── */
      const rA = sphereR * 1.18   // horizontal radius
      const rB = sphereR * 0.18   // vertical (compressed = depth)

      /* Faint ring line */
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(sCX, sCY, rA, rB, TILT, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(140,60,220,0.07)'
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.restore()

      /* Dots */
      orbDots.forEach(dot => {
        const angle = dot.phase + t * dot.speed
        const ex = rA * Math.cos(angle)
        const ey = rB * Math.sin(angle)
        // apply tilt rotation
        const rx = ex * cosT - ey * sinT
        const ry = ex * sinT + ey * cosT
        const px = sCX + rx, py = sCY + ry

        // dim dots "behind" sphere (lower half of orbit = behind in our tilt)
        const isBehind = ey > 0
        const alpha = isBehind ? dot.opacity * 0.25 : dot.opacity

        ctx.save()
        if (!isBehind && dot.r > 1.5) {
          ctx.shadowBlur  = 8
          ctx.shadowColor = `rgba(${dot.colR},${dot.colG},255,0.8)`
        }
        ctx.beginPath()
        ctx.arc(px, py, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dot.colR},${dot.colG},255,${alpha})`
        ctx.fill()
        ctx.restore()
      })

      /* ── Shooting stars ── */
      if (t - lastShoot > 6 + Math.random() * 6) { spawnShooter(); lastShoot = t }
      shooters = shooters.filter(s => s.life > 0)
      shooters.forEach(s => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.len / s.vy, s.y - s.len)
        grad.addColorStop(0, `rgba(255,255,255,${s.life * 0.9})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * s.len / s.vy, s.y - s.len)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.stroke()
        s.x += s.vx; s.y += s.vy; s.life -= 0.018
      })

      frame = requestAnimationFrame(draw)
    }

    setSize()
    stars = makeStars()
    window.addEventListener('resize', () => { setSize(); stars = makeStars() })
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', setSize) }
  }, [])
}

/* ─── Main ─────────────────────────────────── */
export default function Announcement() {
  const [email, setEmail]         = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused]     = useState(false)
  const canvasRef = useRef(null)

  useSpaceCanvas(canvasRef)

  async function submit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email.'); return }
    setError(''); setLoading(true)
    if (FORMSPREE_ID !== 'YOUR_FORM_ID') {
      try {
        await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, _subject: 'New Plevo Waitlist Signup' }),
        })
      } catch (_) {}
    }
    saveEmail(email); setLoading(false); setSubmitted(true)
  }

  return (
    <div style={s.root}>
      {/* ── Top-left wordmark ── */}
      <a href="/" style={s.topWordmark} aria-label="Plevo home">plevo</a>

      {/* ── Star + orbital canvas ── */}
      <canvas ref={canvasRef} style={s.canvas} aria-hidden="true" />

      {/* ── Sphere + event-horizon glow ── */}
      <div style={s.orb} aria-hidden="true">
        <div style={s.sphere} />
        <div style={s.glowArc} />
        <div style={s.glowDiffuse} />
        {/* Rim shimmer ring */}
        <div style={s.rimShimmer} />
      </div>

      {/* ── Content ── */}
      <div style={s.content}>

        <motion.h1
          style={s.title}
          className="shimmer-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          C O M I N G &nbsp;&nbsp; S O O N
        </motion.h1>

        <motion.p
          style={s.subLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          P L E V O &nbsp; O N E
        </motion.p>

        <motion.div
          style={s.divider}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          style={s.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          The world's first smart rechargeable thermal bottle
        </motion.p>

        <motion.div
          style={s.formWrap}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" onSubmit={submit} noValidate style={s.form}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}>
                <div style={{ ...s.row, ...(focused ? s.rowFocus : {}), ...(error ? s.rowError : {}) }}>
                  <input type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    placeholder="Your email" style={s.input}
                    autoComplete="email" aria-label="Email" />
                  <button type="submit" style={s.btn} disabled={loading}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}>
                    {loading ? <span style={s.spinner} /> : <ArrowIcon />}
                  </button>
                </div>
                {error && (
                  <motion.p style={s.err} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert">
                    {error}
                  </motion.p>
                )}
                <p style={s.fine}>No spam. Unsubscribe anytime.</p>
              </motion.form>
            ) : (
              <motion.div key="ok" style={s.success}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <span style={s.checkBubble}><CheckIcon /></span>
                <span style={s.okText}>You're on the list</span>
                <span style={s.okSub}>We'll reach out when Plevo One launches.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Footer bar ── */}
      <motion.div style={s.footerBar}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}>

        {/* Nav links */}
        <nav style={s.footerNav} aria-label="Footer navigation">
          <a href="/about" style={s.footerLink}>About</a>
          <span style={s.dot} aria-hidden="true">·</span>
          <a href="https://www.instagram.com/drinkplevo?igsh=dzcwMmNxajNiYnNw" target="_blank" rel="noopener noreferrer" style={s.footerLink}>Instagram</a>
          <span style={s.dot} aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/company/drinkplevo/" target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>
        </nav>


      </motion.div>

      <style>{`
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#000; overflow:hidden; }
        input::placeholder { color: rgba(255,255,255,0.2); }

        /* Shimmer sweep on title */
        .shimmer-title {
          background: linear-gradient(
            105deg,
            rgba(255,255,255,0.88) 35%,
            rgba(220,180,255,1.0)  50%,
            rgba(255,255,255,0.88) 65%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
          animation-delay: 2.5s;
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Orbital ring rim pulse */
        @keyframes rim-spin {
          from { transform: translate(-50%,-52%) rotate(0deg); }
          to   { transform: translate(-50%,-52%) rotate(360deg); }
        }
        @keyframes orb-breathe {
          0%,100% { opacity:0.85; transform:translate(-50%,-52%) scale(1); }
          50%     { opacity:1;    transform:translate(-50%,-52%) scale(1.012); }
        }
        @keyframes arc-pulse {
          0%,100% { opacity:0.72; }
          50%     { opacity:1; }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes ring-pulse {
          0%,100% { transform:scale(1); opacity:0.4; }
          50%     { transform:scale(1.45); opacity:0; }
        }
      `}</style>
    </div>
  )
}

/* ─── Styles ──────────────────────────────────── */
const s = {
  root: {
    position: 'relative',
    width: '100vw', height: '100vh',
    background: '#000',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    zIndex: 1, pointerEvents: 'none',
  },

  /* Sphere */
  orb: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: 'none', zIndex: 2,
  },
  sphere: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-52%)',
    width:  'min(70vw,600px)', height: 'min(70vw,600px)',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse at 32% 28%, #120a1e 0%, #06030a 50%, #000 80%)',
    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.95)',
    animation: 'orb-breathe 9s ease-in-out infinite',
  },
  glowArc: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-52%)',
    width: 'min(70vw,600px)', height: 'min(70vw,600px)',
    borderRadius: '50%',
    background: [
      'radial-gradient(ellipse 90% 55% at 50% 2%,',
      '  rgba(110,55,220,0.95) 0%,',
      '  rgba(85,40,190,0.65)  18%,',
      '  rgba(60,20,140,0.32)  36%,',
      '  transparent           58%)',
    ].join(''),
    filter: 'blur(16px)',
    animation: 'arc-pulse 9s ease-in-out infinite',
  },
  glowDiffuse: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-68%)',
    width: 'min(42vw,360px)', height: 'min(20vw,170px)',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(100,40,200,0.38) 0%, transparent 70%)',
    filter: 'blur(48px)',
  },
  /* Slowly rotating highlight ring on sphere edge */
  rimShimmer: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-52%)',
    width: 'min(70vw,600px)', height: 'min(70vw,600px)',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, transparent 0%, rgba(160,100,255,0.08) 15%, transparent 30%)',
    animation: 'rim-spin 18s linear infinite',
  },

  /* Content */
  content: {
    position: 'relative', zIndex: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 12,
    width: '100%', maxWidth: 700,
    padding: '0 24px clamp(40px,8vh,72px)',
  },
  title: {
    fontFamily: "'DM Sans','Syne',sans-serif",
    fontSize: 'clamp(14px,2.2vw,26px)',
    fontWeight: 400,
    letterSpacing: '0.38em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  subLabel: {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 'clamp(9px,1.1vw,13px)',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.32)',
    letterSpacing: '0.36em',
    textAlign: 'center',
    marginTop: -4,
  },
  divider: {
    width: 32, height: 1,
    background: 'rgba(255,255,255,0.12)',
    transformOrigin: 'center',
    marginTop: 4,
  },
  tagline: {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 'clamp(10px,1.1vw,13px)',
    color: 'rgba(255,255,255,0.22)',
    letterSpacing: '0.14em',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  formWrap: {
    width: '100%', maxWidth: 380, marginTop: 8,
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
  },
  row: {
    display: 'flex', width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 999, overflow: 'hidden',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  rowFocus: {
    borderColor: 'rgba(100,60,200,0.7)',
    boxShadow: '0 0 0 3px rgba(100,60,200,0.12)',
  },
  rowError: { borderColor: 'rgba(255,80,80,0.5)' },
  input: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    padding: '12px 18px',
    fontFamily: "'DM Sans',sans-serif", fontSize: 13,
    color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em', minWidth: 0,
  },
  btn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none', borderLeft: '1px solid rgba(255,255,255,0.08)',
    color: '#fff', padding: '12px 18px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.2s', flexShrink: 0,
  },
  spinner: {
    display: 'inline-block', width: 12, height: 12,
    border: '1.5px solid rgba(255,255,255,0.2)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  err: {
    fontFamily: "'DM Sans',sans-serif", fontSize: 11,
    color: 'rgba(255,85,85,0.85)', letterSpacing: '0.04em',
  },
  fine: {
    fontFamily: "'DM Sans',sans-serif", fontSize: 10,
    color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em', textTransform: 'uppercase',
  },
  success: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
  },
  checkBubble: {
    width: 40, height: 40, borderRadius: '50%',
    background: 'rgba(0,229,196,0.08)',
    border: '1px solid rgba(0,229,196,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 20px rgba(0,229,196,0.15)',
  },
  okText: {
    fontFamily: "'DM Sans',sans-serif", fontSize: 13,
    color: 'rgba(255,255,255,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase',
  },
  okSub: {
    fontFamily: "'DM Sans',sans-serif", fontSize: 11,
    color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em',
  },
  topWordmark: {
    position: 'fixed', top: 24, left: 28,
    zIndex: 30,
    fontFamily: "'Syne',sans-serif",
    fontSize: 17, fontWeight: 700,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    textTransform: 'lowercase',
  },
  /* Footer bar */
  footerBar: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    zIndex: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '14px 32px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
    backdropFilter: 'blur(0px)',
    gap: 16,
  },
  wordmark: {
    fontFamily: "'Syne',sans-serif",
    fontSize: 15, fontWeight: 700,
    color: '#fff', letterSpacing: '0.18em',
    textTransform: 'lowercase',
    textDecoration: 'none',
    textShadow: '0 0 14px rgba(140,60,220,0.85), 0 0 32px rgba(140,60,220,0.35)',
    flexShrink: 0,
  },
  footerNav: {
    display: 'flex', alignItems: 'center', gap: 10,
    flexWrap: 'wrap', justifyContent: 'center',
  },
  footerLink: {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 11, color: 'rgba(255,255,255,0.28)',
    textDecoration: 'none', letterSpacing: '0.06em',
    transition: 'color 0.2s',
  },
  dot: {
    color: 'rgba(255,255,255,0.12)', fontSize: 11,
  },
  footerSocials: {
    display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
  },
  socialLink: {
    color: 'rgba(255,255,255,0.28)',
    display: 'flex', alignItems: 'center',
    transition: 'color 0.2s',
    textDecoration: 'none',
  },
}
