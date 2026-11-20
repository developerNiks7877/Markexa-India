
export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean };

export const categories = [
  "All",
  "Web Development",
  "Design",
  "Digital Marketing",
  "Technology",
  "SEO",
  "Branding",
  "Business",
] as const;

export type Category = (typeof categories)[number];

export type Article = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  date?: string;
  accent: string;
  image: string;
  excerpt: string;
  intro: string;
  blocks: Block[];
  sample?: boolean;
};

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const articles: Article[] = [
  {
    slug: "how-a-professional-website-helps-your-business-grow",
    title: "How a Professional Website Helps Your Business Grow",
    category: "Web Development",
    accent: "#c8ff3a",
    image: pexels(3184465),
    excerpt:
      "Discover how a professional website can help your business build trust, attract customers, and grow online.",
    intro:
      "A professional website is one of the most important digital assets a modern business can have. It gives customers a place to discover your services, understand your business and connect with you.",
    blocks: [
      { type: "h2", text: "Build Trust With Your Audience" },
      {
        type: "p",
        text: "Your website is often the first place where potential customers interact with your business. A clean, professional and well-organised website creates a stronger first impression and helps visitors feel confident about your brand.",
      },
      {
        type: "p",
        text: "Unlike a physical store, a website allows people to discover your business at any time. Visitors can explore your services, learn about your work and contact your team from wherever they are.",
      },
      {
        type: "quote",
        text: "A great website is the digital face of your business.",
      },
      { type: "h2", text: "Improve Customer Experience" },
      {
        type: "p",
        text: "A well-designed website makes information easy to find. Clear navigation, readable content and responsive layouts help visitors move through your website without confusion.",
      },
      {
        type: "list",
        items: [
          "Make your services easy to understand.",
          "Provide clear contact information.",
          "Create a consistent experience across devices.",
          "Help visitors take the next step with clear calls to action.",
        ],
      },
    ],
  },

  {
    slug: "why-website-performance-matters-for-modern-businesses",
    title: "Why Website Performance Matters for Modern Businesses",
    category: "Web Development",
    accent: "#7cc8ff",
    image: pexels(3520679),
    excerpt:
      "Learn why website speed and performance are important for creating better user experiences.",
    intro:
      "Website performance directly affects how users interact with a website. Speed, responsiveness and stability all contribute to the experience visitors have with your business.",
    blocks: [
      { type: "h2", text: "Why Speed Matters" },
      {
        type: "p",
        text: "People expect websites to load quickly and respond smoothly. Slow pages can frustrate visitors and make them leave before discovering what your business offers.",
      },
      {
        type: "p",
        text: "Large images, unnecessary scripts and unoptimised videos can increase loading times. Optimising media and reducing unnecessary resources helps create a smoother experience.",
      },
      {
        type: "quote",
        text: "Performance is part of the user experience.",
      },
      { type: "h2", text: "Use Modern Technologies" },
      {
        type: "p",
        text: "Modern development frameworks and a carefully planned website architecture can help improve performance. Choosing suitable technologies makes it easier to build responsive and maintainable digital experiences.",
      },
      {
        type: "list",
        items: [
          "Optimise images and media.",
          "Reduce unnecessary JavaScript.",
          "Use efficient caching strategies.",
          "Test performance on mobile devices.",
        ],
      },
    ],
  },

  {
    slug: "choosing-the-right-technology-for-your-web-project",
    title: "Choosing the Right Technology for Your Web Project",
    category: "Web Development",
    accent: "#b69cff",
    image: pexels(1181675),
    excerpt:
      "A practical guide to choosing the right technologies for websites and web applications.",
    intro:
      "Choosing the right technology is an important decision when developing a website or application. The right tools depend on the project's goals, complexity and long-term requirements.",
    blocks: [
      { type: "h2", text: "Understand Your Requirements" },
      {
        type: "p",
        text: "Before selecting a technology, understand what the product needs to accomplish. Different projects require different technical solutions, so begin with functionality, users and business objectives.",
      },
      {
        type: "p",
        text: "Frontend technologies determine how people interact with a website. React and Next.js are useful choices for building modern interfaces and web experiences.",
      },
      {
        type: "quote",
        text: "Choose technology based on the problem, not the trend.",
      },
      { type: "h2", text: "Backend and Database" },
      {
        type: "p",
        text: "The backend handles APIs, business logic, authentication and data management. Technologies such as Node.js and different database systems can be selected according to the requirements of the project.",
      },
      {
        type: "list",
        items: [
          "Understand the project's complexity.",
          "Consider scalability and maintenance.",
          "Evaluate security requirements.",
          "Choose tools that fit the development team's expertise.",
        ],
      },
    ],
  },

  {
    slug: "the-importance-of-good-ui-ux-design",
    title: "The Importance of Good UI UX Design",
    category: "Design",
    accent: "#ff8eaa",
    image: pexels(196644),
    excerpt:
      "Explore how thoughtful UI UX design can create better experiences for users.",
    intro:
      "Good design is about creating an experience that is simple, useful, accessible and enjoyable. A well-designed interface helps people understand a product and accomplish their goals.",
    blocks: [
      { type: "h2", text: "Design With the User in Mind" },
      {
        type: "p",
        text: "Understanding users is an important part of UX design. Decisions should be guided by user needs, expectations and behaviour rather than visual trends alone.",
      },
      {
        type: "p",
        text: "A simple interface makes navigation easier. Removing unnecessary elements and organising information clearly helps people understand where to go next.",
      },
      {
        type: "quote",
        text: "Good design makes complicated things feel simple.",
      },
      { type: "h2", text: "Consistency Builds Better Experiences" },
      {
        type: "p",
        text: "Consistent typography, spacing, colours and components make interfaces easier to understand. A reusable design system also helps teams maintain a consistent experience as a website grows.",
      },
      {
        type: "list",
        items: [
          "Prioritise clear navigation.",
          "Make important actions easy to find.",
          "Maintain consistent visual patterns.",
          "Design for accessibility and different screen sizes.",
        ],
      },
    ],
  },

  {
    slug: "how-color-psychology-influences-brand-design",
    title: "How Color Psychology Influences Brand Design",
    category: "Design",
    accent: "#ffe14a",
    image: pexels(1109541),
    excerpt:
      "Understand how colors influence perception, emotions, and brand identity.",
    intro:
      "Color is one of the most recognisable parts of a brand identity. The colours a business chooses can influence how people perceive its personality and communicate its positioning.",
    blocks: [
      { type: "h2", text: "Why Colors Matter" },
      {
        type: "p",
        text: "Colours can create emotional associations and influence how people interpret a brand. Businesses use carefully selected palettes across logos, websites and marketing materials.",
      },
      {
        type: "p",
        text: "Different businesses need different visual personalities. A colour palette should support the brand's positioning and make sense for its audience.",
      },
      {
        type: "quote",
        text: "Color is one of the first things people notice about a brand.",
      },
      { type: "h2", text: "Maintain Visual Consistency" },
      {
        type: "p",
        text: "A consistent palette creates a recognisable identity. Applying the same visual principles across digital and physical touchpoints makes a brand easier to remember.",
      },
      {
        type: "list",
        items: [
          "Choose colours that support your brand personality.",
          "Create a primary and secondary palette.",
          "Maintain sufficient text contrast.",
          "Use colours consistently across platforms.",
        ],
      },
    ],
  },

  {
    slug: "designing-responsive-websites-for-every-screen",
    title: "Designing Responsive Websites for Every Screen",
    category: "Design",
    accent: "#7cc8ff",
    image: pexels(404280),
    excerpt:
      "Learn the fundamentals of responsive design and how to create websites for every device.",
    intro:
      "Responsive design allows websites to adapt to phones, tablets, laptops and desktop screens. A flexible layout helps people access content comfortably on different devices.",
    blocks: [
      { type: "h2", text: "Design for Mobile First" },
      {
        type: "p",
        text: "Starting with smaller screens encourages designers to prioritise essential content and functionality. The layout can then expand naturally for larger screens.",
      },
      {
        type: "p",
        text: "Flexible grids and reusable components allow content to adapt instead of relying on fixed dimensions that may not work everywhere.",
      },
      {
        type: "quote",
        text: "Design once, adapt everywhere.",
      },
      { type: "h2", text: "Test Across Devices" },
      {
        type: "p",
        text: "A responsive website should be tested across different screen sizes. Testing helps identify layout problems and ensures that navigation and content remain accessible.",
      },
      {
        type: "list",
        items: [
          "Use flexible layouts.",
          "Make images responsive.",
          "Test navigation on touchscreens.",
          "Check typography on smaller displays.",
        ],
      },
    ],
  },

  {
    slug: "why-modern-businesses-need-digital-marketing",
    title: "Why Modern Businesses Need Digital Marketing",
    category: "Digital Marketing",
    accent: "#ff8eaa",
    image: pexels(905163),
    excerpt:
      "Learn how digital marketing can help businesses reach their audience and grow online.",
    intro:
      "Digital marketing gives businesses different ways to connect with their audience. It helps brands build visibility, communicate their value and reach potential customers online.",
    blocks: [
      { type: "h2", text: "Reach the Right Audience" },
      {
        type: "p",
        text: "Digital marketing allows businesses to reach specific groups of people through relevant campaigns. Understanding the audience helps make marketing messages more useful and effective.",
      },
      {
        type: "p",
        text: "A strong online presence helps customers discover a business. Websites, search engines and social media can work together to strengthen brand visibility.",
      },
      {
        type: "quote",
        text: "Marketing connects a business with the people who need it.",
      },
      { type: "h2", text: "Measure Your Results" },
      {
        type: "p",
        text: "Digital platforms provide useful performance information. Businesses can evaluate traffic, engagement, leads and conversions to understand how their campaigns are performing.",
      },
      {
        type: "list",
        items: [
          "Define clear campaign objectives.",
          "Understand your target audience.",
          "Choose suitable marketing channels.",
          "Measure results and improve your strategy.",
        ],
      },
    ],
  },

  {
    slug: "social-media-strategies-that-help-brands-grow",
    title: "Social Media Strategies That Help Brands Grow",
    category: "Digital Marketing",
    accent: "#ff4f8b",
    image: pexels(267389),
    excerpt:
      "Discover practical social media strategies businesses can use to build their audience.",
    intro:
      "Social media has become an important channel for businesses to communicate with customers. A clear strategy helps brands create relevant content and build meaningful relationships.",
    blocks: [
      { type: "h2", text: "Know Your Audience" },
      {
        type: "p",
        text: "Understanding your audience helps you create content that feels relevant. Different groups may prefer different platforms and types of communication.",
      },
      {
        type: "p",
        text: "Useful content should provide value instead of focusing only on promotion. Educational, informative and entertaining posts can encourage people to interact with a brand.",
      },
      {
        type: "quote",
        text: "Consistency turns social media activity into brand presence.",
      },
      { type: "h2", text: "Stay Consistent" },
      {
        type: "p",
        text: "Regular publishing helps maintain visibility. A content calendar makes it easier to plan topics, prepare creative assets and maintain a reliable posting schedule.",
      },
      {
        type: "list",
        items: [
          "Identify the platforms your audience uses.",
          "Create content pillars.",
          "Maintain a realistic publishing schedule.",
          "Review engagement and adjust your content.",
        ],
      },
    ],
  },

  {
    slug: "content-marketing-creating-content-people-value",
    title: "Content Marketing: Creating Content People Value",
    category: "Digital Marketing",
    accent: "#b69cff",
    image: pexels(5905445),
    excerpt:
      "Learn how useful content can attract audiences and build long-term relationships.",
    intro:
      "Content marketing focuses on creating useful information that helps an audience. Instead of relying only on direct promotion, it builds relationships through relevant and valuable content.",
    blocks: [
      { type: "h2", text: "Understand Your Audience" },
      {
        type: "p",
        text: "The best content starts with understanding the problems and interests of your audience. Research helps identify useful topics and questions that deserve thoughtful answers.",
      },
      {
        type: "p",
        text: "Content can take many forms, including articles, videos, guides and social media posts. The format should suit both the subject and the people consuming it.",
      },
      {
        type: "quote",
        text: "Create value first, promotion comes second.",
      },
      { type: "h2", text: "Focus on Long-Term Value" },
      {
        type: "p",
        text: "Useful content can continue attracting attention long after it is published. A well-organised content library supports discoverability and long-term audience growth.",
      },
      {
        type: "list",
        items: [
          "Research audience questions.",
          "Choose formats that suit the topic.",
          "Prioritise useful and accurate information.",
          "Update older content when needed.",
        ],
      },
    ],
  },

  {
    slug: "how-technology-is-changing-modern-businesses",
    title: "How Technology Is Changing Modern Businesses",
    category: "Technology",
    accent: "#3dffc0",
    image: pexels(3861969),
    excerpt:
      "Explore how modern technology is transforming the way businesses operate.",
    intro:
      "Technology is changing how businesses operate every day. Digital tools help teams improve processes, communicate with customers and make more informed decisions.",
    blocks: [
      { type: "h2", text: "Automation Saves Time" },
      {
        type: "p",
        text: "Businesses can automate repetitive tasks using modern software. This reduces manual work and allows teams to spend more time on important activities.",
      },
      {
        type: "p",
        text: "Digital platforms can also improve communication and help businesses deliver faster, more convenient customer experiences.",
      },
      {
        type: "quote",
        text: "Technology should solve problems, not create complexity.",
      },
      { type: "h2", text: "Data Helps Businesses Make Decisions" },
      {
        type: "p",
        text: "Digital systems collect information that businesses can use to understand operations and customer behaviour. Making sense of that information can support better decisions.",
      },
      {
        type: "list",
        items: [
          "Automate repetitive workflows.",
          "Improve team communication.",
          "Use data to identify opportunities.",
          "Choose technology that solves real problems.",
        ],
      },
    ],
  },

  {
    slug: "artificial-intelligence-and-the-future-of-business",
    title: "Artificial Intelligence and the Future of Business",
    category: "Technology",
    accent: "#c8ff3a",
    image: pexels(8386440),
    excerpt:
      "Understand how artificial intelligence is changing the way modern businesses work.",
    intro:
      "Artificial intelligence is becoming an important technology across many industries. Businesses are exploring ways to use AI to improve workflows, customer experiences and everyday operations.",
    blocks: [
      { type: "h2", text: "AI Can Automate Repetitive Work" },
      {
        type: "p",
        text: "AI-powered systems can assist with repetitive tasks and reduce the amount of manual effort involved in routine work. This gives teams more time for activities that require human judgement and creativity.",
      },
      {
        type: "p",
        text: "AI can also support faster responses and more personalised experiences. Chatbots are one example of how businesses can use these systems to communicate with customers.",
      },
      {
        type: "quote",
        text: "AI can amplify human capability when used responsibly.",
      },
      { type: "h2", text: "Responsible Use of AI" },
      {
        type: "p",
        text: "Businesses should consider accuracy, privacy and transparency when introducing AI tools. Human oversight remains important when systems influence decisions or communicate important information.",
      },
      {
        type: "list",
        items: [
          "Choose practical use cases.",
          "Review AI-generated information.",
          "Protect sensitive business data.",
          "Keep people involved in important decisions.",
        ],
      },
    ],
  },

  {
    slug: "why-businesses-should-invest-in-digital-security",
    title: "Why Businesses Should Invest in Digital Security",
    category: "Technology",
    accent: "#7cc8ff",
    image: pexels(60504),
    excerpt:
      "Learn why protecting business systems and digital assets is increasingly important.",
    intro:
      "As businesses depend more on digital systems, protecting information has become increasingly important. Security practices help reduce risks and maintain customer confidence.",
    blocks: [
      { type: "h2", text: "Protect Important Business Data" },
      {
        type: "p",
        text: "Businesses handle important information every day. Appropriate security practices help reduce the risk of unauthorised access, data loss and disruption.",
      },
      {
        type: "p",
        text: "Websites, databases and cloud services should be configured securely. Regular updates, access controls and responsible data handling are essential parts of maintaining security.",
      },
      {
        type: "quote",
        text: "Security is not a feature; it is a responsibility.",
      },
      { type: "h2", text: "Build Customer Trust" },
      {
        type: "p",
        text: "Customers expect businesses to handle their information carefully. Good security practices help protect that information and strengthen confidence in the business.",
      },
      {
        type: "list",
        items: [
          "Keep software and systems updated.",
          "Use strong authentication.",
          "Limit access to sensitive information.",
          "Back up important business data.",
        ],
      },
    ],
  },

  {
    slug: "how-seo-helps-businesses-get-found-online",
    title: "How SEO Helps Businesses Get Found Online",
    category: "SEO",
    accent: "#ffe14a",
    image: pexels(270637),
    excerpt:
      "Learn how search engine optimization can improve online visibility and attract potential customers.",
    intro:
      "SEO helps businesses improve their visibility in search engine results. A useful SEO strategy makes it easier for potential customers to discover relevant products, services and information.",
    blocks: [
      { type: "h2", text: "Understand Search Intent" },
      {
        type: "p",
        text: "Understanding what people search for helps businesses create more useful content. Search intent should guide the topics, structure and information included on a website.",
      },
      {
        type: "p",
        text: "Search engines aim to provide helpful results. Creating relevant and informative pages can support organic visibility and make a website more useful to visitors.",
      },
      {
        type: "quote",
        text: "The best SEO strategy starts with helping the user.",
      },
      { type: "h2", text: "Optimize Your Website" },
      {
        type: "p",
        text: "Page speed, mobile usability and technical SEO all contribute to a website's search experience. A clear site structure also makes information easier for search engines to understand.",
      },
      {
        type: "list",
        items: [
          "Research relevant search queries.",
          "Create useful page content.",
          "Improve website speed and mobile usability.",
          "Use clear headings and internal links.",
        ],
      },
    ],
  },

  {
    slug: "building-a-strong-brand-identity-for-your-business",
    title: "Building a Strong Brand Identity for Your Business",
    category: "Branding",
    accent: "#ff8eaa",
    image: pexels(4348404),
    excerpt:
      "Learn how businesses can create a memorable and consistent brand identity.",
    intro:
      "A strong brand identity helps businesses become recognisable and memorable. It communicates personality through visual elements and creates a consistent experience across customer touchpoints.",
    blocks: [
      { type: "h2", text: "Define Your Brand Personality" },
      {
        type: "p",
        text: "Every brand should have a clear personality. Visual choices should reflect the qualities and values the business wants people to associate with it.",
      },
      {
        type: "p",
        text: "Colours, typography, logos and graphics need to work together. Consistency across these elements makes the identity easier to recognise.",
      },
      {
        type: "quote",
        text: "A strong brand is remembered before it is explained.",
      },
      { type: "h2", text: "Build Brand Recognition" },
      {
        type: "p",
        text: "Repeated visual patterns help people become familiar with a business. Applying a consistent identity across websites, social media and marketing materials creates a stronger presence.",
      },
      {
        type: "list",
        items: [
          "Define your brand values and personality.",
          "Create a consistent visual identity.",
          "Establish typography and colour guidelines.",
          "Apply the identity across every touchpoint.",
        ],
      },
    ],
  },

  {
    slug: "why-mobile-friendly-websites-are-essential",
    title: "Why Mobile-Friendly Websites Are Essential",
    category: "Web Development",
    accent: "#7cc8ff",
    image: pexels(607812),
    excerpt:
      "Understand why mobile-friendly design is important for modern websites and businesses.",
    intro:
      "A large number of users access websites through mobile devices, making responsive design essential. A mobile-friendly website helps people access information and interact with a business comfortably.",
    blocks: [
      { type: "h2", text: "Mobile Users Expect Speed" },
      {
        type: "p",
        text: "Mobile users expect pages to load quickly. Slow experiences can cause visitors to leave before they reach the information they need.",
      },
      {
        type: "p",
        text: "Buttons and menus should be easy to use on smaller screens. Clear navigation and comfortable touch targets improve usability.",
      },
      {
        type: "quote",
        text: "If your website works everywhere, your business can reach anyone.",
      },
      { type: "h2", text: "Test Your Website" },
      {
        type: "p",
        text: "Websites should be tested on multiple mobile devices and screen sizes. Testing helps identify layout problems and ensures that important features remain accessible.",
      },
      {
        type: "list",
        items: [
          "Use responsive layouts.",
          "Keep buttons comfortable to tap.",
          "Optimise images for mobile.",
          "Test menus and forms on real devices.",
        ],
      },
    ],
  },

  {
    slug: "how-video-content-can-strengthen-your-brand",
    title: "How Video Content Can Strengthen Your Brand",
    category: "Digital Marketing",
    accent: "#ff4f8b",
    image: pexels(3062549),
    excerpt:
      "Discover how video content can help businesses communicate their message and engage audiences.",
    intro:
      "Video has become one of the most engaging formats for digital communication. It gives brands a way to explain ideas visually and connect with audiences through storytelling.",
    blocks: [
      { type: "h2", text: "Tell Your Story" },
      {
        type: "p",
        text: "Video allows brands to communicate ideas through visuals, sound and movement. A well-planned story can help people understand what a business offers and what it stands for.",
      },
      {
        type: "p",
        text: "Short-form videos can communicate useful information quickly. Reels and other short videos can help brands reach audiences in formats they already enjoy.",
      },
      {
        type: "quote",
        text: "Show people what your brand stands for.",
      },
      { type: "h2", text: "Stay Consistent" },
      {
        type: "p",
        text: "Publishing videos regularly helps maintain audience attention. A content plan makes production easier and keeps the messaging aligned with the brand.",
      },
      {
        type: "list",
        items: [
          "Choose a clear message for every video.",
          "Use formats suited to your audience.",
          "Keep branding consistent.",
          "Plan production and publishing ahead.",
        ],
      },
    ],
  },

  {
    slug: "e-commerce-website-features-every-business-needs",
    title: "E-Commerce Website Features Every Business Needs",
    category: "Web Development",
    accent: "#c8ff3a",
    image: pexels(230544),
    excerpt:
      "Explore important features that can make an e-commerce website easier to use and manage.",
    intro:
      "A successful e-commerce website needs more than attractive product pages. Customers need a smooth way to discover products, understand their options and complete purchases confidently.",
    blocks: [
      { type: "h2", text: "Simple Product Discovery" },
      {
        type: "p",
        text: "Customers should be able to find products quickly. Search tools, useful categories and filtering options make product discovery easier.",
      },
      {
        type: "p",
        text: "The checkout process should be simple and trustworthy. Customers need a clear experience when reviewing their order and entering payment information.",
      },
      {
        type: "quote",
        text: "Make buying simple and customers will come back.",
      },
      { type: "h2", text: "Mobile Shopping Experience" },
      {
        type: "p",
        text: "Online stores should work smoothly on mobile devices. Responsive product pages and an accessible checkout experience help customers shop comfortably.",
      },
      {
        type: "list",
        items: [
          "Clear product descriptions and images.",
          "Search and filtering functionality.",
          "A simple and secure checkout.",
          "Mobile-friendly product and cart pages.",
        ],
      },
    ],
  },

  {
    slug: "the-future-of-digital-business-in-a-connected-world",
    title: "The Future of Digital Business in a Connected World",
    category: "Business",
    accent: "#b69cff",
    image: pexels(3184338),
    excerpt:
      "Explore how technology, digital marketing, AI, and modern websites are shaping the future of business.",
    intro:
      "Businesses are increasingly using digital technologies to improve operations, reach customers and create new opportunities. The ability to adapt is becoming an important part of long-term growth.",
    blocks: [
      { type: "h2", text: "Digital Transformation" },
      {
        type: "p",
        text: "Digital tools are changing how businesses operate. Companies are adopting new technologies to improve efficiency, organise workflows and create more convenient services.",
      },
      {
        type: "p",
        text: "Artificial intelligence can also assist with repetitive tasks. Automation gives teams more time to focus on strategic activities and customer needs.",
      },
      {
        type: "quote",
        text: "The future belongs to businesses that adapt and keep learning.",
      },
      { type: "h2", text: "Focus on Customer Experience" },
      {
        type: "p",
        text: "Technology should ultimately improve the customer experience. Businesses that understand their customers and use digital tools thoughtfully can build stronger relationships.",
      },
      {
        type: "list",
        items: [
          "Adopt technology that supports business goals.",
          "Improve digital customer experiences.",
          "Explore practical automation opportunities.",
          "Keep learning as customer expectations evolve.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);

const getArticleText = (article: Article) =>
  [
    article.intro,
    ...article.blocks.flatMap((block) =>
      block.type === "list"
        ? block.items
        : block.type === "image"
          ? []
          : [block.text]
    ),
  ].join(" ");

export const readMinutes = (article: Article) =>
  Math.max(2, Math.ceil(getArticleText(article).split(/\s+/).length / 200));

export const readLabel = (article: Article) =>
  `${readMinutes(article)} min read`;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const relatedTo = (article: Article, count = 3) => {
  const sameCategory = articles.filter(
    (item) =>
      item.slug !== article.slug && item.category === article.category
  );

  const otherCategories = articles.filter(
    (item) =>
      item.slug !== article.slug && item.category !== article.category
  );

  return [...sameCategory, ...otherCategories].slice(0, count);
};
