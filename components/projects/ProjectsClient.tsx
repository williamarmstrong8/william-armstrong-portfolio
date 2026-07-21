"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFilter from "@/components/ProjectFilter";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import type { Project } from "@/data/projects";
import { projectQuips } from "@/lib/cursorQuips";

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const router = useRouter();
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
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.07 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.47, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.13 }}
          >
            Projects
          </motion.h1>
        </motion.section>

        <motion.section
          className="flex justify-center md:justify-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.33, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.27 }}
        >
          <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </motion.section>

        {/* Projects Grid - animate out all cards on filter change, then new set animates in */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.section
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.4,
                    delay: isInitialMount.current ? 0.47 + index * 0.1 : 0.13 + index * 0.053,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <ShowcaseCard
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    date={project.date}
                    image={
                      project.thumbnail ||
                      (project.images && project.images.length > 0 ? project.images[0] : undefined)
                    }
                    ctaLabel="View Project"
                    cursorQuip={projectQuips[project.slug]}
                    onClick={() => router.push(`/projects/${project.slug}`)}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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
