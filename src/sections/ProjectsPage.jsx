import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { projects } from "../data/projects";

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

export const ProjectsPage = ({ onBack }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary relative font-sans">
      
      {/* Simple navigation navbar for projects list */}
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
            <Badge label="OUR PORTFOLIO" variant="accent" />
            <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
              All Projects
            </h1>
            <p className="font-sans text-[16px] sm:text-[18px] text-text-secondary leading-relaxed">
              Explore our complete gallery of design sprints, scalable engineering applications, headless commerce systems, and automated pipelines.
            </p>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="max-width-container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, idx) => (
              <motion.div key={idx} variants={cardVariants} className="w-full">
                <GlassCard className="h-[400px] overflow-hidden flex flex-col justify-between group relative border-white/[0.05]">
                  
                  {/* Gradient Area */}
                  <div className={`relative w-full h-[55%] bg-gradient-to-br ${project.gradient} border-b border-white/[0.04] overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
                    
                    <span className="font-space font-bold text-lg text-text-primary/10 tracking-widest uppercase transition-transform duration-700 group-hover:scale-110">
                      {project.title.split(" ")[0]}
                    </span>

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

                    {/* Dark Hover Description overlay */}
                    <div className="absolute inset-0 bg-bg/95 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-semibold uppercase text-accent tracking-widest mb-2">Overview</p>
                      <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <button
                        onClick={onBack}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-accent transition-colors w-fit bg-transparent border-none p-0 cursor-pointer"
                      >
                        Inquire about similar builds
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Detail Footer */}
                  <div className="p-6 h-[45%] flex flex-col justify-between bg-surface/30">
                    <div>
                      <h3 className="font-space font-semibold text-lg text-text-primary mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[13px] italic text-success font-medium flex items-center gap-1.5 leading-snug">
                        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                        &ldquo;{project.outcome}&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={onBack}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline w-fit mt-2 cursor-pointer bg-transparent border-none p-0"
                    >
                      Inquire now
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
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
