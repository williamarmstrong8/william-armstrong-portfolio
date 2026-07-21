import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ContentCursor from "@/components/ui/ContentCursor";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "William Armstrong - Solutions Engineer & Entrepreneur",
  description:
    "Portfolio of William Armstrong: Solutions Engineer bridging product, engineering, and business. Entrepreneur and creative professional building practical, scalable systems.",
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: {
    icon: "/fav1.jpg",
    shortcut: "/fav1.jpg",
    apple: "/fav1.jpg",
  },
  openGraph: {
    title: "William Armstrong - Solutions Engineer & Entrepreneur",
    description:
      "Portfolio of William Armstrong: Solutions Engineer bridging product, engineering, and business. Entrepreneur and creative professional.",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/fav1.jpg", width: 1200, height: 630, alt: "William Armstrong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Armstrong - Solutions Engineer & Entrepreneur",
    description:
      "Portfolio of William Armstrong: Solutions Engineer bridging product, engineering, and business with practical technical solutions.",
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
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <SmoothScroll />
        <ContentCursor />
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}