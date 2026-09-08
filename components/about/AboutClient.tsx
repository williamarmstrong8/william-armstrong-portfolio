"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { BLUR_DATA_URL } from "@/lib/blur";
import { EASE } from "@/lib/motion";

const photos = [
  { src: "/about-me.jpg", alt: "William Armstrong", offset: false },
  { src: "/brands/happy-mile/gathering.jpeg", alt: "Happy Mile Run Club gathering", offset: true },
  { src: "/brands/modbrew/wide.jpeg", alt: "Mod Brew pop-up", offset: false },
  { src: "/brands/happy-mile/group.jpeg", alt: "Happy Mile runners", offset: true },
];

const experience = [
  { role: "Solutions Architect", place: "Vercel", years: "2026 - Present" },
  { role: "Solutions Engineer", place: "AdviserGPT", years: "2025 - Present" },
  { role: "Founder", place: "ClubPack", years: "2025 - Present" },
  { role: "Operations & Strategy Lead", place: "Mark Farrell for Mayor", years: "2024" },
  { role: "Growth & Operations Associate", place: "Orangetheory Fitness", years: "2023" },
];

const service = [
  { role: "Senior Analyst", place: "Soaring Startup Circle Venture", years: "2024 - 2025" },
  { role: "Volunteer", place: "West End House Boys and Girls Club", years: "2023 - 2024" },
];

const education = [
  { role: "B.S. Human-Centered Engineering, Minor in General Business", place: "Boston College", years: "2022 - 2026" },
  { role: "High School Diploma", place: "Saint Ignatius College Preparatory", years: "2018 - 2022" },
];

function RowList({
  title,
  rows,
  reduce,
  delay,
}: {
  title: string;
  rows: { role: string; place: string; years: string }[];
  reduce: boolean;
  delay: number;
}) {
  return (
    <motion.section
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : delay }}
    >
      <h2 className="mb-6 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
        {title}
      </h2>
      <div className="border-t border-border">
        {rows.map((row) => (
          <div
            key={row.place}
            className="grid grid-cols-1 gap-0.5 border-b border-border py-4 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6 md:py-5"
          >
            <p className="text-base text-foreground md:text-lg">
              {row.role}
              <span className="text-muted-foreground"> - {row.place}</span>
            </p>
            <p className="text-xs text-muted-foreground/70 md:text-sm">{row.years}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default function AboutClient() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-6 pt-8 pb-24 md:px-20 md:pb-32">
        <PageHeader title="About" subtitle="William Armstrong" />

        {/* Photo grid leads the page */}
        <motion.section
          className="mb-16 grid grid-cols-2 gap-3 md:mb-24 md:grid-cols-4 md:gap-4"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : 0.27 }}
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`relative aspect-[3/4] w-full overflow-hidden bg-muted ${photo.offset ? "md:mt-10" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          ))}
        </motion.section>

        {/* One short bio */}
        <motion.section
          className="mb-20 max-w-3xl md:mb-28"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
        >
          <p className="font-serif text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.35] tracking-tight text-foreground">
            Solutions engineer and founder. I build the systems that connect
            product, engineering, and business - and communities that turn
            audiences into something real. Currently a Solutions Architect at
            Vercel.
          </p>
        </motion.section>

        <div className="space-y-16 md:space-y-24">
          <RowList title="Experience" rows={experience} reduce={reduce} delay={0} />
          <RowList title="Leadership & Service" rows={service} reduce={reduce} delay={0} />
          <RowList title="Education" rows={education} reduce={reduce} delay={0} />
        </div>

        <motion.section
          className="mt-20 md:mt-28"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-serif text-3xl tracking-tight text-foreground md:text-5xl"
          >
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">
              Get in touch
            </span>
            <ArrowUpRight
              className="h-[0.7em] w-[0.7em] text-muted-foreground/50 transition-colors group-hover:text-foreground"
              strokeWidth={1.5}
            />
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
