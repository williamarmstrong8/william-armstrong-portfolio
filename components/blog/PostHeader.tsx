"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  number?: string;
};

export default function PostHeader({
  title,
  coverImage,
  date,
  number,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      {number && (
        <motion.div
          className="mb-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0,
          }}
        >
          <span className="text-5xl md:text-6xl font-bold tabular-nums text-muted-foreground/50">
            {number}
          </span>
        </motion.div>
      )}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 text-foreground"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0,
        }}
      >
        {title}
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">
        <DateFormatter dateString={date} />
      </p>
      <motion.div
        className="mb-8 md:mb-12"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 0.33,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1,
        }}
      >
        <CoverImage title={title} src={coverImage} />
      </motion.div>
    </>
  );
}
