import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import AutoImage from "./AutoImage";
import { buildMediaItems, type MediaItem } from "@/types/showcase";
import { getProjectShape, type Project } from "@/data/projects";

function MediaView({
  item,
  alt,
  priority = false,
  capPortrait = true,
}: {
  item: MediaItem;
  alt: string;
  priority?: boolean;
  capPortrait?: boolean;
}) {
  if (item.type === "video") {
    return (
      <div className="overflow-hidden border border-border bg-black">
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
          className="h-auto w-full"
        />
      </div>
    );
  }
  return <AutoImage src={item.src} alt={alt} priority={priority} capPortrait={capPortrait} />;
}

/** One image/video, or a balanced masonry when there are several. */
function Gallery({ items, altPrefix }: { items: MediaItem[]; altPrefix: string }) {
  if (items.length === 0) return null;
  if (items.length === 1) {
    return <MediaView item={items[0]} alt={`${altPrefix} 1`} />;
  }
  return (
    <div className="columns-1 sm:columns-2 gap-4 [column-fill:_balance]">
      {items.map((item, index) => (
        <div key={`${item.src}-${index}`} className="mb-4 break-inside-avoid">
          <MediaView item={item} alt={`${altPrefix} ${index + 1}`} capPortrait={false} />
        </div>
      ))}
    </div>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="space-y-4 md:space-y-5 max-w-3xl">
      {label && (
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
      )}
      {title && (
        <h2 className="font-serif text-2xl md:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{children}</p>;
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="text-sm md:text-base text-foreground leading-relaxed">{children}</div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          <Check className="w-4 h-4 mt-1 shrink-0 text-nav-active" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProcessList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-5">
      {items.map((step, index) => (
        <li key={step} className="flex gap-4 md:gap-5">
          <span className="font-serif text-lg md:text-xl text-nav-active tabular-nums leading-none pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}

interface ProjectCaseStudyProps {
  project: Project;
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const shape = getProjectShape(project);
  const media = buildMediaItems({
    images: project.images,
    videos: project.videos,
    videoPoster: project.videoPoster,
  });
  const hero = media[0] ?? null;
  const rest = media.slice(1);

  const isAutomation = project.category === "Automations";
  const isHardware = project.category === "Hardware";
  const processTitle = isAutomation ? "How it works" : "How it was built";
  const featuresTitle = isAutomation ? "What it does" : isHardware ? "Highlights" : "Key features";
  const overviewBody = project.longDescription || project.description;

  const isInternalLink = project.link?.startsWith("/");
  const linkLabel = isInternalLink
    ? project.link?.startsWith("/blog")
      ? "Read the story"
      : "Open project"
    : "Visit site";

  // Narrative pages interleave media between the report sections; everything
  // else leads with a gallery. Pull from a shared queue so images never repeat.
  const queue = [...rest];
  const take = () => (queue.length > 0 ? queue.shift()! : null);

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-20 pt-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="sticky top-6 z-40 mb-10 w-fit">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-nav/80 backdrop-blur-md px-4 py-2 text-sm font-medium text-nav-foreground transition-colors hover:text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Projects
            </Link>
          </div>

          <header className="space-y-8 md:space-y-10 mb-16 md:mb-20">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {project.category} · {project.date}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] max-w-4xl">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {hero && (
              <MediaView item={hero} alt={`${project.title} hero`} priority />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pt-2">
              <MetaItem label="Category">{project.category}</MetaItem>
              <MetaItem label="Year">{project.date}</MetaItem>
              {project.technologies && project.technologies.length > 0 && (
                <MetaItem label="Stack">{project.technologies.slice(0, 3).join(", ")}</MetaItem>
              )}
              {project.link && (
                <MetaItem label="Links">
                  {isInternalLink ? (
                    <Link
                      href={project.link}
                      className="inline-flex items-center gap-1 text-nav-active hover:opacity-80 transition-opacity"
                    >
                      {linkLabel}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-nav-active hover:opacity-80 transition-opacity"
                    >
                      {linkLabel}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </MetaItem>
              )}
            </div>
          </header>

          <div className="space-y-14 md:space-y-20">
            {shape === "narrative" ? (
              <>
                <Section label="01" title="Overview">
                  <Prose>{overviewBody}</Prose>
                </Section>
                {(() => {
                  const m = take();
                  return m ? <Gallery items={[m]} altPrefix={project.title} /> : null;
                })()}

                {project.problem && (
                  <>
                    <Section label="02" title="The problem">
                      <Prose>{project.problem}</Prose>
                    </Section>
                    {(() => {
                      const m = take();
                      return m ? <Gallery items={[m]} altPrefix={project.title} /> : null;
                    })()}
                  </>
                )}

                {project.process && project.process.length > 0 && (
                  <>
                    <Section label="03" title={processTitle}>
                      <ProcessList items={project.process} />
                    </Section>
                    {(() => {
                      const m = take();
                      return m ? <Gallery items={[m]} altPrefix={project.title} /> : null;
                    })()}
                  </>
                )}

                {project.outcome && (
                  <Section label="04" title="The outcome">
                    <Prose>{project.outcome}</Prose>
                  </Section>
                )}

                {queue.length > 0 && <Gallery items={queue} altPrefix={project.title} />}

                {project.features && project.features.length > 0 && (
                  <Section title={featuresTitle}>
                    <FeatureList items={project.features} />
                  </Section>
                )}
              </>
            ) : (
              <>
                <Section title="Overview">
                  <Prose>{overviewBody}</Prose>
                </Section>

                {rest.length > 0 && <Gallery items={rest} altPrefix={project.title} />}

                {project.features && project.features.length > 0 && (
                  <Section title={featuresTitle}>
                    <FeatureList items={project.features} />
                  </Section>
                )}
              </>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <Section title="Built with">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs md:text-sm px-3 py-1.5 border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {project.link && (
            <footer className="mt-20 md:mt-28 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  {isInternalLink && project.link.startsWith("/blog") ? "Read more" : "See it live"}
                </p>
                <p className="font-serif text-lg font-medium text-foreground">{project.title}</p>
              </div>
              {isInternalLink ? (
                <Link
                  href={project.link}
                  className="inline-flex items-center justify-center gap-2 bg-nav-active text-nav-active-foreground px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  {linkLabel}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-nav-active text-nav-active-foreground px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  {linkLabel}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </footer>
          )}
        </div>
      </div>
    </article>
  );
}
