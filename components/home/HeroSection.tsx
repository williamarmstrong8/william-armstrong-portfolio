"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/blur";
import { EASE } from "@/lib/motion";

/**
 * Full-screen editorial hero: oversized serif name, one line, and a single
 * pixel-art image doing the visual work. No buttons, no stat chips - the stat
 * line sits quiet at the bottom edge.
 */
const HeroSection = () => {
  const reduce = useReducedMotion();

  const entrance = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.53, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <main className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-background px-6 pt-10 pb-6 md:px-20 md:pt-16 md:pb-8">
      <div className="w-full">
        <motion.p
          {...entrance(0.07)}
          className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm"
        >
          Engineer &amp; Entrepreneur
        </motion.p>
        <motion.h1
          {...entrance(0.13)}
          className="mt-4 font-serif text-[clamp(3rem,11vw,10rem)] leading-[0.95] tracking-tight text-foreground"
        >
          William Armstrong
        </motion.h1>
        <motion.p
          {...entrance(0.25)}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl"
        >
          I build products, communities, and the systems behind them.
        </motion.p>
      </div>

      <motion.div {...entrance(0.4)} className="relative mt-10 w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/hero-pixel-mountain.png"
            alt="Pixel art mountain landscape"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        {...entrance(0.55)}
        className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground/70 md:text-sm"
      >
        <span>4 startups</span>
        <span>$50k workflow automated</span>
        <span>2M+ community engagement</span>
      </motion.div>
    </main>
  );
};

export default HeroSection;
