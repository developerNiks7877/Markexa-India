"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Scroll-scrubbed word illumination: words brighten as the paragraph passes through the viewport. */
export function ScrubWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = ref.current!.querySelectorAll(".w");
    gsap.fromTo(words, { opacity: 0.18 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 45%", scrub: true } });
  }, { scope: ref });
  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => <span key={i} className="w">{w} </span>)}
    </p>
  );
}
