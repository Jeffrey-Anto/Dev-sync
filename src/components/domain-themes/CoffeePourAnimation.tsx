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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mugGroupRef = useRef<HTMLDivElement>(null);
  const mugSvgRef = useRef<SVGSVGElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const splooshRef = useRef<HTMLDivElement>(null);
  // The coffee fill rect inside the mug — we animate its y to simulate draining
  const coffeeFillRef = useRef<SVGRectElement>(null);
  const coffeeSurfaceRef = useRef<SVGGElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasRunRef = useRef(false);
  const [isRunning, setIsRunning] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const getCardOffsets = useCallback((refs: React.RefObject<HTMLElement | null>[]): number[] => {
    if (!mugGroupRef.current) return [];
    const groupRect = mugGroupRef.current.getBoundingClientRect();
    const groupCenterX = groupRect.left + groupRect.width / 2;
    return refs.map((r) => {
      if (!r.current) return 0;
      const rect = r.current.getBoundingClientRect();
      return rect.left + rect.width / 2 - groupCenterX;
    });
  }, []);

  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length || !mugGroupRef.current || !mugSvgRef.current || !streamRef.current)
      return;

    tlRef.current?.kill();
    setIsRunning(true);
    setDoneCount(0);

    const group = mugGroupRef.current;
    const mug = mugSvgRef.current;
    const stream = streamRef.current;
    const sploosh = splooshRef.current;
    const coffeeFill = coffeeFillRef.current;
    const coffeeSurface = coffeeSurfaceRef.current;

    const offsets = getCardOffsets(validRefs);
    const totalCards = validRefs.length;

    // ── Initial states ──
    gsap.set(group, { x: 0 });
    gsap.set(mug, { rotation: -4, transformOrigin: "center center" });
    gsap.set(stream, { opacity: 0, scaleY: 0 });
    if (sploosh) gsap.set(sploosh, { opacity: 0, scale: 0 });

    // Coffee fill starts FULL (y=52 = surface, height fills to bottom of cup ~y=200)
    if (coffeeFill) gsap.set(coffeeFill, { attr: { y: 52, height: 150 } });
    // Reset coffee surface group to top position
    if (coffeeSurfaceRef.current) gsap.set(coffeeSurfaceRef.current, { y: 0 });

    // All cards hidden + coffee overlay visible
    validRefs.forEach((r) => {
      const card = r.current!;
      gsap.set(card, {
        opacity: 0,
        y: -90,
        scaleX: 0.5,
        scaleY: 1.5,
        rotation: 0,
        transformOrigin: "center bottom",
      });
      // Reset the coffee overlay inside the card
      const overlay = card.querySelector<HTMLElement>(".js-coffee-overlay");
      if (overlay) gsap.set(overlay, { opacity: 1, yPercent: 0 });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setDoneCount(validRefs.length);
        gsap.to(group, { x: 0, duration: 0.8, ease: "back.out(1.4)" });
        gsap.to(mug, { rotation: -4, duration: 0.5, ease: "power2.out" });
        gsap.set(stream, { opacity: 0, scaleY: 0 });
      },
    });
    tlRef.current = tl;

    validRefs.forEach((ref, i) => {
      const card = ref.current!;
      const targetX = offsets[i] ?? 0;
      const entryRotation = i % 2 === 0 ? -12 : 12;
      gsap.set(card, { rotation: entryRotation });

      // ① Slide group over card
      tl.to(group, { x: targetX, duration: 0.65, ease: "power3.inOut" });

      // ② Tilt mug into pour
      tl.to(mug, { rotation: -50, duration: 0.4, ease: "back.out(1.5)" }, "<+0.2");

      // ③ Coffee fill DRAINS in mug (y increases, height decreases per card)
      if (coffeeFill) {
        const drainPerCard = 130 / totalCards; // split 130px of height across all pours
        const drainAmount = (i + 1) * drainPerCard;
        const newY = 52 + drainAmount;
        const newH = Math.max(4, 200 - newY);
        tl.to(
          coffeeFill,
          { attr: { y: newY, height: newH }, duration: 0.55, ease: "power2.inOut" },
          "<"
        );
        // Surface oval + foam drop in sync with the fill level
        if (coffeeSurface) {
          tl.to(
            coffeeSurface,
            { y: drainAmount, duration: 0.55, ease: "power2.inOut" },
            "<"
          );
        }
      }

      // ④ Stream appears from spout
      tl.to(
        stream,
        { opacity: 1, scaleY: 1, duration: 0.3, ease: "power2.out", transformOrigin: "top center" },
        "<+0.1"
      );

      // ⑤ Card drops in with elastic jelly
      tl.to(
        card,
        { opacity: 1, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 1.05, ease: "elastic.out(1, 0.42)" },
        "<+0.12"
      );

      // ⑥ Coffee-wash overlay wipes away (upward reveal like liquid draining)
      const overlay = card.querySelector<HTMLElement>(".js-coffee-overlay");
      if (overlay) {
        tl.to(
          overlay,
          {
            yPercent: -105,
            duration: 0.75,
            ease: "power2.inOut",
          },
          "<+0.25"
        );
      }

      // ⑦ SPLOOSH bubble
      if (sploosh) {
        tl.fromTo(
          sploosh,
          { opacity: 0, scale: 0, rotation: -20 },
          { opacity: 1, scale: 1.1, rotation: 6, duration: 0.22, ease: "back.out(2.5)" },
          "<-0.3"
        );
        tl.to(sploosh, { opacity: 0, y: -18, duration: 0.2, ease: "power2.in", delay: 0.35 });
      }

      // ⑧ Stream retracts
      tl.to(
        stream,
        { opacity: 0, scaleY: 0, duration: 0.25, ease: "power2.in", transformOrigin: "top center" },
        "<-0.1"
      );

      // ⑨ Mug un-tilts
      tl.to(mug, { rotation: -4, duration: 0.28, ease: "power2.inOut" }, "<+0.05");

      // ⑩ Brief breath between cards
      if (i < validRefs.length - 1) {
        tl.to({}, { duration: 0.18 });
      }
    });
  }, [cardRefs, getCardOffsets]);

  // ScrollTrigger: once — fires when cup section enters viewport
  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 68%",
        once: true,
        onEnter: () => {
          if (hasRunRef.current) return;
          hasRunRef.current = true;
          requestAnimationFrame(() => requestAnimationFrame(() => runSequence()));
        },
      });
    });
    return () => ctx.revert();
  }, [runSequence]);

  // Manual re-pour
  useEffect(() => {
    if (pourCount > 0) {
      hasRunRef.current = false; // allow re-triggering
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
      {/* ── Mug GROUP — moves left/right as one unit ─────────────────── */}
      <div
        ref={mugGroupRef}
        className="relative flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        {/* SPLOOSH bubble */}
        <div
          ref={splooshRef}
          className="absolute -top-14 -left-8 z-50 pointer-events-none whitespace-nowrap"
          style={{ opacity: 0 }}
        >
          <div className="handdrawn-box bg-[#FF00AA] text-white font-doodle text-sm sm:text-lg font-black px-4 py-1.5 shadow-[4px_4px_0_#000000]">
            💥 SPLOOOSH!! 🍮
          </div>
        </div>

        {/* ── Coffee Mug SVG ── */}
        <svg
          ref={mugSvgRef}
          viewBox="0 0 240 220"
          className="w-36 sm:w-48 h-auto cursor-pointer drop-shadow-[0_14px_28px_rgba(0,212,255,0.3)]"
          style={{ transformOrigin: "center center" }}
          onClick={handlePourClick}
          role="button"
          aria-label="Pour coffee"
        >
          <defs>
            {/* Clip to mug body interior so coffee fill stays inside */}
            <clipPath id="mug-body-clip">
              <path d="M 37 47 C 97 40, 140 40, 183 47 C 178 118, 173 163, 158 193 C 115 202, 77 202, 54 193 C 44 163, 40 118, 37 47 Z" />
            </clipPath>
            {/* Full mug interior clip — used by the animated surface group so it stays within the cup walls */}
            <clipPath id="mug-interior-clip">
              <path d="M 37 30 C 97 22, 140 22, 183 30 L 183 47 C 178 118, 173 163, 158 193 C 115 202, 77 202, 54 193 C 44 163, 40 118, 37 47 Z" />
            </clipPath>
          </defs>

          {/* Steam puffs */}
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

          {/* Mug body (cyan) */}
          <path
            d="M 35 45 C 95 38, 140 38, 185 45 C 180 120, 175 165, 160 195 C 115 205, 75 205, 52 195 C 42 165, 38 120, 35 45 Z"
            fill="#00D4FF" stroke="#000" strokeWidth="4.5"
          />

          {/* ── COFFEE FILL (clipped to mug interior, drains as cards are poured) ── */}
          <rect
            ref={coffeeFillRef}
            x="10"
            y="52"
            width="220"
            height="150"
            fill="#3A1D0B"
            clipPath="url(#mug-body-clip)"
          />


          {/* Specular highlight ON TOP of coffee */}
          <path d="M 46 62 C 49 118, 55 152, 63 186" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.4" />

          {/* Coffee top surface oval + foam — grouped & clipped so they slide down naturally inside the cup */}
          <g ref={coffeeSurfaceRef} clipPath="url(#mug-interior-clip)">
            <ellipse cx="110" cy="52" rx="68" ry="22" fill="#3A1D0B" stroke="#000" strokeWidth="3.5" />
            <ellipse cx="110" cy="52" rx="54" ry="15" fill="#522A12" />
            {/* Foam latte swirl on surface */}
            <path d="M 80 52 Q 105 44 130 50 Q 118 60 95 56 Q 78 62 80 52 Z" fill="#C48858" opacity="0.75" />
            <path d="M 85 52 Q 110 44 135 52 Q 120 58 100 54" fill="none" stroke="#D4A57A" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* PROJ ECTS text */}
          <text x="108" y="100" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#C48858" transform="rotate(-5 108 100)" opacity="0.85">PROJ</text>
          <text x="108" y="128" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#C48858" transform="rotate(-5 108 128)" opacity="0.85">ECTS</text>
        </svg>

        {/* ── Liquid Stream — at mug's pour spout (bottom-left when tilted) ── */}
        <div
          ref={streamRef}
          className="absolute pointer-events-none"
          style={{ top: "78%", left: "4%", opacity: 0, transformOrigin: "top center" }}
        >
          <svg viewBox="0 0 54 140" className="w-8 sm:w-12 h-auto">
            <path
              d="M 16 0 Q 8 40 26 72 T 18 140 L 34 140 Q 44 72 38 40 T 30 0 Z"
              fill="#3A1D0B" stroke="#000" strokeWidth="2"
            />
            <path d="M 21 4 Q 12 44 28 74 T 22 136" fill="none" stroke="#7E4722" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 25 10 Q 18 44 30 70" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            {/* Animated falling droplets */}
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

      {/* ── Label + button ── */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
        <span className="bg-[#FFE600] text-black font-doodle text-sm sm:text-base font-black px-4 py-1.5 handdrawn-box shadow-[3px_3px_0_#000000] rotate-[-1deg] inline-flex items-center gap-2">
          <Coffee className="w-4 h-4 animate-bounce" />
          {allPoured
            ? "All projects poured & revealed! ☕✨"
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
