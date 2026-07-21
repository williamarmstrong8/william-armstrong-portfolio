"use client";

import { motion } from "framer-motion";
import { Post } from "@/interfaces/post";
import MoreStories from "./MoreStories";

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <>
      {/* Page Header */}
      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.07,
        }}
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.47,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.13,
          }}
        >
          Blog
        </motion.h1>
      </motion.section>

      {/* Posts Grid - same pattern as Startups/Projects: section then cards animate in order */}
      {posts.length > 0 ? (
        <MoreStories posts={posts} />
      ) : (
        <motion.p
          className="text-muted-foreground text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.33, delay: 0.33 }}
        >
          No posts yet. Check back soon.
        </motion.p>
      )}
    </>
  );
}
