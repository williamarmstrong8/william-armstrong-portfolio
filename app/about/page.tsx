import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About William Armstrong - Journey as Product Engineer & Entrepreneur",
  description: "Discover William Armstrong's background: Boston College graduate in Human-Centered Engineering, entrepreneur, and leader. Learn about his experience in product development, venture building, and community impact.",
  keywords: [
    "William Armstrong",
    "About",
    "Product Engineer",
    "Human-Centered Engineering",
    "Boston College",
    "Entrepreneur",
    "Soaring Startup Circle",
    "Mark Farrell Campaign",
    "Venture Building",
    "Engineering Portfolio"
  ],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  metadataBase: new URL('https://williamarmstrong.dev'),
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About William Armstrong - Product Engineer & Entrepreneur Journey",
    description: "Learn about William Armstrong's background in human-centered engineering, entrepreneurship, and leadership. Boston College graduate with experience in product development and venture building.",
    url: "https://williamarmstrong.dev/about",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-armstrong-og.png",
        width: 1200,
        height: 630,
        alt: "William Armstrong - Boston College Engineering Graduate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About William Armstrong - Product Engineer Journey",
    description: "Boston College graduate in Human-Centered Engineering. Entrepreneur and leader passionate about building innovative solutions.",
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
  category: "About",
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="profile" />
      <AboutClient />
    </>
  );
}