"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { EASE, DELAY, fadeUp } from "@/lib/motion";

const socials = [
  { name: "X", handle: "@armstrongwill8", href: "https://x.com/armstrongwill8", quip: "just follow" },
  { name: "LinkedIn", handle: "william-armstrong8", href: "https://www.linkedin.com/in/william-armstrong8/", quip: "few hours" },
  { name: "GitHub", handle: "williamarmstrong8", href: "https://github.com/williamarmstrong8", quip: "cool projects :)" },
];

export default function ContactClient() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-6 pt-8 pb-24 md:px-20 md:pb-32">
        <PageHeader title="Contact" />

        {/* One big email link */}
        <motion.section
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : DELAY.filter }}
        >
          <a
            href="mailto:williamarmstrong8@gmail.com"
            data-cursor-quip="2-3 days"
            className="group block border-b border-border pb-8 md:pb-12"
          >
            <span className="inline-flex flex-wrap items-baseline gap-x-4 font-serif text-[clamp(1.6rem,5.5vw,4.5rem)] leading-[1.1] tracking-tight text-foreground transition-transform duration-300 ease-out group-hover:translate-x-2 md:group-hover:translate-x-4">
              williamarmstrong8@gmail.com
              <ArrowUpRight
                className="h-[0.6em] w-[0.6em] shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground"
                strokeWidth={1.5}
              />
            </span>
          </a>
        </motion.section>

        {/* Socials as quiet index rows */}
        <motion.section
          className="mt-12 md:mt-16"
          initial={fadeUp(DELAY.grid).initial}
          animate={fadeUp(DELAY.grid).animate}
          transition={fadeUp(DELAY.grid).transition}
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-quip={social.quip}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5 md:py-6"
            >
              <span className="font-serif text-2xl tracking-tight text-foreground transition-transform duration-300 ease-out group-hover:translate-x-2 md:text-4xl md:group-hover:translate-x-4">
                {social.name}
              </span>
              <span className="flex items-center gap-3 text-xs text-muted-foreground md:text-sm">
                {social.handle}
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  strokeWidth={1.5}
                />
              </span>
            </a>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
