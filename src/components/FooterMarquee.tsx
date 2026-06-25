export default function FooterMarquee() {
  const text = 'MEHMET AKBAYIR // QA AUTOMATION ENGINEER // MEHMET AKBAYIR // QA AUTOMATION ENGINEER // '

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ height: 'clamp(40px, 6vw, 80px)' }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate for seamless loop */}
        {[text, text].map((t, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: 'Anton, Impact, Arial Black, sans-serif',
              fontSize: 'clamp(24px, 4.5vw, 64px)',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.12)',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              paddingRight: '2rem',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
