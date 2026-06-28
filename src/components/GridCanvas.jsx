"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GridCanvas() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // Default off-screen
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e) => {
      // track relative to viewport since the container is fixed
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] transition-opacity duration-500"
      style={{
        backgroundImage: `
          linear-gradient(to right, #000000 1px, transparent 1px),
          linear-gradient(to bottom, #000000 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
      }}
    />
  );
}