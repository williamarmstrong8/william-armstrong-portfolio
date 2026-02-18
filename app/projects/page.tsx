import type { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Engineering Projects - William Armstrong Portfolio | AI, IoT & Product Development",
  description: "Explore William Armstrong's engineering portfolio: AI Blog Generator, Cora Fitness brand, Proof social health tracker, PWS smart refrigeration system, waste management solutions, and innovative product development projects.",
  keywords: [
    "William Armstrong",
    "Engineering Projects",
    "AI Blog Generator",
    "Cora Fitness",
    "Proof App",
    "PWS Refrigeration",
    "Waste Management System",
    "Product Development",
    "Human-Centered Design",
    "IoT Solutions",
    "UI/UX Design",
    "Smart Systems"
  ],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  metadataBase: new URL('https://williamarmstrong.dev'),
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: "Engineering Projects - William Armstrong | AI, IoT & Product Development",
    description: "Portfolio of engineering projects by William Armstrong: AI Blog Generator, fitness apps, smart refrigeration systems, waste management solutions, and innovative product development.",
    url: "https://williamarmstrong.dev/projects",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-armstrong-og.png",
        width: 1200,
        height: 630,
        alt: "William Armstrong Engineering Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Projects - William Armstrong Portfolio",
    description: "AI Blog Generator, fitness apps, smart systems, and innovative engineering solutions by William Armstrong.",
    creator: "@williamarmstrong",
    images: ["/william-armstrong-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "Projects",
};

export default function Projects() {
  return <ProjectsClient projects={projects} />;
}