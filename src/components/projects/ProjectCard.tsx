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

  const isWebDev = domain.id === "web-dev";

  // For Web Dev domain — Spider-Verse Cyber Card with Spider-Sense & Web-Cocoon Aesthetics
  if (isWebDev) {
    return (
      <div
        ref={(el) => {
          internalRef.current = el!;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        style={{
          opacity: 0,
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        className="group relative cursor-pointer rounded-3xl transition-all duration-300 select-none flex flex-col justify-between"
      >
        {/* Spider-Verse Glow Halo */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(239, 68, 68, 0.45), rgba(251, 191, 36, 0.25) 45%, transparent 70%)`,
          }}
        />
        <WebDevSpiderCard
          project={project}
          domain={domain}
          index={index}
          isHovered={isHovered}
          spotlightPos={spotlightPos}
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
      {/* ── Coffee wash overlay — starts covering the card, GSAP wipes it up ──
          Gives the feeling that the card IS coffee that then "reveals" itself.  */}
      <div
        className="js-coffee-overlay absolute inset-0 rounded-3xl z-10 pointer-events-none overflow-hidden"
        style={{ background: "linear-gradient(160deg, #2A1008 0%, #3A1D0B 35%, #522A12 65%, #6B3E1E 100%)" }}
      >
        {/* Latte foam blobs */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full bg-[#C48858]/60 blur-sm" />
        <div className="absolute top-8 left-1/3 w-1/4 h-4 rounded-full bg-[#D4A57A]/50 blur-[2px]" />
        <div className="absolute top-9 right-1/3 w-1/5 h-3 rounded-full bg-[#C48858]/40 blur-[2px]" />
        {/* Coffee texture grain */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle, #8B4513 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }} />
        {/* Ripple rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#C48858]/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-[#D4A57A]/25" />
        {/* POUR label on overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-doodle text-xs font-black text-[#C48858]/80 whitespace-nowrap tracking-wider">
          ☕ BEING POURED…
        </div>
      </div>

      {/* Header Row */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF00AA]" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-700">
              ARTIFACT #{index + 1}
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

// ─── Web Dev Spider-Verse Card ───────────────────────────────────────────────
function WebDevSpiderCard({
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
      className="relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c0f1d]/90 via-[#070a14]/95 to-[#130d22]/90 backdrop-blur-xl border border-red-500/20 text-white group-hover:border-red-500/50 shadow-2xl transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? "0 20px 45px -12px rgba(239, 68, 68, 0.45), 0 0 25px rgba(251, 191, 36, 0.25), inset 0 0 20px rgba(239, 68, 68, 0.15)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* ── Hyper-Realistic 3D Spider Silk Chrysalis Overlay ── */}
      <div
        className="js-cocoon-wrapper absolute inset-0 z-20 pointer-events-none overflow-visible rounded-3xl"
        style={{ perspective: "1200px" }}
      >
        {/* Branching Silk Suspension Web Tree (Anchoring Cocoon to Ceiling) */}
        <svg
          className="js-cocoon-threads absolute -top-28 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none overflow-visible z-30"
          viewBox="0 0 160 80"
        >
          <defs>
            <linearGradient id="silk-tree-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.4" />
            </linearGradient>
            <filter id="silk-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Primary High-Tension Strands */}
          <line x1="15" y1="-30" x2="65" y2="80" stroke="url(#silk-tree-grad)" strokeWidth="1.8" filter="url(#silk-glow)" />
          <line x1="145" y1="-30" x2="95" y2="80" stroke="url(#silk-tree-grad)" strokeWidth="1.8" filter="url(#silk-glow)" />
          <line x1="80" y1="-45" x2="80" y2="80" stroke="#ffffff" strokeWidth="2.4" filter="url(#silk-glow)" />

          {/* Secondary Braided Filaments */}
          <line x1="35" y1="-20" x2="74" y2="80" stroke="#ffffff" strokeWidth="1.0" strokeDasharray="3 2" opacity="0.8" />
          <line x1="125" y1="-20" x2="86" y2="80" stroke="#ffffff" strokeWidth="1.0" strokeDasharray="3 2" opacity="0.8" />

          {/* Drooping Web Bridging Strands */}
          <path d="M 25 10 Q 80 40 135 10" fill="none" stroke="#ffffff" strokeWidth="1.0" opacity="0.75" />
          <path d="M 45 35 Q 80 60 115 35" fill="none" stroke="#cbd5e1" strokeWidth="0.9" opacity="0.7" />

          {/* Top Silk Node Anchor */}
          <circle cx="80" cy="76" r="5" fill="#ffffff" filter="url(#silk-glow)" />
          <circle cx="80" cy="76" r="2.5" fill="#38bdf8" />
        </svg>

        {/* Cocoon Inner Energy Burst (Radiates when hatching) */}
        <div className="js-cocoon-burst absolute inset-0 rounded-3xl opacity-0 bg-gradient-to-r from-cyan-400 via-white to-red-500 blur-2xl z-10 pointer-events-none" />

        {/* ── 3D Left Organic Silk Shell (Woven Chrysalis Half) ── */}
        <div
          className="js-cocoon-left absolute top-0 left-0 w-1/2 h-full rounded-l-3xl overflow-hidden border-y border-l border-white/30 shadow-[inset_-8px_0_30px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(255,255,255,0.08),-12px_0_35px_rgba(0,0,0,0.9)]"
          style={{
            background: "radial-gradient(ellipse at 40% 45%, #141b2d 0%, #0a0e1a 55%, #04060d 100%)",
            transformOrigin: "left center",
          }}
        >
          {/* Dense Multi-Layer Organic Spider Silk Mesh (Left Half) */}
          <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 120 240" preserveAspectRatio="none">
            {/* Natural Drooping Silk Web Arcs (Contouring 3D Chrysalis) */}
            <path d="M 0 15 Q 60 30 120 25" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
            <path d="M 0 45 Q 65 65 120 58" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
            <path d="M 0 80 Q 70 105 120 95" fill="none" stroke="#cbd5e1" strokeWidth="1.3" opacity="0.8" />
            <path d="M 0 120 Q 75 145 120 135" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.95" />
            <path d="M 0 160 Q 70 185 120 175" fill="none" stroke="#cbd5e1" strokeWidth="1.3" opacity="0.8" />
            <path d="M 0 195 Q 65 215 120 205" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" />
            <path d="M 0 225 Q 60 235 120 230" fill="none" stroke="#ffffff" strokeWidth="1.1" opacity="0.75" />

            {/* Diagonal Braided Silk Strands & Cross-Web Spirals */}
            <path d="M 0 5 C 45 60, 85 120, 120 235" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.75" />
            <path d="M 0 50 C 50 110, 85 170, 120 215" fill="none" stroke="#cbd5e1" strokeWidth="1.0" opacity="0.65" />
            <path d="M 0 110 C 60 150, 90 190, 120 240" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
            <path d="M 0 195 C 60 145, 90 95, 120 25" fill="none" stroke="#38bdf8" strokeWidth="1.3" opacity="0.6" />
            <path d="M 0 155 C 50 105, 80 55, 120 5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
            <path d="M 0 235 C 45 175, 85 85, 120 55" fill="none" stroke="#cbd5e1" strokeWidth="1.0" opacity="0.5" />

            {/* Organic Fibrous Silk Nodes */}
            <circle cx="50" cy="90" r="2.2" fill="#ffffff" opacity="0.9" />
            <circle cx="75" cy="145" r="2.5" fill="#ffffff" opacity="0.9" />
            <circle cx="40" cy="185" r="1.8" fill="#ffffff" opacity="0.8" />
          </svg>

          {/* Translucent Spun Silk Specular Sheen Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.18] pointer-events-none" />
        </div>

        {/* ── 3D Right Organic Silk Shell (Woven Chrysalis Half) ── */}
        <div
          className="js-cocoon-right absolute top-0 right-0 w-1/2 h-full rounded-r-3xl overflow-hidden border-y border-r border-white/30 shadow-[inset_8px_0_30px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(255,255,255,0.08),12px_0_35px_rgba(0,0,0,0.9)]"
          style={{
            background: "radial-gradient(ellipse at 60% 45%, #141b2d 0%, #0a0e1a 55%, #04060d 100%)",
            transformOrigin: "right center",
          }}
        >
          {/* Dense Multi-Layer Organic Spider Silk Mesh (Right Half) */}
          <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 120 240" preserveAspectRatio="none">
            {/* Natural Drooping Silk Web Arcs (Contouring 3D Chrysalis) */}
            <path d="M 120 15 Q 60 30 0 25" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
            <path d="M 120 45 Q 55 65 0 58" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
            <path d="M 120 80 Q 50 105 0 95" fill="none" stroke="#cbd5e1" strokeWidth="1.3" opacity="0.8" />
            <path d="M 120 120 Q 45 145 0 135" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.95" />
            <path d="M 120 160 Q 50 185 0 175" fill="none" stroke="#cbd5e1" strokeWidth="1.3" opacity="0.8" />
            <path d="M 120 195 Q 55 215 0 205" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" />
            <path d="M 120 225 Q 60 235 0 230" fill="none" stroke="#ffffff" strokeWidth="1.1" opacity="0.75" />

            {/* Diagonal Braided Silk Strands & Cross-Web Spirals */}
            <path d="M 120 5 C 75 60, 35 120, 0 235" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.75" />
            <path d="M 120 50 C 70 110, 35 170, 0 215" fill="none" stroke="#cbd5e1" strokeWidth="1.0" opacity="0.65" />
            <path d="M 120 110 C 60 150, 30 190, 0 240" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
            <path d="M 120 195 C 60 145, 30 95, 0 25" fill="none" stroke="#ef4444" strokeWidth="1.3" opacity="0.6" />
            <path d="M 120 155 C 70 105, 40 55, 0 5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
            <path d="M 120 235 C 75 175, 35 85, 0 55" fill="none" stroke="#cbd5e1" strokeWidth="1.0" opacity="0.5" />

            {/* Organic Fibrous Silk Nodes */}
            <circle cx="70" cy="90" r="2.2" fill="#ffffff" opacity="0.9" />
            <circle cx="45" cy="145" r="2.5" fill="#ffffff" opacity="0.9" />
            <circle cx="80" cy="185" r="1.8" fill="#ffffff" opacity="0.8" />
          </svg>

          {/* Translucent Spun Silk Specular Sheen Layer */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/[0.06] to-white/[0.18] pointer-events-none" />
        </div>

        {/* ── Central Chrysalis Spider Medallion & Bio-Lock ── */}
        <div className="js-cocoon-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 pointer-events-none">
          {/* Diamond Spider Medallion with Chrome Bevel & Glowing Red Core */}
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-950/95 via-black/95 to-slate-950/95 border-2 border-red-500/80 flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.6),0_0_15px_rgba(56,189,248,0.4),inset_0_0_15px_rgba(255,255,255,0.3)] rotate-45">
            {/* Pulsing Outer Energy Rings */}
            <div className="absolute -inset-1.5 rounded-2xl border border-cyan-400/50 animate-pulse" />
            {/* Inner Rotating Radar Ring */}
            <div className="absolute inset-1 rounded-xl border border-red-400/40 animate-spin" style={{ animationDuration: "10s" }} />
            {/* Bold Glowing Spider Emblem */}
            <span className="text-3xl -rotate-45 select-none filter drop-shadow-[0_0_12px_#ef4444]">🕷️</span>
          </div>

          {/* Chrysalis Telemetry Pill */}
          <div className="px-4 py-1.5 rounded-full bg-black/95 border border-cyan-400/70 text-[10px] font-mono font-black text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.5)] tracking-wider uppercase whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping" />
            <span>SILK CHRYSALIS #{index + 1}</span>
          </div>
        </div>

        {/* Organic Jagged Seam Glow Line with Web Spiders */}
        <div className="js-cocoon-seam absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-cyan-400 via-white to-red-500 shadow-[0_0_18px_#ffffff] z-25 opacity-90" />
      </div>
      {/* Spiderweb Background Accent Lines */}
      <svg
        className="absolute -top-12 -right-12 w-48 h-48 opacity-[0.12] pointer-events-none text-red-400 group-hover:opacity-[0.22] group-hover:rotate-6 transition-all duration-500"
        viewBox="0 0 100 100"
      >
        <circle cx="100" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="0" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="0" r="75" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="0" r="100" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="25" y2="100" stroke="currentColor" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="0" y2="50" stroke="currentColor" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="0" y2="25" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      {/* Spiderweb Corner Filaments (Bottom-Left) */}
      <svg
        className="absolute -bottom-10 -left-10 w-36 h-36 opacity-[0.08] pointer-events-none text-cyan-400 group-hover:opacity-[0.18] transition-opacity duration-500"
        viewBox="0 0 100 100"
      >
        <circle cx="0" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      {/* ─── Header Row ─── */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-red-300/80">
              PROJECT #{index + 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-950/80 border border-red-500/40 text-red-300 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-400 group-hover:rotate-45 transition-all shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ─── Web Architecture Preview Box ─── */}
        <div
          className="h-32 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-red-500/20 group-hover:border-red-500/40 transition-colors"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(56, 189, 248, 0.08) 50%, rgba(8, 10, 18, 0.9) 100%)",
          }}
        >
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-300">
            <span className="flex items-center gap-1 text-red-300">
              <Activity className="w-3 h-3 text-red-400" />
              SYSTEM ARCHITECTURE
            </span>
            <span className="text-cyan-400/90 font-mono">CORE MODULE</span>
          </div>

          <div className="font-mono text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg border border-red-500/30 inline-block self-start shadow-[0_0_12px_rgba(239,68,68,0.2)]">
            {project.metrics?.[0] ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">{project.metrics[0].label}:</span>
                <span className="text-cyan-300 font-bold">{project.metrics[0].value}</span>
              </div>
            ) : (
              <span className="text-red-300">Production Build</span>
            )}
          </div>

          {/* Perspective Web Grid Floor */}
          <div className="absolute inset-0 tech-grid-bg opacity-25 pointer-events-none" />
        </div>
      </div>

      {/* ─── Title & One-Liner ─── */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white group-hover:text-red-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm mt-2.5 leading-relaxed text-slate-300 font-sans line-clamp-3">
          {project.oneLiner}
        </p>
      </div>

      {/* ─── Tech Stack + CTA ─── */}
      <div className="relative z-10">
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 group-hover:border-red-500/20 transition-colors">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-red-500/30 group-hover:text-red-200 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
          <span className="text-slate-400 group-hover:text-red-300 transition-colors">Inspect Web Telemetry</span>
          <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform">Spider-Deep Dive →</span>
        </div>
      </div>
    </div>
  );
}
