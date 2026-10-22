"use client";

import Image from "next/image";

// ------------------------------------------------------------------
// Orbit configuration — sizes are in px, but the whole scene is scaled
// with a CSS `clamp()` on the wrapper below, so it fluidly shrinks
// instead of the old scale-[0.45] hack that made everything tiny.
// ------------------------------------------------------------------
const ORBITS = [
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
    ],
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
    ],
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
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative w-full flex items-center justify-center overflow-hidden bg-transparent section-pad px-6 sm:px-10 lg:px-16"
    >
      {/* Purple ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl">
        <h2 className="text-center font-black text-black tracking-tight uppercase mb-10 sm:mb-14 text-2xl sm:text-3xl lg:text-4xl">
          Tech <span className="text-purple-600">Stack</span>
        </h2>

        {/* Orbit scene. The whole scene is scaled down via clamp() so it
            fits every viewport without shrinking the actual logos (unlike
            the old scale-[0.45] which made the whole thing tiny).          */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            // Scene is 700px wide by design; clamp scales it from 320px
            // (small phones) up to 700px (desktop), fluidly in between.
            width: "min(100%, clamp(320px, 90vw, 700px))",
            aspectRatio: "1 / 1",
          }}
        >
          {/* Orbit rings (each ring container holds its ring border AND its planets) */}
          {ORBITS.map((orbit, i) => {
            const scale = orbit.size / 700; // relative to the outer ring
            const rotateClass =
              orbit.direction === "left"
                ? "animate-rotate-left"
                : "animate-rotate-right";

            return (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${rotateClass}`}
                style={{
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  // Duration passed as a CSS var so keyframes read it.
                  "--orbit-duration": `${orbit.duration}s`,
                }}
              >
                {/* The dashed ring border */}
                <div className="absolute inset-0 rounded-full border-2 border-black/30 border-dashed" />

                {/* Planets, positioned around the ring */}
                {orbit.planets.map((planet, idx) => {
                  // Counter-rotate so the logo stays upright while the
                  // parent ring spins. We layer two transforms:
                  //   parent (ring) rotates continuously,
                  //   child  (planet) rotates the opposite way, continuously.
                  const counterClass =
                    orbit.direction === "left"
                      ? "animate-rotate-right"
                      : "animate-rotate-left";

                  return (
                    <div
                      key={planet.name}
                      className="absolute"
                      style={{
                        // Planet position is expressed as a % of the ring
                        // so it scales with the scene, not with fixed px.
                        left: `calc(50% + ${(planet.x / orbit.size) * 100}%)`,
                        top: `calc(50% + ${(planet.y / orbit.size) * 100}%)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* The counter-rotating wrapper — keeps the logo upright */}
                      <div
                        className={counterClass}
                        style={{ "--orbit-duration": `${orbit.duration}s` }}
                      >
                        <Planet
                          planet={planet}
                          size={i === 0 ? "lg" : i === 1 ? "md" : "sm"}
                          index={idx}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Center core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[16%] aspect-square bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-[8vw] sm:text-3xl lg:text-4xl select-none">💻</span>
          </div>
        </div>

        {/* Mobile fallback: a readable text list under the orbit so the
            section is still useful if the animation is reduced/frozen.    */}
        <noscript>
          <ul className="mt-10 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {ORBITS.flatMap((o) => o.planets).map((p) => (
              <li
                key={p.name}
                className="px-3 py-1.5 rounded-full border border-black/10"
              >
                {p.name}
              </li>
            ))}
          </ul>
        </noscript>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* A single planet (logo bubble). Hover OR focus shows the name.       */
/* ------------------------------------------------------------------ */
function Planet({ planet, size, index }) {
  const dims = {
    lg: { outer: "clamp(38px, 4.2vw, 56px)", pad: "0.6rem", img: 40 },
    md: { outer: "clamp(32px, 3.6vw, 48px)", pad: "0.5rem", img: 32 },
    sm: { outer: "clamp(28px, 3vw, 40px)", pad: "0.4rem", img: 24 },
  }[size];

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={planet.name}
      className="group relative block focus:outline-none"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <span
        className="flex items-center justify-center rounded-full bg-white border-2 border-purple-500 shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125 group-focus-visible:ring-2 group-focus-visible:ring-purple-500 group-focus-visible:ring-offset-2 animate-bounce-slow"
        style={{
          width: dims.outer,
          height: dims.outer,
          padding: dims.pad,
          animationDelay: `${index * 0.2}s`,
        }}
      >
        <Image
          src={planet.logo}
          alt={`${planet.name} logo`}
          width={dims.img}
          height={dims.img}
          className="object-contain w-full h-full"
        />
      </span>

      {/* Hover / focus label — visible to keyboard users too */}
      <span className="pointer-events-none absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 z-20 shadow-md">
        {planet.name}
      </span>
    </a>
  );
}