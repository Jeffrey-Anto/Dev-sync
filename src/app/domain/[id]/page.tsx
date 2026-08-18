"use client";

import React, { use, useState, useRef, useMemo } from "react";
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
import CoffeePourAnimation from "@/components/domain-themes/CoffeePourAnimation";
import SpidermanWebAnimation from "@/components/domain-themes/SpidermanWebAnimation";

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
  const [pourCount, setPourCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);

  // Stable per-card refs so GSAP can target each card DOM node
  const domainProjects = useMemo(
    () => PROJECTS.filter((p) => p.domainId === resolvedParams.id),
    [resolvedParams.id]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cardRefs = useMemo(
    () => domainProjects.map(() => React.createRef<HTMLDivElement>()),
    [domainProjects.length]
  );

  if (!domain) {
    return notFound();
  }

  const Icon = iconMap[domain.icon] || Terminal;
  // (domainProjects is now derived in useMemo above before the null-guard)

  const handleBackNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigatingBack(true);
    setTimeout(() => {
      router.push("/#domains");
    }, 450);
  };

  const isUiUx = domain.id === "ui-ux";
  const isWebDev = domain.id === "web-dev";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300 ${
        isUiUx ? "bg-[#f8faf9] text-slate-900" : "bg-[#030504] text-slate-100"
      }`}
    >
      {/* 1. DOMAIN THEMED VISUAL IDENTITY BACKGROUND */}
      <DomainBackground domainId={domain.id} />

      {/* Reverse Zoom-Out Transition Screen */}
      <AnimatePresence>
        {isNavigatingBack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center ${
              isUiUx ? "bg-[#f8faf9]" : "bg-[#050608]"
            }`}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`text-center font-bold ${
                isUiUx ? "font-doodle text-2xl text-black" : "font-mono text-sm text-cyan-400"
              }`}
            >
              RETURNING TO DOMAIN MATRIX...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC ENTRY WASH ANIMATION OVERLAY (Only on dark domains) */}
      {!isUiUx && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(circle at center, rgba(${domain.colorTheme.rgb}, 0.35) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* 3. TOP NAVIGATION BAR */}
      <header
        className={`sticky top-0 z-30 transition-all ${
          isUiUx
            ? "bg-[#FFE600] border-b-4 border-black px-4 sm:px-8 py-3.5 shadow-[0_4px_0_#000000]"
            : "border-b backdrop-blur-xl px-4 sm:px-8 py-3.5 shadow-2xl"
        }`}
        style={{
          backgroundColor: !isUiUx ? `rgba(4, 7, 6, 0.85)` : undefined,
          borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackNavigation}
            className={`group flex items-center gap-2.5 transition-all cursor-pointer ${
              isUiUx
                ? "handdrawn-btn bg-white text-black font-doodle text-sm font-bold px-4 py-1.5"
                : "text-xs font-mono text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 shadow-sm"
            }`}
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
            <span>Return to Capability Matrix</span>
          </button>

          {/* Breadcrumb Indicator */}
          <div
            className={`flex items-center gap-3 ${
              isUiUx ? "font-doodle text-sm text-black" : "text-xs font-mono text-slate-400"
            }`}
          >
            <span className="hidden sm:inline">COLLECTIVE.CS</span>
            <span className="hidden sm:inline text-slate-600">/</span>
            <div
              className={`flex items-center gap-2 px-3 py-1 ${
                isUiUx
                  ? "handdrawn-box bg-[#FF00AA] text-white font-bold"
                  : "rounded-lg bg-slate-900/80 border border-white/10"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isUiUx ? "bg-white" : "animate-pulse"}`}
                style={{ backgroundColor: !isUiUx ? domain.colorTheme.primary : undefined }}
              />
              <span className="font-semibold">{domain.name}</span>
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
            className={`w-20 h-20 flex items-center justify-center mb-6 transition-all duration-300 ${
              isUiUx
                ? "handdrawn-box bg-[#FFE600] text-black shadow-[6px_6px_0px_#000000] rotate-[-3deg]"
                : "rounded-3xl shadow-2xl"
            }`}
            style={{
              backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.15)` : undefined,
              border: !isUiUx ? `1px solid rgba(${domain.colorTheme.rgb}, 0.4)` : undefined,
              boxShadow: !isUiUx ? `0 0 50px ${domain.colorTheme.glow}` : undefined,
            }}
          >
            <Icon
              className="w-10 h-10"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
          </motion.div>

          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 mb-3 ${
              isUiUx
                ? "handdrawn-box bg-[#00FF66] text-black font-doodle text-sm font-bold shadow-[3px_3px_0px_#000000]"
                : "rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400"
            }`}
          >
            <Terminal
              className="w-3.5 h-3.5"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
            <span>SPECIALIZED COHORT CAPABILITY</span>
          </div>

          <h1
            className={`tracking-tight leading-tight mb-4 ${
              isUiUx
                ? "font-doodle text-4xl sm:text-6xl lg:text-7xl font-black text-black drop-shadow-[2px_2px_0px_#FFE600]"
                : "text-3xl sm:text-5xl lg:text-6xl font-black text-white"
            }`}
          >
            {domain.name}
          </h1>

          <p
            className={`max-w-3xl leading-relaxed mb-8 ${
              isUiUx
                ? "font-doodle text-xl sm:text-2xl text-slate-900 font-bold"
                : "text-base sm:text-xl text-slate-300 font-sans font-normal"
            }`}
          >
            {domain.tagline}
          </p>

          {/* Aggregate Telemetry Metrics for this Domain */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box bg-[#FFE600] text-black shadow-[4px_4px_0_#000] font-doodle text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <Users
                className="w-4 h-4"
                style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domain.studentCount}</strong> CS Undergraduates
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box-alt bg-[#00E5FF] text-black shadow-[4px_4px_0_#000] font-doodle text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <FolderGit2
                className="w-4 h-4"
                style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domainProjects.length}</strong> Deployed Systems
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box bg-[#FF00AA] text-white shadow-[4px_4px_0_#000] font-doodle text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <Layers
                className="w-4 h-4"
                style={{ color: isUiUx ? "#FFFFFF" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domain.techStack.length}</strong> Production Tech Stacks
              </span>
            </div>
          </div>
        </motion.div>

        {/* 5. PROJECT SHOWCASE GRID */}
        <section className="mb-20">
          <div
            className={`flex items-center justify-between mb-8 pb-4 ${
              isUiUx ? "border-b-4 border-black" : "border-b border-white/10"
            }`}
          >
            <div>
              <h2
                className={`tracking-tight ${
                  isUiUx
                    ? "font-doodle text-3xl sm:text-4xl font-black text-black"
                    : "text-xl sm:text-2xl font-black text-white"
                }`}
              >
                Verified Production Systems ({domainProjects.length})
              </h2>
              <p
                className={`mt-1 ${
                  isUiUx
                    ? "font-doodle text-base text-slate-800 font-bold"
                    : "text-xs sm:text-sm text-slate-400 font-mono"
                }`}
              >
                Click any system architecture tile to inspect problem statements, benchmarked outcomes, and live source.
              </p>
            </div>
            <span
              className={`hidden sm:inline ${
                isUiUx
                  ? "handdrawn-btn bg-[#FFE600] text-black font-doodle font-bold text-sm px-4 py-1"
                  : "text-xs font-mono px-3 py-1 rounded-full border"
              }`}
              style={{
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.4)` : undefined,
                color: !isUiUx ? domain.colorTheme.secondary : undefined,
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.12)` : undefined,
              }}
            >
              100% PRODUCTION READY
            </span>
          </div>

          {/* If UI/UX domain, GSAP-driven Coffee Pour Animation orchestrates card entries */}
          {isUiUx && (
            <CoffeePourAnimation
              pourCount={pourCount}
              onTriggerPour={() => setPourCount((prev) => prev + 1)}
              cardRefs={cardRefs as React.RefObject<HTMLElement | null>[]}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-container">
            {domainProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(isUiUx || isWebDev) ? cardRefs[index] : undefined}
                project={project}
                domain={domain}
                index={index}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>

          {/* If Web Dev domain, Spidey runs on the bottom road & shoots webs to pull projects down from top */}
          {isWebDev && (
            <SpidermanWebAnimation
              swingCount={swingCount}
              onTriggerSwing={() => setSwingCount((prev) => prev + 1)}
              cardRefs={cardRefs as React.RefObject<HTMLElement | null>[]}
            />
          )}
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
          className={`p-8 text-center mb-16 ${
            isUiUx
              ? "handdrawn-box bg-white text-black shadow-[8px_8px_0px_#000000]"
              : "rounded-3xl border backdrop-blur-xl shadow-lg"
          }`}
          style={{
            backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.05)` : undefined,
            borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.2)` : undefined,
          }}
        >
          <h3
            className={`uppercase tracking-widest mb-4 flex items-center justify-center gap-2 ${
              isUiUx
                ? "font-doodle text-xl font-bold text-black"
                : "text-xs font-mono text-slate-300"
            }`}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
            <span>CORE TOOLING &amp; INFRASTRUCTURE ECOSYSTEM</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {domain.techStack.map((tech, idx) => (
              <span
                key={idx}
                className={`transition-all ${
                  isUiUx
                    ? "handdrawn-btn bg-[#00FF66] text-black font-doodle font-bold text-base px-4 py-1.5 hover:bg-[#FFE600]"
                    : "text-xs font-mono px-3.5 py-1.5 rounded-xl border text-slate-200 hover:border-white/30 shadow-sm"
                }`}
                style={{
                  backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                  borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
                }}
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
            className={`inline-flex items-center gap-2 transition-all cursor-pointer ${
              isUiUx
                ? "handdrawn-btn bg-[#FF00AA] text-white font-doodle text-lg font-bold px-8 py-3.5 shadow-[6px_6px_0px_#000000] hover:bg-[#FFE600] hover:text-black"
                : "px-6 py-3 rounded-2xl font-mono text-xs font-semibold text-white shadow-xl hover:scale-105"
            }`}
            style={{
              backgroundColor: !isUiUx ? domain.colorTheme.primary : undefined,
              boxShadow: !isUiUx ? `0 0 25px rgba(${domain.colorTheme.rgb}, 0.35)` : undefined,
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
      <footer
        className={`relative z-20 py-6 text-center transition-colors ${
          isUiUx
            ? "bg-[#FFE600] border-t-4 border-black text-black font-doodle font-bold text-base"
            : "border-t border-white/10 text-xs font-mono text-slate-500 bg-[#050608]"
        }`}
      >
        <span>COLLECTIVE.CS // BATCH OF 2026 · VERIFIED CAMPUS TALENT</span>
      </footer>
    </div>
  );
}
