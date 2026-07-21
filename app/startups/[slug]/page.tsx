import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StartupCaseStudy from "@/components/startups/StartupCaseStudy";
import { getAllStartupSlugs, getStartupBySlug } from "@/data/startups";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllStartupSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) {
    return { title: "Startup Not Found" };
  }

  const title = `${startup.name} - ${startup.headline} | William Armstrong`;
  const description = startup.description;
  const image = startup.screenshots?.[0];

  return {
    title,
    description,
    alternates: { canonical: `/startups/${startup.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: startup.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function StartupPage({ params }: Props) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) {
    notFound();
  }

  return <StartupCaseStudy startup={startup} />;
}
