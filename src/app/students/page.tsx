"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, UserRound } from "lucide-react";
import Footer from "@/components/Footer";
import { ConstellationBackground } from "@/components/backgrounds";
import { STUDENTS, getInitials, getGitHubAvatar, getStudentDomain, type Student } from "@/data/students";
import { PLATFORM_ORDER, PLATFORMS } from "@/components/students/platforms";
import studentStats from "@/data/student-stats.json";

type StudentStat = {
  githubContributions?: number;
  leetcodeSolved?: number;
  leetcodeSubmissions?: number;
};

const STATS = studentStats.students as Record<string, StudentStat>;
const NUMBER = new Intl.NumberFormat("en-US");

type SortKey = "name" | "leetcode" | "contributions";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name", label: "A–Z" },
  { key: "leetcode", label: "LeetCode" },
  { key: "contributions", label: "GitHub" },
];

function StudentRow({ student }: { student: Student }) {
  const domain = getStudentDomain(student);
  const accent = domain?.colorTheme.primary ?? "#818cf8";
  const accentRgb = domain?.colorTheme.rgb ?? "129, 140, 248";
  const links = PLATFORM_ORDER.filter((key) => student.links[key]);
  const stats = STATS[student.slug] ?? {};
  const [avatarFailed, setAvatarFailed] = useState(false);
  const avatarUrl = getGitHubAvatar(student);

  return (
    <li className="group relative rounded-xl transition-colors duration-200 hover:bg-white/[0.03]">
      <span
        aria-hidden
        className="absolute inset-y-3 left-0 w-0.5 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ backgroundColor: accent }}
      />

      <div className="flex flex-col gap-3 px-3 py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:px-5 lg:py-4">
        <Link
          href={`/students/${student.slug}`}
          aria-label={`Open full profile for ${student.name}`}
          className="flex min-w-0 items-center gap-3.5 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
        >
          <span
            className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border font-mono text-[13px] font-bold tracking-tight transition-transform duration-200 group-hover:scale-[1.03]"
            style={{
              background: `linear-gradient(145deg, rgba(${accentRgb}, 0.16), rgba(${accentRgb}, 0.03))`,
              borderColor: `rgba(${accentRgb}, 0.28)`,
              color: accent,
            }}
          >
            {avatarUrl && !avatarFailed ? (
              <img
                src={avatarUrl}
                alt={`${student.name} GitHub avatar`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              getInitials(student.name)
            )}
          </span>

          <span className="min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="truncate text-[17px] font-semibold tracking-tight text-slate-100 transition-colors duration-200 group-hover:text-white sm:text-lg">
                {student.name}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-slate-200" />
            </span>
            {(student.role || domain) && (
              <span className="mt-0.5 flex items-center gap-1.5 text-[13px] text-slate-400">
                {student.role && <span>{student.role}</span>}
                {student.role && domain && <span className="text-slate-600">·</span>}
                {domain && <span style={{ color: accent }}>{domain.shortName}</span>}
              </span>
            )}
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {links.map((key) => {
            const meta = PLATFORMS[key];
            const Icon = meta.icon;
            return (
              <a
                key={key}
                href={student.links[key] as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${student.name} on ${meta.label}`}
                title={`${meta.label} · ${student.links[key]}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
              >
                <Icon className="h-3.5 w-3.5 text-slate-400" />
                {meta.label}
                {key === "github" && stats.githubContributions !== undefined && (
                  <span className="font-mono text-[11px] tabular-nums text-slate-400">
                    {NUMBER.format(stats.githubContributions)}
                  </span>
                )}
                {key === "leetcode" && stats.leetcodeSolved !== undefined && (
                  <span className="font-mono text-[11px] tabular-nums text-slate-400">
                    {NUMBER.format(stats.leetcodeSolved)}
                  </span>
                )}
              </a>
            );
          })}

          {links.length === 0 && (
            <span className="text-xs text-slate-400">No public links yet</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default function StudentsPage() {
  const [sort, setSort] = useState<SortKey>("name");

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

  const counts = useMemo(
    () => ({
      github: STUDENTS.filter((s) => s.links.github).length,
      portfolios: STUDENTS.filter((s) => s.links.portfolio).length,
    }),
    []
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050608] text-white selection:bg-indigo-500 selection:text-white">
      <ConstellationBackground opacity={0.35} particleCount={55} maxDistance={130} />
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-[0.14]" />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-grow px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <header className="border-b border-white/[0.08] pb-8">
          <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <UserRound className="h-4 w-4 text-indigo-400" />
            Batch 2027 · Department of CSE
          </p>

          <h1 className="mt-3 text-balance font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            The 2027 roster.
          </h1>

          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-slate-400">
            Computer Science students at GCE Srirangam. Every public portfolio, repository, and
            coding profile they chose to share sits in one list.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-slate-300">
            <span>
              <span className="font-mono font-semibold tabular-nums text-white">
                {STUDENTS.length}
              </span>{" "}
              students
            </span>
            <span>
              <span className="font-mono font-semibold tabular-nums text-white">
                {counts.portfolios}
              </span>{" "}
              portfolios
            </span>
            <span>
              <span className="font-mono font-semibold tabular-nums text-white">
                {counts.github}
              </span>{" "}
              on GitHub
            </span>
          </div>
        </header>

        <div className="mt-6 mb-2 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-400">Sort by</span>
          <div
            role="group"
            aria-label="Sort roster"
            className="flex flex-wrap items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSort(option.key)}
                aria-pressed={sort === option.key}
                className={`h-8 rounded-full px-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${
                  sort === option.key
                    ? "bg-white text-[#050608]"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {sortedStudents.length > 0 ? (
          <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
            {sortedStudents.map((student) => (
              <StudentRow key={student.slug} student={student} />
            ))}
          </ul>
        ) : (
          <div className="border-y border-white/[0.06] px-6 py-16 text-center">
            <p className="text-sm text-slate-400">
              No profiles are published yet. Check back after the next collection pass.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-[46ch] text-xs leading-relaxed text-slate-400">
            GitHub counts are all-time. LeetCode counts are accepted solutions. Links open in a new
            tab.
          </p>
          <Link
            href="/recruit"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-1.5 pr-1.5 pl-5 text-[13px] font-semibold text-slate-100 transition-colors hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            Book a campus drive
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] transition-colors group-hover:bg-emerald-400 group-hover:text-black">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
