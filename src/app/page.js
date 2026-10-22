"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="w-full lg:pl-24">
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}