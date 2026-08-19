"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { COHORT_STATS } from "@/data/domains";
import MorphingBlobBackground from "@/components/backgrounds/MorphingBlobBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: -45,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
};

export default function HeroSection() {
  const headlineWords = [
    "ENGINEERING",
    "EXCELLENCE",
    "AT",
    "SCALE.",
    "60",
    "MINDS.",
    "ONE",
    "COLLECTIVE.",
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-12">
      {/* Tech Grid Under Blobs */}
      <div className="absolute inset-0 tech-grid-bg pointer-events-none z-0 opacity-40" />

      {/* Morphing Organic Blobs */}
      <MorphingBlobBackground className="z-1" />

      {/* Radial Vignette On Top for Edge Focus */}
      <div className="absolute inset-0 radial-vignette pointer-events-none z-1" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto text-center flex flex-col items-center">
        
        {/* 3D Staggered Perspective Reveal Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-[1.08] perspective-container"
        >
          {headlineWords.map((word, idx) => {
            const isHighlight =
              word === "SCALE." || word === "COLLECTIVE." || word === "60";
            return (
              <motion.span
                key={idx}
                variants={wordVariants}
                className={`inline-block mr-3 sm:mr-4 origin-bottom transform-gpu ${
                  isHighlight
                    ? "bg-gradient-to-r from-indigo-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.35)]"
                    : "text-slate-100"
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheadline: Aggregate Stat Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-base sm:text-xl font-mono text-cyan-300 mb-6"
        >
          <span className="font-semibold">{COHORT_STATS.totalEngineers} Computer Science Engineers</span>
          <span className="text-indigo-400">·</span>
          <span className="font-semibold">{COHORT_STATS.domainsCount} Specialized Capability Domains</span>
          <span className="text-indigo-400">·</span>
          <span className="font-semibold">{COHORT_STATS.totalProjects}+ Deployed Products</span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          <a
            href="#domains"
            className="group relative px-8 py-4 rounded-xl font-mono text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3"
          >
            <span>Explore Domain Capabilities</span>
            <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center pt-8 text-slate-500"
      >
        <a
          href="#stats"
          className="flex flex-col items-center gap-2 group text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll To Capability Matrix</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
