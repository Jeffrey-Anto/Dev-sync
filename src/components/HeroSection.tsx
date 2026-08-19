"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Briefcase } from "lucide-react";
import { COHORT_STATS } from "@/data/domains";
import MorphingBlobBackground from "@/components/backgrounds/MorphingBlobBackground";
import ParticleText from "@/components/ParticleText";
import StrokeText from "@/components/StrokeText";

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
        
        {/* 1. College Identity — Top of Hero with React Bits <StrokeText /> */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-4 sm:mb-6 flex flex-col items-center gap-1.5 px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-2xl bg-slate-950/75 border border-white/10 backdrop-blur-xl shadow-xl max-w-4xl w-fit"
        >
          {/* Animated StrokeText Outline Draw & Wipe for College Name (Larger font, No comma) */}
          <div className="w-full h-8 sm:h-9 md:h-11 flex items-center justify-center">
            <StrokeText
              text="GOVERNMENT COLLEGE OF ENGINEERING SRIRANGAM"
              strokeColor="#818CF8"
              fillColor="#F8FAFC"
              strokeWidth={1.3}
              drawDuration={1.5}
              fillDelay={0.2}
              stagger={0.03}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={27}
              fontWeight={800}
              letterSpacing={2}
            />
          </div>

          <span className="text-[9.5px] sm:text-[11px] md:text-xs font-mono text-slate-400 tracking-wider whitespace-nowrap">
            DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING &nbsp;·&nbsp; TIRUCHIRAPPALLI &nbsp;·&nbsp; BATCH 2023–2027
          </span>
        </motion.div>

        {/* 2. Main Hero Headline with React Bits <ParticleText /> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center my-1 sm:my-2 space-y-0.5 sm:space-y-1 select-none"
        >
          {/* Line 1: 60 MINDS. */}
          <div className="w-full h-14 sm:h-20 md:h-24 max-w-3xl relative">
            <ParticleText
              text="60 MINDS."
              particleSize={2.2}
              density={3}
              color="#ffffff"
              highlightColor="#818cf8"
              scatter={160}
              gatherDuration={1500}
              stagger={380}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0.6}
              trigger="mount"
              fontSize="clamp(2.2rem, 5.5vw, 4.8rem)"
              fontWeight={900}
              fontFamily="inherit"
              glow
            />
          </div>

          {/* Line 2: ONE TECHNICAL */}
          <div className="w-full h-14 sm:h-20 md:h-24 max-w-4xl relative">
            <ParticleText
              text="ONE TECHNICAL"
              particleSize={2.2}
              density={3}
              color="#ffffff"
              highlightColor="#06b6d4"
              scatter={160}
              gatherDuration={1600}
              stagger={400}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0.6}
              trigger="mount"
              fontSize="clamp(2.2rem, 5.5vw, 4.8rem)"
              fontWeight={900}
              fontFamily="inherit"
              glow
            />
          </div>

          {/* Line 3: COLLECTIVE. */}
          <div className="w-full h-14 sm:h-20 md:h-24 max-w-3xl relative">
            <ParticleText
              text="COLLECTIVE."
              particleSize={2.4}
              density={3}
              color="#ffffff"
              highlightColor="#ec4899"
              scatter={180}
              gatherDuration={1700}
              stagger={420}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0.7}
              trigger="mount"
              fontSize="clamp(2.2rem, 5.5vw, 4.8rem)"
              fontWeight={900}
              fontFamily="inherit"
              glow
            />
          </div>
        </motion.div>

        {/* 3. Supporting Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed mt-4 mb-5"
        >
          Explore the projects, technologies and engineering capabilities of our 2027 CSE cohort.
        </motion.p>

        {/* 4. Stat Line: 60 CSE STUDENTS · 6 TECHNICAL DOMAINS · 18+ PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-mono text-cyan-300 mb-7 max-w-3xl"
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
