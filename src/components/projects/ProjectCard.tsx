"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, ExternalLink, Activity, Terminal, Shield, Cpu, Layers } from "lucide-react";
import { Project, Domain } from "@/data/domains";

interface ProjectCardProps {
  project: Project;
  domain: Domain;
  index: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({
  project,
  domain,
  index,
  onSelect,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

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
    setIsHovered(false);
  };

  const isUiUx = domain.id === "ui-ux";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="group relative cursor-pointer rounded-3xl transition-all duration-300 select-none flex flex-col justify-between"
    >
      {/* Outer Glow Halo */}
      {!isUiUx && (
        <div
          className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${domain.colorTheme.primary}, transparent 70%)`,
          }}
        />
      )}

      {/* Main Card Body (Pop-art for UI/UX vs Dark Glass for other domains) */}
      <div
        className={`relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isUiUx
            ? "bg-white/95 text-slate-900 border-3 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#FF00AA] hover:-translate-y-1"
            : "bg-[#0d101a]/85 backdrop-blur-xl border border-white/10 text-white group-hover:border-white/30 group-hover:bg-[#111624]/90 shadow-2xl"
        }`}
        style={{
          boxShadow: isUiUx
            ? isHovered
              ? "10px 10px 0px #FF00AA"
              : "6px 6px 0px #000000"
            : isHovered
            ? `0 20px 40px -15px rgba(${domain.colorTheme.rgb}, 0.35), inset 0 0 20px rgba(${domain.colorTheme.rgb}, 0.1)`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Top Card Header: Visual Art Mock + Index */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: isUiUx ? "#FF00AA" : domain.colorTheme.primary,
                }}
              />
              <span
                className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
                  isUiUx ? "text-slate-700" : "text-slate-400"
                }`}
              >
                ARTIFACT #{index + 1}
              </span>
            </div>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isUiUx
                  ? "bg-yellow-300 border-2 border-black text-black group-hover:bg-pink-400 group-hover:rotate-45"
                  : "bg-slate-900/80 border border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Abstract Themed Visual Header Area */}
          <div
            className={`h-32 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all ${
              isUiUx
                ? "bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 border-2 border-black text-black"
                : "border border-white/5 group-hover:border-white/15"
            }`}
            style={{
              background: !isUiUx
                ? `linear-gradient(135deg, rgba(${domain.colorTheme.rgb}, 0.15) 0%, rgba(10, 12, 18, 0.8) 100%)`
                : undefined,
            }}
          >
            <div
              className={`flex items-center justify-between text-[10px] font-mono font-bold ${
                isUiUx ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <span className="flex items-center gap-1">
                <Activity
                  className={`w-3 h-3 ${isUiUx ? "text-pink-600" : "text-emerald-400"} animate-pulse`}
                />
                VERIFIED ARCHITECTURE
              </span>
              <span className={isUiUx ? "text-slate-800" : "text-slate-500"}>PRODUCTION GRADE</span>
            </div>

            <div
              className={`font-mono text-xs font-bold tracking-tight ${
                isUiUx ? "text-black bg-white/70 px-2 py-1 rounded-lg border border-black inline-block self-start" : "text-white/90"
              }`}
            >
              {project.metrics?.[0] ? (
                <div className="flex items-center gap-2">
                  <span className={isUiUx ? "text-slate-700 font-normal" : "text-slate-400 font-normal"}>
                    {project.metrics[0].label}:
                  </span>
                  <span style={{ color: isUiUx ? "#D80075" : domain.colorTheme.secondary }}>
                    {project.metrics[0].value}
                  </span>
                </div>
              ) : (
                <span>100% Cohort Tested</span>
              )}
            </div>

            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
          </div>
        </div>

        {/* Middle: Title & One-Liner */}
        <div className="mb-6">
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight leading-snug transition-colors ${
              isUiUx
                ? "text-black group-hover:text-[#D80075]"
                : "text-white group-hover:text-cyan-200"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-xs sm:text-sm mt-2.5 leading-relaxed font-sans line-clamp-3 ${
              isUiUx ? "text-slate-800 font-medium" : "text-slate-300"
            }`}
          >
            {project.oneLiner}
          </p>
        </div>

        {/* Bottom: Tech Stack Badges & Inspection Cue */}
        <div>
          <div
            className={`flex flex-wrap gap-1.5 pt-4 border-t ${
              isUiUx ? "border-black/20" : "border-white/10"
            }`}
          >
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                  isUiUx
                    ? "bg-yellow-300/50 border border-black text-slate-900 font-bold"
                    : "bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-white/20"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className={`mt-4 pt-3 flex items-center justify-between text-[11px] font-mono transition-colors ${
              isUiUx ? "text-slate-800 font-bold" : "text-slate-400 group-hover:text-white"
            }`}
          >
            <span>Click to inspect telemetry</span>
            <span style={{ color: isUiUx ? "#0033FF" : domain.colorTheme.secondary }}>
              Deep Dive →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
