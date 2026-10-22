"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduce = useReducedMotion();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  // Shared fade-up variant. Respects reduced-motion automatically.
  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.9,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
    },
  });

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-transparent section-pad px-6 sm:px-10 lg:px-16"
    >
      {/* Purple ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] bg-purple-200/30 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
        {/* ---------------------------------------------------------- */}
        {/* MOBILE: image first (so the visitor sees a face immediately) */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          {...fadeUp(0.1)}
          className="lg:hidden order-1 flex justify-center"
        >
          <ProfileImage priority />
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* TEXT COLUMN                                                */}
        {/* ---------------------------------------------------------- */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center text-left">
          <motion.h1
            {...fadeUp(0)}
            className="font-black text-black tracking-tight leading-[1.02] mb-5 sm:mb-6 text-[2.75rem] sm:text-6xl md:text-7xl lg:text-7xl"
          >
            FRONTEND <br />
            DEVELOPER
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="font-semibold text-purple-600/90 tracking-wide mb-5 sm:mb-7 text-lg sm:text-2xl"
          >
            Crafting elegant architectures &amp; seamless interfaces.
          </motion.p>

          <motion.p
            {...fadeUp(0.25)}
            className="text-neutral-600 text-base sm:text-lg max-w-xl mb-8 sm:mb-10 font-light leading-relaxed"
          >
            I build responsive SaaS and AI-powered products with{" "}
            <span className="text-black font-medium">React, Next.js</span>, and{" "}
            <span className="text-black font-medium">TypeScript</span> — backed
            by <span className="text-black font-medium">Python / FastAPI</span>{" "}
            when the frontend needs a real backend.
          </motion.p>

          {/* CTA group — full width stacked on mobile, inline on sm+ */}
          <motion.div
            {...fadeUp(0.35)}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 h-12 sm:h-auto sm:py-3.5 bg-black text-white hover:bg-purple-600 rounded-none text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              Contact Me
            </button>
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-12 sm:h-auto sm:py-3.5 border border-black/20 text-black hover:border-black rounded-none text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              View Projects
            </a>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* DESKTOP: image on the right                                */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 1,
            delay: reduce ? 0 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="hidden lg:flex lg:col-span-6 lg:order-2 justify-end"
        >
          <ProfileImage />
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on small screens to avoid clutter */}
      <motion.div
        initial={reduce ? { opacity: 0.4 } : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.8 }}
        className="hidden sm:flex absolute bottom-8 left-6 lg:left-16 items-center gap-3"
      >
        <div className="w-[1px] h-12 bg-black/70 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-purple-600 animate-scroll-line" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-black font-light">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared image block (used on mobile + desktop)                       */
/* ------------------------------------------------------------------ */
function ProfileImage({ priority = false }) {
  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[550px] aspect-[4/5] lg:aspect-[1/1] group">
      <Image
        src="/my-pic.JPG"
        alt="Fahad Jadoon, frontend engineer"
        fill
        priority={priority}
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 440px, 550px"
        className="object-cover pointer-events-none select-none"
        style={{
          filter: "grayscale(100%) brightness(140%) contrast(85%)",
          opacity: 0.75,
          maskImage:
            "radial-gradient(circle at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      {/* High-key overlay for the dissolved look */}
      <div
        className="pointer-events-none absolute inset-0 bg-white mix-blend-screen opacity-40"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 45%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 20%, transparent 70%)",
        }}
      />
    </div>
  );
}