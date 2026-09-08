"use client";

import { motion } from "framer-motion";
import { pageHeader, pageTitle, fadeUp, DELAY } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  /** Optional muted subtitle below the title. */
  subtitle?: string;
  /** Section bottom margin: `mb-12` when a filter row follows, `mb-16` otherwise. */
  className?: string;
}

/**
 * The one page header. Every non-home route renders this: a centered,
 * choreographed title with an optional subtitle. The title scales down one
 * step on the smallest phones so long titles (e.g. "Photography") never
 * overflow the viewport.
 */
export default function PageHeader({
  title,
  subtitle,
  className = "text-center mb-16",
}: PageHeaderProps) {
  return (
    <motion.section
      className={className}
      initial={pageHeader.initial}
      animate={pageHeader.animate}
      transition={pageHeader.transition}
    >
      <motion.h1
        className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
        initial={pageTitle.initial}
        animate={pageTitle.animate}
        transition={pageTitle.transition}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-base sm:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto"
          initial={fadeUp(DELAY.filter).initial}
          animate={fadeUp(DELAY.filter).animate}
          transition={fadeUp(DELAY.filter).transition}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.section>
  );
}
