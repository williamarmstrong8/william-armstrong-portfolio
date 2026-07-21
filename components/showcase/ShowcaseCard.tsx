"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/blur";
import type { Metric } from "@/types/showcase";

export interface ShowcaseCardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  icon?: "external";
}

export interface ShowcaseCardProps {
  title: string;
  category?: string;
  status?: string;
  date?: string;
  description?: string;
  /** Screenshot/thumbnail shown filling the card (object-cover). */
  image?: string;
  /** Logo shown centered when no image is available (object-contain). */
  logo?: string;
  metrics?: Metric[];
  actions?: ShowcaseCardAction[];
  /** Hover hint shown when the card has no explicit actions. */
  ctaLabel?: string;
  /** Short funny label shown in the content-aware cursor on hover. */
  cursorQuip?: string;
  onClick: () => void;
}

export function ShowcaseCard({
  title,
  category,
  status,
  date,
  description,
  image,
  logo,
  metrics,
  actions,
  ctaLabel = "View",
  cursorQuip,
  onClick,
}: ShowcaseCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const subtitleParts = [date, category, status].filter(Boolean) as string[];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      data-cursor-quip={cursorQuip || undefined}
      className="group flex cursor-pointer flex-col text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30 shadow-[0_2px_12px_hsl(0_0%_0%_/_0.08)] transition-shadow duration-300 group-hover:shadow-lg">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        ) : logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-24 w-24 md:h-28 md:w-28">
              <Image
                src={logo}
                alt={`${title} logo`}
                fill
                sizes="112px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-contain"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
          {title}
        </h3>

        {subtitleParts.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {subtitleParts.map((part, index) => (
              <span key={index}>
                {index > 0 && (
                  <span className="mx-1.5 text-muted-foreground/60" aria-hidden>
                    •
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
        )}

        {description && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        {metrics && metrics.length > 0 && (
          <div className="mt-3 flex w-full gap-2 sm:gap-3">
            {metrics.map((metric, index) => (
              <div key={index} className="min-w-0 flex-1 rounded-lg bg-muted/50 px-3 py-2 text-center">
                <div className="text-base font-bold text-foreground">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {actions && actions.length > 0 ? (
          <div className="mt-5 flex flex-col gap-2 pt-2 sm:flex-row sm:gap-3">
            {actions.map((action, index) => {
              const className = cn(
                "inline-flex touch-manipulation items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                action.variant === "primary"
                  ? "flex-1 bg-nav-active text-nav-active-foreground hover:bg-nav-active/90"
                  : "border border-border bg-card hover:bg-accent/5"
              );

              if (action.href) {
                const isExternal = /^https?:\/\//.test(action.href);
                return (
                  <a
                    key={index}
                    href={action.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={(e) => e.stopPropagation()}
                    className={className}
                  >
                    {action.icon === "external" && (
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    )}
                    {action.label}
                  </a>
                );
              }

              return (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick?.();
                  }}
                  className={className}
                >
                  {action.icon === "external" && (
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  )}
                  {action.label}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default ShowcaseCard;
