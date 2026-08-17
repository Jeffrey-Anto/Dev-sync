"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Terminal,
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Smartphone,
  ShieldAlert,
  Palette,
  Users,
  FolderGit2,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { DOMAINS, PROJECTS, Project } from "@/data/domains";
import DomainBackground from "@/components/domain-themes/DomainBackground";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetailModal from "@/components/projects/ProjectDetailModal";
import { AndroidDemo } from "@/components/domain-themes/AndroidDemo";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Palette,
  Smartphone,
  ShieldAlert,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DomainDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const domain = DOMAINS.find((d) => d.id === resolvedParams.id);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  if (!domain) {
    return notFound();
  }

  const Icon = iconMap[domain.icon] || Terminal;
  const domainProjects = PROJECTS.filter((p) => p.domainId === domain.id);

  const handleBackNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigatingBack(true);
    setTimeout(() => {
      router.push("/#domains");
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      {/* 1. DOMAIN THEMED VISUAL IDENTITY BACKGROUND */}
      <DomainBackground domainId={domain.id} />

      {/* Reverse Zoom-Out Transition Screen */}
      <AnimatePresence>
        {isNavigatingBack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#050608]"
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center font-mono text-cyan-300 text-sm"
            >
              RETURNING TO DOMAIN MATRIX...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC ENTRY WASH ANIMATION OVERLAY */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(circle at center, rgba(${domain.colorTheme.rgb}, 0.4) 0%, #050608 100%)`,
        }}
      />

      {/* 3. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06080e]/85 backdrop-blur-xl px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackNavigation}
            className="group flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Capability Matrix</span>
          </button>

          {/* Breadcrumb Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">COLLECTIVE.CS</span>
            <span className="hidden sm:inline text-slate-600">/</span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: domain.colorTheme.primary }}
              />
              <span className="font-semibold text-white">{domain.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. MAIN DOMAIN SHOWCASE VIEWPORT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-grow w-full">
        {/* Domain Hero Header with Motion Settle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 flex flex-col items-center"
        >
          {/* Domain Icon Badge */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.15)`,
              border: `1px solid rgba(${domain.colorTheme.rgb}, 0.4)`,
              boxShadow: `0 0 50px ${domain.colorTheme.glow}`,
            }}
          >
            <Icon className="w-10 h-10" style={{ color: domain.colorTheme.secondary }} />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 mb-3">
            <Terminal className="w-3.5 h-3.5" style={{ color: domain.colorTheme.secondary }} />
            <span>SPECIALIZED COHORT CAPABILITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            {domain.name}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-sans font-normal mb-8">
            {domain.tagline}
          </p>

          {/* Aggregate Telemetry Metrics for this Domain */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0e121e]/80 border border-white/10 text-slate-200 backdrop-blur-md">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>
                <strong className="text-white">{domain.studentCount}</strong> CS Undergraduates
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0e121e]/80 border border-white/10 text-slate-200 backdrop-blur-md">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>
                <strong className="text-white">{domainProjects.length}</strong> Deployed Systems
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0e121e]/80 border border-white/10 text-slate-200 backdrop-blur-md">
              <Layers className="w-4 h-4 text-pink-400" />
              <span>
                <strong className="text-white">{domain.techStack.length}</strong> Production Tech Stacks
              </span>
            </div>
          </div>
        </motion.div>

        {/* 5. PROJECT SHOWCASE GRID (NO NAMES ANYWHERE) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Verified Production Systems ({domainProjects.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                Click any system architecture tile to inspect problem statements, benchmarked outcomes, and live source.
              </p>
            </div>

            <span
              className="hidden sm:inline text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                borderColor: `rgba(${domain.colorTheme.rgb}, 0.3)`,
                color: domain.colorTheme.secondary,
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.1)`,
              }}
            >
              100% PRODUCTION READY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-container">
            {domainProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                domain={domain}
                index={index}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        </section>

        {/* Specialized Mobile Device Architecture Mockup for Mobile Domain */}
        {domain.id === "mobile-dev" && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 rounded-3xl bg-gradient-to-b from-[#0e121e]/90 to-[#080b13]/90 border border-amber-500/20 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>NATIVE RUNTIME ENVIRONMENT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Mobile Architecture & Live Performance Telemetry
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
                  Production mobile applications engineered by our cohort implement zero-jank 60 FPS interfaces, offline-first SQLite/WatermelonDB synchronization engines, and low-latency Bluetooth/WebSockets hardware communication.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">FRAME BUDGET</span>
                    <span className="text-emerald-400 font-bold text-sm">16.6ms / 60 FPS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">OFFLINE LATENCY</span>
                    <span className="text-amber-300 font-bold text-sm">&lt; 2ms Indexed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 text-[10px] block">BRIDGE TYPE</span>
                    <span className="text-cyan-300 font-bold text-sm">JSI TurboModules</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <AndroidDemo className="w-full max-w-[280px] sm:max-w-[320px]" />
              </div>
            </div>
          </motion.section>
        )}

        {/* 6. DOMAIN TECH STACK BADGES */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#0a0d16]/80 border border-white/10 p-8 text-center backdrop-blur-xl mb-16"
        >
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: domain.colorTheme.secondary }} />
            <span>CORE TOOLING & INFRASTRUCTURE ECOSYSTEM</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {domain.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 hover:border-white/20 transition-all shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Recruiter Placement Action Pill */}
        <div className="text-center">
          <button
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs font-semibold text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: domain.colorTheme.primary,
              boxShadow: `0 0 25px rgba(${domain.colorTheme.rgb}, 0.35)`,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Domains Matrix</span>
          </button>
        </div>
      </main>

      {/* 7. PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        domain={domain}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 py-6 text-center text-xs font-mono text-slate-500 bg-[#050608]">
        <span>COLLECTIVE.CS // BATCH OF 2026 · VERIFIED CAMPUS TALENT</span>
      </footer>
    </div>
  );
}
