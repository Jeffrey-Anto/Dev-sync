"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Code, Layers, Layout, Terminal } from "lucide-react";

export default function WebDevTheme() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    let latestX = 0;
    let latestY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setMousePos({
          x: (latestX / window.innerWidth - 0.5) * 20,
          y: (latestY / window.innerHeight - 0.5) * 20,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#06070c]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-radial from-indigo-900/15 via-transparent to-[#050608]" />

      {/* Layered Floating Browser & Glass UI Wireframes */}
      <motion.div
        animate={{ x: mousePos.x * 0.8, y: mousePos.y * 0.8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="absolute top-16 -right-20 sm:right-10 w-96 sm:w-[480px] h-72 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 backdrop-blur-md opacity-35 shadow-[0_0_40px_rgba(99,102,241,0.15)] transform rotate-[-6deg]"
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500/20 bg-indigo-950/40 rounded-t-2xl">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="px-3 py-1 rounded bg-black/40 text-[10px] font-mono text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
            <Globe className="w-3 h-3 text-indigo-400" />
            <span>https://distributed-sync.cluster/v1</span>
          </div>
          <div className="w-4" />
        </div>
        {/* Browser Mock Body */}
        <div className="p-4 space-y-2.5 opacity-60 font-mono text-[11px] text-indigo-300">
          <div className="h-4 w-3/4 bg-indigo-500/20 rounded" />
          <div className="h-3 w-1/2 bg-indigo-500/10 rounded" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-16 bg-indigo-500/15 rounded-lg border border-indigo-500/20" />
            <div className="h-16 bg-indigo-500/15 rounded-lg border border-indigo-500/20" />
            <div className="h-16 bg-indigo-500/15 rounded-lg border border-indigo-500/20" />
          </div>
        </div>
      </motion.div>

      {/* Second Floating Glass Wireframe Card (Bottom Left) */}
      <motion.div
        animate={{ x: -mousePos.x * 0.6, y: -mousePos.y * 0.6 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="absolute -bottom-10 -left-10 sm:left-12 w-80 sm:w-96 h-64 rounded-2xl bg-indigo-950/25 border border-indigo-400/20 backdrop-blur-md opacity-30 shadow-2xl transform rotate-[8deg]"
      >
        <div className="p-4 border-b border-indigo-500/20 flex items-center justify-between font-mono text-xs text-indigo-300">
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> DOM_VIEWPORT</span>
          <span className="text-[10px] text-indigo-400">FPS: 60.0</span>
        </div>
        <div className="p-4 space-y-2 font-mono text-[10px] text-indigo-200/60">
          <p className="text-emerald-400 font-semibold">{`export const distributedSync = createStore({`}</p>
          <p className="pl-3">{`shards: 16, consensus: 'Raft',`}</p>
          <p className="pl-3">{`latencyP99: '1.2ms'`}</p>
          <p className="text-emerald-400">{`});`}</p>
        </div>
      </motion.div>

      {/* Floating Syntax Elements */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
    </div>
  );
}
