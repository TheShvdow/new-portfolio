'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      className="px-4 md:px-6 lg:px-12 py-6 md:py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4"
    >
      <div className="font-mono text-xs md:text-sm text-[#666] text-center md:text-left">
        © {new Date().getFullYear()} TheShvdow. Tous droits réservés.
      </div>

      <div className="font-mono text-xs md:text-sm text-[#666] text-center md:text-left">
        Construit avec ❤️ et{' '}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Next.js
        </a>
      </div>
    </footer>
  )
}
