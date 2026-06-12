import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";

import { blogs } from "../data/blogs";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const Blog = ({ onSelectPost, onViewAllClick }) => {
  return (
    <section id="blog" className="py-24 bg-transparent relative">
      <div className="max-width-container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 flex flex-col items-center gap-4">
          <Badge label="INSIGHTS" variant="accent" />
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
            Blog
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed">
            Practical articles on product, design, and growth — no fluff.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {blogs.slice(0, 3).map((post, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <GlassCard className="p-6 h-full flex flex-col justify-between group glass-effect-hover border-white/[0.04]">
                <div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-sans font-semibold tracking-wider text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-[4px] border border-accent/10">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-text-muted">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-space font-semibold text-[19px] sm:text-[20px] text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-250">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                </div>

                {/* Author row & Read link */}
                <div className="mt-auto pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between">
                    {/* Author info */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-white/10 flex items-center justify-center text-[9px] font-bold text-accent">
                        OH
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-text-primary leading-none">OfficienHub Team</p>
                        <p className="text-[9px] text-text-muted mt-0.5">{post.date}</p>
                      </div>
                    </div>

                    {/* Read link */}
                    <button
                      onClick={() => onSelectPost(post)}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-accent hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Read
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Articles button */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="md" onClick={onViewAllClick}>
            View All Blogs
          </Button>
        </div>

      </div>
    </section>
  );
};
