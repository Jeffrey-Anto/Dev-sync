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
const SpiderManSprite = React.memo(function SpiderManSprite({
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
});

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

// Memoized: the parent re-renders on every idle sprite frame (110ms), while
// the web lines only change during a swing.
const WebOverlay = React.memo(function WebOverlay({ webs }: { webs: WebLine[] }) {
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
});

// ─── Swing lane (invisible anchor for the sprite and the scroll trigger) ────

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

export default function SpidermanWebAnimation({
  onTriggerSwing,
  swingCount,
  cardRefs,
}: SpidermanWebAnimationProps) {
  const roadTrackRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [actionState, setActionState] = useState<SpiderAction>("idle");
  const [allDone, setAllDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeWebs, setActiveWebs] = useState<WebLine[]>([]);
  const [frame, setFrame] = useState(0);
  const [statusText, setStatusText] = useState("Spidey is on standby — scroll down to unveil projects! 🕷️");

  // Per-card reveal queue & scroll state
  const queueRef = useRef<number[]>([]);
  const isProcessingRef = useRef(false);
  const revealedSetRef = useRef<Set<number>>(new Set());
  const currentCardIndexRef = useRef<number | null>(null);
  const hasUserScrolledRef = useRef(false);

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

  // Start continuous subtle idle sprite loop
  const startIdleLoop = useCallback(() => {
    if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
    setActionState("idle");
    let idleF = 0;
    idleIntervalRef.current = setInterval(() => {
      idleF = (idleF + 1) % 11;
      setFrame(idleF);
    }, 110);
  }, []);

  const stopIdleLoop = useCallback(() => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }
  }, []);

  // ─── Single Card Reveal: Spidey swings to Card `index`, shoots web & breaks cocoon ───
  const revealSingleCard = useCallback(
    (index: number, onComplete: () => void) => {
      const card = cardRefs[index]?.current;
      const runner = runnerRef.current;
      const road = roadTrackRef.current;
      if (!card || !runner || !road) {
        onComplete();
        return;
      }

      stopIdleLoop();
      tlRef.current?.kill();

      const roadRect = road.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const cardCenterX = cardRect.left + cardRect.width / 2 - roadRect.left;
      const targetCardX = cardCenterX - 45;

      // Determine starting position: from previous card location or entrance from left
      const prevIdx = currentCardIndexRef.current;
      let startX: number;
      const currentRunnerOpacity = gsap.getProperty(runner, "opacity") as number;

      if (currentRunnerOpacity <= 0.05 || prevIdx === null) {
        // First entry
        startX = Math.max(-100, targetCardX - 220);
        gsap.set(runner, { x: startX, y: -65, rotation: 25, opacity: 1, scale: 1.25 });
      } else {
        startX = gsap.getProperty(runner, "x") as number;
      }

      // Read diamond spider badge center
      let coreOffset: { x: number; y: number } | null = null;
      const coreEl = card.querySelector(".js-cocoon-core");
      if (coreEl) {
        const cRect = card.getBoundingClientRect();
        const coreRect = coreEl.getBoundingClientRect();
        coreOffset = {
          x: coreRect.left + coreRect.width / 2 - cRect.left,
          y: coreRect.top + coreRect.height * 0.4 - cRect.top,
        };
      }

      setActionState("swing");
      setStatusText(`Spider-Man web-swinging to Project ${index + 1}… 🕸️`);

      const swingState = { progress: 0 };
      const duration = 1.35;

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveWebs([]);
          currentCardIndexRef.current = index;

          const totalValid = cardRefs.filter((r) => r.current).length;
          const isFinal = revealedSetRef.current.size >= totalValid;

          // Heroic landing pose
          setActionState("landing");
          gsap.set(runner, { y: 12, rotation: 0 });
          setFrame(4);

          if (isFinal) {
            setAllDone(true);
            setStatusText("All projects pulled down & revealed! 🕸️✨");

            // Exit victory sequence
            gsap.delayedCall(0.5, () => {
              startIdleLoop();
              gsap.to(runner, { y: 0, duration: 0.3, ease: "back.out(2)" });

              gsap.delayedCall(1.6, () => {
                stopIdleLoop();
                setActionState("swing");
                gsap.to(runner, {
                  x: roadRect.width + 160,
                  y: -90,
                  rotation: -28,
                  duration: 1.1,
                  ease: "power2.inOut",
                  onComplete: () => {
                    gsap.set(runner, { opacity: 0 });
                    onComplete();
                  },
                });
              });
            });
          } else {
            // Settle into ready idle stance waiting for user scroll
            gsap.delayedCall(0.3, () => {
              startIdleLoop();
              gsap.to(runner, { y: 0, duration: 0.25, ease: "back.out(2)" });
              setStatusText(`Project ${index + 1} unlocked! Scroll down for next… 🕷️`);
              onComplete();
            });
          }
        },
      });

      tlRef.current = tl;

      // ── Swing Arc & Dual Web Overlay ──
      tl.to(swingState, {
        progress: 1,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: function () {
          if (!roadTrackRef.current || !cardRefs[index]?.current || !runnerRef.current) return;
          const currentRoad = roadTrackRef.current.getBoundingClientRect();
          const cRect = cardRefs[index].current!.getBoundingClientRect();

          const cCenterX = cRect.left + cRect.width / 2 - currentRoad.left;
          const destX = cCenterX - 45;

          const t = swingState.progress;
          const currentX = gsap.utils.interpolate(startX, destX, t);
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

          const anchorX = cRect.left + cRect.width / 2;
          const anchorY = Math.max(15, cRect.top - 120);

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

            let targetLogoX = cRect.left + cRect.width / 2;
            let targetLogoY = cRect.top + cRect.height * 0.50;
            if (coreOffset) {
              targetLogoX = cRect.left + coreOffset.x;
              targetLogoY = cRect.top + coreOffset.y;
            }

            const startSkyY = Math.max(15, cRect.top - 140);
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
      }, "<+0.45");

      // Card blooms / hatches forward into place
      tl.to(
        card,
        {
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "elastic.out(1.1, 0.45)",
          onStart: () => {
            revealedSetRef.current.add(index);
            setRevealedCount(revealedSetRef.current.size);
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
    },
    [cardRefs, startIdleLoop, stopIdleLoop]
  );

  // ─── Process the Reveal Queue (One by One) ───
  const processQueue = useCallback(() => {
    if (isProcessingRef.current) return;
    if (!hasUserScrolledRef.current) return; // Do not open anything before user scrolls!
    if (queueRef.current.length === 0) {
      setIsRunning(false);
      return;
    }

    const nextIndex = queueRef.current.shift()!;
    // If already revealed, skip to next in queue
    if (revealedSetRef.current.has(nextIndex)) {
      processQueue();
      return;
    }

    isProcessingRef.current = true;
    setIsRunning(true);

    revealSingleCard(nextIndex, () => {
      isProcessingRef.current = false;
      processQueue();
    });
  }, [revealSingleCard]);

  // ─── ScrollTrigger Activation: Individual Card Triggers on Scroll ───
  useEffect(() => {
    if (!roadTrackRef.current) return;

    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length) return;

    // Listen for actual user scroll before unlocking reveal execution
    const handleScroll = () => {
      if (!hasUserScrolledRef.current && window.scrollY > 30) {
        hasUserScrolledRef.current = true;
        processQueue();
      }
    };

    // If page is refreshed while already scrolled down
    if (typeof window !== "undefined" && window.scrollY > 40) {
      hasUserScrolledRef.current = true;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      cardRefs.forEach((r, idx) => {
        if (!r.current) return;
        ScrollTrigger.create({
          trigger: r.current,
          start: "top 82%", // Triggers only when this card scrolls into view
          once: true,
          onEnter: () => {
            if (!revealedSetRef.current.has(idx)) {
              queueRef.current.push(idx);
              if (hasUserScrolledRef.current) {
                processQueue();
              }
            }
          },
        });
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(refreshTimer);
      ctx.revert();
      stopIdleLoop();
    };
  }, [cardRefs, processQueue, stopIdleLoop]);

  // ─── Manual Trigger / START HERO COMBO button ───
  const handleButtonClick = () => {
    if (isRunning) return;

    hasUserScrolledRef.current = true;
    const totalValid = cardRefs.filter((r) => r.current).length;

    // If all cards were already revealed, reset and run combo again
    if (revealedSetRef.current.size >= totalValid) {
      revealedSetRef.current.clear();
      setAllDone(false);
      setRevealedCount(0);
      currentCardIndexRef.current = null;
      hideAllCards();
      queueRef.current = cardRefs.map((_, i) => i);
      processQueue();
      onTriggerSwing?.();
      return;
    }

    // Otherwise, push all remaining unrevealed cards into the queue
    for (let i = 0; i < totalValid; i++) {
      if (!revealedSetRef.current.has(i) && !queueRef.current.includes(i)) {
        queueRef.current.push(i);
      }
    }
    processQueue();
    onTriggerSwing?.();
  };

  // Sync external swingCount trigger
  useEffect(() => {
    if (swingCount > 0) {
      hasUserScrolledRef.current = true;
      const totalValid = cardRefs.filter((r) => r.current).length;
      for (let i = 0; i < totalValid; i++) {
        if (!revealedSetRef.current.has(i) && !queueRef.current.includes(i)) {
          queueRef.current.push(i);
        }
      }
      processQueue();
    }
  }, [swingCount]); // eslint-disable-line react-hooks/exhaustive-deps

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
              : statusText}
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