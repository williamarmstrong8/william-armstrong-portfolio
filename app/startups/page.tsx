import type { Metadata } from "next";
import BrandsClient from "@/components/brands/BrandsClient";

export const metadata: Metadata = {
  title: "Startups - William Armstrong | Mod Brew, Happy Mile, Drifters, Club Pack",
  description: "Explore William Armstrong's entrepreneurial ventures and startups: Mod Brew coffee pop-up, Happy Mile running club, Drifters outdoor apparel, and Club Pack student organization platform.",
  keywords: [
    "William Armstrong",
    "Startups",
    "Mod Brew",
    "Happy Mile",
    "Drifters",
    "Club Pack",
    "Venture Building",
    "Coffee Business",
    "Running Club",
    "Outdoor Apparel",
    "Student Platform",
    "Entrepreneurship"
  ],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  metadataBase: new URL('https://williamarmstrong.dev'),
  alternates: {
    canonical: '/startups',
  },
  openGraph: {
    title: "Startups - William Armstrong | Venture Building Portfolio",
    description: "William Armstrong's entrepreneurial ventures: Mod Brew, Happy Mile, Drifters, and Club Pack. From coffee pop-ups to student platforms, explore innovative startups.",
    url: "https://williamarmstrong.dev/startups",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-armstrong-og.png",
        width: 1200,
        height: 630,
        alt: "William Armstrong Startups Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startups - William Armstrong",
    description: "Mod Brew, Happy Mile, Drifters, and Club Pack - William Armstrong's entrepreneurial ventures and startups.",
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
  category: "Startups",
};

const Startups = () => {
  return <BrandsClient />;
};

export default Startups;
