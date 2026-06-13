import { useRef, useEffect, useState, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   PROJECT DATA (3 Projects Total)
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
const ProjectCard = memo(({ project, index, smoothProgress, prefersReducedMotion }) => {
  const totalCards = PROJECT_DATA.length;
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
        {/* Number */}
        <div
          className="
            text-[clamp(2.5rem,8vw,110px)] font-black text-transparent select-none leading-none
          "
          style={{ WebkitTextStroke: "1px rgba(215, 226, 234, 0.15)" }}
        >
          {project.number}
        </div>

        {/* Project Info */}
        <div className="flex-1 mx-4 sm:mx-6 md:mx-8 pt-2">
          <span className="text-xs sm:text-sm md:text-base text-[#D7E2EA] uppercase tracking-widest font-medium">
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#D7E2EA] uppercase tracking-tight mt-1">
            {project.name}
          </h3>
        </div>

        {/* Live Project Button */}
        <LiveProjectButton projectName={project.name} />
      </div>

      {/* ── BOTTOM ROW (Image Grid) ── */}
      <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 items-stretch min-h-0">
        {/* Left Column - 40% width (col-span-4) */}
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

        {/* Right Column - 60% width (col-span-6) */}
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
   MAIN SECTION
 ───────────────────────────────────────────── */
export const Projects = ({ onViewAllClick }) => {
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

  // Button animation based on smoothProgress (starts fading in after Card 3 starts appearing, i.e., > 0.5)
  const buttonOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.5, 0.65], [0.9, 1]);
  const buttonY = useTransform(smoothProgress, [0.5, 0.65], [15, 0]);
  const buttonPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.58 ? "auto" : "none"
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects section"
      className="
        relative z-10
        bg-transparent
        -mt-10 sm:-mt-12 md:-mt-14
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
        overflow-visible
      "
      style={{ height: "180vh" }}
    >
      {/* ── SECTION HEADING (Outside the sticky wrapper to scroll away) ── */}
      <div className="text-center mb-8 sm:mb-12 flex flex-col items-center">
        <h2
          className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent"
        >
          Project
        </h2>
      </div>

      <div
        className="
          sticky top-[60px] md:top-[80px]
          h-[83vh] sm:h-[84vh] md:h-[85vh] w-full max-w-[1100px] mx-auto
          overflow-visible
        "
      >
        {/* ── STICKY CARDS CONTAINER (Overflow visible to prevent clipping) ── */}
        <div className="relative w-full h-[70vh] sm:h-[72vh] md:h-[74vh] overflow-visible">
          {PROJECT_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              smoothProgress={smoothProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ── VIEW ALL BUTTON (Positioned absolutely at the bottom of the sticky wrapper) ── */}
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
            aria-label="View all projects"
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
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};
