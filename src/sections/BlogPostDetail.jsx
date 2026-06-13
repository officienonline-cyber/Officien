import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export const BlogPostDetail = ({ post, onBack }) => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // Framer motion scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) return null;

  return (
    <div className="min-h-screen bg-bg text-text-primary relative font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Simple navigation navbar for blog reading */}
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

      {/* Main Blog Post Content Area */}
      <main className="pt-24 pb-24 relative z-10">
        
        {/* Post Hero Area */}
        <section className={`relative w-full border-b border-white/[0.06] overflow-hidden bg-gradient-to-b ${post.gradient} py-20 sm:py-28`}>
          {/* Grid background pattern */}
          <div className="absolute inset-0 bg-grid-dots opacity-10 pointer-events-none" />
          
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
            {/* Category badge */}
            <Badge label={post.category.toUpperCase()} variant="accent" />
            
            {/* Title */}
            <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-tight max-w-[760px]">
              {post.title}
            </h1>
            
            {/* Metadata row */}
            <div className="flex items-center gap-6 text-[13px] sm:text-[14px] text-text-secondary font-medium mt-4">
              <span className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-accent/20 border border-white/10 flex items-center justify-center text-[8px] font-bold text-accent">
                  OH
                </div>
                OfficienHub Team
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
              <span>{post.date}</span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-text-muted" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Post Body Section */}
        <section className="py-16">
          <div className="max-w-[720px] mx-auto px-6">
            <article className="flex flex-col gap-6 text-left">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p
                        key={index}
                        className="font-sans text-[16px] sm:text-[18px] text-text-secondary leading-relaxed font-light"
                      >
                        {block.text}
                      </p>
                    );
                  case "heading":
                    return (
                      <h2
                        key={index}
                        className="font-space font-bold text-2xl sm:text-3xl text-text-primary mt-8 mb-2 tracking-tight"
                      >
                        {block.text}
                      </h2>
                    );
                  case "blockquote":
                    return (
                      <blockquote
                        key={index}
                        className="bg-white/[0.02] border-l-4 border-accent p-6 rounded-r-xl my-6 font-sans italic text-[16px] sm:text-[18px] text-text-primary leading-relaxed"
                      >
                        {block.text}
                      </blockquote>
                    );
                  case "list":
                    return (
                      <ul
                        key={index}
                        className="flex flex-col gap-3 my-4 list-none pl-2"
                      >
                        {block.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </article>



          </div>
        </section>

      </main>
    </div>
  );
};
