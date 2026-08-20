"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation,
  Volume2,
  CreditCard,
  Wifi,
  Signal,
  Battery,
  ArrowUpRight,
  Sparkles,
  Database,
  Radio,
  ShieldCheck,
  Fingerprint,
  Cpu,
  Activity,
  CheckCircle2,
  Layers,
  MapPin,
  Compass,
} from "lucide-react";
import { Project, Domain } from "@/data/domains";
import { PhoneFrame } from "./MobileDevCinematicIntro";

// =========================================================================
// 1. IN-DEVICE MOBILE SCREEN FOR PROJECT 1: FLEETNAV
// =========================================================================
function FleetNavScreen() {
  return (
    <div className="relative w-full h-full bg-[#070b14] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Map Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-cyan-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              OFFLINE GPS
            </span>
            <Signal className="w-2.5 h-2.5 text-cyan-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Turn-by-Turn Instruction Banner */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/80 to-slate-900/90 border border-cyan-500/30 mb-2.5 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-400/40 shrink-0">
              <Navigation className="w-4 h-4 text-cyan-400 rotate-45 animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] text-cyan-300 font-bold truncate">In 250m turn right</p>
              <h5 className="text-[11px] font-black text-white truncate">Lexington Expressway</h5>
            </div>
          </div>
        </div>

        {/* Live Vector Map Simulation Display */}
        <div className="relative h-44 rounded-xl bg-[#040810] border border-cyan-500/20 overflow-hidden p-2 flex flex-col justify-between">
          {/* Map Vector Roads SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 150">
            <path d="M 0 40 Q 60 70 120 40 T 200 60" fill="none" stroke="#1e293b" strokeWidth="12" />
            <path d="M 40 0 Q 70 80 140 150" fill="none" stroke="#1e293b" strokeWidth="14" />
            <path d="M 160 0 L 140 150" fill="none" stroke="#1e293b" strokeWidth="10" />

            {/* Glowing Active Route Navigation Line */}
            <path
              d="M 20 40 Q 70 70 110 90 T 170 130"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeDasharray="6 3"
              className="animate-pulse"
            />

            {/* User GPS Location Marker */}
            <circle cx="70" cy="70" r="6" fill="#00E5FF" />
            <circle cx="70" cy="70" r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Destination Pin */}
            <circle cx="170" cy="130" r="5" fill="#EF4444" />
          </svg>

          {/* Top Map Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/70 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
              <Database className="w-2.5 h-2.5" /> 100% Vector Tiles Cached
            </span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              60 FPS
            </span>
          </div>

          {/* Bottom Route Metrics inside Map */}
          <div className="relative z-10 p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-slate-400 block text-[7px]">REMAINING</span>
              <span className="text-white font-bold">14.2 km · 22 min</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[7px]">RE-ROUTING</span>
              <span className="text-cyan-400 font-bold">Dijkstra Local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom P2P Bluetooth Mesh Sync Status */}
      <div className="space-y-1.5 mt-2">
        <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[9px]">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-200">P2P Bluetooth Sync</span>
          </div>
          <span className="text-emerald-400 font-bold">● Active</span>
        </div>
        <div className="w-20 h-1 bg-cyan-400/40 rounded-full mx-auto" />
      </div>
    </div>
  );
}

// =========================================================================
// 2. IN-DEVICE MOBILE SCREEN FOR PROJECT 2: CINESYNC
// =========================================================================
function CineSyncScreen() {
  return (
    <div className="relative w-full h-full bg-[#08060f] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-pink-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1 py-0.2 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
              12ms LATENCY
            </span>
            <Wifi className="w-2.5 h-2.5 text-pink-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Studio App Header */}
        <div className="p-2 rounded-xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-400/30">
              <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white leading-tight">CineSync Monitor</h5>
              <p className="text-[7px] text-pink-400">48kHz 24-bit PCM Stream</p>
            </div>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            LIVE
          </span>
        </div>

        {/* Real-time Oscilloscope Waveform Display */}
        <div className="relative h-20 rounded-xl bg-black/80 border border-pink-500/20 overflow-hidden p-2 flex flex-col justify-between mb-2.5">
          <div className="flex items-center justify-between text-[7px] text-slate-400 z-10">
            <span>MASTER STEREO BUS</span>
            <span className="text-pink-400 font-bold">0.0 dB CLIP GUARD</span>
          </div>

          {/* Animated Waveform Oscilloscope */}
          <div className="flex items-center justify-center gap-0.5 h-10 my-auto">
            {[45, 80, 30, 95, 60, 100, 75, 40, 90, 65, 85, 30, 95, 70, 50, 90, 40, 80].map(
              (val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    height: [
                      `${val * 0.2}px`,
                      `${val * 0.4}px`,
                      `${val * 0.15}px`,
                      `${val * 0.35}px`,
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9 + (idx % 3) * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-gradient-to-t from-pink-500 via-purple-400 to-cyan-300 rounded-full"
                />
              )
            )}
          </div>
        </div>

        {/* 4 Multi-Channel VU Faders */}
        <div className="space-y-1.5">
          {[
            { name: "CH 1: BOOM MIC", level: "92%", color: "from-pink-500 to-emerald-400" },
            { name: "CH 2: LAV 01 (LEAD)", level: "76%", color: "from-pink-500 to-amber-400" },
            { name: "CH 3: LAV 02 (SEC)", level: "64%", color: "from-pink-500 to-cyan-400" },
            { name: "CH 4: FOLEY AMBIENT", level: "48%", color: "from-pink-500 to-purple-400" },
          ].map((channel, idx) => (
            <div
              key={idx}
              className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-[8px]"
            >
              <span className="text-slate-300 font-bold">{channel.name}</span>
              <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: [channel.level, "40%", channel.level, "85%"] }}
                  transition={{ repeat: Infinity, duration: 1.8 + idx * 0.3, ease: "easeInOut" }}
                  className={`h-full bg-gradient-to-r ${channel.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom AudioUnit DMA Hardware Status */}
      <div className="space-y-1.5 mt-2">
        <div className="p-1.5 rounded-xl bg-pink-950/30 border border-pink-500/20 flex items-center justify-between text-[8px]">
          <span className="text-slate-300">C++ JSI Bridge DMA</span>
          <span className="text-emerald-400 font-bold">0 Dropouts</span>
        </div>
        <div className="w-20 h-1 bg-pink-400/40 rounded-full mx-auto" />
      </div>
    </div>
  );
}

// =========================================================================
// 3. IN-DEVICE MOBILE SCREEN FOR PROJECT 3: PULSEPAY
// =========================================================================
function PulsePayScreen() {
  return (
    <div className="relative w-full h-full bg-[#050907] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-emerald-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              NFC READY
            </span>
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Merchant POS Header */}
        <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white">PulsePay Terminal</h5>
              <p className="text-[7px] text-emerald-400">Offline Attestation Enclave</p>
            </div>
          </div>
          <span className="text-[8px] font-bold text-slate-300">#POS-409</span>
        </div>

        {/* Amount Card */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-black border border-emerald-500/30 text-center my-2 shadow-lg">
          <span className="text-[8px] text-slate-400 uppercase tracking-widest block mb-0.5">
            AMOUNT TO AUTHORIZE
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight text-emerald-300">
            $42.50 <span className="text-xs font-normal text-slate-400">USD</span>
          </h3>
          <p className="text-[8px] text-emerald-400/80 mt-1">● Encrypted ECDSA Attestation Ready</p>
        </div>

        {/* Biometric Laser Fingerprint Scanner Mockup */}
        <div className="relative p-4 rounded-2xl bg-black/70 border border-emerald-500/25 flex flex-col items-center justify-center overflow-hidden">
          {/* Animated Biometric Fingerprint */}
          <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mb-2">
            <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" />
            <Fingerprint className="w-9 h-9 text-emerald-400 drop-shadow-[0_0_12px_#10b981]" />

            {/* Glowing Laser Scan Bar */}
            <motion.div
              animate={{ y: [-24, 24, -24] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#34d399]"
            />
          </div>

          <p className="text-[9px] font-bold text-white tracking-wide">HOLD PHONE / NFC TAP</p>
          <span className="text-[7px] text-slate-400">Level 4 TEE Hardware Keystore</span>
        </div>
      </div>

      {/* Bottom Secure Settlement Status */}
      <div className="space-y-1.5 mt-2">
        <div className="p-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between text-[8px]">
          <span className="text-slate-300 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Fraud Risk: 0.0%
          </span>
          <span className="text-emerald-300 font-bold">&lt; 250ms Signed</span>
        </div>
        <div className="w-20 h-1 bg-emerald-400/40 rounded-full mx-auto" />
      </div>
    </div>
  );
}

// =========================================================================
// 4. MAIN STICKY CENTER-PINNED MOBILE PROJECT SHOWCASE
// =========================================================================
interface MobileStickyProjectShowcaseProps {
  projects: Project[];
  domain: Domain;
  onSelectProject: (project: Project) => void;
}

export default function MobileStickyProjectShowcase({
  projects,
  domain,
  onSelectProject,
}: MobileStickyProjectShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll tracking to detect which card is centered in viewport
  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight * 0.45;

      let closestIdx = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenterY - centerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveProjectIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects]);

  const activeProject = projects[activeProjectIndex] || projects[0];

  // Render correct in-device screen
  const renderPhoneScreen = () => {
    if (activeProjectIndex === 0) return <FleetNavScreen key="fleetnav" />;
    if (activeProjectIndex === 1) return <CineSyncScreen key="cinesync" />;
    if (activeProjectIndex === 2) return <PulsePayScreen key="pulsepay" />;
    return <FleetNavScreen key="default" />;
  };

  return (
    <div className="relative w-full my-6">
      {/* ── Top Interactive Tabs Switcher ── */}
      <div className="flex items-center justify-center gap-2.5 mb-10 flex-wrap">
        {projects.map((proj, idx) => {
          const isSelected = activeProjectIndex === idx;

          return (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                isSelected
                  ? "bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105"
                  : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? "bg-black animate-ping" : "bg-slate-500"
                }`}
              />
              <span>{proj.title.split(" ")[0]} App</span>
            </button>
          );
        })}
      </div>

      {/* ── Sticky Center Showcase: Cards on Left + Sticky Centered Mobile on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        {/* LEFT COLUMN: Project Content Cards that scroll past */}
        <div className="lg:col-span-7 space-y-16 pb-24">
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => setActiveProjectIndex(idx)}
                className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_20px_60px_rgba(245,158,11,0.22)] scale-[1.02]"
                    : "bg-[#0b0e18]/60 border-white/10 hover:border-white/20 opacity-50 hover:opacity-85"
                }`}
              >
                {/* Card Top Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isActive ? "bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                      PROJECT ARTIFACT #{idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all ${
                      isActive
                        ? "bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {isActive ? "● LIVE IN CENTER PHONE" : "TAP TO PREVIEW"}
                  </span>
                </div>

                {/* Title & One-Liner */}
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-normal mb-6">
                  {project.oneLiner}
                </p>

                {/* Verified Architecture Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs mb-6">
                  {project.metrics?.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="text-slate-400 text-[10px] block truncate mb-0.5">
                        {metric.label}
                      </span>
                      <span className="text-amber-300 font-bold text-base block truncate">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Problem vs Solution Callouts */}
                <div className="space-y-3.5 p-5 rounded-2xl bg-black/50 border border-white/5 font-sans text-xs sm:text-sm text-slate-300 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      PROBLEM
                    </span>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      SOLUTION
                    </span>
                    <p className="leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Architecture Highlights Pill List */}
                {project.architectureHighlights && (
                  <div className="mb-6 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      CORE ARCHITECTURE HIGHLIGHTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.architectureHighlights.map((hl, hIdx) => (
                        <span
                          key={hIdx}
                          className="text-[11px] font-mono px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-200 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Tags & CTA Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Stationary Pinned Sticky Mobile Phone that stays in place during scroll */}
        <div className="lg:col-span-5 sticky top-24 z-20 flex flex-col items-center justify-center pt-2">
          {/* Active Screen Tag */}
          <div className="mb-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-2xl backdrop-blur-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>
              DISPLAYING: <strong>{activeProject.title.split(" ")[0]} UI</strong>
            </span>
          </div>

          {/* Stationary Phone Chassis */}
          <div className="relative group shadow-[0_30px_100px_rgba(245,158,11,0.28)]">
            <PhoneFrame is3dActive={true} className="!w-[300px] sm:!w-[330px] !h-[590px] sm:!h-[630px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIndex}
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  {renderPhoneScreen()}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>

          <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
            ✦ Mobile stays pinned at center as cards scroll beside it
          </p>
        </div>
      </div>
    </div>
  );
}
