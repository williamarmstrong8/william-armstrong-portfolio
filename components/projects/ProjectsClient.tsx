"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFilter from "@/components/ProjectFilter";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import { ShowcaseModal, type ShowcaseLink } from "@/components/showcase/ShowcaseModal";
import { buildMediaItems } from "@/types/showcase";
import type { Project } from "@/data/projects";

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const isInitialMount = useRef(true);
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const selectedProjectData =
    selectedProject !== null
      ? projects.find((project) => project.id === selectedProject)
      : null;

  const projectLinks: ShowcaseLink[] = selectedProjectData
    ? [
        ...(selectedProjectData.link
          ? [{ href: selectedProjectData.link, label: "View Live Site", icon: "external" as const }]
          : []),
        ...(selectedProjectData.github
          ? [{ href: selectedProjectData.github, label: "View on GitHub", icon: "github" as const }]
          : []),
      ]
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            Projects
          </motion.h1>
        </motion.section>

        <motion.section
          className="flex justify-center md:justify-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
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
                    duration: 0.6,
                    delay: isInitialMount.current ? 0.7 + index * 0.15 : 0.2 + index * 0.08,
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
                    onClick={() => startTransition(() => setSelectedProject(project.id))}
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

      <ShowcaseModal
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
        entityLabel="Project"
        title={selectedProjectData?.title ?? ""}
        category={selectedProjectData?.category}
        meta={selectedProjectData?.date}
        media={
          selectedProjectData
            ? buildMediaItems({
                images: selectedProjectData.images,
                videos: selectedProjectData.videos,
                videoPoster: selectedProjectData.videoPoster,
              })
            : []
        }
        description={selectedProjectData?.longDescription || selectedProjectData?.description || ""}
        problem={selectedProjectData?.problem}
        features={selectedProjectData?.features}
        process={selectedProjectData?.process}
        outcome={selectedProjectData?.outcome}
        technologies={selectedProjectData?.technologies}
        links={projectLinks}
      />
    </div>
  );
};

export default ProjectsClient;
