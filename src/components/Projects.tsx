"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { title } from "node:process";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'GDR - Gestion des Retours et Déchets',
    description: `En tant que Développeur Fullstack et Product Owner chez Sonatel, j'ai conçu et développé de A à Z ce système stratégique pour la Direction Achats & Logistique. Face au défi de gérer des milliers d'équipements retournés chaque mois, j'ai créé une solution permettant de tracer chaque appareil et d'optimiser les processus de tri agin de faciliter les tâches de reforme et de recyclage ainsi que le suivi de l'impact environnemental en terme d'emissions de CO2.`,
    role: 'Fullstack Developer & Product Owner',
    company: 'Sonatel',
    duration: '6 mois',
    impact: ['Suivi en temps réel', 'Optimisation des processus', '200+ utilisateurs'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
    placeholder: 'GDR',
    image: '/gdr.png',
    links: { github: '#' },
  },
  {
    number: "02",
    title: "CRR - Centre de Reconditionnement",
    description: `Missionné pour digitaliser le centre de reconditionnement des équipements télécom chez Sonatel. J'ai développé une plateforme complète de suivi des réparations : diagnostic, pièces utilisées, technicien assigné, temps de traitement. Avec des dashboards temps réel pour identifier les goulots d'étranglement.`,
    role: 'Fullstack Developer & Product Owner',
    company: 'Sonatel',
    duration: '2 mois',
    impact: ['500+ réparations/mois', 'Dashboards temps réel', 'Réduction des coûts'],
    tech: ["React", "Express.js", "PostgreSQL", "Docker"],
    placeholder: "CRR",
    image: "/crr.png",
    links: { github: "#" },
  },
  {
    number: "03",
    title: "BorrBi - Gestion des dettes",
    description: `Projet personnel né d'un besoin réel : aider les gens à gérer leurs prêts et emprunts entre proches. Plateforme complète avec tableau de bord analytique, visualisation des flux financiers, rappels automatiques d'échéances et génération de rapports. Une solution simple pour un problème du quotidien.`,
    role: 'Créateur & Lead Developer',
    company: 'Projet Personnel',
    duration: '2 mois',
    impact: ['Gestion simplifiée', 'Rappels automatiques', 'Rapports PDF'],
    tech: ['VueJS', 'Laravel', 'Neon', 'Prisma', 'Chart.js'],
    placeholder: '💰',
    image: "/borr-bi.png",
    links: {
      github: "#",
      live: "https://borr-bi-lp.vercel.app/"
    },
  },
  {
    number: "04",
    title: "@theshvdow/simply-express",
    description: `Frustré de reconfigurer Express.js à chaque projet, j'ai créé mon propre outil CLI et l'ai partagé avec la communauté. Ce package npm initialise un projet Node.js/Express en secondes avec TypeScript, Prisma, Zod, Swagger et une architecture propre. Ma première contribution open-source !`,
    role: 'Créateur & Mainteneur',
    company: 'Open Source',
    duration: 'Live',
    impact: ['Publié sur npm', 'Architecture propre', 'Gain de temps'],
    tech: ["Node.js", "npm", "TypeScript", "CLI"],
    placeholder: "📦",
    image:"/express_api.png",
    links: {
      live: "https://www.npmjs.com/package/@theshvdow/simply-express",
      github: "https://github.com/TheShvdow/express_package",
    },
  },
  {
    number: "05",
    title: "Découpage Sénégal API",
    description: `API open-source documentant le découpage administratif intégral du Sénégal : régions, départements, arrondissements et communes. Un projet né de la difficulté à trouver ces données. Maintenant accessible à tous les développeurs sénégalais pour leurs applications locales.`,
    role: 'Créateur & Lead Developer',
    company: 'Open Source',
    duration: 'Live',
    impact: ['14 régions', '46 départements', '557 communes'],
    tech: ["AdonisJS", "Neon", "REST API"],
    placeholder: "🇸🇳",
    image: "/decoupage.png",
    links: {
      live: "https://decoupage-administratif-senagal.vercel.app/",
      github: "https://github.com/TheShvdow/decoupage_administratif_api",
    },
  },
  {
    number: "06",
    title: "Krypto-Shield",
    description: `Application de gestion de mots de passe sécurisée. Permet de stocker, générer et organiser les mots de passe de manière sécurisée. Interface intuitive avec des fonctionnalités avancées comme le chiffrement AES-256 et la génération aléatoire de mots de passe.
    Krypto-Shield chiffre vos données avant qu'elles ne quittent votre appareil. Aucun serveur, aucun employé, aucun pirate ne peut y accéder.`,
    role: 'Créateur & Lead Developer',
    company: 'Projet Personnel',
    duration: 'Live',
    impact: ['Gestionnaire de mot de passe', 'Générateur de mots de passe', 'Stockage sécurisé','Chiffrement AES-256','Zero-knowledge'],
    tech: ["React", "TypeScript", "Vite", "TailwindCSS", "shadcn/ui"],
      placeholder: "🛡️",
    image: "/krypto-shield.png",
    links: {
      live: "https://kryptos-shield.vercel.app/",
      github: "#",
    },
  },
  {
    number: "07",
    title: "Sama Ecole",
    description: `Application de gestion scolaire pour une école coranique. Permet de gérer les inscriptions, les présences, les paiements et la génération de factures. Conçue pour être simple et efficace, elle facilite la vie des administrateurs et des enseignants tout en offrant une expérience utilisateur fluide en ligne et en offline grace une base de données locale synchronisée avec le cloud. Un projet réalisé en seulement 3 semaines pour répondre à un besoin urgent.`,
    role: 'Développeur Fullstack Freelance',
    company: 'Institut Islamique Seydina Mouhamed (PSL)',
    duration: '3 weeks',
    impact: ['Gestion des inscriptions', 'Gestion des présences', 'Enregistrement paiements', 'Generation de factures', 'Comptabilité'],
    tech: ["Next.js", "TypeScript", "TailwindCSS", "shadcn/ui", "Neon"],
    placeholder: "🏫",
    image: "/school.png",
    links: {
      live: "#",
      github: "#",
    },
  },
  {
    number:"08",
    title: "Iqra - Quran Karim",
    description: `Application de lecture du Coran avec des fonctionnalités avancées : recherche par mots-clés, signets, et mode nuit. Conçue pour offrir une expérience de lecture fluide et agréable, elle permet aux utilisateurs lire le livre sans publicite et sans compte avec la possibilité de lire en offline. Un projet personnel pour partager la beauté du Coran de manière moderne.`,
    role: 'Créateur & Lead Developer',
    company: 'Projet Personnel',
    duration: 'Live',
    impact: ['Lecture du Coran', 'Recherche par mots-clés', 'Signets', 'Mode nuit', 'Lecture offline'],
    tech: ["flutter", "TypeScript"],
    placeholder: "📖",
    image: "/coran.png",
    links: {
      live: "https://iqra-qurankarim.netlify.app/",
      github: "#",
    }
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

      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

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

      projectTl.fromTo(
        content?.children || [],
        { x: isEven ? 100 : -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      );

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
                idx % 2 === 1 ? "lg:flex-row-reverse lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div className="project-image relative group">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-video bg-secondary border border-white/10 transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_30px_60px_rgba(0,255,136,0.15)]">
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <span className="font-display text-[clamp(3rem,8vw,10rem)] font-extrabold text-white/10 leading-none select-none">
                      {project.placeholder}
                    </span>
                  </div>

                  {/* Image */}
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={675}
                      priority={idx === 0}
                      className="w-full h-full object-cover relative z-10 scale-105 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  )}

                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                  {/* Company badge - INSIDE the image container */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/50 backdrop-blur-sm rounded-full px-2.5 md:px-4 py-1 md:py-2 flex items-center gap-1.5 md:gap-2 z-30">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] md:text-xs text-white">
                      {project.company}
                    </span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-black/50 backdrop-blur-sm rounded-full px-2.5 md:px-4 py-1 md:py-2 z-30">
                    <span className="font-mono text-[9px] md:text-xs text-accent">
                      {project.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="project-content">
                {/* Number */}
                <div
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent mb-2 md:mb-3"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                >
                  {project.number}
                </div>

                {/* Role badge */}
                <div className="inline-block bg-accent/10 border border-accent/30 rounded-full px-2.5 md:px-4 py-1 md:py-1.5 mb-3 md:mb-4">
                  <span className="font-mono text-[9px] md:text-xs text-accent uppercase tracking-wider">
                    {project.role}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 tracking-tight leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-[#888] leading-relaxed mb-4 md:mb-6">
                  {project.description}
                </p>

                {/* Impact */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                  {project.impact.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-lg font-mono text-[10px] md:text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>

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
                {(project.links.live && project.links.live !== "#") ||
                (project.links.github && project.links.github !== "#") ? (
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {project.links.live && project.links.live !== "#" && (
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
                    {project.links.github && project.links.github !== "#" && (
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
                    )}
                  </div>
                ) : (
                  <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-white/5 rounded-full font-mono text-[10px] md:text-xs text-white/40">
                    Projet privé
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 