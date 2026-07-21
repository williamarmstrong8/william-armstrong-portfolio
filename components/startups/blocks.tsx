import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/blur";
import {
  getBrandImageSize,
  isPortraitImage,
  planStartupMedia,
  type MediaBlock,
} from "@/lib/brandImageSizes";
import type { CaseStudyBlock, CaseStudyPillar, Startup } from "@/data/startups";
import { cn } from "@/lib/utils";
import SectionGuide from "./SectionGuide";

/** Turn a section label into a stable anchor id, e.g. "What we built" → "what-we-built". */
function sectionSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Reusable building blocks for startup case studies.
 *
 * Custom per-slug layouts (see components/startups/case-studies/) compose these
 * in any order. Everything here is a plain server component, so a custom layout
 * can freely reorder text, images, and its own bespoke React components.
 */

/* -------------------------------------------------------------------------- */
/* Shell + chrome                                                              */
/* -------------------------------------------------------------------------- */

/** Page frame: article background, padding, centered column, and sticky top bar. */
export function CaseStudyShell({
  startup,
  children,
  className,
}: {
  startup: Startup;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-20 pt-8 pb-20">
        {/* Small screens: the rail is hidden, so show a back pill up top. */}
        <div className="xl:hidden sticky top-6 z-40 mb-10">
          <BackLink variant="pill" />
        </div>

        <div className="relative">
          {/* Left rail: back link + section guide. Lives in the left gutter on
              wide screens so the main content stays centered. */}
          <div className="hidden xl:block absolute left-0 top-0 h-full w-44">
            <div className="sticky top-8 space-y-8">
              <BackLink variant="plain" />
              <SectionGuide />
            </div>
          </div>

          <div className={cn("max-w-3xl mx-auto", className)}>{children}</div>
        </div>
      </div>
    </article>
  );
}

/** "Back to Startups" link. `pill` = white button (mobile), `plain` = text (rail). */
export function BackLink({ variant = "plain" }: { variant?: "pill" | "plain" }) {
  const base =
    "group inline-flex items-center gap-2 text-sm font-medium transition-colors";
  return (
    <Link
      href="/startups"
      className={cn(
        base,
        variant === "pill"
          ? "bg-white border border-border shadow-sm backdrop-blur-md px-4 py-2 text-nav-foreground hover:text-muted-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      Back to Startups
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                      */
/* -------------------------------------------------------------------------- */

/** Small "Name · Status" eyebrow + large serif headline. */
export function CaseTitle({
  startup,
  children,
}: {
  startup: Startup;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {startup.name} · {startup.status}
      </p>
      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] max-w-4xl">
        {children ?? startup.headline}
      </h1>
    </div>
  );
}

export function MetaItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="text-sm md:text-base text-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/** Role / Timeline / first two metrics in a responsive grid. */
export function MetaGrid({ startup }: { startup: Startup }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pt-2">
      <MetaItem label="Role">{startup.role}</MetaItem>
      <MetaItem label="Timeline">{startup.timeline}</MetaItem>
      {startup.metrics.slice(0, 2).map((metric) => (
        <MetaItem key={metric.label} label={metric.label}>
          <span className="font-serif text-nav-active">{metric.value}</span>
        </MetaItem>
      ))}
    </div>
  );
}

/**
 * Convenience default header: title + optional hero media + meta grid.
 * Pass `hero={false}` to skip media, or pass custom children as the hero slot.
 */
export function CaseHeader({
  startup,
  hero = true,
  children,
}: {
  startup: Startup;
  hero?: boolean;
  children?: React.ReactNode;
}) {
  const mainImage = startup.screenshots?.[0];
  return (
    <header className="space-y-8 md:space-y-10 mb-16 md:mb-20">
      <CaseTitle startup={startup} />
      {children ??
        (hero && mainImage && (
          <SoloImage src={mainImage} alt={`${startup.name} main image`} priority />
        ))}
      <MetaGrid startup={startup} />
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Text sections                                                               */
/* -------------------------------------------------------------------------- */

export function Pillars({ pillars }: { pillars: CaseStudyPillar[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-2">
      {pillars.map((pillar) => (
        <div key={pillar.title} className="space-y-2">
          <h3 className="font-serif text-base md:text-lg font-medium text-foreground">
            {pillar.title}
          </h3>
          <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
            {pillar.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * A titled text section. Provide inline props, or spread a CaseStudyBlock, plus
 * optional children rendered after the copy (great for dropping media or a
 * custom component right inside a section).
 */
export function Section({
  label,
  title,
  body,
  pillars,
  children,
  className,
  id,
}: {
  label?: string;
  title?: string;
  body?: string;
  pillars?: CaseStudyPillar[];
  children?: React.ReactNode;
  className?: string;
  /** Override the anchor id (defaults to a slug of the label). */
  id?: string;
}) {
  const anchorId = id ?? (label ? sectionSlug(label) : undefined);
  return (
    <section
      id={anchorId}
      data-case-section={anchorId ? "" : undefined}
      data-case-label={anchorId ? label ?? title : undefined}
      className={cn("scroll-mt-28 space-y-5 md:space-y-6", className)}
    >
      {(label || title || body) && (
        <div className="space-y-3 max-w-3xl">
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
          {body && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {body}
            </p>
          )}
        </div>
      )}
      {pillars && pillars.length > 0 && <Pillars pillars={pillars} />}
      {children}
    </section>
  );
}

/** Render a data-defined CaseStudyBlock (overview, problem, etc.) as a Section. */
export function SectionFromBlock({ block }: { block: CaseStudyBlock }) {
  return (
    <Section
      label={block.label}
      title={block.title}
      body={block.body}
      pillars={block.pillars}
    />
  );
}

/** A large pull quote for moments you want to slow the reader down. */
export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="max-w-3xl mx-auto text-center space-y-4 py-4">
      <blockquote className="font-serif text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] text-foreground">
        “{children}”
      </blockquote>
      {attribution && (
        <figcaption className="text-sm text-muted-foreground">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

/** Prominent single stat, e.g. a hero number. */
export function BigStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="font-serif text-4xl md:text-6xl font-medium text-nav-active leading-none">
        {value}
      </div>
      <div className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/** Row of stats. Defaults to the startup's metrics when no children are given. */
export function StatRow({
  startup,
  children,
  className,
}: {
  startup?: Startup;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10",
        className,
      )}
    >
      {children ??
        startup?.metrics.map((m) => (
          <BigStat key={m.label} value={m.value} label={m.label} />
        ))}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-t border-border", className)} />;
}

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

/** One image, sized from its intrinsic ratio. Portrait shots are centered. */
export function SoloImage({
  src,
  alt,
  priority = false,
  rounded = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
}) {
  const { width, height } = getBrandImageSize(src);
  const portrait = isPortraitImage(src);

  return (
    <div
      className={cn(
        "overflow-hidden border border-border bg-muted",
        rounded && "rounded-2xl",
        portrait ? "mx-auto w-full max-w-lg" : "w-full",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={
          portrait
            ? "(max-width: 768px) 100vw, 512px"
            : "(max-width: 768px) 100vw, 960px"
        }
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="h-auto w-full"
      />
    </div>
  );
}

/** Two images side by side sharing one aspect frame. */
export function ImagePair({
  images,
  sharedRatio,
  altPrefix,
  priority = false,
}: {
  images: [string, string];
  sharedRatio?: number;
  altPrefix: string;
  priority?: boolean;
}) {
  const ratio =
    sharedRatio ??
    (getBrandImageSize(images[0]).width / getBrandImageSize(images[0]).height +
      getBrandImageSize(images[1]).width / getBrandImageSize(images[1]).height) /
      2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {images.map((src, index) => (
        <div
          key={src}
          className="relative w-full overflow-hidden border border-border bg-muted"
          style={{ aspectRatio: String(ratio) }}
        >
          <Image
            src={src}
            alt={`${altPrefix} ${index + 1}`}
            fill
            priority={priority && index === 0}
            sizes="(max-width: 768px) 100vw, 480px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/** A full-bleed image that breaks out of the centered column for impact. */
export function FullBleedImage({
  src,
  alt,
  priority = false,
  heightClass = "h-[50vh] md:h-[70vh]",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  heightClass?: string;
}) {
  return (
    <div
      className={cn(
        "relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-muted",
        heightClass,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />
    </div>
  );
}

/** Render a planned MediaBlock (single or pair). */
export function AutoMedia({
  block,
  altPrefix,
  priority = false,
}: {
  block: MediaBlock;
  altPrefix: string;
  priority?: boolean;
}) {
  if (block.type === "single") {
    return <SoloImage src={block.src} alt={altPrefix} priority={priority} />;
  }
  return (
    <ImagePair
      images={block.images}
      sharedRatio={block.sharedRatio}
      altPrefix={altPrefix}
      priority={priority}
    />
  );
}

/**
 * Auto-lay out any list of images: matched-ratio shots pair up, the rest go
 * solo. Handy for a quick gallery in a custom layout.
 */
export function Gallery({
  images,
  altPrefix,
  priority = false,
}: {
  images: string[];
  altPrefix: string;
  priority?: boolean;
}) {
  const plan = planStartupMedia(images);
  const all = plan.hero ? [plan.hero, ...plan.blocks] : plan.blocks;
  return (
    <div className="space-y-3">
      {all.map((block, index) => (
        <AutoMedia
          key={`gallery-${index}`}
          block={block}
          altPrefix={`${altPrefix} ${index + 1}`}
          priority={priority && index === 0}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout helpers                                                              */
/* -------------------------------------------------------------------------- */

/** Vertical rhythm wrapper for the body of a case study. */
export function CaseBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-14 md:space-y-20", className)}>{children}</div>
  );
}

/** Two-column responsive layout for pairing copy with media or a component. */
export function TwoColumn({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
        className,
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/** Closing footer with the live-site CTA. */
export function CaseFooter({ startup }: { startup: Startup }) {
  return (
    <footer className="mt-20 md:mt-28 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
          Live site
        </p>
        <p className="font-serif text-lg font-medium text-foreground">
          {startup.name}
        </p>
      </div>
      {startup.website && (
        <a
          href={startup.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-nav-active text-nav-active-foreground px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </footer>
  );
}
