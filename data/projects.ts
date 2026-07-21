import type { ShowcaseSectionData } from "@/types/showcase";

export interface Project extends ShowcaseSectionData {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: string[];
  videos?: string[];
  videoPoster?: string;
  link?: string;
  github?: string;
}

/** The layout strategy a project page uses, derived from its content. */
export type ProjectShape = "narrative" | "showcase" | "spotlight";

/**
 * Infers how a project page should be structured from the data it has:
 * - "narrative": has problem/process/outcome, reads as a founder report.
 * - "spotlight": led by a video with little supporting imagery.
 * - "showcase": everything else (media-forward gallery + features).
 */
export function getProjectShape(project: Project): ProjectShape {
  const hasNarrative = Boolean(
    project.problem || (project.process && project.process.length > 0) || project.outcome
  );
  if (hasNarrative) return "narrative";

  const imageCount = project.images?.length ?? 0;
  const videoCount = project.videos?.length ?? 0;
  if (videoCount > 0 && imageCount <= 1) return "spotlight";

  return "showcase";
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export const projects: Project[] = [
  {
    id: 22,
    slug: "quickbooks-po-to-invoice-converter",
    title: "PDF Purchase Order to QuickBooks Invoice Converter",
    category: "Apps & sites",
    date: "2026",
    thumbnail: "/blog/saving-50k-blog-image.jpg",
    images: [
      "/blog/saving-50k-blog-image.jpg"
    ],
    description:
      "A web app that converts PDF purchase orders into formatted Excel files ready to import into QuickBooks as invoices. It authenticates client employees, extracts and reviews PO data with AI, maps line items to the customer's QuickBooks product SKUs and customer names, flags low-confidence content for human review, and exports a clean Excel for AntSaaS to import. It saves the client hours every week and roughly $50k a year in manual labor.",
    longDescription:
      "This is a client web app I built to kill a slow, error-prone manual workflow: turning PDF purchase orders into QuickBooks invoices by hand. Another firm had already scoped the same project over months of meetings and tens of thousands of dollars in invoices and still could not ship it, largely because the client's legacy operations software had no real API and QuickBooks data did not map cleanly onto the PO formats. I built the working version in days by going straight to fast iteration with the actual end users. The app is deployed on Vercel and built on Next.js, with Supabase handling authentication and data so the client's employees each get secure logins. When an employee uploads a PDF purchase order, the Vercel AI SDK extracts the structured line items, quantities, customer, and pricing from the document. The app then maps each PO line item to the client's catalog of QuickBooks product SKUs and matches the buyer to the correct QuickBooks customer name, so the output speaks QuickBooks' language rather than the PO's. Anything the model is not confident about is flagged inline, and the employee can review, edit, and revise the extracted data before approving it. Once reviewed, the app exports a formatted Excel file structured exactly for AntSaaS to import into QuickBooks as an invoice. The result is a pipeline where a PDF goes in, a human verifies the ambiguous parts in seconds, and a QuickBooks-ready invoice comes out, replacing hours of copy-paste reconciliation each week.",
    technologies: [
      "Next.js",
      "Vercel",
      "Supabase",
      "Vercel AI SDK",
      "AntSaaS",
      "QuickBooks",
      "Excel Export",
      "PDF Parsing",
      "Authentication"
    ],
    features: [
      "Secure authentication for the client's employees via Supabase",
      "Upload PDF purchase orders and extract structured line items with the Vercel AI SDK",
      "Map PO line items to the client's QuickBooks product SKU catalog",
      "Match buyers to the correct QuickBooks customer names",
      "Flags low-confidence extractions for human review",
      "Review, edit, and revise extracted data before approval",
      "Exports a formatted Excel file for AntSaaS to import into QuickBooks as invoices",
      "Saves the client hours every week, roughly $50k a year in manual labor"
    ],
    problem:
      "The client spent hours every week manually turning PDF purchase orders into QuickBooks invoices: reading the PO, looking up the matching product SKUs and customer names, formatting the data, and importing it. Their legacy operations software had no real API and QuickBooks data did not map cleanly onto the PO formats, and a previous firm had already burned months and tens of thousands of dollars without shipping a working solution.",
    process: [
      "Built on Next.js and deployed on Vercel with Supabase for auth and data",
      "Used the Vercel AI SDK to extract structured data from PDF purchase orders",
      "Built SKU and customer mapping against the client's QuickBooks catalog",
      "Added confidence flagging plus a review, edit, and revision workflow for employees",
      "Generated AntSaaS-ready Excel exports for QuickBooks invoice import",
      "Iterated live with the client's end users to handle the real edge cases"
    ],
    outcome:
      "A PDF purchase order now becomes a QuickBooks-ready invoice in minutes instead of being keyed in by hand. The app saves the client hours every week and roughly $50k a year in manual labor, and succeeded where a prior multi-month, tens-of-thousands-of-dollars effort had failed.",
    link: "/blog/i-fixed-a-50k-problem-in-3-days"
  },
  {
    id: 21,
    slug: "the-daily-brief",
    title: "The Daily Brief",
    category: "Automations",
    date: "2026",
    thumbnail: "/blog/podcast-thumbnail.png",
    images: [
      "/blog/podcast-thumbnail.png",
      "/blog/podcast-n8n.png"
    ],
    description:
      "A fully automated AI daily podcast that delivers a personalized 7am morning briefing to my inbox with weather, calendar, email priorities, engineering updates, and filtered news.",
    longDescription:
      "The Daily Brief is a fully automated AI podcast that delivers a personalized morning briefing to my inbox every day at 7am. Built on n8n, the workflow pulls from five live data sources in parallel: Gmail, Google Calendar, OpenWeatherMap, the Vercel blog, and Google News RSS feeds. All five streams merge into a single structured prompt that Claude uses to write one unified briefing script instead of separate summaries. The script is converted to audio with ElevenLabs and delivered to my inbox before I wake up. The result is a five minute personalized podcast covering the weather, my schedule, emails that need attention, relevant engineering content, and filtered news, with no manual input and no apps to open.",
    technologies: [
      "n8n",
      "Claude",
      "ElevenLabs",
      "Gmail API",
      "Google Calendar API",
      "OpenWeatherMap API",
      "RSS Feeds",
      "Workflow Automation"
    ],
    features: [
      "Runs automatically every day at 7am",
      "Parallel ingestion from Gmail, Calendar, weather, Vercel blog, and Google News",
      "Merges all sources into one structured context prompt for Claude",
      "Generates a single personalized daily briefing script",
      "Converts text script to podcast audio with ElevenLabs",
      "Sends final podcast directly to inbox before the day starts"
    ]
  },
  {
    id: 20,
    slug: "action-button-automation",
    title: "Action Button Automation",
    category: "Automations",
    date: "2026",
    thumbnail: "/projects/action-button-automation/automation-cover.png",
    images: [
      "/projects/action-button-automation/automation-cover.png",
      "/projects/action-button-automation/n8n-automation.png"
    ],
    videos: [
      "/projects/action-button-automation/action-button-automation.mp4"
    ],
    videoPoster: "/projects/action-button-automation/automation-cover.png",
    description: "An n8n automation workflow, self-hosted on PikaPods, that syncs Google Calendar meeting data into a Notion Networking Hub as a personal CRM engine.",
    longDescription: "I built an n8n automation workflow, self-hosted on PikaPods, that acts as a personal CRM sync engine for my networking process. Instead of manually logging every meeting, I connected Google Calendar so attendee and meeting data from the past week flows automatically into my Notion Networking Hub. On a weekly scheduled trigger, n8n calls the Google Calendar API using OAuth credentials, pulls recent events, and extracts attendee details (name, email, and company when available) plus meeting metadata (title, date, and description). For each attendee, the workflow checks my Notion Contacts database to see whether the person already exists. If they exist, it updates the record; if not, it creates a new contact entry. In parallel, it creates or updates a corresponding record in my Notion Meetings database and links it back to the contact through a relation property. The full system runs every week without manual intervention. Hosting n8n on my own PikaPods instance keeps costs low and gives me full control over credentials and workflow logic while using secure OAuth access to Google Calendar and direct Notion API integration across both databases.",
    technologies: ["n8n", "PikaPods", "Google Calendar API", "OAuth", "Notion API", "CRM Automation"],
    features: [
      "Weekly n8n scheduled trigger pulls past-week Google Calendar events",
      "Extracts attendee and meeting metadata: name, email, company, title, date, description",
      "Upserts contacts in Notion Contacts database based on existing records",
      "Creates or updates linked entries in Notion Meetings database via relation property",
      "Self-hosted n8n on PikaPods for lower cost and full credential/workflow control",
      "Automatic personal CRM sync that keeps the Networking Hub current without manual logging"
    ]
  },
  {
    id: 19,
    slug: "gtm-automation-pipeline",
    title: "GTM Automation Pipeline",
    category: "Automations",
    date: "2026",
    thumbnail: "/projects/GTM-engineering/gtm-automation.jpg",
    images: [
      "/projects/GTM-engineering/gtm-automation.jpg"
    ],
    description: "An end to end go to market automation pipeline that captures inbound leads, enriches them with AI, scores and tiers them, and routes them to your CRM with custom cold outreach and a Slack notification for the sales team.",
    longDescription: "I built a full GTM automation pipeline to turn inbound interest into qualified, ready to work leads without manual effort. The system starts with curated lead capture across multiple channels: landing pages, demo requests, resource downloads, educational content, and guided product tours. Every lead flows into n8n, which handles the initial intake and filters out low quality signals. From there, valid leads are sent to Clay for deep enrichment: industry, LinkedIn profile, company size, tech stack, and dozens of additional data points. An AI layer then reads that enriched data and generates a concise summary of who the lead is, what they care about, and how strong the fit is. That summary goes back into n8n, which scores and tiers the lead based on quality. High tier leads get routed into Attio with all enriched data attached and a custom cold outreach message already written for the assigned sales rep. The final step is a Slack notification that tells the team a new lead has come in, includes the quality tier, and surfaces the most relevant context so the rep can act immediately. The result is a pipeline where no lead gets dropped, every outreach is personalized, and the sales team only touches leads that are already researched and ready to contact.",
    technologies: ["n8n", "Clay", "AI Enrichment", "Attio", "Slack", "Webhooks", "Automation"],
    features: [
      "Multi channel inbound lead capture: demos, resources, guided tours, educational content",
      "n8n workflow for lead intake, filtering, and orchestration",
      "Clay integration for deep lead enrichment: LinkedIn, industry, company data",
      "AI generated lead summary and fit analysis",
      "Lead scoring and tiering based on enrichment quality",
      "Automatic CRM routing to Attio with full data attached",
      "Custom cold outreach written per lead and assigned to a sales rep",
      "Slack notification with lead quality and context for the sales team"
    ]
  },
  {
    id: 18,
    slug: "armstrong-academy",
    title: "Armstrong Academy",
    category: "Apps & sites",
    date: "2026",
    thumbnail: "/projects/armstrong-academy/armstrong-academy-bento.jpg",
    images: [
      "/projects/armstrong-academy/armstrong-academy-bento.jpg",
      "/projects/armstrong-academy/home.png",
      "/projects/armstrong-academy/marketplace.png",
      "/projects/armstrong-academy/blog.png"
    ],
    description: "A teaching platform for AI native builders. Free courses, real projects, prompt driven development, and an open source CLI to ship Next.js apps without the boring setup.",
    longDescription: "Armstrong Academy is a teaching platform I built for builders who want to learn prompt driven development and ship real apps fast. The foundation is built for the Vercel ecosystem: Next.js 16, TypeScript, Tailwind, and Framer. The platform bridges design and engineering with pixel perfect interfaces that ship faster and rank higher. An open source CLI (npx @william/ui create) lets you install templates directly into your codebase and skip manual copying. The curriculum is completely free and project based: Module 01 covers a scalable Next.js + shadcn architecture in under 5 minutes; Module 02 adds database integration and auth; Module 03 covers forms that save to the database; Module 04 teaches building a blog with Markdown and dynamic routes. There is also a marketplace of production ready components. The goal is to help builders learn to ship beautiful software without getting bogged down in theory. Describe what you want in plain language and get a real app.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind", "Framer Motion", "Vercel", "Open Source CLI", "Markdown", "shadcn"],
    features: [
      "Free project based curriculum for AI native builders",
      "Open source CLI for instant template setup (npx @william/ui create)",
      "Modules: 5 Step Foundation, Database Integration, Forms, Blog with Markdown",
      "Modern stack: Next.js 16, TypeScript, Tailwind, Framer",
      "Marketplace of production ready components",
      "Bridges design and engineering with Core Web Vitals focus",
      "No config or boilerplate. Describe and ship"
    ],
    link: "https://armstrong-academy.vercel.app/"
  },
  {
    id: 12,
    slug: "ai-blog-generator",
    title: "AI Blog Generator",
    category: "Apps & sites",
    date: "November 2025",
    description: "AI-powered blog generation tool using OpenAI API to automate SEO-optimized content creation for companies and brands, featuring custom firm profiles and bulk generation capabilities.",
    longDescription: "I developed an AI blog generator that automates content creation for companies and brands to increase their SEO presence. The tool integrates with OpenAI's API to generate high-quality, SEO-optimized blog content tailored to each company's specific goals, identity, and market positioning. The system features sophisticated prompt engineering and custom firm profile creation, allowing for personalized content generation that aligns with each brand's unique voice and objectives. The platform supports both single blog post creation and parallel bulk generation, making it scalable for content marketing teams. Each generated blog is trained on SEO best practices and the specific market context of the target company, ensuring content that not only engages readers but also performs well in search rankings. The tool outputs MDX files that can be directly integrated into company websites, streamlining the content publishing workflow from generation to deployment.",
    thumbnail: "/projects/AI Blog Generator/blog-generator-ui.jpg",
    images: [
      "/projects/AI Blog Generator/blog-generator-ui.jpg",
      "/projects/AI Blog Generator/blog-generator.png",
      "/projects/AI Blog Generator/blog-posts.png",
    ],
    technologies: ["OpenAI API", "Python", "Prompt Engineering", "SEO Optimization", "MDX", "Content Generation", "Bulk Processing"],
    features: [
      "OpenAI API integration for content generation",
      "Custom firm profile creation and management",
      "SEO-optimized content generation",
      "Prompt engineering for brand-specific content",
      "Single and bulk blog generation capabilities",
      "Market-specific content training",
      "MDX file output for direct website integration",
      "Automated content publishing workflow",
      "Brand voice and identity customization",
      "SEO best practices integration"
    ],
    link: "https://ai-blog-generator-demo.vercel.app/"
  },
  {
    id: 11,
    slug: "cora-fitness",
    title: "Cora Fitness - Hybrid Athlete Brand",
    category: "Apps & sites",
    date: "October 2025",
    description: "Comprehensive fitness brand demo targeting the hybrid athlete niche, showcasing expertise in web design, AI branding, marketing strategy, and business development.",
    longDescription: "Cora is a demo fitness brand I created to demonstrate my comprehensive skills in web design, branding, AI powered design, marketing strategy, and business development. The brand targets the emerging hybrid athlete niche in the fitness industry, which focuses on athletes who train across multiple disciplines requiring both strength and endurance. The name 'Cora' derives from the concepts of strength and balance, which is visually emphasized through the brand's logo featuring a Roman column, symbolizing classical strength and structural stability. I utilized AI tools to create professional branding materials and realistic product demos, developing a complete brand identity from concept to execution. The project involved creating a fully functional website deployed on Vercel, designing a cohesive visual identity, developing marketing strategies for the hybrid athlete market, and creating product mockups that demonstrate real-world application. This project showcases my ability to develop a complete brand ecosystem while leveraging modern AI tools to enhance creative output and business strategy.",
    thumbnail: "/projects/cora/runners.png",
    images: [
      "/projects/cora/runners.png",
      "/projects/cora/site.png",
      "/projects/cora/tri.png",
      "/projects/cora/site2.png",
      "/projects/cora/cloth.png"
    ],
    technologies: ["Web Design", "AI Branding", "Vercel", "Marketing Strategy", "Business Development", "Brand Identity", "Product Design", "UI/UX Design"],
    features: [
      "Complete brand identity development from concept to execution",
      "AI-powered branding and product demo creation",
      "Hybrid athlete market research and positioning",
      "Roman column logo design emphasizing strength and balance",
      "Full website design and development",
      "Vercel deployment and hosting",
      "Marketing strategy for niche fitness market",
      "Product mockup and demonstration design",
      "Business strategy and market analysis",
      "Comprehensive brand ecosystem development"
    ],
    link: "https://corafitness.vercel.app/"
  },
  {
    id: 10,
    slug: "proof-social-health-tracker",
    title: "Proof - Social Health Tracker",
    category: "Apps & sites",
    date: "March 2025",
    description: "Social media app concept that gamifies health challenges through photo-based task tracking and social accountability, featuring a working prototype built with Flutter.",
    longDescription: "Proof is a social media app concept I developed to address the challenge of maintaining accountability in health and wellness goals. The app gamifies health challenges by requiring users to post photos as proof of completing tasks, which are then shared in a social feed for friends to see and provide encouragement. This creates a system of social accountability that motivates users to stay consistent with their health goals. The project presented a great UI/UX challenge, requiring me to design an intuitive interface that balances social features with privacy considerations. I used Figma for design mockups and prototyping, then built a working prototype using Cursor and Flutter. The app addresses the common problem of people starting health challenges but losing motivation without accountability, providing a solution that combines social connection with goal achievement.",
    thumbnail: "/projects/proof/1.jpg",
    images: [
      "/projects/proof/1.jpg",
      "/projects/proof/2.jpg",
      "/projects/proof/3.jpg",
      "/projects/proof/4.jpg",
      "/projects/proof/5.jpg",
      "/projects/proof/6.jpg",
      "/projects/proof/7.jpg"
    ],
    technologies: ["Figma", "Flutter", "Cursor", "UI/UX Design", "App Development", "Social Media Design"],
    features: [
      "Photo-based task verification system",
      "Social feed for accountability and motivation",
      "Gamification of health challenges",
      "Intuitive UI/UX design for mobile app",
      "Working Flutter prototype development",
      "Social accountability features",
      "Health challenge integration",
      "Privacy-conscious social sharing"
    ]
  },
  {
    id: 8,
    slug: "pws-refrigeration-system",
    title: "PWS Refrigeration System",
    category: "Hardware",
    date: "September 2024",
    description: "Human-centered engineering project developing a smart refrigeration system for individuals with Prader-Willi Syndrome to promote independence and safety.",
    longDescription: "This human-centered engineering project focused on developing a specialized refrigeration system for individuals with Prader-Willi Syndrome (PWS), a condition where individuals cannot regulate hunger. Through extensive collaboration with PWS facilities and multiple site visits, our team gained deep understanding of the unique challenges faced by individuals with PWS. Working on the electronics team, I contributed to the design using CAD software, Arduino programming, electronics integration, PCB specification, circuit design, and more. The beta prototype we developed addresses a critical need, allowing individuals with PWS to be more independent and live alone for longer periods while maintaining their safety and well-being.",
    thumbnail: "/projects/PWS-fridge/pws1.jpg",
    images: [
      "/projects/PWS-fridge/pws1.jpg",
      "/projects/PWS-fridge/pws2.jpg",
      "/projects/PWS-fridge/pws3.jpg",
      "/projects/PWS-fridge/pws4.jpg",
      "/projects/PWS-fridge/pws5.jpg",
      "/projects/PWS-fridge/pws6.jpg",
      "/projects/PWS-fridge/pws7.jpg"
    ],
    technologies: ["CAD Software", "Arduino", "Electronics", "PCB Design", "Circuit Design", "Human-Centered Design"],
    features: [
      "Human-centered design approach with stakeholder collaboration",
      "Site visits and user research with PWS facilities",
      "Electronics system design and integration",
      "Arduino programming and control systems",
      "PCB specification and circuit design",
      "Beta prototype development and testing",
      "Promotes independence for individuals with PWS",
      "Addresses critical safety and accessibility needs"
    ]
  },
  {
    id: 7,
    slug: "waste-management-sorting-system",
    title: "Waste Management and Sorting System",
    category: "Hardware",
    date: "March 2022",
    description: "Redesigned Boston College's waste system with an automated conveyor system that sorts trash, compost, and recycling to improve accessibility and user experience.",
    longDescription: "This project focused on redesigning Boston College's waste management system to make it more accessible and user-friendly. Our team was tasked with designing a solution that considered business partners and funding opportunities. We developed a conveyor system prototype that could automatically sort trash, compost, and recycling materials. The project emphasized both technical innovation and business development, as we worked with mock partners and presented our design at a business fair. Using DC motors, circuits, Arduino programming, and C++, we created a functional prototype that demonstrated the potential for improved waste management on campus while showcasing our ability to bridge engineering solutions with business partnerships.",
    thumbnail: "/projects/conveyor/conveyor1.jpg",
    images: [
      "/projects/conveyor/conveyor1.jpg"
    ],
    videos: [
      "/projects/conveyor/horizontal-conveyor.mp4",
      "/projects/conveyor/vertical-conveyor.mp4"
    ],
    technologies: ["DC Motors", "Arduino", "C++", "Circuit Design", "Human-Centered Design", "Business Engineering"],
    features: [
      "Automated waste sorting system (trash, compost, recycling)",
      "Conveyor system design and implementation",
      "DC motor control and circuit integration",
      "Arduino programming and C++ development",
      "Human-centered design approach",
      "Business partnership development",
      "Mock partner collaboration and presentations",
      "Business fair presentation and pitch development"
    ]
  },
  {
    id: 13,
    slug: "advisergpt-product-launch-video",
    title: "AdviserGPT - Product Launch Video",
    category: "Apps & sites",
    date: "Summer 2025",
    description:
      "Product launch video created during my AI internship at AdviserGPT, posted on LinkedIn and the company website to drive customer interest.",
    longDescription:
      "During my AI internship at AdviserGPT this summer, I created a professional product launch video that was posted on their LinkedIn and website to attract customers. This project required me to learn Adobe After Effects from scratch, while also utilizing Illustrator and Premiere Pro to create a fun, stylish, and modern demonstration of what the product does. The challenge was to take complex engineering and business visions and translate them into a creative, accessible format that would resonate with potential users. I developed a compelling visual narrative that showcased the product's capabilities in an engaging way, combining motion graphics, visual effects, and professional editing to create a polished final product. The video successfully brought the company's vision to life and served as a key marketing asset that drove customer engagement and product adoption.",
    thumbnail: "/projects/adviser_gpt/linkedin_cover_photo.jpg",
    videos: [
      "/projects/adviser_gpt/Adviser_GPT_Answer_DEMO.mp4"
    ],
    technologies: [
      "Adobe After Effects",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
      "Motion Graphics",
      "Video Editing",
      "Visual Storytelling"
    ],
    features: [
      "Professional product launch video production",
      "Self-taught Adobe After Effects proficiency",
      "Motion graphics and visual effects design",
      "Creative translation of technical concepts",
      "Professional video editing and post-production",
      "Marketing content creation for LinkedIn and website",
      "Brand storytelling and product demonstration",
      "Customer engagement and conversion-focused content"
    ]
  },

  {
    id: 14,
    slug: "sort-it-out-client-web-app",
    title: "Sort It Out - Client Web App",
    category: "Apps & sites",
    date: "June 2025",
    description:
      "Client website/web app built as my first monetized development project, taking a real business from concept to a polished, deployed product.",
    longDescription:
      "Sort It Out is a professional website I built for a client's organizing business, representing my first successful monetization of technical skills. This project took me through the complete product lifecycle from 0 to 1, working directly with a client to understand their business needs and deliver a polished, production ready web application. I used React and TypeScript to build this web app alongside Cursor AI, demonstrating my ability to leverage modern development tools and AI assistance to deliver high-quality results efficiently. This project showcases my client-facing capabilities, from initial consultation through iterative development and final deployment. The success of this project has led to ongoing recommendations and has positioned me to seek additional clients for web app development. This experience demonstrates not just technical proficiency, but also the ability to understand client needs, communicate effectively, and deliver products that meet business objectives.",
    thumbnail: "/projects/sort_it_out/home.png",
    images: [
      "/projects/sort_it_out/home.png",
      "/projects/sort_it_out/2.png",
      "/projects/sort_it_out/3.png",
      "/projects/sort_it_out/4.png",
      "/projects/sort_it_out/5.png"
    ],
    technologies: [
      "React",
      "TypeScript",
      "Cursor AI",
      "Web Development",
      "Client Services",
      "Product Development"
    ],
    features: [
      "Complete product lifecycle from concept to deployment",
      "Client-focused web application development",
      "React and TypeScript implementation",
      "AI-assisted development workflow with Cursor",
      "Professional client communication and iteration",
      "Production-ready deployment",
      "Business-focused solution delivery",
      "Monetized technical skills successfully"
    ],
    link: "https://www.sortitoutsf.com/"
  },

  {
    id: 15,
    slug: "architecture-design-modular-3d-model-system",
    title: "Architecture Design - Modular 3D Model System",
    category: "Hardware",
    date: "Summer 2024",
    description:
      "Built modular, client-facing physical architectural models by converting multi-platform CAD files into 3D-printed systems for real-world visualization.",
    longDescription:
      "This project involved working with the prestigious architecture firm Mark Cavagnero Associates to create physical 3D models using cutting-edge 3D printing technology. I analyzed architectural designs from Rhino, Revit, and SketchUp along with architectural drawings and paperwork to convert their virtual models into tangible 3D designs. The complete design was built at a 1:2000 scale and featured a modular system that allowed architects, partners, contractors, and clients to visualize floor layouts and designs. The system included different proposal options that could be easily substituted. The final design was presented to clients, enabling them to see and interact with the architectural designs in real life. Throughout this project, I collaborated with architects, conducted site visits to observe projects, and worked with business partners, designers, and contractors using OnShape for 3D design.",
    thumbnail: "/projects/architecture/SI1.jpg",
    images: [
      "/projects/architecture/SI1.jpg",
      "/projects/architecture/SI2.jpg",
      "/projects/architecture/SI3.jpg",
      "/projects/architecture/SI4.jpg",
      "/projects/architecture/SI5.jpg",
      "/projects/architecture/SI6.jpg"
    ],
    technologies: [
      "Rhino",
      "Revit",
      "SketchUp",
      "3D Printing",
      "Onshape",
      "CAD",
      "Model Making",
      "Architecture"
    ],
    features: [
      "3D model conversion from multiple CAD platforms",
      "Physical model creation at 1:2000 scale",
      "Modular design system for flexibility",
      "Multiple proposal integration capability",
      "Client presentation and visualization",
      "Cross-platform software integration",
      "Site visit coordination and analysis",
      "Multi-stakeholder collaboration (architects, contractors, clients)"
    ]
  },

  {
    id: 16,
    slug: "prosthetic-exoskeleton",
    title: "Prosthetic Exoskeleton",
    category: "Hardware",
    date: "Summer 2021",
    description:
      "Built a working prosthetic exoskeleton prototype with Vanderbilt mentorship using EMG signals to control a DC motor-driven mechanism.",
    longDescription:
      "This project stands out as a testament to my skills and passion for engineering. During the summer of my junior year in high school, I engineered a prosthetic exoskeleton in collaboration with engineering professors from Vanderbilt University. We successfully developed a working prototype that utilized signals from EMG modules to control the exoskeleton's movement. I sought mentorship from professors nationwide, combining STEM expertise with engineering guidance to develop this innovative prosthetic exoskeleton alongside Vanderbilt faculty and students. The project involved implementing EMG sensors to enable precise control of a robust DC motor, significantly enhancing the functionality and usability of the exoskeleton. This experience provided invaluable mentorship and guidance from university-level engineering professionals while contributing to assistive technology development.",
    thumbnail: "/projects/prosthetic-exo/prosthetic1.jpg",
    images: [
      "/projects/prosthetic-exo/prosthetic1.jpg",
      "/projects/prosthetic-exo/prosthetic2.jpg",
      "/projects/prosthetic-exo/prosthetic3.jpg",
      "/projects/prosthetic-exo/prosthetic4.jpg",
      "/projects/prosthetic-exo/prosthetic1.1.jpg"
    ],
    technologies: [
      "EMG Sensors",
      "DC Motors",
      "Control Systems",
      "Biomedical Engineering",
      "Signal Processing"
    ],
    features: [
      "EMG signal processing and control implementation",
      "DC motor control and movement coordination",
      "University-level collaboration and mentorship",
      "Working prototype development and testing",
      "Biomedical engineering principles application",
      "Assistive technology innovation",
      "Cross-institutional project coordination",
      "Advanced engineering mentorship integration"
    ]
  },

  {
    id: 17,
    slug: "automatic-remote-controlled-projector-system",
    title: "Automatic Remote-Controlled Projector System",
    category: "Hardware",
    date: "2020",
    description:
      "Automatic projector height-adjustment system with remote control, combining mechanical design, circuits, DC motor control, and CAD modeling.",
    longDescription:
      "This project marked my introduction to engineering design and problem-solving. I built an automatic remote-controlled projector system that would control the height of a projector to perfectly display on my wall. This was my first experience using engineering principles to solve a personal problem I was facing. The project required me to learn circuit design, mechanical design principles, and how to create collapsing and moving integrated systems. I utilized 3D CAD design software to model the mechanical components and implemented DC motor and motor controller designs to achieve precise height adjustment. This foundational project taught me the fundamentals of engineering design, from identifying a problem to developing a complete solution that integrated multiple engineering disciplines.",
    thumbnail: "/projects/projector/projector11.jpg",
    images: [
      "/projects/projector/projector1.jpg",
      "/projects/projector/projector2.jpg",
      "/projects/projector/projector3.jpg",
      "/projects/projector/projector4.jpg",
      "/projects/projector/projector5.jpg",
      "/projects/projector/projector6.jpg",
      "/projects/projector/projector7.jpg",
      "/projects/projector/projector8.jpg",
      "/projects/projector/projector9.jpg",
      "/projects/projector/projector10.jpg",
      "/projects/projector/projector11.jpg"
    ],
    technologies: [
      "3D CAD Design",
      "DC Motors",
      "Motor Controllers",
      "Circuit Design",
      "Mechanical Design",
      "Remote Control Systems"
    ],
    features: [
      "Automatic height adjustment system",
      "Remote control functionality",
      "Precise wall display positioning",
      "Integrated mechanical and electronic systems",
      "Collapsing and moving mechanism design",
      "DC motor control and implementation",
      "3D CAD modeling and design",
      "Problem-solving engineering approach"
    ]
  }
];
