"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useElementLines } from "@/hooks/useElementLines";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const leftNodeRef = useRef<HTMLDivElement>(null);
  const rightNodeRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const { leftLine, rightLine, isValid } = useElementLines(
    leftNodeRef,
    rightNodeRef,
    imageWrapperRef,
    containerRef
  );

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: custom, duration: 0.8, ease: "easeInOut" },
        opacity: { delay: custom, duration: 0.17, ease: "easeOut" },
      },
    }),
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom,
        duration: 0.47,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-[clamp(1rem,3.5vh,2.5rem)] pb-[clamp(2rem,5vh,4rem)] ${
        isMobile ? "px-6" : "px-20"
      }`}
    >
      {/* Header Content */}
      <div className="w-full text-center mb-[clamp(3rem,9vh,7rem)] z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.53, ease: "easeOut" }}
        >
          <h1 className="font-bold text-foreground leading-[1.05] tracking-tight text-[clamp(2.25rem,min(8.5vw,13vh),7.5rem)] px-4 md:px-8">
            William Armstrong
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground/80 mt-[clamp(0.5rem,1.5vh,0.9rem)] text-[clamp(0.9rem,min(1.6vw,2.2vh),1.0625rem)] font-medium">
              Launched 4 startups
              <span className="mx-2 text-muted-foreground/40" aria-hidden>•</span>
              automated a $50k workflow
              <span className="mx-2 text-muted-foreground/40" aria-hidden>•</span>
              2M+ community engagement
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.53, duration: 0.67 }}
              className="mt-[clamp(1rem,3vh,2rem)] flex flex-wrap justify-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href="/startups">View Startups</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base font-semibold transition-all duration-300"
              >
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Diagram Section - stack vertically below lg so cards don't overlap center image */}
      <div ref={containerRef} className="w-full max-w-7xl relative mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 relative z-10 md:px-0">
          {/* Left Node: Engineering */}
          <motion.div
            ref={leftNodeRef}
            variants={nodeVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.25}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 w-full lg:w-[360px] xl:w-[380px] p-6"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-60" />

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
                <div className="absolute -inset-2 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-foreground font-semibold tracking-tight text-xl">
                Engineering
              </h3>
            </div>

            <p className="text-muted-foreground text-sm md:text-base font-medium mt-2">
              Systems • Integrations • Architecture
            </p>

            <p className="text-muted-foreground/80 text-sm md:text-[15px] leading-relaxed mt-3">
              APIs, workflows, and integrations that connect platforms and solve complex technical problems.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["APIs", "Data", "Workflows"].map((t) => (
                <span
                  key={t}
                  className="text-xs md:text-[13px] px-2.5 py-1 rounded-full border border-border bg-background/30 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/50 mt-5 font-semibold group-hover:text-primary/70 transition-colors">
              Systems Layer
            </div>
          </motion.div>

          {/* Center Image - Centered Focal Point (✅ fixed hover) */}
          <div ref={imageWrapperRef} className="relative z-20 group" data-cursor-quip="that's me">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative w-[clamp(9rem,min(22vw,28vh),18rem)] h-[clamp(9rem,min(22vw,28vh),18rem)]"
            >
              {/* Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden bg-muted">
                <Image
                  src="/william.png"
                  alt="William Armstrong"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02]"
                />
              </div>

              {/* Frame (visual only; does not block hover) */}
              <div className="pointer-events-none absolute inset-0 rounded-full border-[6px] border-background shadow-2xl z-10" />

              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
              </div>

              {/* Decorative subtle rings */}
              <div className="pointer-events-none absolute -inset-4 border border-primary/5 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="pointer-events-none absolute -inset-8 border border-primary/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            </motion.div>

            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[80px] -z-10 rounded-full" />
          </div>

          {/* Right Node: People + Business */}
          <motion.div
            ref={rightNodeRef}
            variants={nodeVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.4}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 w-full lg:w-[360px] xl:w-[380px] p-6 text-right items-end"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-60" />

            <div className="flex items-center gap-3">
              <h3 className="text-foreground font-semibold tracking-tight text-xl">
                People + Business
              </h3>
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
                <div className="absolute -inset-2 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base font-medium mt-2">
              Strategy • Solutions • Communication
            </p>

            <p className="text-muted-foreground/80 text-sm md:text-[15px] leading-relaxed mt-3">
              Translating technical complexity into clear solutions for stakeholders and customers.
            </p>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {["Discovery", "Fit", "Delivery"].map((t) => (
                <span
                  key={t}
                  className="text-xs md:text-[13px] px-2.5 py-1 rounded-full border border-border bg-background/30 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/50 mt-5 font-semibold group-hover:text-primary/70 transition-colors">
              Experience Layer
            </div>
          </motion.div>
        </div>

        {/* SVG Animated Lines - orientation-aware so they draw on every screen size */}
        {isValid && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <motion.path
              d={`M ${leftLine.x1} ${leftLine.y1} L ${leftLine.x2} ${leftLine.y2}`}
              fill="transparent"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={lineVariants}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              animate="visible"
              custom={0.9}
            />
            <motion.path
              d={`M ${rightLine.x1} ${rightLine.y1} L ${rightLine.x2} ${rightLine.y2}`}
              fill="transparent"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={lineVariants}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              animate="visible"
              custom={1.05}
            />
          </svg>
        )}
      </div>
    </main>
  );
};

export default HeroSection;
