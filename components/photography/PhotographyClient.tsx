"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { MasonryPhotoAlbum, type Photo as RpaPhoto, type RenderImageContext } from "react-photo-album";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import type { PhotoLite } from "@/lib/photography";
import { cn } from "@/lib/utils";

type AlbumPhoto = RpaPhoto & {
  blurDataURL: string;
  alt: string;
};

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const SIZES = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/** Per-photo cursor quips, keyed by src. */
const PHOTO_QUIPS: Record<string, string> = {
  "/photography/film/018-film-20260506-017.jpg": "so pretty!",
};

/**
 * Canonicalizes legacy `cat` query values. A `null` target means "this is the
 * default view, so drop the param". Used both to pick the active filter and to
 * rewrite stale URLs (see the redirect effect below).
 */
const CAT_ALIASES: Record<string, string | null> = {
  Film: "35mm",
  All: null,
  Top: null,
};

type Props = {
  photos: PhotoLite[];
  topPhotos: PhotoLite[];
  folders: string[];
};

export default function PhotographyClient({ photos, topPhotos, folders }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Longer staggered entrance on first paint (like Projects); quicker stagger
  // for subsequent filter switches.
  const isInitialMount = useRef(true);
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const rawCat = searchParams.get("cat");
  const resolvedCat = rawCat != null && rawCat in CAT_ALIASES ? CAT_ALIASES[rawCat] : rawCat;
  const activeFilter =
    resolvedCat && folders.includes(resolvedCat) ? resolvedCat : "Top";
  const rawI = searchParams.get("i");
  const parsedI = rawI === null ? -1 : Number.parseInt(rawI, 10);

  useEffect(() => {
    if (rawCat == null || !(rawCat in CAT_ALIASES)) return;
    const target = CAT_ALIASES[rawCat];
    if (target && !folders.includes(target)) return;
    const params = new URLSearchParams(searchParams.toString());
    if (target) params.set("cat", target);
    else params.delete("cat");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [rawCat, folders, pathname, router, searchParams]);

  const setQuery = useCallback(
    (updates: Record<string, string | null>, opts?: { push?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") params.delete(k);
        else params.set(k, v);
      }
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (opts?.push) router.push(url, { scroll: false });
      else router.replace(url, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const filtered: PhotoLite[] = useMemo(
    () =>
      activeFilter === "Top"
        ? topPhotos
        : photos.filter((p) => p.folder === activeFilter),
    [photos, topPhotos, activeFilter],
  );

  const albumPhotos: AlbumPhoto[] = useMemo(
    () =>
      filtered.map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        blurDataURL: p.blurDataURL,
        key: p.src,
      })),
    [filtered],
  );

  const lightboxIndex =
    Number.isFinite(parsedI) && parsedI >= 0 && parsedI < filtered.length ? parsedI : -1;
  const lightboxOpen = lightboxIndex >= 0;

  const lightboxSlides = useMemo(
    () =>
      filtered.map((p) => ({
        src: p.src,
        alt: p.alt,
        width: p.width,
        height: p.height,
        blurDataURL: p.blurDataURL,
      })),
    [filtered],
  );

  const onPickFilter = useCallback(
    (folder: string) => {
      if (folder === activeFilter) return;
      setQuery({ cat: folder === "Top" ? null : folder, i: null });
    },
    [activeFilter, setQuery],
  );

  const onAlbumClick = useCallback(
    ({ index }: { index: number }) => {
      setQuery({ i: String(index) }, { push: true });
    },
    [setQuery],
  );

  const onLightboxView = useCallback(
    ({ index }: { index: number }) => {
      if (index === lightboxIndex) return;
      setQuery({ i: String(index) });
    },
    [lightboxIndex, setQuery],
  );

  const onLightboxClose = useCallback(() => {
    setQuery({ i: null });
  }, [setQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        {/* Page header — fades in like Projects. The skeleton reserves this
            space invisibly, so the fade is the header's first appearance. */}
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.07,
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.47,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.13,
            }}
          >
            Photography
          </motion.h1>
        </motion.section>

        {/* Filter — same shell as ProjectFilter, centered */}
        <motion.section
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.33,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.27,
          }}
        >
          <PhotoFilterBar
            folders={folders}
            activeFilter={activeFilter}
            onPick={onPickFilter}
          />
        </motion.section>

        {/* Album — staggered tiles on first paint + crossfade between filters,
            matching Projects. The skeleton reserves this space invisibly so the
            entrance doesn't re-flash over solid placeholders. */}
        <AnimatePresence mode="wait">
          {albumPhotos.length > 0 ? (
            <motion.section
              key={activeFilter}
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MasonryPhotoAlbum
                photos={albumPhotos}
                columns={(w) => (w >= 1280 ? 4 : w >= 1024 ? 3 : w >= 640 ? 2 : 1)}
                spacing={10}
                defaultContainerWidth={1280}
                sizes={{ size: SIZES }}
                onClick={onAlbumClick}
                render={{
                  image: (_props, ctx) => (
                    <NextImageSlide ctx={ctx} useLongStagger={isInitialMount.current} />
                  ),
                }}
              />
            </motion.section>
          ) : null}
        </AnimatePresence>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={onLightboxClose}
            index={lightboxIndex}
            slides={lightboxSlides}
            on={{ view: onLightboxView }}
            controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
            animation={{ fade: 250, swipe: 350 }}
            carousel={{ finite: true, padding: "3%", spacing: "4%", imageFit: "contain" }}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.86)" },
              slide: { alignItems: "center", justifyContent: "center" },
            }}
            render={{
              slide: ({ slide, rect }) => {
                const w = slide.width ?? 1200;
                const h = slide.height ?? 800;
                const ratio = w / h;
                const maxW = Math.round(rect.width * 0.92);
                const maxH = Math.round(rect.height * 0.92);
                let renderW = maxW;
                let renderH = renderW / ratio;
                if (renderH > maxH) {
                  renderH = maxH;
                  renderW = renderH * ratio;
                }
                return (
                  <div
                    style={{ display: "contents" }}
                    data-cursor-quip={slide.src ? PHOTO_QUIPS[slide.src] : undefined}
                  >
                    <Image
                      src={slide.src!}
                      alt={slide.alt ?? ""}
                      width={Math.round(renderW)}
                      height={Math.round(renderH)}
                      placeholder="blur"
                      blurDataURL={(slide as { blurDataURL?: string }).blurDataURL}
                      sizes="92vw"
                      quality={90}
                      priority
                      style={{
                        maxWidth: "92vw",
                        maxHeight: "92vh",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                );
              },
            }}
          />
        )}
      </main>
    </div>
  );
}

function NextImageSlide({
  ctx,
  useLongStagger,
}: {
  ctx: RenderImageContext<AlbumPhoto>;
  useLongStagger: boolean;
}) {
  const { photo, width, height, index } = ctx;
  return (
    <motion.div
      data-cursor-quip={PHOTO_QUIPS[photo.src]}
      className="group relative w-full h-full overflow-hidden rounded-lg bg-muted"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        delay: useLongStagger ? 0.47 + index * 0.1 : 0.13 + index * 0.053,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        sizes={SIZES}
        priority={index < 4}
        className="block w-full h-auto"
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 transition-colors duration-400 ease-out group-hover:ease-in group-hover:bg-black/40"
        aria-hidden
      />
    </motion.div>
  );
}

/** Matches `ProjectFilter` styling — rounded card + pill buttons. */
function PhotoFilterBar({
  folders,
  activeFilter,
  onPick,
}: {
  folders: string[];
  activeFilter: string;
  onPick: (folder: string) => void;
}) {
  const tabs = ["Top", ...folders];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 bg-card border border-border rounded-full p-2 max-w-full">
      {tabs.map((folder) => {
        const isActive = activeFilter === folder;
        return (
          <button
            key={folder}
            type="button"
            onClick={() => onPick(folder)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
            )}
          >
            {folder}
          </button>
        );
      })}
    </div>
  );
}
