"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { startups, type Startup } from "@/data/startups";
import { BLUR_DATA_URL } from "@/lib/blur";
import { startupQuips } from "@/lib/cursorQuips";

const FEATURED_STARTUP_NAMES = ["Club Pack", "Happy Mile Run Club", "Mod Brew"];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const FeaturedStartups = () => {
  const shouldReduceMotion = useReducedMotion();
  const featuredStartups = FEATURED_STARTUP_NAMES.map((name) =>
    startups.find((s) => s.name === name)
  ).filter((s): s is Startup => s != null);

  return (
    <section className="py-16 px-4 md:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease, delay: shouldReduceMotion ? 0 : 0.07 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Startups
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clubs and startups brought to life through community, product, and storytelling
          </p>
        </motion.div>

        {/* Startups Grid - image as card, text separate (same pattern as project cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredStartups.map((startup, index) => (
            <motion.div
              key={startup.name}
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.33,
                ease,
                delay: shouldReduceMotion ? 0 : 0.13 + index * 0.067,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/startups/${startup.slug}`}
                data-cursor-quip={startupQuips[startup.slug]}
                className="flex flex-col w-full text-left transform-gpu transition-[transform] duration-300 ease-out hover:-translate-y-1 group"
              >
                {/* Image Card - distinct visual card with rounded corners and subtle styling */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30 aspect-video shadow-[0_2px_12px_hsl(0_0%_0%_/_0.08)] transition-shadow duration-300 group-hover:shadow-lg">
                  {startup.screenshots && startup.screenshots.length > 0 ? (
                    <Image
                      src={startup.screenshots[0]}
                      alt={startup.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        <Image
                          src={startup.logo}
                          alt={startup.name}
                          fill
                          className="object-contain"
                          sizes="112px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Text and details - separate from image card */}
                <div className="mt-5 flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {startup.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {startup.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View startup
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.33, ease, delay: shouldReduceMotion ? 0 : 0.33 }}
        >
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm hover:shadow-md"
          >
            View All Startups
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStartups;
