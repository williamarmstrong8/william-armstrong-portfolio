"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import FilterBar from "@/components/FilterBar";
import PageHeader from "@/components/PageHeader";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import { fadeUp, cardEntrance, cardHover } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { projectQuips } from "@/lib/cursorQuips";

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const isInitialMount = useRef(true);
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <PageHeader title="Projects" className="text-center mb-12" />

        <motion.section
          className="flex justify-center md:justify-end mb-12"
          initial={shouldReduceMotion ? false : fadeUp().initial}
          animate={fadeUp().animate}
          transition={shouldReduceMotion ? { duration: 0 } : fadeUp().transition}
        >
          <FilterBar
            label="Project categories"
            tabs={["All", "Automations", "Apps & sites", "Hardware"]}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.section>

        <p role="status" aria-live="polite" aria-atomic="true" className="mb-6 text-sm text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          {activeFilter === "All" ? " across all categories" : ` in ${activeFilter}`}
        </p>

        {/* Projects Grid - animate out all cards on filter change, then new set animates in */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.section
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  {...(shouldReduceMotion
                    ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0 } }
                    : cardEntrance(index, isInitialMount.current))}
                  whileHover={shouldReduceMotion ? undefined : cardHover}
                >
                  <ShowcaseCard
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    date={project.date}
                    sizes="(min-width: 1024px) calc((100vw - 224px) / 3), (min-width: 768px) calc((100vw - 192px) / 2), calc(100vw - 32px)"
                    image={
                      project.thumbnail ||
                      (project.images && project.images.length > 0 ? project.images[0] : undefined)
                    }
                    ctaLabel="View Project"
                    cursorQuip={projectQuips[project.slug]}
                    href={`/projects/${project.slug}`}
                  />
                </motion.div>
              ))}
            </motion.section>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <p className="text-muted-foreground text-lg">
                No projects found for the selected category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProjectsClient;
