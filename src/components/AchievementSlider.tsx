"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  Flame,
  X,
} from "lucide-react";
import { STUDENT_ACHIEVEMENTS, StudentAchievement } from "@/data/achievements";
import { ConstellationBackground } from "@/components/backgrounds";

export default function AchievementSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    subTitle?: string;
  } | null>(null);

  const totalCards = STUDENT_ACHIEVEMENTS.length;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Keyboard shortcut to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

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
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          <span className="h-[2px] w-6 bg-amber-400" />
          <span className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase">
            EXCELLENCE IN ACTION
          </span>
        </div>

        {/* Display Headline */}
        <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] font-sans">
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
          <div className="relative z-10 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 flex items-center justify-end">
            {/* Controls Capsule */}
            <div className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-full bg-[#0a0d16]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
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
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Number Counter */}
              <div className="font-mono text-[11px] sm:text-xs font-bold text-amber-400 tracking-wider flex items-center gap-0.5 sm:gap-1">
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{String(totalCards).padStart(2, "0")}</span>
              </div>

              {/* Dot Indicators */}
              <div className="hidden sm:flex items-center gap-1 px-1">
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
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Full-Height Horizontal Sticky Cards Track (Driven by vertical scroll) */}
          <div className="relative z-10 w-full overflow-visible my-auto py-1 sm:py-2">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-4 sm:gap-8 px-3 sm:px-8 lg:px-16 items-stretch will-change-transform"
            >
              {STUDENT_ACHIEVEMENTS.map((item, index) => (
                <AchievementCard
                  key={item.id}
                  achievement={item}
                  index={index}
                  isActive={activeIndex === index}
                  onOpenImage={setSelectedImage}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom Horizontal Scroll Progress Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 flex items-center justify-end text-[9px] sm:text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2 sm:gap-3 w-32 sm:w-56">
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

      {/* ── Photo Lightbox Modal mounted via React Portal to document.body (z-[99999], completely above navbar) ── */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto">
                {/* Backdrop click to dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                />

                {/* Modal Dialog with generous margins so top words are NEVER cut off */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  className="relative z-10 max-w-4xl w-full bg-[#0a0d16] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[82vh] my-auto"
                >
                  {/* Header: Protected with flex-shrink-0 and clear padding */}
                  <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-white/10 flex items-start justify-between bg-slate-950/95 backdrop-blur-md gap-4 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                        {selectedImage.title}
                      </h3>
                      {selectedImage.subTitle && (
                        <p className="text-xs sm:text-sm font-mono text-amber-400 mt-1">
                          {selectedImage.subTitle}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedImage(null)}
                      aria-label="Close photo preview"
                      className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Full Image Display: scales dynamically to fit viewport */}
                  <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden p-3 sm:p-5">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.title}
                      className="max-h-[55vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </div>

                  {/* Clean Footer: No "verified" at left bottom */}
                  <div className="px-6 py-2.5 sm:py-3 border-t border-white/10 bg-slate-950/95 flex items-center justify-end text-[11px] font-mono text-slate-500 flex-shrink-0">
                    <span>PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
  isActive,
  onOpenImage,
}: {
  achievement: StudentAchievement;
  index: number;
  isActive: boolean;
  onOpenImage?: (data: { url: string; title: string; subTitle?: string }) => void;
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
      className={`w-[85vw] max-w-[340px] sm:min-w-[370px] md:min-w-[420px] sm:max-w-[420px] flex-shrink-0 rounded-3xl backdrop-blur-2xl p-4 sm:p-7 flex flex-col justify-between transition-all duration-500 relative overflow-hidden border ${
        isActive
          ? "bg-gradient-to-br from-[#121829]/95 via-[#0b101f]/95 to-[#171128]/95 border-amber-500/60 shadow-[0_25px_60px_rgba(245,158,11,0.22)] scale-[1.01] sm:scale-[1.02]"
          : "bg-[#090c15]/90 border-white/10 hover:border-white/25 shadow-xl opacity-75 hover:opacity-100"
      }`}
    >
      {/* Top Header: Tag Pill & Index */}
      <div>
        <div className="flex items-center justify-between mb-2.5 sm:mb-4">
          {/* Badge Tag */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl border text-[9.5px] sm:text-[10.5px] font-mono font-bold tracking-wider uppercase ${achievement.tagColor.bg} ${achievement.tagColor.text} ${achievement.tagColor.border}`}
          >
            <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{achievement.tag}</span>
          </div>

          {/* Index Number */}
          <span className="font-mono text-xs sm:text-sm text-slate-500 font-semibold">
            {achievement.indexStr}
          </span>
        </div>

        {/* Visual Box: Photo Only (No honors archive, live, state&national, verified) */}
        <div
          className={`relative h-44 sm:h-52 md:h-56 w-full rounded-2xl overflow-hidden mb-3 sm:mb-5 border border-white/10 ${
            achievement.imageUrl ? "bg-slate-950 cursor-pointer hover:border-amber-400/50" : `bg-gradient-to-br ${achievement.gradientTheme}`
          } shadow-inner group/banner transition-all duration-300`}
          onClick={() => {
            if (achievement.imageUrl && onOpenImage) {
              onOpenImage({
                url: achievement.imageUrl,
                title: achievement.title,
                subTitle: achievement.subTitle,
              });
            }
          }}
        >
          {achievement.imageUrl ? (
            /* Photo Only: clean, full-bleed, crisp */
            <img
              src={achievement.imageUrl}
              alt={achievement.title}
              className="w-full h-full object-cover object-center group-hover/banner:scale-105 transition-transform duration-500 ease-out will-change-transform"
              loading="lazy"
            />
          ) : (
            /* Clean emblem for non-photo cards without honors archive, live, verified, or state&national */
            <div className="w-full h-full flex flex-col items-center justify-center relative p-4">
              <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
              <div
                className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
                style={{ backgroundColor: achievement.accentColor }}
              />
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2 shadow-2xl relative z-10 transition-transform duration-300"
                style={{
                  backgroundColor: `${achievement.accentColor}20`,
                  border: `1px solid ${achievement.accentColor}50`,
                  boxShadow: `0 0 20px ${achievement.accentColor}40`,
                }}
              >
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold relative z-10">
                COLLECTIVE RECOGNITION
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-snug mb-1 line-clamp-2">
          {achievement.title}
        </h3>

        {/* Subtitle in Gold/Yellow Accent */}
        <h4 className="text-[11px] sm:text-[13px] font-semibold text-amber-400/95 font-sans mb-1.5 sm:mb-2.5 truncate">
          {achievement.subTitle}
        </h4>

        {/* Description Text */}
        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans font-normal line-clamp-2 sm:line-clamp-3">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}
