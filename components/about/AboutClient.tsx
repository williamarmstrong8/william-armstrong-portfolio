"use client";

import Link from "next/link";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import AboutCard from "@/components/AboutCard";
import Timeline from "@/components/Timeline";

export default function AboutClient() {
  // About cards data (do not change)
  const aboutCards = [
    {
      title: "Solutions Engineer",
      description:
        "Build technical solutions that bridge product and business: integrations, automation, and architecture. Translate complex systems into clear outcomes for customers.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Entrepreneur",
      description:
        "Founder building early-stage products with a systems mindset: vision, roadmap, and end-to-end delivery. Technical strategy and product go hand in hand; I own both sides.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Leader",
      description:
        "Led 60+ person teams and owned end-to-end operational execution. Turn high-level strategy into measurable outcomes through systems, tracking, and accountability.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  // Education timeline data (kept, but not rendered)
  const educationItems = [
    {
      title: "Boston College",
      subtitle:
        "Bachelor of Science in Human-Centered Engineering, Minor in General Business",
      date: "August 2022 – May 2026",
      description:
        "Relevant courses include Machine Learning & Statistical Data Analysis, Computation and Programming, Circuits, Physical Modeling and Lab Analysis, Statics and Mechanics, Marketing, Engineering for Society, and Thermodynamics. Emphasizing Jesuit education blending rigorous academics with social responsibility and community impact.",
    },
    {
      title: "Saint Ignatius College Preparatory",
      subtitle: "High School Diploma",
      date: "2018 – 2022",
      description:
        "Graduated from a Jesuit high school in San Francisco known for academic excellence and its focus on developing leaders dedicated to service and justice.",
    },
  ];

  // Experience timeline data (keep + render)
  const experienceItems = [
    {
      title: "Vercel",
      subtitle: "Solutions Architect",
      date: "2026 – Present",
      description:
        "Partnering with customers to design and ship production systems on the Vercel platform: architecture guidance, integrations, and workflows that connect product, engineering, and business outcomes.",
    },
    {
      title: "AdviserGPT",
      subtitle: "Solutions Engineer",
      date: "May 2025 – Present",
      description:
        "Architecting the end-to-end technical platform: website and resource hub for customer acquisition, AI-powered enrichment and automation (n8n, Supabase, Slack), and integration pipelines that capture, enrich, classify, and deliver context-rich data to the team.",
    },
    {
      title: "ClubPack",
      subtitle: "Founder",
      date: "May 2025 – Present",
      description:
        "Founded and built a multi-tenant SaaS platform for student and social clubs, serving 25+ active organizations. Own product vision and roadmap; designed UX and shipped end-to-end flows with React, Supabase, and Tailwind, iterating directly from user feedback. Selected for the Boston College Shea Accelerator and awarded $1,500 in funding.",
    },
    {
      title: "Mark Farrell for Mayor Campaign",
      subtitle: "Operations & Strategy Lead",
      date: "May 2024 – August 2024",
      description:
        "Led and trained a 60+ person intern team across field and digital outreach, owning scheduling, resource allocation, and daily operations. Designed data-driven workflows and tracking systems to prioritize high-impact activities, improving campaign efficiency by ~30%. Translated leadership strategy into day-to-day execution under shifting constraints.",
    },
    {
      title: "Orangetheory Fitness",
      subtitle: "Growth & Operations Associate",
      date: "June 2023 – August 2023",
      description:
        "Onboarded 20+ new members through targeted outreach and personalized fitness assessments, supporting studio growth and retention. Improved onboarding flows and messaging by partnering with coaches and associates and incorporating customer feedback to increase conversion and overall member experience.",
    },
  ];

  // Entrepreneur/Club activities data (keep + render)
  const entrepreneurItems = [
    {
      title: "Soaring Startup Circle Venture",
      subtitle: "Senior Analyst",
      date: "August 2024 – May 2025",
      description:
        "Supported early-stage teams with prototyping, positioning, and go-to-market thinking. Helped translate ideas into testable MVPs through structured feedback, venture workshops, and iteration cycles.",
    },
    {
      title: "West End House Boys and Girls Club",
      subtitle: "Volunteer",
      date: "August 2023 – June 2024",
      description:
        "Mentored youth in an after-school program by building a consistent, high-energy learning environment. Designed activities around shared interests and supported growth through relationship-building and structured routines.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        {/* Page Title */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.07,
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.47,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.13,
            }}
          >
            About Me
          </motion.h1>
        </motion.section>

        {/* About Cards (unchanged) */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.4,
          }}
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.27,
                  delay: 0.47 + index * 0.067,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <AboutCard
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </motion.div>
          ))}
        </motion.section>

        {/* Restructured Timeline: Work Experience Only */}
        <motion.div
          className="space-y-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.6,
          }}
        >
          <Timeline
            title="Work Experience"
            icon={<Briefcase className="size-8" strokeWidth={2} />}
            items={experienceItems}
          />

          <Timeline
            title="Education"
            icon={<GraduationCap className="size-8" strokeWidth={2} />}
            items={educationItems}
          />

          <Timeline
            title="Leadership & Service"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            items={entrepreneurItems}
          />
        </motion.div>

        {/* Call to Action (unchanged) */}
        <motion.section
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.33,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 1.2,
          }}
        >
          <motion.div
            className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.27,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.27,
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <motion.h2
              className="text-3xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.27,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.33,
              }}
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.27,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.4,
              }}
            >
              I&apos;m always interested in new opportunities, collaborations, and
              meaningful projects. Let&apos;s connect and build something amazing
              together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.27,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.47,
              }}
            >
              <Link href="/contact">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105">
                  Get In Touch
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
