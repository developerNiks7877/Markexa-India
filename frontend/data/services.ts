import type { ArtVariant } from "@/components/effects/ProceduralArt";
export type Service = { id: string; title: string; blurb: string; items: string[]; art: ArtVariant; hue: string };
export const services: Service[] = [
  { id: "brand", title: "Brand Identity", blurb: "Logo design, visual systems, brand strategy and identity development.", items: ["Strategy", "Logo & marks", "Visual systems", "Guidelines"], art: "orb", hue: "#d4501e" },
  { id: "web", title: "Web Design & Development", blurb: "Modern, responsive websites, interactive interfaces and digital experiences.", items: ["UI / UX", "Next.js builds", "Interaction", "CMS"], art: "arches", hue: "#e8923a" },
  { id: "app", title: "App Development", blurb: "Mobile applications and digital products, from first prototype to store release.", items: ["Product design", "iOS & Android", "Prototyping", "Release"], art: "monolith", hue: "#9db4c8" },
  { id: "graphic", title: "Graphic Design", blurb: "Campaign graphics, creative assets and visual communication.", items: ["Campaigns", "Print", "Packaging", "Social assets"], art: "liquid", hue: "#c9ccd1" },
  { id: "motion", title: "Video Editing & Motion", blurb: "Visual storytelling, advertising edits, motion graphics and branded videos.", items: ["Ad edits", "Motion graphics", "Brand films", "Reels"], art: "ribbon", hue: "#d4501e" },
  { id: "social", title: "Social Media Marketing", blurb: "Content strategy, creative campaigns, digital communication and social growth.", items: ["Content strategy", "Campaigns", "Community", "Reporting"], art: "dunes", hue: "#b87333" },
  { id: "marketing", title: "Digital Marketing", blurb: "Strategy, campaign concepts and advertising creative that connect brands with the right audience.", items: ["Strategy", "Campaigns", "Ad creative", "Reporting"], art: "rings", hue: "#3dffc0" },
];
export const process = [
  { n: "01", title: "Discover", text: "Understanding the business, audience and objectives." },
  { n: "02", title: "Strategize", text: "Building the creative and technical direction." },
  { n: "03", title: "Create", text: "Designing, developing and producing the experience." },
  { n: "04", title: "Launch", text: "Delivering and refining the final product." },
];
export const partners = ["Partner logo 01", "Partner logo 02", "Partner logo 03", "Partner logo 04", "Partner logo 05", "Partner logo 06"];
