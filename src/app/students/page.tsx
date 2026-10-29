"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConstellationBackground } from "@/components/backgrounds";
import {
  STUDENTS,
  getInitials,
  getLinkHandle,
  getLinkHost,
  getStudentDomain,
  type Student,
} from "@/data/students";
import { PLATFORM_ORDER, PLATFORMS } from "@/components/students/platforms";

function StudentCard({ student, index }: { student: Student; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const domain = getStudentDomain(student);
  const accent = domain?.colorTheme.primary ?? "#818CF8";
  const accentRgb = domain?.colorTheme.rgb ?? "129, 140, 248";
  const skills = student.skills ?? [];
  const links = PLATFORM_ORDER.filter((key) => student.links[key]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d15]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25"
        style={{
          boxShadow: hovered
            ? `0 24px 60px -24px rgba(${accentRgb}, 0.45), 0 0 0 1px rgba(${accentRgb}, 0.25)`
            : "0 12px 40px -32px rgba(0,0,0,0.9)",
        }}
      >
        {hovered && (
          <div
            className="pointer-events-none absolute -inset-px"
            style={{
              background: `radial-gradient(320px circle at ${pointer.x}px ${pointer.y}px, rgba(${accentRgb}, 0.16), transparent 68%)`,
            }}
          />
        )}

        <div
          className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: `rgba(${accentRgb}, 0.35)` }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div className="relative">
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border font-mono text-xl font-black tracking-tight"
              style={{
                background: `linear-gradient(145deg, rgba(${accentRgb}, 0.22), rgba(${accentRgb}, 0.04))`,
                borderColor: `rgba(${accentRgb}, 0.35)`,
                color: accent,
              }}
            >
              {getInitials(student.name)}
              <span
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 60%)`,
                }}
              />
            </div>
            <span
              className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full ring-2 ring-[#0a0d15]"
              style={{ backgroundColor: accent }}
            />
          </div>

          <Link
            href={`/students/${student.slug}`}
            aria-label={`Open full profile for ${student.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative z-10 mt-6">
          <h3 className="text-lg font-bold tracking-tight text-white">{student.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
              {student.role ?? "CSE · Batch 2027"}
            </p>
            {domain && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                style={{
                  borderColor: `rgba(${accentRgb}, 0.28)`,
                  backgroundColor: `rgba(${accentRgb}, 0.08)`,
                  color: accent,
                }}
              >
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
                {domain.shortName}
              </span>
            )}
          </div>
        </div>

        {student.tagline && (
          <p className="relative z-10 mt-4 line-clamp-2 font-sans text-sm leading-relaxed text-slate-400">
            {student.tagline}
          </p>
        )}

        {skills.length > 0 && (
          <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-400"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 mt-5 space-y-1.5">
          {links.map((key) => {
            const meta = PLATFORMS[key];
            const Icon = meta.icon;
            const url = student.links[key] as string;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${student.name} on ${meta.label}`}
                className="group/link flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border"
                  style={{
                    borderColor: `rgba(${accentRgb}, 0.25)`,
                    backgroundColor: `rgba(${accentRgb}, 0.08)`,
                    color: accent,
                  }}
                >
                  <Icon className="h-3 w-3" />
                </span>
                <span className="flex-shrink-0 text-xs font-semibold text-slate-200">
                  {meta.label}
                </span>
                <span className="min-w-0 flex-1 truncate text-right font-mono text-[10px] text-slate-500">
                  {key === "portfolio" ? getLinkHost(url) : `@${getLinkHandle(url)}`}
                </span>
                <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-slate-600 transition-colors group-hover/link:text-white" />
              </a>
            );
          })}

          {links.length === 0 && (
            <p className="rounded-xl border border-dashed border-white/10 px-3 py-3 font-sans text-xs leading-relaxed text-slate-500">
              No public links listed. Ask the placement desk for an introduction.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050608] text-white selection:bg-indigo-500 selection:text-white">
      <ConstellationBackground opacity={0.45} particleCount={60} maxDistance={130} />
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-20" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-grow px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto mb-14 max-w-4xl text-center">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[150px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-cyan-500/20 to-purple-500/20 blur-[90px]" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 font-mono text-[11px] text-indigo-300 backdrop-blur-md"
          >
            <UserRound className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-bold tracking-[0.18em]">THE ROSTER · BATCH 2027</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            The people behind
            <br />
            the <span className="animate-aurora-text inline-block">collective</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-slate-300 sm:text-base"
          >
            Every public link sits directly on the card — no extra clicks. A student may list a
            portfolio, GitHub, LeetCode or HackerRank handle, a LinkedIn profile, or none of them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest text-slate-400"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {STUDENTS.length} profiles live
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Open for recruitment
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENTS.map((student, index) => (
            <StudentCard key={student.slug} student={student} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/recruit"
            className="group relative inline-flex items-center justify-center rounded-2xl p-[1.5px] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-50 blur-xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-2xl" />
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px]" />
            <span className="relative z-10 flex items-center gap-3 rounded-2xl bg-[#070a14]/90 px-7 py-3.5 font-mono text-xs font-bold tracking-wider text-white backdrop-blur-2xl transition-colors group-hover:bg-[#0c1022]">
              Book a campus drive
              <ArrowRight className="h-4 w-4 text-cyan-400 transition-all group-hover:translate-x-1 group-hover:text-white" />
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
