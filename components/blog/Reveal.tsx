"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** Subtle scroll reveal. Content is visible by default (SSR / no-JS / reduced motion); only below-the-fold blocks are armed. */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.92) return;
    el.classList.add("rv");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("rv-in"); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
