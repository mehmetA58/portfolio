import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrambleText from './ScrambleText'

const ROTATING_WORDS = ['QUALITY', 'PRECISION', 'COVERAGE']

const BIO =
  "I'm Mehmet — a QA Automation Engineer with 3+ years building scalable test frameworks across web, mobile & API layers. I catch bugs early so they never reach production."

const mono = { fontFamily: 'IBM Plex Mono, SFMono-Regular, Consolas, monospace' }
const display = { fontFamily: 'Anton, Impact, Arial Black, sans-serif' }
const sans = { fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif' }

export default function HeroContent() {
  const [wordIndex, setWordIndex] = useState(0)
  const [bioKey, setBioKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setBioKey((k) => k + 1), 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">

      {/* ── RIGHT SIDE: Bio block ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute hidden md:block"
        style={{ right: 'clamp(32px, 5vw, 80px)', bottom: '26%', maxWidth: 260 }}
      >
        <motion.p
          key={bioKey}
          style={{ ...sans, fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, textAlign: 'right' }}
        >
          {BIO.split('').map((char, i) => (
            <motion.span
              key={`${bioKey}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.014, duration: 0.04 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ ...mono, fontSize: 10, color: '#CCFF00', letterSpacing: '0.12em', textAlign: 'right', marginTop: 14 }}
        >
          ✦ BASED IN ISTANBUL, TURKEY
        </motion.p>
      </motion.div>

      {/* ── LEFT SIDE: Main headline block ── */}
      <div
        className="absolute"
        style={{
          left: 'clamp(24px, 5vw, 72px)',
          bottom: 'clamp(70px, 12vh, 140px)',
          maxWidth: 'clamp(260px, 36vw, 520px)', // constrains to left zone, away from face
        }}
      >
        {/* "TEST WITH" stroke headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            ...display,
            fontSize: 'clamp(18px, 3.2vw, 48px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
            lineHeight: 1,
            letterSpacing: '0.04em',
            textShadow: '0 0 40px rgba(3,0,20,0.95), 0 0 20px rgba(3,0,20,0.8)',
          }}
        >
          TEST WITH
        </motion.div>

        {/* Rotating lime-green word */}
        <div style={{ lineHeight: 0.88, marginTop: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScrambleText
                text={ROTATING_WORDS[wordIndex]}
                style={{
                  ...display,
                  fontSize: 'clamp(50px, 8vw, 118px)',
                  color: '#CCFF00',
                  lineHeight: 0.88,
                  display: 'block',
                  letterSpacing: '0.01em',
                  filter: 'drop-shadow(0 0 28px rgba(3,0,20,0.9)) drop-shadow(0 2px 8px rgba(0,0,0,0.9))',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-2 mt-5"
        >
          <span style={{ color: '#CCFF00', fontSize: 10 }}>✦</span>
          <span
            style={{ ...mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em' }}
          >
            QA AUTOMATION ENGINEER
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.04, backgroundColor: '#CCFF00', color: '#000', borderColor: '#CCFF00' }}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto mt-5 flex items-center gap-3 border border-white/25 text-white/80 transition-colors duration-200"
          style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', padding: '10px 22px' }}
        >
          VIEW PROJECTS
          <span className="text-[#CCFF00]">→</span>
        </motion.button>

        {/* Mobile bio (only shown on mobile) */}
        <motion.p
          key={bioKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="block md:hidden mt-5 max-w-xs"
          style={{ ...sans, fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}
        >
          {BIO}
        </motion.p>
      </div>

      {/* ── Stats row (small, bottom-right on mobile) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute hidden lg:flex items-center gap-10"
        style={{ right: 'clamp(32px, 5vw, 80px)', bottom: 'clamp(80px, 10vh, 120px)' }}
      >
        {[
          { value: '3+', label: 'Years XP' },
          { value: '~40%', label: 'Faster Tests' },
          { value: '5', label: 'Companies' },
        ].map(({ value, label }) => (
          <div key={label} className="text-right">
            <div style={{ ...display, color: '#CCFF00', fontSize: 'clamp(18px, 2.2vw, 32px)', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ ...mono, color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.12em', marginTop: 4 }}>
              {label.toUpperCase()}
            </div>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
