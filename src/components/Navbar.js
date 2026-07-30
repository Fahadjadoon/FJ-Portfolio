"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isHovered, setIsHovered] = useState(false);
  
  const sections = [
    { id: "home", name: "Home", index: 0 },
    { id: "tech-stack", name: "Tech Stack", index: 1 },
    { id: "projects", name: "Projects", index: 2 },
    { id: "contact", name: "Contact", index: 3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveIndex = () => {
    const active = sections.find(s => s.id === activeSection);
    return active ? active.index : 0;
  };

  const totalHeight = 360; 
  const startPosition = totalHeight * 0.25; 
  const endPosition = totalHeight * 0.75; 
  const availableRange = endPosition - startPosition; 
  
  const activeIndex = getActiveIndex();
  const maxIndex = sections.length - 1;
  const positionInRange = (activeIndex / maxIndex) * availableRange;
  const activePosition = startPosition + positionInRange;

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
                isHovered ? 'opacity-100' : 'opacity-90'
              }`}
            >
              {sections.find(s => s.id === activeSection)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE NAV: Visible only on small screens */}
      <div className="lg:hidden fixed top-0 w-full z-[9999] p-6 glass-effect border-b border-black/10">
        <span className="text-black font-black text-xs uppercase tracking-[0.2em]">
          {sections.find(s => s.id === activeSection)?.name}
        </span>
      </div>

      {/* DESKTOP INTERACTION: Visible only on large screens */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative h-[360px]">
          {sections.map((section, idx) => {
            const clickPosition = startPosition + (idx / maxIndex) * availableRange;
            return (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className="absolute w-24 h-[48px] -left-6 cursor-pointer group bg-transparent border-none outline-none"
                style={{ top: `${clickPosition - 24}px` }}
                aria-label={`Scroll to ${section.name}`}
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