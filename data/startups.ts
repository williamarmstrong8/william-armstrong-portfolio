import type { Metric, ShowcaseSectionData } from "@/types/showcase";

export interface Startup extends ShowcaseSectionData {
  name: string;
  logo: string;
  description: string;
  category: string;
  status: "Active" | "Launched" | "In Beta" | "In Funding";
  metrics: Metric[];
  website: string;
  longDescription?: string;
  screenshots?: string[];
}

export const startups: Startup[] = [
  {
    name: "Club Pack",
    logo: "/clubpack_logo.svg",
    description: "A SaaS platform that solves the fragmented software problem for social club founders. ClubPack centralizes everything needed to run a club - from event creation and RSVP management to custom websites and analytics - all in one place.",
    category: "Sports & Community",
    status: "In Funding",
    metrics: [
      { label: "Clubs Trialing", value: "25+" },
      { label: "Funding Raised", value: "$36,500" }
    ],
    website: "https://www.joinclubpack.com/",
    longDescription: "ClubPack is a comprehensive SaaS platform designed specifically for social club founders and managers. It addresses the core problem of fragmented club management by providing a unified solution that handles everything from event planning and RSVP tracking to custom website creation and detailed analytics. The platform streamlines club operations, reduces administrative overhead, and provides valuable insights to help clubs grow and thrive.",
    technologies: ["Next.js 16", "Node.js", "Supabase", "Stripe API"],
    screenshots: [
      "/brands/clubpack/clubpack.png",
      "/brands/clubpack/screenshot.png"
    ],
    accomplishments: [
      "25+ clubs currently in trial phase",
      "$36,500 in pre-seed funding secured",
      "Featured in Boston College entrepreneurship showcase"
    ],
    features: [
      "Event creation and RSVP management",
      "Custom website builder",
      "Member analytics dashboard",
      "Automated communication tools",
      "Payment processing integration"
    ]
  },
  {
    name: "Mod Brew",
    logo: "/modbrew_logo.svg",
    description: "A speakeasy-style coffee pop-up that disrupted campus coffee culture by offering premium quality coffee at student-friendly prices. ModBrew created an exclusive, in-the-know brand that became a campus phenomenon within a week.",
    category: "Coffee & Lifestyle",
    status: "Active",
    metrics: [
      { label: "Customers", value: "1000+" },
      { label: "Per Pop-up", value: "$300-400" }
    ],
    website: "https://modbrew.vercel.app/",
    longDescription: "ModBrew revolutionized campus coffee culture by introducing a speakeasy-style coffee experience. What started as a freshman year entrepreneurial experiment quickly became a campus sensation, serving over 1000 customers and generating significant revenue through strategic pop-up locations and premium pricing strategy.",
    technologies: ["Vercel", "Next.js", "Social Media Marketing", "Instagram Branding", "Canva"],
    screenshots: [
      "/brands/modbrew/wide.jpeg",
      "/brands/modbrew/line1.jpeg",
      "/brands/modbrew/line2.jpeg",
      "/brands/modbrew/shop.jpeg",
      "/brands/modbrew/shop2.jpeg",
      "/brands/modbrew/group.jpeg",
      "/brands/modbrew/hand.jpeg",
      "/brands/modbrew/window.jpeg",
      "/brands/modbrew/hub.png",
      "/brands/modbrew/mary.jpeg"
    ],
    accomplishments: [
      "Served 1000+ customers in first semester",
      "$300-400 profit per pop-up event",
      "Campus-wide brand recognition within one week",
      "Aquired school-wide funding"
    ],
    features: [
      "Premium coffee selection",
      "Speakeasy-style branding",
      "Strategic location selection",
      "Social media marketing",
    ]
  },
  {
    name: "Happy Mile Run Club",
    logo: "/happymile_logo.svg",
    description: "A viral San Francisco run club that filled the gap for free, fun, young, and social running communities. HappyMile leveraged social media to create partnerships with local businesses, offering free benefits to members while building a thriving community.",
    category: "Health & Wellness",
    status: "Launched",
    metrics: [
      { label: "Members", value: "3,000+" },
      { label: "Partnership", value: "Nike" }
    ],
    website: "https://happymilerc.com/",
    longDescription: "HappyMile emerged from the need for accessible, social running communities in San Francisco. By combining fitness with community building, the club created a viral movement that attracted over 100 weekly participants and secured major brand partnerships including Nike. The club's success demonstrates the power of combining passion projects with strategic business development.",
    technologies: ["Squarespace", "Strava", "Social Media Marketing", "Brand Partnerships", "SF Wide Community Awareness"],
    screenshots: [
      "/brands/happy-mile/gathering.jpeg",
      "/brands/happy-mile/community.jpeg",
      "/brands/happy-mile/pickle-ball.jpeg",
      "/brands/happy-mile/more-runners-2.jpeg",
      "/brands/happy-mile/runners-more.jpeg",
      "/brands/happy-mile/runner-brdige.jpeg",
      "/brands/happy-mile/merch.jpeg"
    ],
    accomplishments: [
      "100+ weekly active runners",
      "Nike partnership secured",
      "Featured in local San Francisco media",
      "Multiple business sponsorships",
      "Community expansion to other cities"
    ],
    features: [
      "Weekly group runs",
      "Social media community building",
      "Business partnership program",
      "Free member benefits",
      "Event photography and highlights"
    ]
  },
  {
    name: "Destination Drifters",
    logo: "/drifters_logo.svg",
    description: "An outdoor travel brand I created freshman year of college to inspire people and share my love for the outdoors. I saw a lack of outdoor inspiration in my first year and built this social media and merchandise brand that became a recognizable staple on campus.",
    category: "Travel & Adventure",
    status: "Launched",
    metrics: [
      { label: "Views", value: "1M+" },
      { label: "Merchandise Sales", value: "$3,500" }
    ],
    website: "https://destinationdrifters.com/",
    longDescription: "Destination Drifters was born from my freshman year experience and the lack of outdoor inspiration content. Starting as a personal blog and Instagram account, it evolved into a full brand with merchandise sales and campus-wide recognition. The brand successfully monetized through merchandise and built a community of outdoor enthusiasts.",
    technologies: ["React", "Instagram Business", "Adobe Suite"],
    screenshots: [
      "/brands/drifters/3-shot.jpeg",
      "/brands/drifters/hero.png",
      "/brands/drifters/instagram.jpg",
      "/brands/drifters/ever-to-explore.jpeg",
      "/brands/drifters/journal.png",
      "/brands/drifters/mary-claire.jpeg"
    ],
    accomplishments: [
      "1M+ views accumulated",
      "$3,500 in merchandise sales",
      "Campus-wide brand recognition"
    ],
    features: [
      "Outdoor adventure photography",
      "Travel blogging and guides",
      "Custom merchandise design",
      "Social media content creation",
      "Community building and engagement"
    ]
  }
];
