"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShowcaseCard } from "@/components/showcase/ShowcaseCard";
import PageHeader from "@/components/PageHeader";
import type { Startup } from "@/data/startups";
import { startupQuips } from "@/lib/cursorQuips";
import { cardEntrance, cardHover } from "@/lib/motion";

interface StartupsClientProps {
  startups: Startup[];
}

export default function StartupsClient({ startups }: StartupsClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <PageHeader title="Startups" />

        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          {startups.map((startup, index) => (
            <motion.div
              key={startup.slug}
              {...cardEntrance(index, true)}
              whileHover={cardHover}
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
