import { motion } from 'framer-motion'

export default function HeroImage() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {/* Portrait — full-screen, centered on face */}
      <motion.img
        src={`${import.meta.env.BASE_URL}mehmet.jpeg`}
        alt="Mehmet"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '100%',
          width: 'auto',
          minWidth: '100%',
          objectFit: 'cover',
          objectPosition: '50% 18%',
          filter: 'grayscale(1) contrast(1.15) brightness(0.88)',
        }}
      />

      {/* Left edge — very narrow dark strip only for text backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(3,0,20,0.75) 0%, rgba(3,0,20,0.3) 22%, rgba(3,0,20,0.0) 42%)',
        }}
      />
      {/* Right edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to left, rgba(3,0,20,0.88) 0%, rgba(3,0,20,0.3) 22%, rgba(3,0,20,0.0) 42%)',
        }}
      />
      {/* Top — header area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,0,20,0.75) 0%, rgba(3,0,20,0.0) 22%)',
        }}
      />
      {/* Bottom — footer marquee + text block area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(3,0,20,0.92) 0%, rgba(3,0,20,0.45) 20%, rgba(3,0,20,0.0) 38%)',
        }}
      />
    </div>
  )
}
