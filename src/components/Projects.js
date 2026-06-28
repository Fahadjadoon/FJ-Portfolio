"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projectsData = [
  {
    id: "01",
    title: "Scriptovate",
    category: "AI-Powered Script Writing Platform",
    shortDesc: "A collaborative platform for writing, organizing, and enhancing scripts with AI assistance.",
    longDesc: "Scriptovate is a modern web application built for writers, filmmakers, and creative teams. Users can write and organize scripts, create and manage characters, keep project notes, collaborate with team members in real time, and leverage AI to generate ideas, improve dialogue, and accelerate the writing process. Built with a scalable architecture using Next.js, Python, FastAPI, and PostgreSQL, the platform delivers a fast and seamless creative workflow.",
    tags: [
      "Next.js", "React", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS" ],
    demoUrl: "#",
    githubUrl: "#",
    images: [
      "/projects/SC-1.png",
      "/projects/SC-2.png",
      "/projects/SC-3.png"
    ]
  },
  {
    id: "02",
    title: "Cerebro",
    category: "Custom AI Agent Platform",
    shortDesc: "A platform for building, training, and deploying AI agents across websites and WhatsApp.",
    longDesc: "Cerebro enables users to create intelligent AI agents tailored to their own knowledge base. Users can train agents by uploading documents and learning materials, interact with them through a real-time chat powered by WebSockets, and deploy them as customer support assistants on websites or WhatsApp. Built with Next.js, Shadcn UI, Python, and FastAPI, the platform delivers responsive performance, scalable AI workflows, and seamless multi-channel communication.",
    tags: [
      "Next.js", "React", "Shadcn UI", "Python", "FastAPI", "WebSockets","AI", "WhatsApp Integration" ],
    demoUrl: "#",
    githubUrl: "#",
    images: [
      "/projects/vector-1.jpg",
      "/projects/vector-2.jpg",
      "/projects/vector-3.jpg"
    ]
  },
  {
    id: "03",
    title: "Shop",
    category: " Multi-Store E-Commerce Platform ",
    shortDesc: "A modern e-commerce platform that lets users create and manage multiple online stores from a single dashboard.",
    longDesc: "Shop is a scalable multi-store e-commerce application where users can create and manage multiple online stores, each with its own inventory, products, shopping cart, and store settings. The platform provides a clean, intuitive interface that simplifies store management while delivering a seamless shopping experience. Built with React.js, Python, and FastAPI, it combines modern UI design with a robust backend to support efficient and customizable online businesses.",
    tags: ["React.js", "Redux", "Python", "FastAPI", "REST API", "Google AUTH", "E-Commerce" ],
    demoUrl: "#",
    githubUrl: "#",
    images: [
      "/projects/telemetry-1.jpg",
      "/projects/telemetry-2.jpg",
      "/projects/telemetry-3.jpg"
    ]
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeProject]);

  return (
    <section id="projects" className="min-h-screen bg-transparent w-full flex flex-col justify-center relative overflow-hidden py-32 px-6 sm:px-12 lg:px-24 z-10">

      {/* Header Block */}
      <div className="max-w-7xl w-full mx-auto relative z-10 mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-purple-600 font-semibold mb-2">Selected Work</h2>
        <p className="text-2xl font-bold text-black tracking-tight uppercase">Case Studies</p>
        <div className="w-12 h-[1px] bg-black/20 mt-3" />
      </div>

      {/* THE FILMSTRIP HORIZON LIST */}
      <div className="max-w-7xl w-full mx-auto flex flex-col relative z-10 divide-y divide-black/[0.06] border-t border-b border-black/[0.06]">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group cursor-pointer py-10 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 bg-neutral-50/60 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) z-0" />

            <div className="flex items-baseline gap-8 relative z-10 pointer-events-none">
              <span className="text-xl font-mono font-bold text-purple-600/80 tracking-widest">{project.id}</span>
              <div className="relative">
                <motion.h3 layoutId={`title-${project.id}`} className="text-3xl sm:text-5xl font-black text-black tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                  {project.title}
                </motion.h3>
                <motion.div className="absolute -bottom-2 left-0 h-[1px] bg-black" initial={{ width: "0%" }} animate={{ width: hoveredId === project.id ? "100%" : "0%" }} transition={{ duration: 0.4, ease: "easeInOut" }} />
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end relative z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-1">{project.category}</span>
              <p className="text-gray-500 font-light text-sm max-w-sm md:text-right leading-relaxed">{project.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FULL VIEWPORT WORKSPACE MODAL PROJECTION */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <ModalWindow activeProject={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ModalWindow({ activeProject, onClose }) {
  const modalRef = useRef(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[90vw] max-w-7xl h-[90vh] bg-neutral-900 overflow-y-auto rounded-2xl shadow-2xl text-white scrollbar-none"
      >
        {/* Fixed Sticky Close Controls */}
        <button onClick={onClose} className="fixed top-8 right-[7vw] z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center justify-center text-lg shadow-xl">
          ✕
        </button>

        {/* SECTION 1: STUDY HEADLINE INFO DESCRIPTION */}
        <div className="max-w-5xl mx-auto px-8 sm:px-16 pt-20 pb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-bold">{activeProject.category}</span>
          <h3 className="text-5xl sm:text-7xl font-black tracking-tight mt-4 mb-12 uppercase">{activeProject.title}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-black">Overview</h4>
              <p className="text-neutral-300 font-light leading-relaxed text-lg sm:text-xl">{activeProject.longDesc}</p>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-black mb-3">Core Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-4">
                <a href={activeProject.demoUrl} className="flex-1 text-center py-3 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-purple-500 hover:text-white transition-all duration-300">
                  Live Preview
                </a>
                <a href={activeProject.githubUrl} className="flex-1 text-center py-3 border border-neutral-700 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-all duration-300">
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SEQUENTIAL EXPANDING CINEMATIC SCROLL STREAM */}
        {/* Houses structural cards expanding downstream one after another */}
        <div className="w-full pb-20 bg-black rounded-b-2xl space-y-0">
          {activeProject.images.map((imgSrc, index) => (
            <ExpandingImageCard
              key={index}
              src={imgSrc}
              index={index}
              rootScrollRef={modalRef}
            />
          ))}
        </div>

      </motion.div>
    </motion.div>
  );
}

/* Individual Image Element tracking view state alterations inside its own tracking box component */
function ExpandingImageCard({ src, index, rootScrollRef }) {
  const elementRef = useRef(null);

  // Monitors the entry vectors of this unique card against the scrolling container
  const { scrollYProgress } = useScroll({
    target: elementRef,
    container: rootScrollRef,
    offset: ["start end", "start start"]
  });

  // Smooth architectural layout shifts as element rises out of layout floor
  const cardWidth = useTransform(scrollYProgress, [0.1, 0.95], ["75%", "100%"]);
  const cardHeight = useTransform(scrollYProgress, [0.1, 0.95], ["70vh", "90vh"]);
  const innerGraphicScale = useTransform(scrollYProgress, [0.1, 0.95], [1.12, 1]);
  const containerRadius = useTransform(scrollYProgress, [0.6, 0.95], ["24px", "0px"]);

  return (
    <div
      ref={elementRef}
      className="w-full h-[100vh] flex items-center justify-center relative sticky top-0 overflow-hidden"
    >
      <motion.div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: containerRadius
        }}
        className="relative overflow-hidden bg-neutral-800 shadow-2xl border border-white/5 will-change-transform"
      >
        {/* Scaled graphic layer ensuring background canvas bounds remain tightly fit inside changing aspect frames */}
        <motion.div style={{ scale: innerGraphicScale }} className="absolute inset-0 w-full h-full">
          <Image
            src={src}
            alt={`Project Showcase Frame ${index + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
        </motion.div>

        {/* Text Details Banner */}
        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-lg border border-white/10 z-10 shadow-lg">
          <p className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
            PROJECT DEPLOYMENT // SYSTEM VISUAL 0{index + 1}
          </p>
        </div>
      </motion.div>
    </div>
  );
}