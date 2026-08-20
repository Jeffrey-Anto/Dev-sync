"use client";

import React, { use, useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Terminal,
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Smartphone,
  ShieldAlert,
  Palette,
  Users,
  FolderGit2,
  Layers,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { DOMAINS, PROJECTS, Project } from "@/data/domains";
import DomainBackground from "@/components/domain-themes/DomainBackground";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetailModal from "@/components/projects/ProjectDetailModal";
import { AndroidDemo } from "@/components/domain-themes/AndroidDemo";
import MobileDevCinematicIntro from "@/components/domain-themes/MobileDevCinematicIntro";
import MobileStickyProjectShowcase from "@/components/domain-themes/MobileStickyProjectShowcase";
import CoffeePourAnimation from "@/components/domain-themes/CoffeePourAnimation";
import SpidermanWebAnimation from "@/components/domain-themes/SpidermanWebAnimation";
import FontSelector from "@/components/FontSelector";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Palette,
  Smartphone,
  ShieldAlert,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DomainDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const domain = DOMAINS.find((d) => d.id === resolvedParams.id);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [pourCount, setPourCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);
  const [mobileReplayCount, setMobileReplayCount] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Auto-hide top bar on enter, scroll down, reveal on scroll up or top hover
  useEffect(() => {
    // Auto-hide shortly after entering the page
    const autoHideTimer = setTimeout(() => {
      setIsHeaderVisible(false);
    }, 1600);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 6) {
        // Scrolling down -> hide top bar
        setIsHeaderVisible(false);
      } else if (delta < -6) {
        // Scrolling up -> reveal top bar
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Hovering near the top edge reveals top bar
      if (e.clientY <= 35) {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(autoHideTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Sync active domain so matrix orbit restores to this domain upon returning
  useEffect(() => {
    if (resolvedParams.id) {
      try {
        sessionStorage.setItem("devsync_active_domain", resolvedParams.id);
        const idx = DOMAINS.findIndex((d) => d.id === resolvedParams.id);
        if (idx !== -1) {
          sessionStorage.setItem("devsync_active_domain_index", String(idx));
        }
      } catch {
        // ignore storage errors
      }
    }
  }, [resolvedParams.id]);

  // Stable per-card refs so GSAP can target each card DOM node
  const domainProjects = useMemo(
    () => PROJECTS.filter((p) => p.domainId === resolvedParams.id),
    [resolvedParams.id]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cardRefs = useMemo(
    () => domainProjects.map(() => React.createRef<HTMLDivElement>()),
    [domainProjects.length]
  );

  if (!domain) {
    return notFound();
  }

  const Icon = iconMap[domain.icon] || Terminal;
  // (domainProjects is now derived in useMemo above before the null-guard)

  const handleBackNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigatingBack(true);
    setTimeout(() => {
      router.push("/#domains");
    }, 450);
  };

  const isUiUx = domain.id === "ui-ux";
  const isWebDev = domain.id === "web-dev";

  return (
    <div
      className={`min-h-screen relative overflow-x-clip flex flex-col justify-between transition-colors duration-300 ${
        isUiUx ? "bg-[#f8faf9] text-slate-900" : "bg-[#030504] text-slate-100"
      }`}
    >
      {/* 1. DOMAIN THEMED VISUAL IDENTITY BACKGROUND */}
      <DomainBackground domainId={domain.id} />

      {/* Reverse Zoom-Out Transition Screen */}
      <AnimatePresence>
        {isNavigatingBack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center backdrop-blur-xl ${
              isUiUx ? "bg-[#f8faf9]/90" : "bg-[#050608]/90"
            }`}
          >
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`text-center font-bold ${
                isUiUx ? "font-doodle text-2xl text-black" : "font-mono text-sm text-cyan-400"
              }`}
            >
              RETURNING TO DOMAIN MATRIX...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1.5. SPECIALIZED FULLSCREEN CINEMATIC INTRO FOR MOBILE DOMAIN */}
      {domain.id === "mobile-dev" && (
        <MobileDevCinematicIntro replayTrigger={mobileReplayCount} />
      )}

      {/* 2. CINEMATIC ENTRY WASH ANIMATION OVERLAY (Only on other dark domains) */}
      {!isUiUx && domain.id !== "mobile-dev" && (
        <motion.div
          initial={{ opacity: 1, scale: 1.2 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(circle at center, rgba(${domain.colorTheme.rgb}, 0.4) 0%, rgba(${domain.colorTheme.rgb}, 0.1) 45%, transparent 75%)`,
          }}
        />
      )}

      {/* 3. TOP NAVIGATION BAR (Auto-hides on scroll down, reveals on scroll up) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 transform ${
          isHeaderVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none shadow-none"
        } ${
          isUiUx
            ? "bg-[#FFE600] border-b-4 border-black px-3 sm:px-8 py-2.5 sm:py-3.5 shadow-[0_4px_0_#000000]"
            : "border-b backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-3.5 shadow-2xl"
        }`}
        style={{
          backgroundColor: !isUiUx ? `rgba(4, 7, 6, 0.85)` : undefined,
          borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2">
          <button
            onClick={handleBackNavigation}
            className={`group flex items-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer ${
              isUiUx
                ? "handdrawn-btn bg-white text-black font-doodle text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5"
                : "text-xs font-mono text-slate-300 hover:text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 shadow-sm"
            }`}
          >
            <ArrowLeft
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
            <span className="hidden sm:inline">Return to Capability Matrix</span>
            <span className="sm:hidden font-semibold">Back</span>
          </button>

          {/* Breadcrumb Indicator & Font Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isUiUx && <FontSelector className="hidden md:inline-block" />}
            <div
              className={`flex items-center gap-2 sm:gap-3 ${
                isUiUx ? "font-doodle text-xs sm:text-sm text-black" : "text-[11px] sm:text-xs font-mono text-slate-400"
              }`}
            >
              <span className="hidden sm:inline">COLLECTIVE.CSE</span>
              <span className={`hidden sm:inline ${isUiUx ? "text-black font-black text-sm font-doodle" : "text-slate-600"}`}>
                {isUiUx ? "\\" : "/"}
              </span>
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 ${
                  isUiUx
                    ? "handdrawn-box bg-[#FF00AA] text-white font-bold"
                    : "rounded-lg bg-slate-900/80 border border-white/10"
                }`}
              >
                <span
                  className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${isUiUx ? "bg-white" : "animate-pulse"}`}
                  style={{ backgroundColor: !isUiUx ? domain.colorTheme.primary : undefined }}
                />
                <span className="font-semibold truncate max-w-[120px] sm:max-w-none">{domain.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. MAIN DOMAIN SHOWCASE VIEWPORT */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 flex-grow w-full">
        {/* Domain Hero Header with Motion Settle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-20 flex flex-col items-center px-2"
        >
          <h1
            className={`tracking-tight leading-tight mb-3 sm:mb-4 ${
              isUiUx
                ? "font-doodle text-3xl sm:text-6xl lg:text-7xl font-black text-black drop-shadow-[0_0_20px_rgba(255,255,255,1)] [text-shadow:_0_0_10px_#ffffff,_0_0_20px_#ffffff,_0_0_30px_#ffffff,_3px_3px_0_#FFE600]"
                : "text-2xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            }`}
          >
            {domain.name}
          </h1>

          <p
            className={`max-w-3xl leading-relaxed mb-6 sm:mb-8 ${
              isUiUx
                ? "font-doodle text-base sm:text-2xl text-black font-black drop-shadow-[0_0_16px_rgba(255,255,255,1)] [text-shadow:_0_0_8px_#ffffff,_0_0_16px_#ffffff,_0_0_24px_#ffffff]"
                : "text-sm sm:text-xl text-slate-200 font-sans font-normal drop-shadow-[0_1px_10px_rgba(0,0,0,0.85)]"
            }`}
          >
            {domain.tagline}
          </p>

          {/* Aggregate Telemetry Metrics for this Domain */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box bg-[#FFE600] text-black shadow-[4px_4px_0_#000] font-doodle text-sm sm:text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <Users
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domain.studentCount}</strong> Developers
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box-alt bg-[#00E5FF] text-black shadow-[4px_4px_0_#000] font-doodle text-sm sm:text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <FolderGit2
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domainProjects.length}</strong> Deployed Projects
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 transition-all shadow-sm ${
                isUiUx
                  ? "handdrawn-box bg-[#FF00AA] text-white shadow-[4px_4px_0_#000] font-doodle text-sm sm:text-lg font-bold"
                  : "rounded-2xl border text-slate-200 backdrop-blur-md font-mono text-xs sm:text-sm"
              }`}
              style={{
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
              }}
            >
              <Layers
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: isUiUx ? "#FFFFFF" : domain.colorTheme.secondary }}
              />
              <span>
                <strong>{domain.techStack.length}</strong> Core Technologies
              </span>
            </div>
          </div>
        </motion.div>

        {/* 5. PROJECT SHOWCASE GRID */}
        <section className="mb-20">
          <div
            className={`flex items-center justify-between mb-8 pb-4 ${
              isUiUx ? "border-b-4 border-black" : "border-b border-white/10"
            }`}
          >
            <div>
              <h2
                className={`tracking-tight ${
                  isUiUx
                    ? "font-doodle text-3xl sm:text-4xl font-black text-black drop-shadow-[0_0_16px_rgba(255,255,255,1)] [text-shadow:_0_0_8px_#ffffff,_0_0_16px_#ffffff,_2px_2px_0_#FFE600]"
                    : "text-xl sm:text-2xl font-black text-white"
                }`}
              >
                Verified Production Systems ({domainProjects.length})
              </h2>
              <p
                className={`mt-1 ${
                  isUiUx
                    ? "font-doodle text-base sm:text-lg text-black font-black drop-shadow-[0_0_12px_rgba(255,255,255,1)] [text-shadow:_0_0_6px_#ffffff,_0_0_12px_#ffffff]"
                    : "text-xs sm:text-sm text-slate-400 font-mono"
                }`}
              >
                Click any system architecture tile to inspect problem statements, benchmarked outcomes, and live source.
              </p>
            </div>
            <span
              className={`hidden sm:inline ${
                isUiUx
                  ? "handdrawn-btn bg-[#FFE600] text-black font-doodle font-bold text-sm px-4 py-1"
                  : "text-xs font-mono px-3 py-1 rounded-full border"
              }`}
              style={{
                borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.4)` : undefined,
                color: !isUiUx ? domain.colorTheme.secondary : undefined,
                backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.12)` : undefined,
              }}
            >
              100% PRODUCTION READY
            </span>
          </div>

          {/* If UI/UX domain, GSAP-driven Coffee Pour Animation orchestrates card entries */}
          {isUiUx && (
            <CoffeePourAnimation
              pourCount={pourCount}
              onTriggerPour={() => setPourCount((prev) => prev + 1)}
              cardRefs={cardRefs as React.RefObject<HTMLElement | null>[]}
            />
          )}

          {domain.id === "mobile-dev" ? (
            <MobileStickyProjectShowcase
              projects={domainProjects}
              domain={domain}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-container">
              {domainProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  ref={(isUiUx || isWebDev) ? cardRefs[index] : undefined}
                  project={project}
                  domain={domain}
                  index={index}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
              ))}
            </div>
          )}

          {/* If Web Dev domain, Spidey runs on the bottom road & shoots webs to pull projects down from top */}
          {isWebDev && (
            <SpidermanWebAnimation
              swingCount={swingCount}
              onTriggerSwing={() => setSwingCount((prev) => prev + 1)}
              cardRefs={cardRefs as React.RefObject<HTMLElement | null>[]}
            />
          )}
        </section>

        {/* Specialized Mobile Device Architecture Mockup for Mobile Domain */}
        {domain.id === "mobile-dev" && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 rounded-3xl bg-gradient-to-b from-[#0e121e]/90 to-[#080b13]/90 border border-amber-500/20 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>NATIVE RUNTIME ENVIRONMENT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Mobile Architecture & Live Performance Telemetry
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
                  Production mobile applications engineered by our cohort implement zero-jank 60 FPS interfaces, offline-first SQLite/WatermelonDB synchronization engines, and low-latency Bluetooth/WebSockets hardware communication.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">FRAME BUDGET</span>
                    <span className="text-emerald-400 font-bold text-sm">16.6ms / 60 FPS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">OFFLINE LATENCY</span>
                    <span className="text-amber-300 font-bold text-sm">&lt; 2ms Indexed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 text-[10px] block">BRIDGE TYPE</span>
                    <span className="text-cyan-300 font-bold text-sm">JSI TurboModules</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setMobileReplayCount((c) => c + 1)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:text-white hover:bg-emerald-500/25 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Landscape Boot Animation 📱</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <AndroidDemo className="w-full max-w-[280px] sm:max-w-[320px]" />
              </div>
            </div>
          </motion.section>
        )}

        {/* 6. DOMAIN TECH STACK BADGES */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 text-center mb-16 ${
            isUiUx
              ? "handdrawn-box bg-white text-black shadow-[8px_8px_0px_#000000]"
              : "rounded-3xl border backdrop-blur-xl shadow-lg"
          }`}
          style={{
            backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.05)` : undefined,
            borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.2)` : undefined,
          }}
        >
          <h3
            className={`uppercase tracking-widest mb-4 flex items-center justify-center gap-2 ${
              isUiUx
                ? "font-doodle text-xl font-bold text-black"
                : "text-xs font-mono text-slate-300"
            }`}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: isUiUx ? "#000000" : domain.colorTheme.secondary }}
            />
            <span>CORE TOOLING &amp; INFRASTRUCTURE ECOSYSTEM</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {domain.techStack.map((tech, idx) => (
              <span
                key={idx}
                className={`transition-all ${
                  isUiUx
                    ? "handdrawn-btn bg-[#00FF66] text-black font-doodle font-bold text-base px-4 py-1.5 hover:bg-[#FFE600]"
                    : "text-xs font-mono px-3.5 py-1.5 rounded-xl border text-slate-200 hover:border-white/30 shadow-sm"
                }`}
                style={{
                  backgroundColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.08)` : undefined,
                  borderColor: !isUiUx ? `rgba(${domain.colorTheme.rgb}, 0.25)` : undefined,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Recruiter Placement Action Pill */}
        <div className="text-center">
          <button
            onClick={handleBackNavigation}
            className={`inline-flex items-center gap-2 transition-all cursor-pointer ${
              isUiUx
                ? "handdrawn-btn bg-[#FF00AA] text-white font-doodle text-lg font-bold px-8 py-3.5 shadow-[6px_6px_0px_#000000] hover:bg-[#FFE600] hover:text-black"
                : "px-6 py-3 rounded-2xl font-mono text-xs font-semibold text-white shadow-xl hover:scale-105"
            }`}
            style={{
              backgroundColor: !isUiUx ? domain.colorTheme.primary : undefined,
              boxShadow: !isUiUx ? `0 0 25px rgba(${domain.colorTheme.rgb}, 0.35)` : undefined,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Domains Matrix</span>
          </button>
        </div>
      </main>

      {/* 7. PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        domain={domain}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer
        className={`relative z-20 py-6 text-center transition-colors ${
          isUiUx
            ? "bg-[#FFE600] border-t-4 border-black text-black font-doodle font-bold text-base"
            : "border-t border-white/10 text-xs font-mono text-slate-500 bg-[#050608]"
        }`}
      >
        <span>COLLECTIVE.CSE // BATCH OF 2026 · VERIFIED CAMPUS TALENT</span>
      </footer>
    </div>
  );
}
