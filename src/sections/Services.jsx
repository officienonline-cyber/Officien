import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Palette, Bot, TrendingUp, Layers, Workflow, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Full-stack applications built with Next.js, React, Node.js, and modern APIs. From MVPs to enterprise platforms.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Research-driven interfaces with Figma-first design systems. Accessible, delightful, and conversion-optimised.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "LLM-powered features, chatbots, automation workflows, and data pipelines that reduce manual work by 60–80%.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description: "Technical SEO audits, content strategy, and performance marketing that compounds over 6–12 months.",
  },
  {
    icon: Layers,
    title: "Brand Identity",
    description: "Logo, type system, color palette, and brand guidelines that communicate who you are before you say a word.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Zapier, Make, n8n, and custom workflow automation that eliminates repetitive tasks and connects your stack.",
  },
];

export const Services = () => {
  const containerRef = useRef(null);

  // Tracks scroll progress of the sticky section (0 → 1 as you scroll through 300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tracks entrance — from when bottom of section enters viewport to when top hits viewport top
  const { scrollYProgress: entranceProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Fade in as section enters, full opacity once pinned
  const entranceOpacity = useTransform(entranceProgress, [0, 1], [0, 1]);

  // Responsive orbital radius
  const [radius, setRadius] = useState(320);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(170);
      else if (window.innerWidth < 1024) setRadius(240);
      else setRadius(320);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section header fades in at start of scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0.3, 1]);

  // Base angle: card 0 starts at bottom (π/2), last card (Automation) ends exactly at apex (0)
  // With 6 cards spaced by delta = 0.38π, the 6th card offset is 5 * 0.38π ≈ 1.9π
  // So baseAngle must go from π/2 → π/2 − 1.9π = π/2 − 1.9π ≈ -1.9π + 0.5π
  // Simplified: start=π*0.5, end= -(5 * delta) + 0 = ends at 0 for last card
  // baseAngle at progress=1 means card[5] angle = baseAngle + 5*delta = 0  →  baseAngle = -5*delta = -5*0.38π = -1.9π
  const baseAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI * 0.5, -Math.PI * 1.9]
  );

  const delta = Math.PI * 0.38; // ~68° spacing between cards

  // Build per-card motion values (must be called unconditionally at top level)
  const cardOpacities = [];
  const cardScales = [];
  const cardXs = [];
  const cardYs = [];

  for (let i = 0; i < 6; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const angle = useTransform(baseAngle, (val) => val + i * delta);

    // Full opacity at apex (angle≈0), fades to 0 outside ±65°
    cardOpacities.push(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTransform(
        angle,
        [Math.PI * 0.65, Math.PI * 0.45, 0, -Math.PI * 0.45, -Math.PI * 0.65],
        [0, 0.25, 1, 0.25, 0]
      )
    );

    // Slightly larger at apex
    cardScales.push(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTransform(
        angle,
        [Math.PI * 0.5, 0, -Math.PI * 0.5],
        [0.85, 1.05, 0.85]
      )
    );

    // X: left-edge origin; positive cos(angle) moves card to the right of the circle centre
    // eslint-disable-next-line react-hooks/rules-of-hooks
    cardXs.push(useTransform(angle, (a) => Math.cos(a) * radius));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    cardYs.push(useTransform(angle, (a) => Math.sin(a) * radius));
  }

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative h-[300vh] w-full bg-transparent"
    >
      {/* Sticky viewport — stays in view while the 300vh scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">

        {/* Entrance fade wrapper — everything fades in as section scrolls into view */}
        <motion.div
          style={{ opacity: entranceOpacity }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Decorative half-circle orbital track on the left edge */}
          <div
            style={{ width: radius * 2, height: radius * 2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border border-dashed border-accent/25 pointer-events-none z-0"
          />
          {/* Glow ring */}
          <div
            style={{ width: radius * 2, height: radius * 2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border border-accent/8 blur-[10px] pointer-events-none z-0"
          />

          <div className="max-width-container mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — Orbital cards area */}
            <div className="lg:col-span-7 relative h-[640px] flex items-center pointer-events-none">
              {/* Orbit origin container — centre of the circle is at left:0, top:50% */}
              <div
                style={{ height: radius * 2 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full"
              >
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={index}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        x: cardXs[index],
                        y: cardYs[index],
                        translateY: "-50%",
                        translateX: "-50%",
                        opacity: cardOpacities[index],
                        scale: cardScales[index],
                      }}
                      className="pointer-events-auto"
                    >
                      <GlassCard
                        className="p-5 w-[250px] sm:w-[280px] border-white/[0.05] bg-surface/85 flex flex-col justify-between group glass-effect-hover text-left"
                        hover={false}
                      >
                        <div>
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center text-accent mb-4 border border-accent/10 group-hover:bg-accent group-hover:text-text-primary transition-all duration-300">
                            <IconComponent size={18} />
                          </div>

                          {/* Title */}
                          <h3 className="font-space font-semibold text-[17px] text-text-primary mb-2">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
                            {service.description}
                          </p>
                        </div>

                        {/* Learn more link */}
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline w-fit mt-auto cursor-pointer"
                        >
                          Learn more
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — Static section header */}
            <motion.div
              style={{ opacity: headerOpacity }}
              className="lg:col-span-5 flex flex-col gap-4 text-left lg:pl-8"
            >
              <Badge label="WHAT WE DO" variant="accent" />
              <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-tight">
                Services Built <br /> for Scale
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed">
                Every engagement starts with understanding your goals. We work in tight sprint cycles with full transparency, bridging engineering excellence and design mastery.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
