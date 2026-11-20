"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { media } from "@/data/media";

/**
 * Video-ready layer. Renders nothing until `media.heroVideo` is set in data/media.ts.
 * Muted/autoplay/playsInline, picks the mobile file on small screens, skips download on
 * data-saver or reduced-motion, pauses offscreen, and reveals only after it can play
 * (any error leaves the procedural scene visible).
 */
export default function HeroVideo() {
  const v = media.heroVideo;
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const allowed = useSyncExternalStore(
    () => () => {},() => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      return !!v && !conn?.saveData && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [allowed]);

  if (!v || !allowed) return null;
  const small = typeof window !== "undefined" && matchMedia("(max-width: 700px)").matches;
  
  return (
    <video ref={ref} 
       className={`hero__video ${ready ? "is-ready" : ""}`}   muted loop playsInline autoPlay preload="metadata" poster={v.poster}
      onCanPlay={() => setReady(true)} onError={() => setReady(false)} aria-hidden="true">
      {v.webm && <source src={v.webm} type="video/webm" />}
      <source src={small && v.mobileMp4 ? v.mobileMp4 : v.mp4} type="video/mp4" />
    </video>
  );
}
