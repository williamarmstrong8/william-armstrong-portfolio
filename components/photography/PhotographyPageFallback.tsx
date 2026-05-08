import { Skeleton } from "@/components/ui/skeleton";
import { folders } from "@/lib/photography";
import { cn } from "@/lib/utils";

/**
 * Tile aspect ratios cycled to roughly mimic the masonry mix
 * (graduation 3:2, landscape 16:9, film/35mm 2:3, etc.).
 */
const TILE_CLASSES = [
  "aspect-[3/2]",
  "aspect-[2/3]",
  "aspect-[3/2]",
  "aspect-[16/9]",
  "aspect-[2/3]",
  "aspect-[3/2]",
  "aspect-[2/3]",
  "aspect-[3/2]",
  "aspect-[16/9]",
  "aspect-[2/3]",
  "aspect-[3/2]",
  "aspect-[2/3]",
];

/**
 * Suspense fallback for the photography route while `useSearchParams()` hydrates.
 *
 * Mirrors the real layout 1:1 to prevent CLS:
 * - Same header sizing (incl. mobile subtitle scale).
 * - Same filter shell with the real labels and "Top" pre-selected — widths match exactly.
 * - Same masonry breakpoints as `MasonryPhotoAlbum` (1 / 2 / 3 / 4 cols at <640 / ≥640 / ≥1024 / ≥1280)
 *   and the same 10px spacing, using CSS columns to approximate masonry flow.
 */
export default function PhotographyPageFallback() {
  const tabs = ["Top", ...folders];
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <main className="px-4 md:px-20 pt-8 pb-16">
        <section className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6">
            Photography
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Capturing moments, landscapes, and life&apos;s beautiful details.
          </p>
          <span className="sr-only">Loading photography gallery</span>
        </section>

        <section className="flex justify-center mb-12" aria-hidden>
          <div className="flex flex-wrap items-center justify-center gap-3 bg-card border border-border rounded-full p-2 max-w-full">
            {tabs.map((folder, i) => (
              <span
                key={folder}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium select-none",
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                {folder}
              </span>
            ))}
          </div>
        </section>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "w-full mb-2.5 break-inside-avoid rounded-lg",
                TILE_CLASSES[i % TILE_CLASSES.length],
              )}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
