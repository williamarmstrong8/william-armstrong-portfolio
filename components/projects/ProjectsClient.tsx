"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "@/components/FilterBar";
import PageHeader from "@/components/PageHeader";
import IndexList from "@/components/IndexList";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { projectQuips } from "@/lib/cursorQuips";

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const isInitialMount = useRef(true);
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const items = filteredProjects.map((project) => ({
    href: `/projects/${project.slug}`,
    name: project.title,
    line: project.description,
    meta: project.category,
    image:
      project.thumbnail ||
      (project.images && project.images.length > 0 ? project.images[0] : undefined),
    quip: projectQuips[project.slug],
  }));

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-6 pt-8 pb-24 md:px-20 md:pb-32">
        <PageHeader title="Projects" className="mb-8 md:mb-10" />

        <motion.section
          className="mb-10 flex justify-start md:mb-12"
          initial={fadeUp().initial}
          animate={fadeUp().animate}
          transition={fadeUp().transition}
        >
          <FilterBar
            tabs={["All", "Automations", "Apps & sites", "Hardware"]}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.section>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {items.length > 0 ? (
              <IndexList items={items} />
            ) : (
              <p className="py-16 text-center text-lg text-muted-foreground">
                No projects found for the selected category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProjectsClient;
