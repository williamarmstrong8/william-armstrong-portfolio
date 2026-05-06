import { Skeleton } from "@/components/ui/skeleton";

const TILE_CLASSES = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-video",
  "aspect-[5/6]",
  "aspect-[3/4]",
];

/**
 * Shown while the photography route waits on `useSearchParams()` hydration.
 * Reserves full-page height so the footer does not jump (CLS).
 */
export default function PhotographyPageFallback() {
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Capturing moments, landscapes, and life&apos;s beautiful details.
          </p>
          <span className="sr-only">Loading photography gallery</span>
        </section>

        <section className="flex justify-center mb-12" aria-hidden>
          <div className="flex flex-wrap items-center justify-center gap-3 bg-card border border-border rounded-full p-2 max-w-full">
            {["w-14", "w-20", "w-16", "w-24", "w-[4.5rem]", "w-16"].map((w, i) => (
              <Skeleton key={i} className={`h-9 ${w} rounded-full shrink-0`} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`w-full rounded-lg ${TILE_CLASSES[i % TILE_CLASSES.length]}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
