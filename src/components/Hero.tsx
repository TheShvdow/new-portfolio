'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleLine1Ref = useRef<HTMLDivElement>(null)
  const titleLine2Ref = useRef<HTMLDivElement>(null)
  const titleLine3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Attendre que les éléments soient montés
    if (!heroRef.current || !titleLine1Ref.current || !titleLine2Ref.current || !titleLine3Ref.current) {
      return
    }

    const tl = gsap.timeline({ delay: 2.8 })

    // Background parallax effect
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Subtitle slide in from left
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    }

    // Title lines - staggered slide up with rotation
    tl.fromTo([titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
      { y: 150, opacity: 0, rotateX: 45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      },
      '-=0.4'
    )

    // Description fade in
    if (descRef.current) {
      tl.fromTo(descRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
    }

    // CTA buttons slide up
    if (ctaRef.current?.children) {
      tl.fromTo(ctaRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      )
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )

      // Continuous scroll indicator animation
      const scrollLine = scrollRef.current.querySelector('.scroll-line')
      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleY: 0.5,
          opacity: 0.5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        })
      }
    }

    // Hero parallax on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const titles = [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current].filter(Boolean)
        if (titles.length > 0) {
          gsap.to(titles, {
            y: self.progress * 100,
            opacity: 1 - self.progress * 0.5,
            stagger: 0.02,
          })
        }
      },
    })

    // Cleanup
    return () => {
      parallaxTrigger.kill()
    }
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pb-8 px-4">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-accent-secondary/10 rounded-full blur-[100px] md:blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        <p
          ref={subtitleRef}
          className="font-mono text-xs sm:text-sm text-accent tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-4 md:mb-6 py-4 md:py-8"
        >
          Fullstack Developer • Dakar, Sénégal
        </p>

        <h1 className="font-display font-extrabold leading-[1] md:leading-[0.95] lg:leading-[0.9] tracking-tight mb-6 md:mb-8 -mx-2" style={{ perspective: '1000px' }}>
          <div ref={titleLine1Ref} className="overflow-hidden">
            <span className="block text-[clamp(2.2rem,9vw,10rem)] px-2">Je crée des</span>
          </div>
          <div ref={titleLine2Ref} className="overflow-hidden">
            <span className="block text-[clamp(2rem,8vw,7rem)] gradient-text px-2">expériences</span>
          </div>
          <div ref={titleLine3Ref} className="overflow-hidden">
            <span className="block text-[clamp(2.2rem,9vw,10rem)] px-2">digitales.</span>
          </div>
        </h1>

        <p
          ref={descRef}
          className="text-base md:text-lg lg:text-xl text-[#888] max-w-xl leading-relaxed mb-8 md:mb-10 pt-4 md:pt-8"
        >
          Développeur Fullstack passionné spécialisé en Node.js, Express, React et Next.js.
          Je transforme vos idées en applications web performantes et élégantes.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5">
          <a
            href="#projects"
            className="btn-primary magnetic text-center"
            data-cursor="Voir"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="btn-secondary magnetic text-center"
            data-cursor="Contact"
          >
            Me contacter
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3"
      >
        <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#666]">Scroll</span>
        <div className="scroll-line w-px h-12 md:h-16 bg-gradient-to-b from-accent to-transparent origin-top" />
      </div>

      {/* Floating Elements */}
      <div className="absolute right-10 top-1/4 floating hidden lg:block">
        <div className="w-20 h-20 border border-accent/30 rounded-2xl rotate-12" />
      </div>
      <div className="absolute left-20 bottom-1/4 floating hidden lg:block" style={{ animationDelay: '-3s' }}>
        <div className="w-14 h-14 bg-accent/10 rounded-full" />
      </div>
    </section>
  )
}
