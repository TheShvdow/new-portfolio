"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "GDR - Gestion des Retours (Private)",
    description:
      "Système de gestion des retours et déchets pour la Sonatel. Application complète permettant le suivi des équipements, la gestion des retours et l'optimisation des processus d'économie circulaire.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    placeholder: "GDR",
    image: "/gdr.png",
    links: {
      github: "#",
    },
  },
  {
    number: "02",
    title: "CRR - Centre de Reconditionnement (Private)",
    description:
      "Plateforme de gestion du centre de reconditionnement et réparation. Suivi des processus de réparation, gestion des techniciens et reporting avancé des performances.",
    tech: ["React", "Express.js", "PostgreSQL", "Docker"],
    placeholder: "CRR",
    image: "/crr.png",
    links: {
      github: "#",
    },
  },
  {
    number: "03",
    title: "BorrBi - Gestion des dettes (Private)",
    description:"Plateforme web complète de gestion des créances et dettes.Permet aux utilisateurs de suivre leurs emprunts, prêts et échéances de paiement.Tableau de bord analytique avec visualisation des flux financiers,rappels automatiques et génération de rapports.",
    tech: ['VueJS', 'Laravel', 'Neon', 'Prisma', 'Chart.js'],
    placeholder: '💰',
    image: "/borr-bi.png",
    links: {
      github: "#",
      live: "https://borr-bi.vercel.app/"
    },
  },
  {
    number: "04",
    title: "@theshvdow/create-express-app",
    description:
      "Package npm open-source pour initialiser rapidement des projets Node.js/Express avec une architecture propre, TypeScript configuré et les meilleures pratiques intégrées.",
    tech: ["Node.js", "npm", "TypeScript", "CLI"],
    placeholder: "📦",
    links: {
      live: "https://www.npmjs.com/package/@theshvdow/create-express-app",
      github: "https://github.com/TheShvdow/express_package",
    },
  },
  {
    number: "05",
    title: "Découpage Senegal API",
    description:
      "API open-source documentant le decoupage adrministratif intégrale du Sénégal depuis les regions jusqu'aux communes en passant par les départements et ceux dans le but d'aider d'autres dévellopeurs à facilter l'accés à ces données qui etait jusque là difficile à avoir.",
    tech: ["AdonisJS", "Neon", "REST API"],
    placeholder: "\u{1F1F8}\u{1F1F3}",
    links: {
      live: "https://decoupage-administratif-senagal.vercel.app/",
      github: "https://github.com/TheShvdow/decoupage_administratif_api",
    },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Section header animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      sectionRef.current!.querySelector(".section-label"),
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      sectionRef.current!.querySelector(".section-title"),
      { clipPath: "inset(100% 0 0 0)", y: 50 },
      { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1, ease: "power4.out" },
      "-=0.5"
    );

    // Individual project animations with alternating directions
    projectsRef.current.forEach((project, idx) => {
      const isEven = idx % 2 === 0;
      const image = project.querySelector(".project-image");
      const content = project.querySelector(".project-content");

      // Create timeline for each project
      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Image slides from opposite direction
      projectTl.fromTo(
        image,
        {
          x: isEven ? -150 : 150,
          opacity: 0,
          clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Content slides from opposite direction with stagger
      projectTl.fromTo(
        content?.children || [],
        { x: isEven ? 100 : -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      );

      // Parallax on scroll
      gsap.to(image, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: project,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <p className="section-label font-mono text-xs md:text-sm text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
            Portfolio
          </p>
          <h2 className="section-title font-display text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight">
            Projets sélectionnés
          </h2>
        </div>

        {/* Projects */}
        <div className="space-y-20 md:space-y-32 lg:space-y-40">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) projectsRef.current[idx] = el;
              }}
              className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
              style={{ direction: idx % 2 === 1 ? "rtl" : "ltr" }}
            >
              {/* Image */}
              <div
                className="project-image relative group"
                style={{ direction: "ltr" }}
              >
                <div
                  className="
                    relative
                    rounded-2xl md:rounded-3xl
                    overflow-hidden
                    aspect-video
                    bg-secondary
                    border border-white/10
                    transition-all duration-500
                    group-hover:border-accent/30
                    group-hover:shadow-[0_30px_60px_rgba(0,255,136,0.15)]
                  "
                >
                  {/* PLACEHOLDER — TOUJOURS VISIBLE */}
                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center
                      pointer-events-none
                      z-0
                    "
                  >
                    <span
                      className="
                      font-display
                      text-[clamp(3rem,8vw,10rem)]
                      font-extrabold
                      text-white/10
                      leading-none
                      select-none
                    "
                                  >
                      {project.placeholder}
                    </span>
                  </div>

                  {/* IMAGE */}
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={675}
                      priority={idx === 0}
                      className="
                      w-full h-full
                      object-cover
                      relative z-10
                      scale-105
                      transition-transform duration-[1200ms] ease-out
                      group-hover:scale-110
                    "
                    />
                  )}

                  {/* CINEMATIC OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-tr from-black/40 via-transparent to-black/20
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-700
                      z-20
                    "
                  />
                </div>
              </div>

              {/* Content */}
              <div className="project-content" style={{ direction: "ltr" }}>
                <div
                  className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent mb-3 md:mb-4"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                >
                  {project.number}
                </div>

                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-[#888] leading-relaxed mb-4 md:mb-6">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 rounded-full font-mono text-[10px] md:text-xs text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs md:text-sm magnetic text-center"
                      data-cursor="Voir"
                    >
                      Voir le projet →
                    </a>
                  )}
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs md:text-sm magnetic flex items-center justify-center gap-2"
                    data-cursor="GitHub"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="md:w-4 md:h-4"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
