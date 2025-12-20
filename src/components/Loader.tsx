'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide out animation
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Logo animation
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })

    // Progress bar animation
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100)
        setPercent(progress)
      },
    }, '-=0.3')

    // Logo pulse
    tl.to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.in',
    })

    tl.to(logoRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader">
      <div 
        ref={logoRef} 
        className="loader-logo"
        style={{ opacity: 0, transform: 'scale(0.8)' }}
      >
        Idy
      </div>
      <div className="loader-progress-container">
        <div ref={progressRef} className="loader-progress" style={{ width: 0 }} />
      </div>
      <div ref={percentRef} className="loader-percent">
        {percent}%
      </div>
    </div>
  )
}
