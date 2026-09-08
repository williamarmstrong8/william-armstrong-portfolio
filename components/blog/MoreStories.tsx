"use client";

import { motion } from "framer-motion";
import { Post } from "@/interfaces/post";
import PostPreview from "./PostPreview";
import { cardEntrance, cardHover } from "@/lib/motion";

type Props = {
  posts: Post[];
};

export default function MoreStories({ posts }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          {...cardEntrance(index, true)}
          whileHover={cardHover}
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
