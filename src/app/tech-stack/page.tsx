"use client";

import React, { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Layers,
  Users,
  FolderGit2,
  X,
  ExternalLink,
  RotateCw,
  Sparkles,
  Info,
  ChevronRight,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import TechGalaxyScene from "@/components/galaxy/TechGalaxyScene";
import { getAggregatedTechStack, AggregatedTech } from "@/utils/techAggregation";
import { DOMAINS, PROJECTS } from "@/data/domains";

const categories = [
  "All",
  "Language",
  "Framework",
  "Cloud & DevOps",
  "AI & ML",
  "Systems & Embedded",
  "Security & Data",
];

export default function TechStackGalaxyPage() {
  const techList = useMemo(() => getAggregatedTechStack(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<AggregatedTech | null>(null);
  const [hoveredTech, setHoveredTech] = useState<AggregatedTech | null>(null);

  // Active tech to display in panel is selectedTech or hoveredTech fallback
  const activeTech = selectedTech || hoveredTech;

  // Filtered tech count
  const matchingCount = useMemo(() => {
    return techList.filter((tech) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        tech.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        selectedCategory === "All" || tech.category === selectedCategory;
      return matchSearch && matchCat;
    }).length;
  }, [techList, searchQuery, selectedCategory]);

  return (
    <div className="relative w-full h-screen bg-[#050608] text-white overflow-hidden flex flex-col justify-between">
      {/* Global Navigation */}
      <Navbar />

      {/* 3D WebGL Galaxy Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 14], fov: 45, near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <TechGalaxyScene
              techList={techList}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedTech={selectedTech}
              onSelectTech={(tech) => setSelectedTech(tech)}
              hoveredTech={hoveredTech}
              onHoverTech={(tech) => setHoveredTech(tech)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

      {/* Header UI Controls & Search Overlay */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>COHORT SKILL GALAXY // 3D TOPOLOGY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technology Stack Universe
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              {techList.length} Technologies Mastered Across 60 Engineers · Node scale proportional to cohort proficiency
            </p>
          </div>

          {/* Search Input */}
          <div className="pointer-events-auto flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technology (e.g., PyTorch, Rust, Docker)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400"
                  : "bg-black/50 text-slate-400 border border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[11px] font-mono text-slate-500 ml-2">
            Showing {matchingCount} of {techList.length} nodes
          </span>
        </div>
      </div>

      {/* Orbit Controls Hint / Recruiter Tooltip */}
      <div className="relative z-10 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>DRAG TO ORBIT · SCROLL TO ZOOM · CLICK NODE FOR DEEP DIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>ANONYMIZED COHORT TELEMETRY</span>
        </div>
      </div>

      {/* Sliding Detailed Info Panel (Right Side) */}
      <AnimatePresence>
        {activeTech && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-24 right-4 sm:right-8 z-30 w-80 sm:w-96 rounded-3xl bg-[#0d101a]/90 border border-white/15 p-6 shadow-2xl backdrop-blur-xl text-white pointer-events-auto"
            style={{
              boxShadow: `0 20px 50px -15px ${activeTech.color}40`,
            }}
          >
            {/* Panel Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {activeTech.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
                  {activeTech.name}
                </h3>
              </div>

              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="w-7 h-7 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Proficiency Meter */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  Cohort Proficiency:
                </span>
                <strong className="text-white font-bold">
                  {activeTech.studentCount} / 60 Engineers
                </strong>
              </div>
              <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(activeTech.studentCount / 60) * 100}%`,
                    backgroundColor: activeTech.color,
                    boxShadow: `0 0 10px ${activeTech.color}`,
                  }}
                />
              </div>
            </div>

            {/* Associated Domains */}
            <div className="mb-4">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                ACTIVE IN DOMAINS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTech.domainIds.map((domainId, idx) => {
                  const domain = DOMAINS.find((d) => d.id === domainId);
                  if (!domain) return null;
                  return (
                    <Link
                      key={idx}
                      href={`/domain/${domain.id}`}
                      className="group flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 text-slate-200 hover:text-white transition-all"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: domain.colorTheme.primary }}
                      />
                      <span>{domain.shortName}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Production Projects Tag */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                Deployed Projects:
              </span>
              <span className="font-bold text-white">
                {activeTech.projectCount} System Repositories
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
