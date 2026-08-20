"use client";

import React, { useState } from "react";
import { Wifi, Signal, Battery, Activity, Database, Smartphone, Radio, Sparkles, Bot, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AndroidLogoScreen, PhoneFrame } from "./MobileDevCinematicIntro";

export function AndroidDemo({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"logo" | "telemetry">("logo");

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Ambient Glow behind Android Device */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-amber-500/10 to-transparent blur-3xl rounded-full pointer-events-none transform -rotate-6 scale-90" />

      {/* Quick Tab Switcher */}
      <div className="mb-3 flex items-center gap-1.5 p-1 bg-slate-900/90 border border-emerald-500/30 rounded-full text-[11px] font-mono shadow-lg backdrop-blur-md z-10">
        <button
          onClick={() => setActiveTab("logo")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            activeTab === "logo"
              ? "bg-[#3ddc84] text-black font-bold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Android OS</span>
        </button>
        <button
          onClick={() => setActiveTab("telemetry")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            activeTab === "telemetry"
              ? "bg-amber-400 text-black font-bold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Telemetry</span>
        </button>
      </div>

      {/* Android Device Mockup Frame */}
      <PhoneFrame is3dActive={true} className="!w-64 sm:!w-72 md:!w-80 !h-[540px] sm:!h-[580px] !rounded-[44px]">
        {activeTab === "logo" ? (
          <AndroidLogoScreen />
        ) : (
          <div className="w-full h-full bg-[#080b13] text-slate-100 p-4 pt-7 flex flex-col justify-between select-none font-mono">
            {/* Status Bar */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-amber-300/80 mb-3 px-1">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <Battery className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* App Header */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white">DevSync Mobile</h5>
                    <p className="text-[8px] text-emerald-400">● 60 FPS JSI Bridge</p>
                  </div>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  v2.6
                </span>
              </div>

              {/* Live Metric Cards */}
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Database className="w-2.5 h-2.5 text-cyan-400" /> WatermelonDB Sync
                    </span>
                    <span className="text-emerald-400 font-semibold">ONLINE</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["20%", "85%", "45%", "100%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 text-pink-400" /> TurboModule Latency
                    </span>
                    <span className="text-amber-300 font-semibold">0.8ms</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[40, 70, 25, 90, 60, 45, 80, 95, 30, 85].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-amber-500/30 rounded-xs"
                        style={{ height: `${val * 0.12}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bluetooth Mesh */}
            <div className="space-y-1.5 mt-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-slate-200">Bluetooth Mesh</span>
                </div>
                <span className="text-[8px] text-emerald-300">Synchronized</span>
              </div>
              <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>
        )}
      </PhoneFrame>
    </div>
  );
}

