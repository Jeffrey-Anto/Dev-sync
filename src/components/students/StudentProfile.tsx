"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  GitBranch,
  Globe,
  GraduationCap,
  Sparkles,
  UserRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConstellationBackground } from "@/components/backgrounds";
import {
  getInitials,
  getLinkHandle,
  getStudentDomain,
  type Student,
  type StudentLinks,
} from "@/data/students";

type PlatformKey = keyof StudentLinks;

const PLATFORMS: Record<
  PlatformKey,
  { label: string; blurb: string; cta: string; icon: React.ComponentType<{ className?: string }> }
> = {
  portfolio: {
    label: "Portfolio",
    blurb: "Case studies, writing, and the work shipped end to end.",
    cta: "Open portfolio",
    icon: Globe,
  },
  github: {
    label: "GitHub",
    blurb: "Source, commit history, and open-source contributions.",
    cta: "Open GitHub",
    icon: GitBranch,
  },
  leetcode: {
    label: "LeetCode",
    blurb: "Problem-solving record and contest consistency.",
    cta: "Open LeetCode",
    icon: Code2,
  },
};

const PLATFORM_ORDER: PlatformKey[] = ["portfolio", "github", "leetcode"];

const BARCODE_WIDTHS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 3, 2, 1, 4, 2, 1, 2, 1, 3, 1, 2, 4, 1, 2];

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = Number(value);
    if (!Number.isFinite(target) || reduce) {
      node.textContent = value;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value : "0"}
    </span>
  );
}

function IdentityCard({ student, accent, accentRgb }: { student: Student; accent: string; accentRgb: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 18 });

  const available = PLATFORM_ORDER.filter((key) => student.links[key]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="perspective-container relative mx-auto w-full max-w-sm">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[40px] blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 40%, rgba(${accentRgb}, 0.28), transparent 70%)` }}
      />

      <motion.div
        aria-hidden
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative rounded-[28px] border border-white/12 bg-gradient-to-b from-[#111524]/95 via-[#0a0d16]/95 to-[#070a12]/95 p-7 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] tech-grid-bg opacity-[0.35]" />

        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-24 opacity-[0.12]"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${accentRgb}, 0.35), transparent)`,
            }}
            animate={{ top: ["-20%", "110%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        )}

        <span className="pointer-events-none absolute top-4 left-4 h-5 w-5 rounded-tl-lg border-t border-l border-white/25" />
        <span className="pointer-events-none absolute top-4 right-4 h-5 w-5 rounded-tr-lg border-t border-r border-white/25" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 rounded-bl-lg border-b border-l border-white/25" />
        <span className="pointer-events-none absolute right-4 bottom-4 h-5 w-5 rounded-br-lg border-b border-r border-white/25" />

        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
          <span>Student ID</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Verified
          </span>
        </div>

        <div className="relative z-10 mt-8 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: `rgba(${accentRgb}, 0.35)` }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-3 rounded-full border"
              style={{ borderColor: `rgba(${accentRgb}, 0.18)` }}
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              aria-hidden
              className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="flex h-24 w-24 items-center justify-center rounded-3xl border font-mono text-4xl font-black tracking-tight"
              style={{
                background: `linear-gradient(150deg, rgba(${accentRgb}, 0.28), rgba(${accentRgb}, 0.05))`,
                borderColor: `rgba(${accentRgb}, 0.4)`,
                color: accent,
                textShadow: `0 0 30px rgba(${accentRgb}, 0.5)`,
              }}
            >
              {getInitials(student.name)}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-7 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white">{student.name}</h2>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {student.role}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{
              borderColor: `rgba(${accentRgb}, 0.3)`,
              backgroundColor: `rgba(${accentRgb}, 0.1)`,
              color: accent,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {getStudentDomain(student)?.shortName ?? "CSE"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            <GraduationCap className="h-3 w-3" />
            {student.year}
          </span>
        </div>

        <div className="relative z-10 mt-7 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
              Profiles listed
            </div>
            <div className="mt-1 font-mono text-xs text-slate-300">
              {available.length > 0 ? `${available.length} / 3 public` : "On request"}
            </div>
          </div>
          <div aria-hidden className="flex h-8 items-end gap-[3px] opacity-70">
            {BARCODE_WIDTHS.map((width, index) => (
              <span
                key={index}
                className="h-full rounded-[1px] bg-slate-500/70"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute -top-3 -right-2 hidden rounded-xl border border-white/15 bg-[#0b0f19]/90 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-widest text-slate-300 shadow-xl backdrop-blur-md sm:flex"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {student.slug.slice(0, 2).toUpperCase()}·{student.year.slice(-2)}
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute -bottom-4 -left-3 hidden rounded-xl border px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-widest shadow-xl backdrop-blur-md sm:flex"
        style={{
          borderColor: `rgba(${accentRgb}, 0.35)`,
          backgroundColor: `rgba(${accentRgb}, 0.12)`,
          color: accent,
        }}
        animate={reduce ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        CSE / {student.domainId.toUpperCase()}
      </motion.div>
    </div>
  );
}

function PlatformCard({ platform, url, accent, accentRgb }: {
  platform: PlatformKey;
  url: string;
  accent: string;
  accentRgb: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const meta = PLATFORMS[platform];
  const Icon = meta.icon;

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d15]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
      style={{ boxShadow: hovered ? `0 24px 60px -30px rgba(${accentRgb}, 0.5)` : "none" }}
    >
      {hovered && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(300px circle at ${pointer.x}px ${pointer.y}px, rgba(${accentRgb}, 0.16), transparent 65%)`,
          }}
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `rgba(${accentRgb}, 0.25)`, opacity: hovered ? 1 : 0.25 }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl border"
          style={{
            borderColor: `rgba(${accentRgb}, 0.3)`,
            backgroundColor: `rgba(${accentRgb}, 0.1)`,
            color: accent,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-500 transition-all duration-300 group-hover:border-white/25 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="relative z-10 mt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {meta.cta}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <h3 className="text-xl font-bold tracking-tight text-white">{meta.label}</h3>
          <span className="truncate font-mono text-xs text-slate-400">
            {platform === "portfolio" ? getLinkHandle(url) : `@${getLinkHandle(url)}`}
          </span>
        </div>
        <p className="mt-2 font-sans text-sm leading-relaxed text-slate-400">{meta.blurb}</p>
      </div>
    </a>
  );
}

export default function StudentProfile({ student }: { student: Student }) {
  const domain = getStudentDomain(student);
  const accent = domain?.colorTheme.primary ?? "#818CF8";
  const accentRgb = domain?.colorTheme.rgb ?? "129, 140, 248";

  const available = PLATFORM_ORDER.filter((key) => student.links[key]);
  const nameParts = student.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050608] text-white selection:bg-indigo-500 selection:text-white">
      <ConstellationBackground opacity={0.4} particleCount={55} maxDistance={130} />
      <div className="pointer-events-none absolute inset-0 tech-grid-bg opacity-20" />
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: `radial-gradient(ellipse at center, rgba(${accentRgb}, 0.16), transparent 65%)` }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 w-full -translate-x-1/2 text-center font-black leading-none tracking-tighter text-transparent opacity-[0.045] select-none"
        style={{ fontSize: "clamp(5rem, 18vw, 16rem)", WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
      >
        {student.name}
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-grow px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/students"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400 transition-all hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to roster
          </Link>
        </motion.div>

        <section className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                borderColor: `rgba(${accentRgb}, 0.3)`,
                backgroundColor: `rgba(${accentRgb}, 0.08)`,
                color: accent,
              }}
            >
              <UserRound className="h-3.5 w-3.5" />
              Profile · CSE &apos;27
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {firstName}{" "}
              <span className="animate-aurora-text inline-block">{lastName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-slate-400 sm:text-sm"
            >
              {student.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-6 max-w-xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {student.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-slate-400"
            >
              {student.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              {available.length > 0 ? (
                <a
                  href={student.links[available[0]]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 font-mono text-xs font-bold tracking-wider text-white transition-all hover:border-white/30 hover:bg-white/[0.1]"
                >
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(220px circle at 30% 50%, rgba(${accentRgb}, 0.25), transparent 70%)` }}
                  />
                  <Sparkles className="relative z-10 h-3.5 w-3.5" style={{ color: accent }} />
                  <span className="relative z-10">
                    {PLATFORMS[available[0]].cta.toUpperCase()}
                  </span>
                  <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link
                  href="/recruit"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-mono text-xs font-bold tracking-wider text-emerald-300 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/20"
                >
                  Request an introduction
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {domain && (
                <Link
                  href={`/domain/${domain.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 font-mono text-xs text-slate-300 transition-all hover:border-white/30 hover:text-white"
                >
                  Explore {domain.shortName}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </motion.div>
          </div>

          <IdentityCard student={student} accent={accent} accentRgb={accentRgb} />
        </section>

        {student.stats && student.stats.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {student.stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d15]/70 px-5 py-4 backdrop-blur-xl"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent, rgba(${accentRgb}, 0.6), transparent)` }}
                />
                <div className="font-mono text-2xl font-black text-white sm:text-3xl">
                  <CountUp value={stat.value} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.section>
        )}

        <section className="mt-20">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                Presence
              </div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Where the work lives
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {available.length} of 3 platforms listed
            </p>
          </div>

          {available.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((key, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <PlatformCard
                    platform={key}
                    url={student.links[key] as string}
                    accent={accent}
                    accentRgb={accentRgb}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d15]/70 p-8 backdrop-blur-xl sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/3 h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: `rgba(${accentRgb}, 0.18)` }}
              />
              <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300">
                    <UserRound className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">No public profiles listed</h3>
                    <p className="mt-1 max-w-md font-sans text-sm leading-relaxed text-slate-400">
                      This engineer keeps their work off public platforms. Ask the placement desk for a
                      direct introduction.
                    </p>
                  </div>
                </div>
                <Link
                  href="/recruit"
                  className="group inline-flex flex-shrink-0 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-mono text-[11px] font-bold tracking-wider text-emerald-300 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/20"
                >
                  Placement desk
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </section>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
            More from the collective
          </p>
          <Link
            href="/students"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-xs tracking-wider text-slate-300 transition-all hover:border-white/25 hover:text-white"
          >
            Browse all {""}
            <span className="text-white">profiles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
