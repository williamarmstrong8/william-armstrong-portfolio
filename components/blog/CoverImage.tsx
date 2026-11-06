"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

export default function CoverImage({ title, src, slug }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const image = (
    <span className="block relative w-full aspect-[21/10] overflow-hidden bg-muted">
      {!loaded && !imageError && (
        <span role="status" className="absolute inset-0 flex items-center justify-center p-4 text-sm text-muted-foreground">
          Loading cover image…
        </span>
      )}
      {imageError ? (
        <span
          role="img"
          aria-label={`Cover image unavailable for ${title}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/50 p-4 text-center text-sm text-muted-foreground"
        >
          <svg className="w-10 h-10 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
          </svg>
          <span>Cover image unavailable</span>
        </span>
      ) : (
        <Image
          src={src}
          alt={`Cover image for ${title}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className={cn(
            "object-cover transition-opacity duration-300 motion-reduce:transition-none",
            loaded ? "opacity-100" : "opacity-0"
          )}
          priority={!!slug}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onLoad={() => setLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </span>
  );
  return (
    <div className="sm:mx-0 overflow-hidden">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
