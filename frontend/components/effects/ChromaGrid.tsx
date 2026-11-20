"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export type ChromaItem = {
  image: string; title: string; subtitle: string; accent: string; href: string;
  description?: string; meta?: string;
};

export type ChromaGridProps = {
  items: ChromaItem[];
  theme?: "dark" | "light";
  reveal?: "spotlight" | "hover" | "none";
  columns?: number; minCardWidth?: number; gap?: number;
  radius?: number; softness?: number; damping?: number;
  grayscale?: number; dim?: number; glow?: number; borderGlow?: number;
  aspectRatio?: string; cardRadius?: number; showInfo?: boolean; frame?: boolean;
  className?: string;
};

/**
 * Cursor-driven colour-reveal grid (ChromaGrid behaviour: grayscale field, spotlight that follows the cursor
 * with damping, per-card accent border glow). Implemented locally with GSAP + CSS custom properties.
 * Touch / no-hover devices skip the spotlight and show full colour.
 */
export default function ChromaGrid({
  items, theme = "dark", reveal = "spotlight", columns = 3, minCardWidth = 220, gap = 18,
  radius = 260, softness = 0.65, damping = 0.45, grayscale = 1, dim = 0.12, glow = 0.5, borderGlow = 0.8,
  aspectRatio = "3 / 2", cardRadius = 20, showInfo = true, frame = false, className = "",
}: ChromaGridProps) {
  const grid = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);
  const raf = useRef<number | null>(null);

const pointer = useRef({
  x: 0,
  y: 0,
  target: null as HTMLElement | null,
  immediate: false,
});
  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = grid.current;
    return () => {
  if (raf.current !== null) {
    cancelAnimationFrame(raf.current);
  }

  if (el) gsap.killTweensOf(el);
};
  }, []);
            
const place = (
  e: React.PointerEvent<HTMLDivElement>,
  immediate = false
) => {
  if (e.pointerType === "touch") return;

  pointer.current = {
    x: e.clientX,
    y: e.clientY,
    target: (e.target as HTMLElement).closest<HTMLElement>(
      "[data-cg-card]"
    ),
    immediate,
  };

  if (raf.current !== null) return;

  raf.current = requestAnimationFrame(() => {
    raf.current = null;

    const el = grid.current;
    if (!el) return;

    const { x, y, target, immediate: instant } = pointer.current;
    const rect = el.getBoundingClientRect();

    const vars = {
      "--x": `${x - rect.left}px`,
      "--y": `${y - rect.top}px`,
    };

    if (instant || reduce.current) {
      gsap.set(el, vars);
    } else {
      gsap.set(el, vars);
    }

    if (target) {
      const cardRect = target.getBoundingClientRect();

      target.style.setProperty("--mx", `${x - cardRect.left}px`);
      target.style.setProperty("--my", `${y - cardRect.top}px`);
    }
  });
};

  const fade = (to: number) => {
    if (!grid.current) return;

    gsap.to(grid.current, {
      "--o": to,
      duration: reduce.current ? 0 : 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-cg-card]"
    );
    const el = grid.current;

    if (!card || !el || !card.matches(":focus-visible, :has(:focus-visible)")) {
      return;
    }

    const g = el.getBoundingClientRect();
    const c = card.getBoundingClientRect();

    gsap.to(el, {
      "--x": `${c.left - g.left + c.width / 2}px`,
      "--y": `${c.top - g.top + c.height / 2}px`,
      duration: reduce.current ? 0 : damping,
      overwrite: "auto",
    });

    fade(1);
  };

  const style = {
    "--cg-cols": columns,
    "--cg-min": `${minCardWidth}px`,
    "--cg-gap": `${gap}px`,
    "--cg-r": `${radius}px`,
    "--cg-inner": `${Math.round((1 - softness) * 100)}%`,
    "--cg-gs": grayscale,
    "--cg-dim": dim,
    "--cg-glow": `${Math.round(glow * 100)}%`,
    "--cg-bg-glow": borderGlow,
    "--cg-ar": aspectRatio,
    "--cg-radius": `${cardRadius}px`,
  } as React.CSSProperties;

  return (
    <div
      className={`cg-root ${className}`}
      data-theme={theme}
      data-reveal={reveal}
      data-frame={frame}
      style={style}
    >
      <div
        ref={grid}
        className="cg-grid"
        onPointerEnter={(e) => {
          place(e, true);
          fade(1);
        }}
        onPointerMove={place}
        onPointerLeave={() => fade(0)}
        onFocus={onFocus}
        onBlur={() => fade(0)}
      >
        {items.map((it, i) => {
          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="cg-img"
                src={it.image}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="cg-shade" aria-hidden="true" />

              {showInfo && (
                <span className="cg-info">
                  <span className="cg-row">
                    <span className="cg-cat">
                      <i />
                      {it.subtitle}
                    </span>
                    {it.meta && <span className="cg-meta">{it.meta}</span>}
                  </span>

                  <h3 className="cg-title">{it.title}</h3>

                  {it.description && (
                    <span className="cg-desc">
                      <span>{it.description}</span>
                    </span>
                  )}
                </span>
              )}
            </>
          );

          const common = {
            className: "cg-card",
            "data-cg-card": "",
            style: {
              "--accent": it.accent,
              "--i": i,
            } as React.CSSProperties,
          };

          return /^https?:/.test(it.href) ? (
            <a
              key={it.href}
              {...common}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${it.title}, ${it.subtitle}`}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={it.href}
              {...common}
              href={it.href}
              aria-label={`${it.title}, ${it.subtitle}`}
            >
              {inner}
            </Link>
          );
        })}

        {reveal === "spotlight" && (
          <div className="cg-overlay" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

