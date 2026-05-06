"use client";

import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ProjectFilter = ({ activeFilter, onFilterChange }: ProjectFilterProps) => {
  const filters = ["All", "Automations", "Apps & sites", "Hardware"];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-card border border-border rounded-full p-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeFilter === filter
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
