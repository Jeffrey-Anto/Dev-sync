"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingBlobsBackgroundProps {
  className?: string;
  count?: number;
  interactive?: boolean;
}

export default function FloatingBlobsBackground({
  className = "",
}: FloatingBlobsBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* SVG gooey / displacement filters for organic morphing */}
      <svg className="hidden">
        <defs>
          <filter id="blob-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Blob 1: Cyan Orbiting Morph Blob */}
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 60% 40% / 70% 30% 50% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/5 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-500/25 via-sky-600/15 to-transparent blur-3xl"
      />

      {/* Blob 2: Indigo / Violet Morph Blob */}
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 40% 60% 50%",
            "70% 30% 50% 50% / 30% 70% 40% 60%",
            "50% 60% 30% 60% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 40% 60% 50%",
          ],
          x: [0, -90, 50, 0],
          y: [0, 70, -30, 0],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/4 w-80 h-80 md:w-[420px] md:h-[420px] bg-gradient-to-br from-indigo-600/25 via-purple-600/20 to-transparent blur-3xl"
      />

      {/* Blob 3: Pink / Fuchsia Accent Blob */}
      <motion.div
        animate={{
          borderRadius: [
            "50% 50% 40% 60% / 60% 50% 50% 40%",
            "40% 70% 60% 40% / 50% 40% 60% 50%",
            "50% 50% 40% 60% / 60% 50% 50% 40%",
          ],
          x: [0, 40, -60, 0],
          y: [0, 40, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-fuchsia-600/20 via-rose-500/10 to-transparent blur-3xl"
      />

      {/* Subtle Dev Grid & Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
    </div>
  );
}
