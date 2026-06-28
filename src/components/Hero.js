"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    /* Changed bg-white to transparent to let the global grid canvas shine through smoothly */
    <section id="home" className="min-h-screen bg-transparent w-full flex items-center relative overflow-hidden px-6 sm:px-12 lg:px-24">
      
      {/* Subtle organic purple ambient glow to soften the background */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Split Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-20">
        
        {/* LEFT SIDE: Typography & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          
          {/* Main bold black heading */}
          <h1 
            className={`text-4xl sm:text-6xl md:text-7xl font-black text-black tracking-tight leading-[1.05] mb-6 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            FRONTEND <br />
            DEVELOPER
          </h1>

          {/* Subtitle/Text down below written in purple shade */}
          <p 
            className={`text-xl sm:text-2xl font-medium text-purple-600/90 tracking-wide mb-8 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Crafting elegant architectures & seamless interfaces.
          </p>

          <p 
            className={`text-gray-500 text-base max-w-lg mb-10 font-light leading-relaxed transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Specialized in Next.js, React, with a strong foundation in Python and FastAPI for backend development, and high-performance engineering. Focused on turning complex logical problems into fluid visual masterpieces.
          </p>

          {/* CTA Group */}
          <div 
            className={`flex flex-wrap gap-4 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 bg-black text-white hover:bg-purple-600 rounded-none text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm"
            >
              Contact Me
            </button>
            <a
              href="#projects"
              className="px-8 py-3.5 border border-black/20 text-black hover:border-black rounded-none text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Borderless, completely dissolved larger image layout */}
        <div 
          className={`lg:col-span-6 flex justify-center lg:justify-end transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Container upscaled to max-w-[550px] with all borders and backgrounds removed */}
          <div className="relative w-full max-w-[550px] aspect-[1/1] sm:aspect-[4/5] group">
            
            {/* The Image Asset */}
            <img 
              src="./my-pic.JPG" 
              alt="Profile"
              className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
              style={{
                // Grayscale, high-key brightness, and slightly lower contrast to force midtones into whites
                filter: 'grayscale(100%) brightness(140%) contrast(85%)',
                opacity: '0.75',
                // A massive smooth radial feather mask dissolving all four outer edges perfectly
                maskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)',
              }}
            />

            {/* Premium high-key overlay layer mimicking your exact image exposure style */}
            <div 
              className="absolute inset-0 bg-white pointer-events-none mix-blend-screen opacity-40"
              style={{
                maskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 40% 45%, black 20%, transparent 70%)',
              }}
            />
          </div>
        </div>

      </div>

      {/* Minimal Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-12 flex items-center gap-3 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="w-[1px] h-12 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-purple-600 animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-black font-light">Scroll Down</span>
      </div>

      {/* Injecting scroll bar utility keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          80%, 100% { transform: translateY(200%); }
        }
      `}} />
    </section>
  );
}