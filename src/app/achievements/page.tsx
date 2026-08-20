"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraMeshBackground } from "@/components/backgrounds";

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

const certificationBreakdown = [
  { name: "Generative AI Workshop (GUVI & HCL)", count: "2026", color: "text-pink-400", bg: "from-pink-500/20 to-pink-500/5" },
  { name: "Oracle Java Learning Program", count: "2025", color: "text-rose-400", bg: "from-rose-500/20 to-rose-500/5" },
  { name: "Cipher Lab AI National Hackathon", count: "2026", color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5" },
  { name: "GCT Coimbatore Overall Trophy", count: "2025 & 2026", color: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5" },
];

export default function AchievementsPage() {
  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between overflow-hidden">
      {/* Ambient Aurora Background */}
      <AuroraMeshBackground intensity="subtle" />

      {/* Global Navigation */}
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {/* Background Ambience */}
        <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>COHORT MERIT &amp; TECHNICAL EXCELLENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Collective <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Achievements</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 font-sans font-normal leading-relaxed">
            Verified competitive symposium championships, national hackathon podiums, industry skill certifications,
            and deployed campus software solutions by our CSE cohort.
          </p>
        </div>

        {/* Key Aggregate Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-amber-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all"
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
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-emerald-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition-all"
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
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-purple-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-400 transition-all"
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
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-cyan-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all"
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
                className="p-6 sm:p-8 rounded-3xl bg-[#0c0f18]/80 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
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

        {/* Certification & Program Portfolio */}
        <section className="rounded-3xl bg-[#0b0e17]/80 border border-white/10 p-8 sm:p-10 backdrop-blur-xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>INDUSTRY PROGRAMS &amp; UPSKILLING</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-6">
            Key Upskilling &amp; Competition Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificationBreakdown.map((cert, cIdx) => (
              <div
                key={cIdx}
                className={`p-5 rounded-2xl bg-gradient-to-r ${cert.bg} border border-white/10 flex items-center justify-between`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                  <span className="text-xs font-mono text-slate-400">Department of CSE · Achievements</span>
                </div>
                <div className={`text-sm sm:text-base font-black font-mono ${cert.color}`}>
                  {cert.count}
                </div>
              </div>
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
