"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuroraMeshBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
}

export default function AuroraMeshBackground({
  className = "",
  intensity = "medium",
}: AuroraMeshBackgroundProps) {
  const opacityMap = {
    subtle: "opacity-30",
    medium: "opacity-50",
    vibrant: "opacity-75",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Container with high-blur diffusion filter */}
      <div className={`relative w-full h-full filter blur-[80px] md:blur-[120px] transition-opacity duration-1000 ${opacityMap[intensity]}`}>
        {/* Aurora Layer 1: Indigo Nebula */}
        <motion.div
          animate={{
            x: ["-10%", "20%", "-5%", "-10%"],
            y: ["0%", "15%", "-15%", "0%"],
            scale: [1, 1.25, 0.95, 1],
            rotate: [0, 45, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-indigo-600/50 via-purple-600/40 to-transparent mix-blend-screen"
        />

        {/* Aurora Layer 2: Electric Cyan Beam */}
        <motion.div
          animate={{
            x: ["15%", "-15%", "10%", "15%"],
            y: ["-10%", "20%", "5%", "-10%"],
            scale: [1.1, 0.85, 1.2, 1.1],
            rotate: [0, -60, -120, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-bl from-cyan-500/45 via-teal-500/30 to-transparent mix-blend-screen"
        />

        {/* Aurora Layer 3: Deep Violet / Magenta Core */}
        <motion.div
          animate={{
            x: ["-5%", "15%", "-10%", "-5%"],
            y: ["15%", "-10%", "20%", "15%"],
            scale: [0.9, 1.15, 1, 0.9],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] left-[25%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-r from-violet-600/40 via-fuchsia-600/30 to-indigo-800/20 mix-blend-screen"
        />

        {/* Aurora Layer 4: Subtle Amber / Emerald Warm Accent */}
        <motion.div
          animate={{
            x: ["20%", "-20%", "0%", "20%"],
            y: ["30%", "10%", "-10%", "30%"],
            scale: [1, 1.3, 0.85, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tl from-emerald-500/25 via-sky-600/20 to-transparent mix-blend-screen"
        />
      </div>

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-[#050608]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%,#050608_80%] pointer-events-none" />
    </div>
  );
}
