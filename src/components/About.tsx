"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "3+", label: "Années d'expérience" },
  { number: "20+", label: "Projets réalisés" },
  { number: "7+", label: "Technologies maîtrisées" },
  { number: "1", label: "Package npm publié" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main timeline for section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Section label slide in from left
    tl.fromTo(
      sectionRef.current!.querySelector(".section-label"),
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Title slide up with clip
    tl.fromTo(
      titleRef.current,
      { clipPath: "inset(100% 0 0 0)", y: 50 },
      { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1, ease: "power4.out" },
      "-=0.5"
    );

    // Text paragraphs staggered slide in from right
    tl.fromTo(
      textRefs.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );

    // Stats slide up with stagger
    tl.fromTo(
      statsRef.current?.children || [],
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

    // Image reveal
    tl.fromTo(
      imageRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" },
      "-=1"
    );

    // Parallax effect on image
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <p className="section-label font-mono text-xs md:text-sm text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
            À propos
          </p>
          <h2
            ref={titleRef}
            className="font-display text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight"
          >
            Qui suis-je ?
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              <p
                ref={(el) => {
                  if (el) textRefs.current[0] = el;
                }}
                className="text-base md:text-lg text-[#888] leading-relaxed"
              >
                <strong className="text-white">
                  Développeur Fullstack Mid-Junior
                </strong>{" "}
                basé à Dakar, Sénégal. Récemment, j&apos;ai travaillé à{" "}
                <strong className="text-white">la Sonatel</strong> au sein de la
                Direction Achats &amp; Logistique, où j&apos;ai occupé le double
                rôle de Développeur Fullstack et Product Owner.
              </p>
              <p
                ref={(el) => {
                  if (el) textRefs.current[1] = el;
                }}
                className="text-base md:text-lg text-[#888] leading-relaxed"
              >
                J&apos;ai conçu et développé des systèmes critiques de gestion
                comme le <strong className="text-white">GDR</strong> (Gestion
                des Retours et Déchets) et le{" "}
                <strong className="text-white">CRR</strong> (Centre de
                Reconditionnement et Réparation), contribuant à l&apos;économie
                circulaire de l&apos;entreprise.
              </p>
              <p
                ref={(el) => {
                  if (el) textRefs.current[2] = el;
                }}
                className="text-base md:text-lg text-[#888] leading-relaxed"
              >
                Passionné par les technologies modernes, je maîtrise
                l&apos;écosystème{" "}
                <strong className="text-white">JavaScript/TypeScript</strong>{" "}
                avec Node.js, AdonisJS, Express, React et Next.js. J&apos;explore
                également la blockchain et l&apos;IA pour créer des solutions
                innovantes.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 md:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,255,136,0.1)] magnetic"
                  data-cursor={stat.label}
                >
                  <div className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text">
                    {stat.number}
                  </div>
                  <div className="font-mono text-[10px] md:text-xs text-[#666] uppercase tracking-wider mt-1 md:mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative mt-8 lg:mt-0">
            <div className="animated-border rounded-2xl md:rounded-3xl aspect-[4/5] relative overflow-hidden">
              {/* IMAGE */}
              <div className="absolute inset-0 z-[1]">
                <Image
                  src="/photo.jpeg"
                  alt="Idrissa Wade développeur fullstack basé à Daka"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* OVERLAY CINÉMATIQUE */}
              <div
                className="
                absolute inset-0
                z-[2]
                bg-gradient-to-t
                from-black/70
                via-black/30
                to-transparent
              "
              />

              {/* TEXTE SUR IMAGE */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-[3]">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent mb-1">
                  Freelance Fullstack Developer
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Idrissa Wade
                </h3>
              </div>

              {/* BADGE OPEN TO WORK */}
              <div
                className="
                  absolute top-4 md:top-6 right-4 md:right-6
                  z-[3]
                  bg-primary/90 backdrop-blur
                  border border-white/10
                  rounded-xl md:rounded-2xl
                  px-3 py-1.5 md:px-4 md:py-2
                  shadow-2xl
                  floating
                "
              >
                <div className="font-mono text-[9px] md:text-[10px] text-accent uppercase tracking-wider">
                  Status
                </div>
                <div className="font-display text-xs md:text-sm font-bold text-white">
                  Open to Work
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
