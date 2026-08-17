"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Wifi, Battery, Signal, Radio } from "lucide-react";

export default function MobileDevTheme() {
  const [pulsePos, setPulsePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePos({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#080603]">
      {/* Radial Amber Ambiance */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-[#060503]" />

      {/* Floating Modern Phone Frame Wireframe (Right Side) */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-4, -2, -4] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 right-6 sm:right-20 w-64 sm:w-72 h-[420px] rounded-[40px] bg-amber-950/20 border-2 border-amber-500/25 backdrop-blur-lg p-3 opacity-40 shadow-[0_0_60px_rgba(245,158,11,0.15)] flex flex-col justify-between"
      >
        {/* Dynamic Island / Notch */}
        <div className="w-20 h-4 bg-black/60 rounded-full mx-auto mb-2 flex items-center justify-end px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 text-[10px] font-mono text-amber-300/80 mb-2">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-2.5 h-2.5" />
            <Wifi className="w-2.5 h-2.5" />
            <Battery className="w-3 h-3" />
          </div>
        </div>

        {/* Mock Screen Content */}
        <div className="relative flex-grow rounded-2xl bg-black/40 border border-amber-500/15 p-3 overflow-hidden font-mono space-y-2">
          {/* Simulated Gesture Ripple */}
          <motion.div
            key={`${pulsePos.x}-${pulsePos.y}`}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-8 h-8 rounded-full border border-amber-400 bg-amber-400/20 pointer-events-none"
            style={{ left: `${pulsePos.x}%`, top: `${pulsePos.y}%` }}
          />

          <div className="h-6 w-2/3 bg-amber-500/20 rounded-md" />
          <div className="h-20 bg-amber-500/10 rounded-xl border border-amber-500/20 p-2 text-[9px] text-amber-200/60">
            <div className="flex items-center justify-between">
              <span>OFFLINE_SYNC_ENGINE</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="h-2 w-full bg-amber-500/20 rounded mt-3" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-12 bg-amber-500/10 rounded-lg border border-amber-500/15" />
            <div className="h-12 bg-amber-500/10 rounded-lg border border-amber-500/15" />
          </div>
        </div>

        {/* Home Bar Indicator */}
        <div className="w-24 h-1 bg-amber-400/40 rounded-full mx-auto mt-3" />
      </motion.div>

      {/* Floating Device Frame (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [6, 4, 6] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute -bottom-16 left-6 sm:left-16 w-56 sm:w-64 h-80 rounded-[32px] bg-amber-950/20 border border-amber-500/20 backdrop-blur-md p-3 opacity-30 shadow-2xl"
      >
        <div className="p-2 text-[10px] font-mono text-amber-300/70 border-b border-amber-500/15 flex items-center justify-between">
          <span>REACT_NATIVE_BRIDGE</span>
          <span>12ms</span>
        </div>
      </motion.div>

      {/* Background Dots */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
    </div>
  );
}
