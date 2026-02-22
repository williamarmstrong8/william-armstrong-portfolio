import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Use production URL for metadata so OG/twitter images always resolve to your live site
// (VERCEL_URL is per-deployment and would make preview builds output preview URLs in meta tags)
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamarmstrong.vercel.app";

export const metadata: Metadata = {
  title: "William Armstrong - Product Engineer & Entrepreneur",
  description:
    "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional building innovative solutions.",
  metadataBase: new URL(baseUrl),
  manifest: "/manifest.json",
  icons: {
    icon: "/fav1.jpg",
    shortcut: "/fav1.jpg",
    apple: "/fav1.jpg",
  },
  openGraph: {
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description:
      "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional.",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/fav1.jpg", width: 1200, height: 630, alt: "William Armstrong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description:
      "Portfolio of William Armstrong: Product Engineer specializing in human-centered design and innovative solutions.",
    creator: "@williamarmstrong",
    images: ["/fav1.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="website" />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}