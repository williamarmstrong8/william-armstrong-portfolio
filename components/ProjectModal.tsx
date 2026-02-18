"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URL } from "@/lib/blur";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: string[];
  videos?: string[];
  technologies?: string[];
  features?: string[];
  link?: string;
  github?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null | undefined;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaAspectRatios, setMediaAspectRatios] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const mediaItems = useMemo(
    () => [
      ...(project?.images?.map(img => ({ type: 'image' as const, src: img })) || []),
      ...(project?.videos?.map(vid => ({ type: 'video' as const, src: vid })) || []),
    ],
    [project?.images, project?.videos]
  );

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

  // Reset aspect ratios when modal opens or project changes so we show skeleton until dimensions load (avoids layout shift)
  useEffect(() => {
    if (isOpen && project) setMediaAspectRatios([]);
  }, [isOpen, project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (mediaItems.length > 0) {
      const loadAspectRatios = async () => {
        const ratios: number[] = [];
        for (const mediaItem of mediaItems) {
          if (mediaItem.type === 'image') {
            const img = document.createElement('img');
            await new Promise((resolve) => {
              img.onload = () => {
                ratios.push(img.naturalWidth / img.naturalHeight);
                resolve(true);
              };
              img.onerror = () => {
                ratios.push(4 / 3);
                resolve(true);
              };
              img.src = mediaItem.src;
            });
          } else {
            const vid = document.createElement("video");
            await new Promise((resolve) => {
              const cleanup = () => {
                vid.onloadedmetadata = null;
                vid.onerror = null;
                // Help GC on some browsers
                vid.src = "";
              };

              vid.onloadedmetadata = () => {
                const w = vid.videoWidth || 16;
                const h = vid.videoHeight || 9;
                ratios.push(w / h);
                cleanup();
                resolve(true);
              };
              vid.onerror = () => {
                ratios.push(16 / 9);
                cleanup();
                resolve(true);
              };

              vid.preload = "metadata";
              vid.src = mediaItem.src;
            });
          }
        }
        setMediaAspectRatios(ratios);
      };
      loadAspectRatios();
    }
  }, [mediaItems]);

  if (!isOpen || !project) return null;

  const nextMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  const calculateTransform = () => {
    if (!containerRef.current || mediaItems.length === 0 || mediaAspectRatios.length === 0) {
      return 'translateX(0)';
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const mediaWidths = mediaAspectRatios.map(ratio => containerHeight * ratio);

    let cumulativeWidth = 0;
    const mediaPositions = mediaWidths.map(width => {
      const position = cumulativeWidth;
      cumulativeWidth += width;
      return position;
    });

    const currentMediaPosition = mediaPositions[currentMediaIndex] || 0;
    const currentMediaWidth = mediaWidths[currentMediaIndex] || containerWidth;
    const currentMediaCenter = currentMediaPosition + (currentMediaWidth / 2);

    if (currentMediaIndex === 0) return 'translateX(0px)';
    if (currentMediaIndex === mediaItems.length - 1) {
      const totalWidth = mediaPositions[mediaPositions.length - 1] + mediaWidths[mediaWidths.length - 1];
      const translateX = Math.max(0, totalWidth - containerWidth);
      return `translateX(-${translateX}px)`;
    }

    const containerCenter = containerWidth / 2;
    const translateX = Math.max(0, currentMediaCenter - containerCenter);
    return `translateX(-${translateX}px)`;
  };

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
                {mediaAspectRatios.length !== mediaItems.length ? (
                  <div
                    className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-muted animate-pulse"
                    style={{ aspectRatio: "16/9" }}
                  />
                ) : mediaItems.length === 1 && mediaItems[0].type === 'image' ? (
                  <div className="relative w-full aspect-video max-h-[70vh] mx-auto rounded-2xl overflow-hidden">
                    <Image
                      src={mediaItems[0].src}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 80vw"
                      className="object-contain rounded-2xl"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                ) : mediaItems.length === 1 && mediaItems[0].type === 'video' ? (
                  <div className="relative w-full aspect-video max-h-[70vh] rounded-2xl overflow-hidden bg-black">
                    <video
                      src={mediaItems[0].src}
                      className="w-full h-full object-contain rounded-2xl"
                      controls
                    />
                  </div>
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
                            className="flex-shrink-0 relative overflow-hidden h-full"
                            style={{ aspectRatio: mediaAspectRatios[index] }}
                          >
                            {mediaItem.type === 'image' ? (
                              <Image
                                src={mediaItem.src}
                                alt={`${project.title} - Screenshot ${index + 1}`}
                                fill
                                sizes="600px"
                                className="object-contain"
                                placeholder="blur"
                                blurDataURL={BLUR_DATA_URL}
                                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                              />
                            ) : (
                              <video
                                src={mediaItem.src}
                                className="h-full w-full object-contain"
                                controls
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {mediaItems.length > 1 && (
                      <>
                        <button onClick={prevMedia} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button onClick={nextMedia} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                          {currentMediaIndex + 1} / {mediaItems.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {mediaItems.length > 1 && mediaAspectRatios.length === mediaItems.length && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors relative",
                          currentMediaIndex === index ? "border-primary" : "border-border hover:border-muted-foreground"
                        )}
                      >
                        {mediaItem.type === 'image' ? (
                          <Image
                            src={mediaItem.src}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted relative">
                            <video
                              src={mediaItem.src}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <svg className="w-6 h-6 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
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
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">View Live Site</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                        >
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
