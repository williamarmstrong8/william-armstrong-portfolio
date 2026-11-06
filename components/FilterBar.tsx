"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  label: string;
  tabs: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

/** Shared, wrapping category controls for Projects and Photography. */
export default function FilterBar({
  label,
  tabs,
  activeFilter,
  onFilterChange,
  className,
}: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-card border border-border p-1.5 sm:p-2 max-w-full",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={activeFilter === tab}
          onClick={() => onFilterChange(tab)}
          className={cn(
            "min-h-11 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
            activeFilter === tab
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
