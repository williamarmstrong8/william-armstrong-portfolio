import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog/api";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog | William Armstrong - Solutions Engineer & Entrepreneur",
  description:
    "Thoughts on my building process and what I learn. William Armstrong on product, engineering, and shipping.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <BlogClient posts={allPosts} />
      </main>
    </div>
  );
}
