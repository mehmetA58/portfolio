import { motion } from 'framer-motion'

interface HeaderProps {
  onOpenDrawer: () => void
}

export default function Header({ onOpenDrawer }: HeaderProps) {
  return (
    <header className="relative z-30 flex items-center justify-between px-5 md:px-10 py-5">
      {/* Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <span
          style={{ fontFamily: 'Anton, Impact, Arial Black, sans-serif', letterSpacing: '0.2em' }}
          className="text-white text-xl md:text-2xl uppercase select-none"
        >
          MEHMET
        </span>
        <motion.div
          className="w-9 h-9 rounded-full bg-[#CCFF00] flex items-center justify-center text-black text-base font-bold select-none"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          ✦
        </motion.div>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {['PROJECTS', 'SKILLS', 'GITHUB'].map((item) => (
          <a
            key={item}
            href={item === 'GITHUB' ? 'https://github.com/mehmetA58' : '#'}
            target={item === 'GITHUB' ? '_blank' : undefined}
            rel={item === 'GITHUB' ? 'noopener noreferrer' : undefined}
            style={{ fontFamily: 'IBM Plex Mono, SFMono-Regular, Consolas, monospace' }}
            className="text-xs text-white/60 hover:text-[#CCFF00] tracking-widest uppercase transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <motion.button
        onClick={onOpenDrawer}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        className="border border-white/20 text-white text-xs tracking-widest px-5 py-2.5 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-200 uppercase"
      >
        HIRE ME
      </motion.button>
    </header>
  )
}
