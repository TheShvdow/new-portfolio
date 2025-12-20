// 'use client'

// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// const technologies = [
//   'REACT', 'NEXT.JS', 'NODE.JS', 'EXPRESS', 'TYPESCRIPT', 
//   'POSTGRESQL', 'PRISMA', 'TAILWIND', 'DOCKER', 'GIT'
// ]

// export default function Marquee() {
//   const marqueeRef = useRef<HTMLDivElement>(null)
//   const track1Ref = useRef<HTMLDivElement>(null)
//   const track2Ref = useRef<HTMLDivElement>(null)

  

//   useEffect(() => {
//     // Section slide-in animation
//     gsap.fromTo(marqueeRef.current,
//       { clipPath: 'inset(100% 0 0 0)' },
//       {
//         clipPath: 'inset(0% 0 0 0)',
//         duration: 1.2,
//         ease: 'power4.inOut',
//         scrollTrigger: {
//           trigger: marqueeRef.current,
//           start: 'top 85%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     )

//     // Speed up marquee on scroll
//     ScrollTrigger.create({
//       trigger: marqueeRef.current,
//       start: 'top bottom',
//       end: 'bottom top',
//       scrub: 1,
//       onUpdate: (self) => {
//         const speed = 1 + self.progress * 2
//         if (track1Ref.current) {
//           track1Ref.current.style.animationDuration = `${25 / speed}s`
//         }
//         if (track2Ref.current) {
//           track2Ref.current.style.animationDuration = `${25 / speed}s`
//         }
//       },
//     })
//   }, [])

//   return (
//     <div 
//       ref={marqueeRef}
//       className="py-20 border-y border-white/10 overflow-hidden bg-secondary"
//     >
//       <div ref={track1Ref} className="marquee-track">
//         {[...Array(2)].map((_, i) => (
//           <div key={i} className="flex items-center gap-16 px-8 shrink-0">
//             {technologies.map((tech, idx) => (
//               <div key={`${i}-${idx}`} className="flex items-center gap-16">
//                 <span 
//                   className="font-display text-[clamp(2rem,5vw,4rem)] font-bold whitespace-nowrap text-transparent hover:text-accent transition-colors duration-300"
//                   style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
//                   data-cursor={tech}
//                 >
//                   {tech}
//                 </span>
//                 <span className="w-3 h-3 bg-accent rounded-full shrink-0" />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  'REACT', 'NEXT.JS', 'NODE.JS', 'EXPRESS', 'TYPESCRIPT', 
  'POSTGRESQL', 'PRISMA', 'TAILWIND', 'DOCKER', 'GIT'
]

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const directionRef = useRef<number>(1) // 1 = gauche, -1 = droite

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Calculer la largeur d'un set
    const totalWidth = track.scrollWidth / 4

    // Animation GSAP infinie
    animationRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 60,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % totalWidth
        })
      }
    })

    // Section slide-in animation
    gsap.fromTo(marqueeRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Changement de direction + vitesse selon le scroll
    let lastScroll = 0
    
    ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const currentScroll = self.scroll()
        const direction = currentScroll > lastScroll ? 1 : -1
        lastScroll = currentScroll

        // Change la direction si différente
        if (direction !== directionRef.current) {
          directionRef.current = direction
          if (animationRef.current) {
            gsap.to(animationRef.current, {
              timeScale: direction,
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        }

        // Accélère selon la vitesse de scroll
        const velocity = Math.abs(self.getVelocity()) / 1000
        const speed = Math.min(Math.max(1 + velocity * 0.5, 1), 5)
        
        if (animationRef.current) {
          gsap.to(animationRef.current, {
            timeScale: direction * speed,
            duration: 0.3,
            overwrite: true
          })
        }
      },
    })

    // Pause au hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        gsap.to(animationRef.current, {
          timeScale: 0,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      if (animationRef.current) {
        gsap.to(animationRef.current, {
          timeScale: directionRef.current,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }

    const marquee = marqueeRef.current
    marquee?.addEventListener('mouseenter', handleMouseEnter)
    marquee?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      marquee?.removeEventListener('mouseenter', handleMouseEnter)
      marquee?.removeEventListener('mouseleave', handleMouseLeave)
      animationRef.current?.kill()
    }
  }, [])

  return (
    <div 
      ref={marqueeRef}
      className="py-20 border-y border-white/10 overflow-hidden bg-secondary cursor-none "
    >
      <div 
        ref={trackRef}
        className="flex"
        style={{ width: 'max-content' }}
      >
        {/* 4 copies pour un loop infini fluide */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6 shrink-0">
            {technologies.map((tech, idx) => (
              <div key={`${i}-${idx}`} className="flex items-center gap-12">
                <span 
                  className="font-display text-[clamp(2rem,5vw,4rem)] font-bold whitespace-nowrap text-transparent hover:text-accent transition-colors duration-300"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                  data-cursor={tech}
                >
                  {tech}
                </span>
                <span className="w-3 h-3 bg-accent rounded-full shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}