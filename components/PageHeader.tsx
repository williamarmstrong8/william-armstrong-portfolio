"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pageHeader, pageTitle, fadeUp, DELAY } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  /** Optional muted subtitle below the title. */
  subtitle?: string;
  /** Section bottom margin: `mb-12` when a filter row follows, `mb-16` otherwise. */
  className?: string;
  /** Keep headings stable when a route loading fallback already displayed them. */
  animate?: boolean;
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
  animate: animateEntrance = true,
}: PageHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const skipEntrance = shouldReduceMotion || !animateEntrance;
  return (
    <motion.section
      className={className}
      initial={skipEntrance ? false : pageHeader.initial}
      animate={pageHeader.animate}
      transition={skipEntrance ? { duration: 0, delay: 0 } : pageHeader.transition}
    >
      <motion.h1
        className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
        initial={skipEntrance ? false : pageTitle.initial}
        animate={pageTitle.animate}
        transition={skipEntrance ? { duration: 0, delay: 0 } : pageTitle.transition}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-base sm:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto"
          initial={skipEntrance ? false : fadeUp(DELAY.filter).initial}
          animate={fadeUp(DELAY.filter).animate}
          transition={skipEntrance ? { duration: 0, delay: 0 } : fadeUp(DELAY.filter).transition}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.section>
  );
}
