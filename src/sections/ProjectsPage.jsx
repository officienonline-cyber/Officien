import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Footer } from "../components/Footer";

/* ─────────────────────────────────────────────
   PROJECT DATA FOR ALL PROJECTS (6 Projects)
───────────────────────────────────────────── */
const ALL_PROJECTS = [
  {
    id: "01",
    number: "01",
    name: "Zeno Finance Dashboard",
    category: "Web Design",
    type: "Client",
    images: {
      col1Top: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "02",
    number: "02",
    name: "Aura Health App",
    category: "AI & UX",
    type: "Personal",
    images: {
      col1Top: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "03",
    number: "03",
    name: "Terrain E-commerce",
    category: "SEO & Growth",
    type: "Client",
    images: {
      col1Top: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "04",
    number: "04",
    name: "NovaPay Onboarding",
    category: "UX & Automation",
    type: "Client",
    images: {
      col1Top: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "05",
    number: "05",
    name: "Luminary CMS",
    category: "Web Development",
    type: "Personal",
    images: {
      col1Top: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "06",
    number: "06",
    name: "CloudVault B2B Platform",
    category: "Cloud Security",
    type: "Client",
    images: {
      col1Top: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80",
      col1Bottom: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
      col2: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
  },
];

/* ─────────────────────────────────────────────
   LIVE PROJECT BUTTON
───────────────────────────────────────────── */
const LiveProjectButton = ({ projectName }) => (
  <a
    href="#contact"
    aria-label={`View live project: ${projectName}`}
    className="px-6 py-2 sm:px-8 sm:py-2.5 text-xs sm:text-sm border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium rounded-full uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all duration-300 whitespace-nowrap font-sans"
  >
    Live Project
  </a>
);

/* ─────────────────────────────────────────────
   SINGLE PROJECT CARD
───────────────────────────────────────────── */
const ProjectCard = React.memo(({ project, index, totalCards, smoothProgress, prefersReducedMotion }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Dynamically calculate Y translation range
  const startTranslate = index === 0 ? 0 : ((index - 1) / (totalCards - 1)) * 0.8;
  const endTranslate = index === 0 ? 0 : (index / (totalCards - 1)) * 0.8;

  // Dynamically calculate Scale scale-down range
  const startScale = (index / (totalCards - 1)) * 0.8;
  const endScale = ((index + 1) / (totalCards - 1)) * 0.8;

  // Reduced Y gap offset per card for 6 cards stack to avoid layout displacement
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

  return (
    <motion.article
      id={`project-card-${project.id}`}
      aria-label={`Project ${project.number}: ${project.name}`}
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
        <div
          className="
            text-[clamp(2.5rem,8vw,110px)] font-black text-transparent select-none leading-none
          "
          style={{ WebkitTextStroke: "1px rgba(215, 226, 234, 0.15)" }}
        >
          {project.number}
        </div>

        <div className="flex-1 mx-4 sm:mx-6 md:mx-8 pt-2">
          <span className="text-xs sm:text-sm md:text-base text-[#D7E2EA] uppercase tracking-widest font-medium">
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#D7E2EA] uppercase tracking-tight mt-1">
            {project.name}
          </h3>
        </div>

        <LiveProjectButton projectName={project.name} />
      </div>

      {/* ── BOTTOM ROW (Image Grid) ── */}
      <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 items-stretch min-h-0">
        <div className="col-span-4 flex flex-col gap-2 sm:gap-3 justify-between h-full">
          <div
            className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] relative flex-1"
            style={{ maxHeight: "46%" }}
          >
            <img
              src={project.images.col1Top}
              alt={`${project.name} screenshot 1`}
              loading="lazy"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 absolute inset-0"
            />
          </div>

          <div
            className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] relative flex-1"
            style={{ maxHeight: "48%" }}
          >
            <img
              src={project.images.col1Bottom}
              alt={`${project.name} screenshot 2`}
              loading="lazy"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 delay-75 absolute inset-0"
            />
          </div>
        </div>

        <div
          className="col-span-6 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] relative h-full"
        >
          <img
            src={project.images.col2}
            alt={`${project.name} hero image`}
            loading="lazy"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 delay-150 absolute inset-0"
          />
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const ProjectsPage = ({ onBack }) => {
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

  // Prefers-reduced-motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
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
          <Badge label="OUR PORTFOLIO" variant="accent" />
          <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent">
            All Projects
          </h1>
        </div>

        <div
          className="
            sticky top-[80px] md:top-[100px]
            h-[80vh] w-full max-w-[1100px] mx-auto px-6
            overflow-visible
          "
        >
          {/* Cards Stack */}
          <div className="relative w-full h-full overflow-visible">
            {ALL_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCards={ALL_PROJECTS.length}
                smoothProgress={smoothProgress}
                prefersReducedMotion={prefersReducedMotion}
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
