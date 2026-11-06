import HeroSection from "@/components/home/HeroSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import FeaturedStartups from "@/components/home/FeaturedStartups";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description:
    "William Armstrong, Solutions Architect at Vercel. Building production web and AI applications across architecture, engineering, and product. Explore projects, startups, and writing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-svh bg-hero text-hero-foreground">
      <HeroSection />
      <WhatIBuild />
      <FeaturedStartups />
    </div>
  );
}