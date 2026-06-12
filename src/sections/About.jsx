import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { Users } from "lucide-react";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "98%", label: "On-Time Rate" },
  { value: "4.9★", label: "Client Rating" },
  { value: "6", label: "Countries Served" },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map your goals, users, and constraints in a 2-hour kickoff call.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We define scope, architecture, and a delivery roadmap before writing a line of code.",
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Weekly sprint demos, Slack updates, and async feedback loops.",
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "We ship, monitor, and offer post-launch support for 30 days minimum.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const About = () => {
  return (
    <section id="about" className="py-24 bg-transparent relative">
      <div className="max-width-container mx-auto px-6 relative z-10">

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column - Intro & Stats (55%) */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <Badge label="WHY OFFICIENHUB" variant="accent" />
            <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-[1.1]">
              We Don&apos;t Just Deliver — We Think
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed max-w-[560px]">
              OfficienHub was founded on a simple belief: most agencies either think well or execute well, rarely both. We obsess over the intersection. Every project starts with a strategy session, runs through weekly sprints, and ends with handoff documentation your team can actually use.
            </p>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stats.map((stat, idx) => (
                <GlassCard key={idx} className="p-6 border-white/[0.04] bg-surface/40" hover={true}>
                  <h3 className="font-space text-3xl sm:text-4xl font-bold text-accent mb-1">
                    {stat.value}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-text-secondary font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column - Geometric Card & How We Work (45%) */}
          <div className="lg:col-span-6 flex flex-col gap-8">

            {/* Team workspace placeholder */}
            <GlassCard className="p-8 relative h-[200px] overflow-hidden flex flex-col justify-end border-white/[0.05] bg-gradient-to-tr from-accent/15 via-surface to-bg" hover={false}>
              {/* Decorative Geometric Art */}
              <div className="absolute top-0 right-0 w-[240px] h-[240px] opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-accent" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="40" />
                  <rect x="20" y="20" width="60" height="60" rx="4" />
                  <line x1="10" y1="10" x2="90" y2="90" />
                  <line x1="90" y1="10" x2="10" y2="90" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-accent uppercase tracking-widest mb-1.5">
                  <Users size={12} />
                  <span>The Collective</span>
                </div>
                <h4 className="font-space text-lg font-bold text-text-primary mb-1">
                  Ahmedabad Core Team
                </h4>
                <p className="font-sans text-[13px] text-text-secondary max-w-[340px]">
                  Bridging engineering excellence and visual mastery, operating globally in hybrid sprint structures.
                </p>
              </div>
            </GlassCard>

            {/* How We Work Checklist */}
            <div className="flex flex-col gap-4">
              <h4 className="font-space text-sm font-bold uppercase tracking-wider text-text-primary pb-2 border-b border-white/[0.04]">
                How We Work
              </h4>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col gap-4"
              >
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 rounded-full border border-accent/20 bg-accent-glow flex items-center justify-center text-accent font-space text-[12px] font-bold shrink-0">
                      {step.num}
                    </div>
                    <div className="text-left">
                      <h5 className="font-space text-sm font-semibold text-text-primary mb-0.5">
                        {step.title}
                      </h5>
                      <p className="font-sans text-[13px] text-text-secondary leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
