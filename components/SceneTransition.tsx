"use client";
import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A chapter wrapper. As it enters, its frame opens from an inset window to full-bleed,
 * so each section reads as stepping into a new environment rather than scrolling past a block.
 */
export default function SceneTransition({ id, className = "", children }: { id: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const small = matchMedia("(max-width: 700px)").matches;
      gsap.fromTo(ref.current, { clipPath: small ? "inset(5% 4% 0% 4% round 22px)" : "inset(14% 12% 0% 12% round 36px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 92%", end: "top 8%", scrub: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref });
  return <section id={id} ref={ref} className={`scene ${className}`}>{children}</section>;
}
