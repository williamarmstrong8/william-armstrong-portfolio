import HeroSection from "@/components/home/HeroSection";
import Statement from "@/components/home/Statement";
import SelectedWork from "@/components/home/SelectedWork";
import ContactCTA from "@/components/home/ContactCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description:
    "William Armstrong — Solutions Engineer & architect who bridges product, engineering, and business. Automation, integrations, and systems thinking. Explore projects, startups, and writing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <HeroSection />
      <Statement />
      <SelectedWork />
      <ContactCTA />
    </div>
  );
}
