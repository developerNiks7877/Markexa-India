"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SceneTransition from "./SceneTransition";
import ProceduralArt from "./effects/ProceduralArt";
import type { ArtVariant } from "./effects/ProceduralArt";
import { ScrubWords } from "./effects/TextReveal";
import { team, values } from "@/data/team";
import { media } from "@/data/media";
import DepthCarousel from "./effects/DepthCarousel"

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Portrait({ id, i }: { id: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const img = media.teamImages[id];
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${-y * 8}deg`); ref.current.style.setProperty("--ry", `${x * 10}deg`);
    ref.current.style.setProperty("--mx", `${(x + 0.5) * 100}%`); ref.current.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const leave = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  return (
    <div ref={ref} className="portrait" onPointerMove={move} onPointerLeave={leave}>
      {img ? <Image src={img} alt="" fill sizes="(max-width:800px) 80vw, 30vw" /> : (
        <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><linearGradient id={`pg${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c3238" /><stop offset="1" stopColor="#0c0e10" /></linearGradient>
            <radialGradient id={`ph${i}`} cx="0.5" cy="0.35" r="0.6"><stop offset="0" stopColor="#9db4c8" stopOpacity="0.5" /><stop offset="1" stopColor="#9db4c8" stopOpacity="0" /></radialGradient></defs>
          <rect width="300" height="400" fill={`url(#pg${i})`} />
          <rect width="300" height="400" fill={`url(#ph${i})`} />
          <circle cx="150" cy="150" r="52" fill="#1a1d20" stroke="#9db4c8" strokeOpacity=".35" />
          <path d="M40 400 C 50 290, 110 250, 150 250 C 190 250, 250 290, 260 400Z" fill="#1a1d20" stroke="#9db4c8" strokeOpacity=".35" />
        </svg>
      )}
      <span className="portrait__sheen" aria-hidden="true" />
      <span className="portrait__tag">Photo placeholder</span>
    </div>
  );
}

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const [vi, setVi] = useState(0);
  const teamItems = team.map((m) => {
  const image = media.teamImages[m.id];

  return {
    image: image ? String(image) : "",
    alt: m.name,
    name: m.name,
    role: m.role,
    description: m.note,
  };
});


  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
      gsap.to(".about__sculpt", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".about__intro", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".portrait-wrap:nth-child(2)", { yPercent: 0 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".team", start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  const v = values[vi];
  return (
    <SceneTransition id="about" className="about">
      <div ref={root}>
        <div className="about__intro wrap">
          <div className="about__sculpt" aria-hidden="true">
            {media.aboutImage ? <Image src={media.aboutImage} alt="" fill sizes="40vw" /> : <ProceduralArt variant="arches" hue="#9db4c8" bg="#0c0f12" />}
          </div>
          <h2 className="display">Behind the<br /><span className="it">creation.</span></h2>
          <div className="about__copy">
            <ScrubWords className="lead" text="Markexa India is a creative digital agency helping businesses build a powerful online presence. We combine strategy, creativity and technology to deliver social media management, graphic design, branding, and web & app development that makes brands stand out." />
            <div className="mv">
              <div><h3>Mission</h3><p>To turn ambitious ideas into powerful digital experiences — combining strategy, creativity and technology to build brands that connect, inspire and grow.</p></div>
              <div><h3>Vision</h3><p>To be the trusted creative partner for bold brands — shaping the future with fresh ideas, smart execution and fearless creativity to help them lead, stand out and stay relevant.</p></div>
            </div>
          </div>
        </div>

        <div className="values wrap" aria-label="Our personality">
          <h3 className="values__head">How we behave</h3>
          <ul className="values__list" role="tablist" aria-orientation="vertical">
            {values.map((x, i) => (
              <li key={x.id}>
                <button role="tab" aria-selected={i === vi} className={i === vi ? "is-on" : ""} onMouseEnter={() => matchMedia("(hover:hover)").matches && setVi(i)} onFocus={() => setVi(i)} onClick={() => setVi(i)}>{x.title}</button>
              </li>
            ))}
          </ul>
          <div className="values__panel" role="tabpanel" aria-live="polite">
            <div className="values__art" key={v.id}>
  <Image
    src={media.aboutValues[v.id as keyof typeof media.aboutValues]}
    alt={v.title}
    fill
    sizes="(max-width: 768px) 90vw, 40vw"
    style={{ objectFit: "cover" }}
    loading ="eager"
  />
</div>
            <p>{v.text}</p>
          </div>
        </div>

        <div className="team wrap">
          <div className="team__head">
            <h3 className="display display--s">Meet the<br />founders.</h3>
            <p className="note">The people behind Markexa India — building brands with creativity, strategy and technology.</p>
          </div>
          <div style={{ height: "500px", position: "relative" }}>
  <DepthCarousel
    
    depth={220}
    spread={90}
    tilt={22}
    tiltDirection="right"
    perspective={1400}
    visibleCards={4}
    falloff={0.2}
    blur={6}
    autoplay={false}
    loop
    cardWidth={300}
    cardHeight={380}
    radius={18}
    tint="#05060a"
    duration={700}
    ease="power3.out"
    autoplayDelay={3200}
    showControls
    showIndicators
  />
</div>
        </div>
      </div>
    </SceneTransition>
  );
}
