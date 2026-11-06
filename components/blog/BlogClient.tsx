"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Post } from "@/interfaces/post";
import MoreStories from "./MoreStories";
import PageHeader from "@/components/PageHeader";

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      <PageHeader title="Blog" />
      <p role="status" aria-live="polite" aria-atomic="true" className="mb-6 text-sm text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>

      {/* Posts Grid - same pattern as Startups/Projects: section then cards animate in order */}
      {posts.length > 0 ? (
        <MoreStories posts={posts} />
      ) : (
        <motion.p
          className="text-muted-foreground text-center py-16"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.33, delay: 0.33 }}
        >
          No posts yet. Check back soon.
        </motion.p>
      )}
    </>
  );
}
