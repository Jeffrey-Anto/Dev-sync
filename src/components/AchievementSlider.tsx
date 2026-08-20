"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { STUDENT_ACHIEVEMENTS, StudentAchievement } from "@/data/achievements";
import { ConstellationBackground } from "@/components/backgrounds";

export default function AchievementSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = STUDENT_ACHIEVEMENTS.length;

  // Track vertical scroll progress across the sticky cards container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the exact horizontal scroll distance required to reveal all cards
  const updateScrollBounds = () => {
    if (trackRef.current) {
      const scrollWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const endPadding = viewportWidth >= 1024 ? 96 : viewportWidth >= 640 ? 48 : 24;
      const distance = Math.max(0, scrollWidth - viewportWidth + endPadding);
      setMaxScrollDistance(distance);
    }
  };

  useEffect(() => {
    updateScrollBounds();
    const handleResize = () => {
      updateScrollBounds();
    };

    window.addEventListener("resize", handleResize);
    const timer = setTimeout(updateScrollBounds, 300);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Transform vertical scroll progress into horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Dynamically calculate active card index from scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const calculatedIndex = Math.min(
      totalCards - 1,
      Math.max(0, Math.floor(latest * totalCards + 0.1))
    );
    setActiveIndex(calculatedIndex);
  });

  // Smoothly scroll window to target card index
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    const targetFraction = totalCards > 1 ? index / (totalCards - 1) : 0;
    const targetScrollY = containerTop + targetFraction * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const nextIdx = Math.max(activeIndex - 1, 0);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeIndex + 1, totalCards - 1);
    scrollToCard(nextIdx);
  };

  return (
    <section id="achievements-showcase" className="relative z-20 bg-[#040507] border-t border-white/10">
      {/* ── 1. NORMAL SCROLLING SECTION TITLE (Scrolls away naturally; NOT locked) ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[2px] w-6 bg-amber-400" />
          <span className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase">
            EXCELLENCE IN ACTION
          </span>
        </div>

        {/* Display Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] font-sans">
          OUR STUDENT <br />
          <span className="inline-block animate-deep-color-flow">
            ACHIEVEMENTS
          </span>
        </h2>
      </div>

      {/* ── 2. STICKY HORIZONTAL CARDS CONTAINER (Locks when cards reach screen; Title is out of view) ── */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${(totalCards + 0.8) * 58}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-6 sm:pt-8 pb-6 sm:pb-8 select-none">
          {/* Background Ambience */}
          <ConstellationBackground opacity={0.6} />
          <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Sticky Top Navigation Controls Capsule */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-end">
            {/* Controls Capsule */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 sm:py-2 rounded-full bg-[#0a0d16]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous Achievement"
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  activeIndex > 0
                    ? "text-white hover:text-amber-300 hover:scale-110 active:scale-95"
                    : "text-slate-600 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Number Counter */}
              <div className="font-mono text-xs font-bold text-amber-400 tracking-wider flex items-center gap-1">
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{String(totalCards).padStart(2, "0")}</span>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1 px-1">
                {STUDENT_ACHIEVEMENTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Jump to achievement ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                        : "w-1.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={activeIndex === totalCards - 1}
                aria-label="Next Achievement"
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  activeIndex < totalCards - 1
                    ? "text-white hover:text-amber-300 hover:scale-110 active:scale-95"
                    : "text-slate-600 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-Height Horizontal Sticky Cards Track (Driven by vertical scroll) */}
          <div className="relative z-10 w-full overflow-visible my-auto py-2">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16 items-stretch will-change-transform"
            >
              {STUDENT_ACHIEVEMENTS.map((item, index) => (
                <AchievementCard
                  key={item.id}
                  achievement={item}
                  index={index}
                  isActive={activeIndex === index}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom Horizontal Scroll Progress Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-end text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-3 w-40 sm:w-56">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressPercent }}
                  className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 rounded-full"
                />
              </div>
              <span className="font-bold text-amber-300">
                {Math.round(((activeIndex + 1) / totalCards) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
  isActive,
}: {
  achievement: StudentAchievement;
  index: number;
  isActive: boolean;
}) {
  const getIcon = () => {
    switch (achievement.tagType) {
      case "trophy":
        return Trophy;
      case "prize":
        return Award;
      case "upskilling":
        return Cpu;
      case "hackathon":
        return Flame;
      case "defense":
        return Shield;
      case "iot":
        return Sparkles;
      default:
        return Trophy;
    }
  };

  const IconComponent = getIcon();

  return (
    <div
      className={`min-w-[310px] sm:min-w-[370px] md:min-w-[420px] max-w-[420px] flex-shrink-0 rounded-3xl backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 relative overflow-hidden border ${
        isActive
          ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_25px_60px_rgba(245,158,11,0.22)] scale-[1.02]"
          : "bg-[#090c15]/90 border-white/10 hover:border-white/25 shadow-xl opacity-80 hover:opacity-100"
      }`}
    >
      {/* Top Header: Tag Pill & Index */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {/* Badge Tag */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[10.5px] font-mono font-bold tracking-wider uppercase ${achievement.tagColor.bg} ${achievement.tagColor.text} ${achievement.tagColor.border}`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{achievement.tag}</span>
          </div>

          {/* Index Number */}
          <span className="font-mono text-sm text-slate-500 font-semibold">
            {achievement.indexStr}
          </span>
        </div>

        {/* Visual Graphic Banner */}
        <div
          className={`relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-gradient-to-br ${achievement.gradientTheme} p-4 flex flex-col justify-between shadow-inner`}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

          {/* Glowing Ambient Radial in Corner */}
          <div
            className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
            style={{ backgroundColor: achievement.accentColor }}
          />

          {/* Top Status inside Visual */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[9.5px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-slate-300 backdrop-blur-md">
              HONORS ARCHIVE
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
          </div>

          {/* Center Trophy / Stage Emblem Mock */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center mb-1.5 shadow-2xl transition-transform duration-300"
              style={{
                backgroundColor: `${achievement.accentColor}20`,
                border: `1px solid ${achievement.accentColor}50`,
                boxShadow: `0 0 25px ${achievement.accentColor}40`,
              }}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              COLLECTIVE COHORT RECOGNITION
            </span>
          </div>

          {/* Bottom Accreditation Tag */}
          <div className="relative z-10 flex items-center justify-between text-[9.5px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              VERIFIED PODIUM
            </span>
            <span className="text-amber-400/90 font-bold">STATE & NATIONAL</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug mb-1">
          {achievement.title}
        </h3>

        {/* Subtitle in Gold/Yellow Accent */}
        <h4 className="text-xs sm:text-[13px] font-semibold text-amber-400/95 font-sans mb-2.5">
          {achievement.subTitle}
        </h4>

        {/* Description Text */}
        <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal line-clamp-3">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}
