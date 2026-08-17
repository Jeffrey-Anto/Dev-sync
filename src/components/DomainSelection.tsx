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
} from "lucide-react";
import { DOMAINS, Domain } from "@/data/domains";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Smartphone,
  ShieldAlert,
};

export default function DomainSelection() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  const handleDomainClick = (domain: Domain) => {
    if (isTransitioning) return;
    setSelectedDomain(domain);
    setIsTransitioning(true);

    // Trigger cinematic navigation after the zoom & scatter sequence finishes
    setTimeout(() => {
      router.push(`/domain/${domain.id}`);
    }, 850);
  };

  return (
    <section
      id="domains"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050608] overflow-hidden flex flex-col justify-center"
    >
      {/* Dynamic Background Grid & Ambient Glow */}
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
              <div className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: selectedDomain.colorTheme.secondary }}>
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
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-4"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>CAPABILITY DISCOVERY MENU</span>
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
            Minimal, confident capability architecture. Hover for telemetry. Click to initiate deep-dive exploration.
          </motion.p>
        </div>

        {/* Spatial 3D Staggered Cluster Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-container">
          {DOMAINS.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Terminal;
            const isHovered = hoveredDomainId === domain.id;
            const isSelected = selectedDomain?.id === domain.id;
            const isOther = isTransitioning && !isSelected;

            // Scatter trajectory vector for other cards when one is clicked
            const scatterX = (index % 3 - 1) * 350;
            const scatterY = (Math.floor(index / 3) === 0 ? -1 : 1) * 350;

            return (
              <DomainCard
                key={domain.id}
                domain={domain}
                index={index}
                Icon={Icon}
                isHovered={isHovered}
                isSelected={isSelected}
                isOther={isOther}
                scatterX={scatterX}
                scatterY={scatterY}
                isTransitioning={isTransitioning}
                onHover={() => setHoveredDomainId(domain.id)}
                onLeave={() => setHoveredDomainId(null)}
                onClick={() => handleDomainClick(domain)}
              />
            );
          })}
        </div>

        {/* Recruiter Instruction Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Spatial Cluster · Click any domain to enter verified cohort pipelines</span>
        </motion.div>
      </div>
    </section>
  );
}

interface DomainCardProps {
  domain: Domain;
  index: number;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  isHovered: boolean;
  isSelected: boolean;
  isOther: boolean;
  scatterX: number;
  scatterY: number;
  isTransitioning: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function DomainCard({
  domain,
  index,
  Icon,
  isHovered,
  isSelected,
  isOther,
  scatterX,
  scatterY,
  isTransitioning,
  onHover,
  onLeave,
  onClick,
}: DomainCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTransitioning) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={
        isSelected
          ? {
              scale: 1.8,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            }
          : isOther
          ? {
              x: scatterX,
              y: scatterY,
              scale: 0.4,
              opacity: 0,
              filter: "blur(12px)",
              transition: { duration: 0.6, ease: "easeIn" },
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`group relative cursor-pointer rounded-3xl transition-shadow duration-300 select-none ${
        isHovered ? "z-30" : "z-10"
      }`}
    >
      {/* Outer Glow Outline */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${domain.colorTheme.primary}, transparent 70%)`,
        }}
      />

      {/* Main Glass Card Surface */}
      <div
        className="relative h-full rounded-3xl bg-[#0b0e17]/80 backdrop-blur-xl border border-white/10 p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:border-white/25 group-hover:bg-[#0f1422]/90"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(${domain.colorTheme.rgb}, 0.35), inset 0 0 20px rgba(${domain.colorTheme.rgb}, 0.15)`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Dynamic Cursor Spotlight Reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Top Header: Domain Icon & Index */}
        <div className="flex items-start justify-between mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.15)`,
              border: `1px solid rgba(${domain.colorTheme.rgb}, 0.4)`,
              boxShadow: isHovered ? `0 0 25px ${domain.colorTheme.glow}` : "none",
            }}
          >
            <Icon
              className="w-7 h-7 transition-colors duration-300"
              style={{ color: domain.colorTheme.secondary }}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
              DOM_0{index + 1}
            </span>
            <div
              className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Center: Domain Name & Tagline */}
        <div className="mb-6">
          <h3
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-glow-indigo transition-all"
            style={{
              textShadow: isHovered ? `0 0 20px ${domain.colorTheme.glow}` : "none",
            }}
          >
            {domain.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed font-sans line-clamp-2">
            {domain.tagline}
          </p>
        </div>

        {/* Capability Metrics & Tech Tags */}
        <div>
          {/* Metrics Pill Line */}
          <div className="flex items-center gap-4 py-3 border-t border-white/10 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                <strong className="text-white">{domain.studentCount}</strong> Engineers
              </span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                <strong className="text-white">{domain.projectCount}</strong> Systems
              </span>
            </div>
          </div>

          {/* Tech Stack Preview Badges */}
          <div className="flex flex-wrap gap-1.5 pt-3">
            {domain.techStack.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {domain.techStack.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-slate-500">
                +{domain.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Ambient Corner Accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: domain.colorTheme.primary }}
        />
      </div>
    </motion.div>
  );
}
