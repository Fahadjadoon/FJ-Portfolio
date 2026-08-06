"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const orbits = [
    {
      size: 700,
      duration: 65,
      direction: "left",
      planets: [
        { name: "React.js", x: -190, y: -300, logo: "/logos/Reactjs.png" },
        { name: "Next.js", x: 180, y: -300, logo: "/logos/NextJS.png" },
        { name: "JavaScript", x: 355, y: 5, logo: "/logos/JavaScript.png" },
        { name: "HTML5", x: 190, y: 300, logo: "/logos/HTML5.png" },
        { name: "CSS3", x: -180, y: 300, logo: "/logos/CSS3.png" },
        { name: "Python", x: -355, y: -5, logo: "/logos/Python.png" },
      ]
    },
    {
      size: 520,
      duration: 50,
      direction: "right",
      planets: [
        { name: "FastAPI", x: 0, y: -260, logo: "/logos/FastAPI.png" },
        { name: "Prisma", x: 225, y: -130, logo: "/logos/Prisma.png" },
        { name: "Shadcn", x: 225, y: 130, logo: "/logos/ShadCN.png" },
        { name: "Framer-Motion", x: 0, y: 260, logo: "/logos/Framer-Motion.png" },
        { name: "Tailwind", x: -225, y: 130, logo: "/logos/Tailwind.png" },
        { name: "Redux", x: -225, y: -130, logo: "/logos/Redux.png" },
      ]
    },
    {
      size: 300,
      duration: 45,
      direction: "left",
      planets: [
        { name: "PostgreSQL", x: 0, y: -150, logo: "/logos/PostgreSQL.png" },
        { name: "GitHub", x: 150, y: 0, logo: "/logos/GitHub.png" },
        { name: "Docker", x: 0, y: 150, logo: "/logos/Docker.png" },
        { name: "AWS", x: -150, y: 0, logo: "/logos/AWS.png" },
      ]
    }
  ];

  return (
    <section id="tech-stack" className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden">
      
      {/* Purple ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-200/20 rounded-full blur-3xl" />
      
      <div className="text-center relative z-10 py-10 w-full">
        {/* Adjusted margin-bottom from mb-16 to mb-8 on mobile, mb-16 on desktop */}
        <h2 className="text-3xl sm:text-4xl font-black text-black mb-8 sm:mb-16 tracking-tight uppercase">
          Tech <span className="text-purple-600">Stack</span>
        </h2>

        {/* 
           RESPONSIVE CONTAINER:
           Adjusted min-height: 400px for mobile, 600px for tablets, 850px for desktop.
           The scaling remains to ensure the animation fits the width.
        */}
        <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[600px] lg:min-h-[850px] w-full origin-center scale-[0.45] sm:scale-[0.65] md:scale-[0.8] lg:scale-100 transition-transform duration-500">
          
          {/* Orbit 1 - Outer */}
          <div 
            className="absolute rounded-full border-2 border-black/30 border-dashed"
            style={{ 
              width: `${orbits[0].size}px`, 
              height: `${orbits[0].size}px`,
              animation: `rotateLeft ${orbits[0].duration}s linear infinite`
            }}
          />
          
          <div className="absolute" style={{ width: `${orbits[0].size}px`, height: `${orbits[0].size}px` }}>
            {orbits[0].planets.map((planet, idx) => (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `calc(50% + ${planet.x}px)`, top: `calc(50% + ${planet.y}px)` }}
              >
                <div className="relative w-14 h-14 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 animate-bounce-slow overflow-hidden p-2.5">
                  <Image 
                    src={planet.logo} 
                    alt={`${planet.name} logo`} 
                    width={40} 
                    height={40} 
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Hover Label */}
                <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-md">
                  {planet.name}
                </span>
              </div>
            ))}
          </div>

          {/* Orbit 2 - Middle */}
          <div 
            className="absolute rounded-full border-2 border-black/40 border-dashed"
            style={{ 
              width: `${orbits[1].size}px`, 
              height: `${orbits[1].size}px`,
              animation: `rotateRight ${orbits[1].duration}s linear infinite`
            }}
          />
          
          <div className="absolute" style={{ width: `${orbits[1].size}px`, height: `${orbits[1].size}px` }}>
            {orbits[1].planets.map((planet, idx) => (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `calc(50% + ${planet.x}px)`, top: `calc(50% + ${planet.y}px)` }}
              >
                <div className="relative w-12 h-12 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 animate-bounce-slow overflow-hidden p-2" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <Image 
                    src={planet.logo} 
                    alt={`${planet.name} logo`} 
                    width={32} 
                    height={32} 
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Hover Label */}
                <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-md">
                  {planet.name}
                </span>
              </div>
            ))}
          </div>

          {/* Orbit 3 - Inner */}
          <div 
            className="absolute rounded-full border-2 border-black/50 border-dashed"
            style={{ 
              width: `${orbits[2].size}px`, 
              height: `${orbits[2].size}px`,
              animation: `rotateLeft ${orbits[2].duration}s linear infinite`
            }}
          />
          
          <div className="absolute" style={{ width: `${orbits[2].size}px`, height: `${orbits[2].size}px` }}>
            {orbits[2].planets.map((planet, idx) => (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `calc(50% + ${planet.x}px)`, top: `calc(50% + ${planet.y}px)` }}
              >
                <div className="relative w-10 h-10 bg-white border-2 border-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 animate-bounce-slow overflow-hidden p-1.5" style={{ animationDelay: `${idx * 0.3}s` }}>
                  <Image 
                    src={planet.logo} 
                    alt={`${planet.name} logo`} 
                    width={24} 
                    height={24} 
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Hover Label */}
                <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-md">
                  {planet.name}
                </span>
              </div>
            ))}
          </div>

          {/* Center Core */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-4xl shadow-2xl animate-pulse z-10">
            💻
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateLeft { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes rotateRight { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
      `}} />
    </section>
  );
}