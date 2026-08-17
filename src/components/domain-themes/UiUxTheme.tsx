"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, Layers, Sparkles, Layout, MousePointer2, Move, Sliders } from "lucide-react";

export default function UiUxTheme() {
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const colorTokens = [
    { name: "brand-500", hex: "#10B981", bg: "bg-emerald-500" },
    { name: "accent-indigo", hex: "#6366F1", bg: "bg-indigo-500" },
    { name: "surface-900", hex: "#0B0E17", bg: "bg-slate-900" },
    { name: "glow-cyan", hex: "#06B6D4", bg: "bg-cyan-500" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040806]">
      {/* Emerald / Mint Ambient Radial */}
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-transparent to-[#040605]" />

      {/* Floating Figma-Style Component Canvas Inspector (Top Right) */}
      <motion.div
        animate={{ x: cursorPos.x * 0.8, y: cursorPos.y * 0.8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="absolute top-20 right-6 sm:right-16 w-80 sm:w-96 rounded-2xl bg-emerald-950/25 border border-emerald-500/25 backdrop-blur-md p-5 opacity-45 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
      >
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-3 text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>DESIGN_SYSTEM // ATOMIC_TOKENS</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            WCAG AAA
          </span>
        </div>

        {/* Color Swatch Tokens */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {colorTokens.map((token, idx) => (
            <div key={idx} className="p-1.5 rounded-lg bg-black/40 border border-emerald-500/15 text-center">
              <div className={`h-6 rounded-md ${token.bg} mb-1 shadow-sm`} />
              <span className="text-[9px] font-mono text-slate-400 block truncate">{token.name}</span>
            </div>
          ))}
        </div>

        {/* Inspect Box Model Guide */}
        <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/15 font-mono text-[10px] text-emerald-200/70 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-semibold">{`<Button variant="primary" />`}</span>
            <span className="text-[9px] text-slate-500">AutoLayout: 8px</span>
          </div>
          <p className="text-slate-400">border-radius: 16px · padding: 12px 24px</p>
        </div>
      </motion.div>

      {/* Floating Micro-Interaction Physics Wireframe (Bottom Left) */}
      <motion.div
        animate={{ x: -cursorPos.x * 0.6, y: -cursorPos.y * 0.6 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="absolute -bottom-10 -left-6 sm:left-14 w-80 sm:w-96 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 backdrop-blur-md p-5 opacity-35"
      >
        <div className="flex items-center justify-between font-mono text-xs text-emerald-300 mb-3 border-b border-emerald-500/15 pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>SPRING_PHYSICS // PROTOTYPE</span>
          </div>
          <span className="text-emerald-400">60 FPS</span>
        </div>

        <div className="space-y-2 font-mono text-[10px] text-slate-300">
          <div className="flex items-center justify-between">
            <span>stiffness: 260</span>
            <div className="w-24 h-1.5 bg-black/60 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-emerald-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>damping: 26</span>
            <div className="w-24 h-1.5 bg-black/60 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blueprint Design Grid Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
