"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Android } from "@/components/magicui/android";
import { Wifi, Signal, Battery, Activity, Database, Radio, Smartphone } from "lucide-react";

export default function MobileDevTheme() {
  const [syncMetric, setSyncMetric] = useState(99.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncMetric(Number((99.1 + Math.random() * 0.8).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#080603]">
      {/* Radial Amber Ambiance */}
      <div className="absolute inset-0 bg-radial from-amber-950/25 via-transparent to-[#060503]" />

      {/* Floating Magic UI Android Frame (Right Side) */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-3, -1, -3] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-20 right-6 sm:right-24 w-60 sm:w-72 opacity-40 hover:opacity-75 transition-opacity pointer-events-auto"
      >
        <Android className="w-full h-auto drop-shadow-[0_20px_50px_rgba(245,158,11,0.25)]">
          <div className="w-full h-full bg-[#090c14] text-slate-200 p-3 pt-9 flex flex-col justify-between select-none">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[9px] font-mono text-amber-300/80 mb-2">
              <span>09:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-2.5 h-2.5" />
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Simulated Live Mobile Engine Screen */}
            <div className="space-y-2 font-mono">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-amber-300 font-bold">CROSS_PLATFORM_CORE</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="text-[8px] text-slate-400 mt-1">WatermelonDB + JSI TurboModules</div>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-[8px] space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>FRAME RATE</span>
                  <span className="text-emerald-400 font-bold">60.0 FPS</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>LOCAL CACHE SYNC</span>
                  <span className="text-amber-300">{syncMetric}%</span>
                </div>
              </div>
            </div>

            {/* Gesture Pill */}
            <div className="w-20 h-1 bg-amber-400/40 rounded-full mx-auto mt-2" />
          </div>
        </Android>
      </motion.div>

      {/* Floating Device Frame (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [4, 2, 4] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        className="absolute -bottom-24 left-6 sm:left-16 w-52 sm:w-64 opacity-25"
      >
        <Android className="w-full h-auto" />
      </motion.div>

      {/* Background Dots */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
    </div>
  );
}
