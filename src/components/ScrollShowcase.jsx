import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ─── Bottle SVG ────────────────────────────────────────────────── */
function Bottle() {
  return (
    <g>
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="20%" stopColor="#1a1a1a" />
          <stop offset="80%" stopColor="#181818" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b9eff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#3b9eff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b9eff" stopOpacity="0" />
        </radialGradient>
        <filter id="blueBlur">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Cap */}
      <rect x="48" y="8" width="84" height="32" rx="8" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="56" y="13" width="68" height="22" rx="5" fill="#252525" />
      <rect x="72" y="18" width="36" height="12" rx="3" fill="#1a1a1a" />

      {/* Shoulder */}
      <path d="M 48 40 Q 20 58 0 78 L 0 82 Q 22 62 50 45 Z" fill="#1e1e1e" />
      <path d="M 132 40 Q 160 58 180 78 L 180 82 Q 158 62 130 45 Z" fill="#181818" />

      {/* Body */}
      <rect x="0" y="78" width="180" height="322" rx="20" fill="url(#bodyGrad)" />
      {/* Left highlight */}
      <rect x="0" y="92" width="6" height="292" rx="3" fill="white" opacity="0.06" />
      {/* Right shadow */}
      <rect x="174" y="92" width="6" height="292" rx="3" fill="black" opacity="0.28" />
      {/* Center sheen */}
      <rect x="84" y="88" width="12" height="308" rx="6" fill="white" opacity="0.02" />

      {/* OLED screen */}
      <rect x="22" y="100" width="136" height="86" rx="6" fill="#0d0d0d" stroke="#2e2e2e" strokeWidth="1.2" />
      <rect x="27" y="105" width="126" height="76" rx="4" fill="#070707" />
      <text x="90" y="135" textAnchor="middle" fontFamily="monospace" fill="#3b9eff" fontSize="22" fontWeight="bold">72°C</text>
      <text x="90" y="153" textAnchor="middle" fontFamily="monospace" fill="#1a6fcc" fontSize="9" letterSpacing="2">HEATING</text>
      <rect x="30" y="163" width="46" height="6" rx="3" fill="#1a3a5a" />
      <rect x="30" y="163" width="38" height="6" rx="3" fill="#3b9eff" opacity="0.7" />

      {/* Brand label */}
      <text x="90" y="210" textAnchor="middle" fontFamily="sans-serif" fill="#282828" fontSize="8" letterSpacing="3">PLEVO ONE</text>

      {/* Grip ridges */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <rect key={i} x="4" y={235 + i * 11} width="172" height="4" rx="2" fill="#202020" />
      ))}

      {/* Side button */}
      <rect x="-10" y="312" width="14" height="52" rx="7" fill="#252525" stroke="#333" strokeWidth="1" />
      <rect x="-7" y="317" width="8" height="42" rx="5" fill="#2e2e2e" />

      {/* LED ring glow */}
      <ellipse cx="90" cy="410" rx="86" ry="20" fill="url(#ledGlow)" opacity="0.55" />
      {/* LED ring */}
      <ellipse cx="90" cy="408" rx="72" ry="11" fill="#000d1a" stroke="#3b9eff" strokeWidth="2.5" filter="url(#blueBlur)" />
      <ellipse cx="90" cy="408" rx="65" ry="8" fill="none" stroke="#3b9eff" strokeWidth="1" opacity="0.5" />
      {/* LED dots */}
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const r = (a * Math.PI) / 180
        return <circle key={i} cx={90 + Math.cos(r) * 65} cy={408 + Math.sin(r) * 8} r="2" fill="#3b9eff" opacity="0.8" />
      })}

      {/* Detachable base */}
      <rect x="12" y="413" width="156" height="28" rx="7" fill="#141414" stroke="#1e1e1e" strokeWidth="1" />
      <ellipse cx="90" cy="413" rx="42" ry="5" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
      {/* USB-C */}
      <rect x="72" y="430" width="36" height="7" rx="3.5" fill="#0a0a0a" stroke="#2e2e2e" strokeWidth="1" />
      <rect x="77" y="432" width="26" height="3" rx="1.5" fill="#1a1a1a" />
    </g>
  )
}

/* ─── Callouts ──────────────────────────────────────────────────── */
// SVG viewBox: 1000×700. Bottle local (0,0) → global (409,145). Scale 1:1.
// Card right edge (left cards) at x≈258; card left edge (right cards) at x≈742.
const CALLOUTS = [
  { title:'OLED Display',      desc:'Temp, battery & mode in real time', side:'left',  cardCy:222, linePath:'M 258,222 L 390,222 L 411,248', dotX:411, dotY:248 },
  { title:'LED Ring',          desc:'Blue status glow at the base',       side:'right', cardCy:400, linePath:'M 742,400 L 608,400 L 588,553', dotX:588, dotY:553 },
  { title:'Textured Grip',     desc:'Anti-slip precision ridges',          side:'left',  cardCy:348, linePath:'M 258,348 L 387,348 L 411,385', dotX:411, dotY:385 },
  { title:'Single Button',     desc:'Mode cycle and power',               side:'left',  cardCy:466, linePath:'M 258,466 L 378,466 L 399,460', dotX:399, dotY:460 },
  { title:'Detachable Base',   desc:'Magnetic snap connector',            side:'right', cardCy:514, linePath:'M 742,514 L 614,514 L 588,558', dotX:588, dotY:558 },
  { title:'USB-C Charging',    desc:'18W fast-charge wired backup',       side:'right', cardCy:596, linePath:'M 742,596 L 618,596 L 570,580', dotX:570, dotY:580 },
]

/* ─── Single Card (HTML, absolutely positioned) ─────────────────── */
function Card({ callout, opacity, y }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${(callout.cardCy / 700) * 100}%`,
        ...(callout.side === 'left' ? { left: 14 } : { right: 14 }),
        transform: 'translateY(-50%)',
        width: 240,
        background: 'rgba(16,16,16,0.90)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: '11px 16px',
        backdropFilter: 'blur(14px)',
        pointerEvents: 'none',
        opacity,
        y,
      }}
    >
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:'#f5f5f7', letterSpacing:'-0.01em', marginBottom:3 }}>
        {callout.title}
      </div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#6e6e73', lineHeight:1.5 }}>
        {callout.desc}
      </div>
    </motion.div>
  )
}

/* ─── ScrollShowcase ────────────────────────────────────────────── */
export default function ScrollShowcase() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  /* Bottle entrance */
  const rawY   = useTransform(scrollYProgress, [0, 0.12], [440, 0])
  const bottleY = useSpring(rawY, { stiffness: 70, damping: 18 })
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const glowOpacity   = useTransform(scrollYProgress, [0, 0.12], [0, 1])

  /* Per-callout progress — explicit (no hooks in loops) */
  const p0 = useTransform(scrollYProgress, [0.13, 0.20], [0, 1])
  const p1 = useTransform(scrollYProgress, [0.23, 0.30], [0, 1])
  const p2 = useTransform(scrollYProgress, [0.33, 0.40], [0, 1])
  const p3 = useTransform(scrollYProgress, [0.43, 0.50], [0, 1])
  const p4 = useTransform(scrollYProgress, [0.53, 0.60], [0, 1])
  const p5 = useTransform(scrollYProgress, [0.63, 0.70], [0, 1])
  const progress = [p0, p1, p2, p3, p4, p5]

  /* Card y-offsets */
  const y0 = useTransform(p0, [0,1], [16, 0])
  const y1 = useTransform(p1, [0,1], [16, 0])
  const y2 = useTransform(p2, [0,1], [16, 0])
  const y3 = useTransform(p3, [0,1], [16, 0])
  const y4 = useTransform(p4, [0,1], [16, 0])
  const y5 = useTransform(p5, [0,1], [16, 0])
  const cardYs = [y0, y1, y2, y3, y4, y5]

  /* 360 rotation */
  const rawRotate = useTransform(scrollYProgress, [0.72, 0.88], [0, 360])
  const rotateY   = useSpring(rawRotate, { stiffness: 28, damping: 16 })

  /* Final text */
  const finalOpacity = useTransform(scrollYProgress, [0.89, 0.97], [0, 1])
  const finalY       = useTransform(scrollYProgress, [0.89, 0.97], [22, 0])

  /* Header */
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])

  return (
    <section ref={sectionRef} style={{ height:'450vh', background:'#000', position:'relative' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden', background:'#000' }}>

        {/* Ambient orchid glow */}
        <motion.div
          aria-hidden="true"
          style={{
            position:'absolute', left:'50%', top:'50%',
            transform:'translate(-50%,-50%)',
            width:520, height:520, borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(123,45,139,0.13) 0%, transparent 68%)',
            filter:'blur(60px)',
            opacity: glowOpacity,
            pointerEvents:'none',
          }}
        />

        {/* Section header */}
        <motion.div
          style={{ position:'absolute', top:'7%', left:'50%', x:'-50%', textAlign:'center', opacity:headerOpacity, pointerEvents:'none' }}
        >
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#3b9eff', margin:0 }}>
            Design
          </p>
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(1.6rem,3.5vw,2.6rem)', fontWeight:800, color:'#f5f5f7', letterSpacing:'-0.04em', margin:'8px 0 0' }}>
            Meet Plevo One.
          </p>
        </motion.div>

        {/* Lines + dots SVG overlay */}
        <svg
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          {CALLOUTS.map((c, i) => (
            <g key={c.title}>
              <motion.path
                d={c.linePath}
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: progress[i] }}
              />
              <motion.circle cx={c.dotX} cy={c.dotY} r={3.5} fill="#3b9eff"
                style={{ opacity: progress[i] }} />
              <motion.circle cx={c.dotX} cy={c.dotY} r={8} fill="none"
                stroke="#3b9eff" strokeWidth="1"
                style={{ opacity: useTransform(progress[i], [0,1], [0, 0.3]) }} />
            </g>
          ))}
        </svg>

        {/* Bottle */}
        <motion.div
          style={{
            position:'absolute', left:'50%', top:'50%',
            x:'-50%', y: bottleY,
            opacity: bottleOpacity,
            rotateY,
            transformPerspective: 1400,
          }}
        >
          <svg viewBox="0 0 180 444" width={168} height={415} style={{ display:'block', overflow:'visible' }}>
            <Bottle />
          </svg>
        </motion.div>

        {/* Cards */}
        {CALLOUTS.map((c, i) => (
          <Card key={c.title} callout={c} opacity={progress[i]} y={cardYs[i]} />
        ))}

        {/* Final text */}
        <motion.div
          style={{
            position:'absolute', bottom:'10%', left:'50%', x:'-50%',
            opacity: finalOpacity, y: finalY,
            textAlign:'center', pointerEvents:'none',
          }}
        >
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(1.1rem,2.6vw,1.9rem)', fontWeight:800, color:'#f5f5f7', letterSpacing:'-0.035em', margin:0, lineHeight:1.25 }}>
            Every detail.<br />
            <span style={{ color:'#6e6e73' }}>Engineered for you.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
