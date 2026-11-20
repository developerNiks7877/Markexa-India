"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { process } from "@/data/services";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** A single line that draws itself through four stages as you scroll. */
export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const line = root.current!.querySelector<HTMLElement>(".proc__fill")!;
      gsap.fromTo(line, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".proc__step").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0.25 }, { opacity: 1, scrollTrigger: { trigger: el, start: "top 78%", end: "top 55%", scrub: true } });
        void i;
      });
    });
    return () => mm.revert();
  }, { scope: root });
  return (
    <div className="proc" ref={root}>
      <h3 className="proc__title">How a project moves</h3>
      <div className="proc__track"><span className="proc__fill" /></div>
      <ol className="proc__steps">
        {process.map((p) => (
          <li className="proc__step" key={p.n}><span className="proc__dot" /><b>{p.n}</b><h4>{p.title}</h4><p>{p.text}</p></li>
        ))}
      </ol>
    </div>
  );
}
