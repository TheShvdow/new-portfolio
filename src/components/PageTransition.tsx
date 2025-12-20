'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition() {
  const transitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial page load transition
    const panels = transitionRef.current?.querySelectorAll('.transition-panel')
    
    if (panels) {
      // Slide out animation after page load
      gsap.to(panels, {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.inOut',
        delay: 0.2,
        transformOrigin: 'top',
      })
    }
  }, [])

  return (
    <div ref={transitionRef} className="page-transition">
      <div className="transition-panel" style={{ transformOrigin: 'bottom', transform: 'scaleY(1)' }} />
      <div className="transition-panel" style={{ transformOrigin: 'bottom', transform: 'scaleY(1)' }} />
      <div className="transition-panel" style={{ transformOrigin: 'bottom', transform: 'scaleY(1)' }} />
      <div className="transition-panel" style={{ transformOrigin: 'bottom', transform: 'scaleY(1)' }} />
    </div>
  )
}
