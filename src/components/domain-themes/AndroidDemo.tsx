"use client";

import React from "react";
import { Android } from "@/components/magicui/android";
import { Wifi, Signal, Battery, Activity, Database, Smartphone, Radio, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AndroidDemo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient Glow behind Android Device */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent blur-3xl rounded-full pointer-events-none transform -rotate-6 scale-90" />

      {/* Android Device Mockup Frame */}
      <div className="relative w-64 sm:w-72 md:w-80 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)] rounded-[44px] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
        <Android className="size-full">
          {/* Custom In-Device Screen Interface */}
          <div className="w-full h-full bg-[#080b13] text-slate-100 p-4 pt-10 flex flex-col justify-between select-none">
            {/* Status Bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/80 mb-4 px-1">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* App Header */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">DevSync Mobile</h5>
                    <p className="text-[9px] font-mono text-emerald-400">● 60 FPS Engine</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  v2.6
                </span>
              </div>

              {/* Live Metric Cards */}
              <div className="space-y-2 font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-cyan-400" /> WatermelonDB Sync
                    </span>
                    <span className="text-emerald-400 font-semibold">ONLINE</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["20%", "85%", "45%", "100%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-pink-400" /> React Native JSI Bridge
                    </span>
                    <span className="text-amber-300 font-semibold">0.8ms</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[40, 70, 25, 90, 60, 45, 80, 95, 30, 85].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-amber-500/30 rounded-xs"
                        style={{ height: `${val * 0.16}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls / Action in Mockup */}
            <div className="space-y-2 mt-4 font-mono">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-[10px] text-slate-200">Bluetooth Mesh</span>
                </div>
                <span className="text-[9px] text-emerald-300">Synchronized</span>
              </div>

              {/* Navigation Pill Indicator */}
              <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </Android>
      </div>
    </div>
  );
}
