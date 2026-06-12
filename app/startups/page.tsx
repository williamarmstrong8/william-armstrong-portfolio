import type { Metadata } from "next";
import StartupsClient from "@/components/startups/StartupsClient";
import { startups } from "@/data/startups";

export const metadata: Metadata = {
  title: "Startups - William Armstrong | Mod Brew, Happy Mile, Drifters, Club Pack",
  description:
    "Explore William Armstrong's entrepreneurial ventures and startups: Mod Brew coffee pop-up, Happy Mile running club, Drifters outdoor apparel, and Club Pack student organization platform.",
  alternates: { canonical: "/startups" },
};

export default function Startups() {
  return <StartupsClient startups={startups} />;
}
