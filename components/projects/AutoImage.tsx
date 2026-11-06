import Image from "next/image";
import { PROJECT_IMAGE_SIZES } from "@/lib/projectImageSizes";
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

/** Preserves the intrinsic aspect ratio from first render, with an optional portrait width cap. */
export default function AutoImage({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
  capPortrait = true,
}: AutoImageProps) {
  const { width, height } = PROJECT_IMAGE_SIZES[src];
  const portrait = capPortrait && width / height < 0.95;
  const imageSizes = sizes ?? (portrait
    ? "(min-width: 768px) 448px, (min-width: 416px) 384px, calc(100vw - 32px)"
    : "(min-width: 1184px) 1024px, (min-width: 768px) calc(100vw - 160px), calc(100vw - 32px)");

  return (
    <div
      className={`overflow-hidden border border-border bg-muted ${
        portrait ? "mx-auto w-full max-w-sm md:max-w-md" : "w-full"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={imageSizes}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        style={{ aspectRatio: `${width} / ${height}` }}
        className="block h-auto w-full object-contain"
      />
    </div>
  );
}
