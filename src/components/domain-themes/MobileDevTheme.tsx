"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Signal, Battery, Activity, Cpu, Layers } from "lucide-react";
import { AndroidLogoScreen, PhoneFrame } from "./MobileDevCinematicIntro";

export default function MobileDevTheme() {
  const [syncMetric, setSyncMetric] = useState(99.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncMetric(Number((99.1 + Math.random() * 0.8).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#05070d]">
      {/* Radial Android Emerald & Amber Ambiance */}
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-amber-950/10 to-[#04060a]" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3ddc84_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      {/* Floating Ambient Android Phone Frame (Right Side) */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [-2, 1, -2] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-24 right-4 sm:right-16 w-56 sm:w-64 opacity-25 hover:opacity-70 transition-opacity pointer-events-auto hidden lg:block scale-90"
      >
        <PhoneFrame className="!w-full !h-[500px] !rounded-[40px] !p-2">
          <AndroidLogoScreen />
        </PhoneFrame>
      </motion.div>

      {/* Floating Ambient Mini Frame (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [3, -1, 3] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute -bottom-32 left-4 sm:left-12 w-48 sm:w-56 opacity-20 pointer-events-none hidden md:block scale-75"
      >
        <PhoneFrame className="!w-full !h-[450px] !rounded-[36px] !p-2">
          <AndroidLogoScreen />
        </PhoneFrame>
      </motion.div>

      {/* Subtle Circuit Glow Accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#3ddc84]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

