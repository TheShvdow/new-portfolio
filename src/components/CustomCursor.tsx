'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorOutline = useRef<HTMLDivElement>(null)
  const cursorText = useRef<HTMLDivElement>(null)
  const [cursorLabel, setCursorLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const dot = cursorDot.current
    const outline = cursorOutline.current
    const text = cursorText.current

    if (!dot || !outline || !text) return

    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Instant dot movement
      gsap.set(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
      })

      // Text follows cursor
      gsap.set(text, {
        x: mouseX + 25,
        y: mouseY - 10,
      })
    }

    // Smooth outline following
    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15

      gsap.set(outline, {
        x: outlineX - 20,
        y: outlineY - 20,
      })

      requestAnimationFrame(animateOutline)
    }

    // Handle hover states
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const label = target.dataset.cursor || ''
      
      setIsHovering(true)
      setCursorLabel(label)

      gsap.to(outline, {
        scale: 1.5,
        borderColor: '#00ccff',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        duration: 0.3,
      })

      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorLabel('')

      gsap.to(outline, {
        scale: 1,
        borderColor: '#00ff88',
        backgroundColor: 'transparent',
        duration: 0.3,
      })

      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      })
    }

    // Handle click
    const handleMouseDown = () => {
      setIsClicking(true)
      gsap.to(outline, {
        scale: 0.8,
        duration: 0.1,
      })
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      gsap.to(outline, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.2,
      })
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, [data-cursor]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    animateOutline()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isHovering])

  return (
    <>
      <div ref={cursorDot} className="cursor-dot" />
      <div 
        ref={cursorOutline} 
        className={`cursor-outline ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`} 
      />
      <div 
        ref={cursorText} 
        className={`cursor-text ${cursorLabel ? 'visible' : ''}`}
      >
        {cursorLabel}
      </div>
    </>
  )
}
