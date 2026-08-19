"use client";

import React from "react";
import { Terminal, ShieldCheck, Mail, Calendar, CheckCircle2, ArrowUp } from "lucide-react";
import { COHORT_STATS } from "@/data/domains";
import { CircuitTraceBackground } from "@/components/backgrounds";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 bg-[#040507] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Dynamic Circuit Trace Background */}
      <CircuitTraceBackground opacity={0.35} interactive={true} />

      {/* Background Accent Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Ethos */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="font-mono text-sm tracking-widest font-bold text-white">
                  COLLECTIVE<span className="text-indigo-400">.CS</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4 font-sans">
                A unified showcase of 60 Computer Science engineers graduating in 2026.
                Designed strictly as a collective cohort demonstration of real-world production engineering capability.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>On-Campus & Remote Drives Open</span>
              </div>
            </div>

            <div className="mt-8 text-xs font-mono text-slate-500">
              © 2026 Department of Computer Science & Engineering. All projects verified.
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              COHORT SUMMARY
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Class Size</span>
                <strong className="text-white">{COHORT_STATS.totalEngineers} Engineers</strong>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Core Domains</span>
                <strong className="text-white">{COHORT_STATS.domainsCount} Disciplines</strong>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Deployed Projects</span>
                <strong className="text-white">{COHORT_STATS.totalProjects}+ Live Artifacts</strong>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Placement Status</span>
                <strong className="text-emerald-400">100% Ready</strong>
              </li>
            </ul>
          </div>

          {/* Placement Cell Drive Scheduling */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              RECRUITER DESK & PLACEMENT OFFICE
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              To schedule an exclusive campus recruitment drive, shortlist by domain capability, or request live test environment access:
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>placements.cs@university.edu</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Drive Slots: Aug 2026 – March 2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="pt-8 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>NO INDIVIDUAL NAMES · PURE COLLECTIVE THROUGHPUT</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
