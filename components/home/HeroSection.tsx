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
        pathLength: { delay: custom, duration: 1.2, ease: "easeInOut" },
        opacity: { delay: custom, duration: 0.25, ease: "easeOut" },
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
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen flex flex-col items-center overflow-hidden bg-background ${
        isMobile ? "px-6 py-16" : "px-20 py-16"
      }`}
    >
      {/* Header Content */}
      <div className="w-full text-center mb-16 md:mb-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-bold text-foreground leading-[1.1] tracking-tight text-5xl md:text-7xl lg:text-8xl xl:text-9xl px-4 md:px-8">
            William Armstrong
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mt-6 text-xl md:text-2xl lg:text-3xl font-medium italic">
              Product Engineer with a focus on human-centered design
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Diagram Section - stack vertically below lg so cards don't overlap center image */}
      <div className="w-full max-w-7xl relative mx-auto">
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
              Next.js • Edge • Performance
            </p>

            <p className="text-muted-foreground/80 text-sm md:text-[15px] leading-relaxed mt-3">
              Static-first and edge-rendered systems built for reliability,
              speed, and real-world tradeoffs.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Rendering", "Caching", "DX"].map((t) => (
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
          <div ref={imageWrapperRef} className="relative z-20 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72"
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
              Demos • Enablement • Outcomes
            </p>

            <p className="text-muted-foreground/80 text-sm md:text-[15px] leading-relaxed mt-3">
              I translate technical value into clear stories so teams ship,
              adopt, and grow with confidence.
            </p>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {["Demos", "Onboarding", "Alignment"].map((t) => (
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

        {/* SVG Animated Lines - only when side-by-side (lg and up) */}
        {isValid && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible hidden lg:block"
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
