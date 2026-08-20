"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UiUxTheme() {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#f8faf9] select-none">
      {/* 1. CODE TEXT REPEATING BACKGROUND STREAM (Fizzbuzz texture like bryantcodes.art) */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none font-mono text-[11px] leading-relaxed text-slate-800 break-words whitespace-pre-wrap -rotate-6 scale-110 overflow-hidden">
        {Array.from({ length: 40 })
          .map(
            () =>
              `return (i%3===0 && i%5===0) ? "fizzbuzz" : i%3===0 ? "fizz" : i%5===0 ? "buzz" : i; // TurboEngine <CanvasGL> return "nice"; if(185===0) return "fizzbuzz"; `
          )
          .join(" ")}
      </div>

      {/* 2. HAND-DRAWN NEON GREEN MARKER SCRIBBLES (Exact match from screenshot) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top left bold highlighter scribble */}
        <path
          d="M -50 120 Q 80 40 220 160 T 360 80 Q 280 260 140 320 T -20 200 Z"
          fill="#00FF2A"
          opacity="0.9"
        />
        {/* Top center zigzag scribble */}
        <path
          d="M 380 40 L 490 20 L 530 180 L 620 60 L 710 200 L 780 40 L 680 240 Z"
          fill="#00FF2A"
          opacity="0.9"
        />
        {/* Right side large dynamic marker sweep */}
        <path
          d="M 850 -20 Q 980 180 1150 120 T 1380 320 Q 1200 480 980 380 T 820 180 Z"
          fill="#00FF2A"
          opacity="0.9"
        />
        {/* Bottom right marker splash */}
        <path
          d="M 750 520 Q 920 420 1120 580 T 1320 680 Q 1100 840 900 740 Z"
          fill="#00FF2A"
          opacity="0.9"
        />
        {/* Bottom left green sweep */}
        <path
          d="M -40 500 Q 120 420 280 620 T 420 780 Q 220 860 80 720 Z"
          fill="#00FF2A"
          opacity="0.85"
        />

        {/* CYAN DOODLE SWIRLS / WIRE SQUIGGLES (Behind computer & mug) */}
        <g stroke="#00E5FF" strokeWidth="4" fill="none" opacity="0.8">
          <path d="M 450 320 C 380 420, 680 500, 620 380 C 580 280, 420 240, 500 420 C 540 490, 720 440, 680 320" />
          <path d="M 820 440 C 760 560, 1020 640, 980 480 C 940 380, 800 360, 880 520 C 920 600, 1060 540, 1020 440" />
          <path d="M 180 220 C 120 300, 320 380, 290 280 C 260 200, 160 180, 220 300" />
        </g>
      </svg>

      {/* 3. CENTER / HERO: HAND-DRAWN YELLOW RETRO LAPTOP (Exact match to screenshot!) */}
      <motion.div
        animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="absolute top-20 sm:top-24 lg:top-28 left-4 sm:left-12 lg:left-16 w-56 sm:w-72 md:w-80 pointer-events-auto cursor-pointer drop-shadow-2xl opacity-60 lg:opacity-80"
        onClick={() => setIsPoweredOn(!isPoweredOn)}
      >
        <div className="relative">
          {/* Yellow Outer Chunky Chassis SVG */}
          <svg viewBox="0 0 420 380" className="w-full h-auto">
            {/* Wobbly Pink Background Outline Offset */}
            <path
              d="M 70 30 C 180 15, 260 15, 360 32 C 375 140, 385 200, 395 270 C 360 350, 240 365, 80 350 C 65 260, 55 180, 70 30 Z"
              fill="none"
              stroke="#FF00AA"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Chunky Yellow Body */}
            <path
              d="M 76 36 C 180 22, 255 22, 354 38 C 368 140, 378 198, 386 265 C 352 342, 240 355, 88 342 C 74 258, 64 178, 76 36 Z"
              fill="#FFE600"
              stroke="#FF00AA"
              strokeWidth="4"
            />

            {/* Inner Monitor Bezel */}
            <path
              d="M 108 55 C 190 46, 250 46, 330 58 C 338 135, 344 175, 350 215 C 310 225, 210 225, 100 215 C 102 170, 105 130, 108 55 Z"
              fill="#FF00AA"
            />

            {/* Screen Inner Display Area — White Background */}
            <path
              d="M 114 62 C 190 54, 248 54, 324 64 C 331 132, 337 170, 342 208 C 305 217, 212 217, 108 208 C 110 166, 112 128, 114 62 Z"
              fill={isPoweredOn ? "#F0FDF4" : "#FFFFFF"}
              stroke="#000000"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />

            {/* Wobbly Keyboard Section with Pink Squiggly Keys (from screenshot) */}
            <g stroke="#FF00AA" strokeWidth="4" fill="none" strokeLinecap="round">
              {/* Keyboard Outer Well */}
              <path d="M 98 250 C 200 240, 270 240, 370 250 C 360 325, 260 335, 105 325 Z" />
              {/* Squiggly Key Rows (Hand-drawn curves) */}
              <path d="M 108 265 C 120 280, 130 255, 145 270 C 160 285, 175 255, 190 270 C 205 285, 220 255, 235 270 C 250 285, 265 255, 280 270 C 295 285, 310 255, 325 270 C 340 285, 350 260, 360 268" />
              <path d="M 112 295 C 125 315, 140 285, 155 305 C 170 320, 185 285, 200 305 C 215 320, 230 285, 245 305 C 260 320, 275 285, 290 305 C 305 320, 320 285, 335 305 C 345 318, 352 292, 358 298" />
            </g>
          </svg>

          {/* Screen Content Overlay */}
          <div className="absolute top-[17%] left-[29%] w-[51%] h-[38%] flex flex-col justify-center items-center text-center p-2">
            {!isPoweredOn ? (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="font-mono font-bold text-xs sm:text-sm text-black tracking-wide"
              >
                <span className="font-extrabold text-black block">Click to start</span>
                <span className="block text-[9px] text-pink-600 mt-1 font-bold animate-pulse">
                  ⚡ TAP COMPUTER
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-left font-mono text-black text-[9px] sm:text-[11px] leading-tight space-y-1 w-full"
              >
                <p className="font-black text-indigo-700">COLLECTIVE.CS</p>
                <p className="text-black font-bold">UI/UX Design</p>
                <div className="mt-1 px-1.5 py-0.5 border border-black text-center text-[8px] sm:text-[9px] bg-black text-white hover:bg-transparent hover:text-black transition-colors uppercase font-bold">
                  ABOUT_UI_UX
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 4. TOP RIGHT: HAND-DRAWN PINK NOTEBOOK ("BLOG COMING SOON" / DESIGN NOTES) */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [2, 0, 2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-12 right-6 sm:right-24 w-44 sm:w-56 pointer-events-auto cursor-pointer drop-shadow-xl"
      >
        <svg viewBox="0 0 200 220" className="w-full h-auto">
          {/* Pink Notebook Body */}
          <path
            d="M 40 20 C 90 15, 140 15, 185 22 C 188 80, 192 140, 186 200 C 140 205, 90 205, 38 198 C 36 140, 34 80, 40 20 Z"
            fill="#FF00AA"
            stroke="#000000"
            strokeWidth="3.5"
          />
          {/* Black Spiral Rings on Left */}
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M 25 ${35 + i * 18} Q 42 ${32 + i * 18} 45 ${38 + i * 18} Q 42 ${44 + i * 18} 25 ${41 + i * 18}`}
              fill="none"
              stroke="#000000"
              strokeWidth="3"
            />
          ))}
          {/* Notebook Text */}
          <text
            x="115"
            y="90"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="17"
            fill="#000000"
          >
            DESIGN
          </text>
          <text
            x="115"
            y="115"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="17"
            fill="#000000"
          >
            SYSTEM
          </text>
          <text
            x="115"
            y="145"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="17"
            fill="#000000"
          >
            TOKENS
          </text>
        </svg>
      </motion.div>

    </div>
  );
}
