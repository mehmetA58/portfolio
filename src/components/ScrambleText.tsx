import React, { useState, useEffect, useRef } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export default function ScrambleText({ text, className, style }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const iterRef = useRef(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    iterRef.current = 0
    let frame = 0

    const animate = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < iterRef.current) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (frame % 2 === 0) iterRef.current += 1
      frame++
      if (iterRef.current <= text.length) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text])

  return <span className={className} style={style}>{display}</span>
}
