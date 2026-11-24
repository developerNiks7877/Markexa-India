"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./effects/MagneticButton";
import HeroVideo from "./HeroVideo";
import { useMotion } from "./MotionProvider";
import {ScrollTrigger} from "gsap/ScrollTrigger" 
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useMotion();
  gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  const mm = gsap.matchMedia(); //creates a media query manager

  mm.add("(prefers-reduced-motion: no-preference)", () => {

    // Animate description, buttons and scroll indicator
    gsap.from(".hero__fade", {        //Select elmts from hero_fade
      opacity: 0,                     // Starts completely invisible
      y: 16,                          // Start 16 pixels lower
      duration: 1,                     // Animation lasts one second
      stagger: 0.12,                   // Elements starts 0.12 seconds apart
      ease: "power4.out",              // Controls how the animation accelerates and slows down
    });

    // Move hero content as the user scrolls
    gsap.to(".hero__inner", {
      yPercent: 14,                    //Moves it down by 14% of its own height
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {               //connects animation to scrolling
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,                //Makes the animation follow the user's scroll position.
      },
    });

  });

  return () => mm.revert(); //When this animation setup is no longer active, revert the media-query animations and restore the previous state.So switiching between pages with different animations become easier.

}, { scope: root });


  return (
    <section id="home" ref={root} className="hero">
      <div className="hero__bg" aria-hidden="true" />

      <HeroVideo />
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__foot">
          <p className="hero__fade hero__lede">Your creative partner for digital growth — strategy, branding, design and development that makes brands stand out.</p>
        </div>
      </div>
    </section>
  );
}
