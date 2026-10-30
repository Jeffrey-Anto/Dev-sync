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

type SpiderAction =
  | "swing"
  | "flip"
  | "run"
  | "shoot"
  | "pull"
  | "landing"
  | "dive"
  | "idle";

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
  } else if (action === "flip") {
    stripUrl = "/sprites/spiderman/spidey_flip_strip.png";
    frameW = 80;
    frameH = 80;
    totalW = 800;
    currentFrame = Math.min(9, Math.max(0, frameIndex % 10));
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
  } else if (action === "landing") {
    stripUrl = "/sprites/spiderman/spidey_landing_strip.png";
    frameW = 80;
    frameH = 60;
    totalW = 400;
    currentFrame = Math.min(4, Math.max(0, frameIndex % 5));
  } else if (action === "dive") {
    stripUrl = "/sprites/spiderman/spidey_dive_strip.png";
    frameW = 80;
    frameH = 80;
    totalW = 400;
    currentFrame = Math.min(4, Math.max(0, frameIndex % 5));
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
                <line x1={web.x1} y1={web.y1} x2={web.x1 - 14} y2={web.y1 - 10} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 + 14} y2={web.y1 - 10} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 - 5} y2={web.y1 - 15} stroke="#cbd5e1" strokeWidth="1.0" />
                <line x1={web.x1} y1={web.y1} x2={web.x1 + 5} y2={web.y1 - 15} stroke="#cbd5e1" strokeWidth="1.0" />
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

            {/* 5. Target Web Splat / Connection on the Spider Logo */}
            {web.isPulling ? (
              <g opacity="0.95">
                {/* Radial Web Impact Rings */}
                <circle cx={web.x2} cy={web.y2} r="16" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={web.x2} cy={web.y2} r="9" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
                {/* 8 Radial Spiderweb Strands */}
                <line x1={web.x2 - 18} y1={web.y2} x2={web.x2 + 18} y2={web.y2} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x2} y1={web.y2 - 18} x2={web.x2} y2={web.y2 + 18} stroke="#ffffff" strokeWidth="1.2" />
                <line x1={web.x2 - 13} y1={web.y2 - 13} x2={web.x2 + 13} y2={web.y2 + 13} stroke="#ffffff" strokeWidth="1.0" />
                <line x1={web.x2 - 13} y1={web.y2 + 13} x2={web.x2 + 13} y2={web.y2 - 13} stroke="#ffffff" strokeWidth="1.0" />
                {/* Central Glowing Silk Impact Core */}
                <circle cx={web.x2} cy={web.y2} r="4" fill="#ffffff" filter="url(#silk-shimmer)" />
                <circle cx={web.x2} cy={web.y2} r="2" fill="#38bdf8" />
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

// ─── Swing lane (invisible anchor for the sprite and the scroll trigger) ────

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
  const [statusText, setStatusText] = useState("Spidey is on standby — press START HERO COMBO!");

  // Hide all cards initially on mount / show initial hanging 3D silk cocoons
  const hideAllCards = useCallback(() => {
    cardRefs.forEach((r) => {
      if (r.current) {
        gsap.set(r.current, {
          opacity: 1,
          y: -18,
          scale: 0.94,
          pointerEvents: "none",
        });

        const cocoon = r.current.querySelector(".js-cocoon-wrapper");
        if (cocoon) {
          gsap.set(cocoon, { opacity: 1, display: "block" });
          const left = cocoon.querySelector(".js-cocoon-left");
          const right = cocoon.querySelector(".js-cocoon-right");
          const core = cocoon.querySelector(".js-cocoon-core");
          const seam = cocoon.querySelector(".js-cocoon-seam");
          const threads = cocoon.querySelector(".js-cocoon-threads");
          const burst = cocoon.querySelector(".js-cocoon-burst");
          if (left) gsap.set(left, { rotateY: 0, x: 0, opacity: 1 });
          if (right) gsap.set(right, { rotateY: 0, x: 0, opacity: 1 });
          if (core) gsap.set(core, { scale: 1, opacity: 1 });
          if (seam) gsap.set(seam, { opacity: 1 });
          if (threads) gsap.set(threads, { opacity: 1, y: 0 });
          if (burst) gsap.set(burst, { opacity: 0, scale: 0.8 });
        }
      }
    });
  }, [cardRefs]);

  useEffect(() => {
    hideAllCards();
  }, [hideAllCards]);

  // ─── Seamless Continuous Web-Swinging & Acrobatic Chain ───────────────────
  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length || !runnerRef.current || !roadTrackRef.current) return;

    tlRef.current?.kill();
    setIsRunning(true);
    setAllDone(false);
    setRevealedCount(0);
    setActiveWebs([]);
    setActionState("swing");

    hideAllCards();

    const runner = runnerRef.current;
    const road = roadTrackRef.current;
    const roadRect = road.getBoundingClientRect();

    // Initial setup: Spider-Man appears ready to swing in from high left
    gsap.set(runner, { x: -100, y: -65, rotation: 25, opacity: 1, scale: 1.25 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setAllDone(true);
        setActiveWebs([]);

        // Heroic Landing & Stance Finale
        setActionState("landing");
        gsap.set(runner, { y: 12, rotation: 0 });
        setFrame(4);

        // Rise into classic ready idle stance
        gsap.delayedCall(0.5, () => {
          setActionState("idle");
          gsap.to(runner, { y: 0, duration: 0.3, ease: "back.out(2)" });

          let idleFrame = 0;
          const idleInt = setInterval(() => {
            idleFrame = (idleFrame + 1) % 11;
            setFrame(idleFrame);
          }, 110);

          // Exit swing after victory pose
          gsap.delayedCall(1.6, () => {
            clearInterval(idleInt);
            setActionState("swing");
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
          });
        });
      },
    });
    tlRef.current = tl;

    // Measured Glove Hand Coordinates (spidey_swing_strip)
    const SWING_HANDS = [
      { ox: -14.5, oy: -21.0 }, // frame 0: gloves reaching back into swing
      { ox: 14.5,  oy: -19.0 }, // frame 1: gloves reaching forward
      { ox: 9.5,   oy: -28.0 }, // frame 2: gloves holding web above
      { ox: 5.0,   oy: -28.0 }, // frame 3: gloves at apex of swing
      { ox: -2.0,  oy: -25.0 }, // frame 4: gloves ascending
      { ox: -2.0,  oy: -27.0 }, // frame 5: gloves high kick
      { ox: -16.0, oy: -24.0 }, // frame 6: gloves releasing
      { ox: -21.5, oy: -29.0 }, // frame 7: gloves in somersault
    ];

    validRefs.forEach((ref, i) => {
      const card = ref.current!;

      // ────────────────────────────────────────────────────────────────────────
      // PHASE A: Seamless Web-Swing Swoop across Card `i`
      // ────────────────────────────────────────────────────────────────────────
      const swingState = { progress: 0 };
      const duration = 1.6;

      tl.add(() => {
        setActionState("swing");
        setStatusText(`Spider-Man web-swinging across Project ${i + 1}… 🕸️`);
      });

      tl.to(swingState, {
        progress: 1,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: function () {
          if (!roadTrackRef.current || !ref.current || !runnerRef.current) return;
          const currentRoad = roadTrackRef.current.getBoundingClientRect();
          const cardRect = ref.current.getBoundingClientRect();

          const cardCenterX = cardRect.left + cardRect.width / 2 - currentRoad.left;
          const targetCardX = cardCenterX - 45;

          // Seamless continuity: Start where previous flip/swing finished
          const prevX = i === 0 ? -90 : targetCardX - 160;
          const nextX = i === validRefs.length - 1 ? currentRoad.width + 120 : targetCardX + 160;

          const t = swingState.progress;
          const currentX = gsap.utils.interpolate(prevX, nextX, t);
          // Parabolic swing arc
          const currentY = -65 + 72 * Math.sin(t * Math.PI);
          const currentRotation = 26 * (1 - 2 * t);

          const swingFrame = Math.min(7, Math.floor(t * 8));
          setFrame(swingFrame);

          gsap.set(runner, { x: currentX, y: currentY, rotation: currentRotation });

          const runnerBox = runner.getBoundingClientRect();
          const cx = runnerBox.left + runnerBox.width / 2;
          const cy = runnerBox.top + runnerBox.height / 2;
          const rad = (currentRotation * Math.PI) / 180;
          const hOff = SWING_HANDS[swingFrame] ?? { ox: 0, oy: -45 };
          const scale = 1.25;

          const handRotX = (hOff.ox * Math.cos(rad) - hOff.oy * Math.sin(rad)) * scale;
          const handRotY = (hOff.ox * Math.sin(rad) + hOff.oy * Math.cos(rad)) * scale;
          const handX = cx + handRotX;
          const handY = cy + handRotY;

          const shootRotX = (18 * Math.cos(rad) - 6 * Math.sin(rad)) * scale;
          const shootRotY = (18 * Math.sin(rad) + 6 * Math.cos(rad)) * scale;
          const shooterX = cx + shootRotX;
          const shooterY = cy + shootRotY;

          const anchorX = cardRect.left + cardRect.width / 2;
          const anchorY = Math.max(15, cardRect.top - 120);

          const overheadOpacity = t < 0.82 ? 1 : Math.max(0, 1 - (t - 0.82) / 0.18);
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

          // Snatch web triggers at mid-swoop (t in 0.35..0.75)
          if (t >= 0.35 && t <= 0.75) {
            const pullT = (t - 0.35) / 0.40;

            // Target the exact center of the Spider Chrysalis Logo on the cocoon
            const coreEl = ref.current.querySelector(".js-cocoon-core");
            let targetLogoX = cardRect.left + cardRect.width / 2;
            let targetLogoY = cardRect.top + cardRect.height * 0.50; // Exact vertical center of cocoon
            if (coreEl) {
              const coreRect = coreEl.getBoundingClientRect();
              targetLogoX = coreRect.left + coreRect.width / 2;
              targetLogoY = coreRect.top + coreRect.height * 0.40; // Center of the diamond spider badge
            }

            // Web-shot travels down directly and locks onto the spider logo center
            const startSkyY = Math.max(15, cardRect.top - 140);
            const currentImpactY = pullT < 0.22
              ? startSkyY + (targetLogoY - startSkyY) * (pullT / 0.22)
              : targetLogoY;

            const snatchBow = -14 * Math.sin(pullT * Math.PI);

            webs.push({
              x1: shooterX,
              y1: shooterY,
              x2: targetLogoX,
              y2: currentImpactY,
              opacity: 1,
              isPulling: true,
              bowOffset: snatchBow,
              type: "snatch",
            });
          }

          setActiveWebs(webs);
        },
      });

      // ── Cocoon 3D Butterfly Emergence Animation ──
      tl.add(() => {
        const cocoon = card.querySelector(".js-cocoon-wrapper");
        if (cocoon) {
          const left = cocoon.querySelector(".js-cocoon-left");
          const right = cocoon.querySelector(".js-cocoon-right");
          const core = cocoon.querySelector(".js-cocoon-core");
          const seam = cocoon.querySelector(".js-cocoon-seam");
          const threads = cocoon.querySelector(".js-cocoon-threads");
          const burst = cocoon.querySelector(".js-cocoon-burst");

          // 1. Suspension threads snap
          if (threads) gsap.to(threads, { opacity: 0, y: -25, duration: 0.35, ease: "power2.in" });

          // 2. Central seal & seam split open with an energy flash
          if (core) gsap.to(core, { scale: 1.4, opacity: 0, duration: 0.4, ease: "back.in(2)" });
          if (seam) gsap.to(seam, { opacity: 0, duration: 0.25 });

          // 3. Cocoon inner burst flares outward
          if (burst) {
            gsap.fromTo(
              burst,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1.3, duration: 0.35, yoyo: true, repeat: 1, ease: "power2.out" }
            );
          }

          // 4. 3D Left & Right Wings peel open 125° like butterfly wings
          if (left) {
            gsap.to(left, {
              rotateY: -125,
              x: -35,
              opacity: 0,
              duration: 0.85,
              ease: "power2.out",
            });
          }
          if (right) {
            gsap.to(right, {
              rotateY: 125,
              x: 35,
              opacity: 0,
              duration: 0.85,
              ease: "power2.out",
            });
          }
        }
      }, "<+0.50");

      // Card blooms / hatches forward into place like an emerging butterfly
      tl.to(
        card,
        {
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "elastic.out(1.1, 0.45)",
          onStart: () => {
            setRevealedCount((prev) => prev + 1);
          },
          onComplete: () => {
            gsap.set(card, { pointerEvents: "auto" });
            const cocoon = card.querySelector(".js-cocoon-wrapper");
            if (cocoon) gsap.set(cocoon, { display: "none" });
          },
        },
        "<+0.05"
      );

      // Authentic white silk web impact flash on card border
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

      // ────────────────────────────────────────────────────────────────────────
      // PHASE B: Mid-Air Acrobatic Somersault Flip Transition to Next Card
      // ────────────────────────────────────────────────────────────────────────
      if (i < validRefs.length - 1) {
        const nextCard = validRefs[i + 1].current!;

        tl.add(() => {
          setActiveWebs([]);
          setActionState("flip");
          setStatusText("Spider-Man executing mid-air flip into next swing… 🤸‍♂️");
        });

        const flipObj = { t: 0 };
        tl.to(flipObj, {
          t: 1,
          duration: 0.75,
          ease: "power1.inOut",
          onUpdate: function () {
            if (!roadTrackRef.current || !card || !nextCard || !runnerRef.current) return;
            const currentRoad = roadTrackRef.current.getBoundingClientRect();
            const c1Rect = card.getBoundingClientRect();
            const c2Rect = nextCard.getBoundingClientRect();

            const c1X = c1Rect.left + c1Rect.width / 2 - currentRoad.left - 45 + 160;
            const c2X = c2Rect.left + c2Rect.width / 2 - currentRoad.left - 45 - 160;

            const t = flipObj.t;
            const fX = gsap.utils.interpolate(c1X, c2X, t);
            // Slight mid-air parabolic rise and dip
            const fY = -65 - 18 * Math.sin(t * Math.PI);

            const fIdx = Math.min(9, Math.floor(t * 10));
            setFrame(fIdx);

            gsap.set(runner, { x: fX, y: fY, rotation: 0 });
          },
        });
      }
    });
  }, [cardRefs, hideAllCards]);

  // ScrollTrigger auto-activation
  useEffect(() => {
    if (!roadTrackRef.current) return;
    const road = roadTrackRef.current;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: road.closest("section") ?? road,
        start: "top 70%",
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
    <div className="sticky bottom-0 z-40 w-full mt-12 mb-6 select-none pointer-events-none">
      {/* Full-screen SVG Web Overlay */}
      <WebOverlay webs={activeWebs} />

      {/* ─── Swing lane ─── */}
      <div
        ref={roadTrackRef}
        className="relative w-full h-24 sm:h-28 flex items-center overflow-visible"
      >
        {/* ─── Spiderman Authentic Retro Game Sprite (Full Unclipped Z-Layer) ─── */}
        <div
          ref={runnerRef}
          className="absolute bottom-3 pointer-events-none z-30 overflow-visible"
          style={{ opacity: 0, transformOrigin: "center center" }}
        >
          <SpiderManSprite frameIndex={frame} action={actionState} />
        </div>
      </div>

      {/* ─── Retro Game Action & Status Bar ─── */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 backdrop-blur-md text-xs font-mono text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <span className="text-base animate-bounce">🕷️</span>
          <span>
            {allDone
              ? "All projects pulled down & revealed! 🕸️✨"
              : isRunning
                ? statusText
                : "Spidey is on standby — press START HERO COMBO!"}
          </span>
        </div>

        <button
          id="spidey-swing-btn"
          onClick={handleButtonClick}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>🕸️</span>
          <span>{isRunning ? "HERO IN ACTION…" : allDone ? "TRIGGER COMBO AGAIN! 🕷️" : "START HERO COMBO!"}</span>
        </button>
      </div>
    </div>
  );
}