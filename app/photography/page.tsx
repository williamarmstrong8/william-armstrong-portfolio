import type { Metadata } from "next";
import { Suspense } from "react";
import PhotographyClient from "@/components/photography/PhotographyClient";
import PhotographyPageFallback from "@/components/photography/PhotographyPageFallback";
import { photosLite, folders, topPhotosLite } from "@/lib/photography";

export const metadata: Metadata = {
  title: "Photography Portfolio - William Armstrong | Landscapes, Events & Creative Shots",
  description:
    "Explore William Armstrong's photography portfolio: Boston College landscapes, 5K Run & Roll events, graduation ceremonies, and creative moments captured with passion and artistic vision.",
  alternates: { canonical: "/photography" },
};

export default function PhotographyPage() {
  return (
    <Suspense fallback={<PhotographyPageFallback />}>
      <PhotographyClient photos={photosLite} topPhotos={topPhotosLite} folders={folders} />
    </Suspense>
  );
}
