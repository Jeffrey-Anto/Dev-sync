"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingBlobsBackgroundProps {
  className?: string;
  interactive?: boolean;
  opacity?: number;
}

export default function FloatingBlobsBackground({
  className = "",
  opacity = 0.7,
}: FloatingBlobsBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Orb 1: Sapphire & Sky Drifter */}
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 60% 40% / 70% 30% 50% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
          x: [0, 60, -30, 0],
          y: [0, -50, 30, 0],
          rotate: [0, 60, 120, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] left-[15%] w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-sky-600/20 via-indigo-600/15 to-transparent blur-2xl"
      />

      {/* Orb 2: Lavender & Velvet Violet Drifter */}
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 40% 60% 50%",
            "70% 30% 50% 50% / 30% 70% 40% 60%",
            "50% 60% 30% 60% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 40% 60% 50%",
          ],
          x: [0, -70, 40, 0],
          y: [0, 60, -25, 0],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[45%] right-[18%] w-80 h-80 md:w-[400px] md:h-[400px] bg-gradient-to-br from-indigo-700/20 via-purple-700/15 to-transparent blur-3xl"
      />

      {/* Orb 3: Soft Amber & Warm Horizon Drifter */}
      <motion.div
        animate={{
          borderRadius: [
            "50% 50% 40% 60% / 60% 50% 50% 40%",
            "40% 70% 60% 40% / 50% 40% 60% 50%",
            "50% 50% 40% 60% / 60% 50% 50% 40%",
          ],
          x: [0, 35, -45, 0],
          y: [0, 35, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[28%] w-60 h-60 md:w-72 md:h-72 bg-gradient-to-r from-amber-600/15 via-rose-600/10 to-transparent blur-2xl"
      />
    </div>
  );
}
