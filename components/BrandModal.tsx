"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/blur";
import { Skeleton } from "@/components/ui/skeleton";

interface Brand {
  name: string;
  logo: string;
  description: string;
  longDescription?: string;
  category: string;
  status: "Active" | "Launched" | "In Beta" | "In Funding";
  metrics: { label: string; value: string }[];
  website: string;
  frameworks?: string[];
  screenshots?: string[];
  accomplishments?: string[];
  features?: string[];
}

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | null;
}

const DEFAULT_RATIO = 16 / 9;

function measureImageRatio(src: string): Promise<number> {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
    img.onerror = () => resolve(DEFAULT_RATIO);
    img.src = src;
  });
}

const BrandModal = ({ isOpen, onClose, brand }: BrandModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaAspectRatios, setMediaAspectRatios] = useState<number[]>([]);
  const [loadedMediaIndices, setLoadedMediaIndices] = useState<Set<number>>(new Set());
  const [loadedThumbIndices, setLoadedThumbIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const onMediaLoad = useCallback((index: number) => {
    setLoadedMediaIndices((prev) => new Set(prev).add(index));
  }, []);
  const onThumbLoad = useCallback((index: number) => {
    setLoadedThumbIndices((prev) => new Set(prev).add(index));
  }, []);

  const mediaItems = brand?.screenshots?.map((img) => ({ type: "image" as const, src: img })) ?? [];

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
    } else {
      setCurrentMediaIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && brand) {
      setMediaAspectRatios([]);
      setLoadedMediaIndices(new Set());
      setLoadedThumbIndices(new Set());
    }
  }, [isOpen, brand]);

  // Non-blocking parallel aspect ratio measurement
  useEffect(() => {
    if (!isOpen || mediaItems.length <= 1) return;
    let cancelled = false;

    Promise.all(mediaItems.map((item) => measureImageRatio(item.src))).then((ratios) => {
      if (!cancelled) setMediaAspectRatios(ratios);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, brand]);

  if (!isOpen || !brand) return null;

  const nextMedia = () => {
    if (mediaItems.length > 1) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (mediaItems.length > 1) {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  const ratiosReady = mediaAspectRatios.length === mediaItems.length;
  const ratios = ratiosReady ? mediaAspectRatios : mediaItems.map(() => DEFAULT_RATIO);

  const calculateTransform = () => {
    if (!containerRef.current || mediaItems.length <= 1) return "translateX(0)";

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const mediaWidths = ratios.map((r) => containerHeight * r);

    let cum = 0;
    const positions = mediaWidths.map((w) => { const p = cum; cum += w; return p; });

    if (currentMediaIndex === 0) return "translateX(0px)";

    if (currentMediaIndex === mediaItems.length - 1) {
      const total = positions[positions.length - 1] + mediaWidths[mediaWidths.length - 1];
      return `translateX(-${Math.max(0, total - containerWidth)}px)`;
    }

    const center = positions[currentMediaIndex] + mediaWidths[currentMediaIndex] / 2;
    return `translateX(-${Math.max(0, center - containerWidth / 2)}px)`;
  };

  const statusBadgeClass = "bg-muted text-foreground border border-border";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex flex-col bg-background border border-border rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl max-h-[95svh] w-full mx-2 sm:mx-4 overflow-hidden">
        <div className="flex-shrink-0 flex items-start justify-between p-4 sm:p-6 border-b border-border gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={40}
              height={40}
              className="object-contain flex-shrink-0 sm:w-12 sm:h-12"
            />
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {brand.category}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-foreground mt-0.5 leading-snug">{brand.name}</h2>
              <span
                className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium mt-1.5 ${statusBadgeClass}`}
              >
                {brand.status}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors touch-manipulation mt-0.5">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 sm:p-6 pb-8 sm:pb-12">
            {mediaItems.length > 0 && (
              <div className="mb-8">
                {mediaItems.length === 1 ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
                    {!loadedMediaIndices.has(0) && <Skeleton className="absolute inset-0 rounded-2xl z-10" />}
                    <Image
                      src={mediaItems[0].src}
                      alt={`${brand.name} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                      className={cn("object-contain transition-opacity duration-300", loadedMediaIndices.has(0) ? "opacity-100" : "opacity-0")}
                      priority
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      onLoad={() => onMediaLoad(0)}
                      onError={() => onMediaLoad(0)}
                    />
                  </div>
                ) : !ratiosReady ? (
                  <Skeleton className="w-full rounded-2xl" style={{ aspectRatio: "16/9" }} />
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-muted">
                    <div ref={containerRef} className="w-full aspect-video overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out h-full"
                        style={{ transform: calculateTransform() }}
                      >
                        {mediaItems.map((mediaItem, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 relative overflow-hidden h-full bg-muted"
                            style={{ aspectRatio: ratios[index] }}
                          >
                            {!loadedMediaIndices.has(index) && <Skeleton className="absolute inset-0 z-10" />}
                            <Image
                              src={mediaItem.src}
                              alt={`${brand.name} - Screenshot ${index + 1}`}
                              fill
                              sizes="600px"
                              className={cn("object-contain transition-opacity duration-300", loadedMediaIndices.has(index) ? "opacity-100" : "opacity-0")}
                              priority={index === 0}
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                              onLoad={() => onMediaLoad(index)}
                              onError={() => onMediaLoad(index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={prevMedia} className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10 touch-manipulation">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button onClick={nextMedia} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10 touch-manipulation">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                      {currentMediaIndex + 1} / {mediaItems.length}
                    </div>
                  </div>
                )}

                {mediaItems.length > 1 && ratiosReady && (
                  <div className="flex gap-2 mt-3 sm:mt-4 overflow-x-auto pb-1">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors relative bg-muted touch-manipulation",
                          currentMediaIndex === index
                            ? "border-primary"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        {!loadedThumbIndices.has(index) && <Skeleton className="absolute inset-0 rounded-lg z-10" />}
                        <Image
                          src={mediaItem.src}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className={cn("object-cover transition-opacity duration-200", loadedThumbIndices.has(index) ? "opacity-100" : "opacity-0")}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          onLoad={() => onThumbLoad(index)}
                          onError={() => onThumbLoad(index)}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">About This Brand</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {brand.longDescription || brand.description}
                  </p>
                </div>

                {brand.metrics && brand.metrics.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {brand.metrics.map((metric, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {brand.accomplishments && brand.accomplishments.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Major Accomplishments</h3>
                    <ul className="space-y-2">
                      {brand.accomplishments.map((accomplishment, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{accomplishment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {brand.frameworks && brand.frameworks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.frameworks.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {brand.features && brand.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {brand.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Links</h3>
                  <div className="space-y-3">
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <span className="text-foreground font-medium">Visit Website</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
