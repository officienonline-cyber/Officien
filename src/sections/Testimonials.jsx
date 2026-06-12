import React from "react";
import { Star } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "CTO",
    company: "Zeno Finance",
    avatar: "ZM",
    quote: "They shipped our dashboard rewrite in 5 weeks. Zero bugs on launch day. I've worked with 4 agencies — this is the first time I didn't have to babysit the process.",
  },
  {
    name: "Priya Sharma",
    role: "Founder",
    company: "Aura Health",
    avatar: "AS",
    quote: "The AI integration they built saved us 3 FTEs worth of manual work. ROI was clear within 60 days.",
  },
  {
    name: "James O'Brien",
    role: "CMO",
    company: "Terrain",
    avatar: "JT",
    quote: "Our SEO traffic tripled. That's not a typo. In 6 months. The strategy was meticulous and the execution was flawless.",
  },
  {
    name: "Sara Al-Rashid",
    role: "Product Lead",
    company: "NovaPay",
    avatar: "SN",
    quote: "The UX audit alone was worth the engagement fee. The implementation of their recommendations cut our onboarding drop-off in half.",
  },
  {
    name: "Miguel Torres",
    role: "CEO",
    company: "Luminary",
    avatar: "ML",
    quote: "Fast, communicative, and genuinely smart. They pushed back on one of my ideas and they were right. That's the kind of partner I want.",
  },
  {
    name: "Anya Petrov",
    role: "VP Engineering",
    company: "CloudVault",
    avatar: "AC",
    quote: "Enterprise-grade delivery at startup speed. OfficienHub understands both worlds.",
  },
];

const marqueeItems = [...testimonials, ...testimonials];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-bg overflow-hidden relative border-t border-b border-white/[0.04]">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div className="max-width-container mx-auto px-6 mb-12 text-center">
        <h3 className="font-space font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
          What Our Clients Say
        </h3>
      </div>

      {/* Scrolling Marquee */}
      <div className="w-full flex">
        <div className="animate-marquee gap-6 py-4">
          {marqueeItems.map((item, idx) => (
            <GlassCard
              key={idx}
              className="w-[300px] sm:w-[360px] p-6 shrink-0 flex flex-col justify-between border-white/[0.05] bg-surface/30 select-none hover:border-accent/30 transition-all duration-300"
              hover={false}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4 text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans text-[14px] italic text-text-secondary leading-relaxed mb-6 select-text">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent text-xs font-semibold font-space">
                  {item.avatar}
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-text-primary">{item.name}</h4>
                  <p className="text-[10px] text-text-secondary">
                    {item.role}, <span className="text-accent">{item.company}</span>
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
