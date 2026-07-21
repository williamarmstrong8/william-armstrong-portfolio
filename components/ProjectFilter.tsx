"use client";

import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ProjectFilter = ({ activeFilter, onFilterChange }: ProjectFilterProps) => {
  const filters = ["All", "Automations", "Apps & sites", "Hardware"];

  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-card border border-border rounded-2xl sm:rounded-full p-1.5 sm:p-2 max-w-full">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
            activeFilter === filter
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
