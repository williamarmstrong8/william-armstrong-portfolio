"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/blur";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null | undefined;
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

function measureVideoRatio(src: string): Promise<number> {
  return new Promise((resolve) => {
    const vid = document.createElement("video");
    vid.onloadedmetadata = () => {
      resolve((vid.videoWidth || 16) / (vid.videoHeight || 9));
      vid.src = "";
    };
    vid.onerror = () => {
      resolve(DEFAULT_RATIO);
      vid.src = "";
    };
    vid.preload = "metadata";
    vid.src = src;
  });
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaAspectRatios, setMediaAspectRatios] = useState<number[]>([]);
  const [loadedMediaIndices, setLoadedMediaIndices] = useState<Set<number>>(new Set());
  const [loadedThumbIndices, setLoadedThumbIndices] = useState<Set<number>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const onMediaLoad = useCallback((index: number) => {
    setLoadedMediaIndices((prev) => new Set(prev).add(index));
  }, []);
  const onThumbLoad = useCallback((index: number) => {
    setLoadedThumbIndices((prev) => new Set(prev).add(index));
  }, []);

  const mediaItems = [
    ...(project?.images?.map(img => ({ type: 'image' as const, src: img })) ?? []),
    ...(project?.videos?.map(vid => ({ type: 'video' as const, src: vid })) ?? []),
  ];

  const videoPoster = project?.videoPoster;

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    } else {
      setCurrentMediaIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && project) {
      setMediaAspectRatios([]);
      setLoadedMediaIndices(new Set());
      setLoadedThumbIndices(new Set());
      setPlayingVideos(new Set());
    }
  }, [isOpen, project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Non-blocking parallel aspect ratio measurement
  useEffect(() => {
    if (!isOpen || mediaItems.length <= 1) return;
    let cancelled = false;

    Promise.all(
      mediaItems.map((item) =>
        item.type === "image" ? measureImageRatio(item.src) : measureVideoRatio(item.src)
      )
    ).then((ratios) => {
      if (!cancelled) setMediaAspectRatios(ratios);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

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

  const startVideo = (index: number) => {
    setPlayingVideos((prev) => new Set(prev).add(index));
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

  const renderSingleImage = () => (
    <div className="relative w-full aspect-video max-h-[70vh] mx-auto rounded-2xl overflow-hidden bg-muted">
      {!loadedMediaIndices.has(0) && <Skeleton className="absolute inset-0 rounded-2xl z-10" />}
      <Image
        src={mediaItems[0].src}
        alt={`${project.title} screenshot`}
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
  );

  const renderSingleVideo = () => (
    <div className="relative w-full aspect-video max-h-[70vh] rounded-2xl overflow-hidden bg-black">
      {playingVideos.has(0) ? (
        <video
          src={mediaItems[0].src}
          className="absolute inset-0 w-full h-full object-contain"
          controls autoPlay playsInline preload="auto"
        />
      ) : videoPoster ? (
        <button type="button" onClick={() => startVideo(0)} className="relative w-full h-full group cursor-pointer">
          <Image src={videoPoster} alt={`${project.title} video`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px" className="object-contain" priority placeholder="blur" blurDataURL={BLUR_DATA_URL} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </button>
      ) : (
        <button type="button" onClick={() => startVideo(0)} className="relative w-full h-full group cursor-pointer">
          <video
            src={mediaItems[0].src}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            muted playsInline preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </button>
      )}
    </div>
  );

  const renderCarousel = () => (
    <div className="relative rounded-2xl overflow-hidden bg-muted">
      <div ref={containerRef} className="w-full aspect-video overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: calculateTransform() }}
        >
          {mediaItems.map((mediaItem, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative overflow-hidden h-full"
              style={{ aspectRatio: ratios[index] }}
            >
              {mediaItem.type === "image" ? (
                <>
                  {!loadedMediaIndices.has(index) && <Skeleton className="absolute inset-0 z-10" />}
                  <Image
                    src={mediaItem.src}
                    alt={`${project.title} - Screenshot ${index + 1}`}
                    fill
                    sizes="600px"
                    className={cn("object-contain transition-opacity duration-300", loadedMediaIndices.has(index) ? "opacity-100" : "opacity-0")}
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    onLoad={() => onMediaLoad(index)}
                    onError={() => onMediaLoad(index)}
                  />
                </>
              ) : (
                <div className="h-full w-full bg-black flex items-center justify-center">
                  {playingVideos.has(index) ? (
                    <video
                      src={mediaItem.src}
                      className="absolute inset-0 w-full h-full object-contain"
                      controls autoPlay playsInline preload="auto"
                    />
                  ) : videoPoster ? (
                    <button type="button" onClick={() => startVideo(index)} className="relative w-full h-full group cursor-pointer">
                      <Image src={videoPoster} alt={`${project.title} video`} fill sizes="600px" className="object-contain" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button type="button" onClick={() => startVideo(index)} className="relative w-full h-full group cursor-pointer">
                      <video
                        src={mediaItem.src}
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        muted playsInline preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={prevMedia} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={nextMedia} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
        {currentMediaIndex + 1} / {mediaItems.length}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex flex-col bg-background border border-border rounded-3xl shadow-2xl max-w-7xl max-h-[95vh] w-full mx-4 overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border">
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold text-foreground mt-1">{project.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{project.date}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 pb-12">
            {mediaItems.length > 0 && (
              <div className="mb-8">
                {mediaItems.length === 1 && mediaItems[0].type === "image" && renderSingleImage()}
                {mediaItems.length === 1 && mediaItems[0].type === "video" && renderSingleVideo()}
                {mediaItems.length > 1 && !ratiosReady && (
                  <Skeleton className="w-full rounded-2xl" style={{ aspectRatio: "16/9" }} />
                )}
                {mediaItems.length > 1 && ratiosReady && renderCarousel()}

                {mediaItems.length > 1 && ratiosReady && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors relative",
                          currentMediaIndex === index ? "border-primary" : "border-border hover:border-muted-foreground"
                        )}
                      >
                        {mediaItem.type === "image" ? (
                          <>
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
                          </>
                        ) : (
                          <div className="w-full h-full relative bg-zinc-900">
                            {videoPoster ? (
                              <Image src={videoPoster} alt={`Video ${index + 1}`} fill sizes="64px" className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                            ) : (
                              <video src={mediaItem.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Play className="w-5 h-5 text-white drop-shadow" fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">About This Project</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(project.link || project.github) && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Links</h3>
                    <div className="space-y-3">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">View Live Site</span>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Github className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">View on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
