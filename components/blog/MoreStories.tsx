"use client";

import { motion } from "framer-motion";
import { Post } from "@/interfaces/post";
import PostPreview from "./PostPreview";

type Props = {
  posts: Post[];
};

export default function MoreStories({ posts }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.47 + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            y: -8,
            transition: { duration: 0.3 },
          }}
        >
          <PostPreview
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            number={post.number}
            category={post.category}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
