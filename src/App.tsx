import { useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import HeroContent from './components/HeroContent'
import HeroImage from './components/HeroImage'
import FooterMarquee from './components/FooterMarquee'
import InfoDrawer from './components/InfoDrawer'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: '#030014', width: '100vw', height: '100dvh' }}
    >
      {/* z-0: Three.js particle canvas (fixed) */}
      <ParticleBackground />

      {/* z-30: Sticky header */}
      <Header onOpenDrawer={() => setDrawerOpen(true)} />

      {/* z-10: Full-screen portrait + gradient overlays */}
      <HeroImage />

      {/* z-20: Text content overlaid on portrait */}
      <HeroContent />

      {/* z-30: Scrolling footer marquee */}
      <FooterMarquee />

      {/* z-50: Side drawer */}
      <InfoDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
