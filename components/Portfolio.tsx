"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProceduralArt from "./effects/ProceduralArt";
import { projects } from "@/data/projects";
import { media } from "@/data/media";
const N = projects.length;
const STEP = 360 / N;


/** Circular, draggable 3D carousel: pointer drag + momentum + snapping, keyboard arrows, click to select. */
export default function Portfolio() {
  const isPaused = useRef(false);
  const isManuallySelected = useRef(false);
  const ring = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const loopRef = useRef<() => void>(() => {});
  const st = useRef({ rot: 0, vel: 0, target: 0, lastX: 0, moved: 0, raf: 0, radius: 520 });

  const paint = useCallback(() => {
    const s = st.current;
    if (ring.current) ring.current.style.transform = `translateZ(${-s.radius}px) rotateY(${s.rot}deg)`;
    const idx = ((Math.round(-s.rot / STEP) % N) + N) % N;
    setActive((a) => (a === idx ? a : idx));
  }, []);
  const loop = useCallback(() => {
    const s = st.current;
    s.rot += (s.target - s.rot) * 0.12;
    if (Math.abs(s.target - s.rot) > 0.05)
    
    paint();
    if (Math.abs(s.vel) > 0.05 || Math.abs(s.target - s.rot) > 0.05) s.raf = requestAnimationFrame(() => loopRef.current());
    else { s.rot = s.target; paint(); s.raf = 0; }
  }, [paint]);
  useEffect(() => { loopRef.current = loop; }, [loop]);
  const kick = useCallback(() => { if (!st.current.raf) st.current.raf = requestAnimationFrame(() => loopRef.current()); }, []);

  const goTo = useCallback((i: number) => {
    const s = st.current; const cur = Math.round(-s.rot / STEP);
    let d = i - (((cur % N) + N) % N); if (d > N / 2) d -= N; if (d < -N / 2) d += N;
    s.vel = 0; s.target = -(cur + d) * STEP; kick();
  }, [kick]);


useEffect(() => {
  if (N < 2) return;

  const timer = setInterval(() => {
    if (!isPaused.current && !isManuallySelected.current) {
      step(1);
    }
  }, 1500);

  return () => clearInterval(timer);
}, []);
  const step = (dir: number) => { const s = st.current; s.vel = 0; s.target = Math.round(s.target / STEP) * STEP - dir * STEP; kick(); };

  useEffect(() => {
    const el = stage.current!;
    const size = () => {
      const w = el.clientWidth; const card = Math.min(w * 0.62, 340);
      st.current.radius = Math.round((card / 2) / Math.tan(Math.PI / N) * 1.7);
      el.style.setProperty("--card-w", `${card}px`);
      el.style.setProperty("--radius", `${st.current.radius}px`);
      paint();
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(el);
    // pause the loop offscreen
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) { cancelAnimationFrame(st.current.raf); st.current.raf = 0; } else kick(); });
    io.observe(el);
    const s = st.current;
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(s.raf); s.raf = 0; };
  }, [paint, kick]);
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };
  const handleProjectClick = (i: number) => {
    isManuallySelected.current = true;
    goTo(i);
  };
  const p = projects[active];
  return (
    <div className="work__gallery">
      <div ref={stage} className="carousel" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Selected work (demonstration projects). Use left and right arrow keys."
         onKeyDown={key}>
        <div className="carousel__ring" ref={ring}>
          {projects.map((pr, i) => {
            const img = media.projectImages[pr.id];
            return (
              <button key={pr.id} className={`slide ${i === active ? "is-active" : ""}`} style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--radius))` }}
                aria-label={`${pr.name}, ${pr.category}`} aria-current={i === active} tabIndex={-1}
                onMouseEnter={() => {
                    isPaused.current = true;
                  }}
                  onMouseLeave={() => {
                    isPaused.current = false;
                  }}
                  onClick={() => handleProjectClick(i)}
                >
                {img ? <Image src={img} alt="" fill sizes="340px" draggable={false} /> : <ProceduralArt variant={pr.art} hue={pr.hue} />}
                <span className="slide__shade" />
                <span className="slide__label">{pr.name}</span>
              </button>
            );
          })}
        </div>
        <p className="carousel__hint" aria-hidden="true">
  Hover over a project to explore
</p>
      </div>

      <div className="work__info" aria-live="polite">
        <div className="work__meta"><span>{p.category}</span><em>Demo project</em></div>
        <h3 key={p.id} className="work__name">{p.name}</h3>
        <p>{p.blurb}</p>
        <div className="work__ctrl">
          <button onClick={() =>{isManuallySelected.current =true; step(-1)}} aria-label="Previous project">Prev</button>
          <span>{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          <button onClick={() =>{isManuallySelected.current = true; step(1)}} aria-label="Next project">Next</button>
        </div>
      </div>
    </div>
  );
}
