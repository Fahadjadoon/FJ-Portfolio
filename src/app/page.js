"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    // Changed flex-col for mobile, lg:flex-row for desktop
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Navbar />

      {/* Main Content: Removed ml-20 on mobile, added lg:ml-20 for desktop */}
      <div className="flex-1 lg:ml-20">
        <section id="home">
          <Hero />
        </section>
        
        <section id="tech-stack">
          <TechStack />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}