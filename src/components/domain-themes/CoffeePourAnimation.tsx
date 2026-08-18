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
  // The two surface ellipses — animate cy directly in SVG space (no group transform)
  const coffeeRimOuterRef = useRef<SVGEllipseElement>(null);
  const coffeeRimInnerRef = useRef<SVGEllipseElement>(null);

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

    const offsets = getCardOffsets(validRefs);
    const totalCards = validRefs.length;

    // ── Initial states ──
    gsap.set(group, { x: 0 });
    gsap.set(mug, { rotation: -4, transformOrigin: "center center" });
    gsap.set(stream, { opacity: 0, scaleY: 0 });
    if (sploosh) gsap.set(sploosh, { opacity: 0, scale: 0 });

    // Coffee fill starts FULL (y=52 = surface, height fills to bottom of cup ~y=200)
    if (coffeeFill) gsap.set(coffeeFill, { attr: { y: 52, height: 150 } });
    // Reset surface ellipses to top — rx=72 fits the mug rim (half-width ~75px), ry=14 gives good 3-D perspective
    if (coffeeRimOuterRef.current) gsap.set(coffeeRimOuterRef.current, { attr: { cy: 52, rx: 72, ry: 14 } });
    if (coffeeRimInnerRef.current) gsap.set(coffeeRimInnerRef.current, { attr: { cy: 52, rx: 58, ry: 9 } });

    // All cards hidden via clip-path pinch (magic lamp initial state)
    validRefs.forEach((r) => {
      const card = r.current!;
      gsap.set(card, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        // Pinched to a thin line at the top (stream spout point)
        clipPath: "polygon(49% 0%, 51% 0%, 51% 1%, 49% 1%)",
        transformOrigin: "top center",
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
      gsap.set(card, { rotation: 0 });

      // ① Slide group over card
      tl.to(group, { x: targetX, duration: 0.65, ease: "power3.inOut" });

      // ② Tilt mug into pour
      tl.to(mug, { rotation: -50, duration: 0.4, ease: "back.out(1.5)" }, "<+0.2");

      // ③ Coffee fill DRAINS + surface ellipses follow cy (SVG coordinate space, clip path works correctly)
      if (coffeeFill) {
        const drainPerCard = 130 / totalCards;
        const drainAmount = (i + 1) * drainPerCard;
        const newY = 52 + drainAmount;
        const newH = Math.max(4, 200 - newY);
        const drainFraction = drainAmount / 130;
        // Mug tapers from rx=72 at top to ~rx=48 at bottom — taper proportionally
        const outerRx = Math.max(48, 72 - drainFraction * 24);
        const innerRx = Math.max(38, 58 - drainFraction * 20);
        // ry shrinks slightly to maintain perspective depth illusion
        const outerRy = Math.max(9, 14 - drainFraction * 5);
        const innerRy = Math.max(6, 9 - drainFraction * 3);
        const newCy = 52 + drainAmount; // surface cy tracks fill level

        tl.to(coffeeFill, { attr: { y: newY, height: newH }, duration: 0.55, ease: "power2.inOut" }, "<");

        // Animate cy + rx/ry directly — surface oval shrinks as mug tapers downward
        if (coffeeRimOuterRef.current) {
          tl.to(coffeeRimOuterRef.current, { attr: { cy: newCy, rx: outerRx, ry: outerRy }, duration: 0.55, ease: "power2.inOut" }, "<");
        }
        if (coffeeRimInnerRef.current) {
          tl.to(coffeeRimInnerRef.current, { attr: { cy: newCy, rx: innerRx, ry: innerRy }, duration: 0.55, ease: "power2.inOut" }, "<");
        }
      }

      // ④ Stream appears from spout
      tl.to(
        stream,
        { opacity: 1, scaleY: 1, duration: 0.3, ease: "power2.out", transformOrigin: "top center" },
        "<+0.1"
      );

      // ⑤ ✨ MAGIC LAMP — liquid pours from stream spout into card shape
      //  Phase 1: top blows open wide (stream exits into card top)
      tl.to(
        card,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 72% 38%, 28% 38%)",
          duration: 0.22,
          ease: "power3.out",
        },
        "<+0.12"
      );
      //  Phase 2: wave ripples down (liquid fills the card body)
      tl.to(card, {
        clipPath: "polygon(0% 0%, 100% 0%, 84% 72%, 16% 72%)",
        duration: 0.2,
        ease: "power2.inOut",
      });
      //  Phase 3: bottom snaps open with elastic bounce
      tl.to(card, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.38,
        ease: "elastic.out(1.1, 0.45)",
      });
      // Clear clip-path so card is fully normal and scrollable
      tl.set(card, { clipPath: "none" });

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

          {/* Coffee top surface oval — properly sized to mug rim (half-width ~72px), clipped to mug interior */}
          <ellipse
            ref={coffeeRimOuterRef}
            cx="110" cy="52" rx="72" ry="14"
            fill="#3A1D0B" stroke="#000" strokeWidth="3"
            clipPath="url(#mug-body-clip)"
          />
          {/* Inner lighter ring — gives 3-D depth to the coffee surface */}
          <ellipse
            ref={coffeeRimInnerRef}
            cx="110" cy="52" rx="58" ry="9"
            fill="#522A12"
            clipPath="url(#mug-body-clip)"
          />
          {/* Foam highlight — tiny crescent to sell the liquid surface */}
          <ellipse
            cx="110" cy="52" rx="28" ry="4"
            fill="none" stroke="#C48858" strokeWidth="2.5" opacity="0.55"
            clipPath="url(#mug-body-clip)"
          />

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
