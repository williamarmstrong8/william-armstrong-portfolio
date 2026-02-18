import HeroSection from "@/components/home/HeroSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import ProjectsSection from "@/components/ProjectsSection";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "William Armstrong | Portfolio",
  description: "Discover William Armstrong's portfolio: Product Engineer specializing in human-centered design, entrepreneur, and creative professional. Explore innovative projects, startups, and photography.",
  keywords: [
    "William Armstrong",
    "Product Engineer",
    "Human-Centered Design",
    "Entrepreneur",
    "Portfolio",
    "Software Engineer",
    "Boston College",
    "UI/UX Design",
    "Product Development"
  ],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://williamarmstrong.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "William Armstrong | Portfolio",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional building innovative solutions.",
    url: "https://williamarmstrong.dev",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-armstrong-og.png",
        width: 1200,
        height: 630,
        alt: "William Armstrong | Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Armstrong | Portfolio",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design and innovative solutions.",
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
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hero text-hero-foreground">
      <HeroSection />
      <WhatIBuild />
      <ProjectsSection />
    </div>
  );
}