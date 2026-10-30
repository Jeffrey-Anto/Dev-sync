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
  Camera,
  Video,
  Mic,
} from "lucide-react";
import { Project, Domain } from "@/data/domains";
import { PhoneFrame } from "./MobileDevCinematicIntro";

// =========================================================================
// 1. IN-DEVICE MOBILE SCREEN FOR PROJECT 1: GCES HOSTEL
// =========================================================================
function GcesHostelScreen() {
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
    <div className="relative w-full h-full bg-[#070b14] text-slate-100 p-2.5 sm:p-3 pt-5 sm:pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Map Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between text-[8.5px] text-cyan-300/80 mb-1.5 px-0.5">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              CAMPUS LIVE
            </span>
            <Signal className="w-2.5 h-2.5 text-cyan-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Turn-by-Turn Instruction Banner */}
        <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-950/90 to-slate-900/90 border border-cyan-500/30 mb-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-400/40 shrink-0">
              <Navigation className="w-4 h-4 text-cyan-400 rotate-45 animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] text-cyan-300 font-bold truncate">Token Confirmed · Mess Open</p>
              <h5 className="text-[10.5px] font-black text-white truncate">GCES Srirangam Campus</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Live Vector Map Simulation Display (Flex-Grow to fit height) */}
      <div className="relative flex-1 min-h-[130px] max-h-[220px] rounded-xl bg-[#040810] border border-cyan-500/20 overflow-hidden p-2 flex flex-col justify-between shadow-inner my-1">
        {/* Map Vector Roads SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-65" viewBox="0 0 200 160" preserveAspectRatio="none">
          <path d="M 0 40 Q 60 70 120 40 T 200 60" fill="none" stroke="#1e293b" strokeWidth="14" />
          <path d="M 40 0 Q 70 80 140 160" fill="none" stroke="#1e293b" strokeWidth="16" />
          <path d="M 170 0 L 140 160" fill="none" stroke="#1e293b" strokeWidth="12" />

          {/* Glowing Active Route Navigation Line */}
          <path
            d={
              rerouteCount % 2 === 0
                ? "M 20 40 Q 70 70 110 100 T 170 140"
                : "M 20 40 Q 40 110 100 130 T 170 140"
            }
            fill="none"
            stroke="#00E5FF"
            strokeWidth="4.5"
            strokeDasharray="6 3"
            className="animate-pulse"
          />

          {/* User GPS Location Marker */}
          <circle cx={rerouteCount % 2 === 0 ? "70" : "40"} cy={rerouteCount % 2 === 0 ? "70" : "110"} r="6" fill="#00E5FF" />
          <circle cx={rerouteCount % 2 === 0 ? "70" : "40"} cy={rerouteCount % 2 === 0 ? "70" : "110"} r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Destination Pin */}
          <circle cx="170" cy="140" r="5" fill="#EF4444" />
        </svg>

        {/* Top Map Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-black/80 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
            <Database className="w-2.5 h-2.5" /> 100% Cached
          </span>
          <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            60 FPS
          </span>
        </div>

        {/* Bottom Route Metrics inside Map */}
        <div className="relative z-10 p-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-[7.5px]">
          <div>
            <span className="text-slate-400 block text-[6.5px]">REMAINING</span>
            <span className="text-white font-bold">{rerouteCount % 2 === 0 ? "14.2 km · 22m" : "13.8 km · 20m"}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[6.5px]">ENGINE</span>
            <span className="text-cyan-400 font-bold truncate max-w-[90px] block">
              {rerouting ? "Routing..." : "Dijkstra (<1.2ms)"}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Button & Bottom Sync */}
      <div className="flex-shrink-0 space-y-1.5 mt-1">
        <button
          onClick={handleRecalculate}
          className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[8px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className={`w-3 h-3 ${rerouting ? "animate-spin text-white" : ""}`} />
          <span>{rerouting ? "Evaluating Route..." : "Simulate Offline Reroute"}</span>
        </button>

        <div className="p-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[8px]">
          <div className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-slate-200">Bluetooth Mesh Sync</span>
          </div>
          <span className="text-emerald-400 font-bold">● Active (4 Peers)</span>
        </div>
        <div className="w-20 h-1 bg-cyan-400/40 rounded-full mx-auto" />
      </div>
    </div>
  );
}

// =========================================================================
// 2. IN-DEVICE MOBILE SCREEN FOR PROJECT 2: CONNECTLNX KMP
// =========================================================================
function ConnectLnxScreen() {
  const [boosted, setBoosted] = useState(false);

  const toggleBoost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBoosted((b) => !b);
  };

  return (
    <div className="relative w-full h-full bg-[#060a12] text-slate-100 p-2.5 sm:p-3 pt-5 sm:pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between text-[8.5px] text-cyan-300/80 mb-1.5 px-0.5">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              P2P WI-FI DIRECT
            </span>
            <Wifi className="w-2.5 h-2.5 text-cyan-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Studio App Header */}
        <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white leading-tight">ConnectLnx KMP</h5>
              <p className="text-[7px] text-cyan-400">Zero-Cloud P2P LAN Transfer</p>
            </div>
          </div>
          <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            {boosted ? "74.8 MB/s" : "54.2 MB/s"}
          </span>
        </div>
      </div>

      {/* Real-time Transfer Stream Display */}
      <div className="relative flex-1 min-h-[70px] max-h-[105px] rounded-xl bg-black/80 border border-cyan-500/20 overflow-hidden p-2 flex flex-col justify-between my-1">
        <div className="flex items-center justify-between text-[6.5px] text-slate-400 z-10">
          <span>PEER: ARCH LINUX WORKSTATION</span>
          <span className="text-cyan-400 font-bold">ZERO-COPY NIO</span>
        </div>

        <div>
          <div className="flex items-center justify-between text-[7.5px] text-white font-bold mb-1">
            <span className="truncate max-w-[130px]">ubuntu-24.04-desktop.iso</span>
            <span className="text-cyan-300">4.8 GB (78%)</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
            <motion.div
              animate={{ width: boosted ? ["78%", "92%"] : ["78%", "84%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[6.5px] text-slate-400">
          <span>5 Multiplexed Sockets</span>
          <span className="text-emerald-400 font-bold">ETA: 12 seconds</span>
        </div>
      </div>

      {/* Transfer Metrics Grid */}
      <div className="flex-shrink-0 space-y-1 my-1">
        {[
          { label: "PROTOCOL", value: "Java NIO FileChannel.transferTo", status: "Zero-Copy" },
          { label: "PEER DISCOVERY", value: "Local mDNS + ML Kit QR fallback", status: "LAN Only" },
          { label: "CLIPBOARD SYNC", value: "Coroutines SharedFlow", status: "Active" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-1.5 rounded-lg border bg-white/[0.03] border-white/5 flex items-center justify-between text-[7.5px]"
          >
            <div>
              <span className="text-slate-400 block text-[6px]">{item.label}</span>
              <span className="text-slate-200 font-bold">{item.value}</span>
            </div>
            <span className="text-cyan-400 font-bold">{item.status}</span>
          </div>
        ))}
      </div>

      {/* Bottom P2P Status & Button */}
      <div className="flex-shrink-0 space-y-1.5 mt-1">
        <button
          onClick={toggleBoost}
          className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[8px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className="w-2.5 h-2.5 text-cyan-400" />
          <span>{boosted ? "Boost Mode Active (5 Sockets)" : "Toggle Multi-Socket Boost"}</span>
        </button>

        <div className="p-1.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between text-[8px]">
          <span className="text-slate-300">Data Sovereignty</span>
          <span className="text-emerald-400 font-bold">0 Cloud Relays (100% P2P)</span>
        </div>
        <div className="w-20 h-1 bg-cyan-400/40 rounded-full mx-auto" />
      </div>
    </div>
  );
}

// =========================================================================
// 3. IN-DEVICE MOBILE SCREEN FOR PROJECT 3: SMET
// =========================================================================
function SmetScreen() {
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
    <div className="relative w-full h-full bg-[#050907] text-slate-100 p-2.5 sm:p-3 pt-5 sm:pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between text-[8.5px] text-emerald-300/80 mb-1.5 px-0.5">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              NFC READY
            </span>
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Merchant POS Header */}
        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white">SMET Vault</h5>
              <p className="text-[7px] text-emerald-400">Offline Room ACID Enclave</p>
            </div>
          </div>
          <span className="text-[7.5px] font-bold text-slate-300">#BUDGET-ALERT</span>
        </div>

        {/* Amount Card */}
        <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-black border border-emerald-500/30 text-center my-1 shadow-lg">
          <span className="text-[7px] text-slate-400 uppercase tracking-widest block mb-0.5">
            MONTHLY BUDGET REMAINING
          </span>
          <h3 className="text-xl font-black text-white tracking-tight text-emerald-300">
            ₹4,250 <span className="text-[10px] font-normal text-slate-400">INR</span>
          </h3>
          <p className="text-[7px] text-emerald-400/80 mt-0.5">● Biometric Fingerprint Authentication Active</p>
        </div>
      </div>

      {/* Biometric Laser Fingerprint Scanner Mockup (Flexible height) */}
      <div
        onClick={handleFingerprintTap}
        className="relative flex-1 min-h-[90px] max-h-[140px] p-2.5 rounded-2xl bg-black/70 border border-emerald-500/25 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-400/60 transition-all group my-1"
      >
        {/* Animated Biometric Fingerprint */}
        <div className="relative w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
          <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" />
          <Fingerprint
            className={`w-7 h-7 transition-colors ${
              authStatus === "authorized"
                ? "text-emerald-300 drop-shadow-[0_0_16px_#34d399]"
                : authStatus === "verifying"
                ? "text-amber-300 animate-pulse"
                : "text-emerald-400 drop-shadow-[0_0_12px_#10b981]"
            }`}
          />

          {/* Glowing Laser Scan Bar */}
          <motion.div
            animate={{ y: [-16, 16, -16] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#34d399]"
          />
        </div>

        <p className="text-[7.5px] font-bold text-white tracking-wide text-center">
          {authStatus === "authorized" ? (
            <span className="text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> PAYMENT AUTHORIZED
            </span>
          ) : authStatus === "verifying" ? (
            <span className="text-amber-300 animate-pulse">VERIFYING ECDSA KEY...</span>
          ) : (
            "TAP FINGERPRINT TO AUTH"
          )}
        </p>
        <span className="text-[6px] text-slate-400">Level 4 TEE Hardware Keystore</span>
      </div>

      {/* Bottom Secure Settlement Status */}
      <div className="flex-shrink-0 space-y-1.5 mt-1">
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
// 4. IN-DEVICE MOBILE SCREEN FOR PROJECT 4: EXTRACAM WIRELESS VIRTUAL CAMERA
// =========================================================================
function ExtraCamScreen() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleStream = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStreaming((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full bg-[#030712] text-slate-100 p-2.5 sm:p-3 pt-5 sm:pt-6 flex flex-col justify-between select-none overflow-hidden font-mono">
      {/* Dynamic Scanline Viewfinder Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between text-[8.5px] text-amber-300/80 mb-1.5 px-0.5">
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <span
              className={`text-[7.5px] px-1.5 py-0.2 rounded font-bold border flex items-center gap-1 ${
                isStreaming
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "bg-slate-800 text-slate-400 border-white/10"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isStreaming ? "bg-amber-400 animate-ping" : "bg-slate-500"
                }`}
              />
              {isStreaming ? "LIVE RTSP" : "STANDBY"}
            </span>
            <Wifi className="w-2.5 h-2.5 text-amber-400" />
            <Battery className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* Viewfinder Header Banner */}
        <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white">ExtraCam AV</h5>
              <p className="text-[7px] text-amber-400">MediaCodec H.264 · Sub-100ms</p>
            </div>
          </div>
          <span className="text-[7.5px] font-bold text-slate-300">1080p60</span>
        </div>
      </div>

      {/* Simulated Live Camera Viewfinder Screen */}
      <div className="relative flex-1 min-h-[140px] max-h-[220px] rounded-2xl bg-gradient-to-b from-[#0a0f1d] via-[#050811] to-[#020409] border border-amber-500/30 overflow-hidden p-2.5 flex flex-col justify-between shadow-inner my-1">
        {/* Crosshair Viewfinder Lines */}
        <div className="absolute inset-4 border border-dashed border-amber-500/20 rounded-xl pointer-events-none flex items-center justify-center">
          <div className="w-8 h-8 border border-amber-400/40 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Live Video Telemetry Overlay */}
        <div className="relative z-10 flex items-center justify-between text-[7.5px] font-mono text-amber-300/90 bg-black/60 px-2 py-1 rounded-lg border border-amber-500/20">
          <span>BITRATE: 12.4 Mbps</span>
          <span>LATENCY: 18ms</span>
          <span>60 FPS</span>
        </div>

        {/* Soundwave / Audio Level Meter */}
        <div className="relative z-10 p-2 rounded-xl bg-black/70 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[7px] text-slate-300 font-bold">
            <span className="flex items-center gap-1">
              <Mic className="w-2.5 h-2.5 text-amber-400" />
              HARDWARE AAC
            </span>
            <span className="text-emerald-400">-6 dB PEAK</span>
          </div>
          <div className="flex items-center gap-0.5 h-1.5">
            {[40, 75, 90, 60, 85, 95, 70, 50, 80, 65, 45, 90, 100, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-emerald-500 via-amber-400 to-rose-500 opacity-80"
                style={{ height: isStreaming ? `${h}%` : "15%" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Camera Control Action Buttons */}
      <div className="flex-shrink-0 pt-1 space-y-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleToggleStream}
            className={`py-1.5 rounded-xl font-bold text-[8.5px] border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              isStreaming
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
          >
            <Video className="w-2.5 h-2.5" />
            {isStreaming ? "STOP STREAM" : "START STREAM"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/40 text-slate-200 font-bold text-[8.5px] flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-2.5 h-2.5 text-rose-400" />
            ) : (
              <Volume2 className="w-2.5 h-2.5 text-amber-400" />
            )}
            {isMuted ? "UNMUTE" : "MUTE MIC"}
          </button>
        </div>

        <p className="text-[7px] text-center text-slate-400">
          TCP Direct Socket · Zero Cloud Relay
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 5. MAIN STICKY CENTER-PINNED MOBILE PROJECT SHOWCASE
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
    if (activeProjectIndex === 0) return <GcesHostelScreen key="gceshostel" />;
    if (activeProjectIndex === 1) return <ConnectLnxScreen key="connectlnx" />;
    if (activeProjectIndex === 2) return <SmetScreen key="smet" />;
    if (activeProjectIndex === 3) return <ExtraCamScreen key="extracam" />;
    return <GcesHostelScreen key="default" />;
  };

  // Color theme mapping per project index for glowing dynamic aura
  const projectGlowStyles = [
    "from-cyan-500/25 via-blue-500/10 to-transparent shadow-[0_0_90px_rgba(0,229,255,0.25)]",
    "from-teal-500/25 via-cyan-500/10 to-transparent shadow-[0_0_90px_rgba(20,184,166,0.25)]",
    "from-emerald-500/25 via-teal-500/10 to-transparent shadow-[0_0_90px_rgba(16,185,129,0.25)]",
    "from-amber-500/25 via-orange-500/10 to-transparent shadow-[0_0_90px_rgba(245,158,11,0.25)]",
  ];

  return (
    <div className="relative w-full my-4">
      {/* ── DESKTOP 3-COLUMN CENTER-STAGE SHOWCASE (Left Overview + Center Sticky Phone + Right Metrics) ── */}
      <div className="hidden lg:grid grid-cols-12 gap-6 xl:gap-8 items-start relative">
        {/* LEFT COLUMN (4 cols): Project Overview, Problem & Solution cards */}
        <div className="col-span-4 space-y-24 pt-6 pb-[75vh]">
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => handleTabClick(idx)}
                className={`min-h-[75vh] flex flex-col justify-center p-6 xl:p-7 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_15px_50px_rgba(245,158,11,0.18)] scale-[1.02]"
                    : "bg-[#0b0e18]/60 border-white/10 hover:border-white/20 opacity-40 hover:opacity-75"
                }`}
              >
                {/* Project Index Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? "bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                      PROJECT #{idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                      isActive
                        ? "bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {isActive ? "● LIVE IN CENTER" : "CLICK TO VIEW"}
                  </span>
                </div>

                {/* Title & One-Liner */}
                <h3 className="text-xl xl:text-2xl font-black text-white tracking-tight leading-snug mb-2.5">
                  {project.title}
                </h3>
                <p className="text-xs xl:text-sm text-slate-300 leading-relaxed font-sans font-normal mb-4">
                  {project.oneLiner}
                </p>

                {/* Problem vs Solution Callouts */}
                <div className="space-y-2.5 p-3.5 rounded-2xl bg-black/50 border border-white/5 font-sans text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[8.5px] font-bold shrink-0 mt-0.5">
                      PROBLEM
                    </span>
                    <p className="leading-relaxed text-[11.5px] xl:text-xs">{project.problem}</p>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[8.5px] font-bold shrink-0 mt-0.5">
                      SOLUTION
                    </span>
                    <p className="leading-relaxed text-[11.5px] xl:text-xs">{project.solution}</p>
                  </div>
                </div>

                {/* Outcome Badge */}
                {project.outcome && (
                  <div className="mt-3.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <span className="font-mono text-[8.5px] font-bold text-amber-400 uppercase block mb-0.5">
                      VERIFIED OUTCOME
                    </span>
                    <p className="font-sans leading-relaxed text-slate-200 text-[11.5px] xl:text-xs">{project.outcome}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN (4 cols): STICKY PHONE PINNED AT EXACT CENTER OF VIEWPORT (Dynamic Viewport Fit) */}
        <div className="col-span-4 sticky top-0 h-screen flex flex-col items-center justify-center z-20 pointer-events-auto">
          {/* Dynamic Glowing Ambient Aura */}
          <div
            className={`absolute w-80 h-[520px] rounded-full blur-3xl transition-all duration-700 bg-gradient-to-tr ${
              projectGlowStyles[activeProjectIndex] || projectGlowStyles[0]
            }`}
          />

          {/* Stationary Sticky Phone Chassis with Viewport-Fitting Height */}
          <div className="relative group shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
            <PhoneFrame
              is3dActive={true}
              className="!h-[min(640px,82vh)] !w-[min(335px,calc(82vh*0.52))] !rounded-[48px] !p-3"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIndex}
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  {renderPhoneScreen()}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>

          {/* Screen Navigation Controls & Indicator */}
          <div className="flex items-center gap-2.5 mt-2.5 z-10">
            <button
              onClick={() => handleTabClick(Math.max(0, activeProjectIndex - 1))}
              disabled={activeProjectIndex === 0}
              className="p-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer hover:border-white/30 transition-all"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-1.5">
              {projects.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleTabClick(pIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeProjectIndex === pIdx
                      ? "w-5 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : "w-1.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to project ${pIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleTabClick(Math.min(projects.length - 1, activeProjectIndex + 1))}
              disabled={activeProjectIndex === projects.length - 1}
              className="p-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer hover:border-white/30 transition-all"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): Metrics, Architecture Highlights & Inspect CTA */}
        <div className="col-span-4 space-y-24 pt-6 pb-[75vh]">
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                onClick={() => handleTabClick(idx)}
                className={`min-h-[75vh] flex flex-col justify-center p-6 xl:p-7 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_15px_50px_rgba(245,158,11,0.18)] scale-[1.02]"
                    : "bg-[#0b0e18]/60 border-white/10 hover:border-white/20 opacity-40 hover:opacity-75"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                    SYSTEM TELEMETRY
                  </span>
                </div>

                {/* Verified Architecture Metrics */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs mb-4">
                  {project.metrics?.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="text-slate-400 text-[8.5px] block truncate mb-0.5">
                        {metric.label}
                      </span>
                      <span className="text-amber-300 font-bold text-xs xl:text-sm block truncate">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Architecture Highlights Pill List */}
                {project.architectureHighlights && (
                  <div className="mb-4 space-y-1.5">
                    <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block">
                      CORE ARCHITECTURE HIGHLIGHTS
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {project.architectureHighlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="text-[10.5px] xl:text-[11px] font-mono px-2.5 py-1 rounded-xl bg-slate-900/90 border border-amber-500/20 text-slate-200 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="mb-4">
                  <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE / TABLET RESPONSIVE FALLBACK (Stacked cards with in-card live preview) ── */}
      <div className="lg:hidden space-y-8 sm:space-y-12 pb-16">
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
              className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-[#121829] via-[#0b101f] to-[#171128] border-amber-500/60 shadow-2xl"
                  : "bg-[#0b0e18]/80 border-white/10"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
                  PROJECT #{idx + 1} · {project.title.split(" ")[0]}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1.5">
                {project.title}
              </h3>
              <p className="text-xs text-slate-300 mb-4 sm:mb-5 font-sans leading-relaxed">
                {project.oneLiner}
              </p>

              {/* Mobile Phone Mockup View with Dynamic Fitting Dimensions */}
              <div className="flex justify-center my-3 sm:my-4">
                <PhoneFrame className="!h-[480px] sm:!h-[590px] !w-full max-w-[275px] sm:max-w-[320px] !rounded-[40px] sm:!rounded-[46px] !p-2 sm:!p-3">
                  {idx === 0 && <GcesHostelScreen />}
                  {idx === 1 && <ConnectLnxScreen />}
                  {idx === 2 && <SmetScreen />}
                  {idx === 3 && <ExtraCamScreen />}
                </PhoneFrame>
              </div>

              {/* Problem / Solution */}
              <div className="space-y-2 p-3 sm:p-3.5 rounded-2xl bg-black/50 border border-white/5 font-sans text-xs text-slate-300 mb-4">
                <div className="flex items-start gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[8px] sm:text-[8.5px] font-bold shrink-0 mt-0.5">
                    PROBLEM
                  </span>
                  <p className="text-[11px] sm:text-[11.5px] leading-relaxed">{project.problem}</p>
                </div>
                <div className="flex items-start gap-1.5 pt-2 border-t border-white/5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[8px] sm:text-[8.5px] font-bold shrink-0 mt-0.5">
                    SOLUTION
                  </span>
                  <p className="text-[11px] sm:text-[11.5px] leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs mb-4">
                {project.metrics?.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                    <span className="text-slate-400 text-[7px] sm:text-[7.5px] block truncate">{m.label}</span>
                    <span className="text-amber-300 font-bold text-[10.5px] sm:text-[11px] block truncate">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => onSelectProject(project)}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-xl transition-all shadow-lg cursor-pointer"
              >
                <span>Inspect Full Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
