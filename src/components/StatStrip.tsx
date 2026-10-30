"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Users, LayoutGrid, Rocket, Sparkles } from "lucide-react";
import { COHORT_STATS } from "@/data/domains";
import { FluidWaveBackground } from "@/components/backgrounds";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ from = 0, to, duration = 2, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(from + (to - from) * easeProgress);

      setCount(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Spotlight Interactive Stat Card with Cursor Tracking Glow
function SpotlightStatCard({
  item,
  index,
}: {
  item: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    value: number;
    suffix: string;
    subtext: string;
    gradient: string;
    glowRgb: string;
    accentText: string;
    borderColor: string;
  };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* 1. Dynamic Cursor Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: isHovered
            ? `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${item.glowRgb}, 0.8), transparent 60%)`
            : `linear-gradient(180deg, rgba(${item.glowRgb}, 0.35) 0%, rgba(255,255,255,0.05) 100%)`,
        }}
      />

      {/* 2. Glassmorphic Card Body */}
      <div className="relative h-full w-full rounded-[23px] bg-[#070913]/90 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Subtle Ambient Radial Highlight on Cursor */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${item.glowRgb}, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Top Header Row */}
        <div className="relative z-10 mb-8 flex items-center justify-between">
          <div
            className="relative p-3.5 rounded-2xl border transition-all duration-300 group-hover:scale-110 shadow-lg"
            style={{
              backgroundColor: `rgba(${item.glowRgb}, 0.12)`,
              borderColor: `rgba(${item.glowRgb}, 0.35)`,
              boxShadow: isHovered ? `0 0 25px rgba(${item.glowRgb}, 0.4)` : "none",
            }}
          >
            <Icon className={`w-6 h-6 ${item.accentText}`} />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgb(${item.glowRgb})` }} />
            <span>0{index + 1}</span>
          </div>
        </div>

        {/* Value and Labels */}
        <div className="relative z-10">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight leading-none group-hover:tracking-normal transition-all duration-300">
            <AnimatedCounter to={item.value} suffix={item.suffix} />
          </div>

          <div className="text-base sm:text-lg font-bold text-slate-100 mt-3 font-sans group-hover:text-white transition-colors">
            {item.label}
          </div>

          <div className="text-xs sm:text-sm font-mono text-slate-400 mt-1 flex items-center gap-2">
            <span>{item.subtext}</span>
            <Sparkles className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100" />
          </div>
        </div>

        {/* Bottom Ambient Glow Halo */}
        <div
          className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full blur-2xl transition-all duration-500 pointer-events-none group-hover:scale-125"
          style={{
            backgroundColor: `rgba(${item.glowRgb}, 0.15)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function StatStrip() {
  const statItems = [
    {
      label: "Engineers in Cohort",
      icon: Users,
      value: COHORT_STATS.totalEngineers,
      suffix: "",
      subtext: "100% CS Undergraduates",
      gradient: "from-indigo-500/20 to-indigo-500/5",
      glowRgb: "99, 102, 241", // Indigo
      accentText: "text-indigo-400",
      borderColor: "border-indigo-500/30",
    },
    {
      label: "Capability Domains",
      icon: LayoutGrid,
      value: COHORT_STATS.domainsCount,
      suffix: "",
      subtext: "Cross-functional tracks",
      gradient: "from-cyan-500/20 to-cyan-500/5",
      glowRgb: "6, 182, 212", // Cyan
      accentText: "text-cyan-400",
      borderColor: "border-cyan-500/30",
    },
    {
      label: "Deployed Projects",
      icon: Rocket,
      value: COHORT_STATS.totalProjects,
      suffix: "+",
      subtext: "Live verified systems",
      gradient: "from-pink-500/20 to-pink-500/5",
      glowRgb: "236, 72, 153", // Pink
      accentText: "text-pink-400",
      borderColor: "border-pink-500/30",
    },
  ];

  return (
    <section id="stats" className="relative z-20 py-16 sm:py-24 bg-[#05070d]/90 border-y border-white/10 overflow-hidden">
      <FluidWaveBackground opacity={0.75} intensity="medium" speed={1.1} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20">
            AGGREGATE PERFORMANCE TELEMETRY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Cohort Volume &amp; Technical Rigor
          </h2>
        </div>

        {/* Exactly 3 Rich Interactive Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {statItems.map((item, index) => (
            <SpotlightStatCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
