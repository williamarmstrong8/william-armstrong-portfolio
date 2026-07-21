"use client";

import Image from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/blur";

interface AutoImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Extra classes for the wrapper (e.g. masonry break-inside rules). */
  className?: string;
  /** When false, portraits fill their container instead of being width-capped. */
  capPortrait?: boolean;
}

/**
 * Renders a project image at its true aspect ratio. Project screenshots have no
 * pre-recorded dimensions, so we measure the natural size on load and pin the
 * frame's `aspect-ratio` to it. Portraits get width-capped and centered so they
 * never blow up the layout, and nothing is ever cropped or stretched.
 */
export default function AutoImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 900px",
  className = "",
  capPortrait = true,
}: AutoImageProps) {
  const [ratio, setRatio] = useState<number | null>(null);
  const portrait = capPortrait && ratio !== null && ratio < 0.95;

  return (
    <div
      className={`overflow-hidden border border-border bg-muted ${
        portrait ? "mx-auto w-full max-w-sm md:max-w-md" : "w-full"
      } ${className}`}
    >
      <div className="relative w-full" style={{ aspectRatio: ratio ? String(ratio) : "16 / 10" }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
      </div>
    </div>
  );
}
