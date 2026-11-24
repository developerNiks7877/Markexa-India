import type { ArtVariant } from "@/components/effects/ProceduralArt";
/** DEMONSTRATION PROJECTS — not real client work. Replace with real projects + images via data/media.ts. */
export type Project = { id: string; name: string; category: string; blurb: string; art: ArtVariant; hue: string; year: string };
export const projects: Project[] = [
  { id: "obsidian-atlas", name: "Obsidian Atlas", category: "Brand Identity", blurb: "A concept identity for an imagined mining-tech house: weighty marks, oxide palette, a system built to feel carved rather than drawn.", art: "orb", hue: "#d4501e", year: "Demo" },
  { id: "halcyon-field", name: "Halcyon Field", category: "Web Experience", blurb: "A speculative interactive site where the page behaves like a landscape. Scroll becomes travel; type sits inside the horizon.", art: "dunes", hue: "#e8923a", year: "Demo" },
  { id: "meridian-ribbon", name: "Meridian", category: "Motion Design", blurb: "A demo brand film built around one twisting metallic ribbon: a single object, edited into a full campaign.", art: "ribbon", hue: "#d4501e", year: "Demo" },
  { id: "north-hall", name: "North Hall", category: "App Design", blurb: "A concept mobile product for a fictional architecture archive, designed around quiet, monumental screens.", art: "arches", hue: "#9db4c8", year: "Demo" },
  { id: "quiet-signal", name: "Quiet Signal", category: "Social Campaign", blurb: "A demonstration social system: modular posts that read as one continuous sculpture when the grid is viewed whole.", art: "monolith", hue: "#c9ccd1", year: "Demo" },
  { id: "liquid-index", name: "Liquid Index", category: "Graphic Design", blurb: "Concept poster series in molten silver and copper, exploring type pressed into reflective surfaces.", art: "liquid", hue: "#b87333", year: "Demo" },
];
