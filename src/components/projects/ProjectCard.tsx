"use client";

import React, { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";
import { Project, Domain } from "@/data/domains";

interface ProjectCardProps {
  project: Project;
  domain: Domain;
  index: number;
  onSelect: (project: Project) => void;
}

// forwardRef so the parent (GSAP orchestrator) can control this card's DOM element
const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
  { project, domain, index, onSelect },
  ref
) {
  const internalRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const isUiUx = domain.id === "ui-ux";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = (typeof ref === "object" && ref?.current) || internalRef.current;
    if (!el || isUiUx) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // For UI/UX domain — GSAP controls the outer wrapper animation
  // just render the card without Framer Motion entry animation
  if (isUiUx) {
    return (
      <div
        ref={(el) => {
          internalRef.current = el!;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        onClick={() => onSelect(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer rounded-3xl select-none flex flex-col justify-between"
        style={{ opacity: 0 }} // GSAP will animate in
      >
        <UiUxCard
          project={project}
          index={index}
          isHovered={isHovered}
        />
      </div>
    );
  }

  // Dark-theme domains: keep Framer Motion 3D tilt + entry
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
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
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${domain.colorTheme.primary}, transparent 70%)`,
        }}
      />
      <DarkCard
        project={project}
        domain={domain}
        index={index}
        isHovered={isHovered}
        spotlightPos={spotlightPos}
      />
    </motion.div>
  );
});

export default ProjectCard;

// ─── UI/UX Pop-art Card ───────────────────────────────────────────────────────
function UiUxCard({
  project,
  index,
  isHovered,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
}) {
  return (
    <div
      className="relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-200 bg-white/95 text-slate-900 border-[3px] border-black"
      style={{
        boxShadow: isHovered ? "10px 10px 0px #FF00AA" : "6px 6px 0px #000000",
        transform: isHovered
          ? `translateY(-4px) rotate(${index % 2 === 0 ? -1.2 : 1.2}deg)`
          : "translateY(0) rotate(0deg)",
        transition: "box-shadow 0.18s ease, transform 0.18s ease",
      }}
    >
      {/* Header Row */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF00AA]" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-700">
              ARTIFACT #{index + 1}
            </span>
            <span className="text-[10px] font-doodle font-black px-1.5 bg-[#00FF66] text-black border border-black rounded shadow-[1px_1px_0_#000]">
              ✓ POURED
            </span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-300 border-2 border-black text-black group-hover:bg-pink-400 group-hover:rotate-45 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Visual Preview Strip */}
        <div className="h-32 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 border-2 border-black">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-900">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-pink-600 animate-pulse" />
              VERIFIED ARCHITECTURE
            </span>
            <span className="text-slate-800">PRODUCTION GRADE</span>
          </div>
          <div className="font-mono text-xs font-bold text-black bg-white/80 px-2 py-1 rounded-lg border border-black inline-block self-start shadow-[2px_2px_0_#000]">
            {project.metrics?.[0] ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-normal">{project.metrics[0].label}:</span>
                <span style={{ color: "#D80075" }}>{project.metrics[0].value}</span>
              </div>
            ) : (
              <span>100% Cohort Tested</span>
            )}
          </div>
          <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-black group-hover:text-[#D80075] font-doodle transition-colors">
          {project.title}
        </h3>
        <p className="text-sm mt-2.5 leading-relaxed text-slate-800 font-medium font-doodle line-clamp-3">
          {project.oneLiner}
        </p>
      </div>

      {/* Tech Stack + CTA */}
      <div>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/20">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-yellow-300/60 border border-black text-slate-900 font-bold"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono font-bold text-slate-900">
          <span>Click to inspect telemetry</span>
          <span style={{ color: "#0033FF" }}>Deep Dive →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Dark-theme Card ─────────────────────────────────────────────────────────
function DarkCard({
  project,
  domain,
  index,
  isHovered,
  spotlightPos,
}: {
  project: Project;
  domain: Domain;
  index: number;
  isHovered: boolean;
  spotlightPos: { x: number; y: number };
}) {
  return (
    <div
      className="relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-[#0d101a]/85 backdrop-blur-xl border border-white/10 text-white group-hover:border-white/30 group-hover:bg-[#111624]/90 shadow-2xl transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(${domain.colorTheme.rgb}, 0.35), inset 0 0 20px rgba(${domain.colorTheme.rgb}, 0.1)`
          : "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: domain.colorTheme.primary }} />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
              ARTIFACT #{index + 1}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-900/80 border border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/30 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div
          className="h-32 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-white/5 group-hover:border-white/15"
          style={{
            background: `linear-gradient(135deg, rgba(${domain.colorTheme.rgb}, 0.15) 0%, rgba(10, 12, 18, 0.8) 100%)`,
          }}
        >
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              VERIFIED ARCHITECTURE
            </span>
            <span className="text-slate-500">PRODUCTION GRADE</span>
          </div>
          <div className="font-mono text-xs font-bold text-white/90">
            {project.metrics?.[0] ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">{project.metrics[0].label}:</span>
                <span style={{ color: domain.colorTheme.secondary }}>{project.metrics[0].value}</span>
              </div>
            ) : (
              <span>100% Cohort Tested</span>
            )}
          </div>
          <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white group-hover:text-cyan-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm mt-2.5 leading-relaxed text-slate-300 font-sans line-clamp-3">
          {project.oneLiner}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
          <span>Click to inspect telemetry</span>
          <span style={{ color: domain.colorTheme.secondary }}>Deep Dive →</span>
        </div>
      </div>
    </div>
  );
}
