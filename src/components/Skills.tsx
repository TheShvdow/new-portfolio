'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    icon: '⚛️',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Angular','Vue','Edge'],
  },
  {
    icon: '🖥️',
    title: 'Backend',
    skills: ['Laravel','Node.js', 'Express.js', 'AdonisJS', 'REST API', 'Prisma', 'PostgreSQL','Neon', 'MongoDB'],
  },
  {
    icon: '🛠️',
    title: 'Outils & DevOps',
    skills: ['Git', 'Docker', 'Vercel', 'GitHub Actions', 'Linux', 'Render','RabbitMQ','UptimeRobot'],
  },
  {
    icon: '🚀',
    title: 'En exploration',
    skills: ['Blockchain', 'Web3', 'AI/LLM', 'MCP Servers', 'n8n'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

    // Title animation
    gsap.fromTo(
      sectionRef.current!.querySelector('.section-title'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Cards staggered slide up with rotation
    gsap.fromTo(
      cardsRef.current?.children || [],
      { y: 120, opacity: 0, rotateY: -15 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Hover animations for cards
    const cards = cardsRef.current?.children
    if (cards) {
      Array.from(cards).forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 bg-secondary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-accent-secondary/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs md:text-sm text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
            Compétences
          </p>
          <h2 className="section-title font-display text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight">
            Mon stack technique
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 bg-primary rounded-2xl md:rounded-3xl border border-white/5 hover:border-accent/30 transition-colors duration-500 magnetic group"
              data-cursor={category.title}
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg md:text-xl font-bold mb-3 md:mb-4">
                {category.title}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-full font-mono text-[10px] md:text-xs text-[#888] hover:bg-accent/10 hover:text-accent transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
