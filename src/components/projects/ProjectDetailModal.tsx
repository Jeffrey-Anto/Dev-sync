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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0b0e17] border border-white/15 p-6 sm:p-10 shadow-2xl z-10 text-white selection:bg-indigo-500"
            style={{
              boxShadow: `0 25px 60px -15px rgba(${domain.colorTheme.rgb}, 0.35)`,
            }}
          >
            {/* Ambient Background Gradient */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-[100px] pointer-events-none"
              style={{ backgroundColor: domain.colorTheme.primary }}
            />

            {/* Header: Domain Badge, Title & Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md font-semibold"
                    style={{
                      backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.15)`,
                      color: domain.colorTheme.secondary,
                      border: `1px solid rgba(${domain.colorTheme.rgb}, 0.3)`,
                    }}
                  >
                    {domain.name}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    PROJECT_ID: {project.id.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
                  {project.oneLiner}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Technical Metrics Telemetry Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {project.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-center"
                  >
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {metric.label}
                    </span>
                    <span
                      className="text-lg sm:text-2xl font-extrabold font-mono mt-0.5 tracking-tight"
                      style={{ color: domain.colorTheme.secondary }}
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
                    02 // ARCHITECTURE & IMPLEMENTATION
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
                    03 // BENCHMARKED OUTCOME & PRODUCTION IMPACT
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
                <span>TECHNOLOGIES & PROTOCOLS USED</span>
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
                      backgroundColor: domain.colorTheme.primary,
                      boxShadow: `0 0 20px rgba(${domain.colorTheme.rgb}, 0.4)`,
                    }}
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
