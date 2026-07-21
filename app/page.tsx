import HeroSection from "@/components/home/HeroSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import FeaturedStartups from "@/components/home/FeaturedStartups";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description:
    "William Armstrong — Solutions Engineer & architect who bridges product, engineering, and business. Automation, integrations, and systems thinking. Explore projects, startups, and writing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hero text-hero-foreground">
      <HeroSection />
      <WhatIBuild />
      <FeaturedStartups />
    </div>
  );
}