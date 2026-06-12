import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { blogs } from "../data/blogs";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const BlogArticlesPage = ({ onSelectPost, onBack }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary relative font-sans">
      
      {/* Simple navigation navbar for blog list */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-xl border-b border-white/[0.06] py-4">
        <div className="max-width-container w-full mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 group text-[14px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-sans font-semibold"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </button>

          <a href="#home" onClick={(e) => { e.preventDefault(); onBack(); }} className="hidden sm:flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
              <div className="bg-accent rounded-[2px]" />
              <div className="bg-accent rounded-[2px]" />
              <div className="bg-accent rounded-[2px]" />
              <div className="bg-accent rounded-[2px]" />
            </div>
            <span className="font-space text-lg font-bold tracking-tight">
              Officien<span className="text-accent">Hub</span>
            </span>
          </a>

          <div>
            <Button size="sm" onClick={onBack}>Get in Touch</Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-32 pb-24 relative z-10">
        
        {/* Section Header */}
        <div className="max-width-container mx-auto px-6 mb-16">
          <div className="text-left max-w-[640px] flex flex-col items-start gap-4">
            <Badge label="INSIGHTS FEED" variant="accent" />
            <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
              Our Blog
            </h1>
            <p className="font-sans text-[16px] sm:text-[18px] text-text-secondary leading-relaxed">
              Explore practical articles on digital product building, user experience design, AI deployment, and technical scalability.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="max-width-container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((post, idx) => (
              <motion.div key={post.id || idx} variants={cardVariants}>
                <GlassCard className="p-6 h-full flex flex-col justify-between group glass-effect-hover border-white/[0.04] bg-surface/30">
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

                  {/* Author row & Read button */}
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
        </div>



      </main>
    </div>
  );
};
