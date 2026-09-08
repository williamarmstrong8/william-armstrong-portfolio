"use client";

import { motion } from "framer-motion";
import { Post } from "@/interfaces/post";
import MoreStories from "./MoreStories";
import PageHeader from "@/components/PageHeader";

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <>
      <PageHeader title="Blog" />

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
