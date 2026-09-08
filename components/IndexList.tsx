"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/blur";
import { EASE } from "@/lib/motion";

export interface IndexListItem {
  href: string;
  name: string;
  /** One short descriptive line. */
  line?: string;
  /** Quiet right-aligned metadata (category, year). */
  meta?: string;
  image?: string;
  /** Short label for the content-aware cursor. */
  quip?: string;
}

/**
 * Editorial index list: numbered rows with oversized serif names. On desktop,
 * hovering a row reveals a large image preview; on touch and small screens the
 * image sits inline above the row text. Shared by home, projects, and startups
 * so every listing speaks the same visual language.
 */
export default function IndexList({ items }: { items: IndexListItem[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-border">
      {items.map((item, index) => (
        <div key={item.href + item.name} className="border-b border-border">
          <Link
            href={item.href}
            data-cursor-quip={item.quip}
            className="group relative block"
          >
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : index * 0.06 }}
              className="py-6 md:py-10"
            >
              {/* Inline image: small screens and touch devices */}
              {item.image && (
                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden bg-muted md:hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 md:gap-x-10">
                <span className="w-7 text-xs tabular-nums text-muted-foreground/60 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl leading-[1.08] tracking-tight text-foreground transition-transform duration-300 ease-out group-hover:translate-x-2 md:text-5xl md:group-hover:translate-x-4">
                    {item.name}
                  </h3>
                  {item.line && (
                    <p className="mt-1.5 max-w-md text-sm text-muted-foreground line-clamp-2 md:mt-2 md:line-clamp-1 md:text-base">
                      {item.line}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                  {item.meta && (
                    <span className="whitespace-nowrap text-right text-xs text-muted-foreground md:text-sm">
                      {item.meta}
                    </span>
                  )}
                  <ArrowUpRight
                    className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground md:h-5 md:w-5"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </motion.div>

            {/* Hover preview: desktop only */}
            {item.image && (
              <div className="pointer-events-none absolute right-[10%] top-1/2 z-20 hidden w-[24rem] max-w-[36vw] -translate-y-1/2 scale-95 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 md:block">
                <div className="relative aspect-video w-full overflow-hidden border border-border bg-muted">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="24rem"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
