import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Badge } from "../components/ui/Badge";
import { blogs } from "../data/blogs";

/* ─────────────────────────────────────────────
   UNSPLASH IMAGE MAP FOR BLOGS
───────────────────────────────────────────── */
const BLOG_IMAGES = {
  "mvp-taking-too-long": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
  "ai-in-production-2026": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "ux-debt-accumulation": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
  "scaling-react-apps-2026": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "tailwind-to-vanilla-css": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  "roi-custom-web-apps": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
};

/* ─────────────────────────────────────────────
   READ ARTICLE BUTTON
───────────────────────────────────────────── */
const ReadArticleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Read full article"
    className="px-6 py-2 sm:px-8 sm:py-2.5 text-xs sm:text-sm border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium rounded-full uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all duration-300 whitespace-nowrap font-sans cursor-pointer"
  >
    Read Article
  </button>
);

/* ─────────────────────────────────────────────
   SINGLE BLOG CARD
───────────────────────────────────────────── */
const BlogCard = React.memo(({ post, index, smoothProgress, prefersReducedMotion, onSelect }) => {
  const totalCards = 3;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const yVal = useTransform(
    smoothProgress,
    index === 0
      ? [0, 1]
      : index === 1
      ? [0.08, 0.35]
      : [0.35, 0.6],
    index === 0
      ? [0, 0]
      : index === 1
      ? [800, 18]
      : [800, 36]
  );

  const scaleVal = useTransform(
    smoothProgress,
    index === 0
      ? [0.1, 0.35]
      : index === 1
      ? [0.37, 0.6]
      : [0, 1],
    index === 0
      ? [1, targetScale]
      : index === 1
      ? [1, targetScale]
      : [1, 1]
  );

  const shadowOpacityVal = useTransform(
    smoothProgress,
    index === 0
      ? [0.1, 0.35]
      : index === 1
      ? [0.37, 0.6]
      : [0, 1],
    [0.15, 0.45]
  );

  const finalY = prefersReducedMotion ? (index === 0 ? 0 : index === 1 ? 18 : 36) : yVal;
  const finalScale = prefersReducedMotion ? 1 : scaleVal;

  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      id={`blog-card-${post.id}`}
      aria-label={`Blog post ${cardNumber}: ${post.title}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        y: finalY,
        scale: finalScale,
        zIndex: index + 1,
        willChange: "transform",
        transformOrigin: "center top",
        boxShadow: `0 24px 80px rgba(0,0,0,${prefersReducedMotion ? 0.25 : shadowOpacityVal})`,
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              boxShadow: "0 0 32px rgba(215, 226, 234, 0.18), 0 24px 80px rgba(0,0,0,0.5)",
            }
      }
      className="
        border-2 border-[#D7E2EA]
        bg-[#0C0C0C]
        rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
        p-4 sm:p-5 md:p-6
        overflow-hidden
        transition-[border-color] duration-300
        group
        w-full
        h-[60vh] sm:h-[63vh] md:h-[66vh]
        flex flex-col justify-between
      "
    >
      {/* ── TOP ROW ── */}
      <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5 font-sans">
        {/* Number */}
        <div
          className="
            text-[clamp(2.5rem,8vw,110px)] font-black text-transparent select-none leading-none
          "
          style={{ WebkitTextStroke: "1px rgba(215, 226, 234, 0.15)" }}
        >
          {cardNumber}
        </div>

        {/* Blog Category & Title Info */}
        <div className="flex-1 mx-4 sm:mx-6 md:mx-8 pt-2">
          <span className="text-xs sm:text-sm md:text-base text-[#D7E2EA] uppercase tracking-widest font-medium">
            {post.category}
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#D7E2EA] uppercase tracking-tight mt-1 line-clamp-2">
            {post.title}
          </h3>
        </div>

        {/* Read Button */}
        <ReadArticleButton onClick={() => onSelect(post)} />
      </div>

      {/* ── BOTTOM ROW (Split layout: Left Text, Right Hero Image) ── */}
      <div className="grid grid-cols-10 gap-4 sm:gap-6 md:gap-8 flex-1 items-stretch min-h-0">
        {/* Left Column - 40% width (col-span-4) - Excerpt & Meta */}
        <div className="col-span-4 flex flex-col justify-between h-full text-left pt-2 pb-1">
          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-text-secondary leading-relaxed line-clamp-5 sm:line-clamp-6">
            {post.excerpt}
          </p>

          <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-white/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
              OH
            </div>
            <div className="text-left font-sans">
              <p className="text-[11px] sm:text-xs font-bold text-text-primary leading-none">OfficienHub Team</p>
              <p className="text-[9px] sm:text-[10px] text-text-muted mt-1">{post.date} · {post.readTime}</p>
            </div>
          </div>
        </div>

        {/* Right Column - 60% width (col-span-6) - Blog Image */}
        <div className="col-span-6 overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] relative h-full">
          <img
            src={BLOG_IMAGES[post.id] || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 absolute inset-0"
          />
        </div>
      </div>
    </motion.article>
  );
});

BlogCard.displayName = "BlogCard";

/* ─────────────────────────────────────────────
   MAIN SECTION
 ───────────────────────────────────────────── */
export const Blog = ({ onSelectPost, onViewAllClick }) => {
  const sectionRef = useRef(null);

  // Track scroll progress of the entire scroll track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring to smooth out timeline transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.5,
  });

  // Prefers-reduced-motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Button animation based on smoothProgress
  const buttonOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.5, 0.65], [0.9, 1]);
  const buttonY = useTransform(smoothProgress, [0.5, 0.65], [15, 0]);
  const buttonPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.58 ? "auto" : "none"
  );

  return (
    <section
      ref={sectionRef}
      id="blog"
      aria-label="Blog section"
      className="
        relative z-10
        bg-transparent
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
        overflow-visible
      "
      style={{ height: "180vh" }}
    >
      {/* ── SECTION HEADING (Outside the sticky wrapper to scroll away) ── */}
      <div className="text-center mb-8 sm:mb-12 flex flex-col items-center">
        <Badge label="INSIGHTS" variant="accent" />
        <h2
          className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight mt-3"
        >
          Blog
        </h2>
      </div>

      <div
        className="
          sticky top-[60px] md:top-[80px]
          h-[83vh] sm:h-[84vh] md:h-[85vh] w-full max-w-[1100px] mx-auto
          overflow-visible
        "
      >
        {/* ── STICKY CARDS CONTAINER ── */}
        <div className="relative w-full h-[70vh] sm:h-[72vh] md:h-[74vh] overflow-visible">
          {blogs.slice(0, 3).map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              smoothProgress={smoothProgress}
              prefersReducedMotion={prefersReducedMotion}
              onSelect={onSelectPost}
            />
          ))}
        </div>

        {/* ── VIEW ALL BUTTON (Fades in absolutely at the bottom) ── */}
        <motion.div
          style={{
            opacity: buttonOpacity,
            scale: buttonScale,
            y: buttonY,
            pointerEvents: buttonPointerEvents,
          }}
          className="absolute bottom-2 left-0 right-0 flex justify-center z-30 pointer-events-none"
        >
          <button
            onClick={onViewAllClick}
            aria-label="View all blogs"
            className="
              px-8 py-3.5 sm:px-10 sm:py-4
              text-sm sm:text-base font-bold uppercase tracking-widest
              border-2 border-[#D7E2EA]
              bg-[#0C0C0C]
              text-[#D7E2EA]
              rounded-full
              hover:bg-[#D7E2EA]/10
              transition-all duration-300
              cursor-pointer
              font-sans
              pointer-events-auto
              shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            "
          >
            View All Blogs
          </button>
        </motion.div>
      </div>
    </section>
  );
};
