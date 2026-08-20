"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
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
}

const milestones: AchievementMilestone[] = [
  {
    years: ["2025", "2026"],
    title: "Two-Time Overall Champions at GCT Coimbatore",
    category: "Hackathon",
    description:
      "Two-Time Overall Champions at Government College of Technology, Coimbatore, securing the championship title in two consecutive years.",
    metric: "2x Consecutive Champions",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
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
    title: "Top 500 Finalists at Niral Thiruvizha 2026",
    category: "Hackathon",
    description:
      "Two student teams selected among the Top 500 out of 24,411 registered teams at Niral Thiruvizha 2026.",
    metric: "Top 500 / 24,411 Teams",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
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
    name: "Generative AI Workshop (GUVI & HCL)",
    count: "2026",
    glowRgb: "236, 72, 153",
    color: "text-pink-400",
    bg: "from-pink-500/15 via-pink-950/20 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400",
    icon: Brain,
  },
  {
    name: "Oracle Java Learning Program",
    count: "2025",
    glowRgb: "244, 63, 94",
    color: "text-rose-400",
    bg: "from-rose-500/15 via-rose-950/20 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400",
    icon: Code2,
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
    name: "GCT Coimbatore Overall Trophy",
    count: "2025 & 2026",
    glowRgb: "245, 158, 11",
    color: "text-amber-400",
    bg: "from-amber-500/15 via-amber-950/20 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400",
    icon: Trophy,
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
            className="p-6 rounded-3xl bg-[#0c0f18]/50 border border-amber-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">2x</div>
            <div className="text-sm font-semibold text-amber-300 mt-1">Overall Champions</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">GCT Coimbatore (2025 &amp; 2026)</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/50 border border-purple-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">Top 500</div>
            <div className="text-sm font-semibold text-purple-300 mt-1">Niral Thiruvizha 2026</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">2 teams out of 24,411 registered</div>
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
                  {/* Square Year Box (Clean without Q3/Q4, stacked 2025/2026 for GCT) */}
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

                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-300 font-bold whitespace-nowrap self-end sm:self-center">
                  {item.metric}
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
        <div className="text-center">
          <Link
            href="/recruit"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
          >
            <span>Proceed to Recruiter Placement Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
