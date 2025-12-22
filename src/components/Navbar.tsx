'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Animation d'entrée de la navbar
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        }
      )
    }

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 80

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[9999] px-4 md:px-6 lg:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500 ${
        isScrolled ? 'bg-primary/95 backdrop-blur-lg shadow-lg' : 'bg-primary/80 backdrop-blur-sm'
      }`}
      style={{ opacity: 1 }}
    >
      <a
        href="#"
        className="font-display text-xl md:text-2xl font-extrabold tracking-tight magnetic text-white"
        data-cursor="Home"
      >
        IDY<span className="text-accent">.</span>
      </a>

      <ul className="hidden md:flex items-center gap-6 lg:gap-10">
        {['about', 'skills', 'projects', 'contact'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className="font-mono text-xs lg:text-sm font-medium uppercase tracking-widest relative group magnetic text-white/80 hover:text-white"
              data-cursor="Click"
            >
              {item === 'about' ? 'À propos' :
               item === 'skills' ? 'Compétences' :
               item === 'projects' ? 'Projets' : 'Contact'}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        ))}
      </ul>

      <a
        href="mailto:derisswvde@gmail.com"
        className="hidden md:block btn-primary text-xs lg:text-sm px-4 md:px-6 py-2 md:py-3"
        data-cursor="Email"
      >
        Disponible
      </a>
    </nav>
  )
}
