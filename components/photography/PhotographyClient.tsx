"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { MasonryPhotoAlbum, type Photo as RpaPhoto, type RenderImageContext } from "react-photo-album";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import type { PhotoLite } from "@/lib/photography";
import FilterBar from "@/components/FilterBar";
import PageHeader from "@/components/PageHeader";

type AlbumPhoto = RpaPhoto & {
  blurDataURL: string;
  alt: string;
};

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const SIZES = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
const LIGHTBOX_HISTORY_KEY = "photographyLightboxGallery";

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
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const closingLightbox = useRef(false);

  const rawCat = searchParams.get("cat");
  const resolvedCat = rawCat != null && rawCat in CAT_ALIASES ? CAT_ALIASES[rawCat] : rawCat;
  const activeFilter =
    resolvedCat && folders.includes(resolvedCat) ? resolvedCat : "Top";
  const rawI = searchParams.get("i");
  const parsedI = rawI === null ? -1 : Number.parseInt(rawI, 10);

  const setQuery = useCallback(
    (updates: Record<string, string | null>, mode: "open" | "gallery" | "replace" = "replace") => {
      // Next's native-history integration updates search params and copies its
      // internal state. Passing its internal flags here would bypass that sync.
      const url = new URL(window.location.href);
      const galleryUrl = new URL(url);
      galleryUrl.searchParams.delete("i");
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") url.searchParams.delete(key);
        else url.searchParams.set(key, value);
      }
      if (url.href === window.location.href) return;
      const state: { [LIGHTBOX_HISTORY_KEY]?: string } = {};
      const existingGallery = window.history.state?.[LIGHTBOX_HISTORY_KEY];
      if (mode === "replace" && typeof existingGallery === "string") {
        state[LIGHTBOX_HISTORY_KEY] = existingGallery;
      }
      if (mode === "open") {
        state[LIGHTBOX_HISTORY_KEY] = galleryUrl.href;
        window.history.pushState(state, "", url);
      } else {
        window.history.replaceState(state, "", url);
      }
    },
    [],
  );

  useEffect(() => {
    if (rawCat == null || !(rawCat in CAT_ALIASES)) return;
    const target = CAT_ALIASES[rawCat];
    if (target && !folders.includes(target)) return;
    setQuery({ cat: target });
  }, [rawCat, folders, setQuery]);

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

  useEffect(() => {
    closingLightbox.current = false;
  }, [lightboxOpen]);

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
      setQuery({ cat: folder === "Top" ? null : folder, i: null }, "gallery");
    },
    [activeFilter, setQuery],
  );

  const onAlbumClick = useCallback(
    ({ index }: { index: number }) => {
      closingLightbox.current = false;
      setQuery({ i: String(index) }, "open");
    },
    [setQuery],
  );

  const onLightboxView = useCallback(
    ({ index }: { index: number }) => {
      if (closingLightbox.current || index === lightboxIndex) return;
      setQuery({ i: String(index) });
    },
    [lightboxIndex, setQuery],
  );

  const onLightboxClose = useCallback(() => {
    if (closingLightbox.current) return;
    closingLightbox.current = true;
    const galleryUrl = new URL(window.location.href);
    galleryUrl.searchParams.delete("i");
    // Only entries opened from this gallery can go back. The marker lives on
    // the entry, so it also survives slides, reloads, and Back/Forward.
    if (window.history.state?.[LIGHTBOX_HISTORY_KEY] === galleryUrl.href) {
      window.history.back();
    } else {
      setQuery({ i: null }, "gallery");
    }
  }, [setQuery]);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <PageHeader title="Photography" className="text-center mb-12" animate={false} />

        <section className="flex justify-center mb-12">
          <FilterBar
            label="Photo categories"
            tabs={["Top", ...folders]}
            activeFilter={activeFilter}
            onFilterChange={onPickFilter}
          />
        </section>

        <p className="mb-6 text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length === 1 ? "photo" : "photos"} in {activeFilter}
        </p>

        {/* Keep the gallery visible across hydration and filter changes rather
            than replaying an entrance over the loading placeholders. */}
        <section aria-label={`${activeFilter} photos`}>
          {albumPhotos.length > 0 ? (
            <MasonryPhotoAlbum
              photos={albumPhotos}
              columns={(w) => (w >= 1280 ? 4 : w >= 1024 ? 3 : w >= 640 ? 2 : 1)}
              spacing={10}
              defaultContainerWidth={1280}
              sizes={{ size: SIZES }}
              onClick={onAlbumClick}
              render={{ image: (_props, ctx) => <NextImageSlide key={ctx.photo.src} ctx={ctx} /> }}
            />
          ) : (
            <p className="py-12 text-center text-muted-foreground">No photos in this category.</p>
          )}
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={onLightboxClose}
            index={lightboxIndex}
            slides={lightboxSlides}
            on={{ view: onLightboxView }}
            controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
            animation={{ fade: reduceMotion ? 0 : 250, swipe: reduceMotion ? 0 : 350 }}
            carousel={{ finite: true, padding: "3%", spacing: "4%", imageFit: "contain" }}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.86)" },
              slide: { alignItems: "center", justifyContent: "center" },
            }}
            render={{
              slide: ({ slide, rect, offset }) => {
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
                  <PhotoImage
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt ?? "Photograph"}
                    width={Math.round(renderW)}
                    height={Math.round(renderH)}
                    blurDataURL={"blurDataURL" in slide && typeof slide.blurDataURL === "string" ? slide.blurDataURL : undefined}
                    lightbox
                    announce={offset === 0}
                    priority={offset === 0}
                  />
                );
              },
            }}
          />
        )}
      </main>
    </div>
  );
}

function NextImageSlide({ ctx }: { ctx: RenderImageContext<AlbumPhoto> }) {
  const { photo, width, height, index } = ctx;
  return (
    <PhotoImage
      key={photo.src}
      src={photo.src}
      alt={photo.alt}
      width={width}
      height={height}
      blurDataURL={photo.blurDataURL}
      priority={index < 4}
    />
  );
}

function PhotoImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  lightbox = false,
  announce = false,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  lightbox?: boolean;
  announce?: boolean;
  priority?: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const description = alt || "Photograph";

  return (
    <div
      data-cursor-quip={PHOTO_QUIPS[src]}
      className="group relative overflow-hidden bg-muted"
      style={lightbox ? { width, height, maxWidth: "92vw", maxHeight: "92vh" } : { width: "100%", aspectRatio: `${width} / ${height}` }}
    >
      {status !== "error" && (
        <Image
          src={src}
          alt={description}
          fill
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          sizes={lightbox ? "92vw" : SIZES}
          quality={lightbox ? 90 : undefined}
          priority={priority}
          className="object-contain"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
      {status !== "loaded" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/90 px-4 text-center text-sm text-muted-foreground"
          role={announce ? "status" : undefined}
          aria-live={announce ? "polite" : undefined}
        >
          {status === "error" ? (
            <span role="img" aria-label={`${description} — image unavailable`}>Image unavailable</span>
          ) : (
            <span>Loading photo…<span className="sr-only"> {description}</span></span>
          )}
        </div>
      )}
      {!lightbox && status === "loaded" && (
        <div
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 ease-out group-hover:bg-black/40 motion-reduce:transition-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
