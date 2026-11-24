import type { ArtVariant } from "@/components/effects/ProceduralArt";
import { projects } from "./projects";

/**
 * SERVICE-RELATED WORK — the single place to add portfolio items.
 * Add an object to `work` below; it appears on its service page automatically (serviceId must match an id in data/services.ts:
 * brand | web | app | graphic | motion | social | marketing). No component changes needed.
 *
 * Example (real project):
 * {
 *   id: "client-site", name: "Project name", serviceId: "web", category: "E-commerce", type: "website",
 *   description: "One or two sentences about the project.",
 *   image: "/images/work/client-site.jpg",             // optional; procedural art is used if omitted
 *   url: "https://example.com",                         // optional; external (https://…) or internal (/blog/…) route
 *   gallery: ["/images/work/client-site-1.jpg"],        // optional
 *   tech: ["Next.js", "Sanity"],                        // optional
 *   details: [{ label: "Year", value: "2026" }],        // optional
 *   results: [{ label: "…", value: "…" }],              // ONLY with verified data
 * }
 * Leave `status` off for real work. Remove the matching placeholder when you add a real item of the same type.
 */
export type WorkType =
  | "website" | "app" | "social-profile" | "post" | "reel" | "campaign" | "strategy"
  | "identity" | "logo" | "poster" | "packaging" | "ad" | "video" | "case-study";

export type WorkItem = {
  id: string; name: string; serviceId: string; category: string; type: WorkType; description: string;
  image?: string; url?: string; gallery?: string[]; tech?: string[]; videoUrl?: string;
  details?: { label: string; value: string }[]; results?: { label: string; value: string }[];
  /** omitted = real work. "demo" = labelled concept. "placeholder" = empty slot awaiting real content. */
  status?: "demo" | "placeholder"; art?: ArtVariant; hue?: string;
};

const CDN = "https://res.cloudinary.com/ebboxhoj";

/** REAL WORK — actual client projects by Markexa India */
export const work: WorkItem[] = [
  // ── Brand Identity ──────────────────────────────────────────────
  {
    id: "brand-identity-collection",
    name: "Brand Identity Collection",
    serviceId: "brand",
    category: "Identity",
    type: "identity",
    description: "A portfolio of brand identity systems crafted for businesses across hospitality, food, retail, and entertainment — each built to be instantly recognisable.",
    image: `${CDN}/image/upload/v1795161647/brand1_gjrzor.webp`,
    gallery: [
      `${CDN}/image/upload/v1795161647/brand1_gjrzor.webp`,
      `${CDN}/image/upload/v1795161648/brand2_oyiwam.webp`,
      `${CDN}/image/upload/v1795161649/brand3_iezvx0.webp`,
      `${CDN}/image/upload/v1795161650/brand4_fmatix.webp`,
      `${CDN}/image/upload/v1795161651/brand5_pz3pwd.webp`,
    ],
  },

  // ── Social Media Marketing ───────────────────────────────────────
  {
    id: "social-media-campaigns",
    name: "Social Media Campaigns",
    serviceId: "social",
    category: "Social Media",
    type: "campaign",
    description: "Creative campaigns and content produced for brands across Instagram and other social platforms — strategy, design, and execution all in-house.",
    image: `${CDN}/image/upload/v1795161652/dm1_q1vacp.webp`,
    gallery: [
      `${CDN}/image/upload/v1795161652/dm1_q1vacp.webp`,
      `${CDN}/image/upload/v1795161653/dm2_pi0dpn.webp`,
      `${CDN}/image/upload/v1795161654/dm3_i1adhw.webp`,
      `${CDN}/image/upload/v1795161655/dm4_gqgqv8.webp`,
    ],
    videoUrl: `${CDN}/video/upload/v1795161614/Markexa_India_Social_Media_Marketing_Agency_1_y3l6w0.mp4`,
  },

  // ── Video Editing & Motion ───────────────────────────────────────
  {
    id: "video-editing-showreel",
    name: "Video Editing Showreel",
    serviceId: "motion",
    category: "Video",
    type: "video",
    description: "Short-form reels, brand films and social video content edited for Markexa clients — fast-paced, platform-ready, and on-brand.",
    image: `${CDN}/image/upload/v1795161604/videoediting1_emn7g9.webp`,
    gallery: [
      `${CDN}/image/upload/v1795161604/videoediting1_emn7g9.webp`,
      `${CDN}/image/upload/v1795161605/videoediting2_tfq9x5.webp`,
      `${CDN}/image/upload/v1795161605/videoediting3_bnthwd.webp`,
      `${CDN}/image/upload/v1795161605/videoediting4_nsqfxe.png`,
    ],
    videoUrl: `${CDN}/video/upload/v1795161609/Markexa_India_Social_Media_Marketing_Agency_hriblx.mp4`,
  },

  // ── Graphic Design / Portfolio pieces ───────────────────────────
  {
    id: "graphic-design-work",
    name: "Graphic Design Portfolio",
    serviceId: "graphic",
    category: "Creatives",
    type: "poster",
    description: "Marketing creatives, social media visuals, and promotional materials designed for real client campaigns.",
    image: `${CDN}/image/upload/v1795161637/1_tkcpoo.jpg`,
    gallery: [
      `${CDN}/image/upload/v1795161637/1_tkcpoo.jpg`,
      `${CDN}/image/upload/v1795161638/2_styydk.jpg`,
      `${CDN}/image/upload/v1795161639/3_t1nah6.jpg`,
      `${CDN}/image/upload/v1795161641/4_drygld.jpg`,
      `${CDN}/image/upload/v1795161643/5_pecpib.jpg`,
      `${CDN}/image/upload/v1795161643/6_wnghf3.jpg`,
      `${CDN}/image/upload/v1795161644/7_kz7ffb.jpg`,
    ],
  },

  // ── Digital Marketing ────────────────────────────────────────────
  {
    id: "digital-marketing-campaigns",
    name: "Digital Marketing Campaigns",
    serviceId: "marketing",
    category: "Campaign",
    type: "campaign",
    description: "Strategy-led digital marketing campaigns combining ad creative, content and smart targeting to connect brands with the right audience.",
    image: `${CDN}/image/upload/v1795161654/dm3_i1adhw.webp`,
    gallery: [
      `${CDN}/image/upload/v1795161652/dm1_q1vacp.webp`,
      `${CDN}/image/upload/v1795161653/dm2_pi0dpn.webp`,
      `${CDN}/image/upload/v1795161654/dm3_i1adhw.webp`,
      `${CDN}/image/upload/v1795161655/dm4_gqgqv8.webp`,
    ],
    videoUrl: `${CDN}/video/upload/v1795161604/Markexa_India_Social_Media_Marketing_Agency_2_ohhnwa.mp4`,
  },
];

/* ---- demonstration concepts (already labelled "Demo" on the home page) ---- */
const demoMap: Record<string, { serviceId: string; type: WorkType }> = {
  "obsidian-atlas": { serviceId: "brand", type: "identity" },
  "halcyon-field": { serviceId: "web", type: "website" },
  "meridian-ribbon": { serviceId: "motion", type: "video" },
  "north-hall": { serviceId: "app", type: "app" },
  "quiet-signal": { serviceId: "social", type: "campaign" },
  "liquid-index": { serviceId: "graphic", type: "poster" },
};
const demos: WorkItem[] = projects.filter((p) => demoMap[p.id]).map((p) => ({
  id: `demo-${p.id}`, name: p.name, serviceId: demoMap[p.id].serviceId, category: p.category, type: demoMap[p.id].type,
  description: p.blurb, status: "demo", art: p.art, hue: p.hue,
  details: [{ label: "Status", value: "Demonstration concept, not client work" }],
}));

/* ---- placeholder slots: clearly labelled, no links, no invented facts ---- */
const ph = (serviceId: string, type: WorkType, name: string, category: string, description: string, art: ArtVariant): WorkItem => ({
  id: `ph-${serviceId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, name, serviceId, category, type, description, status: "placeholder", art,
});
const placeholders: WorkItem[] = [
  ph("social", "social-profile", "Live Instagram profile", "Account link", "Link a social account Markexa manages, with its handle and a short note on the role we play.", "orb"),
  ph("social", "social-profile", "Second social profile", "Account link", "Add further live profiles (Instagram, LinkedIn, YouTube) as they are confirmed.", "rings"),
  ph("social", "post", "Post designs", "Creatives", "Feed posts and carousels designed for a real account.", "monolith"),
  ph("social", "post", "Carousel set", "Creatives", "A multi-slide content series, shown as designed.", "arches"),
  ph("social", "reel", "Reels and short video", "Video content", "Vertical video produced for a brand’s channels.", "ribbon"),
  ph("social", "reel", "Behind-the-scenes cut", "Video content", "Short-form edits that show a brand’s personality.", "liquid"),
  ph("social", "strategy", "Content strategy example", "Strategy", "A content pillar map or monthly plan, shared with permission.", "dunes"),

  ph("graphic", "identity", "Brand identity project", "Identity", "A full visual identity presented across its applications.", "orb"),
  ph("graphic", "logo", "Logo design", "Logo", "A logo and its variations, with construction notes.", "rings"),
  ph("graphic", "poster", "Poster or advertising creative", "Print & advertising", "A poster, flyer or ad created for a real campaign.", "liquid"),
  ph("graphic", "packaging", "Packaging and visual design", "Packaging", "Packaging, labels and supporting graphics.", "monolith"),
  ph("graphic", "poster", "Campaign graphics", "Campaign", "A set of creatives built from one visual idea.", "arches"),

  ph("marketing", "case-study", "Marketing campaign case study", "Case study", "Brief, idea, execution and outcome. Results are shown only when real data is supplied.", "rings"),
  ph("marketing", "ad", "Campaign creatives", "Advertising", "The ads and assets produced for a live campaign.", "ribbon"),
  ph("marketing", "campaign", "Advertising example", "Campaign", "A paid or organic activation with its channel plan.", "dunes"),

  ph("web", "website", "Live website", "Website", "A website built by Markexa, with its live link, a screenshot and the technologies used.", "arches"),
  ph("web", "website", "Second website project", "Website", "Add project description, screenshot and live URL in data/work.ts.", "monolith"),
  ph("web", "website", "Web experience", "Interactive", "An interactive or motion-led build.", "rings"),

  ph("app", "app", "Mobile application", "App", "An app Markexa developed, with screenshots, features and its store or live link.", "monolith"),
  ph("app", "app", "Second application", "App", "Add features and a store link when available.", "orb"),
  ph("app", "app", "Product prototype", "App design", "An interface prototype or product concept.", "arches"),

  ph("brand", "identity", "Identity system", "Identity", "A complete identity with logo, colour, type and guidelines.", "orb"),
  ph("brand", "logo", "Logo and mark", "Logo", "A logo with construction and usage notes.", "rings"),
  ph("brand", "identity", "Brand guidelines", "Guidelines", "A guidelines document showing how the system works.", "monolith"),

  ph("motion", "video", "Brand film", "Video", "A branded video or film produced by Markexa.", "ribbon"),
  ph("motion", "ad", "Advertising edit", "Ad edit", "A short advertising cut with its cutdowns.", "liquid"),
  ph("motion", "video", "Motion graphics", "Motion", "An animated logo, title sequence or explainer.", "rings"),
];

const rank = (i: WorkItem) => (i.status === undefined ? 0 : i.status === "demo" ? 1 : 2);
export const getWork = (serviceId: string) =>
  [...work, ...demos, ...placeholders].filter((i) => i.serviceId === serviceId).sort((a, b) => rank(a) - rank(b));
