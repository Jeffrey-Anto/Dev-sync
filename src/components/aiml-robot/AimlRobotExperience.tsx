"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  ChevronDown,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  GitBranch,
  Zap,
  Activity,
  Terminal,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import SplineRobotCanvas from "./SplineRobotCanvas";
import { Domain, Project } from "@/data/domains";
import ProjectDetailModal from "@/components/projects/ProjectDetailModal";

interface AimlRobotExperienceProps {
  domain: Domain;
  projects: Project[];
  onBack: (e: React.MouseEvent) => void;
}

export default function AimlRobotExperience({
  domain,
  projects,
  onBack,
}: AimlRobotExperienceProps) {
  // State: "idle" -> "activated"
  const [isActivated, setIsActivated] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleActivateRobot = () => {
    if (isActivated) return;
    setIsActivated(true);
  };

  // Scroll storytelling tracker when activated
  useEffect(() => {
    if (!isActivated) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate project index based on scroll depth
      // Stage 0: 0 - 500px -> Project 0
      // Stage 1: 500 - 1200px -> Project 1
      // Stage 2: 1200px+ -> Project 2
      if (scrollY < windowHeight * 0.7) {
        setActiveProjectIndex(0);
      } else if (scrollY < windowHeight * 1.5) {
        setActiveProjectIndex(1);
      } else {
        setActiveProjectIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActivated]);

  const activeProject = projects[activeProjectIndex] || projects[0];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#050505] text-slate-100 selection:bg-pink-500/30 overflow-x-hidden"
    >
      {/* 1. Deep Atmospheric Dark Background Grid & Soft Magenta Ambient Flare */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid-bg opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px]" />
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-4 backdrop-blur-xl bg-[#050505]/75 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-pink-500/40 hover:bg-slate-800 transition-all cursor-pointer group shadow-lg"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>DOMAINS</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-600">/</span>
            <span className="text-pink-400 font-semibold tracking-wider uppercase">
              ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
            </span>
          </div>
        </div>

        {/* Telemetry Micro Status Badges */}
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span>AI CORE // ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-400">
            <span>NEURAL ROBOTICS // READY</span>
          </div>
        </div>
      </header>

      {/* 3. Fixed / Interactive 3D Spline Robot Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={
            isActivated
              ? {
                  x: typeof window !== "undefined" && window.innerWidth < 1024 ? "-15vw" : "-26vw",
                  y: typeof window !== "undefined" && window.innerWidth < 1024 ? "-12vh" : "0vh",
                  scale: typeof window !== "undefined" && window.innerWidth < 1024 ? 0.75 : 0.95,
                  rotateY: 12,
                }
              : {
                  x: 0,
                  y: "4vh",
                  scale: 1.05,
                  rotateY: 0,
                }
          }
          transition={{
            duration: 1.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-[100vw] h-[85vh] sm:h-[90vh] flex items-center justify-center pointer-events-auto"
        >
          {/* 3D Spline Robot Canvas Component */}
          <SplineRobotCanvas isActivated={isActivated} />

          {/* Interactive Hit Layer over Robot (When in Idle State) */}
          {!isActivated && (
            <div
              onClick={handleActivateRobot}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleActivateRobot()}
              aria-label="Click robot to initialize AI systems presentation"
              className="absolute inset-0 z-20 cursor-pointer flex items-center justify-center group"
            >
              <div className="absolute bottom-16 sm:bottom-20 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  className="px-5 py-2.5 rounded-full bg-pink-950/80 border border-pink-400/60 text-xs font-mono font-bold text-pink-200 tracking-wider shadow-[0_0_35px_rgba(236,72,153,0.5)] backdrop-blur-xl group-hover:scale-110 group-hover:border-pink-300 group-hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transition-all flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-pink-400 animate-bounce" />
                  <span>[ CLICK THE ROBOT TO INITIALIZE ]</span>
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                </motion.div>
                <span className="text-[11px] font-mono text-slate-500">
                  Touch or click to awaken autonomous presentation
                </span>
              </div>
            </div>
          )}

          {/* 4. PHYSICAL PRESENTATION DATA CARDS AT ROBOT'S HAND (Appears when Activated) */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto z-30"
              >
                {projects.map((proj, pIdx) => {
                  const isActive = activeProjectIndex === pIdx;
                  return (
                    <motion.div
                      key={proj.id}
                      onClick={() => {
                        setActiveProjectIndex(pIdx);
                        const targetY = pIdx === 0 ? 0 : pIdx === 1 ? window.innerHeight * 0.9 : window.innerHeight * 1.8;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }}
                      animate={
                        isActive
                          ? {
                              scale: 1.08,
                              x: 24,
                              opacity: 1,
                              borderColor: "#EC4899",
                              boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
                            }
                          : {
                              scale: 0.92,
                              x: 0,
                              opacity: 0.5,
                              borderColor: "rgba(255, 255, 255, 0.15)",
                              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                            }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-56 sm:w-64 p-3.5 rounded-2xl bg-[#0b0e17]/90 border backdrop-blur-xl cursor-pointer select-none transition-colors group hover:opacity-100"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-pink-400 mb-1.5">
                        <span className="font-bold">AI SYSTEM // 0{pIdx + 1}</span>
                        <span className="px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300">
                          {isActive ? "ACTIVE PRESENTING" : "HELD"}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1 group-hover:text-pink-300">
                        {proj.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 line-clamp-1">
                        {proj.techStack.slice(0, 3).join(" · ")}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 5. HERO TYPOGRAPHY (First Screen) */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-20 px-4 text-center pointer-events-none">
        <motion.div
          animate={isActivated ? { opacity: 0.25, scale: 0.9, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/40 border border-pink-500/30 text-xs font-mono text-pink-300 mb-4 shadow-lg backdrop-blur-md">
            <Bot className="w-3.5 h-3.5 text-pink-400" />
            <span>AUTONOMOUS LABORATORY PORTFOLIO</span>
          </div>

          {/* Main Display Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
            ARTIFICIAL INTELLIGENCE
            <span className="block text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent mt-2">
              & MACHINE LEARNING
            </span>
          </h1>

          {/* Short Minimal Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-mono mt-4 max-w-xl">
            Intelligent systems engineered to perceive, reason, and act.
          </p>
        </motion.div>

        {/* Scroll Instruction / Activated Indicator */}
        {isActivated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 border border-pink-500/40 text-xs font-mono text-pink-300 shadow-2xl backdrop-blur-xl pointer-events-auto"
          >
            <ChevronDown className="w-4 h-4 text-pink-400 animate-bounce" />
            <span>SCROLL TO EXPLORE ROBOT PRESENTATION</span>
          </motion.div>
        )}
      </section>

      {/* 6. SCROLL STORYTELLING: RIGHT PROJECT SHOWCASE VIEWPORT */}
      {isActivated && (
        <section
          ref={showcaseRef}
          className="relative z-20 w-full min-h-[220vh] pointer-events-none"
        >
          {/* Floating Right Presentation Stage */}
          <div className="fixed right-4 sm:right-10 lg:right-16 top-28 lg:top-32 bottom-12 w-full max-w-xl lg:max-w-2xl flex flex-col justify-center pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 80, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-3xl bg-[#080b14]/90 border border-pink-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(236,72,153,0.35)] overflow-hidden"
              >
                {/* Top Subtle Flare */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header Tag & Project Index */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-pink-300 uppercase">
                      SYSTEM 0{activeProjectIndex + 1} // {activeProject.domainId.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span>STATUS: DEPLOYED</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Project Title & One-Liner */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {activeProject.title}
                </h2>
                <p className="text-sm sm:text-base text-pink-200/90 font-mono mt-2 leading-relaxed">
                  {activeProject.oneLiner}
                </p>

                {/* Problem & Solution Breakdown */}
                <div className="space-y-4 my-6 py-4 border-y border-white/10 text-xs sm:text-sm font-sans">
                  <div>
                    <span className="font-mono text-xs text-pink-400 font-bold uppercase tracking-wider block mb-1">
                      [ THE ENGINEERING CHALLENGE ]
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                      [ APPLIED NEURAL ARCHITECTURE ]
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Metric Telemetry Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                  {activeProject.metrics?.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-black/50 border border-white/10 text-center"
                    >
                      <div className="text-base sm:text-lg font-black text-pink-300 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {activeProject.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {activeProject.repoLink && (
                      <a
                        href={activeProject.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-colors"
                        aria-label="View Source Code"
                      >
                        <GitBranch className="w-4 h-4" />
                      </a>
                    )}
                    {activeProject.liveLink && (
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-colors"
                        aria-label="View Live System"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProjectForModal(activeProject)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-mono font-bold tracking-wider shadow-lg hover:shadow-pink-500/25 transition-all cursor-pointer group"
                  >
                    <span>EXPLORE ARCHITECTURE</span>
                    <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* 7. Deep-Dive Modal (if Recruiter clicks Explore Architecture) */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        domain={domain}
        isOpen={Boolean(selectedProjectForModal)}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </div>
  );
}
