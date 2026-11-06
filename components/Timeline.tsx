"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRef } from "react";

interface TimelineItem {
  title: string;
  subtitle?: string;
  date: string;
  description: string;
}

interface TimelineProps {
  title: string;
  icon: React.ReactNode;
  items: TimelineItem[];
  className?: string;
}

const Timeline = ({ title, icon, items, className }: TimelineProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Section Header */}
      <div className="flex items-center mb-6 sm:mb-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-primary/10 flex items-center justify-center mr-3 sm:mr-6">
          <div className="w-8 h-8 text-primary">
            {icon}
          </div>
        </div>
        <h2 className="min-w-0 text-3xl md:text-4xl lg:text-6xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-2 sm:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        {/* Timeline Items */}
        <div className="space-y-6 sm:space-y-12">
          {items.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Timeline Item Component with scroll animation
const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start"
      initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
      animate={shouldReduceMotion ? { opacity: 1 } : isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.33,
        delay: index * 0.067,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 sm:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

      {/* Content */}
      <motion.div
        className="ml-6 sm:ml-16 min-w-0 bg-card backdrop-blur-md border border-border p-4 sm:p-6 w-full"
        whileHover={shouldReduceMotion ? undefined : {
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4 mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-primary font-medium">
                {item.subtitle}
              </p>
            )}
          </div>
          <div className="text-primary font-medium text-sm md:text-base lg:shrink-0">
            {item.date}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;