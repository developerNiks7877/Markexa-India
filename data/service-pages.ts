/** Editorial content and presentation settings for each service page. Keys match ids in data/services.ts. */
export type Layout = "brand" | "web" | "app" | "poster" | "video" | "social" | "case";
export type ServicePage = {
  accent: string; layout: Layout; short: string; intro: string; description: string[];
  offers: { title: string; text: string }[]; approach: { title: string; text: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  brand: {
    accent: "#ff5a2c", layout: "brand", short: "your brand",
    intro: "Identities built as systems — a clear idea, a recognisable look and the rules to keep it consistent everywhere.",
    description: [
      "A brand is more than a logo. It is the decisions about who you are for, how you sound and what you stand for — expressed through a visual language people recognise in a second.",
      "We work from strategy to identity: positioning first, then marks, colour, typography and the guidelines that let your team apply it with confidence across every touchpoint.",
    ],
    offers: [
      { title: "Logo & Brand Identity", text: "Primary marks and variations designed to work from favicon to signage." },
      { title: "Brand Strategy", text: "Positioning, audience and tone of voice that give the visuals something meaningful to say." },
      { title: "Visual Systems", text: "Colour, type, layout and imagery rules that hold together across every touchpoint." },
      { title: "Brand Guidelines", text: "Clear documentation so anyone can apply the identity correctly." },
      { title: "Marketing Creatives", text: "Business and promotional designs that introduce and reinforce your brand well." },
    ],
    approach: [
      { title: "Immerse", text: "Interviews and research to understand the business, its audience and competitors." },
      { title: "Define", text: "Agree the idea, personality and the territory the brand will own." },
      { title: "Design", text: "Explore, refine and test the identity in real applications." },
      { title: "Document", text: "Hand over assets and guidelines, and support the rollout." },
    ],
  },
  web: {
    accent: "#7cc8ff", layout: "web", short: "your website",
    intro: "Modern, responsive websites — from business sites and landing pages to e-commerce and SEO-optimized digital experiences.",
    description: [
      "Your website is often the first and longest conversation a customer has with your brand. We design and build it so it communicates clearly, loads quickly and feels like you.",
      "From modern UI/UX design to responsive development, every project is built for performance, accessibility and long-term growth in an ever-evolving digital world.",
    ],
    offers: [
      { title: "Business Website Design", text: "Professional, modern websites that represent your brand and convert visitors." },
      { title: "UI / UX Design", text: "Page structure, flows and interfaces designed around real user goals." },
      { title: "Responsive Development", text: "Builds that adapt properly from phones to large screens." },
      { title: "E-Commerce Websites", text: "Online stores that make buying simple and customers come back." },
      { title: "Landing Page Design", text: "Focused pages that turn attention into action." },
      { title: "SEO-Optimized Websites", text: "Built from the ground up to perform in search and attract organic traffic." },
    ],
    approach: [
      { title: "Map", text: "Clarify goals, audience, content and the structure of the site." },
      { title: "Design", text: "Shape the look, layouts and interactions in browser-ready detail." },
      { title: "Build", text: "Develop, test across devices and tune performance." },
      { title: "Launch", text: "Go live, monitor and refine based on how people use it." },
    ],
  },
  app: {
    accent: "#c8ff3a", layout: "app", short: "your app",
    intro: "Mobile applications and digital products, from first prototype to store release and beyond.",
    description: [
      "Good apps feel obvious. We start with the problem and the people, design the smallest version that solves it well, then build and refine it with real feedback.",
      "Product thinking, interface design and development sit in one team, so decisions stay connected from the first sketch to the store listing.",
    ],
    offers: [
      { title: "Product Discovery", text: "Define the problem, the users and the first release scope." },
      { title: "UX & Interface Design", text: "Flows and screens designed for clarity on small displays." },
      { title: "iOS & Android Development", text: "Native or cross-platform builds, chosen to fit the product." },
      { title: "Prototyping & Testing", text: "Clickable prototypes and user testing before heavy development." },
      { title: "Store Submission", text: "Assets, listings and release support for the app stores." },
      { title: "Iteration", text: "Improvements after launch driven by real usage and feedback." },
    ],
    approach: [
      { title: "Discover", text: "Research the problem, audience and competitors thoroughly." },
      { title: "Prototype", text: "Test flows and ideas cheaply before building." },
      { title: "Build", text: "Develop in short cycles with regular working builds." },
      { title: "Release", text: "Ship to the stores, then keep improving." },
    ],
  },
  graphic: {
    accent: "#e8ecf0", layout: "poster", short: "your visuals",
    intro: "Marketing creatives, social media designs, promotional materials and visual assets that make a message impossible to scroll past.",
    description: [
      "Graphic design is where a brand meets the feed, the street and the shelf. We make visuals that are bold, clear and consistent with the identity they belong to.",
      "From a single social post to a full campaign set, every piece is built from a clear idea, strong composition and careful typography.",
    ],
    offers: [
      { title: "Marketing Creatives", text: "Visual sets built from one idea and adapted across formats." },
      { title: "Social Media Designs", text: "Feed posts, carousels and stories designed for your brand." },
      { title: "Business & Promotional Designs", text: "Flyers, brochures and promotional materials for every channel." },
      { title: "Logo & Mark Design", text: "Marks and lockups for projects that need a quick, strong identity." },
      { title: "Brand Visual Systems", text: "A consistent visual language applied across all your touchpoints." },
      { title: "Custom Graphic Design", text: "One-off creative assets tailored to specific needs." },
    ],
    approach: [
      { title: "Brief", text: "Agree the message, audience, formats and constraints." },
      { title: "Concept", text: "Explore directions and pick the strongest idea." },
      { title: "Craft", text: "Refine composition, type and detail until it's right." },
      { title: "Deliver", text: "Prepare production-ready files for every format needed." },
    ],
  },
  motion: {
    accent: "#ff4f8b", layout: "video", short: "your video",
    intro: "Social media reels, brand promotional videos, short-form content and motion graphics — paced and crafted to hold attention.",
    description: [
      "Video is where a brand can feel most alive. We shape footage, motion and sound into stories that fit the platform and the audience watching.",
      "Whether it's an Instagram reel, an animated logo or a full brand film, every edit is guided by one clear idea and a strong sense of rhythm.",
    ],
    offers: [
      { title: "Social Media Reels", text: "Vertical edits designed specifically for Instagram, YouTube and social platforms." },
      { title: "Brand Promotional Videos", text: "Brand films and campaign videos with a clear narrative and strong identity." },
      { title: "Short-Form Video Content", text: "Quick, punchy content that communicates your message fast." },
      { title: "Motion Graphics", text: "Animated graphics, titles and explainers that elevate any video." },
      { title: "Instagram Content", text: "Visual storytelling tailored for the Instagram audience and algorithm." },
      { title: "Finishing", text: "Colour grading, sound design and subtitling for a polished result." },
    ],
    approach: [
      { title: "Story", text: "Define the message, audience and format before anything else." },
      { title: "Board", text: "Plan shots, style and pacing before editing begins." },
      { title: "Edit", text: "Cut, animate, grade and sound-design with precision." },
      { title: "Deliver", text: "Export in the right formats for every platform needed." },
    ],
  },
  social: {
    accent: "#ffd23f", layout: "social", short: "your social presence",
    intro: "Content strategy, creative campaigns and community management that give your brand a consistent, recognisable voice on social media.",
    description: [
      "Social media rewards brands that show up with a point of view. We plan what to say, design how it looks and manage the conversation so your channels feel intentional.",
      "That covers strategy, post and carousel design, reels, community management and reporting — working as one connected system rather than isolated posts.",
    ],
    offers: [
      { title: "Content Strategy", text: "Pillars, formats and a calendar built around your goals and audience." },
      { title: "Instagram Content", text: "Feed posts, carousels and stories that make your profile recognisable." },
      { title: "Social Media Reels", text: "Short-form video designed for the platforms and the people on them." },
      { title: "Community Management", text: "Replying, listening and keeping the conversation healthy and engaged." },
      { title: "Campaign Planning", text: "Launches and activations tied directly to your business objectives." },
      { title: "Reporting", text: "Clear reviews of what worked, what to change and what comes next." },
    ],
    approach: [
      { title: "Audit", text: "Review the channels, audience and competitors thoroughly." },
      { title: "Plan", text: "Set the content strategy, voice and publishing calendar." },
      { title: "Create", text: "Design, produce and schedule the content." },
      { title: "Grow", text: "Manage, measure and refine every month." },
    ],
  },
  marketing: {
    accent: "#3dffc0", layout: "case", short: "your marketing",
    intro: "Digital strategy and campaigns where a clear idea, strong creative and honest measurement work together to grow your brand.",
    description: [
      "Marketing works best when strategy, creative and channel planning are built together. We shape the idea first, then the assets and the plan that carry it to the right people.",
      "We believe in measuring what matters. Where real results exist we show them — where they don't, we say so. Transparency is part of how we work.",
    ],
    offers: [
      { title: "Digital Strategy", text: "Goals, audience and channel plan that match your business objectives." },
      { title: "Campaign Concepts", text: "A single idea that stretches coherently across every format." },
      { title: "Advertising Creative", text: "Static, video and motion ads produced in-house by one team." },
      { title: "Paid & Organic Planning", text: "A balanced plan across channels and budgets." },
      { title: "Landing Pages", text: "Focused pages that turn advertising attention into action." },
      { title: "Measurement & Reporting", text: "Clear dashboards and honest, actionable reviews." },
    ],
    approach: [
      { title: "Understand", text: "Clarify goals, audience and the current market position." },
      { title: "Strategise", text: "Choose the idea, channels and measures of success." },
      { title: "Produce", text: "Create the assets and launch the campaign." },
      { title: "Review", text: "Measure, learn and optimise continuously." },
    ],
  },
};
