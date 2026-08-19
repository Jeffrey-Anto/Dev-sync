"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, LayoutGrid, Rocket } from "lucide-react";
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
      // Ease out expo
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

export default function StatStrip() {
  const statItems = [
    {
      label: "Engineers in Cohort",
      icon: Users,
      value: COHORT_STATS.totalEngineers,
      suffix: "",
      subtext: "100% CS Undergraduates",
      color: "from-indigo-500/20 to-indigo-500/5",
      border: "border-indigo-500/30",
      accent: "text-indigo-400",
    },
    {
      label: "Capability Domains",
      icon: LayoutGrid,
      value: COHORT_STATS.domainsCount,
      suffix: "",
      subtext: "Cross-functional clusters",
      color: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
    },
    {
      label: "Deployed Projects",
      icon: Rocket,
      value: COHORT_STATS.totalProjects,
      suffix: "+",
      subtext: "Live deployed artifacts",
      color: "from-pink-500/20 to-pink-500/5",
      border: "border-pink-500/30",
      accent: "text-pink-400",
    },
  ];

  return (
    <section id="stats" className="relative z-20 py-16 sm:py-20 bg-[#07090e]/90 border-y border-white/10 overflow-hidden">
      <FluidWaveBackground opacity={0.5} intensity="subtle" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            AGGREGATE PERFORMANCE TELEMETRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            Cohort Volume & Technical Rigor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${item.color} border ${item.border} p-6 sm:p-7 flex flex-col justify-between group hover:border-white/30 transition-all duration-300 backdrop-blur-sm shadow-xl`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-slate-900/80 border border-white/10 ${item.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight">
                    <AnimatedCounter to={item.value} suffix={item.suffix} />
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mt-2 font-sans">
                    {item.label}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    {item.subtext}
                  </div>
                </div>

                {/* Ambient glow accent */}
                <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
