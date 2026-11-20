/** Editorial content and presentation settings for each service page. Keys match ids in data/services.ts. */
export type Layout = "brand" | "web" | "app" | "poster" | "video" | "social" | "case";
export type ServicePage = {
  accent: string; layout: Layout; short: string; intro: string; description: string[];
  offers: { title: string; text: string }[]; approach: { title: string; text: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  brand: {
    accent: "#ff5a2c", layout: "brand", short: "your brand",
    intro: "Identities built as systems: a clear idea, a recognisable look and the rules to keep it consistent everywhere.",
    description: [
      "A brand is more than a logo. It is the decisions about who you are for, how you sound and what you will never do, expressed through a visual language people can recognise in a second.",
      "We work from strategy to identity: positioning first, then marks, colour, typography and the guidelines that let your team apply it with confidence.",
    ],
    offers: [
      { title: "Brand strategy", text: "Positioning, audience and tone of voice that give the visuals something to say." },
      { title: "Logo and marks", text: "Primary marks and variations designed to work from favicon to signage." },
      { title: "Visual systems", text: "Colour, type, layout and imagery rules that hold together across touchpoints." },
      { title: "Brand guidelines", text: "Clear documentation so anyone can apply the identity correctly." },
      { title: "Launch collateral", text: "Stationery, social kits and templates to introduce the brand well." },
    ],
    approach: [
      { title: "Immerse", text: "Interviews and research to understand the business and its audience." },
      { title: "Define", text: "Agree the idea, personality and the territory the brand will own." },
      { title: "Design", text: "Explore, refine and test the identity in real applications." },
      { title: "Document", text: "Hand over assets and guidelines, and support the rollout." },
    ],
  },
  web: {
    accent: "#7cc8ff", layout: "web", short: "your website",
    intro: "Responsive, fast and carefully designed websites, from clear marketing sites to interactive, motion-led experiences.",
    description: [
      "Your website is often the first and longest conversation a customer has with you. We design and build it so it communicates clearly, loads quickly and feels like your brand.",
      "Design and development happen together, which keeps ideas buildable and lets us add motion and interaction where it earns its place.",
    ],
    offers: [
      { title: "UI and UX design", text: "Page structure, flows and interfaces designed around real user goals." },
      { title: "Responsive development", text: "Modern builds that adapt properly from phones to large screens." },
      { title: "Interaction and motion", text: "Considered animation and interactive moments that support the content." },
      { title: "Performance and accessibility", text: "Fast loading, keyboard-friendly, readable and inclusive by default." },
      { title: "Content management", text: "Setups that let your team update content without developers." },
      { title: "Launch and handover", text: "Testing, deployment and documentation, with support after go-live." },
    ],
    approach: [
      { title: "Map", text: "Clarify goals, audience, content and the structure of the site." },
      { title: "Design", text: "Shape the look, layouts and interactions in the browser-ready detail." },
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
      { title: "Product discovery", text: "Define the problem, the users and the first release scope." },
      { title: "UX and interface design", text: "Flows and screens designed for clarity on small displays." },
      { title: "iOS and Android development", text: "Native or cross-platform builds, chosen to fit the product." },
      { title: "Prototyping and testing", text: "Clickable prototypes and user testing before heavy development." },
      { title: "Store submission", text: "Assets, listings and release support for the app stores." },
      { title: "Iteration", text: "Improvements after launch driven by real usage." },
    ],
    approach: [
      { title: "Discover", text: "Research the problem, audience and competitors." },
      { title: "Prototype", text: "Test flows and ideas cheaply before building." },
      { title: "Build", text: "Develop in short cycles with regular working builds." },
      { title: "Release", text: "Ship to the stores, then keep improving." },
    ],
  },
  graphic: {
    accent: "#e8ecf0", layout: "poster", short: "your visuals",
    intro: "Campaign graphics, posters, packaging and creative assets that make a message impossible to scroll past.",
    description: [
      "Graphic design is where a brand meets the street, the shelf and the feed. We make visuals that are bold, clear and consistent with the identity they belong to.",
      "From a single poster to a full campaign set, every piece is built from a clear idea, strong composition and careful typography.",
    ],
    offers: [
      { title: "Campaign creatives", text: "Visual sets built from one idea and adapted across formats." },
      { title: "Posters and print", text: "Posters, flyers, brochures and large-format work." },
      { title: "Logo and mark design", text: "Marks and lockups for projects that need a quick, strong identity." },
      { title: "Packaging", text: "Packaging and label design that works on shelf and online." },
      { title: "Social and digital assets", text: "Banners, ads and templates for everyday communication." },
    ],
    approach: [
      { title: "Brief", text: "Agree the message, audience, formats and constraints." },
      { title: "Concept", text: "Explore directions and pick the strongest idea." },
      { title: "Craft", text: "Refine composition, type and detail." },
      { title: "Deliver", text: "Prepare production-ready files for print and digital." },
    ],
  },
  motion: {
    accent: "#ff4f8b", layout: "video", short: "your video",
    intro: "Advertising edits, motion graphics and branded video, paced and graded to hold attention.",
    description: [
      "Video is where a brand can feel most alive. We shape footage, motion and sound into stories that fit the platform and the audience watching.",
      "Whether it is a thirty-second ad, an animated logo or a longer brand film, the edit is guided by one clear idea and a strong sense of rhythm.",
    ],
    offers: [
      { title: "Advertising edits", text: "Short, punchy cuts and cutdowns for different channels." },
      { title: "Motion graphics", text: "Animated graphics, titles and explainers." },
      { title: "Branded videos", text: "Brand films and campaign videos with a clear narrative." },
      { title: "Reels and short-form", text: "Vertical edits designed for social platforms." },
      { title: "Finishing", text: "Colour, sound and subtitling for a polished result." },
    ],
    approach: [
      { title: "Story", text: "Define the message, audience and format." },
      { title: "Board", text: "Plan shots, style and pacing before editing." },
      { title: "Edit", text: "Cut, animate, grade and sound-design." },
      { title: "Deliver", text: "Export in the right formats for every platform." },
    ],
  },
  social: {
    accent: "#ffd23f", layout: "social", short: "your social presence",
    intro: "Content strategy, creative campaigns and day-to-day management that give a brand a consistent, recognisable voice on social.",
    description: [
      "Social media rewards brands that show up with a point of view. We plan what to say, design how it looks and manage the conversation so your channels feel intentional.",
      "That covers strategy, post and carousel design, reels, community management and reporting, working as one connected system rather than isolated posts.",
    ],
    offers: [
      { title: "Content strategy", text: "Pillars, formats and a calendar built around your goals." },
      { title: "Post and carousel design", text: "A visual system that makes your feed recognisable." },
      { title: "Reels and short video", text: "Vertical video designed for the platforms." },
      { title: "Community management", text: "Replying, listening and keeping the conversation healthy." },
      { title: "Campaign planning", text: "Launches and activations tied to business objectives." },
      { title: "Reporting", text: "Clear reviews of what worked and what to change." },
    ],
    approach: [
      { title: "Audit", text: "Review the channels, audience and competitors." },
      { title: "Plan", text: "Set the content strategy, voice and calendar." },
      { title: "Create", text: "Design, shoot and schedule the content." },
      { title: "Grow", text: "Manage, measure and refine every month." },
    ],
  },
  marketing: {
    accent: "#3dffc0", layout: "case", short: "your marketing",
    intro: "Digital strategy and campaigns where a clear idea, strong creative and honest measurement work together.",
    description: [
      "Marketing works best when strategy, creative and channel planning are built together. We shape the idea first, then the assets and the plan that carry it to the right people.",
      "We believe in measuring what matters. Where real results exist we show them; where they do not, we say so.",
    ],
    offers: [
      { title: "Digital strategy", text: "Goals, audience and channel plan that match your business." },
      { title: "Campaign concepts", text: "A single idea that stretches across formats." },
      { title: "Advertising creative", text: "Static, video and motion ads produced in-house." },
      { title: "Paid and organic planning", text: "A balanced plan across channels and budgets." },
      { title: "Landing pages", text: "Focused pages that turn attention into action." },
      { title: "Measurement and reporting", text: "Clear dashboards and honest reviews." },
    ],
    approach: [
      { title: "Understand", text: "Clarify goals, audience and the current position." },
      { title: "Strategise", text: "Choose the idea, channels and measures of success." },
      { title: "Produce", text: "Create the assets and launch the campaign." },
      { title: "Review", text: "Measure, learn and optimise." },
    ],
  },
};
