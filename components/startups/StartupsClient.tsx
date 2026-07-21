"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import type { Startup } from "@/data/startups";
import { startupQuips } from "@/lib/cursorQuips";

interface StartupsClientProps {
  startups: Startup[];
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function StartupsClient({ startups }: StartupsClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.07 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.47, ease, delay: 0.13 }}
          >
            Startups
          </motion.h1>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          {startups.map((startup, index) => (
            <motion.div
              key={startup.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.47 + index * 0.1, ease }}
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
                cursorQuip={startupQuips[startup.slug]}
                actions={[
                  {
                    label: "View Website",
                    href: startup.website,
                    variant: "outline",
                    icon: "external",
                  },
                  {
                    label: "Case Study",
                    href: `/startups/${startup.slug}`,
                    variant: "primary",
                  },
                ]}
                onClick={() => router.push(`/startups/${startup.slug}`)}
              />
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
