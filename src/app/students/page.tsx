"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConstellationBackground } from "@/components/backgrounds";
import {
  STUDENTS,
  getInitials,
  getStudentDomain,
  type Student,
} from "@/data/students";
import { PLATFORM_ORDER, PLATFORMS } from "@/components/students/platforms";
import studentStats from "@/data/student-stats.json";

type StudentStat = {
  githubContributions?: number;
  leetcodeSolved?: number;
  leetcodeSubmissions?: number;
};

const STATS = studentStats.students as Record<string, StudentStat>;
const NUMBER = new Intl.NumberFormat("en-US");

type SortKey = "roster" | "name" | "leetcode" | "contributions";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "roster", label: "Roster" },
  { key: "name", label: "A–Z" },
  { key: "leetcode", label: "LeetCode" },
  { key: "contributions", label: "Contributions" },
];

function StudentRow({ student, index }: { student: Student; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const domain = getStudentDomain(student);
  const accent = domain?.colorTheme.primary ?? "#818CF8";
  const accentRgb = domain?.colorTheme.rgb ?? "129, 140, 248";
  const links = PLATFORM_ORDER.filter((key) => student.links[key]);
  const stats = STATS[student.slug] ?? {};

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }}
      className="border-t border-white/[0.06] first:border-t-0"
    >
      <div
        ref={rowRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] sm:px-6 sm:py-5"
      >
        {hovered && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(520px circle at ${pointer.x}px ${pointer.y}px, rgba(${accentRgb}, 0.07), transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={`/students/${student.slug}`}
            aria-label={`Open full profile for ${student.name}`}
            className="flex min-w-0 flex-1 items-center gap-4 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            <div className="relative flex-shrink-0">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-sm font-black tracking-tight transition-all duration-300 group-hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(145deg, rgba(${accentRgb}, 0.2), rgba(${accentRgb}, 0.03))`,
                  borderColor: `rgba(${accentRgb}, 0.3)`,
                  color: accent,
                }}
              >
                {getInitials(student.name)}
              </div>
              <span
                className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full ring-2 ring-[#080b12]"
                style={{ backgroundColor: accent }}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-lg font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-xl">
                  {student.name}
                </h3>
                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-500 transition-all duration-300 group-hover:text-slate-200 sm:text-slate-600 sm:opacity-0 sm:group-hover:opacity-100" />
              </div>
              {(student.role || domain) && (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                  {student.role && <span>{student.role}</span>}
                  {student.role && domain && <span className="text-slate-600">/</span>}
                  {domain && <span style={{ color: accent }}>{domain.shortName}</span>}
                </div>
              )}
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-1.5 pl-16 sm:justify-end sm:pl-0">
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
                  title={`${meta.label} · ${student.links[key]}`}
                  className="group/chip inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[11px] font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                  {meta.label}
                  {key === "github" && stats.githubContributions !== undefined && (
                    <span className="font-mono text-[10px] tabular-nums text-slate-500">
                      {NUMBER.format(stats.githubContributions)}
                    </span>
                  )}
                  {key === "leetcode" && stats.leetcodeSolved !== undefined && (
                    <span className="font-mono text-[10px] tabular-nums text-slate-500">
                      {NUMBER.format(stats.leetcodeSolved)}
                    </span>
                  )}
                </a>
              );
            })}

            {links.length === 0 && (
              <span className="font-sans text-[11px] text-slate-500">
                No public links. Ask the placement desk.
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function StudentsPage() {
  const [sort, setSort] = useState<SortKey>("roster");

  const sortedStudents = useMemo(() => {
    const list = [...STUDENTS];
    switch (sort) {
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "leetcode":
        return list.sort(
          (a, b) =>
            (STATS[b.slug]?.leetcodeSolved ?? -1) - (STATS[a.slug]?.leetcodeSolved ?? -1) ||
            a.name.localeCompare(b.name)
        );
      case "contributions":
        return list.sort(
          (a, b) =>
            (STATS[b.slug]?.githubContributions ?? -1) -
              (STATS[a.slug]?.githubContributions ?? -1) || a.name.localeCompare(b.name)
        );
      default:
        return list;
    }
  }, [sort]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050608] text-white selection:bg-indigo-500 selection:text-white">
      <ConstellationBackground opacity={0.4} particleCount={55} maxDistance={130} />
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-[0.18]" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-grow px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
              <UserRound className="h-3.5 w-3.5 text-indigo-400" />
              Batch 2027 · Department of CSE
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              The collective
              <span className="block text-slate-500">roster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-slate-400 sm:text-base"
            >
              Every public link sits on the row, so nothing needs a click. A student may share a
              portfolio, a GitHub, a coding profile, a LinkedIn page, or none of them.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex shrink-0 items-end gap-8 lg:border-l lg:border-white/[0.08] lg:pl-8"
          >
            <div>
              <div className="font-mono text-3xl font-black tracking-tight text-white sm:text-4xl">
                {String(STUDENTS.length).padStart(2, "0")}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Profiles live
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Open
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                For recruitment
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] text-slate-500">
            GitHub counts cover the last 12 months. LeetCode counts are accepted solutions.
          </p>
          <div
            role="group"
            aria-label="Sort roster"
            className="flex flex-wrap items-center gap-1 self-start rounded-full border border-white/[0.08] bg-white/[0.02] p-1 sm:self-auto"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSort(option.key)}
                aria-pressed={sort === option.key}
                className={`min-h-10 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none sm:min-h-0 ${
                  sort === option.key
                    ? "bg-white/10 text-white"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080b12]/70 backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
          />
          <div className="hidden items-center justify-between border-b border-white/[0.06] px-6 py-3 sm:flex">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">
              Student
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">
              Public links
            </span>
          </div>
          {sortedStudents.length > 0 ? (
            <ul>
              {sortedStudents.map((student, index) => (
                <StudentRow key={student.slug} student={student} index={index} />
              ))}
            </ul>
          ) : (
            <div className="px-6 py-16 text-center">
              <p className="font-sans text-sm text-slate-400">
                No profiles are published yet. Check back after the next collection pass.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Links open in a new tab · Profiles updated by the department
          </p>
          <Link
            href="/recruit"
            className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] py-2 pr-2 pl-5 font-mono text-[11px] font-bold tracking-wider text-slate-200 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-200"
          >
            Book a campus drive
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] transition-colors group-hover:bg-emerald-400 group-hover:text-black">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
