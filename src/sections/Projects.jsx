import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────
   PROJECT DATA (4 Total Projects)
───────────────────────────────────────────── */
const PROJECT_DATA = [
  {
    id: "01",
    number: "01",
    name: "Nextlevel Studio",
    category: "Web Design",
    type: "Client",
    images: {
      col1Top:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1Bottom:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    },
  },
  {
    id: "02",
    number: "02",
    name: "Aura Brand Identity",
    category: "Branding",
    type: "Personal",
    images: {
      col1Top:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1Bottom:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    },
  },
  {
    id: "03",
    number: "03",
    name: "Solaris Digital",
    category: "3D Modeling",
    type: "Client",
    images: {
      col1Top:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1Bottom:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    },
  },
  {
    id: "04",
    number: "04",
    name: "NovaPay Dashboard",
    category: "Fintech UI",
    type: "Client",
    images: {
      col1Top:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      col1Bottom:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
      col2:
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
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
    className="group flex-shrink-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-[#D7E2EA]/40 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/15 hover:border-[#D7E2EA]/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(215,226,234,0.2)] font-sans"
  >
    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/70 group-hover:text-[#D7E2EA] transition-colors whitespace-nowrap hidden sm:inline">
      Live Project
    </span>
    <ArrowUpRight
      size={14}
      className="text-[#D7E2EA]/70 group-hover:text-[#D7E2EA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
    />
  </a>
);

/* ─────────────────────────────────────────────
   SINGLE PROJECT CARD
───────────────────────────────────────────── */
const ProjectCard = React.memo(({ project, index, totalCards, scrollYProgress, prefersReducedMotion }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Scale down when the subsequent cards are scrolling up to overlap this card.
  // Card 0 scales from 0.0 to 0.25
  // Card 1 scales from 0.25 to 0.50
  // Card 2 scales from 0.50 to 0.75
  // Card 3 does not scale down (stays at 1.0)
  const startRange = (index / totalCards) * 0.8;
  const endRange = ((index + 1) / totalCards) * 0.8;

  const scaleValue = useTransform(scrollYProgress, [startRange, endRange], [1, targetScale]);
  
  const scale = useSpring(scaleValue, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  const shadowOpacity = useTransform(scrollYProgress, [startRange, endRange], [0.15, 0.45]);
  const imageParallaxY = useTransform(scrollYProgress, [startRange, endRange], [0, -30]);

  const [topOffset, setTopOffset] = useState(210);
  const [cardGap, setCardGap] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTopOffset(130);
        setCardGap(16);
      } else if (window.innerWidth < 1024) {
        setTopOffset(175);
        setCardGap(20);
      } else {
        setTopOffset(220);
        setCardGap(24);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stickyTop = `${topOffset + index * cardGap}px`;
  const finalScale = prefersReducedMotion ? 1 : (index === totalCards - 1 ? 1 : scale);

  return (
    <motion.article
      id={`project-card-${project.id}`}
      aria-label={`Project ${project.number}: ${project.name}`}
      style={{
        position: "sticky",
        top: stickyTop,
        scale: finalScale,
        zIndex: index + 1,
        willChange: "transform",
        transformOrigin: "center top",
        boxShadow: `0 24px 80px rgba(0,0,0,${prefersReducedMotion ? 0.25 : shadowOpacity})`,
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: index === totalCards - 1 ? 1.01 : undefined,
              boxShadow: "0 0 32px rgba(215,226,234,0.18), 0 24px 80px rgba(0,0,0,0.5)",
            }
      }
      className="
        border border-[#D7E2EA]/30 hover:border-[#D7E2EA]/60
        bg-[#0C0C0C]
        rounded-[30px] sm:rounded-[40px] md:rounded-[50px]
        p-4 sm:p-6 md:p-8
        overflow-hidden
        transition-[border-color] duration-300
        group
        w-full
        h-[68vh] sm:h-[72vh]
        flex flex-col justify-between
        mb-12 sm:mb-16 md:mb-20
      "
    >
      {/* ── TOP ROW ── */}
      <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8 font-sans">
        <div
          aria-hidden="true"
          className="
            font-black leading-none select-none
            text-[clamp(2.2rem,7vw,110px)]
            text-[#D7E2EA]/8
            tracking-tighter
            flex-shrink-0
          "
        >
          {project.number}
        </div>

        <div className="flex-1 mx-3 sm:mx-5 md:mx-7 pt-1">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[#D7E2EA]/50">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D7E2EA]/25 flex-shrink-0" />
            <span
              className={`text-[9px] sm:text-[10px] md:text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                project.type === "Client"
                  ? "border-[#D7E2EA]/20 text-[#D7E2EA]/40"
                  : "border-[#6366F1]/30 text-[#6366F1]/70"
              }`}
            >
              {project.type}
            </span>
          </div>
          <h3 className="font-black uppercase tracking-tight text-[#D7E2EA] leading-none text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            {project.name}
          </h3>
        </div>

        <LiveProjectButton projectName={project.name} />
      </div>

      {/* ── IMAGE GRID ── */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 overflow-hidden flex-1 items-stretch">
        <div className="flex flex-col gap-2 sm:gap-3 justify-between">
          <motion.div
            className="overflow-hidden rounded-[18px] sm:rounded-[28px] md:rounded-[36px] flex-1 relative bg-white/[0.03]"
          >
            <motion.img
              src={project.images.col1Top}
              alt={`${project.name} screenshot 1`}
              loading="lazy"
              style={{ y: prefersReducedMotion ? 0 : imageParallaxY }}
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 absolute inset-0"
            />
          </motion.div>

          <div
            className="overflow-hidden rounded-[18px] sm:rounded-[28px] md:rounded-[36px] flex-1 relative bg-white/[0.03]"
          >
            <motion.img
              src={project.images.col1Bottom}
              alt={`${project.name} screenshot 2`}
              loading="lazy"
              style={{ y: prefersReducedMotion ? 0 : imageParallaxY }}
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 delay-75 absolute inset-0"
            />
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[18px] sm:rounded-[28px] md:rounded-[36px] relative col-span-1 bg-white/[0.03]"
        >
          <motion.img
            src={project.images.col2}
            alt={`${project.name} hero image`}
            loading="lazy"
            style={{ y: prefersReducedMotion ? 0 : imageParallaxY }}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 delay-150 absolute inset-0"
          />
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
const ScrollProgressBar = ({ scrollYProgress }) => {
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D7E2EA]/10 z-20 overflow-hidden rounded-full">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #D7E2EA 0%, #6366F1 60%, #A78BFA 100%)",
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export const Projects = ({ onViewAllClick }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // Section-level scroll progress for the progress bar
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Container-level scroll progress for card stacking scale adjustments
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
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
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects section"
      className="
        relative z-10
        bg-[#0C0C0C]
        -mt-10 sm:-mt-12 md:-mt-14
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-4 sm:px-8 md:px-10
        pt-16 sm:pt-20 md:pt-28
        pb-24 sm:pb-28 md:pb-36
        overflow-hidden
      "
    >
      {/* Scroll progress bar */}
      <ScrollProgressBar scrollYProgress={sectionProgress} />

      {/* Subtle radial glow top-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── SECTION HEADING (Sticky) ── */}
      <div
        className="sticky top-[70px] sm:top-[90px] md:top-[100px] text-center mb-14 sm:mb-18 md:mb-20 z-20 py-2"
      >
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/40 mb-2 font-sans">
          Selected Work
        </p>
        <h2
          className="font-black uppercase tracking-tighter leading-none font-sans"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 140px)",
            background: "linear-gradient(180deg, #646973 0%, #BBCCD7 55%, #6E7A85 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projects
        </h2>
      </div>

      {/* ── STICKY CARDS STACK ── */}
      <div 
        ref={containerRef}
        className="relative max-w-[1100px] mx-auto"
        style={{ height: "350vh" }}
      >
        {PROJECT_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECT_DATA.length}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* ── VIEW ALL BUTTON ── */}
      <div className="mt-16 sm:mt-20 text-center relative z-10 font-sans">
        <button
          onClick={onViewAllClick}
          aria-label="View all projects"
          className="
            group inline-flex items-center gap-3
            px-7 py-3.5 sm:px-9 sm:py-4
            rounded-full
            border border-[#D7E2EA]/25
            bg-[#D7E2EA]/5
            text-[#D7E2EA]/70
            text-sm sm:text-base font-semibold uppercase tracking-widest
            hover:bg-[#D7E2EA]/12 hover:border-[#D7E2EA]/50 hover:text-[#D7E2EA]
            hover:shadow-[0_0_28px_rgba(215,226,234,0.15)]
            transition-all duration-300
          "
        >
          View All Projects
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </button>
      </div>
    </section>
  );
};
