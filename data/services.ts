import type { ArtVariant } from "@/components/effects/ProceduralArt";
export type Service = { id: string; title: string; blurb: string; items: string[]; art: ArtVariant; hue: string };

export const services: Service[] = [
  {
    id: "brand",
    title: "Brand Identity",
    blurb: "Logo design, brand visual systems, and identity development that make your brand impossible to forget.",
    items: ["Logo & Marks", "Visual Systems", "Brand Strategy", "Guidelines"],
    art: "orb",
    hue: "#d4501e",
  },
  {
    id: "web",
    title: "Web Design & Development",
    blurb: "Modern, responsive websites — from business sites and landing pages to full e-commerce and SEO-optimized experiences.",
    items: ["UI / UX Design", "Responsive Development", "E-Commerce", "SEO-Optimized"],
    art: "arches",
    hue: "#e8923a",
  },
  {
    id: "app",
    title: "App Development",
    blurb: "Mobile applications and digital products built from first prototype to store release and beyond.",
    items: ["Product Design", "iOS & Android", "Prototyping", "Store Release"],
    art: "monolith",
    hue: "#9db4c8",
  },
  {
    id: "graphic",
    title: "Graphic Design",
    blurb: "Marketing creatives, social media designs, promotional materials and visual content that stops the scroll.",
    items: ["Marketing Creatives", "Social Designs", "Promotional Materials", "Custom Graphics"],
    art: "liquid",
    hue: "#c9ccd1",
  },
  {
    id: "motion",
    title: "Video Editing & Motion",
    blurb: "Social media reels, brand promotional videos, short-form content and motion graphics paced to hold attention.",
    items: ["Social Media Reels", "Brand Videos", "Short-Form Content", "Motion Graphics"],
    art: "ribbon",
    hue: "#d4501e",
  },
  {
    id: "social",
    title: "Social Media Marketing",
    blurb: "Content strategy, creative campaigns, Instagram management and social growth that give your brand a consistent, recognisable voice.",
    items: ["Content Strategy", "Instagram Management", "Campaigns", "Community Growth"],
    art: "dunes",
    hue: "#b87333",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    blurb: "Strategy, campaign concepts and advertising creative — combining smart ideas with honest measurement to connect brands with the right audience.",
    items: ["Digital Strategy", "Ad Creative", "Campaigns", "Reporting"],
    art: "rings",
    hue: "#3dffc0",
  },
];

export const process = [
  { n: "01", title: "Discover", text: "Understanding your business, audience and objectives — asking the right questions first." },
  { n: "02", title: "Strategize", text: "Building the creative and technical direction tailored to your brand and goals." },
  { n: "03", title: "Create", text: "Designing, developing and producing the experience with quality and precision." },
  { n: "04", title: "Launch", text: "Delivering, refining and supporting the final product for long-term growth." },
];

export const partners = [
  "SAGA", "RKS", "PLUMERIA", "OLIVE COURT", "LEGACY", "LAXMI LIGHTINGS",
  "KUBERGARH", "HAPPY PILLS", "GARMENT GURU", "EPICO SOLUTIONS", "ZOSTEL", "TED X",
];
