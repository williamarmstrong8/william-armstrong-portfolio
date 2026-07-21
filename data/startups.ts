import type { Metric } from "@/types/showcase";

export interface CaseStudyPillar {
  title: string;
  body: string;
}

export interface CaseStudyBlock {
  label: string;
  title: string;
  body?: string;
  pillars?: CaseStudyPillar[];
}

export interface Startup {
  slug: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  status: "Active" | "Launched" | "In Beta" | "In Funding";
  metrics: Metric[];
  website: string;
  /** Large case-study headline (H1). */
  headline: string;
  role: string;
  timeline: string;
  team?: string;
  skills: string[];
  overview: CaseStudyBlock;
  problem?: CaseStudyBlock;
  opportunity?: CaseStudyBlock;
  solution?: CaseStudyBlock;
  approach?: CaseStudyBlock;
  outcome?: CaseStudyBlock;
  reflection?: CaseStudyBlock;
  screenshots?: string[];
  technologies?: string[];
}

export const startups: Startup[] = [
  {
    slug: "club-pack",
    name: "Club Pack",
    logo: "/clubpack_logo.svg",
    description:
      "A SaaS platform that solves the fragmented software problem for social club founders. ClubPack centralizes everything needed to run a club - from event creation and RSVP management to custom websites and analytics - all in one place.",
    category: "Sports & Community",
    status: "In Funding",
    metrics: [
      { label: "Clubs Trialing", value: "25+" },
      { label: "Funding Raised", value: "$36,500" },
    ],
    website: "https://www.joinclubpack.com/",
    headline: "One platform to run a social club",
    role: "Founder",
    timeline: "2024 - Present",
    team: "Founding team",
    skills: ["Product", "Engineering", "Fundraising", "GTM"],
    overview: {
      label: "Overview",
      title: "What should club software look like when founders are drowning in tools?",
      body: "Social club founders stitch together spreadsheets, GroupMe, Stripe, Instagram, and DIY websites just to run events. Club Pack centralizes the stack so ops stay light and growth stays measurable.",
      pillars: [
        {
          title: "Product strategy",
          body: "Map the real workflow of club founders - from first event to recurring membership - and design the system around that loop.",
        },
        {
          title: "Build & ship",
          body: "Ship a focused SaaS core: events, RSVPs, member pages, and payments that work together instead of as bolt-ons.",
        },
        {
          title: "Validate with clubs",
          body: "Put the product in founders’ hands early, learn where friction lives, and raise to keep building.",
        },
      ],
    },
    problem: {
      label: "Problem",
      title: "Club operations are fragmented by default.",
      body: "Every club reinvents the same stack: a calendar here, a payment link there, a half-finished website somewhere else. Admins lose hours to coordination, and members feel the seams. There is no default system of record for social clubs.",
    },
    opportunity: {
      label: "Opportunity",
      title: "Own the operating system for social clubs.",
      body: "If events, members, web presence, and payments live in one place, clubs stop fighting tools and start compounding community. That creates lock-in through workflow - not features alone.",
    },
    solution: {
      label: "Solution",
      title: "Club Pack: the club OS founders actually finish setting up.",
      body: "A unified platform for event creation, RSVPs, custom club sites, analytics, and payments - built for social clubs that need to move fast without hiring an ops team.",
    },
    approach: {
      label: "What we built",
      title: "A tight loop from event to insight.",
      pillars: [
        {
          title: "Events & RSVPs",
          body: "Create events, collect attendance, and keep members in sync without another group chat spreadsheet.",
        },
        {
          title: "Club websites",
          body: "Ship a clean public presence without leaving the product - so discovery and ops share one source of truth.",
        },
        {
          title: "Analytics & payments",
          body: "See what is working, and take payments without duct-taping Stripe onto a Google Form.",
        },
      ],
    },
    outcome: {
      label: "Outcome",
      title: "Traction that unlocked the next build cycle.",
      pillars: [
        {
          title: "25+ clubs in trial",
          body: "Real founders running real events on the platform.",
        },
        {
          title: "$36,500 raised",
          body: "Pre-seed capital to deepen product and expand distribution.",
        },
        {
          title: "Campus showcase",
          body: "Featured in Boston College’s entrepreneurship showcase.",
        },
      ],
    },
    reflection: {
      label: "Reflection",
      title: "What I learned",
      pillars: [
        {
          title: "Workflow beats feature lists.",
          body: "Club founders do not want more software - they want one path from “we should host this” to “everyone showed up and paid.”",
        },
        {
          title: "Ship for the admin, sell with the community.",
          body: "If the person running the club feels relief in week one, members feel the difference in week two.",
        },
      ],
    },
    technologies: ["Next.js 16", "Node.js", "Supabase", "Stripe API"],
    screenshots: [
      "/brands/clubpack/clubpack.png",
      "/brands/clubpack/screenshot.png",
    ],
  },
  {
    slug: "mod-brew",
    name: "Mod Brew",
    logo: "/modbrew_logo.svg",
    description:
      "A speakeasy-style coffee pop-up that disrupted campus coffee culture by offering premium quality coffee at student-friendly prices. ModBrew created an exclusive, in-the-know brand that became a campus phenomenon within a week.",
    category: "Coffee & Lifestyle",
    status: "Active",
    metrics: [
      { label: "Customers", value: "1000+" },
      { label: "Per Pop-up", value: "$300-400" },
    ],
    website: "https://modbrew.vercel.app/",
    headline: "Campus coffee, without the line culture tax",
    role: "Founder",
    timeline: "2025-2026",
    team: "Solo + campus ops",
    skills: ["Brand", "Operations", "Social", "Web"],
    overview: {
      label: "Overview",
      title: "How do you make premium coffee feel like an insider drop on campus?",
      body: "Mod Brew started as a speakeasy-style pop-up: limited locations, strong branding, student-friendly pricing. The goal was simple - make coffee culture feel alive again, then prove it could sustain.",
      pillars: [
        {
          title: "Brand first",
          body: "Build an identity people want to be seen with - before scaling volume.",
        },
        {
          title: "Pop-up ops",
          body: "Treat each location like a release: timing, setup, and throughput matter as much as the drink.",
        },
        {
          title: "Campus distribution",
          body: "Use social and word-of-mouth so scarcity works for you, not against you.",
        },
      ],
    },
    problem: {
      label: "Problem",
      title: "Campus coffee was either expensive or forgettable.",
      body: "Students wanted something better than cafeteria default, but branded cafés priced out daily ritual. There was room for a brand that felt premium without feeling exclusive by price alone.",
    },
    opportunity: {
      label: "Opportunity",
      title: "Make discovery part of the product.",
      body: "A speakeasy format turns logistics into marketing. If people have to know where to go, they talk - and talking is distribution.",
    },
    solution: {
      label: "Solution",
      title: "Mod Brew: pop-up coffee with a cult-brand cadence.",
      body: "Premium drinks, student-friendly pricing, and a brand system designed to spread through campus networks in days - not semesters.",
    },
    approach: {
      label: "How it ran",
      title: "Small footprint, high signal.",
      pillars: [
        {
          title: "Location as story",
          body: "Choose spots that feel found, not advertised - then make the line part of the lore.",
        },
        {
          title: "Social as storefront",
          body: "Instagram and campus chatter carry the where/when so the stand can stay lean.",
        },
        {
          title: "Unit economics per drop",
          body: "Optimize for profit per pop-up, not theoretical scale charts.",
        },
      ],
    },
    outcome: {
      label: "Outcome",
      title: "From experiment to campus staple.",
      pillars: [
        {
          title: "1000+ customers",
          body: "Served in the first semester of operating.",
        },
        {
          title: "$300-400 per pop-up",
          body: "Consistent profit that funded the next drop.",
        },
        {
          title: "Week-one recognition",
          body: "Campus-wide brand awareness, plus school-wide funding support.",
        },
      ],
    },
    reflection: {
      label: "Reflection",
      title: "What I learned",
      pillars: [
        {
          title: "Constraint is a creative tool.",
          body: "Limited hours and locations forced clarity - and made the brand feel intentional.",
        },
        {
          title: "Culture converts.",
          body: "People buy the drink, but they return for the feeling of being in on it.",
        },
      ],
    },
    technologies: ["Vercel", "Next.js", "Social Media Marketing", "Instagram Branding", "Canva"],
    screenshots: [
      "/brands/modbrew/wide.jpeg",
      "/brands/modbrew/line2.jpeg",
      "/brands/modbrew/line1.jpeg",
      "/brands/modbrew/shop.jpeg",
      "/brands/modbrew/shop2.jpeg",
      "/brands/modbrew/group.jpeg",
      "/brands/modbrew/hand.jpeg",
      "/brands/modbrew/window.jpeg",
      "/brands/modbrew/mary.jpeg",
    ],
  },
  {
    slug: "happy-mile",
    name: "Happy Mile Run Club",
    logo: "/happymile_logo.svg",
    description:
      "A viral San Francisco run club that filled the gap for free, fun, young, and social running communities. HappyMile leveraged social media to create partnerships with local businesses, offering free benefits to members while building a thriving community.",
    category: "Health & Wellness",
    status: "Launched",
    metrics: [
      { label: "Members", value: "3,000+" },
      { label: "Partnership", value: "Nike" },
    ],
    website: "https://happymilerc.com/",
    headline: "Running as community infrastructure",
    role: "Founder / Organizer",
    timeline: "Launched in San Francisco",
    team: "Community-led",
    skills: ["Community", "Partnerships", "Brand", "Ops"],
    overview: {
      label: "Overview",
      title: "What if a run club felt like a social product, not a race calendar?",
      body: "Happy Mile filled a gap in SF for free, young, social running. The product was the weekly experience - and the growth loop was belonging plus brand partnerships that made membership valuable without a paywall.",
      pillars: [
        {
          title: "Community design",
          body: "Make showing up easy, social, and repeatable - fitness as the excuse, people as the reason.",
        },
        {
          title: "Partnership flywheel",
          body: "Trade audience attention for member benefits with local businesses and brands.",
        },
        {
          title: "Content engine",
          body: "Document the culture so every run recruits the next one.",
        },
      ],
    },
    problem: {
      label: "Problem",
      title: "Serious running scenes left out the social middle.",
      body: "SF had elite training groups and casual jogs - not enough free, fun, young communities that felt welcoming on day one. People wanted fitness without gatekeeping.",
    },
    opportunity: {
      label: "Opportunity",
      title: "Belonging is the retention mechanic.",
      body: "If the club becomes a social graph people are proud of, growth compounds through invites - and brands pay to be adjacent to that energy.",
    },
    solution: {
      label: "Solution",
      title: "Happy Mile: free runs, real community, brand-backed benefits.",
      body: "Weekly group runs, a loud social presence, and partnerships (including Nike) that give members tangible upside while keeping entry free.",
    },
    approach: {
      label: "How it scaled",
      title: "Culture first, then leverage.",
      pillars: [
        {
          title: "Weekly ritual",
          body: "A predictable cadence so the club becomes habit, not a one-off event.",
        },
        {
          title: "Brand partnerships",
          body: "Package community attention into sponsorships that fund benefits - not bureaucracy.",
        },
        {
          title: "Storytelling",
          body: "Photography and social clips turn each run into recruiting creative.",
        },
      ],
    },
    outcome: {
      label: "Outcome",
      title: "From local club to recognized community brand.",
      pillars: [
        {
          title: "3,000+ members",
          body: "A community large enough to matter to partners - and to each other.",
        },
        {
          title: "Nike partnership",
          body: "Proof the culture was valuable beyond the starting line.",
        },
        {
          title: "Media + expansion",
          body: "Local press coverage and interest in bringing the model to other cities.",
        },
      ],
    },
    reflection: {
      label: "Reflection",
      title: "What I learned",
      pillars: [
        {
          title: "Community is a product.",
          body: "The run is the interface. The real system is trust, cadence, and who people meet.",
        },
        {
          title: "Partners follow culture.",
          body: "Sponsorships showed up after the vibe was undeniable - not before.",
        },
      ],
    },
    technologies: [
      "Squarespace",
      "Strava",
      "Social Media Marketing",
      "Brand Partnerships",
      "SF Wide Community Awareness",
    ],
    screenshots: [
      "/brands/happy-mile/gathering.jpeg",
      "/brands/happy-mile/community.jpeg",
      "/brands/happy-mile/pickle-ball.jpeg",
      "/brands/happy-mile/more-runners-2.jpeg",
      "/brands/happy-mile/runners-more.jpeg",
      "/brands/happy-mile/runner-brdige.jpeg",
      "/brands/happy-mile/merch.jpeg",
    ],
  },
  {
    slug: "destination-drifters",
    name: "Destination Drifters",
    logo: "/drifters_logo.svg",
    description:
      "An outdoor travel brand I created freshman year of college to inspire people and share my love for the outdoors. I saw a lack of outdoor inspiration in my first year and built this social media and merchandise brand that became a recognizable staple on campus.",
    category: "Travel & Adventure",
    status: "Launched",
    metrics: [
      { label: "Views", value: "1M+" },
      { label: "Merch Sales", value: "$3,500" },
    ],
    website: "https://destinationdrifters.com/",
    headline: "Outdoor inspiration as a campus brand",
    role: "Founder",
    timeline: "Freshman year launch",
    team: "Solo",
    skills: ["Brand", "Content", "Merch", "Web"],
    overview: {
      label: "Overview",
      title: "How do you make outdoors feel reachable to people stuck on campus?",
      body: "Destination Drifters started as a response to a quiet freshman year - not enough outdoor inspiration nearby. It became a content and merchandise brand that made adventure feel local, social, and wearable.",
      pillars: [
        {
          title: "Content as product",
          body: "Ship photography and stories that make people want to go - then give them a way to carry the brand.",
        },
        {
          title: "Merch as proof",
          body: "Turn attention into something physical that funds the next shoot.",
        },
        {
          title: "Campus presence",
          body: "Make the brand visible in real life, not only in the feed.",
        },
      ],
    },
    problem: {
      label: "Problem",
      title: "Inspiration was missing from the first-year experience.",
      body: "Campus life can flatten curiosity. Without a clear outdoor culture nearby, people default indoors - even when they want adventure.",
    },
    opportunity: {
      label: "Opportunity",
      title: "Build the missing outdoor signal.",
      body: "A brand that documents exploration can create belonging for people who want out - and become a campus identity marker along the way.",
    },
    solution: {
      label: "Solution",
      title: "Destination Drifters: media + merch for the outdoors-curious.",
      body: "A social and merchandise brand rooted in outdoor photography, travel storytelling, and campus-recognizable design.",
    },
    approach: {
      label: "What shipped",
      title: "From feed to physical brand.",
      pillars: [
        {
          title: "Adventure photography",
          body: "Visual stories that feel close enough to copy this weekend.",
        },
        {
          title: "Guides & journaling",
          body: "Content that helps people plan - not just scroll.",
        },
        {
          title: "Custom merch",
          body: "Designs people wear as identity, turning customers into distribution.",
        },
      ],
    },
    outcome: {
      label: "Outcome",
      title: "Attention that converted.",
      pillars: [
        {
          title: "1M+ views",
          body: "Reach that proved the story traveled beyond campus.",
        },
        {
          title: "$3,500 in merch",
          body: "Early monetization without diluting the brand voice.",
        },
        {
          title: "Campus recognition",
          body: "A brand people knew on sight.",
        },
      ],
    },
    reflection: {
      label: "Reflection",
      title: "What I learned",
      pillars: [
        {
          title: "Start with the feeling you wish existed.",
          body: "The best brands often begin as a personal gap - then scale because others share it.",
        },
        {
          title: "Merch is messaging.",
          body: "Physical goods only work when they say something people already believe.",
        },
      ],
    },
    technologies: ["React", "Instagram Business", "Adobe Suite"],
    screenshots: [
      "/brands/drifters/hero.png",
      "/brands/drifters/journal.png",
      "/brands/drifters/3-shot.jpeg",
      "/brands/drifters/ever-to-explore.jpeg",
      "/brands/drifters/mary-claire.jpeg",
      "/brands/drifters/instagram.jpg",
    ],
  },
];

export function getStartupBySlug(slug: string): Startup | undefined {
  return startups.find((startup) => startup.slug === slug);
}

export function getAllStartupSlugs(): string[] {
  return startups.map((startup) => startup.slug);
}
