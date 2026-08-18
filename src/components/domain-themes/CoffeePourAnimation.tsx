"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Coffee, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoffeePourAnimationProps {
  onTriggerPour?: () => void;
  pourCount: number;
  cardRefs: React.RefObject<HTMLElement | null>[];
}

export default function CoffeePourAnimation({
  onTriggerPour,
  pourCount,
  cardRefs,
}: CoffeePourAnimationProps) {
  // The outer wrapper is the ScrollTrigger target
  const wrapperRef = useRef<HTMLDivElement>(null);
  // This group moves left/right — mug + stream move as one unit
  const mugGroupRef = useRef<HTMLDivElement>(null);
  // The mug SVG rotates inside the group
  const mugSvgRef = useRef<SVGSVGElement>(null);
  // The stream is absolutely positioned inside the group, below the mug spout
  const streamRef = useRef<HTMLDivElement>(null);
  // SPLOOSH comic bubble inside the group so it moves with the cup
  const splooshRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasRunRef = useRef(false);
  const [isRunning, setIsRunning] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  // ─── Pre-calculate all card x-offsets relative to the mug group's center ───
  // Called right before the animation fires (rects are stable by then)
  const getCardOffsets = useCallback((): number[] => {
    if (!mugGroupRef.current) return [];
    const groupRect = mugGroupRef.current.getBoundingClientRect();
    const groupCenterX = groupRect.left + groupRect.width / 2;
    return cardRefs.map((r) => {
      if (!r.current) return 0;
      const cardRect = r.current.getBoundingClientRect();
      return cardRect.left + cardRect.width / 2 - groupCenterX;
    });
  }, [cardRefs]);

  // ─── Core GSAP sequence ────────────────────────────────────────────────────
  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (
      !validRefs.length ||
      !mugGroupRef.current ||
      !mugSvgRef.current ||
      !streamRef.current
    )
      return;

    // Kill any previous timeline cleanly
    tlRef.current?.kill();
    setIsRunning(true);
    setDoneCount(0);

    const group = mugGroupRef.current;
    const mug = mugSvgRef.current;
    const stream = streamRef.current;
    const sploosh = splooshRef.current;

    // Snapshot positions NOW (layout is stable)
    const offsets = getCardOffsets();

    // ── Initial states ──
    gsap.set(group, { x: 0 });
    gsap.set(mug, { rotation: -4, transformOrigin: "center center" });
    gsap.set(stream, { opacity: 0, scaleY: 0 });
    if (sploosh) gsap.set(sploosh, { opacity: 0, scale: 0 });

    // All cards start hidden — GSAP will reveal them
    validRefs.forEach((r) => {
      gsap.set(r.current!, {
        opacity: 0,
        y: -90,
        scaleX: 0.5,
        scaleY: 1.5,
        rotation: 0,
        transformOrigin: "center bottom",
        clearProps: "none",
      });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setDoneCount(validRefs.length);
        // Return mug to center resting position
        gsap.to(group, { x: 0, duration: 0.8, ease: "back.out(1.4)" });
        gsap.to(mug, { rotation: -4, duration: 0.5, ease: "power2.out" });
        gsap.set(stream, { opacity: 0, scaleY: 0 });
      },
    });
    tlRef.current = tl;

    validRefs.forEach((ref, i) => {
      const card = ref.current!;
      const targetX = offsets[i] ?? 0;
      // Small initial jitter on alternate odd cards
      const entryRotation = i % 2 === 0 ? -12 : 12;

      // Set the rotation for this card's entry
      gsap.set(card, { rotation: entryRotation });

      // ① Slide group to hover above this card
      tl.to(group, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      // ② Tilt mug into pour (overlaps with end of slide)
      tl.to(
        mug,
        { rotation: -50, duration: 0.4, ease: "back.out(1.5)" },
        "<+0.2"
      );

      // ③ Stream grows down from mug spout
      tl.to(
        stream,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "top center",
        },
        "<+0.1"
      );

      // ④ Card drops in with elastic jelly — staggered slightly after stream
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 1.05,
          ease: "elastic.out(1, 0.42)",
        },
        "<+0.12"
      );

      // ⑤ SPLOOSH comic bubble pop
      if (sploosh) {
        tl.fromTo(
          sploosh,
          { opacity: 0, scale: 0, rotation: -20 },
          { opacity: 1, scale: 1.1, rotation: 6, duration: 0.22, ease: "back.out(2.5)" },
          "<+0.08"
        );
        tl.to(sploosh, {
          opacity: 0,
          y: -18,
          duration: 0.2,
          ease: "power2.in",
          delay: 0.4,
        });
      }

      // ⑥ Stream retracts
      tl.to(
        stream,
        {
          opacity: 0,
          scaleY: 0,
          duration: 0.25,
          ease: "power2.in",
          transformOrigin: "top center",
        },
        "<-0.1"
      );

      // ⑦ Mug un-tilts before sliding to next card
      tl.to(
        mug,
        { rotation: -4, duration: 0.28, ease: "power2.inOut" },
        "<+0.05"
      );

      // ⑧ Brief natural pause between cards (empty tween)
      if (i < validRefs.length - 1) {
        tl.to({}, { duration: 0.18 });
      }
    });
  }, [cardRefs, getCardOffsets]);

  // ─── ScrollTrigger: fires ONCE when the cup section enters view ────────────
  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 68%",  // fires when top of cup section hits 68% of viewport
        once: true,
        onEnter: () => {
          if (hasRunRef.current) return;
          hasRunRef.current = true;
          // One frame delay for layout stability
          requestAnimationFrame(() => {
            requestAnimationFrame(() => runSequence());
          });
        },
      });
    });

    return () => ctx.revert();
  }, [runSequence]);

  // ─── Manual re-pour (button / mug click) ─────────────────────────────────
  useEffect(() => {
    if (pourCount > 0) {
      runSequence();
    }
  }, [pourCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePourClick = () => {
    if (!isRunning) onTriggerPour?.();
  };

  const allPoured = doneCount > 0 && doneCount === cardRefs.filter((r) => r.current).length;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full flex flex-col items-center py-4 my-2 select-none overflow-visible z-20"
    >
      {/* ── Mug GROUP ── moves left/right as one unit */}
      <div
        ref={mugGroupRef}
        className="relative flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        {/* SPLOOSH comic bubble — inside group so it travels with the mug */}
        <div
          ref={splooshRef}
          className="absolute -top-14 -left-8 z-50 pointer-events-none whitespace-nowrap"
          style={{ opacity: 0, scale: "0" }}
        >
          <div className="handdrawn-box bg-[#FF00AA] text-white font-doodle text-sm sm:text-lg font-black px-4 py-1.5 shadow-[4px_4px_0_#000000]">
            💥 SPLOOOSH!! 🍮
          </div>
        </div>

        {/* ── Coffee Mug SVG — rotates independently ── */}
        <svg
          ref={mugSvgRef}
          viewBox="0 0 240 220"
          className="w-36 sm:w-48 h-auto cursor-pointer drop-shadow-[0_14px_28px_rgba(0,212,255,0.3)]"
          style={{ transformOrigin: "center center" }}
          onClick={handlePourClick}
          role="button"
          aria-label="Pour coffee"
        >
          {/* Animated steam */}
          <ellipse cx="72" cy="26" rx="6" ry="10" fill="#cbd5e1" opacity="0.5">
            <animateTransform attributeName="transform" type="translate" values="0 0;-4 -22;0 0" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="110" cy="16" rx="7" ry="12" fill="#cbd5e1" opacity="0.4">
            <animateTransform attributeName="transform" type="translate" values="0 0;3 -26;0 0" dur="2.8s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" begin="0.5s" />
          </ellipse>
          <ellipse cx="148" cy="24" rx="5" ry="9" fill="#cbd5e1" opacity="0.45">
            <animateTransform attributeName="transform" type="translate" values="0 0;5 -20;0 0" dur="2.1s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0.45;0;0.45" dur="2.1s" repeatCount="indefinite" begin="1s" />
          </ellipse>

          {/* Handle */}
          <path d="M 175 60 C 235 65, 240 155, 170 165" fill="none" stroke="#00D4FF" strokeWidth="22" strokeLinecap="round" />
          <path d="M 175 60 C 235 65, 240 155, 170 165" fill="none" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />

          {/* Body */}
          <path
            d="M 35 45 C 95 38, 140 38, 185 45 C 180 120, 175 165, 160 195 C 115 205, 75 205, 52 195 C 42 165, 38 120, 35 45 Z"
            fill="#00D4FF" stroke="#000" strokeWidth="4.5"
          />
          {/* Specular highlight */}
          <path d="M 46 62 C 49 118, 55 152, 63 186" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.6" />

          {/* Coffee top surface */}
          <ellipse cx="110" cy="52" rx="68" ry="22" fill="#3A1D0B" stroke="#000" strokeWidth="3.5" />
          <ellipse cx="110" cy="52" rx="54" ry="15" fill="#522A12" />
          <path d="M 85 52 Q 110 44 135 52 Q 120 58 100 54" fill="none" stroke="#C48858" strokeWidth="2.5" strokeLinecap="round" />

          {/* PROJ ECTS label */}
          <text x="108" y="118" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" fill="#001880" transform="rotate(-5 108 118)">PROJ</text>
          <text x="108" y="155" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" fill="#001880" transform="rotate(-5 108 155)">ECTS</text>
        </svg>

        {/* ── Liquid Stream — absolutely positioned at the cup's pour spout ──
             The mug tilts left ~-50°. At that angle the pour point is the
             top-left of the mug body. We anchor stream at bottom-left of the
             group, slightly inset, so it visually flows from the spout lip.
        */}
        <div
          ref={streamRef}
          className="absolute pointer-events-none"
          style={{
            top: "78%",        // below the cup rim
            left: "4%",        // left side — where coffee pours from when tilted left
            opacity: 0,
            transformOrigin: "top center",
          }}
        >
          <svg viewBox="0 0 54 140" className="w-8 sm:w-12 h-auto">
            {/* Main jelly stream */}
            <path
              d="M 16 0 Q 8 40 26 72 T 18 140 L 34 140 Q 44 72 38 40 T 30 0 Z"
              fill="#3A1D0B" stroke="#000" strokeWidth="2"
            />
            {/* Inner gloss */}
            <path d="M 21 4 Q 12 44 28 74 T 22 136" fill="none" stroke="#7E4722" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 25 10 Q 18 44 30 70" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            {/* Falling droplets */}
            <circle cx="24" cy="36" r="3.5" fill="#6B3E1E" stroke="#000" strokeWidth="1">
              <animateTransform attributeName="transform" type="translate" values="0 0;0 100" dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="30" cy="65" r="4.5" fill="#3A1D0B" stroke="#000" strokeWidth="1">
              <animateTransform attributeName="transform" type="translate" values="0 0;0 75" dur="0.85s" repeatCount="indefinite" begin="0.35s" />
              <animate attributeName="opacity" values="1;0" dur="0.85s" repeatCount="indefinite" begin="0.35s" />
            </circle>
            <circle cx="20" cy="96" r="3" fill="#D48B47">
              <animateTransform attributeName="transform" type="translate" values="0 0;0 44" dur="0.7s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="opacity" values="0.9;0" dur="0.7s" repeatCount="indefinite" begin="0.6s" />
            </circle>
          </svg>
        </div>
      </div>

      {/* ── Label + re-pour button ── */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
        <span className="bg-[#FFE600] text-black font-doodle text-sm sm:text-base font-black px-4 py-1.5 handdrawn-box shadow-[3px_3px_0_#000000] rotate-[-1deg] inline-flex items-center gap-2">
          <Coffee className="w-4 h-4 animate-bounce" />
          {allPoured
            ? "All projects poured! ☕✨"
            : isRunning
            ? "Pouring your projects…"
            : "Scroll here — cup pours each project!"}
          <Sparkles className="w-4 h-4 text-pink-600 animate-spin" />
        </span>

        <button
          id="pour-again-btn"
          onClick={handlePourClick}
          disabled={isRunning}
          className="handdrawn-btn bg-[#FF00AA] text-white font-doodle text-sm font-black px-4 py-1.5 inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4 fill-current" />
          {isRunning ? "POURING…" : allPoured ? "POUR AGAIN! ☕" : "POUR NOW!"}
        </button>
      </div>
    </div>
  );
}
