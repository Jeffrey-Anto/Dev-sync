"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  ShieldCheck,
  Code2,
  Briefcase,
  Terminal,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Flame,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COHORT_STATS } from "@/data/domains";
import { AuroraMeshBackground } from "@/components/backgrounds";

interface AchievementMilestone {
  year: string;
  quarter: string;
  title: string;
  category: "Hackathon" | "Competitive Coding" | "Certifications" | "Internships";
  description: string;
  metric: string;
  badgeColor: string;
}

const milestones: AchievementMilestone[] = [
  {
    year: "2025",
    quarter: "Q4",
    title: "National Smart Automation Hackathon — 1st Place Champions",
    category: "Hackathon",
    description: "Built an autonomous edge-AI industrial defect detector pipeline operating at 120 FPS on embedded robotics, beating 450+ collegiate teams nationwide.",
    metric: "Grand Prize / $10,000",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    year: "2025",
    quarter: "Q3",
    title: "100% Cohort Internship Completion Milestone",
    category: "Internships",
    description: "All 60 CS undergraduates successfully completed full-time 6-month engineering internships across enterprise cloud providers, AI labs, and high-scale startups.",
    metric: "60 / 60 Engineers Verified",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    year: "2025",
    quarter: "Q2",
    title: "ICPC Regional Finalist Representation",
    category: "Competitive Coding",
    description: "Represented university across 3 separate 3-person competitive algorithm squads advancing into the national ICPC Regional onsite rounds.",
    metric: "Top 1.5% Percentile",
    badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "ETHIndia Web3 Distributed Systems Track Winners",
    category: "Hackathon",
    description: "Constructed a zero-knowledge succinct proof relayer for cross-chain state bridges with sub-second zk-SNARK verification times.",
    metric: "1st Place Track Winner",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "48+ Professional Industry Cloud & AI Certifications",
    category: "Certifications",
    description: "Rigorous cohort benchmark validation including AWS Certified Solutions Architects, Certified Kubernetes Administrators (CKA), and TensorFlow Professional Developers.",
    metric: "48 Verified Credentials",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "AWS GameDay Cloud Architecture Invitational",
    category: "Hackathon",
    description: "Architected a self-healing multi-region microservice topology enduring simulated DDoS floods, database failovers, and AZ blackouts.",
    metric: "2nd Place National Podium",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
];

const certificationBreakdown = [
  { name: "AWS Certified Solutions Architect & SysOps", count: 18, color: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5" },
  { name: "Certified Kubernetes Administrator (CKA / CKAD)", count: 12, color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-500/5" },
  { name: "TensorFlow & DeepLearning.AI Specializations", count: 14, color: "text-pink-400", bg: "from-pink-500/20 to-pink-500/5" },
  { name: "CompTIA Security+ & Offensive Security Foundational", count: 8, color: "text-rose-400", bg: "from-rose-500/20 to-rose-500/5" },
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
            <span>ANONYMIZED COHORT TELEMETRY & MERIT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Collective <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Achievements</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 font-sans font-normal leading-relaxed">
            Verified competitive programming ratings, national hackathon podiums, industry certifications,
            and 100% production internship completion across all 60 undergraduates.
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
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">14+</div>
            <div className="text-sm font-semibold text-amber-300 mt-1">National Hackathon Wins</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">1st & 2nd place podium finishes</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-emerald-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">100%</div>
            <div className="text-sm font-semibold text-emerald-300 mt-1">Internship Completion</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">60 / 60 engineers deployed in industry</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-cyan-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">48+</div>
            <div className="text-sm font-semibold text-cyan-300 mt-1">Industry Certifications</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">AWS, CKA, TensorFlow, CompTIA</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-indigo-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-indigo-400 transition-all"
          >
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">1850+</div>
            <div className="text-sm font-semibold text-indigo-300 mt-1">Avg LeetCode Rating</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Top 2% global algorithmic cohort</div>
          </motion.div>
        </div>

        {/* Milestone Timeline */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Chronological Competition & Rigor Milestones
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Audited cohort timeline demonstrating progressive technical depth over 3 years.
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#0c0f18]/80 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex-shrink-0 font-mono">
                    <span className="text-sm font-bold text-indigo-400">{item.year}</span>
                    <span className="text-[10px] text-slate-400">{item.quarter}</span>
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

        {/* Certification Matrix Grid */}
        <section className="rounded-3xl bg-[#0b0e17]/80 border border-white/10 p-8 sm:p-10 backdrop-blur-xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
            <Award className="w-4 h-4" />
            <span>INDUSTRY CERTIFICATION PORTFOLIO</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-6">
            Certified Competency Distribution
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificationBreakdown.map((cert, cIdx) => (
              <div
                key={cIdx}
                className={`p-5 rounded-2xl bg-gradient-to-r ${cert.bg} border border-white/10 flex items-center justify-between`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                  <span className="text-xs font-mono text-slate-400">Verified proctored examinations</span>
                </div>
                <div className={`text-2xl font-black font-mono ${cert.color}`}>
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
