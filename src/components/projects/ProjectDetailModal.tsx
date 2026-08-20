"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Cpu,
  Layers,
  Terminal,
  Sparkles,
  Palette,
  Coffee,
} from "lucide-react";
import { Project, Domain } from "@/data/domains";

interface ProjectDetailModalProps {
  project: Project | null;
  domain: Domain;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  domain,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const isUiUx = domain.id === "ui-ux";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 transition-opacity ${
              isUiUx
                ? "bg-slate-900/60 backdrop-blur-md"
                : "bg-black/80 backdrop-blur-xl"
            }`}
          />

          {isUiUx ? (
            <UiUxDetailModal project={project} domain={domain} onClose={onClose} />
          ) : (
            <DarkDetailModal project={project} domain={domain} onClose={onClose} />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. UI/UX POP-ART & NEO-BRUTALIST MODAL
// ─────────────────────────────────────────────────────────────────────────────
function UiUxDetailModal({
  project,
  domain,
  onClose,
}: {
  project: Project;
  domain: Domain;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30, rotate: -1 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30, rotate: 1 }}
      transition={{ type: "spring", damping: 24, stiffness: 280 }}
      className="relative w-full max-w-5xl lg:max-w-6xl max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl bg-[#f8faf9] border-[3px] sm:border-[3.5px] border-black p-4 sm:p-8 lg:p-10 z-10 text-slate-900 shadow-[8px_8px_0px_#000000] sm:shadow-[12px_12px_0px_#000000]"
    >
      {/* Background Code Text Stream Accent */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] leading-relaxed text-slate-800 break-words whitespace-pre-wrap -rotate-3 overflow-hidden">
        {Array.from({ length: 20 })
          .map(
            () =>
              `figma.createNode("FRAME"); const designSystem = { colorTokens: "wcag_aaa", typography: "responsive", motion: "60fps_physics" }; `
          )
          .join(" ")}
      </div>

      {/* Decorative Hand-drawn Marker Scribble Svg in background */}
      <svg
        className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none opacity-40 -z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 10 Q 140 30 200 120 T 260 220 Q 180 280 80 200 Z"
          fill="#00FF2A"
        />
        <path
          d="M 120 0 Q 200 40 240 140 T 220 260"
          stroke="#00E5FF"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Header Row: Badges, Title & Neo-brutalist Close Button */}
      <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4 border-b-4 border-black pb-4 sm:pb-6 mb-4 sm:mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="handdrawn-box bg-[#FF00AA] text-white font-doodle font-black text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-0.5 sm:py-1 shadow-[2px_2px_0_#000]">
              {domain.name}
            </span>
            <span className="handdrawn-box-alt bg-[#FFE600] text-black font-mono text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-[2px_2px_0_#000]">
              SPEC #{project.id.toUpperCase()}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 handdrawn-btn bg-[#00E5FF] text-black font-doodle font-bold text-xs px-2.5 py-0.5 shadow-[2px_2px_0_#000]">
              <Coffee className="w-3.5 h-3.5 text-black" />
              <span>FRESHLY POURED</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-doodle tracking-tight leading-tight [text-shadow:_2px_2px_0_#FFE600]">
            {project.title}
          </h2>

          <p className="text-sm sm:text-xl text-slate-800 font-doodle font-bold mt-1.5 sm:mt-2.5 leading-relaxed">
            {project.oneLiner}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="handdrawn-btn bg-[#FFE600] hover:bg-[#FF00AA] hover:text-white text-black p-2 sm:p-2.5 border-2 border-black shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] transition-all cursor-pointer flex-shrink-0"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>
      </div>

      {/* Metrics Telemetry Grid (Pop-Art Cards) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
          {project.metrics.map((metric, mIdx) => {
            const bgStyles = [
              "bg-[#FFE600]/30 shadow-[4px_4px_0_#000]",
              "bg-[#00E5FF]/25 shadow-[4px_4px_0_#000]",
              "bg-[#FF00AA]/20 shadow-[4px_4px_0_#000]",
            ];
            const textColors = ["#000000", "#0033FF", "#D80075"];
            return (
              <div
                key={mIdx}
                className={`handdrawn-box p-4 border-[2.5px] border-black flex flex-col justify-center ${
                  bgStyles[mIdx % bgStyles.length]
                }`}
              >
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span
                  className="text-2xl sm:text-3xl font-black font-doodle mt-1 tracking-tight"
                  style={{ color: textColors[mIdx % textColors.length] }}
                >
                  {metric.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Structured Problem → Solution → Outcome Breakdown */}
      <div className="relative z-10 space-y-4 mb-8">
        {/* 01: Core Challenge */}
        <div className="handdrawn-box bg-[#FFE4E6] border-[2.5px] border-black p-5 sm:p-6 shadow-[5px_5px_0_#000] flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-[#FF0055] text-white border-2 border-black shadow-[2px_2px_0_#000] flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-mono font-black uppercase tracking-wider text-[#9F1239] mb-1.5">
              01 // THE DESIGN &amp; UX CHALLENGE
            </h4>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-doodle font-bold">
              {project.problem || project.description}
            </p>
          </div>
        </div>

        {/* 02: Architecture & Solution */}
        <div className="handdrawn-box-alt bg-[#E0F2FE] border-[2.5px] border-black p-5 sm:p-6 shadow-[5px_5px_0_#000] flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-[#00E5FF] text-black border-2 border-black shadow-[2px_2px_0_#000] flex-shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-mono font-black uppercase tracking-wider text-[#075985] mb-1.5">
              02 // DESIGN SYSTEM &amp; CRAFT SOLUTION
            </h4>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-doodle font-bold">
              {project.solution || project.description}
            </p>
          </div>
        </div>

        {/* 03: Verified Outcome */}
        <div className="handdrawn-box bg-[#DCFCE7] border-[2.5px] border-black p-5 sm:p-6 shadow-[5px_5px_0_#000] flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-[#00FF66] text-black border-2 border-black shadow-[2px_2px_0_#000] flex-shrink-0 mt-0.5">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-mono font-black uppercase tracking-wider text-[#166534] mb-1.5">
              03 // BENCHMARKED IMPACT &amp; COHORT OUTCOME
            </h4>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-doodle font-bold">
              {project.outcome || "Verified 100% WCAG AAA accessibility score with production-tested design tokens."}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      {project.architectureHighlights && project.architectureHighlights.length > 0 && (
        <div className="relative z-10 mb-8 p-6 rounded-3xl bg-white border-[2.5px] border-black shadow-[5px_5px_0_#000]">
          <h4 className="text-sm font-doodle font-black uppercase tracking-wider text-black mb-3.5 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#FF00AA]" />
            <span>DESIGN SYSTEM HIGHLIGHTS &amp; FOUNDATIONS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.architectureHighlights.map((hl, hIdx) => (
              <div
                key={hIdx}
                className="handdrawn-btn bg-[#FFFBEB] text-black border-2 border-black flex items-center gap-2 p-3 font-doodle font-bold text-sm shadow-[2px_2px_0_#000]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 stroke-[2.5]" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="relative z-10 mb-8">
        <h4 className="text-sm font-doodle font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-black" />
          <span>TOOLING, TOKENS &amp; PROTOCOLS</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="handdrawn-btn bg-[#00FF66] text-black font-doodle font-bold text-sm px-4 py-1.5 border-2 border-black shadow-[2px_2px_0_#000] hover:bg-[#FFE600]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTAs (Repo & Live Demo) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t-4 border-black">
        <div className="text-xs font-doodle font-bold text-slate-700">
          COLLECTIVE CS // UI/UX DESIGN COHORT · VERIFIED CAMPUS TALENT
        </div>

        <div className="flex items-center gap-3">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noreferrer"
              className="handdrawn-btn bg-white hover:bg-[#00E5FF] text-black font-doodle font-bold text-sm px-5 py-2.5 border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              <span>Design Artifacts</span>
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="handdrawn-btn bg-[#FF00AA] hover:bg-[#FFE600] hover:text-black text-white font-doodle font-bold text-sm px-6 py-2.5 border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2"
            >
              <span>Inspect Prototype</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DARK SCI-FI / CYBER THEME MODAL (For Web Dev, AI/ML, Cloud, Cyber, etc.)
// ─────────────────────────────────────────────────────────────────────────────
function DarkDetailModal({
  project,
  domain,
  onClose,
}: {
  project: Project;
  domain: Domain;
  onClose: () => void;
}) {
  const isWebDev = domain.id === "web-dev";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`relative w-full max-w-5xl lg:max-w-6xl max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl z-10 text-white selection:bg-indigo-500 ${
        isWebDev
          ? "bg-gradient-to-br from-[#0c0f1d]/95 via-[#070a14]/95 to-[#130d22]/95 border border-red-500/30"
          : "bg-[#0b0e17] border border-white/15"
      }`}
      style={{
        boxShadow: isWebDev
          ? "0 25px 60px -15px rgba(239, 68, 68, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)"
          : `0 25px 60px -15px rgba(${domain.colorTheme.rgb}, 0.35)`,
      }}
    >
      {/* Ambient Background Gradient */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ backgroundColor: isWebDev ? "#ef4444" : domain.colorTheme.primary }}
      />

      {/* Spiderweb Background Accent Lines for Web Dev */}
      {isWebDev && (
        <svg
          className="absolute -top-10 -right-10 w-48 h-48 opacity-[0.15] pointer-events-none text-red-400"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="0" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="0" r="75" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )}

      {/* Header: Domain Badge, Title & Close Button */}
      <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md font-semibold"
              style={{
                backgroundColor: isWebDev ? "rgba(239, 68, 68, 0.2)" : `rgba(${domain.colorTheme.rgb}, 0.15)`,
                color: isWebDev ? "#f87171" : domain.colorTheme.secondary,
                border: isWebDev ? "1px solid rgba(239, 68, 68, 0.4)" : `1px solid rgba(${domain.colorTheme.rgb}, 0.3)`,
              }}
            >
              {domain.name}
            </span>
            <span className="text-xs font-mono text-slate-500">
              PROJECT_ID: {project.id.toUpperCase()}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300 mt-1.5 sm:mt-2 font-normal leading-relaxed">
            {project.oneLiner}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer flex-shrink-0"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Technical Metrics Telemetry Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {project.metrics.map((metric, mIdx) => (
            <div
              key={mIdx}
              className={`p-3.5 rounded-2xl border flex flex-col justify-center ${
                isWebDev
                  ? "bg-red-950/20 border-red-500/20"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {metric.label}
              </span>
              <span
                className="text-lg sm:text-2xl font-extrabold font-mono mt-0.5 tracking-tight"
                style={{ color: isWebDev ? "#38bdf8" : domain.colorTheme.secondary }}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Structured Problem → Solution → Outcome Breakdown */}
      <div className="space-y-4 mb-8">
        {/* Problem Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/25 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 mb-1">
              01 // THE CORE ENGINEERING CHALLENGE
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {project.problem || project.description}
            </p>
          </div>
        </div>

        {/* Solution Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/25 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 flex-shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 mb-1">
              02 // ARCHITECTURE &amp; IMPLEMENTATION
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {project.solution || project.description}
            </p>
          </div>
        </div>

        {/* Outcome Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0 mt-0.5">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 mb-1">
              03 // BENCHMARKED OUTCOME &amp; PRODUCTION IMPACT
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {project.outcome || "Verified production reliability under multi-node stress loads."}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      {project.architectureHighlights && project.architectureHighlights.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>KEY ARCHITECTURAL PILLARS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {project.architectureHighlights.map((hl, hIdx) => (
              <div
                key={hIdx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="mb-8">
        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>TECHNOLOGIES &amp; PROTOCOLS USED</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-xs font-mono px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Live Repository & Demo CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="text-xs font-mono text-slate-500">
          COLLECTIVE CS VERIFIED ARTIFACT · NO INDIVIDUAL AUTHORSHIP
        </div>

        <div className="flex items-center gap-3">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-slate-900/80 border border-white/10 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Source Repository</span>
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105"
              style={{
                backgroundColor: isWebDev ? "#ef4444" : domain.colorTheme.primary,
                boxShadow: isWebDev
                  ? "0 0 20px rgba(239, 68, 68, 0.4)"
                  : `0 0 20px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              <span>Launch Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

