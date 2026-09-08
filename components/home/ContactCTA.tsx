"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Closing section: one oversized link, nothing else. */
export default function ContactCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border bg-background px-6 py-24 md:px-20 md:py-40">
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        <Link href="/contact" className="group block" data-cursor-quip="say hi">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
            Next
          </p>
          <span className="mt-4 inline-flex items-baseline gap-3 font-serif text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight text-foreground transition-transform duration-300 ease-out group-hover:translate-x-3 md:gap-6">
            Get in touch
            <ArrowUpRight
              className="h-[0.55em] w-[0.55em] text-muted-foreground/50 transition-colors group-hover:text-foreground"
              strokeWidth={1.5}
            />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
