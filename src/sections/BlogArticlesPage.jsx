import { useRef, useEffect, useState, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Footer } from "../components/Footer";
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
const BlogCard = memo(({ post, index, totalCards, smoothProgress, prefersReducedMotion, onSelect }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Dynamically calculate Y translation range
  const startTranslate = index === 0 ? 0 : ((index - 1) / (totalCards - 1)) * 0.8;
  const endTranslate = index === 0 ? 0 : (index / (totalCards - 1)) * 0.8;

  // Dynamically calculate Scale scale-down range
  const startScale = (index / (totalCards - 1)) * 0.8;
  const endScale = ((index + 1) / (totalCards - 1)) * 0.8;

  // Y gap offset per card for 6 cards stack
  const yVal = useTransform(
    smoothProgress,
    index === 0 ? [0, 1] : [startTranslate, endTranslate],
    index === 0 ? [0, 0] : [900, index * 16]
  );

  const scaleVal = useTransform(
    smoothProgress,
    index === totalCards - 1 ? [0, 1] : [startScale, endScale],
    index === totalCards - 1 ? [1, 1] : [1, targetScale]
  );

  const shadowOpacityVal = useTransform(
    smoothProgress,
    index === totalCards - 1 ? [0, 1] : [startScale, endScale],
    [0.15, 0.45]
  );

  const finalY = prefersReducedMotion ? (index === 0 ? 0 : index * 16) : yVal;
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
      <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 items-stretch min-h-0">
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
   MAIN COMPONENT
 ───────────────────────────────────────────── */
export const BlogArticlesPage = ({ onSelectPost, onBack }) => {
  const sectionRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll progress of the entire scroll track on this page
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

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary relative font-sans">
      {/* ── FIXED NAVIGATION HEADER ── */}
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

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="hidden sm:flex items-center gap-2"
          >
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
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-alt text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* ── SCROLL STACK TRACK CONTAINER (6 cards track height: 480vh) ── */}
      <main
        ref={sectionRef}
        className="relative pt-24 pb-0 z-10 overflow-visible bg-[#0C0C0C]"
        style={{ height: "480vh" }}
      >
        {/* Section Header (Outside the sticky wrapper to scroll away) */}
        <div className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-2 px-6">
          <Badge label="INSIGHTS FEED" variant="accent" />
          <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent">
            Our Blog
          </h1>
        </div>

        <div
          className="
            sticky top-[80px] md:top-[100px]
            h-[83vh] sm:h-[84vh] md:h-[85vh] w-full max-w-[1100px] mx-auto px-6
            overflow-visible
          "
        >
          {/* Cards Stack */}
          <div className="relative w-full h-[70vh] sm:h-[72vh] md:h-[74vh] overflow-visible">
            {blogs.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                totalCards={blogs.length}
                smoothProgress={smoothProgress}
                prefersReducedMotion={prefersReducedMotion}
                onSelect={onSelectPost}
              />
            ))}
          </div>
        </div>

        {/* ── FOOTER CONTAINER (Positioned z-30 with solid dark bg to cover trailing cards) ── */}
        <div className="relative z-30 mt-[380vh] bg-[#0C0C0C] border-t border-white/[0.04]">
          <Footer />
        </div>
      </main>
    </div>
  );
};
