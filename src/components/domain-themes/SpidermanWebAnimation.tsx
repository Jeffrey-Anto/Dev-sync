"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpidermanWebAnimationProps {
  onTriggerSwing?: () => void;
  swingCount: number;
  cardRefs: React.RefObject<HTMLElement | null>[];
}

type SpiderAction = "run" | "shoot" | "pull" | "swing" | "idle";

// ─── Authentic 16/32-Bit Original Retro Game Spider-Man Sprite ──────────────
// Uses transparent PNG sprite sheets with grounded baselines and pixel-perfect rendering
function SpiderManSprite({
  frameIndex = 0,
  action = "swing",
  scale = 1,
}: {
  frameIndex?: number;
  action?: SpiderAction;
  scale?: number;
}) {
  let stripUrl = "/sprites/spiderman/spidey_swing_strip.png";
  let frameW = 90;
  let frameH = 100;
  let totalW = 720;
  let currentFrame = frameIndex % 8;

  if (action === "swing") {
    stripUrl = "/sprites/spiderman/spidey_swing_strip.png";
    frameW = 90;
    frameH = 100;
    totalW = 720;
    currentFrame = Math.min(7, Math.max(0, frameIndex % 8));
  } else if (action === "run") {
    stripUrl = "/sprites/spiderman/spidey_run_strip.png";
    frameW = 80;
    frameH = 95;
    totalW = 720;
    currentFrame = frameIndex % 9;
  } else if (action === "shoot") {
    stripUrl = "/sprites/spiderman/spidey_shoot_strip.png";
    frameW = 80;
    frameH = 80;
    totalW = 720;
    currentFrame = 4; // Authentic upward web-shooting pose
  } else if (action === "pull") {
    stripUrl = "/sprites/spiderman/spidey_pull_strip.png";
    frameW = 90;
    frameH = 105;
    totalW = 720;
    currentFrame = 2; // Centered 2-handed power heave stance
  } else if (action === "idle") {
    stripUrl = "/sprites/spiderman/spidey_idle_strip.png";
    frameW = 80;
    frameH = 95;
    totalW = 880;
    currentFrame = frameIndex % 11;
  }

  const bgX = -currentFrame * frameW;

  return (
    <div
      style={{
        width: `${frameW}px`,
        height: `${frameH}px`,
        backgroundImage: `url(${stripUrl})`,
        backgroundPosition: `${bgX}px 0px`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${totalW}px ${frameH}px`,
        imageRendering: "pixelated",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
      className="drop-shadow-[0_12px_20px_rgba(0,0,0,0.95)] select-none pointer-events-none"
    />
  );
}

// ─── Dual-Layer Organic Silk Web Overlay (Overhead Swing Tether + Card Snatch Web) ───
export interface WebLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  isPulling?: boolean;
  bowOffset?: number;
  type?: "overhead" | "snatch";
}

function WebOverlay({ webs }: { webs: WebLine[] }) {
  if (!webs || webs.length === 0) return null;

  return (
    <svg
      className="fixed pointer-events-none"
      style={{ top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999 }}
    >
      <defs>
        {/* Subtle Silk Shimmer (Soft White Glow, No Laser Bloom) */}
        <filter id="silk-shimmer" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {webs.map((web, idx) => {
        if (web.opacity <= 0.01) return null;

        // Calculate dynamic organic whip/catenary curve points
        const dx = web.x2 - web.x1;
        const dy = web.y2 - web.y1;
        const len = Math.hypot(dx, dy) || 1;
        // Perpendicular vector for natural tension bow
        const nx = -dy / len;
        const ny = dx / len;

        const bow = web.bowOffset ?? (web.isPulling ? -16 : 18);
        const cp1X = web.x1 + dx * 0.32 + nx * bow * 0.7;
        const cp1Y = web.y1 + dy * 0.32 + ny * bow * 0.7;
        const cp2X = web.x1 + dx * 0.68 + nx * bow * 1.15;
        const cp2Y = web.y1 + dy * 0.68 + ny * bow * 1.15;

        const curvePath = `M ${web.x1} ${web.y1} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${web.x2} ${web.y2}`;

        return (
          <g key={`silk-web-${idx}`} opacity={web.opacity}>
            {/* 1. Ceiling Spider-Web Anchor Cluster (Only on overhead swing anchors) */}
            {web.type !== "snatch" && (
              <g opacity="0.95">
                {/* Branching Silk Anchor Threads */}
                <line x1={web.x1} y1={web.y1} x2={web.x1 - 14} y2={web.y1 - 10} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 + 14} y2={web.y1 - 10} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 - 5} y2={web.y1 - 15} stroke="#cbd5e1" strokeWidth="1.0" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 + 5} y2={web.y1 - 15} stroke="#cbd5e1" strokeWidth="1.0" />
                {/* Anchor Knot */}
                <circle cx={web.x1} cy={web.y1} r="2.5" fill="#ffffff" filter="url(#silk-shimmer)" />
                <circle cx={web.x1} cy={web.y1} r="1.5" fill="#e2e8f0" />
              </g>
            )}

            {/* 2. Outer Translucent Silk Sheath (Soft natural white halo) */}
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth={web.isPulling ? 5 : 4}
              strokeLinecap="round"
              filter="url(#silk-shimmer)"
            />

            {/* 3. Core Silk Strand (Pure white solid thread) */}
            <path
              d={curvePath}
              fill="none"
              stroke="#ffffff"
              strokeWidth={web.isPulling ? 2.5 : 2}
              strokeLinecap="round"
            />

            {/* 4. Secondary Braided Specular Highlight */}
            <path
              d={curvePath}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* 5. Target Web Splat / Connection (At card or hand) */}
            {web.isPulling ? (
              <g opacity="0.95">
                {/* Micro web splat pattern at card contact */}
                <circle cx={web.x2} cy={web.y2} r="7" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                <line x1={web.x2 - 9} y1={web.y2 - 6} x2={web.x2 + 9} y2={web.y2 + 6} stroke="#ffffff" strokeWidth="1" />
                <line x1={web.x2 - 9} y1={web.y2 + 6} x2={web.x2 + 9} y2={web.y2 - 6} stroke="#ffffff" strokeWidth="1" />
                <circle cx={web.x2} cy={web.y2} r="3" fill="#ffffff" />
              </g>
            ) : (
              <circle cx={web.x2} cy={web.y2} r="2" fill="#ffffff" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── 2.5D Horizontal Perspective Highway Track ──────────────────────────────
function GeometricPerspectiveRoad() {
  const seams = Array.from({ length: 26 }, (_, i) => i * 48);
  const dashes = Array.from({ length: 18 }, (_, i) => i * 68 + 10);

  return (
    <svg
      viewBox="0 0 1200 110"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <linearGradient id="highway-asphalt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#080a14" />
          <stop offset="35%" stopColor="#0f1322" />
          <stop offset="70%" stopColor="#151b30" />
          <stop offset="100%" stopColor="#1a223d" />
        </linearGradient>

        <linearGradient id="top-guardrail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="bottom-curb" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* 1. Main Asphalt Surface */}
      <rect x="0" y="0" width="1200" height="110" fill="url(#highway-asphalt)" />

      {/* 2. Longitudinal Depth Strips */}
      <rect x="0" y="0" width="1200" height="24" fill="#000000" opacity="0.35" />
      <line x1="0" y1="24" x2="1200" y2="24" stroke="#38bdf8" strokeWidth="0.8" opacity="0.15" />
      <line x1="0" y1="82" x2="1200" y2="82" stroke="#38bdf8" strokeWidth="0.8" opacity="0.15" />

      {/* 3. 2.5D Isometric Diagonal Asphalt Seams */}
      {seams.map((x, idx) => (
        <line
          key={`seam-${idx}`}
          x1={x + 35}
          y1="8"
          x2={x}
          y2="102"
          stroke="#38bdf8"
          strokeWidth="1.2"
          opacity={idx % 2 === 0 ? 0.12 : 0.06}
        />
      ))}

      {/* 4. Horizontal Center Lane Dashes */}
      {dashes.map((dx, idx) => (
        <g key={`dash-${idx}`}>
          <polygon
            points={`${dx},52 ${dx + 42},52 ${dx + 38},56 ${dx - 4},56`}
            fill="#fbbf24"
            opacity="0.85"
          />
          <line
            x1={dx - 4}
            y1="54"
            x2={dx + 42}
            y2="54"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity="0.3"
          />
        </g>
      ))}

      {/* 5. Top Far Guardrail */}
      <rect x="0" y="0" width="1200" height="6" fill="url(#top-guardrail)" />
      <line x1="0" y1="6" x2="1200" y2="6" stroke="#000000" strokeWidth="1.5" opacity="0.8" />
      <line x1="0" y1="8" x2="1200" y2="8" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />

      {/* 6. Bottom Near Curb */}
      <rect x="0" y="102" width="1200" height="8" fill="url(#bottom-curb)" />
      <line x1="0" y1="102" x2="1200" y2="102" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <line x1="0" y1="110" x2="1200" y2="110" stroke="#083344" strokeWidth="2" opacity="0.9" />
    </svg>
  );
}

export default function SpidermanWebAnimation({
  onTriggerSwing,
  swingCount,
  cardRefs,
}: SpidermanWebAnimationProps) {
  const roadTrackRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [actionState, setActionState] = useState<SpiderAction>("swing");
  const [allDone, setAllDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeWebs, setActiveWebs] = useState<WebLine[]>([]);
  const [frame, setFrame] = useState(0);

  // Hide all cards initially on mount
  const hideAllCards = useCallback(() => {
    cardRefs.forEach((r) => {
      if (r.current) {
        gsap.set(r.current, {
          opacity: 0,
          y: -240,
          scale: 0.35,
          pointerEvents: "none",
        });
      }
    });
  }, [cardRefs]);

  useEffect(() => {
    hideAllCards();
  }, [hideAllCards]);

  // ─── Aerial Web-Swinging & Project Snatching Routine ──────────────────────
  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length || !runnerRef.current || !roadTrackRef.current) return;

    tlRef.current?.kill();
    setIsRunning(true);
    setAllDone(false);
    setActionState("swing");
    setRevealedCount(0);
    setActiveWebs([]);

    hideAllCards();

    const runner = runnerRef.current;
    const road = roadTrackRef.current;
    const roadRect = road.getBoundingClientRect();

    // Initial setup: Spider-Man appears ready to swing in from high left
    gsap.set(runner, { x: -100, y: -70, rotation: 25, opacity: 1, scale: 1.25 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setAllDone(true);
        setActiveWebs([]);
        // Clean acrobatic exit swing off-screen to right
        gsap.to(runner, {
          x: roadRect.width + 160,
          y: -90,
          rotation: -28,
          duration: 1.1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(runner, { opacity: 0 });
          },
        });
      },
    });
    tlRef.current = tl;

    validRefs.forEach((ref, i) => {
      const card = ref.current!;

      tl.add(() => {
        setActionState("swing");
      });

      // Swing Arc Animation for Card `i` (Slower, cinematic swing pace)
      const swingState = { progress: 0 };
      const duration = 1.65;

      tl.to(swingState, {
        progress: 1,
        duration: duration,
        ease: "power1.inOut",
        onStart: () => {
          setActionState("swing");
        },
        onUpdate: function () {
          if (!roadTrackRef.current || !ref.current || !runnerRef.current) return;

          const currentRoad = roadTrackRef.current.getBoundingClientRect();
          const cardRect = ref.current.getBoundingClientRect();

          // Calculate key swing points relative to track
          const cardCenterX = cardRect.left + cardRect.width / 2 - currentRoad.left;
          const targetCardX = cardCenterX - 45; // Centered sprite anchor

          // Previous swing exit or start
          const prevX = i === 0 ? -90 : targetCardX - 180;
          // Next swing apex or exit
          const nextX = i === validRefs.length - 1 ? currentRoad.width + 120 : targetCardX + 180;

          const t = swingState.progress;

          // Parabolic Swing Trajectory
          const currentX = gsap.utils.interpolate(prevX, nextX, t);
          // Parabola: High at edges (y ~ -65), lowest in center directly above road (y ~ 5)
          const currentY = -65 + 72 * Math.sin(t * Math.PI);

          // Realistic pendulum angle: tilted forward at start (+28°), level at midpoint (0°), kicking up at end (-28°)
          const currentRotation = 28 * (1 - 2 * t);

          // Map 8 authentic retro swing frames to arc progress
          const swingFrame = Math.min(7, Math.floor(t * 8));
          setFrame(swingFrame);

          gsap.set(runner, {
            x: currentX,
            y: currentY,
            rotation: currentRotation,
          });

          // ─── Overhead Swinging Web Tether (Ceiling to Hand) ───
          const runnerBox = runner.getBoundingClientRect();
          const handX = runnerBox.left + runnerBox.width * 0.52;
          const handY = runnerBox.top + runnerBox.height * 0.22;

          // Ceiling anchor placed above the card in the viewport
          const anchorX = cardRect.left + cardRect.width / 2 + 10;
          const anchorY = Math.max(15, cardRect.top - 120);

          const overheadOpacity = t < 0.82 ? 1 : Math.max(0, 1 - (t - 0.82) / 0.18);
          // Dynamic organic whip curve: bows backward under momentum and tension
          const swingBow = 24 * Math.sin(t * Math.PI);

          const webs: WebLine[] = [
            {
              x1: anchorX,
              y1: anchorY,
              x2: handX,
              y2: handY,
              opacity: overheadOpacity,
              isPulling: false,
              bowOffset: swingBow,
              type: "overhead",
            },
          ];

          // ─── Snatch & Pull Web to Card (Triggered at Mid-Swoop t >= 0.35 and t <= 0.75) ───
          if (t >= 0.35 && t <= 0.75) {
            const pullT = (t - 0.35) / 0.40;
            const targetSkyY = Math.max(30, cardRect.top - 180);
            const targetPulledY = cardRect.top + 35;
            const currentCardY = targetSkyY + (targetPulledY - targetSkyY) * pullT;
            const snatchBow = -14 * Math.sin(pullT * Math.PI);

            webs.push({
              x1: handX,
              y1: handY,
              x2: cardRect.left + cardRect.width / 2,
              y2: currentCardY,
              opacity: 1,
              isPulling: true,
              bowOffset: snatchBow,
              type: "snatch",
            });
          }

          setActiveWebs(webs);
        },
      });

      // Snatches Card DOWN from top with superhero impact right at mid-swing
      tl.fromTo(
        card,
        {
          opacity: 0,
          y: -240,
          scale: 0.35,
          rotation: -6,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.85,
          ease: "elastic.out(1.1, 0.45)",
          onStart: () => {
            setRevealedCount((prev) => prev + 1);
          },
          onComplete: () => {
            gsap.set(card, { pointerEvents: "auto" });
          },
        },
        "<+0.55"
      );

      // Authentic white silk web impact flash celebration on card border
      tl.fromTo(
        card,
        { boxShadow: "0 0 0 0px rgba(255, 255, 255, 0)" },
        {
          boxShadow: "0 0 35px 6px rgba(255, 255, 255, 0.75), 0 0 15px 3px rgba(226, 232, 240, 0.9)",
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        "<"
      );

      if (i < validRefs.length - 1) {
        tl.to({}, { duration: 0.35 });
      }
    });
  }, [cardRefs, hideAllCards]);

  // ScrollTrigger auto-activation
  useEffect(() => {
    if (!roadTrackRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: roadTrackRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasRunRef.current) return;
          hasRunRef.current = true;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => runSequence())
          );
        },
      });
    });
    return () => ctx.revert();
  }, [runSequence]);

  // Manual Trigger
  useEffect(() => {
    if (swingCount > 0) {
      hasRunRef.current = false;
      runSequence();
    }
  }, [swingCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleButtonClick = () => {
    if (!isRunning) onTriggerSwing?.();
  };

  return (
    <div className="relative w-full mt-12 mb-6 select-none">
      {/* Full-screen SVG Web Overlay with Overhead Swings + Card Snatches */}
      <WebOverlay webs={activeWebs} />

      {/* ─── 2.5D Horizontal Perspective Highway Track ─── */}
      <div
        ref={roadTrackRef}
        className="relative w-full h-24 sm:h-28 flex items-center overflow-visible"
      >
        {/* Background Asphalt Road Surface (Clipped nicely to rounded pill) */}
        <div className="absolute inset-0 w-full h-full rounded-2xl border border-indigo-500/30 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_3px_rgba(255,255,255,0.1)] pointer-events-none">
          <GeometricPerspectiveRoad />
        </div>

        {/* ─── Spiderman Authentic Retro Game Sprite (Full Unclipped Z-Layer) ─── */}
        <div
          ref={runnerRef}
          className="absolute bottom-3 pointer-events-none z-30 overflow-visible"
          style={{ opacity: 0, transformOrigin: "center center" }}
        >
          {/* Ground Contact Shadow (Visible when swooping low over track) */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/80 rounded-full blur-[2px] pointer-events-none" />
          <SpiderManSprite frameIndex={frame} action={actionState} />
        </div>
      </div>

      {/* ─── Retro Game Action & Status Bar ─── */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 backdrop-blur-md text-xs font-mono text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <span className="text-base animate-bounce">🕷️</span>
          <span>
            {allDone
              ? "All projects pulled down & revealed! 🕸️✨"
              : isRunning
                ? "Spidey swinging across cards & pulling projects down… 🕸️"
                : "Scroll here — Spidey swings dynamically across the track and pulls each project!"}
          </span>
        </div>

        <button
          id="spidey-swing-btn"
          onClick={handleButtonClick}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>🕸️</span>
          <span>{isRunning ? "SWINGING & PULLING…" : allDone ? "SWING AGAIN! 🕷️" : "SWING & PULL PROJECTS!"}</span>
        </button>
      </div>
    </div>
  );
}