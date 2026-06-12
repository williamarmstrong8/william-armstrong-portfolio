"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/blur";
import { Skeleton } from "@/components/ui/skeleton";
import type { MediaItem } from "@/types/showcase";

interface MediaGalleryProps {
  media: MediaItem[];
  title: string;
}

export function MediaGallery({ media, title }: MediaGalleryProps) {
  const multiple = media.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: multiple, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState<Set<number>>(new Set());

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const markLoaded = (i: number) => setLoaded((prev) => new Set(prev).add(i));
  const playVideo = (i: number) => setPlaying((prev) => new Set(prev).add(i));

  if (media.length === 0) return null;

  const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px";

  const renderMedia = (item: MediaItem, index: number) => {
    if (item.type === "image") {
      return (
        <>
          {!loaded.has(index) && <Skeleton className="absolute inset-0 z-10" />}
          <Image
            src={item.src}
            alt={`${title} - ${index + 1}`}
            fill
            sizes={sizes}
            priority={index === 0}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={cn(
              "object-cover transition-opacity duration-300",
              loaded.has(index) ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => markLoaded(index)}
            onError={() => markLoaded(index)}
          />
        </>
      );
    }

    if (playing.has(index)) {
      return (
        <video
          src={item.src}
          className="absolute inset-0 h-full w-full object-cover"
          controls
          autoPlay
          playsInline
          preload="auto"
        />
      );
    }

    return (
      <button
        type="button"
        onClick={() => playVideo(index)}
        className="group absolute inset-0 h-full w-full cursor-pointer bg-black"
        aria-label={`Play ${title} video ${index + 1}`}
      >
        {item.poster ? (
          <Image
            src={item.poster}
            alt={`${title} video ${index + 1}`}
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        ) : (
          <video
            src={item.src}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 text-black" fill="currentColor" />
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <div className="aspect-video w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {media.map((item, index) => (
              <div
                key={index}
                className="relative h-full w-full flex-[0_0_100%] bg-muted"
              >
                {renderMedia(item, index)}
              </div>
            ))}
          </div>
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:left-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="absolute right-2 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:right-3"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {selectedIndex + 1} / {media.length}
            </div>
          </>
        )}
      </div>

      {multiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4">
          {media.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to item ${index + 1}`}
              className={cn(
                "relative h-14 w-14 flex-shrink-0 touch-manipulation overflow-hidden rounded-lg border-2 bg-muted transition-colors sm:h-16 sm:w-16",
                selectedIndex === index
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              {item.type === "image" || item.poster ? (
                <Image
                  src={item.type === "image" ? item.src : (item.poster as string)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-5 w-5 text-white drop-shadow" fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;
