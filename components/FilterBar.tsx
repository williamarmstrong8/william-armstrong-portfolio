"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  tabs: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

/**
 * The one pill filter bar (Projects + Photography). Tighter on phones
 * (rounded card, smaller pills) and a full pill bar from `sm` up.
 */
export default function FilterBar({
  tabs,
  activeFilter,
  onFilterChange,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-card border border-border rounded-2xl sm:rounded-full p-1.5 sm:p-2 max-w-full",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onFilterChange(tab)}
          className={cn(
            "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
            activeFilter === tab
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
