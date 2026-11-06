import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/PageHeader";
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

/** Visible route fallback with the same heading, filter sizes, and masonry rhythm. */
export default function PhotographyPageFallback() {
  const tabs = ["Top", ...folders];
  return (
    <div
      className="min-h-svh bg-background text-foreground"
      aria-busy="true"
    >
      <main className="px-4 md:px-20 pt-8 pb-16">
        <PageHeader title="Photography" className="text-center mb-12" animate={false} />

        <section className="flex justify-center mb-12" aria-label="Photo categories loading">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-card border border-border p-1.5 sm:p-2 max-w-full">
            {tabs.map((folder, i) => (
              <button
                key={folder}
                type="button"
                disabled
                className={cn(
                  "min-h-11 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium select-none whitespace-nowrap",
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {folder}
              </button>
            ))}
          </div>
        </section>

        <p className="mb-6 text-sm text-muted-foreground" role="status">Loading photography gallery…</p>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2.5" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "w-full mb-2.5 break-inside-avoid motion-reduce:animate-none",
                TILE_CLASSES[i % TILE_CLASSES.length],
              )}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
