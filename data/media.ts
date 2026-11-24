/**
 * MEDIA SLOTS — the only file you edit to swap temporary visuals for final assets.
 * All images/videos served from Cloudinary CDN.
 * Leave a value as `null` to keep the built-in procedural artwork.
 */
export type HeroVideo = { 
  mp4: string;
  webm?: string;
  mobileMp4?: string;
  poster?: string;
};

const CDN = "https://res.cloudinary.com/ebboxhoj";

export const media = {

  logo: "/images/logo.webp",

  // Hero brand film — portrait/vertical format, muted, looping, playsInline
  heroVideo: {
    mp4: `${CDN}/video/upload/v1789450167/HOME-HERO-SECTION-COMPRESSED/PORTRAIT_uenn2i.mp4`,
  } as HeroVideo,

  /** Per-project image override, keyed by project id (see data/work.ts). */
  projectImages: {} as Record<string, string>,

  /** Team portraits keyed by member id (see data/team.ts). */
  teamImages: {
    member1: "/images/Team/MarkexaTeam(1).webp",
    member2: "/images/Team/MarkexaTeam(2).webp",
    member3: "/images/Team/MarkexaTeam(3).webp",
    member4: "/images/Team/MarkexaTeam(4).webp",
    member5: "/images/Team/MarkexaTeam(5).webp",
  } as Record<string, string>,

  /** About / studio workspace images */
  aboutImage: "/images/aboutmain.png",
  aboutValues: {
    curiosity:     "/images/about/curiosity.webp",
    creativity:    "/images/about/creativity.webp",
    precision:     "/images/about/precision.webp",
    innovation:    "/images/about/innovation.webp",
    collaboration: "/images/about/collaboration.webp",
    ambition:      "/images/about/ambition.webp",
  },

  /** Studio / workspace atmosphere images (used in About or gallery) */
  studioImages: [
    `${CDN}/image/upload/v1795161607/Modern_Creative_Studio_Workspace-1_l52tsc.webp`,
    `${CDN}/image/upload/v1795161605/Markexa_s_Modern_Creative_Workspace-3_wm6ts8.webp`,
    `${CDN}/image/upload/v1795161610/Moody_Modern_Creative_Studio-2_mj8siu.webp`,
    `${CDN}/image/upload/v1795161609/Moody_Creative_Studio_Workspace-4_zkwfwk.webp`,
  ],

  /** Service panel images — shown in the expanding service accordion */
  serviceImages: {
    brand:     `${CDN}/image/upload/v1795161648/brand2_oyiwam.webp`,
    web:       "/images/servicescarousel/website.webp",
    app:       "/images/servicescarousel/appdev.webp",
    graphic:   "/images/servicescarousel/graphicdesigning.webp",
    motion:    `${CDN}/image/upload/v1795161605/videoediting1_emn7g9.webp`,
    social:    `${CDN}/image/upload/v1795161652/dm1_q1vacp.webp`,
    marketing: `${CDN}/image/upload/v1795161653/dm2_pi0dpn.webp`,
  } as Record<string, string>,

  /** Brand identity gallery (used in /services/brand page) */
  brandGallery: [
    `${CDN}/image/upload/v1795161647/brand1_gjrzor.webp`,
    `${CDN}/image/upload/v1795161648/brand2_oyiwam.webp`,
    `${CDN}/image/upload/v1795161649/brand3_iezvx0.webp`,
    `${CDN}/image/upload/v1795161650/brand4_fmatix.webp`,
    `${CDN}/image/upload/v1795161651/brand5_pz3pwd.webp`,
  ],

  /** Video editing / motion gallery (used in /services/motion page) */
  motionGallery: [
    `${CDN}/image/upload/v1795161604/videoediting1_emn7g9.webp`,
    `${CDN}/image/upload/v1795161605/videoediting2_tfq9x5.webp`,
    `${CDN}/image/upload/v1795161605/videoediting3_bnthwd.webp`,
    `${CDN}/image/upload/v1795161605/videoediting4_nsqfxe.png`,
  ],

  /** Social media marketing videos */
  socialVideos: [
    `${CDN}/video/upload/v1795161614/Markexa_India_Social_Media_Marketing_Agency_1_y3l6w0.mp4`,
    `${CDN}/video/upload/v1795161609/Markexa_India_Social_Media_Marketing_Agency_hriblx.mp4`,
    `${CDN}/video/upload/v1795161604/Markexa_India_Social_Media_Marketing_Agency_2_ohhnwa.mp4`,
    `${CDN}/video/upload/v1795161604/Markexa_India_Social_Media_Marketing_Agency_4_ok93zp.mp4`,
    `${CDN}/video/upload/v1795161603/Markexa_India_Social_Media_Marketing_Agency_3_mrd8x7.mp4`,
  ],

  /** Digital marketing images */
  dmImages: [
    `${CDN}/image/upload/v1795161652/dm1_q1vacp.webp`,
    `${CDN}/image/upload/v1795161653/dm2_pi0dpn.webp`,
    `${CDN}/image/upload/v1795161654/dm3_i1adhw.webp`,
    `${CDN}/image/upload/v1795161655/dm4_gqgqv8.webp`,
  ],

  /** Client / partner logo URLs keyed by client name */
  partnerLogos: {
    ZOSTEL:               `${CDN}/image/upload/v1795161636/ZOSTEL_qetrtm.png`,
    UPL:                  `${CDN}/image/upload/v1795161635/UPL_qgspfs.png`,
    TREK:                 `${CDN}/image/upload/v1795161634/TREK_kjvib0.png`,
    TED_X:                `${CDN}/image/upload/v1795161634/TED_X_hqquiy.png`,
    TBT:                  `${CDN}/image/upload/v1795161633/TBT_qb6dnb.png`,
    SWAROOP:              `${CDN}/image/upload/v1795161631/SWAROOP_gptd8a.png`,
    SAGA:                 `${CDN}/image/upload/v1795161630/SAGA_x0ipby.png`,
    SAGA_JAWAI:           `${CDN}/image/upload/v1795161630/SAGA_JAWAI_jb3lcr.png`,
    RKS:                  `${CDN}/image/upload/v1795161628/RKS_vynuwy.png`,
    PLUMERIA:             `${CDN}/image/upload/v1795161627/PLUMERIA_gstw3d.png`,
    OLIVE_COURT:          `${CDN}/image/upload/v1795161626/OLIVE_COURT_pn5qr0.png`,
    LEGACY:               `${CDN}/image/upload/v1795161625/LEGACY_sdhnfx.png`,
    LAXMI_LIGHTINGS:      `${CDN}/image/upload/v1795161624/LAXMI_LIGHTINGS_t6bcrf.png`,
    KUBERGARH:            `${CDN}/image/upload/v1795161623/KUBERGARH_gwznx3.png`,
    KREQ:                 `${CDN}/image/upload/v1795161622/KREQ_knula9.png`,
    HAPPY_PILLS:          `${CDN}/image/upload/v1795161621/HAPPY_PILLS_mjr8zk.png`,
    GURU_KALA:            `${CDN}/image/upload/v1795161620/GURU_KALA_WORDMARK_PNG_bgngli.png`,
    GARMENT_GURU:         `${CDN}/image/upload/v1795161619/GARMENT_GURU_t1cker.png`,
    EPICO_SOLUTIONS:      `${CDN}/image/upload/v1795161618/EPICO_SOLUTIONS_zofniv.png`,
    DHARTI:               `${CDN}/image/upload/v1795161617/DHARTI_dmckj6.png`,
    DHANUSH_FIREWORKS:    `${CDN}/image/upload/v1795161616/DHANUSH_FIREWORKS_ziivat.png`,
    CROWN_CREST:          `${CDN}/image/upload/v1795161616/CROWN_CREST_zpuvxp.png`,
    COLD_SWEAT_BAND:      `${CDN}/image/upload/v1795161613/COLD_SWEAT_MIDNIGHT_BAND_pc0mng.png`,
    CAFE_LEAF:            `${CDN}/image/upload/v1795161612/CAFE_LEAF_qk0fth.png`,
    BEAGLES:              `${CDN}/image/upload/v1795161611/BEAGLES_kdr5ic.png`,
    BLAC_EYE:             `${CDN}/image/upload/v1795161611/BLAC_EYE_idfvm0.png`,
  } as Record<string, string>,
};
