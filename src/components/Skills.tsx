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
      className="py-32 md:py-40 px-6 md:px-12 bg-secondary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-sm text-accent tracking-[0.3em] uppercase mb-4">
            Compétences
          </p>
          <h2 className="section-title font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight">
            Mon stack technique
          </h2>
        </div>

        {/* Skills Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-8 bg-primary rounded-3xl border border-white/5 hover:border-accent/30 transition-colors duration-500 magnetic group"
              data-cursor={category.title}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold mb-4">
                {category.title}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1.5 bg-white/5 rounded-full font-mono text-xs text-[#888] hover:bg-accent/10 hover:text-accent transition-all duration-300"
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
