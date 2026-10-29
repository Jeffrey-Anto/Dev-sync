"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  Brain,
  Code2,
  Cpu,
  CheckCircle2,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraMeshBackground } from "@/components/backgrounds";
import AntigravityField from "@/components/AntigravityField";

interface AchievementMilestone {
  years: string[];
  title: string;
  category: "Hackathon" | "Competitive Coding" | "Certifications" | "Internships" | "Campus Solutions";
  description: string;
  metric: string;
  badgeColor: string;
  imageUrl?: string;
}

const milestones: AchievementMilestone[] = [
  {
    years: ["2026"],
    title: "Niral Thiruvizha 3.0 — Grand Finale",
    category: "Hackathon",
    description:
      "Both teams selected among the Top 100 out of 24,411 registered teams and participated in the Grand Finale.",
    metric: "Top 100 / 24,411 Teams",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    imageUrl: "/achievements/niral-thiruvizha.jpg",
  },
  {
    years: ["2025", "2026"],
    title: "Two-Time Overall Champions at GCT Coimbatore",
    category: "Hackathon",
    description:
      "Two-Time Overall Champions at Government College of Technology, Coimbatore, securing the championship title in two consecutive years.",
    metric: "2x Consecutive Champions",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    imageUrl: "/achievements/gct-champions.jpg",
  },
  {
    years: ["2026"],
    title: "First Prize at Cipher Lab AI National Hackathon",
    category: "Hackathon",
    description:
      "First Prize at Cipher Lab AI, a National-Level Hackathon, secured by CSE students.",
    metric: "1st Prize Winner",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    years: ["2026"],
    title: "100% Cohort Internship Achievement",
    category: "Internships",
    description:
      "100% Internship Achievement, with every eligible student successfully securing internship opportunities.",
    metric: "100% Verified Placements",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    years: ["2026"],
    title: "Student-Built Campus Solutions Deployed",
    category: "Campus Solutions",
    description:
      "Student-Built Campus Solutions — Our students have successfully designed, developed, and deployed innovative applications such as the Hostel App, BloodLine, Mess Reduction App, and No Due App, helping streamline and enhance campus operations.",
    metric: "4 Campus Systems Live",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    imageUrl: "/achievements/campus-solutions.jpg",
  },
  {
    years: ["2026"],
    title: "Generative AI Skillset Workshop with GUVI & HCL",
    category: "Certifications",
    description:
      "Generative AI Skillset Workshop conducted for department students in association with GUVI and HCL, strengthening their knowledge of emerging AI technologies.",
    metric: "GUVI & HCL Certified",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  },
  {
    years: ["2025"],
    title: "Oracle Java Learning Program",
    category: "Certifications",
    description:
      "Oracle Java Learning Program — Department students successfully participated in an online Java learning program conducted by Oracle.",
    metric: "Oracle Validated",
    badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    imageUrl: "/achievements/oracle-java.jpg",
  },
];

interface SummaryCardItem {
  name: string;
  count: string;
  glowRgb: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ComponentType<{ className?: string }>;
}

const summaryCards: SummaryCardItem[] = [
  {
    name: "Niral Thiruvizha 3.0 — Grand Finale",
    count: "2026",
    glowRgb: "168, 85, 247",
    color: "text-purple-400",
    bg: "from-purple-500/15 via-purple-950/20 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400",
    icon: Trophy,
  },
  {
    name: "GCT Coimbatore Overall Trophy",
    count: "2025 & 2026",
    glowRgb: "245, 158, 11",
    color: "text-amber-400",
    bg: "from-amber-500/15 via-amber-950/20 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400",
    icon: Trophy,
  },
  {
    name: "Cipher Lab AI National Hackathon",
    count: "2026",
    glowRgb: "16, 185, 129",
    color: "text-emerald-400",
    bg: "from-emerald-500/15 via-emerald-950/20 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400",
    icon: Cpu,
  },
  {
    name: "Generative AI Workshop (GUVI & HCL)",
    count: "2026",
    glowRgb: "236, 72, 153",
    color: "text-pink-400",
    bg: "from-pink-500/15 via-pink-950/20 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400",
    icon: Brain,
  },
];

// Interactive Spotlight Summary Card
function InteractiveSummaryCard({ item, index }: { item: SummaryCardItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-gradient-to-r ${item.bg} p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
      style={{
        boxShadow: isHovered ? `0 0 30px rgba(${item.glowRgb}, 0.25)` : "none",
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${item.glowRgb}, 0.2), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className="p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0"
            style={{
              backgroundColor: `rgba(${item.glowRgb}, 0.12)`,
              borderColor: `rgba(${item.glowRgb}, 0.35)`,
            }}
          >
            <Icon className={`w-5 h-5 ${item.color}`} />
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-slate-100 transition-colors">
              {item.name}
            </h4>
            <span className="text-xs font-mono text-slate-400">
              Department of CSE · Achievements
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="w-2 h-2 rounded-full animate-pulse hidden sm:block"
            style={{ backgroundColor: `rgb(${item.glowRgb})` }}
          />
          <div
            className={`text-sm sm:text-base font-black font-mono px-3 py-1 rounded-xl bg-black/40 border border-white/10 ${item.color} group-hover:scale-105 transition-transform`}
          >
            {item.count}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementsPage() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between overflow-hidden">
      {/* Official Google Antigravity Swirl Particle Vortex Background - Clean & Spacious */}
      <AntigravityField
        particleDensity={0.8}
        interactiveRadius={340}
        opacity={0.95}
      />

      {/* Global Navigation */}
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">

        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          {/* Ambient Header Glow Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[140px] bg-gradient-to-r from-amber-500/20 via-pink-500/25 to-cyan-500/20 rounded-full blur-[90px] pointer-events-none -z-10" />

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-pink-500/10 to-indigo-500/15 border border-amber-500/30 text-xs font-mono text-amber-300 mb-5 shadow-lg backdrop-blur-md"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-bold tracking-wider">COHORT MERIT &amp; TECHNICAL EXCELLENCE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]"
          >
            Collective{" "}
            <span className="inline-block animate-deep-color-flow font-black tracking-tight">
              Achievements
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-300 mt-5 font-sans font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Verified competitive symposium championships, national hackathon podiums, industry skill certifications,
            and deployed campus software solutions by our CSE cohort.
          </motion.p>
        </div>

        {/* Key Aggregate Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setSelectedImage({ url: "/achievements/niral-thiruvizha.jpg", title: "Niral Thiruvizha 3.0 — Grand Finale (Top 100 Nationwide)" })}
            className="p-6 rounded-3xl bg-[#0c0f18]/60 border border-purple-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-400 transition-all cursor-pointer"
          >
            {/* Subtle Photo Background Glow on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/achievements/niral-thiruvizha.jpg')` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/70 px-2 py-0.5 rounded-md border border-purple-500/30">
                  <ZoomIn className="w-3 h-3" /> Photo
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">Top 100</div>
              <div className="text-sm font-semibold text-purple-300 mt-1">Niral Thiruvizha 3.0</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Both teams in Grand Finale (out of 24,411)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedImage({ url: "/achievements/gct-champions.jpg", title: "Two-Time Overall Champions at GCT Coimbatore" })}
            className="p-6 rounded-3xl bg-[#0c0f18]/60 border border-amber-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all cursor-pointer"
          >
            {/* Subtle Photo Background Glow on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/achievements/gct-champions.jpg')` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-500/30">
                  <ZoomIn className="w-3 h-3" /> Photo
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">2x</div>
              <div className="text-sm font-semibold text-amber-300 mt-1">Overall Champions</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">GCT Coimbatore (2025 &amp; 2026)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/50 border border-emerald-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">1st Prize</div>
            <div className="text-sm font-semibold text-emerald-300 mt-1">Cipher Lab AI Hackathon</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">National-level Hackathon (2026)</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/50 border border-cyan-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">100%</div>
            <div className="text-sm font-semibold text-cyan-300 mt-1">Internship Achievement</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Every eligible student (2026)</div>
          </motion.div>
        </div>

        {/* Chronological Competition & Rigor Milestones */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>VERIFIED TRACK RECORD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Chronological Competition &amp; Rigor Milestones
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                Timeline demonstrating technical competition achievements, upskilling, and deployed campus solutions.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#0c0f18]/45 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  {/* Square Year Box */}
                  <div className="flex flex-col items-center justify-center min-w-[4.25rem] px-2 py-3 rounded-2xl bg-slate-900/90 border border-white/10 flex-shrink-0 font-mono shadow-inner">
                    {item.years.map((yr, yIdx) => (
                      <span
                        key={yIdx}
                        className="text-sm font-black text-indigo-400 leading-tight"
                      >
                        {yr}
                      </span>
                    ))}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border font-semibold ${item.badgeColor}`}>
                        {item.category.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Photo Thumbnail if available */}
                  {item.imageUrl && (
                    <button
                      onClick={() => setSelectedImage({ url: item.imageUrl!, title: item.title })}
                      className="group/thumb relative w-20 h-12 sm:w-24 sm:h-14 rounded-xl overflow-hidden border border-white/20 hover:border-amber-400/80 transition-all shadow-md shrink-0 cursor-pointer"
                      title="Click to view full photo"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover/thumb:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-3.5 h-3.5 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  )}

                  <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-300 font-bold whitespace-nowrap">
                    {item.metric}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certification & Program Portfolio with Interactive Spotlight Cards */}
        <section className="rounded-3xl bg-[#0b0e17]/80 border border-white/10 p-8 sm:p-10 backdrop-blur-xl mb-16 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>INDUSTRY PROGRAMS &amp; UPSKILLING</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-6">
            Key Upskilling &amp; Competition Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {summaryCards.map((card, cIdx) => (
              <InteractiveSummaryCard key={card.name} item={card} index={cIdx} />
            ))}
          </div>
        </section>

        {/* CTA to Recruit Us */}
        <div className="text-center pt-6 pb-4">
          <Link
            href="/recruit"
            className="group relative inline-flex items-center justify-center p-[2px] rounded-2xl transition-all duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer"
          >
            {/* Ambient Multi-Hue Pulsing Aura */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-60 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:blur-2xl animate-pulse" />

            {/* Continuous Gradient Border Ring */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px]" />

            {/* Inner Obsidian Glass Body */}
            <span className="relative z-10 px-8 py-4 rounded-2xl bg-[#070a14]/90 text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center gap-3 overflow-hidden shadow-2xl backdrop-blur-2xl transition-colors duration-300 group-hover:bg-[#0c1022]">
              {/* Top Glass Refraction Highlight */}
              <span className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />

              {/* Dynamic Sliding Light Gleam Streak */}
              <span className="absolute -left-[100%] top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out pointer-events-none" />

              {/* Live Cyan Radar Indicator */}
              <span className="relative flex h-2 w-2 items-center justify-center flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              </span>

              <span className="relative z-10 group-hover:text-cyan-200 transition-colors">
                Proceed to Recruiter Placement Desk
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 text-cyan-400 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
            </span>
          </Link>
        </div>
      </main>

      {/* Lightbox Modal (mounted via Portal to document.body, z-[99999]) */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  className="relative z-10 max-w-4xl w-full bg-[#0a0d16] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[82vh] my-auto"
                >
                  <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-white/10 flex items-start justify-between bg-slate-950/95 backdrop-blur-md gap-4 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                        {selectedImage.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      aria-label="Close preview"
                      className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden p-3 sm:p-5">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.title}
                      className="max-h-[55vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </div>

                  <div className="px-6 py-2.5 sm:py-3 border-t border-white/10 bg-slate-950/95 flex items-center justify-end text-[11px] font-mono text-slate-500 flex-shrink-0">
                    <span>PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <Footer />
    </div>
  );
}
