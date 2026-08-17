"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  Flame,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { STUDENT_ACHIEVEMENTS, StudentAchievement } from "@/data/achievements";

export default function AchievementSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalCards = STUDENT_ACHIEVEMENTS.length;

  const updateScrollState = () => {
    const container = sliderRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // If reached the right end boundary
    if (scrollLeft + clientWidth >= scrollWidth - 25) {
      setActiveIndex(totalCards - 1);
      return;
    }

    // If at the left start boundary
    if (scrollLeft <= 25) {
      setActiveIndex(0);
      return;
    }

    // Dynamic child offset calculation
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childLeft = child.offsetLeft - container.offsetLeft;
      const distance = Math.abs(childLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();
    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (children[index]) {
      const childLeft = children[index].offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: childLeft,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(activeIndex - 1, 0);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeIndex + 1, totalCards - 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section
      id="achievements-showcase"
      className="relative z-20 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#040507] overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Top Sub-tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-amber-400" />
              <span className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase">
                EXCELLENCE IN ACTION
              </span>
            </div>

            {/* Giant Display Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] font-sans">
              OUR STUDENT <br />
              <span className="text-white">ACHIEVEMENTS</span>
            </h2>

            {/* Cyan Subtitle */}
            <p className="text-xs sm:text-sm font-mono tracking-wider text-cyan-400 font-bold uppercase mt-3">
              MOMENTUM OUR STUDENTS ARE BUILDING
            </p>
          </div>

          {/* Top-Right Controls Capsule */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0a0d16]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft}
                aria-label="Previous Achievement"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  canScrollLeft
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
              <div className="flex items-center gap-1.5 px-1">
                {STUDENT_ACHIEVEMENTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`Jump to achievement ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-6 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                        : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                aria-label="Next Achievement"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  canScrollRight
                    ? "text-white hover:text-amber-300 hover:scale-110 active:scale-95"
                    : "text-slate-600 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STUDENT_ACHIEVEMENTS.map((item, index) => (
            <AchievementCard key={item.id} achievement={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: StudentAchievement;
  index: number;
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] max-w-[420px] flex-shrink-0 snap-start rounded-3xl bg-[#090c15]/90 border border-white/10 hover:border-white/25 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden"
      style={{
        boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Top Header: Tag Pill & Index */}
      <div>
        <div className="flex items-center justify-between mb-5">
          {/* Badge Tag */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold tracking-wider uppercase ${achievement.tagColor.bg} ${achievement.tagColor.text} ${achievement.tagColor.border}`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{achievement.tag}</span>
          </div>

          {/* Index Number */}
          <span className="font-mono text-sm text-slate-500 font-semibold group-hover:text-slate-300 transition-colors">
            {achievement.indexStr}
          </span>
        </div>

        {/* Visual Graphic Banner */}
        <div
          className={`relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-gradient-to-br ${achievement.gradientTheme} p-4 flex flex-col justify-between shadow-inner`}
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
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-slate-300 backdrop-blur-md">
              HONORS ARCHIVE
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
          </div>

          {/* Center Trophy / Stage Emblem Mock */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-2xl transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${achievement.accentColor}20`,
                border: `1px solid ${achievement.accentColor}50`,
                boxShadow: `0 0 25px ${achievement.accentColor}40`,
              }}
            >
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              COLLECTIVE COHORT RECOGNITION
            </span>
          </div>

          {/* Bottom Accreditation Tag */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              VERIFIED PODIUM
            </span>
            <span className="text-amber-400/90 font-bold">STATE & NATIONAL</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors mb-1.5">
          {achievement.title}
        </h3>

        {/* Subtitle in Gold/Yellow Accent */}
        <h4 className="text-xs sm:text-sm font-semibold text-amber-400/95 font-sans mb-3">
          {achievement.subTitle}
        </h4>

        {/* Description Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">
          {achievement.description}
        </p>
      </div>

      {/* Bottom Footer Line */}
      <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{achievement.factText}</span>
        </div>

        <span className="text-slate-400 tracking-wider font-semibold">
          {achievement.institution}
        </span>
      </div>
    </motion.div>
  );
}
