/**
 * MEDIA SLOTS — the only file you edit to swap temporary visuals for final assets.
 * Put files in /public and reference them by absolute path (e.g. "/videos/hero.mp4").
 * Leave a value as `null` to keep the built-in procedural artwork.
 */
export type HeroVideo = { 
                    mp4: string;
                    webm?: string;
                    mobileMp4?: string;
                    poster?: string
                     };

export const media = {

 logo:"/images/logo.webp",
  
  //  Hero brand film. Muted, looping, playsInline. e.g. { mp4: "/videos/hero.mp4", poster: "/images/hero-poster.jpg" } 
  heroVideo: {
    mp4:"/videos/hero.mp4",
  } as HeroVideo ,
  /** Per-project image override, keyed by project id (see data/projects.ts). e.g. { "obsidian-atlas": "/images/work/atlas.jpg" } */
  projectImages: {} as Record<string, string>,
  /** Team portraits keyed by member id (see data/team.ts). e.g. { "member-1": "/images/team/one.jpg" } */
  teamImages: {
    member1: "/images/Team/MarkexaTeam(1).webp",
    member2: "/images/Team/MarkexaTeam(2).webp",
    member3: "/images/Team/MarkexaTeam(3).webp",
    member4: "/images/Team/MarkexaTeam(4).webp",
    member5: "/images/Team/MarkexaTeam(5).webp",

  } as Record<string, string>,
  /** About / service / footer image overrides. */


  aboutImage: "/images/aboutmain.png",
    aboutValues: {
    curiosity: "/images/about/curiosity.webp",
    creativity: "/images/about/creativity.webp",
    precision: "/images/about/precision.webp",
    innovation: "/images/about/innovation.webp",
    collaboration: "/images/about/collaboration.webp",
    ambition: "/images/about/ambition.webp",
  },
  serviceImages: {
    brand: "/images/servicescarousel/brandidentity.webp",
    web: "/images/servicescarousel/website.webp",
    app: "/images/servicescarousel/appdev.webp",
    graphic:"/images/servicescarousel/graphicdesigning.webp",
    motion: "/images/servicescarousel/videoediting.webp",
    social: "/images/servicescarousel/SMM.webp",
    marketing:"/images/servicescarousel/digitalmarketing.webp"

  } as Record<string, string>,
};
