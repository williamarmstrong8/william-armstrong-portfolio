"use client";

import { motion } from "framer-motion";
import { pageHeader, pageTitle, fadeUp, DELAY } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  /** Optional quiet line shown at the right end of the rule. */
  subtitle?: string;
  /** Section bottom margin: tighter when a filter row follows. */
  className?: string;
}

/**
 * The one page header, restyled for the editorial refresh: no oversized
 * centered title. A small uppercase eyebrow label over a thin rule, then the
 * content starts immediately. Shared by every non-home route.
 */
export default function PageHeader({
  title,
  subtitle,
  className = "mb-12 md:mb-16",
}: PageHeaderProps) {
  return (
    <motion.section
      className={className}
      initial={pageHeader.initial}
      animate={pageHeader.animate}
      transition={pageHeader.transition}
    >
      <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
        <motion.h1
          className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm"
          initial={pageTitle.initial}
          animate={pageTitle.animate}
          transition={pageTitle.transition}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-right text-xs text-muted-foreground/70 md:text-sm"
            initial={fadeUp(DELAY.filter).initial}
            animate={fadeUp(DELAY.filter).animate}
            transition={fadeUp(DELAY.filter).transition}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
