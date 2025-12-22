'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/theshvdow',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/idrissa-wade',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/votre-profil',
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  //     </svg>
  //   ),
  // },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section slide in from bottom
    gsap.fromTo(sectionRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    })

    // Title words animation
    const titleWords = titleRef.current?.querySelectorAll('.word')
    tl.fromTo(titleWords!,
      { y: 150, opacity: 0, rotateX: 45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
    )

    // Subtitle
    tl.fromTo(
      sectionRef.current!.querySelector('.subtitle'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    // Email with magnetic effect
    tl.fromTo(emailRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // Socials staggered
    tl.fromTo(socialsRef.current?.children || [],
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.4'
    )

    // Email hover effect
    const email = emailRef.current
    if (email) {
      email.addEventListener('mouseenter', () => {
        gsap.to(email, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
      email.addEventListener('mouseleave', () => {
        gsap.to(email, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 bg-secondary text-center relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <p className="font-mono text-xs md:text-sm text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6">
          Contact
        </p>

        <h2
          ref={titleRef}
          className="font-display text-[clamp(2rem,8vw,6rem)] font-extrabold tracking-tight leading-[1] md:leading-[0.95] mb-6 md:mb-8 px-2"
          style={{ perspective: '1000px' }}
        >
          <span className="word inline-block">Travaillons</span>{' '}
          <span className="word inline-block gradient-text">ensemble</span>
        </h2>

        <p className="subtitle text-base md:text-xl text-[#888] max-w-md mx-auto mb-8 md:mb-12 px-4">
          Vous avez un projet en tête ou une opportunité à proposer ?
          N&apos;hésitez pas à me contacter !
        </p>

        <a
          ref={emailRef}
          href="mailto:derisswvde@gmail.com"
          className="inline-block font-display text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold relative group magnetic break-all px-4"
          data-cursor="Email"
        >
          <span className="relative z-10">derisswvde@gmail.com</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </a>

        {/* Socials */}
        <div ref={socialsRef} className="flex justify-center gap-4 md:gap-5 mt-10 md:mt-14">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300 hover:-translate-y-2 magnetic"
              data-cursor={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
