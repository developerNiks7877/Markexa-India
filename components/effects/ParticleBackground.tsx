"use client";
import { useEffect, useRef } from "react";

type Props = { className?: string; density?: number; warm?: string; cool?: string; scale?: number; interactive?: boolean };
type P = { r: number; a: number; y: number; ring: 0 | 1; s: number; c: 0 | 1 };

/** Twin ring particle galaxy (original canvas implementation). Cursor-reactive, pauses offscreen / hidden tab. */
export default function ParticleBackground({ className, density = 1, warm = "232,120,58", cool = "170,196,220", scale = 1, interactive = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    const count = Math.floor((coarse ? 520 : 1900) * density);
    const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
    const parts: P[] = Array.from({ length: count }, (_, i) => {
      const ring = (i % 2) as 0 | 1;
      const g = (rnd() + rnd() + rnd() - 1.5) / 1.5;
      return { ring, r: (ring ? 0.64 : 0.9) + g * 0.045, a: rnd() * Math.PI * 2, y: g * 0.03 + (rnd() - 0.5) * 0.02, s: 0.9 + rnd() * 1.8, c: rnd() > 0.78 ? 1 : 0 };
    });

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, running = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 1.75);
      w = r.width; h = r.height;
      canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    let t = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.045; mouse.y += (mouse.ty - mouse.y) * 0.045;
      draw();
      if (running) raf = requestAnimationFrame(frame);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.5 * scale * (w < 700 ? 1.15 : 1);
      const cx = w / 2, cy = h / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55);
      grad.addColorStop(0, `rgba(${warm},0.38)`); grad.addColorStop(0.4, `rgba(${warm},0.10)`); grad.addColorStop(1, `rgba(${warm},0)`);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
      const tiltX = 1.05 + mouse.y * 0.35, tiltZ = -0.35 + mouse.x * 0.45;
      const cxr = Math.cos(tiltX), sxr = Math.sin(tiltX), czr = Math.cos(tiltZ), szr = Math.sin(tiltZ);
      for (const p of parts) {
        const ang = p.a + t * (p.ring ? -0.11 : 0.07) * (1.2 - p.r * 0.5);
        const ring2 = p.ring ? 0.55 : 0; // second ring offset tilt
        const x = Math.cos(ang) * p.r; let z = Math.sin(ang) * p.r, y = p.y;
        // tilt ring 2 differently
        const ty = y * Math.cos(ring2) - z * Math.sin(ring2); const tz = y * Math.sin(ring2) + z * Math.cos(ring2); y = ty; z = tz;
        // global tilt
        const y1 = y * cxr - z * sxr, z1 = y * sxr + z * cxr;
        const x2 = x * czr - y1 * szr, y2 = x * szr + y1 * czr;
        const persp = 1 / (1.6 - z1 * 0.5);
        const px = cx + x2 * R * persp * 1.15, py = cy + y2 * R * persp * 1.15;
        const a = Math.min(1, 0.3 + persp * 0.7);
        const size = p.s * persp * 1.5;
        ctx.fillStyle = `rgba(${p.c ? cool : warm},${a})`;
        ctx.fillRect(px, py, size, size);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const start = () => { if (running || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const sync = () => (visible && !document.hidden ? start() : stop());

    resize();
    draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: "80px" });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); if (!running) draw(); });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    if (interactive && !coarse && !reduce) window.addEventListener("pointermove", onMove, { passive: true });
    return () => { stop(); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", sync); window.removeEventListener("pointermove", onMove); };
  }, [density, warm, cool, scale, interactive]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
