"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IndexList from "@/components/IndexList";
import { startups } from "@/data/startups";
import { startupQuips } from "@/lib/cursorQuips";

const ORDER = ["club-pack", "happy-mile", "mod-brew", "destination-drifters"];

/** Selected Work: the four startups as an editorial index list. */
export default function SelectedWork() {
  const items = ORDER.map((slug) => startups.find((s) => s.slug === slug))
    .filter((s): s is (typeof startups)[number] => s != null)
    .map((s) => ({
      href: `/startups/${s.slug}`,
      name: s.name,
      line: s.headline,
      meta: s.category,
      image: s.screenshots?.[0],
      quip: startupQuips[s.slug],
    }));

  return (
    <section className="bg-background px-6 pb-24 md:px-20 md:pb-40">
      <div className="mb-8 flex items-baseline justify-between md:mb-12">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
          Selected Work
        </p>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm"
        >
          Engineering projects
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
        </Link>
      </div>
      <IndexList items={items} />
    </section>
  );
}
