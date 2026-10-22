"use client";

import { useEffect, useRef, useState } from "react";

export default function GridCanvas() {
  const canvasRef = useRef(null);       // the grid div we mutate
  const rafRef = useRef(0);             // rAF handle
  const pointerRef = useRef({ x: -1000, y: -1000 }); // latest pointer
  const pendingRef = useRef(false);     // whether a frame is scheduled
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const el = canvasRef.current;
    if (!el) return;

    // Respect the user's OS-level motion preference.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Static grid, no pointer tracking — but keep it visible.
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
      return;
    }

    // ---- rAF-throttled pointer update ----
    const applyPointer = () => {
      pendingRef.current = false;
      const node = canvasRef.current;
      if (!node) return;
      const { x, y } = pointerRef.current;
      // Write to CSS custom props — no React state, no re-render.
      node.style.setProperty("--mx", `${x}px`);
      node.style.setProperty("--my", `${y}px`);
    };

    const schedule = () => {
      if (pendingRef.current) return;
      pendingRef.current = true;
      rafRef.current = requestAnimationFrame(applyPointer);
    };

    const handlePointerMove = (e) => {
      // Touch events don't have clientX on the touch object; use changedTouches.
      const t =
        e.touches && e.touches.length
          ? e.touches[0]
          : e.changedTouches && e.changedTouches.length
          ? e.changedTouches[0]
          : e;
      pointerRef.current = { x: t.clientX, y: t.clientY };
      schedule();
    };

    const handlePointerLeave = () => {
      // Park the glow off-screen so it fades out instead of snapping.
      pointerRef.current = { x: -1000, y: -1000 };
      schedule();
    };

    // ---- visibility-aware: stop the loop when the tab is hidden ----
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        pendingRef.current = false;
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    // Initialise at off-screen so the grid starts dark.
    el.style.setProperty("--mx", "-1000px");
    el.style.setProperty("--my", "-1000px");

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // SSR-safe: render nothing until mounted (prevents hydration flash).
  if (!isMounted) return null;

  return (
    <div
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.06] transition-opacity duration-500"
      style={{
        // CSS custom props are written by the rAF loop; the mask uses them.
        // Fallback (-1000px) keeps the grid fully hidden before first move.
        backgroundImage: `
          linear-gradient(to right, #000000 1px, transparent 1px),
          linear-gradient(to bottom, #000000 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: `radial-gradient(
          circle 350px at var(--mx, -1000px) var(--my, -1000px),
          black 20%,
          transparent 100%
        )`,
        WebkitMaskImage: `radial-gradient(
          circle 350px at var(--mx, -1000px) var(--my, -1000px),
          black 20%,
          transparent 100%
        )`,
      }}
    />
  );
}