"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-20">
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