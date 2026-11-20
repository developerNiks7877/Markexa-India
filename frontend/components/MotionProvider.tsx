"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { scrollTo: (id: string) => void; active: string };
const MotionCtx = createContext<Ctx>({ scrollTo: () => {}, active: "home" });
export const useMotion = () => useContext(MotionCtx);

const IDS = ["home", "about", "work", "contact"];

/** Smooth scrolling (fine pointer, motion allowed), ScrollTrigger sync and active-section tracking. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const lenis = useRef<Lenis | null>(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    let tick: ((t: number) => void) | null = null;
    if (!reduce && !coarse) {
      const l = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
      lenis.current = l;
      l.on("scroll", ScrollTrigger.update);
      tick = (t) => l.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === "footer" ? "contact" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...IDS, "footer"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      io.disconnect();
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis.current?.destroy(); lenis.current = null;
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      if (id === "home" && location.pathname === "/") return;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (id === "home" && location.pathname !== "/" && document.getElementById("footer")) {
        // "back to top" on a sub-page
        if (lenis.current) lenis.current.scrollTo(0, { duration: 1.4 }); else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      } else router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }
    if (lenis.current) lenis.current.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <MotionCtx.Provider value={{ scrollTo, active }}>{children}</MotionCtx.Provider>;
}
