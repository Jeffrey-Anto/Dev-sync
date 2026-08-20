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
  RotateCcw,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project, Domain } from "@/data/domains";
import { PhoneFrame } from "./MobileDevCinematicIntro";

// =========================================================================
// 1. IN-DEVICE MOBILE SCREEN FOR PROJECT 1: FLEETNAV
// =========================================================================
function FleetNavScreen() {
  const [rerouting, setRerouting] = useState(false);
  const [rerouteCount, setRerouteCount] = useState(0);

  const handleRecalculate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRerouting(true);
    setTimeout(() => {
      setRerouting(false);
      setRerouteCount((c) => c + 1);
    }, 750);
  };

  return (
    <div className="relative w-full h-full bg-[#070b14] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Map Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-cyan-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              OFFLINE GPS
            </span>
            <Signal className="w-2.5 h-2.5 text-cyan-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Turn-by-Turn Instruction Banner */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/90 to-slate-900/90 border border-cyan-500/30 mb-2 shadow-md">
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
              d={
                rerouteCount % 2 === 0
                  ? "M 20 40 Q 70 70 110 90 T 170 130"
                  : "M 20 40 Q 40 100 100 120 T 170 130"
              }
              fill="none"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeDasharray="6 3"
              className="animate-pulse"
            />

            {/* User GPS Location Marker */}
            <circle cx={rerouteCount % 2 === 0 ? "70" : "40"} cy={rerouteCount % 2 === 0 ? "70" : "100"} r="6" fill="#00E5FF" />
            <circle cx={rerouteCount % 2 === 0 ? "70" : "40"} cy={rerouteCount % 2 === 0 ? "70" : "100"} r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Destination Pin */}
            <circle cx="170" cy="130" r="5" fill="#EF4444" />
          </svg>

          {/* Top Map Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/80 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
              <Database className="w-2.5 h-2.5" /> 100% Tiles Cached
            </span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              60 FPS
            </span>
          </div>

          {/* Bottom Route Metrics inside Map */}
          <div className="relative z-10 p-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-slate-400 block text-[7px]">REMAINING</span>
              <span className="text-white font-bold">{rerouteCount % 2 === 0 ? "14.2 km · 22 min" : "13.8 km · 20 min"}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[7px]">ENGINE</span>
              <span className="text-cyan-400 font-bold">
                {rerouting ? "Recalculating..." : "Dijkstra Local (<1.2ms)"}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Simulation Button */}
        <button
          onClick={handleRecalculate}
          className="w-full mt-2 py-1.5 px-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[9px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className={`w-3 h-3 ${rerouting ? "animate-spin text-white" : ""}`} />
          <span>{rerouting ? "Evaluating Route Graph..." : "Simulate Offline Reroute"}</span>
        </button>
      </div>

      {/* Bottom P2P Bluetooth Mesh Sync Status */}
      <div className="space-y-1.5 mt-2">
        <div className="p-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[8px]">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-200">P2P Bluetooth Mesh Sync</span>
          </div>
          <span className="text-emerald-400 font-bold">● Active (4 Peers)</span>
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
  const [mutedChannel, setMutedChannel] = useState<number | null>(null);

  const toggleMute = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedChannel(mutedChannel === idx ? null : idx);
  };

  return (
    <div className="relative w-full h-full bg-[#08060f] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-pink-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
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
              <h5 className="text-[10px] font-bold text-white leading-tight">CineSync Studio</h5>
              <p className="text-[7px] text-pink-400">48kHz 24-bit PCM Stream</p>
            </div>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            LIVE
          </span>
        </div>

        {/* Real-time Oscilloscope Waveform Display */}
        <div className="relative h-20 rounded-xl bg-black/80 border border-pink-500/20 overflow-hidden p-2 flex flex-col justify-between mb-2">
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
          ].map((channel, idx) => {
            const isMuted = mutedChannel === idx;
            return (
              <div
                key={idx}
                onClick={(e) => toggleMute(idx, e)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-[8px] ${
                  isMuted
                    ? "bg-red-950/20 border-red-500/30 opacity-60"
                    : "bg-white/[0.03] border-white/5 hover:border-pink-500/30"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isMuted ? (
                    <VolumeX className="w-2.5 h-2.5 text-red-400" />
                  ) : (
                    <Volume2 className="w-2.5 h-2.5 text-pink-400" />
                  )}
                  <span className="text-slate-300 font-bold truncate max-w-[85px]">{channel.name}</span>
                </div>
                <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    animate={
                      isMuted
                        ? { width: "0%" }
                        : { width: [channel.level, "40%", channel.level, "85%"] }
                    }
                    transition={{ repeat: Infinity, duration: 1.8 + idx * 0.3, ease: "easeInOut" }}
                    className={`h-full bg-gradient-to-r ${channel.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom AudioUnit DMA Hardware Status */}
      <div className="space-y-1.5 mt-2">
        <div className="p-1.5 rounded-xl bg-pink-950/30 border border-pink-500/20 flex items-center justify-between text-[8px]">
          <span className="text-slate-300">C++ JSI Bridge DMA</span>
          <span className="text-emerald-400 font-bold">0 Dropouts (48kHz)</span>
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
  const [authStatus, setAuthStatus] = useState<"idle" | "verifying" | "authorized">("idle");

  const handleFingerprintTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (authStatus === "verifying") return;

    setAuthStatus("verifying");
    setTimeout(() => {
      setAuthStatus("authorized");
      setTimeout(() => {
        setAuthStatus("idle");
      }, 2500);
    }, 900);
  };

  return (
    <div className="relative w-full h-full bg-[#050907] text-slate-100 p-3 pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div>
        <div className="flex items-center justify-between text-[9px] text-emerald-300/80 mb-2 px-1">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              NFC READY
            </span>
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Merchant POS Header */}
        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white">PulsePay POS</h5>
              <p className="text-[7px] text-emerald-400">Offline Attestation Enclave</p>
            </div>
          </div>
          <span className="text-[8px] font-bold text-slate-300">#POS-409</span>
        </div>

        {/* Amount Card */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-black border border-emerald-500/30 text-center my-1.5 shadow-lg">
          <span className="text-[7px] text-slate-400 uppercase tracking-widest block mb-0.5">
            AMOUNT TO AUTHORIZE
          </span>
          <h3 className="text-xl font-black text-white tracking-tight text-emerald-300">
            $42.50 <span className="text-[10px] font-normal text-slate-400">USD</span>
          </h3>
          <p className="text-[7px] text-emerald-400/80 mt-0.5">● Encrypted ECDSA Attestation Ready</p>
        </div>

        {/* Biometric Laser Fingerprint Scanner Mockup */}
        <div
          onClick={handleFingerprintTap}
          className="relative p-3 rounded-2xl bg-black/70 border border-emerald-500/25 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-400/60 transition-all group"
        >
          {/* Animated Biometric Fingerprint */}
          <div className="relative w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" />
            <Fingerprint
              className={`w-8 h-8 transition-colors ${
                authStatus === "authorized"
                  ? "text-emerald-300 drop-shadow-[0_0_16px_#34d399]"
                  : authStatus === "verifying"
                  ? "text-amber-300 animate-pulse"
                  : "text-emerald-400 drop-shadow-[0_0_12px_#10b981]"
              }`}
            />

            {/* Glowing Laser Scan Bar */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#34d399]"
            />
          </div>

          <p className="text-[8px] font-bold text-white tracking-wide">
            {authStatus === "authorized" ? (
              <span className="text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> PAYMENT AUTHORIZED
              </span>
            ) : authStatus === "verifying" ? (
              <span className="text-amber-300 animate-pulse">VERIFYING ECDSA KEY...</span>
            ) : (
              "TAP FINGERPRINT TO AUTHENTICATE"
            )}
          </p>
          <span className="text-[6px] text-slate-400">Level 4 TEE Hardware Keystore</span>
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
      const centerY = window.innerHeight * 0.5;

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

  const handleTabClick = (index: number) => {
    setActiveProjectIndex(index);
    const target = cardRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Render correct in-device screen
  const renderPhoneScreen = () => {
    if (activeProjectIndex === 0) return <FleetNavScreen key="fleetnav" />;
    if (activeProjectIndex === 1) return <CineSyncScreen key="cinesync" />;
    if (activeProjectIndex === 2) return <PulsePayScreen key="pulsepay" />;
    return <FleetNavScreen key="default" />;
  };

  // Color theme mapping per project index for glowing dynamic aura
  const projectGlowStyles = [
    "from-cyan-500/25 via-blue-500/10 to-transparent shadow-[0_0_90px_rgba(0,229,255,0.25)]",
    "from-pink-500/25 via-purple-500/10 to-transparent shadow-[0_0_90px_rgba(236,72,153,0.25)]",
    "from-emerald-500/25 via-teal-500/10 to-transparent shadow-[0_0_90px_rgba(16,185,129,0.25)]",
  ];

  return (
    <div className="relative w-full my-4">
      {/* ── Top Interactive Tabs Switcher ── */}
      <div className="sticky top-16 z-30 flex items-center justify-center gap-2.5 py-3 mb-6 flex-wrap backdrop-blur-md bg-[#030504]/80 rounded-2xl border border-white/10 px-4 shadow-xl">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1 hidden sm:inline">
          SELECT SYSTEM:
        </span>
        {projects.map((proj, idx) => {
          const isSelected = activeProjectIndex === idx;

          return (
            <button
              key={proj.id}
              onClick={() => handleTabClick(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
                isSelected
                  ? "bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.45)] scale-105"
                  : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? "bg-black animate-ping" : "bg-slate-500"
                }`}
              />
              <span>{`0${idx + 1} · ${proj.title.split(" ")[0]}`}</span>
            </button>
          );
        })}
      </div>

      {/* ── DESKTOP 3-COLUMN CENTER-STAGE SHOWCASE (Left Overview + Center Sticky Phone + Right Metrics) ── */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start relative">
        {/* LEFT COLUMN (4 cols): Project Overview, Problem & Solution cards */}
        <div className="col-span-4 space-y-24 py-8">
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => handleTabClick(idx)}
                className={`min-h-[75vh] flex flex-col justify-center p-7 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_15px_50px_rgba(245,158,11,0.18)] scale-[1.02]"
                    : "bg-[#0b0e18]/60 border-white/10 hover:border-white/20 opacity-40 hover:opacity-75"
                }`}
              >
                {/* Project Index Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? "bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                      PROJECT ARTIFACT #{idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border transition-all ${
                      isActive
                        ? "bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {isActive ? "● ACTIVE IN CENTER" : "CLICK TO VIEW"}
                  </span>
                </div>

                {/* Title & One-Liner */}
                <h3 className="text-2xl font-black text-white tracking-tight leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal mb-5">
                  {project.oneLiner}
                </p>

                {/* Problem vs Solution Callouts */}
                <div className="space-y-3 p-4 rounded-2xl bg-black/50 border border-white/5 font-sans text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[9px] font-bold shrink-0 mt-0.5">
                      PROBLEM
                    </span>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold shrink-0 mt-0.5">
                      SOLUTION
                    </span>
                    <p className="leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Outcome Badge */}
                {project.outcome && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <span className="font-mono text-[9px] font-bold text-amber-400 uppercase block mb-0.5">
                      VERIFIED OUTCOME
                    </span>
                    <p className="font-sans leading-relaxed text-slate-200 text-xs">{project.outcome}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN (4 cols): STICKY PHONE PINNED AT EXACT CENTER OF VIEWPORT */}
        <div className="col-span-4 sticky top-20 h-[calc(100vh-6rem)] flex flex-col items-center justify-center z-20 pointer-events-auto">
          {/* Dynamic Glowing Ambient Aura */}
          <div
            className={`absolute w-72 h-[520px] rounded-full blur-3xl transition-all duration-700 bg-gradient-to-tr ${
              projectGlowStyles[activeProjectIndex] || projectGlowStyles[0]
            }`}
          />

          {/* Active Screen Tag */}
          <div className="mb-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-[11px] font-mono shadow-2xl backdrop-blur-md flex items-center gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              LIVE RUNTIME: <strong>{activeProject.title.split(" ")[0]}</strong>
            </span>
          </div>

          {/* Stationary Sticky Phone Chassis with Interactive Screen */}
          <div className="relative group">
            <PhoneFrame is3dActive={true} className="!w-[300px] !h-[590px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIndex}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  {renderPhoneScreen()}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>

          {/* Screen Navigation Controls & Indicator */}
          <div className="flex items-center gap-3 mt-3 z-10">
            <button
              onClick={() => handleTabClick(Math.max(0, activeProjectIndex - 1))}
              disabled={activeProjectIndex === 0}
              className="p-1.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer hover:border-white/30 transition-all"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {projects.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleTabClick(pIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeProjectIndex === pIdx
                      ? "w-6 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : "w-1.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to project ${pIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleTabClick(Math.min(projects.length - 1, activeProjectIndex + 1))}
              disabled={activeProjectIndex === projects.length - 1}
              className="p-1.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer hover:border-white/30 transition-all"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10px] font-mono text-slate-400 mt-1.5 text-center">
            ✦ Phone pinned at center · Scroll to switch runtime
          </p>
        </div>

        {/* RIGHT COLUMN (4 cols): Metrics, Architecture Highlights & Inspect CTA */}
        <div className="col-span-4 space-y-24 py-8">
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                onClick={() => handleTabClick(idx)}
                className={`min-h-[75vh] flex flex-col justify-center p-7 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_15px_50px_rgba(245,158,11,0.18)] scale-[1.02]"
                    : "bg-[#0b0e18]/60 border-white/10 hover:border-white/20 opacity-40 hover:opacity-75"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                    SYSTEM TELEMETRY
                  </span>
                </div>

                {/* Verified Architecture Metrics */}
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs mb-5">
                  {project.metrics?.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-2xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="text-slate-400 text-[9px] block truncate mb-0.5">
                        {metric.label}
                      </span>
                      <span className="text-amber-300 font-bold text-sm block truncate">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Architecture Highlights Pill List */}
                {project.architectureHighlights && (
                  <div className="mb-5 space-y-2">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                      CORE ARCHITECTURE HIGHLIGHTS
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {project.architectureHighlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/20 text-slate-200 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="mb-5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE / TABLET RESPONSIVE FALLBACK (Stacked cards with in-card live preview) ── */}
      <div className="lg:hidden space-y-12 pb-16">
        {projects.map((project, idx) => {
          const isActive = activeProjectIndex === idx;

          return (
            <div
              key={project.id}
              ref={(el) => {
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  cardRefs.current[idx] = el;
                }
              }}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-[#121829] via-[#0b101f] to-[#171128] border-amber-500/60 shadow-2xl"
                  : "bg-[#0b0e18]/80 border-white/10"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                  PROJECT #{idx + 1} · {project.title.split(" ")[0]}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  LIVE RUNTIME
                </span>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="text-xs text-slate-300 mb-6 font-sans">
                {project.oneLiner}
              </p>

              {/* Mobile Phone Mockup View */}
              <div className="flex justify-center my-6">
                <PhoneFrame className="!w-[280px] sm:!w-[300px] !h-[540px] sm:!h-[580px]">
                  {idx === 0 && <FleetNavScreen />}
                  {idx === 1 && <CineSyncScreen />}
                  {idx === 2 && <PulsePayScreen />}
                </PhoneFrame>
              </div>

              {/* Problem / Solution */}
              <div className="space-y-2 p-4 rounded-2xl bg-black/50 border border-white/5 font-sans text-xs text-slate-300 mb-5">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[9px] font-bold shrink-0">
                    PROBLEM
                  </span>
                  <p>{project.problem}</p>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold shrink-0">
                    SOLUTION
                  </span>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-5">
                {project.metrics?.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                    <span className="text-slate-400 text-[8px] block truncate">{m.label}</span>
                    <span className="text-amber-300 font-bold text-xs block truncate">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => onSelectProject(project)}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-xl transition-all shadow-lg cursor-pointer"
              >
                <span>Inspect Full Architecture</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
