"use client";
import { useState, useEffect, useRef } from "react";

// Document-relative top of an element. Immune to transform/overflow
// ancestors that break el.offsetTop (the cause of the "stuck on
// Contact" bug).
function getDocTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef(0);

  const sections = [
    { id: "home", name: "Home", index: 0 },
    { id: "tech-stack", name: "Tech Stack", index: 1 },
    { id: "projects", name: "Projects", index: 2 },
    { id: "contact", name: "Contact", index: 3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const probe = window.scrollY + window.innerHeight * 0.3;

        let nextId = sections[0].id;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (!el) continue;
          if (getDocTop(el) <= probe) {
            nextId = sections[i].id;
            break;
          }
        }

        // Bottom-of-page: always highlight the last section.
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) nextId = sections[sections.length - 1].id;

        // Top-of-page: first section.
        if (window.scrollY < 10) nextId = sections[0].id;

        setActiveSection((prev) => (prev === nextId ? prev : nextId));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActiveIndex = () => {
    const active = sections.find((s) => s.id === activeSection);
    return active ? active.index : 0;
  };

  const totalHeight = 360;
  const startPosition = totalHeight * 0.25;
  const endPosition = totalHeight * 0.75;
  const availableRange = endPosition - startPosition;

  const activeIndex = getActiveIndex();
  const maxIndex = Math.max(1, sections.length - 1);
  const positionInRange = (activeIndex / maxIndex) * availableRange;
  const activePosition = startPosition + positionInRange;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: getDocTop(el),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes elegantFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-elegant-text { animation: elegantFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .cubic-bezier-track { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />

      {/* DESKTOP NAV: Visible only on large screens */}
      <div
        className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-[9999] select-none pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="w-[1px] h-[360px] bg-black/30 rounded-full backdrop-blur-[4px]">
            <div
              className="absolute left-[-0.5px] w-[2px] h-[48px] bg-black rounded-full transition-all duration-700 cubic-bezier-track"
              style={{ top: `${activePosition - 24}px` }}
            />
          </div>
          <div
            className="absolute left-6 whitespace-nowrap transition-all duration-700 cubic-bezier-track"
            style={{ top: `${activePosition - 10}px` }}
          >
            <span
              key={activeSection}
              className={`inline-block text-black font-black text-xs uppercase tracking-[0.15em] animate-elegant-text transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-90"
              }`}
            >
              {sections.find((s) => s.id === activeSection)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE NAV: Visible only on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 w-full z-[9999] px-5 py-4 glass-effect border-b border-black/10">
        <div className="flex items-center justify-between">
          <span className="text-black font-black text-xs uppercase tracking-[0.2em]">
            {sections.find((s) => s.id === activeSection)?.name}
          </span>

          {/* Tappable section dots — lets mobile users jump between
              sections the same way the desktop rail does. */}
          <div className="flex items-center gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                aria-label={`Scroll to ${section.name}`}
                aria-current={
                  section.id === activeSection ? "true" : undefined
                }
                className="w-7 h-7 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    section.id === activeSection
                      ? "bg-purple-600"
                      : "bg-black/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP INTERACTION: Visible only on large screens */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative h-[360px]">
          {sections.map((section, idx) => {
            const clickPosition =
              startPosition + (idx / maxIndex) * availableRange;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="absolute w-24 h-[48px] -left-6 cursor-pointer group bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                style={{ top: `${clickPosition - 24}px` }}
                aria-label={`Scroll to ${section.name}`}
                aria-current={
                  section.id === activeSection ? "true" : undefined
                }
              >
                <span className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}