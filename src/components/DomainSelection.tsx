"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Smartphone,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  Users,
  FolderGit2,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Compass,
  Palette,
} from "lucide-react";
import { DOMAINS, Domain } from "@/data/domains";
import { NeuralPulseBackground } from "@/components/backgrounds";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Palette,
  Smartphone,
  ShieldAlert,
};

export default function DomainSelection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  const total = DOMAINS.length;

  const handleDomainClick = (domain: Domain, index: number) => {
    if (isTransitioning) return;

    // If clicking a side card, bring it to the center
    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }

    // If clicking the active center card, trigger the cinematic transition
    setSelectedDomain(domain);
    setIsTransitioning(true);

    setTimeout(() => {
      router.push(`/domain/${domain.id}`);
    }, 850);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Helper to compute circular shortest distance offset (-2, -1, 0, 1, 2, 3)
  const getCircularOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section
      id="domains"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050608] overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Dynamic Background Grid & Ambient Glow */}
      <NeuralPulseBackground opacity={0.65} />
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-indigo-950/20 via-transparent to-[#050608] pointer-events-none" />

      {/* Cinematic Hyper-Drive Zoom Warp Overlay on Click */}
      <AnimatePresence>
        {isTransitioning && selectedDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: `rgba(${selectedDomain.colorTheme.rgb}, 0.15)`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Speed Warp Tunnel Lines */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: 0 }}
              animate={{ scale: 6, opacity: [0, 1, 0.8], rotate: 25 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="absolute w-[600px] h-[600px] rounded-full border-4"
              style={{
                borderColor: selectedDomain.colorTheme.primary,
                boxShadow: `0 0 120px 40px ${selectedDomain.colorTheme.primary}`,
              }}
            />

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 12, opacity: [0, 0.8, 1] }}
              transition={{ duration: 0.85, ease: "easeIn" }}
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: `radial-gradient(circle, ${selectedDomain.colorTheme.primary} 0%, transparent 70%)`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative z-10 text-center font-mono text-white"
            >
              <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2">
                ENTERING SPECIALIZATION MATRIX //
              </div>
              <div
                className="text-3xl sm:text-5xl font-black tracking-tight"
                style={{ color: selectedDomain.colorTheme.secondary }}
              >
                {selectedDomain.name}
              </div>
              <div className="text-sm text-slate-300 mt-2 font-mono">
                INITIALIZING WORKSPACE TELEMETRY...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>3D CIRCULAR CAPABILITY ORBIT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Select a <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Specialized Domain</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 mt-3 font-mono"
          >
            Click any surrounding card to bring it to center. Click the focused card to explore details.
          </motion.p>
        </div>

        {/* 3D Circular Deck / Coverflow Viewport */}
        <div className="relative w-full h-[520px] sm:h-[540px] flex items-center justify-center perspective-[1400px]">
          {DOMAINS.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Terminal;
            const offset = getCircularOffset(index);
            const isCenter = offset === 0;
            const isHovered = hoveredDomainId === domain.id;
            const isSelected = selectedDomain?.id === domain.id;

            return (
              <CircularDomainCard
                key={domain.id}
                domain={domain}
                index={index}
                offset={offset}
                isCenter={isCenter}
                Icon={Icon}
                isHovered={isHovered}
                isSelected={isSelected}
                isTransitioning={isTransitioning}
                onHover={() => setHoveredDomainId(domain.id)}
                onLeave={() => setHoveredDomainId(null)}
                onClick={() => handleDomainClick(domain, index)}
              />
            );
          })}

          {/* Floating Left / Right Arrow Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-8 pointer-events-none z-40">
            <button
              onClick={handlePrev}
              aria-label="Previous Domain"
              className="pointer-events-auto p-3 rounded-full bg-slate-950/80 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-xl cursor-pointer group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Domain"
              className="pointer-events-auto p-3 rounded-full bg-slate-950/80 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-xl cursor-pointer group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Orbit Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {DOMAINS.map((domain, idx) => (
            <button
              key={domain.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select domain ${domain.name}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                  : "w-2 bg-slate-800 hover:bg-slate-600"
              }`}
              style={{
                backgroundColor: activeIndex === idx ? domain.colorTheme.primary : undefined,
              }}
            />
          ))}
        </div>

        {/* Recruiter Navigation Footer Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive 3D Carousel · Click centered card to deep-dive into verified pipelines</span>
        </motion.div>
      </div>
    </section>
  );
}

interface CircularDomainCardProps {
  domain: Domain;
  index: number;
  offset: number;
  isCenter: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  isHovered: boolean;
  isSelected: boolean;
  isTransitioning: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function CircularDomainCard({
  domain,
  index,
  offset,
  isCenter,
  Icon,
  isHovered,
  isSelected,
  isTransitioning,
  onHover,
  onLeave,
  onClick,
}: CircularDomainCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateYTilt, setRotateYTilt] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTransitioning || !isCenter) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateYTilt(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateYTilt(0);
    onLeave();
  };

  // 3D Spatial Circular Arc Transformation Coordinates
  const getTransformStyles = () => {
    if (isSelected) {
      return {
        x: 0,
        y: 0,
        z: 300,
        scale: 1.6,
        rotateY: 0,
        opacity: 1,
        zIndex: 50,
      };
    }

    if (isTransitioning && !isSelected) {
      return {
        x: offset * 450,
        y: offset === 0 ? 0 : 50,
        z: -300,
        scale: 0.4,
        rotateY: offset * -25,
        opacity: 0,
        zIndex: 0,
      };
    }

    switch (offset) {
      case 0:
        return {
          x: 0,
          y: 0,
          z: 80,
          scale: 1.05,
          rotateY: 0,
          opacity: 1,
          zIndex: 30,
        };
      case -1:
        return {
          x: -310,
          y: 0,
          z: -80,
          scale: 0.76,
          rotateY: 22,
          opacity: 0.55,
          zIndex: 20,
        };
      case 1:
        return {
          x: 310,
          y: 0,
          z: -80,
          scale: 0.76,
          rotateY: -22,
          opacity: 0.55,
          zIndex: 20,
        };
      case -2:
        return {
          x: -560,
          y: 0,
          z: -220,
          scale: 0.60,
          rotateY: 36,
          opacity: 0.22,
          zIndex: 10,
        };
      case 2:
        return {
          x: 560,
          y: 0,
          z: -220,
          scale: 0.60,
          rotateY: -36,
          opacity: 0.22,
          zIndex: 10,
        };
      default:
        return {
          x: offset < 0 ? -780 : 780,
          y: 0,
          z: -380,
          scale: 0.45,
          rotateY: offset < 0 ? 45 : -45,
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  const transform = getTransformStyles();

  return (
    <motion.div
      ref={cardRef}
      animate={{
        x: transform.x,
        y: transform.y,
        scale: transform.scale,
        rotateY: transform.rotateY,
        opacity: transform.opacity,
        zIndex: transform.zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        position: "absolute",
      }}
      className={`w-[360px] sm:w-[420px] h-[460px] cursor-pointer rounded-3xl select-none transition-shadow duration-300 ${
        isCenter ? "cursor-pointer" : "cursor-pointer hover:brightness-125"
      }`}
    >
      {/* Outer Glow Halo for Center or Hovered Card */}
      <div
        className={`absolute -inset-1 rounded-3xl transition-opacity duration-500 blur-lg pointer-events-none ${
          isCenter ? "opacity-100" : isHovered ? "opacity-80" : "opacity-30"
        }`}
        style={{
          background: isCenter
            ? `radial-gradient(circle, ${domain.colorTheme.primary} 0%, rgba(${domain.colorTheme.rgb}, 0.5) 45%, transparent 75%)`
            : `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${domain.colorTheme.primary}, transparent 70%)`,
        }}
      />

      {/* Main Glass Card Surface with Saturated Colored Border */}
      <div
        className={`relative h-full rounded-3xl backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isCenter
            ? "bg-[#070a12]/95"
            : "bg-[#06080e]/90 hover:bg-[#090d18]/95"
        }`}
        style={{
          border: isCenter
            ? `2px solid ${domain.colorTheme.primary}`
            : isHovered
            ? `1.5px solid rgba(${domain.colorTheme.rgb}, 0.7)`
            : `1px solid rgba(${domain.colorTheme.rgb}, 0.35)`,
          boxShadow: isCenter
            ? `0 20px 60px -10px rgba(${domain.colorTheme.rgb}, 0.65), 0 0 35px rgba(${domain.colorTheme.rgb}, 0.35), inset 0 0 25px rgba(${domain.colorTheme.rgb}, 0.18)`
            : isHovered
            ? `0 15px 40px -10px rgba(${domain.colorTheme.rgb}, 0.5), 0 0 20px rgba(${domain.colorTheme.rgb}, 0.25)`
            : `0 10px 30px -10px rgba(0, 0, 0, 0.8)`,
          backgroundImage: `linear-gradient(180deg, rgba(${domain.colorTheme.rgb}, ${isCenter ? 0.16 : 0.08}) 0%, rgba(6, 8, 14, 0.95) 45%, #05070c 100%)`,
        }}
      >
        {/* Dynamic Colored Spotlight Reflection */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isCenter ? "opacity-100" : isHovered ? "opacity-70" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(${domain.colorTheme.rgb}, 0.25) 0%, transparent 60%)`,
          }}
        />

        {/* Top Header: Domain Category Badge & Index */}
        <div>
          <div className="flex items-start justify-between mb-6">
            {/* Category Tag Pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.22)`,
                border: `1px solid ${domain.colorTheme.primary}`,
                color: domain.colorTheme.secondary,
                boxShadow: isCenter ? `0 0 25px rgba(${domain.colorTheme.rgb}, 0.5)` : "none",
              }}
            >
              <Icon className="w-4 h-4" style={{ color: domain.colorTheme.secondary }} />
              <span>{domain.shortName.toUpperCase()}</span>
            </div>

            <span
              className="font-mono text-xs font-bold tracking-wider"
              style={{ color: isCenter ? domain.colorTheme.secondary : "rgba(148, 163, 184, 0.7)" }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Domain Title */}
          <h3
            className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-3"
            style={{
              textShadow: isCenter ? `0 0 30px ${domain.colorTheme.glow}` : "none",
            }}
          >
            {domain.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
            {domain.tagline}
          </p>
        </div>

        {/* Middle Feature Highlights List */}
        <div className="space-y-2.5 py-3">
          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-200">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.25)`,
                color: domain.colorTheme.secondary,
                border: `1px solid ${domain.colorTheme.primary}`,
                boxShadow: `0 0 10px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              ✓
            </span>
            <span>
              <strong className="text-white">{domain.studentCount}</strong> Dedicated Undergraduates
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-200">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.25)`,
                color: domain.colorTheme.secondary,
                border: `1px solid ${domain.colorTheme.primary}`,
                boxShadow: `0 0 10px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              ✓
            </span>
            <span>
              <strong className="text-white">{domain.projectCount}</strong> Verified Production Systems
            </span>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div
          className="pt-4 flex items-center justify-between font-mono text-xs"
          style={{
            borderTop: `1px solid rgba(${domain.colorTheme.rgb}, 0.25)`,
          }}
        >
          <span className="text-slate-400">
            {domain.techStack[0]} · {domain.techStack[1]}
          </span>

          {isCenter ? (
            <div
              className="flex items-center gap-1.5 font-bold tracking-wider uppercase transition-transform group-hover:scale-105"
              style={{
                color: domain.colorTheme.secondary,
                textShadow: `0 0 15px ${domain.colorTheme.primary}`,
              }}
            >
              <span>EXPLORE DETAILS</span>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
          ) : (
            <span
              className="uppercase tracking-wider text-[11px] font-semibold transition-colors"
              style={{ color: isHovered ? domain.colorTheme.secondary : "rgba(148, 163, 184, 0.6)" }}
            >
              CLICK TO FOCUS
            </span>
          )}
        </div>

        {/* Ambient Corner Flare */}
        <div
          className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full opacity-20 pointer-events-none blur-xl"
          style={{ backgroundColor: domain.colorTheme.primary }}
        />
      </div>
    </motion.div>
  );
}
