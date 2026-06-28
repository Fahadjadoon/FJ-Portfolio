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
      {/* Inject custom luxury transition curve and fade-in animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes elegantFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-elegant-text {
          animation: elegantFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cubic-bezier-track {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />

      {/* Main Track Element Group */}
      <div 
        className="fixed left-8 top-1/2 -translate-y-1/2 z-[9999] select-none pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          
          {/* Main Vertical Track Line - Complete Solid Black */}
          <div className="w-[1px] h-[360px] bg-black/30 rounded-full backdrop-blur-[4px]">
            
            {/* Active Pointer Pin - Complete Solid Black */}
            <div 
              className="absolute left-[-0.5px] w-[2px] h-[48px] bg-black rounded-full transition-all duration-700 cubic-bezier-track"
              style={{ top: `${activePosition - 24}px` }}
            />
          </div>

          {/* Animating Label Text Layer */}
          <div 
            className="absolute left-6 whitespace-nowrap transition-all duration-700 cubic-bezier-track"
            style={{ top: `${activePosition - 10}px` }}
          >
            {/* Labels forced to pure, high-contrast black text with light halo for readability over textures */}
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

      {/* Clickable Navigation Interaction Gateways */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative h-[360px]">
          {sections.map((section, idx) => {
            const clickPosition = startPosition + (idx / maxIndex) * availableRange;
            return (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="absolute w-24 h-[48px] -left-6 cursor-pointer group bg-transparent border-none outline-none"
                style={{ top: `${clickPosition - 24}px` }}
                aria-label={`Scroll to ${section.name}`}
              >
                {/* Visual indicator shown on hover - Complete Solid Black */}
                <span className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}