"use client";

import Image from "next/image";
import { ExternalLink, Github, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaGallery } from "@/components/showcase/MediaGallery";
import type { MediaItem, Metric } from "@/types/showcase";

export interface ShowcaseLink {
  href: string;
  label: string;
  icon?: "external" | "github";
}

export interface ShowcaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Label used in the "About This {entityLabel}" heading. */
  entityLabel: string;
  title: string;
  category?: string;
  logo?: string;
  badge?: string;
  meta?: string;
  media: MediaItem[];
  description: string;
  problem?: string;
  metrics?: Metric[];
  features?: string[];
  process?: string[];
  accomplishments?: string[];
  outcome?: string;
  technologies?: string[];
  links?: ShowcaseLink[];
}

const linkIcons = {
  external: ExternalLink,
  github: Github,
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

export function ShowcaseModal({
  open,
  onOpenChange,
  entityLabel,
  title,
  category,
  logo,
  badge,
  meta,
  media,
  description,
  problem,
  metrics,
  features,
  process,
  accomplishments,
  outcome,
  technologies,
  links,
}: ShowcaseModalProps) {
  const hasTechnologies = technologies && technologies.length > 0;
  const hasLinks = links && links.length > 0;
  const hasSidebar = hasTechnologies || hasLinks;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex max-h-[95svh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl mx-2 sm:mx-4 sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-border p-4 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            {logo && (
              <Image
                src={logo}
                alt={title}
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0 object-contain sm:h-12 sm:w-12"
              />
            )}
            <div className="min-w-0">
              {category && (
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                  {category}
                </span>
              )}
              <DialogTitle className="mt-1 text-lg font-bold leading-snug text-foreground sm:text-2xl">
                {title}
              </DialogTitle>
              {badge && (
                <span className="mt-1.5 inline-block rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground sm:px-3 sm:py-1 sm:text-sm">
                  {badge}
                </span>
              )}
              {meta && (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{meta}</p>
              )}
            </div>
          </div>
          <DialogClose className="mt-0.5 flex-shrink-0 touch-manipulation rounded-full p-2 transition-colors hover:bg-muted">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-4 pb-8 sm:p-6 sm:pb-12">
            <DialogDescription className="sr-only">{description}</DialogDescription>

            <MediaGallery media={media} title={title} />

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              <div className="space-y-5 sm:space-y-6 lg:col-span-2">
                <Section title={`About This ${entityLabel}`}>
                  <p className="leading-relaxed text-muted-foreground">{description}</p>
                </Section>

                {problem && (
                  <Section title="The Problem">
                    <p className="leading-relaxed text-muted-foreground">{problem}</p>
                  </Section>
                )}

                {metrics && metrics.length > 0 && (
                  <Section title="Key Metrics">
                    <div className="grid grid-cols-2 gap-4">
                      {metrics.map((metric, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-4 text-center">
                          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {features && features.length > 0 && (
                  <Section title="Key Features">
                    <BulletList items={features} />
                  </Section>
                )}

                {process && process.length > 0 && (
                  <Section title="How It Was Built">
                    <BulletList items={process} />
                  </Section>
                )}

                {accomplishments && accomplishments.length > 0 && (
                  <Section title="Major Accomplishments">
                    <BulletList items={accomplishments} />
                  </Section>
                )}

                {outcome && (
                  <Section title="Outcome">
                    <p className="leading-relaxed text-muted-foreground">{outcome}</p>
                  </Section>
                )}
              </div>

              {hasSidebar && (
                <div className="space-y-6">
                  {hasTechnologies && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-foreground">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {technologies!.map((tech, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasLinks && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-foreground">Links</h3>
                      <div className="space-y-3">
                        {links!.map((link, index) => {
                          const Icon = linkIcons[link.icon ?? "external"];
                          return (
                            <a
                              key={index}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-accent/5"
                            >
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Icon className="h-4 w-4 text-primary" />
                              </span>
                              <span className="font-medium text-foreground">{link.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowcaseModal;
