import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "William Armstrong - Product Engineer & Entrepreneur",
  description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional building innovative solutions.",
  keywords: ["William Armstrong", "Product Engineer", "Human-Centered Design", "Entrepreneur", "Portfolio"],
  authors: [{ name: "William Armstrong" }],
  creator: "William Armstrong",
  publisher: "William Armstrong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://williamarmstrong.dev'),
  manifest: '/manifest.json',
  icons: {
    icon: '/fav1.jpg',
    shortcut: '/fav1.jpg',
    apple: '/fav1.jpg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'William Armstrong',
  },
  openGraph: {
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional.",
    url: "https://williamarmstrong.dev",
    siteName: "William Armstrong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/william-1.JPG",
        width: 1200,
        height: 630,
        alt: "William Armstrong - Product Engineer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Armstrong - Product Engineer & Entrepreneur",
    description: "Portfolio of William Armstrong: Product Engineer specializing in human-centered design and innovative solutions.",
    creator: "@williamarmstrong",
    images: ["/william-1.JPG"],
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
      </body>
    </html>
  );
}