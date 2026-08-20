"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  Smartphone,
  Signal,
  Wifi,
  Battery,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Play,
} from "lucide-react";

// =========================================================================
// 1. HIGH-FIDELITY VECTOR ANDROID LOGO & SCREEN CONTENT
// =========================================================================
export function AndroidLogoScreen({ isLandscape = false }: { isLandscape?: boolean }) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#05080f] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Dynamic Cyber Circuit Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#3ddc84_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a121e]/80 via-transparent to-[#05080f] pointer-events-none" />

      {/* Ambient Android Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3ddc84]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Top Status Bar */}
      <div className="relative z-10 px-5 pt-3 flex items-center justify-between text-[10px] font-mono text-emerald-400/90">
        <span className="font-semibold tracking-wider">09:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
            5G+
          </span>
          <Signal className="w-3 h-3 text-emerald-400" />
          <Wifi className="w-3 h-3 text-emerald-400" />
          <div className="flex items-center gap-0.5">
            <span className="text-[9px]">100%</span>
            <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
          </div>
        </div>
      </div>

      {/* Central Android Mascot & Branding */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center px-4 text-center">
        {/* Glowing Android Robot Mascot SVG */}
        <div className="relative mb-4 group cursor-pointer">
          {/* Subtle Outer Shockwave Ring */}
          <motion.div
            key={pulseKey}
            initial={{ scale: 0.85, opacity: 0.8 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-emerald-400/60 pointer-events-none"
          />

          <svg
            viewBox="0 0 160 140"
            className="w-28 h-24 sm:w-36 sm:h-30 drop-shadow-[0_0_25px_rgba(61,220,132,0.65)] filter"
          >
            <defs>
              <linearGradient id="androidGreenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#46F094" />
                <stop offset="60%" stopColor="#3DDC84" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="eyeGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>

            {/* Antennas */}
            <line
              x1="58"
              y1="32"
              x2="46"
              y2="14"
              stroke="url(#androidGreenGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <line
              x1="102"
              y1="32"
              x2="114"
              y2="14"
              stroke="url(#androidGreenGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Android Head (Half Dome) */}
            <path
              d="M 44 48 A 36 36 0 0 1 116 48 Z"
              fill="url(#androidGreenGrad)"
            />

            {/* Glowing Eyes with subtle blink animation */}
            <circle cx="62" cy="38" r="3.8" fill="url(#eyeGlow)">
              <animate
                attributeName="opacity"
                values="1;1;0.2;1;1"
                keyTimes="0;0.92;0.95;0.98;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="98" cy="38" r="3.8" fill="url(#eyeGlow)">
              <animate
                attributeName="opacity"
                values="1;1;0.2;1;1"
                keyTimes="0;0.92;0.95;0.98;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Torso / Body */}
            <rect
              x="44"
              y="53"
              width="72"
              height="50"
              rx="6"
              fill="url(#androidGreenGrad)"
            />

            {/* Left Arm */}
            <rect
              x="28"
              y="53"
              width="11"
              height="40"
              rx="5.5"
              fill="url(#androidGreenGrad)"
            />

            {/* Right Arm */}
            <rect
              x="121"
              y="53"
              width="11"
              height="40"
              rx="5.5"
              fill="url(#androidGreenGrad)"
            />

            {/* Left Leg */}
            <rect
              x="58"
              y="107"
              width="11"
              height="24"
              rx="5.5"
              fill="url(#androidGreenGrad)"
            />

            {/* Right Leg */}
            <rect
              x="91"
              y="107"
              width="11"
              height="24"
              rx="5.5"
              fill="url(#androidGreenGrad)"
            />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-white flex items-center justify-center gap-1.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span className="text-[#3ddc84] lowercase font-mono">android</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OS 15
            </span>
          </h2>
          <p className="text-[11px] font-mono text-emerald-400/80 tracking-widest uppercase">
            DevSync Mobile Runtime
          </p>
        </div>

        {/* High-tech Audio/Data Equalizer Wave */}
        <div className="flex items-center gap-1 my-3.5">
          {[35, 75, 45, 95, 60, 85, 40, 100, 70, 50, 90, 30].map((h, i) => (
            <motion.div
              key={i}
              animate={{
                height: [
                  `${h * 0.2}px`,
                  `${h * 0.35}px`,
                  `${h * 0.15}px`,
                  `${h * 0.3}px`,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2 + (i % 4) * 0.2,
                ease: "easeInOut",
              }}
              className="w-1 bg-gradient-to-t from-emerald-500 to-[#3ddc84] rounded-full shadow-[0_0_8px_rgba(61,220,132,0.4)]"
            />
          ))}
        </div>

        {/* Live Kernel Specs Badge */}
        <div className="w-full max-w-[260px] bg-slate-900/80 border border-emerald-500/25 rounded-xl p-2.5 backdrop-blur-md text-left font-mono text-[10px] space-y-1">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <Cpu className="w-3 h-3 text-[#3ddc84]" /> ARCH:
            </span>
            <span className="text-slate-200 font-bold">ARM64-v8a Turbo</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3 text-[#3ddc84]" /> FRAME RATE:
            </span>
            <span className="text-emerald-400 font-bold">60.0 FPS LOCKED</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <Layers className="w-3 h-3 text-[#3ddc84]" /> BRIDGE:
            </span>
            <span className="text-cyan-300 font-bold">JSI + Native Modules</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Pill */}
      <div className="relative z-10 pb-3 pt-1 flex flex-col items-center">
        <div className="w-24 h-1.2 bg-emerald-400/40 rounded-full shadow-[0_0_8px_rgba(61,220,132,0.5)]" />
      </div>
    </div>
  );
}

// =========================================================================
// 2. REALISTIC PHYSICAL PHONE CHASSIS WRAPPER
// =========================================================================
interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  is3dActive?: boolean;
}

export function PhoneFrame({ children, className = "", is3dActive = false }: PhoneFrameProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3dActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: (-y / rect.height) * 14,
      rotateY: (x / rect.width) * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: is3dActive
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transition: "transform 0.18s ease-out",
      }}
      className={`relative w-[340px] sm:w-[360px] h-[680px] sm:h-[720px] rounded-[52px] p-3 bg-gradient-to-b from-[#2b3346] via-[#151922] to-[#0c0f17] shadow-[0_25px_80px_rgba(0,0,0,0.85),_0_0_60px_rgba(61,220,132,0.22)] border-2 border-slate-700/60 ${className}`}
    >
      {/* Outer Metallic Edge Highlight */}
      <div className="absolute inset-0 rounded-[50px] border border-white/15 pointer-events-none" />

      {/* Side Hardware Buttons */}
      {/* Volume Up */}
      <div className="absolute -left-[5px] top-28 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
      {/* Volume Down */}
      <div className="absolute -left-[5px] top-44 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
      {/* Power Button */}
      <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-slate-600 rounded-r-sm" />

      {/* Inner Screen Bezel */}
      <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black border border-slate-800 flex flex-col">
        {/* Front Camera Punch Hole */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#050608] border border-slate-800/80 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-[#121c2e]" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="w-full h-full overflow-hidden">{children}</div>

        {/* Glass Glare Reflection Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-transparent pointer-events-none rounded-[42px]" />
      </div>
    </div>
  );
}

// =========================================================================
// 3. FULLSCREEN LANDSCAPE TO PORTRAIT ZOOM & ROTATE ORCHESTRATOR
// =========================================================================
interface MobileDevCinematicIntroProps {
  onComplete?: () => void;
  replayTrigger?: number;
}

export default function MobileDevCinematicIntro({ onComplete, replayTrigger = 0 }: MobileDevCinematicIntroProps) {
  const [stage, setStage] = useState<"cover" | "animating" | "settled">("cover");
  const [coverScale, setCoverScale] = useState(3.4);
  const [localReplayCount, setLocalReplayCount] = useState(0);

  // Compute exact scale needed for landscape phone (720px wide, 360px high visually)
  // to completely cover 100vw x 100vh with margin
  useEffect(() => {
    const computeCoverScale = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1440;
      const h = typeof window !== "undefined" ? window.innerHeight : 900;
      // When phone is 360px wide and 720px tall, rotated 90deg (landscape):
      // visual width is 720px, visual height is 360px.
      const scaleW = (w / 720) * 1.15;
      const scaleH = (h / 360) * 1.15;
      const calculated = Math.max(scaleW, scaleH, 2.8);
      setCoverScale(calculated);
    };

    computeCoverScale();
    window.addEventListener("resize", computeCoverScale);
    return () => window.removeEventListener("resize", computeCoverScale);
  }, []);

  // Sequence launcher
  useEffect(() => {
    setStage("cover");

    // Phase 1: Hold in fullscreen landscape for brief dramatic impact (450ms)
    const t1 = setTimeout(() => {
      setStage("animating");
    }, 450);

    // Phase 2: Complete zoom out & rotation to portrait (2200ms)
    const t2 = setTimeout(() => {
      setStage("settled");
      onComplete?.();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [localReplayCount, replayTrigger, onComplete]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalReplayCount((p) => p + 1);
  };

  const isCoverOrAnimating = stage !== "settled";

  return (
    <>
      {/* ── CINEMATIC FULLSCREEN INTRO OVERLAY ── */}
      <AnimatePresence>
        {isCoverOrAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#04060a]"
          >
            {/* Ambient Background Grid during Intro */}
            <div className="absolute inset-0 bg-[radial-gradient(#3ddc84_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-emerald-950/30 via-transparent to-[#04060a] pointer-events-none" />

            {/* Phone Container: Animated from Landscape Fullscreen to Portrait */}
            <motion.div
              initial={{
                scale: coverScale,
                rotate: -90, // Landscape orientation
                y: 0,
                opacity: 1,
              }}
              animate={
                stage === "animating"
                  ? {
                      scale: 1,
                      rotate: 0, // Portrait orientation
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      scale: coverScale,
                      rotate: -90,
                      y: 0,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 1.65,
                ease: [0.16, 1, 0.3, 1], // Apple-style fluid cinematic curve
              }}
              className="relative flex items-center justify-center"
            >
              <PhoneFrame>
                <AndroidLogoScreen isLandscape={stage === "cover"} />
              </PhoneFrame>
            </motion.div>

            {/* Skip Intro Pill in Top Right */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={() => {
                setStage("settled");
                onComplete?.();
              }}
              className="absolute top-6 right-6 z-50 text-xs font-mono px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 hover:text-white backdrop-blur-md cursor-pointer transition-all shadow-lg"
            >
              Skip Intro ➔
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
