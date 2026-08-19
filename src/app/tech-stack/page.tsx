"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  RotateCw,
  X,
  Layers,
  Cpu,
  Globe,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { IconCloud } from "@/components/magicui/icon-cloud";

const allSlugs = [
  // Core Languages & Foundations
  "typescript",
  "javascript",
  "dart",
  "java",
  "python",
  "rust",
  "go",
  "cplusplus",
  "c",
  "html5",
  "css3",

  // Modern Frameworks & Libraries
  "react",
  "flutter",
  "android",
  "nodedotjs",
  "express",
  "nextdotjs",
  "fastapi",
  "tailwindcss",
  "framer",
  "graphql",

  // Cloud, DevOps & Platforms
  "docker",
  "kubernetes",
  "terraform",
  "amazonaws",
  "helm",
  "prometheus",
  "grafana",
  "nginx",
  "vercel",
  "firebase",

  // Databases & Backend Architecture
  "postgresql",
  "mongodb",
  "redis",
  "prisma",

  // AI, Deep Learning & Computer Vision
  "pytorch",
  "huggingface",
  "opencv",

  // QA, Testing & Static Analysis
  "testinglibrary",
  "jest",
  "cypress",
  "sonarqube",
  "postman",

  // Version Control, Collaboration & IDEs
  "git",
  "github",
  "gitlab",
  "jira",
  "visualstudiocode",
  "androidstudio",

  // UI/UX Design, Security & Edge Hardware
  "figma",
  "storybook",
  "kalilinux",
  "wireshark",
  "raspberrypi",
  "espressif",
];

const categoryFilters = [
  { label: "All Technologies", key: "all" },
  { label: "Languages", key: "languages", slugs: ["typescript", "javascript", "dart", "java", "python", "rust", "go", "cplusplus", "c", "html5", "css3"] },
  { label: "Frameworks & Web", key: "frameworks", slugs: ["react", "flutter", "android", "nodedotjs", "express", "nextdotjs", "fastapi", "tailwindcss", "framer", "graphql"] },
  { label: "Cloud & DevOps", key: "cloud", slugs: ["docker", "kubernetes", "terraform", "amazonaws", "helm", "prometheus", "grafana", "nginx", "vercel", "firebase"] },
  { label: "Databases & Data", key: "data", slugs: ["postgresql", "mongodb", "redis", "prisma"] },
  { label: "AI & ML", key: "aiml", slugs: ["pytorch", "huggingface", "opencv"] },
  { label: "Design & Security", key: "tools", slugs: ["figma", "storybook", "kalilinux", "wireshark", "raspberrypi", "espressif", "visualstudiocode", "git", "github"] },
];

export default function TechStackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter slugs based on active category & search query
  const filteredSlugs = useMemo(() => {
    let result = allSlugs;

    if (selectedFilter !== "all") {
      const activeCat = categoryFilters.find((c) => c.key === selectedFilter);
      if (activeCat && activeCat.slugs) {
        result = result.filter((slug) => activeCat.slugs.includes(slug));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((slug) => slug.toLowerCase().includes(q));
    }

    return result.length > 0 ? result : allSlugs;
  }, [selectedFilter, searchQuery]);

  const images = useMemo(() => {
    return filteredSlugs.map(
      (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
    );
  }, [filteredSlugs]);

  return (
    <div className="relative w-full h-screen bg-[#040508] text-white overflow-hidden flex flex-col justify-between">
      {/* Global Navigation */}
      <Navbar />

      {/* Dynamic Background Tech Grids & Soft Radial Ambient Glow */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Header UI Controls & Search */}
      <div className="relative z-20 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/70 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl pointer-events-auto shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[11px] font-mono text-indigo-300 mb-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>COHORT SKILL GALAXY // 3D TOPOLOGY</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Technology Stack Universe
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              {allSlugs.length} verified technologies mastered across 60 engineers · Interactive 3D Icon Cloud
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter technology (e.g., Python, Docker, Figma)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 mt-3">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedFilter(cat.key)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedFilter === cat.key
                  ? "bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400"
                  : "bg-black/60 text-slate-400 border border-white/10 hover:text-white hover:border-white/20 backdrop-blur-md"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-[11px] font-mono text-slate-500 ml-2">
            Showing {filteredSlugs.length} icons
          </span>
        </div>
      </div>

      {/* 3D Interactive IconCloud Spherical Centerpiece */}
      <div className="relative z-10 flex-grow flex items-center justify-center w-full px-4 max-h-[62vh]">
        <div className="relative flex size-full max-w-3xl items-center justify-center overflow-hidden">
          <IconCloud images={images} />
        </div>
      </div>

      {/* Interactive Drag & Recruiter Telemetry Cue */}
      <div className="relative z-20 pb-5 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md pointer-events-auto">
          <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>DRAG SPHERE TO ROTATE · HOVER TO TILT · 3D ICON CLOUD</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ANONYMIZED COHORT CAPABILITIES</span>
        </div>
      </div>
    </div>
  );
}
