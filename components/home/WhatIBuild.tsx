"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Globe, Layers3, Server, Database, Terminal, Code2, Bug, ArrowUpRight, Braces, Cpu } from "lucide-react";

// ─── ArchitectureCard (First Card) ────────────────────────────────────────────

function ArchitectureCard() {
  const shouldReduceMotion = useReducedMotion();
  const layers = [
    { title: "Frontend", detail: "React · Next.js", icon: Globe },
    { title: "Compute", detail: "APIs · Streaming", icon: Server },
    { title: "Data & AI", detail: "Models · Databases", icon: Database },
  ];

  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-card border border-border p-6 md:p-8 h-full min-h-[300px] hover:border-primary/20 transition-colors">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mb-10 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-muted/50 border border-border">
            <Layers3 className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Solutions Architect · Vercel</span>
        </div>
        <h3 className="text-2xl font-medium text-foreground leading-tight">Architecture to Production</h3>
        <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
          At Vercel, I help teams design and ship production web and AI applications.
          I work across rendering, caching, APIs, and infrastructure to connect architectural decisions to real product requirements.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-auto">
        {layers.map(({ title, detail, icon: Icon }, index) => (
          <div key={title} className="relative flex md:flex-col items-center gap-4 md:gap-3">
            {index < layers.length - 1 && (
              <div aria-hidden="true" className="absolute left-7 top-14 h-8 w-px bg-border md:left-[calc(50%+2.5rem)] md:top-7 md:h-px md:w-[calc(100%-3.5rem)] overflow-hidden">
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-foreground origin-top md:origin-left"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, delay: index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
            )}
            <div className={`w-14 h-14 shrink-0 border border-border flex items-center justify-center ${index === layers.length - 1 ? "bg-foreground text-primary-foreground" : "bg-background text-muted-foreground"}`}>
              <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col md:items-center md:text-center">
              <span className="text-sm font-semibold text-foreground">{title}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ImplementationCard (Third Card) ──────────────────────────────────────────

function ImplementationCard() {
  const steps = [
    { title: "Prototype", detail: "Make the idea tangible", icon: Code2 },
    { title: "Debug", detail: "Find the actual constraint", icon: Bug },
    { title: "Ship", detail: "Turn the proof into a product", icon: ArrowUpRight },
  ];

  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-card border border-border p-6 h-full min-h-[300px] hover:border-primary/20 transition-colors">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-muted/50 border border-border">
            <Terminal className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Implementation</span>
        </div>
        <h3 className="text-xl font-medium text-foreground">Hands-On Engineering</h3>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          I stay close to the code. I build prototypes, investigate failures, and turn an architectural plan into a working implementation.
        </p>
      </div>

      <ol className="mt-8 border-t border-border divide-y divide-border">
        {steps.map(({ title, detail, icon: Icon }, index) => (
          <li key={title} className="flex items-center gap-3 py-3 last:pb-0">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center ${index === steps.length - 1 ? "bg-foreground text-primary-foreground" : "border border-border bg-background text-foreground"}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
            </div>
            <span aria-hidden="true" className="ml-auto text-[10px] font-mono text-muted-foreground">0{index + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── CommunityCard (Fourth Card) ──────────────────────────────────────────────

function CommunityCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="col-span-1 md:col-span-2 relative h-full overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col justify-between hover:border-primary/20 transition-colors"
      aria-label="Community & Growth: Ecosystems that scale. Audiences, members, and customers"
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
          Digital ecosystems that scale: communities, members, and customers. Systems that turn audiences into engaged users and drive adoption.
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
  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-card border border-border p-6 md:p-8 h-full min-h-[300px] hover:border-primary/20 transition-colors">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />

      <div className="group/stack relative isolate overflow-hidden bg-foreground p-4 text-primary-foreground mb-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        <div className="relative flex items-center justify-between gap-3 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/70">Application stack</p>
          <Layers3 className="h-4 w-4 text-primary-foreground/60" aria-hidden="true" />
        </div>
        <dl className="relative space-y-3 px-1 py-1">
          <div className="flex items-center gap-3 translate-x-1 -rotate-2 border border-primary-foreground/30 bg-foreground p-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/stack:rotate-0">
            <Globe className="h-5 w-5 shrink-0 text-primary-foreground/70" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-mono text-[9px] uppercase tracking-wider text-primary-foreground/60">01 / Frontend</dt>
              <dd className="mt-1 text-xs font-medium">React + Next.js</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-primary-foreground/50 bg-foreground p-3">
            <Braces className="h-5 w-5 shrink-0 text-primary-foreground/70" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-mono text-[9px] uppercase tracking-wider text-primary-foreground/60">02 / Server</dt>
              <dd className="mt-1 text-xs font-medium">TypeScript + Node.js</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 -translate-x-1 rotate-2 border border-primary-foreground bg-background text-foreground p-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/stack:rotate-0">
            <Cpu className="h-5 w-5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">03 / AI</dt>
              <dd className="mt-1 text-xs font-medium">AI SDK + AI Gateway</dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-medium text-foreground mb-2">Full-Stack Web &amp; AI</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Server rendering, caching, streaming, and AI integrations.
          I work across the application stack to build fast, maintainable systems on Vercel.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const WhatIBuild = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.33,
        staggerChildren: shouldReduceMotion ? 0 : 0.067,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.27 },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -4,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="what-i-build"
      className="bg-background py-16 px-6 md:px-20"
      aria-labelledby="bento-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          id="bento-heading"
          className="sr-only"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          What I Build
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ gridAutoRows: "minmax(300px, auto)" }}
        >
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-2">
            <ArchitectureCard />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <EngineeringCard />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <ImplementationCard />
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
