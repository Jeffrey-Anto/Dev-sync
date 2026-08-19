"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown, ArrowRight, Briefcase } from "lucide-react";
import { COHORT_STATS } from "@/data/domains";
import MorphingBlobBackground from "@/components/backgrounds/MorphingBlobBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: -30,
    filter: "blur(6px)",
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
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-12">
      {/* Tech Grid Under Blobs */}
      <div className="absolute inset-0 tech-grid-bg pointer-events-none z-0 opacity-40" />

      {/* Morphing Organic Blobs */}
      <MorphingBlobBackground className="z-1" />

      {/* Radial Vignette On Top for Edge Focus */}
      <div className="absolute inset-0 radial-vignette pointer-events-none z-1" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto text-center flex flex-col items-center">
        
        {/* 1. College Identity — Top of Hero (Significantly Visible & Hierarchical) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 sm:mb-8 flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-xl max-w-3xl"
        >
          <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-slate-200">
            GOVERNMENT COLLEGE OF ENGINEERING, SRIRANGAM
          </span>
          <span className="text-[11px] sm:text-xs md:text-sm font-mono text-slate-400 tracking-wider">
            DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING &nbsp;·&nbsp; TIRUCHIRAPPALLI &nbsp;·&nbsp; BATCH 2023–2027
          </span>
        </motion.div>

        {/* 2. Main Hero Headline (Rebalanced: ~25-35% Smaller with generous whitespace) */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-black tracking-tight text-white mb-5 max-w-4xl leading-[1.08] perspective-container select-none"
        >
          {/* Line 1: 60 MINDS. */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 mb-1.5 sm:mb-2">
            <motion.span
              variants={wordVariants}
              className="inline-block bg-gradient-to-r from-indigo-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.35)]"
            >
              60
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block text-slate-100">
              MINDS.
            </motion.span>
          </div>

          {/* Line 2: ONE TECHNICAL */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 mb-1.5 sm:mb-2">
            <motion.span variants={wordVariants} className="inline-block text-slate-100">
              ONE
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block text-slate-100">
              TECHNICAL
            </motion.span>
          </div>

          {/* Line 3: COLLECTIVE. */}
          <div className="flex flex-wrap items-center justify-center">
            <motion.span
              variants={wordVariants}
              className="inline-block bg-gradient-to-r from-indigo-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              COLLECTIVE.
            </motion.span>
          </div>
        </motion.h1>

        {/* 3. Supporting Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed mb-6"
        >
          Explore the projects, technologies and engineering capabilities of our 2027 CSE cohort.
        </motion.p>

        {/* 4. Stat Line: 60 CSE STUDENTS · 6 TECHNICAL DOMAINS · 18+ PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-mono text-cyan-300 mb-8 max-w-3xl"
        >
          <span className="font-semibold">{COHORT_STATS.totalEngineers} CSE STUDENTS</span>
          <span className="text-indigo-400">·</span>
          <span className="font-semibold">{COHORT_STATS.domainsCount} TECHNICAL DOMAINS</span>
          <span className="text-indigo-400">·</span>
          <span className="font-semibold">{COHORT_STATS.totalProjects}+ PROJECTS</span>
        </motion.div>

        {/* 6. Recruiter CTAs (Primary & Secondary) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA: Explore Projects */}
          <a
            href="#domains"
            className="group relative px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
          >
            <span>EXPLORE PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA: Recruit Our Cohort */}
          <a
            href="/recruit"
            className="group relative px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 hover:border-cyan-400/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
            <span>RECRUIT OUR COHORT</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center pt-6 text-slate-500"
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
