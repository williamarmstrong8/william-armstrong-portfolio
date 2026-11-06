"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./DateFormatter";
import { BLUR_DATA_URL } from "@/lib/blur";
import { blogQuips } from "@/lib/cursorQuips";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  number?: string;
  category?: string;
};

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  number,
  category,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col">
      <Link
        href={`/blog/${slug}`}
        data-cursor-quip={blogQuips[slug]}
        className="flex flex-col w-full text-left motion-safe:transform-gpu motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1"
      >
        {/* Image Card - distinct visual card, same style as project/startup cards */}
        <div className="relative w-full overflow-hidden border border-border/80 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30 aspect-video">
          {!imageError ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          ) : (
            <div
              role="img"
              aria-label={`Cover image unavailable for ${title}`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/50 p-4 text-center text-sm text-muted-foreground"
            >
              <svg
                className="w-10 h-10 text-muted-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
              <span>Cover image unavailable</span>
            </div>
          )}
        </div>

        {/* Text and details - separate from image card */}
        <div className="mt-5 flex flex-col gap-1">
          {number && (
            <span className="text-sm font-medium tabular-nums text-muted-foreground/70">
              {number}
            </span>
          )}
          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            <DateFormatter dateString={date} />
            {category && (
              <>
                <span className="mx-1.5 text-muted-foreground/60" aria-hidden>•</span>
                {category}
              </>
            )}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2 line-clamp-3">
            {excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read post
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
