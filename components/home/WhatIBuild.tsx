"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Sparkles, Zap, LayoutTemplate, Hammer, Rocket, User, Box, GitMerge } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── ExecutionCard (First Card) ───────────────────────────────────────────────

function ExecutionCard() {
  const shouldReduceMotion = useReducedMotion();

  const TOTAL_DURATION = 6;

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 md:col-span-2 h-full min-h-[300px] hover:border-primary/20 transition-colors"
      aria-label="Concept to Launch: Full lifecycle ownership from abstract requirements to shipped products"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 mb-8 md:w-2/3">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-muted/50 rounded-lg border border-border">
            <Zap className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Velocity</span>
        </div>
        <h3 className="text-2xl font-medium text-foreground leading-tight">Concept to Launch</h3>
        <p className="text-neutral-500 dark:text-muted-foreground text-sm mt-3 leading-relaxed">
        Full lifecycle execution. I turn raw concepts into live products, driving momentum from the first whiteboard sketch to the final deploy.
        </p>
      </div>

      {/* The Visual Pipeline */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0 mt-auto px-2">
        {/* Step 1: Concept */}
        <div className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10">
          <div className="w-14 h-14 rounded-full bg-background border border-border shadow-sm flex items-center justify-center relative">
            <LayoutTemplate className="w-6 h-6 text-muted-foreground" />
            {!shouldReduceMotion && (
              <motion.div
                animate={{ boxShadow: ["0 0 0 0px hsl(var(--ring) / 0)", "0 0 0 6px hsl(var(--ring) / 0.2)", "0 0 0 0px hsl(var(--ring) / 0)"] }}
                transition={{ duration: TOTAL_DURATION, times: [0, 0.1, 0.2], repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-ring/30"
              />
            )}
          </div>
          <div className="flex flex-col md:items-center md:text-center">
            <span className="text-sm font-semibold text-foreground">System Design</span>
            <span className="text-[10px] text-muted-foreground">Blueprint</span>
          </div>
        </div>

        {/* Connection 1: Desktop */}
        <div className="hidden md:block flex-1 h-0.5 bg-border mx-4 relative overflow-hidden min-w-[20px]">
          {!shouldReduceMotion && (
            <motion.div
              animate={{ width: ["0%", "100%", "100%", "0%"] }}
              transition={{ duration: TOTAL_DURATION, times: [0, 0.25, 0.9, 1], repeat: Infinity, ease: "linear" as const }}
              className="h-full bg-ring absolute left-0 top-0"
            />
          )}
        </div>
        {/* Connection 1: Mobile */}
        <div className="absolute left-7 top-14 h-20 w-0.5 bg-border md:hidden overflow-hidden">
          {!shouldReduceMotion && (
            <motion.div
              animate={{ height: ["0%", "100%", "100%", "0%"] }}
              transition={{ duration: TOTAL_DURATION, times: [0, 0.25, 0.9, 1], repeat: Infinity, ease: "linear" as const }}
              className="w-full bg-ring"
            />
          )}
        </div>

        {/* Step 2: Build */}
        <div className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10">
          <div className="w-14 h-14 rounded-full bg-background border border-border shadow-sm flex items-center justify-center overflow-hidden">
            {!shouldReduceMotion ? (
              <motion.div
                animate={{
                  rotate: [0, -15, 0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: TOTAL_DURATION, times: [0.25, 0.3, 0.35, 0.4, 0.5], repeat: Infinity }}
              >
                <Hammer className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            ) : (
              <Hammer className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col md:items-center md:text-center">
            <span className="text-sm font-semibold text-foreground">Rapid Build</span>
            <span className="text-[10px] text-muted-foreground">Iteration</span>
          </div>
        </div>

        {/* Connection 2: Desktop */}
        <div className="hidden md:block flex-1 h-0.5 bg-border mx-4 relative overflow-hidden min-w-[20px]">
          {!shouldReduceMotion && (
            <motion.div
              animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
              transition={{ duration: TOTAL_DURATION, times: [0, 0.5, 0.75, 0.95, 1], repeat: Infinity, ease: "linear" as const }}
              className="h-full bg-ring absolute left-0 top-0"
            />
          )}
        </div>
        {/* Connection 2: Mobile */}
        <div className="absolute left-7 top-[150px] h-20 w-0.5 bg-border md:hidden overflow-hidden">
          {!shouldReduceMotion && (
            <motion.div
              animate={{ height: ["0%", "0%", "100%", "100%", "0%"] }}
              transition={{ duration: TOTAL_DURATION, times: [0, 0.5, 0.75, 0.95, 1], repeat: Infinity, ease: "linear" as const }}
              className="w-full bg-ring"
            />
          )}
        </div>

        {/* Step 3: Launch */}
        <div className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10">
          <div className="w-14 h-14 rounded-full bg-foreground border border-border shadow-lg flex items-center justify-center">
            {!shouldReduceMotion ? (
              <motion.div
                animate={{
                  scale: [1, 1, 1.25, 1],
                  color: ["hsl(var(--primary-foreground))", "hsl(var(--primary-foreground))", "hsl(var(--ring))", "hsl(var(--primary-foreground))"],
                }}
                transition={{ duration: TOTAL_DURATION, times: [0, 0.75, 0.85, 1], repeat: Infinity }}
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
            ) : (
              <Rocket className="w-6 h-6 text-primary-foreground" />
            )}
          </div>
          <div className="flex flex-col md:items-center md:text-center">
            <span className="text-sm font-semibold text-foreground">Market Launch</span>
            <span className="text-[10px] text-muted-foreground">Shipped</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-ring/20 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

// ─── HumanCentricCard (Third Card) ────────────────────────────────────────────

function HumanCentricCard() {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border p-6 h-full min-h-[300px] md:col-span-1 hover:border-primary/20 transition-colors"
      aria-label="The Connector: Bridging human needs and tangible solutions"
    >
      {/* Background: geometric texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-muted/50 rounded-md border border-border">
            <GitMerge className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Strategy</span>
        </div>
        <h3 className="text-xl font-medium text-foreground">The Connector</h3>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          I bridge the gap between human needs and tangible solutions. I ensure the product, whether code or community, actually solves the problem.
        </p>
      </div>

      {/* Visual: People <-> Product */}
      <div className="relative z-10 flex-1 flex items-center justify-center mt-6">
        <div className="flex items-center gap-6">
          {/* Human side */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center shadow-sm">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Needs</span>
          </div>

          {/* Connection */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="h-[1px] w-12 bg-ring/40 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-ring rounded-full" />
            </div>
            <span className="text-[9px] font-mono text-ring font-medium">FIT</span>
          </div>

          {/* Product side */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-foreground border border-border flex items-center justify-center shadow-lg">
              <Box className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground">Solution</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CommunityCard (Fourth Card) ──────────────────────────────────────────────

function CommunityCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col justify-between hover:border-primary/20 transition-colors"
      aria-label="Community & Growth: Building digital ecosystems that scale"
    >
      {/* Background: Abstract network pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="community-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#community-grid)" />
        </svg>
      </div>

      {/* Floating orbs */}
      {!shouldReduceMotion && (
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[20%] w-24 h-24 bg-primary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          />
        </div>
      )}

      {/* Top content */}
      <div className="relative z-10 mb-6 md:mb-8">
        <div className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center mb-4 text-muted-foreground">
          <Globe className="w-5 h-5" />
        </div>
        <h3 className="text-xl md:text-2xl font-medium text-foreground">Community & Growth</h3>
        <p className="text-muted-foreground mt-2 max-w-md leading-relaxed text-sm md:text-base">
          Building digital ecosystems that scale. I turn passive audiences into active movements through product-led storytelling.
        </p>
      </div>

      {/* Metrics */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">2M</span>
            <span className="text-primary font-bold text-lg">+</span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">Engagement</span>
        </div>
        <div className="flex flex-col border-l border-border/50 pl-4 md:pl-8">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">3k</span>
            <span className="text-primary font-bold text-lg">+</span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">Members</span>
        </div>
        <div className="flex flex-col border-l border-border/50 pl-4 md:pl-8">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">1k</span>
            <span className="text-primary font-bold text-lg">+</span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">Customers</span>
        </div>
      </div>
    </div>
  );
}

// ─── EngineeringCard (Second Card) ────────────────────────────────────────────


function EngineeringCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 md:col-span-1 h-full min-h-[300px] hover:border-primary/20 transition-colors"
      aria-label="Engineering the New Standard: Traditional coding meets modern AI velocity"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="engineering-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#engineering-grid)" />
        </svg>
      </div>

      {/* Code editor visual */}
      <div className="relative z-10 mt-2 md:mt-3 mb-4">
        <div className="rounded-lg bg-neutral-950 border border-white/10 p-4 font-mono text-xs leading-relaxed shadow-2xl overflow-hidden">
          <div className="flex gap-1.5 mb-3 opacity-50" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
          </div>
          <div className="text-neutral-400">
            <span className="text-purple-400">const</span> <span className="text-yellow-200">Product</span> = () ={">"} {'{'}
          </div>
          <div className="pl-4 text-neutral-400">
            <span className="text-neutral-500">{'// Modern Foundations'}</span>
          </div>
          <div className="pl-4 text-ring">
            {'<'}NextImage <span className="text-neutral-400">src=</span>... {'/>'}
          </div>
          <div className="pl-4 mt-1 relative">
            <div className="absolute inset-0 -mx-4 border-l-2 border-ring bg-ring/20 blur-[1px]" aria-hidden="true" />
            <span className="text-white relative z-10 flex items-center gap-2">
              {'<'}AI_Optimization {'/>'}
              {!shouldReduceMotion && <Sparkles className="w-3 h-3 text-ring animate-pulse" aria-hidden="true" />}
            </span>
          </div>
          <div className="text-neutral-400">{'}'}</div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-foreground mb-2">
          Engineering the
          <br />
          New Standard
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          I combine new age coding fundamentals with modern AI velocity. Building production apps while teaching others the craft.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "Cursor", "TypeScript"].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-[10px] uppercase tracking-wider font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const WhatIBuild = () => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -4,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="what-i-build"
      className={`bg-background py-16 ${isMobile ? "px-6" : "px-20"}`}
      aria-labelledby="bento-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          id="bento-heading"
          className="sr-only"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          What I Build
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ gridAutoRows: "minmax(300px, auto)" }}
        >
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-2">
            <ExecutionCard />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <EngineeringCard />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <HumanCentricCard />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-2">
            <CommunityCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIBuild;
