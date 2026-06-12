import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";

import { projects } from "../data/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const Projects = ({ onViewAllClick }) => {
  return (
    <section id="projects" className="py-24 bg-transparent relative">
      <div className="max-width-container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-20 flex flex-col items-center gap-4">
          <Badge label="OUR WORK" variant="accent" />
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
            Projects That Speak For Themselves
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed">
            A selection of recent engagements across industries.
          </p>
        </div>

        {/* Alternating Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:pb-12"
        >
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`${project.height} ${index % 2 === 1 ? "md:translate-y-6" : ""} w-full`}
            >
              <GlassCard className="h-full overflow-hidden flex flex-col justify-between group relative border-white/[0.05]">

                {/* Image / Gradient Placeholder area */}
                <div className={`relative w-full h-[60%] bg-gradient-to-br ${project.gradient} border-b border-white/[0.04] overflow-hidden flex items-center justify-center`}>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

                  {/* Big floating text logo */}
                  <span className="font-space font-bold text-lg text-text-primary/10 tracking-widest uppercase transition-transform duration-700 group-hover:scale-110">
                    {project.title.split(" ")[0]}
                  </span>

                  {/* Tech stack badge pills overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium font-sans tracking-wider uppercase px-2 py-0.5 bg-black/50 border border-white/10 rounded-full text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dark hover overlay with description */}
                  <div className="absolute inset-0 bg-bg/95 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-semibold uppercase text-accent tracking-widest mb-2">
                      Overview
                    </p>
                    <p className="font-sans text-[13px] sm:text-[14px] text-text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-accent transition-colors w-fit"
                    >
                      Inquire about similar builds
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>

                {/* Content details footer */}
                <div className="p-6 h-[40%] flex flex-col justify-between bg-surface/30">
                  <div>
                    <h3 className="font-space font-semibold text-lg sm:text-[20px] text-text-primary mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="font-sans text-[13px] italic text-success font-medium flex items-center gap-1.5 leading-snug">
                      <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                      &ldquo;{project.outcome}&rdquo;
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline w-fit mt-2 cursor-pointer"
                  >
                    View Case Study
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        {/* View All Projects button */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="md" onClick={onViewAllClick}>
            View All Projects
          </Button>
        </div>

      </div>
    </section>
  );
};
