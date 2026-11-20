/**
 * Optional: regenerates the temporary blog artwork into public/images/blog (3:2 SVGs).
 * Run:  npx --yes tsx scripts/generate-blog-art.tsx
 * Not needed if you supply your own photography.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import ProceduralArt from "../components/effects/ProceduralArt";
import type { ArtVariant } from "../components/effects/ProceduralArt";

const jobs: [string, ArtVariant, ArtVariant, string][] = [
  ["a-logo-is-the-smallest-part-of-a-brand", "orb", "rings", "#c8ff3a"],
  ["restraint-is-the-hardest-design-skill", "arches", "monolith", "#7cc8ff"],
  ["campaigns-start-with-one-idea", "ribbon", "liquid", "#ff4f8b"],
  ["motion-on-the-web-should-earn-its-place", "rings", "dunes", "#3dffc0"],
  ["design-the-feed-as-one-composition", "monolith", "orb", "#ffe14a"],
  ["typography-is-your-brands-voice", "liquid", "arches", "#e8ecf0"],
];
const svg = (v: ArtVariant, hue: string) =>
  renderToStaticMarkup(<ProceduralArt variant={v} hue={hue} bg="#070707" />)
    .replace(/viewBox="[^"]*"/, 'viewBox="0 220 800 533" width="1200" height="800"');
for (const [slug, a, b, hue] of jobs) {
  writeFileSync(`public/images/blog/${slug}.svg`, svg(a, hue));
  writeFileSync(`public/images/blog/${slug}-2.svg`, svg(b, hue));
}
console.log("done");
