"use client";

import PageHeader from "@/components/PageHeader";
import IndexList from "@/components/IndexList";
import type { Startup } from "@/data/startups";
import { startupQuips } from "@/lib/cursorQuips";

interface StartupsClientProps {
  startups: Startup[];
}

export default function StartupsClient({ startups }: StartupsClientProps) {
  const items = startups.map((startup) => ({
    href: `/startups/${startup.slug}`,
    name: startup.name,
    line: startup.headline,
    meta: startup.category,
    image: startup.screenshots?.[0],
    quip: startupQuips[startup.slug],
  }));

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-6 pt-8 pb-24 md:px-20 md:pb-32">
        <PageHeader title="Startups" subtitle={`${startups.length} ventures`} />
        <IndexList items={items} />
      </main>
    </div>
  );
}
