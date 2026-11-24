"use client";
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ChromaGrid from "@/components/effects/ChromaGrid";
import { articles, categories, readLabel } from "@/data/blog";
import type { Category } from "@/data/blog";

gsap.registerPlugin(useGSAP);

export default function BlogIndex() {
  const root = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<Category>("All");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".bh__line > span", { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.1)
        .from(".bh__fade", { opacity: 0, y: 14, duration: 0.9, stagger: 0.1 }, 0.7)
        .from(".bh__mark", { opacity: 0, scale: 0.8, rotate: -40, duration: 1.6 }, 0.2)
        .from(".bh__crop", { opacity: 0, duration: 1.2 }, 0.4);
    });
    return () => mm.revert();
  }, { scope: root });

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, c === "All" ? articles.length : articles.filter((a) => a.category === c).length])), []);
  const items = useMemo(
    () => articles.filter((a) => cat === "All" || a.category === cat).map((a) => ({
      image: a.image, title: a.title, subtitle: a.category, accent: a.accent, href: `/blogs/${a.slug}`, description: a.excerpt, meta: readLabel(a),
    })),
    [cat]
  );

  return (
    <div ref={root}>
      <section className="bh">
        <i className="bh__crop bh__crop--tl" aria-hidden="true" /><i className="bh__crop bh__crop--tr" aria-hidden="true" />
        <div className="wrap bh__inner">
          <svg className="bh__mark" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.2" /><circle cx="60" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
            <path d="M60 4v112M4 60h112" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <h1 className="bh__title" aria-label="Ideas that leave a mark.">
            <span className="bh__line" aria-hidden="true"><span>Ideas that</span></span>
            <span className="bh__line" aria-hidden="true"><span className="it">leave a mark.</span></span>
          </h1>
          <p className="bh__lede bh__fade">
  Explore insights, practical strategies and ideas across web development,
  design, digital marketing, technology, SEO, branding and business.
</p>
        </div>
      </section>

      <section className="wrap bg" aria-labelledby="bg-h">
        <div className="bg__bar bh__fade">
          <h2 id="bg-h" className="sr">Articles</h2>
          <div className="bg__filters" role="group" aria-label="Filter articles by category">
            {categories.map((c) => (
              <button key={c} className={c === cat ? "is-on" : ""} aria-pressed={c === cat} onClick={() => setCat(c)}>
                {c}<sup>{counts[c]}</sup>
              </button>
            ))}
          </div>
          <p className="bg__count" role="status" aria-live="polite">{items.length} {items.length === 1 ? "article" : "articles"}</p>
        </div>
        <ChromaGrid items={items} theme="dark" reveal="spotlight" columns={3} minCardWidth={220} gap={18} radius={260} softness={0.65}
          damping={0.45} grayscale={1} dim={0.12} glow={0.5} borderGlow={0.8} aspectRatio="3 / 2" cardRadius={20} showInfo frame={false}
        />
        <p className="bg__note">
  Sample articles. Placeholder copy and artwork until real posts are added in <code>data/blog.ts</code>.
</p>
      </section>
    </div>
  );
}
