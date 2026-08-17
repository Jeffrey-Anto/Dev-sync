"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sliders, Eye, X, Check, Activity, Waves, Orbit, Layers, Disc } from "lucide-react";
import { DynamicBackgroundVariant } from "./DynamicBackground";

interface BackgroundControllerProps {
  variant: DynamicBackgroundVariant;
  setVariant: (variant: DynamicBackgroundVariant) => void;
  intensity: "subtle" | "medium" | "vibrant";
  setIntensity: (intensity: "subtle" | "medium" | "vibrant") => void;
  interactive: boolean;
  setInteractive: (interactive: boolean) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

export default function BackgroundController({
  variant,
  setVariant,
  intensity,
  setIntensity,
  interactive,
  setInteractive,
  showGrid,
  setShowGrid,
}: BackgroundControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const presets: { id: DynamicBackgroundVariant; name: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "all",
      name: "Cosmic Master",
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      desc: "Aurora nebula + Constellations + Fluid waves",
    },
    {
      id: "aurora",
      name: "Deep Aurora",
      icon: <Sparkles className="w-4 h-4 text-sky-400" />,
      desc: "Volumetric atmospheric cosmic glow",
    },
    {
      id: "constellation",
      name: "Constellation",
      icon: <Orbit className="w-4 h-4 text-purple-400" />,
      desc: "Interactive star particles with cursor gravity",
    },
    {
      id: "waves",
      name: "Fluid Waves",
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
      desc: "Multi-harmonic organic horizon ripples",
    },
    {
      id: "blobs",
      name: "Organic Orbs",
      icon: <Disc className="w-4 h-4 text-violet-400" />,
      desc: "Morphing glassmorphic ambient orbs",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Expanded Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#0b0f19]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Ambient Background
                  </h4>
                  <p className="text-[10px] text-slate-400">Dynamic Atmospheric Engine</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Close controller"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Presets List */}
            <div className="mt-3 space-y-1.5">
              <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                Visual Experience Preset
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {presets.map((p) => {
                  const isActive = variant === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setVariant(p.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-indigo-600/20 border border-indigo-500/40 text-white"
                          : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white/5">{p.icon}</div>
                        <div>
                          <p className="text-xs font-medium">{p.name}</p>
                          <p className="text-[10px] text-slate-400 leading-tight">{p.desc}</p>
                        </div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intensity Selector */}
            <div className="mt-3.5 pt-3 border-t border-white/10">
              <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                Luminance Intensity
              </span>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {(["subtle", "medium", "vibrant"] as const).map((lvl) => {
                  const active = intensity === lvl;
                  const labelMap = { subtle: "Subtle", medium: "Balanced", vibrant: "Luminous" };
                  return (
                    <button
                      key={lvl}
                      onClick={() => setIntensity(lvl)}
                      className={`py-1.5 text-center text-xs font-medium rounded-lg capitalize transition-all ${
                        active
                          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                          : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400"
                      }`}
                    >
                      {labelMap[lvl]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setInteractive(!interactive)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  interactive
                    ? "bg-sky-500/20 border border-sky-500/30 text-sky-300"
                    : "bg-white/[0.03] text-slate-500 border border-transparent"
                }`}
              >
                <Activity className="w-3 h-3" />
                Mouse Physics
              </button>

              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  showGrid
                    ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-300"
                    : "bg-white/[0.03] text-slate-500 border border-transparent"
                }`}
              >
                <Eye className="w-3 h-3" />
                Dot Matrix
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Minimized Pill Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0b0f19]/80 hover:bg-[#0b0f19] backdrop-blur-xl border border-white/15 hover:border-indigo-500/50 shadow-xl shadow-indigo-950/40 text-white text-xs font-medium transition-all"
        aria-label="Customize Background"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-slate-300 group-hover:text-white transition-colors">
          Visual Atmosphere
        </span>
      </motion.button>
    </div>
  );
}
