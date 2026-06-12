import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Code2, TrendingUp, Star } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";

const handleLinkClick = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = React.useState(800);

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fade out hero content as we scroll down to make a seamless cross-fade with Services
  const contentOpacity = useTransform(scrollY, [0, windowHeight], [1, 0]);
  const contentY = useTransform(scrollY, [0, windowHeight], [0, -80]);
  const contentDisplay = useTransform(scrollY, (value) => 
    value >= windowHeight ? "none" : "grid"
  );
  const contentPointerEvents = useTransform(scrollY, (value) => 
    value > windowHeight * 0.8 ? "none" : "auto"
  );

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center bg-transparent pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      <motion.div
        style={{ 
          opacity: contentOpacity, 
          y: contentY, 
          pointerEvents: contentPointerEvents,
          display: contentDisplay
        }}
        className="max-width-container mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
      >
        {/* Left Content (55%) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left">
          
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-text-primary tracking-tight">
              We Build Digital <br />
              Products That{" "}
              <span className="bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent">
                Work.
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-[16px] sm:text-[18px] text-text-secondary leading-relaxed max-w-[540px]"
          >
            From strategy to launch — we design, develop, and grow digital experiences for startups and scale-ups.
          </motion.p>



          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 mt-4 pt-6 border-t border-white/[0.04]"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[13px] text-text-secondary">
              <span className="w-1.5 h-1.5 bg-success rounded-full" />
              <span>Trusted by 120+ clients</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[13px] text-text-secondary">
              <CheckCircle2 size={13} className="text-success" />
              <span>98% on-time delivery</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[13px] text-text-secondary">
              <div className="flex text-warning">
                <Star size={12} fill="currentColor" />
              </div>
              <span>4.9★ average rating</span>
            </div>
          </motion.div>

        </div>

        {/* Right Visual (45%) */}
        <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[450px] xl:h-[480px] flex items-center justify-center">
          
          {/* Card 1: Project Delivered */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-4 sm:top-10 left-4 sm:left-10 z-20 w-[230px] sm:w-[280px] animate-float-slow pointer-events-none"
          >
            <GlassCard className="p-5" hover={false}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-primary">Project Shipped</h4>
                    <p className="text-[10px] text-text-secondary">Zeno Finance</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-success/10 text-success px-2 py-0.5 rounded-[4px]">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
                🚀 Delivered <span className="text-success font-semibold">4 weeks ahead</span> of schedule.
              </p>
            </GlassCard>
          </motion.div>

          {/* Card 2: Code Snippet */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute top-[120px] sm:top-[160px] right-2 sm:right-6 z-10 w-[210px] sm:w-[270px] animate-float-medium pointer-events-none"
          >
            <GlassCard className="p-4" hover={false}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
                <Code2 size={14} className="text-accent" />
                <span className="font-mono text-[10px] tracking-wide text-text-secondary">
                  useAutomation.js
                </span>
              </div>
              <pre className="font-mono text-[10px] text-accent-alt leading-relaxed">
                <code>
                  {`const startWorkflow = () => {
  const hub = new OfficienHub();
  return hub.streamline({
    efficiency: "max",
    creativity: "limitless"
  });
};`}
                </code>
              </pre>
            </GlassCard>
          </motion.div>

          {/* Card 3: Growth Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute bottom-4 sm:bottom-6 left-12 sm:left-20 z-20 w-[190px] sm:w-[240px] animate-float-fast pointer-events-none"
          >
            <GlassCard className="p-5" hover={false}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-text-secondary font-semibold">SEO Traction</span>
                <TrendingUp size={14} className="text-success" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-space text-2xl font-bold text-text-primary">+340%</span>
                <span className="text-[10px] text-success font-medium">vs last month</span>
              </div>
              {/* Simple Chart visualization */}
              <div className="flex items-end gap-1.5 h-12 mt-3">
                <div className="bg-white/10 w-full h-[30%] rounded-[2px]" />
                <div className="bg-white/10 w-full h-[45%] rounded-[2px]" />
                <div className="bg-white/10 w-full h-[35%] rounded-[2px]" />
                <div className="bg-white/10 w-full h-[60%] rounded-[2px]" />
                <div className="bg-accent/70 w-full h-[80%] rounded-[2px]" />
                <div className="bg-accent w-full h-[100%] rounded-[2px]" />
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
