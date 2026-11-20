
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TwinGalaxyRings from "./effects/TwinGalaxyRings";
import MagneticButton from "./effects/MagneticButton";
import { useMotion } from "./MotionProvider";
import { nav, site } from "@/data/site";
import SocialLinks from "./SocialLinks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FooterProps = {
  lines?: string[];
  variant?: "home" | "blog";
};

export default function Footer({
  lines = ["Make something", "they can’t", "scroll past."],
  variant = "home",
}: FooterProps) {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useMotion();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".foot__line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 55%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".foot__scene",
        { scale: 0.7, opacity: 0.2 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".foot__word",
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: root });

  const light = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !root.current) return;

    const r = root.current.getBoundingClientRect();

    root.current.style.setProperty("--fx", `${e.clientX - r.left}px`);
    root.current.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  return (
    <footer
      id="footer"
      ref={root}
      className={`foot ${variant === "blog" ? "foot--blog" : ""}`}
      onPointerMove={light}
    >
      {/* GALAXY BACKGROUND */}
      <div className="foot__scene" aria-hidden="true">
        <TwinGalaxyRings
          background="transparent"
          colors={["#A78BFA", "#E8EDF5"]}
          density={65}
          dotSize={2}
          speed={35}
          hoverSpeed={65}
          direction="cw"
          distance={3540}
          innerVoid={14}
          armThickness={100}
          armCount={5}
          tilt={{ tilt: 26, sideTilt: -8 }}
          style={{
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
            background: "transparent",
          }}
        />
      </div>

      <div className="foot__spot" aria-hidden="true" />

      <div className="wrap foot__main">
        <h2 className="display foot__title" aria-label={lines.join(" ")}>
          {lines.map((line, i) => (
            <span
              key={i}
              className="foot__line"
              aria-hidden="true"
            >
              <span className={i === lines.length - 1 ? "it" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <MagneticButton
          className="btn--solid btn--lg"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("contact");
          }}
        >
          Start a project
        </MagneticButton>
      </div>

      <div className="wrap foot__cols">
        <nav aria-label="Footer">
          <h3>Explore</h3>

          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(n.id);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div>
          <h3>Follow</h3>
          <SocialLinks/>
{/* 
          {site.socials.map((s) =>
            s.href ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ) : (
              <span key={s.label} className="is-empty">
                {s.label}
              </span>
            )
          )} */}
        </div>

        <div>
          <h3>Contact</h3>

          {site.email ? (
            <a href={`mailto:${site.email}`}>{site.email}</a>
          ) : (
            <span className="is-empty">Add email</span>
          )}

          {site.phone ? (
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          ) : (
            <span className="is-empty">Add phone</span>
          )}

          <span>{site.location}</span>
        </div>
      </div>

      <div className="foot__word" aria-hidden="true">
        MarkexaIndia
      </div>

      <div className="wrap foot__base">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>

        <button
          onClick={() => scrollTo("home")}
          className="foot__top"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}


