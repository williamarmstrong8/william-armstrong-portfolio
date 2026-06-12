"use client";

import { useState, startTransition } from "react";
import { motion } from "framer-motion";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import { ShowcaseModal } from "@/components/showcase/ShowcaseModal";
import { buildMediaItems } from "@/types/showcase";
import type { Startup } from "@/data/startups";

interface StartupsClientProps {
  startups: Startup[];
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function StartupsClient({ startups }: StartupsClientProps) {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            Startups
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
          >
            Entrepreneurial ventures and startups.
          </motion.p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {startups.map((startup, index) => (
            <motion.div
              key={startup.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.15, ease }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <ShowcaseCard
                title={startup.name}
                category={startup.category}
                status={startup.status}
                description={startup.description}
                image={startup.screenshots?.[0]}
                logo={startup.logo}
                metrics={startup.metrics}
                actions={[
                  {
                    label: "View Website",
                    href: startup.website,
                    variant: "outline",
                    icon: "external",
                  },
                  {
                    label: "Learn More",
                    variant: "primary",
                    onClick: () =>
                      startTransition(() => setSelectedStartup(startup)),
                  },
                ]}
                onClick={() => startTransition(() => setSelectedStartup(startup))}
              />
            </motion.div>
          ))}
        </motion.section>
      </main>

      <ShowcaseModal
        open={selectedStartup !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStartup(null);
        }}
        entityLabel="Startup"
        title={selectedStartup?.name ?? ""}
        category={selectedStartup?.category}
        logo={selectedStartup?.logo}
        badge={selectedStartup?.status}
        media={
          selectedStartup
            ? buildMediaItems({ images: selectedStartup.screenshots })
            : []
        }
        description={selectedStartup?.longDescription || selectedStartup?.description || ""}
        metrics={selectedStartup?.metrics}
        features={selectedStartup?.features}
        accomplishments={selectedStartup?.accomplishments}
        technologies={selectedStartup?.technologies}
        links={
          selectedStartup
            ? [{ href: selectedStartup.website, label: "Visit Website", icon: "external" }]
            : []
        }
      />
    </div>
  );
}
