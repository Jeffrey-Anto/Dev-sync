"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface AuroraMeshBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
}

export default function AuroraMeshBackground({
  className = "",
  intensity = "medium",
  interactive = true,
}: AuroraMeshBackgroundProps) {
  // Mouse reactive spring parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 60; // Max 60px offset
      const normY = (e.clientY / innerHeight - 0.5) * 60;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  const opacityMap = {
    subtle: "opacity-40",
    medium: "opacity-65",
    vibrant: "opacity-90",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* High-diffusion organic blur container */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className={`relative w-full h-full filter blur-[70px] md:blur-[110px] transition-opacity duration-1000 ${opacityMap[intensity]}`}
      >
        {/* Aurora Nebula 1: Deep Sapphire & Indigo */}
        <motion.div
          animate={{
            x: ["-5%", "15%", "-10%", "-5%"],
            y: ["-5%", "12%", "-8%", "-5%"],
            scale: [1, 1.2, 0.95, 1],
            rotate: [0, 30, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-indigo-700/40 via-blue-600/30 to-purple-800/20 mix-blend-screen"
        />

        {/* Aurora Nebula 2: Ethereal Ocean Cyan & Sky Blue */}
        <motion.div
          animate={{
            x: ["10%", "-15%", "8%", "10%"],
            y: ["-8%", "15%", "0%", "-8%"],
            scale: [1.1, 0.9, 1.18, 1.1],
            rotate: [0, -45, -90, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[5%] -right-[8%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-bl from-cyan-600/35 via-sky-700/25 to-teal-800/15 mix-blend-screen"
        />

        {/* Aurora Nebula 3: Lavender & Velvet Violet Core */}
        <motion.div
          animate={{
            x: ["-8%", "12%", "-5%", "-8%"],
            y: ["10%", "-10%", "15%", "10%"],
            scale: [0.95, 1.15, 1.0, 0.95],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] left-[25%] w-[48vw] h-[48vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-r from-violet-700/35 via-purple-600/25 to-indigo-900/15 mix-blend-screen"
        />

        {/* Aurora Nebula 4: Soft Warm Amber Glow */}
        <motion.div
          animate={{
            x: ["15%", "-15%", "5%", "15%"],
            y: ["20%", "5%", "-5%", "20%"],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[0%] right-[12%] w-[42vw] h-[42vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-tl from-amber-600/20 via-rose-700/15 to-indigo-900/10 mix-blend-screen"
        />
      </motion.div>

      {/* Subtle Radial Vignette to maintain contrast for white text */}
      <div className="absolute inset-0 bg-[#050608]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(5,6,8,0.75)_90%] pointer-events-none" />
    </div>
  );
}
