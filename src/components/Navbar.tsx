'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)

    const tl = gsap.timeline()
    tl.to(text1Ref.current, {
      y: -30,
      opacity: 0,
      rotateX: 90,
      duration: 0.3,
      ease: 'power2.in',
    })
    tl.fromTo(
      text2Ref.current,
      { y: 30, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.1'
    )

    gsap.to(btnRef.current, {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(0,255,136,0.5)',
      duration: 0.3,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)

    const tl = gsap.timeline()
    tl.to(text2Ref.current, {
      y: 30,
      opacity: 0,
      rotateX: -90,
      duration: 0.3,
      ease: 'power2.in',
    })
    tl.fromTo(
      text1Ref.current,
      { y: -30, opacity: 0, rotateX: 90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.1'
    )

    gsap.to(btnRef.current, {
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.3,
    })
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[9999] px-4 md:px-6 lg:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500 ${
        isScrolled
          ? 'bg-primary/95 backdrop-blur-lg shadow-lg'
          : 'bg-primary/80 backdrop-blur-sm'
      }`}
    >
      {/* LOGO */}
      <a
        href="#"
        className="font-display text-xl md:text-2xl font-extrabold tracking-tight magnetic text-white"
        data-cursor="Home"
      >
        IDY<span className="text-accent">.</span>
      </a>

      {/* MENU */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-10">
        {['about', 'skills', 'projects', 'contact'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className="font-mono text-xs lg:text-sm uppercase tracking-widest relative group magnetic text-white/80 hover:text-white"
            >
              {item === 'about'
                ? 'À propos'
                : item === 'skills'
                ? 'Compétences'
                : item === 'projects'
                ? 'Projets'
                : 'Contact'}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        ))}
      </ul>

      {/* BOUTON CV */}
      <a
        ref={btnRef}
        href="https://res.cloudinary.com/dgro5x4h8/image/upload/fl_attachment/v1766383040/CV_Idrissa_Wade_ifgelb.pdf"
        download="CV-idrissa-wade-Fullstack-Developer.pdf"
        className="hidden md:block btn-primary text-xs lg:text-sm px-4 md:px-6 py-2 md:py-3 relative overflow-hidden"
        style={{ perspective: '500px' }}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={isHovered ? 'Download' : 'Email'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative block h-5 overflow-hidden">
          <span ref={text1Ref} className="block">
            🟢 Disponible
          </span>
          <span
            ref={text2Ref}
            className="absolute inset-0 flex items-center justify-center gap-2 opacity-0"
          >
            Download CV
          </span>
        </span>
      </a>
    </nav>
  )
}
