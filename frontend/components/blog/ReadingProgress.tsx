"use client";
import { useEffect, useRef } from "react";

/** Thin accent line that tracks reading progress. Writes a transform directly; no React re-renders on scroll. */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById("article-body");
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.35 - r.top) / Math.max(1, r.height - innerHeight * 0.1)));
      bar.current.style.transform = `scaleX(${p})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="rprog" aria-hidden="true"><div ref={bar} /></div>;
}
