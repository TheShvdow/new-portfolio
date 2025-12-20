'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Initial animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 2.5,
      ease: 'power3.out',
    })

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.5,
        ease: 'power3.inOut',
      })
    }
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${
        isScrolled ? 'bg-primary/90 backdrop-blur-lg' : ''
      }`}
      style={{ mixBlendMode: isScrolled ? 'normal' : 'difference' }}
    >
      <a 
        href="#" 
        className="font-display text-2xl font-extrabold tracking-tight magnetic"
        data-cursor="Home"
      >
        IDY<span className="text-accent">.</span>
      </a>
      
      <ul className="hidden md:flex items-center gap-10">
        {['about', 'skills', 'projects', 'contact'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className="font-mono text-sm font-medium uppercase tracking-widest relative group magnetic"
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
        href="mailto:votre.email@exemple.com" 
        className="hidden md:block btn-primary text-sm"
        data-cursor="Email"
      >
        Disponible
      </a>
    </nav>
  )
}
