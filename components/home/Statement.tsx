"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** The one statement on the home page: two sentences, oversized serif. */
export default function Statement() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 py-24 md:px-20 md:py-40">
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        <p className="max-w-5xl font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.25] tracking-tight text-foreground">
          I&apos;m a solutions engineer and founder. I build the integrations
          and infrastructure that let small teams operate like large ones - and
          the communities that give them an audience.
        </p>
        <Link
          href="/about"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground md:text-base"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
            More about me
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
        </Link>
      </motion.div>
    </section>
  );
}
