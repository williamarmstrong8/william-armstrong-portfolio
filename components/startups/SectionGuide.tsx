"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type GuideItem = { id: string; label: string };

/** Viewport line used to decide which section is "active" (below sticky chrome). */
const ACTIVATE_OFFSET = 140;

function collectSections(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("[data-case-section]"),
  ).filter((node) => node.id);
}

function resolveActiveSection(nodes: HTMLElement[]): string | null {
  if (nodes.length === 0) return null;

  let current = nodes[0].id;

  for (const node of nodes) {
    const { top } = node.getBoundingClientRect();
    if (top <= ACTIVATE_OFFSET) {
      current = node.id;
    }
  }

  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 80;
  if (nearBottom) {
    current = nodes[nodes.length - 1].id;
  }

  return current;
}

/**
 * Auto-discovering section guide. Tracks scroll position (including Lenis) and
 * highlights whichever section is currently in view.
 */
export default function SectionGuide({ className }: { className?: string }) {
  const pathname = usePathname();
  const [items, setItems] = useState<GuideItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const nodes = collectSections();
    setItems(
      nodes.map((node) => ({
        id: node.id,
        label: node.getAttribute("data-case-label") || node.id,
      })),
    );
    const next = resolveActiveSection(nodes);
    if (next) setActiveId(next);
  }, []);

  useEffect(() => {
    refresh();

    const onScroll = () => {
      const nodes = collectSections();
      const next = resolveActiveSection(nodes);
      if (next) setActiveId((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("app-scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("app-scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, refresh]);

  if (items.length === 0) return null;

  return (
    <nav className={className} aria-label="Case study sections">
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block border-l-2 pl-3 -ml-px text-[15px] md:text-base leading-snug transition-colors",
                  isActive
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground/50 hover:text-muted-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
