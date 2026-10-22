"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

// ------------------------------------------------------------------
// Project data.
// Set demoUrl/githubUrl to real URLs to make the buttons appear.
// Leaving them empty/undefined hides the corresponding button.
// ------------------------------------------------------------------
const PROJECTS = [
  {
    id: "01",
    title: "Scriptovate",
    category: "AI-Powered Scriptwriting Platform",
    shortDesc:
      "An AI-assisted collaborative platform featuring a structured interactive editor and real-time co-authoring tools.",
    longDesc:
      "Scriptovate is a specialized web application engineered for creative teams, screenwriters, and content creators. The platform features an interactive rich text editor integrated with real-time collaboration engines, customizable script formatting, and generative AI capabilities to brainstorm scenes, enhance dialogue, and accelerate the writing process. Built with Next.js, FastAPI, and PostgreSQL to deliver fluid frontend responsiveness and low-latency API handling.",
    tags: ["Next.js", "React", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "AI Integration"],
    demoUrl: "", // <-- add real URL when available
    githubUrl: "", // <-- add real URL when available
    images: [
      "/projects/scriptovate-1.png",
      "/projects/scriptovate-2.png",
      "/projects/scriptovate-3.png",
      "/projects/scriptovate-4.png",
      "/projects/scriptovate-5.png",
      "/projects/scriptovate-6.png",
      "/projects/scriptovate-7.png",
    ],
  },
  {
    id: "02",
    title: "Cerebro",
    category: "Real-Time AI Agent Platform",
    shortDesc:
      "Deploy custom AI agents with WebSocket stream communication and persistent multi-channel memory.",
    longDesc:
      "Cerebro allows users to build, train, and deploy customized AI agents using their own domain knowledge bases. Built around real-time WebSocket communication, it supports low-latency streaming interactions, persistent chat history retention, and seamless multi-channel deployment (including embeddable website widgets and WhatsApp). Developed with Next.js and Shadcn UI on the frontend paired with FastAPI microservices.",
    tags: ["Next.js", "React", "Shadcn UI", "Python", "FastAPI", "WebSockets", "AI Agents", "WhatsApp API"],
    demoUrl: "",
    githubUrl: "",
    images: [
      "/projects/cerebro-1.png",
      "/projects/cerebro-2.png",
      "/projects/cerebro-3.png",
      "/projects/cerebro-4.png",
    ],
  },
  {
    id: "03",
    title: "SaaS Marketplace",
    category: "Multi-Vendor B2B2C Architecture",
    shortDesc:
      "A secure multi-tenant B2B2C marketplace with tenant database isolation and real-time automated Stripe payments.",
    longDesc:
      "Architected as a multi-vendor B2B2C platform, this project solves key multi-tenancy challenges by implementing database isolation across vendors, real-time order processing pipelines, and automated payout splits via Stripe integration. Built to deliver strong data security boundaries, sub-second API response times, and high transaction reliability.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "Stripe API", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "",
    githubUrl: "",
    images: [
      "/projects/saas-project1.png",
      "/projects/saas-project2.png",
      "/projects/saas-project3.png",
      "/projects/saas-project4.png",
      "/projects/saas-project5.png",
    ],
  },
  {
    id: "04",
    title: "CRM Kanban",
    category: "Real-Time Project Workflow",
    shortDesc:
      "A workflow management tool featuring interactive drag-and-drop boards, Firebase auth, and customizable funnels.",
    longDesc:
      "CRM Kanban is a streamlined project and lead management dashboard. Built with an intuitive drag-and-drop user interface for fluid card movement across custom sales or development funnels. Features full Google Authentication via Firebase, multi-project context switching, and real-time state sync across teams.",
    tags: ["React.js", "Firebase", "Google Auth", "Framer Motion", "Tailwind CSS", "REST API"],
    demoUrl: "",
    githubUrl: "",
    images: ["/projects/Kanban-1.jpg", "/projects/kanban-2.png"],
  },
  {
    id: "05",
    title: "Knowledge Base AI",
    category: "AI Knowledge Retrieval Platform",
    shortDesc:
      "An enterprise documentation hub pairing categorical search filtering with AI-assisted answers.",
    longDesc:
      "Designed to eliminate internal documentation friction, this platform integrates structured category filtering, fast full-text article search, and a contextual AI assistant. Users can query vast documentation sets via an interactive chat interface to receive instant, direct answers grounded in their organization's knowledge base.",
    tags: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "AI Search"],
    demoUrl: "",
    githubUrl: "",
    images: [
      "/projects/kB-1.png",
      "/projects/kB-2.png",
      "/projects/kB-3.png",
      "/projects/kB-4.png",
    ],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative w-full flex flex-col justify-center overflow-hidden bg-transparent section-pad px-6 sm:px-10 lg:px-16"
    >
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl mb-10 sm:mb-14">
        <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-purple-600 font-semibold mb-2">
          Selected Work
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-black tracking-tight uppercase">
          Case Studies
        </p>
        <div className="w-12 h-[1px] bg-black/20 mt-3" />
      </div>

      {/* Filmstrip list — each row is a real button (keyboard accessible) */}
      <div className="mx-auto w-full max-w-7xl flex flex-col divide-y divide-black/[0.08] border-y border-black/[0.08]">
        {PROJECTS.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>

      {/* Full-viewport modal */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <ProjectModal
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* A single row in the filmstrip                                       */
/* ------------------------------------------------------------------ */
function ProjectRow({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full text-left py-6 sm:py-8 lg:py-10 flex flex-col md:flex-row md:items-center md:justify-between overflow-hidden transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500"
    >
      <div className="absolute inset-0 bg-neutral-50/70 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 cubic-bezier-track z-0" />

      {/* Left: index + title */}
      <div className="relative z-10 flex items-baseline gap-4 md:gap-8">
        <span className="text-base sm:text-lg md:text-xl font-mono font-bold text-purple-600/80 tracking-widest">
          {project.id}
        </span>
        <span className="relative">
          <span className="block text-2xl sm:text-3xl md:text-5xl font-black text-black tracking-tight transition-transform duration-500 group-hover:translate-x-2">
            {project.title}
          </span>
          <span className="absolute -bottom-1 left-0 h-[1px] bg-black w-0 group-hover:w-full transition-[width] duration-500" />
        </span>
      </div>

      {/* Right: category + short desc */}
      <div className="relative z-10 mt-3 md:mt-0 md:max-w-sm flex flex-col md:items-end">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-1">
          {project.category}
        </span>
        <span className="text-neutral-500 font-light text-xs md:text-sm md:text-right leading-relaxed">
          {project.shortDesc}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const reduce = useReducedMotion();

  // Lock body scroll while modal is open; restore on close.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, []);

  // Escape to close + focus the close button on open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        ref={modalRef}
        initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-[100dvh] md:w-[92vw] md:h-[92vh] md:max-w-7xl md:rounded-2xl bg-neutral-950 overflow-y-auto overscroll-contain scrollbar-none text-white"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Sticky close button — stays reachable while scrolling */}
        <div className="sticky top-0 z-50 flex justify-end bg-gradient-to-b from-neutral-950/95 to-transparent p-4 md:p-6">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors duration-300 flex items-center justify-center text-lg shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            ✕
          </button>
        </div>

        {/* Section 1 — overview */}
        <div className="mx-auto max-w-5xl px-6 sm:px-12 lg:px-16 pb-16 -mt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">
            {project.category}
          </span>
          <h3
            id={`project-title-${project.id}`}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mt-2 mb-8 md:mb-12 uppercase"
          >
            {project.title}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-8">
              <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 font-black mb-3">
                Overview
              </h4>
              <p className="text-neutral-300 font-light leading-relaxed text-base sm:text-lg">
                {project.longDesc}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 font-black mb-3">
                  Core Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Only render buttons when real URLs exist (fixes dead # links) */}
              {(project.demoUrl || project.githubUrl) && (
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-purple-500 hover:text-white transition-colors duration-300"
                    >
                      Live Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 border border-neutral-700 text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-colors duration-300"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 — scroll stream of images */}
        <div className="w-full pb-16 md:pb-20 bg-black space-y-0">
          {project.images.map((imgSrc, index) => (
            <ExpandingImageCard
              key={imgSrc}
              src={imgSrc}
              index={index}
              total={project.images.length}
              rootScrollRef={modalRef}
              title={project.title}
              reduce={reduce}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* A single expanding image card                                       */
/* ------------------------------------------------------------------ */
function ExpandingImageCard({ src, index, total, rootScrollRef, title, reduce }) {
  const elementRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    container: rootScrollRef,
    // Longer window than before so the expansion actually plays.
    offset: ["start end", "start center"],
  });

  // Disable transforms entirely when the user prefers reduced motion.
  const cardWidth = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    reduce ? ["94%", "94%"] : ["90%", "95%"]
  );
  const cardHeight = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    reduce ? ["60vh", "60vh"] : ["40vh", "70vh"]
  );
  const innerScale = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    reduce ? [1, 1] : [1.08, 1]
  );
  const radius = useTransform(
    scrollYProgress,
    [0.5, 0.9],
    reduce ? ["12px", "12px"] : ["16px", "8px"]
  );

  return (
    <div
      ref={elementRef}
      className="relative w-full h-[75vh] flex items-center justify-center sticky top-0 overflow-hidden"
    >
      <motion.div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: radius,
          maxWidth: "1200px",
        }}
        className="relative overflow-hidden bg-neutral-800 shadow-2xl border border-white/5 will-change-transform"
      >
        <motion.div style={{ scale: innerScale }} className="absolute inset-0">
          <Image
            src={src}
            alt={`${title} — screen ${index + 1} of ${total}`}
            fill
            sizes="(max-width: 768px) 94vw, 1200px"
            className="object-cover"
            // Only the first image is eager; the rest load lazily
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>

        {/* Frame label */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
          <p className="text-[9px] font-mono tracking-widest text-purple-400 uppercase">
            VISUAL {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}