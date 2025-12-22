'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import CustomCursor from '@/components/CustomCursor'
import Loader from '@/components/Loader'
import PageTransition from '@/components/PageTransition'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  const handleLoaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
      // Refresh ScrollTrigger after content is visible
      ScrollTrigger.refresh()
    }, 100)
  }

  return (
    <main className="relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Page Transition */}
      {!isLoading && <PageTransition />}

      {/* Navbar - Always visible after loader */}
      {!isLoading && <Navbar />}

      {/* Main Content */}
      <div style={{ visibility: showContent ? 'visible' : 'hidden' }}>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Noise overlay */}
      <div className="noise fixed inset-0 pointer-events-none z-[40]" />
    </main>
  )
}




<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Idrissa Wade",
      jobTitle: "Développeur Fullstack",
      url: "https://idrisswade.vercel.app",
      sameAs: [
        "https://github.com/TheShvdow",
        "https://linkedin.com/in/idrissawade",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dakar",
        addressCountry: "SN",
      },
    }),
  }}
/>
