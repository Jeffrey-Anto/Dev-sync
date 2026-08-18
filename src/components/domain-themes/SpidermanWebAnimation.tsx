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

// ─── High-Definition 32-Bit Retro Pixel Spider-Man (Dynamic Open Arms) ──────────
// 32 Columns × 32 Rows with wide arm swing & dynamic web-pulling silhouette
// R = Red (#ff1e27), D = Dark Red Shadow (#a80512)
// B = Electric Blue (#0070f3), N = Deep Navy Shadow (#002b80)
// W = Pure White (#ffffff), G = Lens Grey (#94a3b8)
// K = Jet Black (#0b0e14), _ = Transparent
function SpiderManSprite({
  frameIndex = 0,
  isShooting = false,
}: {
  frameIndex?: number;
  isShooting?: boolean;
}) {
  const RUN_FRAMES = [
    // Frame 0: Sprint 1 (Left arm reaching back, Right arm pumping forward open!)
    [
      "__________KKKKKKKK______________",
      "________KKRRRRRRRRKK____________",
      "_______KRRRDKRRRRKKRK___________",
      "______KRRRRDKRRRRKKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDGGKKKGGKRRK__________",
      "_______KRRRDKRRRRKRRK___KKKK____",
      "___KKK__KKRRRKKKKRRK___KRRRRK___",
      "__KRRRK_KKKKKKKKKKKKKKKKRRRDK___",
      "__KRRRDKKBNNNRRRRRRRRNNBNRRDK___",
      "___KRRDKBBBNNRRRKKRRRNNBBBNK____",
      "____KKKKBBNNNRRKKKKRRNNNBBK_____",
      "_______KBNNNRRRKKKKRRRNNBNK_____",
      "_______KKNNNRRRKKKKRRRNNNKK_____",
      "______KBNNNRRRRKRRKRRRRNNBK_____",
      "______KBBNNNRRRRRRRRRRRNNBK_____",
      "_______KKNNNNNNNNNNNNNNNKK______",
      "________KBNNNNNNNNNNNNBNK_______",
      "_______KBBBNNN_____NNNBBBNK_____",
      "______KBBBNN_________NNBBBNK____",
      "_____KBBBNN___________NNBBBNK___",
      "_____KBBBN_____________NNBBBK___",
      "____KRRDK_______________KRRDK___",
      "____KRRDK_______________KRRDK___",
      "____KRRDK________________KRRDK__",
      "____KRRDK_________________KRRDK_",
      "_____KKKK__________________KKKK_",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 1: Passing Stride (Arms passing through torso)
    [
      "__________KKKKKKKK______________",
      "________KKRRRRRRRRKK____________",
      "_______KRRRDKRRRRKKRK___________",
      "______KRRRRDKRRRRKKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDGGKKKGGKRRK__________",
      "_______KRRRDKRRRRKRRK___________",
      "________KKRRRKKKKRRK____________",
      "______KKKKKKKKKKKKKKKK__________",
      "_____KBNNNRRRRRRRRNNBNK_________",
      "____KBBBNNRRRKKRRRNNBBBNK_______",
      "____KBBNNNRRKKKKRRNNNBBK________",
      "____KBNNNRRRKKKKRRRNNBNK________",
      "____KKNNNRRRKKKKRRRNNNKK________",
      "___KBNNNRRRRKRRKRRRRNNBK________",
      "___KBBNNRRRRRRRRRRRRNNBK________",
      "____KKNNNNNNNNNNNNNNNKK_________",
      "______KNNNNNNNNNNNNNK___________",
      "_______KBBBNNNNNNBBBK___________",
      "_______KBBBBNNNNBBBBK___________",
      "________KBBBNNNNBBBK____________",
      "________KBNNN__NNNBK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KKKK____KKKK____________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 2: Sprint 2 (Right arm reaching back, Left arm pumping forward open!)
    [
      "__________KKKKKKKK______________",
      "________KKRRRRRRRRKK____________",
      "_______KRRRDKRRRRKKRK___________",
      "______KRRRRDKRRRRKKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDGGKKKGGKRRK__________",
      "___KKKK_KRRRDKRRRRKRRK__________",
      "__KRRRRK_KKRRRKKKKRRK___KKK_____",
      "__KRRRDKKKKKKKKKKKKKKK_KRRRK____",
      "__KRRDKKBNNNRRRRRRRRNNBNRRDK____",
      "___KKK_KBBBNNRRRKKRRRNNBBBNK____",
      "_______KBBNNNRRKKKKRRNNNBBK_____",
      "_______KBNNNRRRKKKKRRRNNBNK_____",
      "_______KKNNNRRRKKKKRRRNNNKK_____",
      "______KBNNNRRRRKRRKRRRRNNBK_____",
      "______KBBNNRRRRRRRRRRRRNNBK_____",
      "_______KKNNNNNNNNNNNNNNNKK______",
      "________KBNNNNNNNNNNNNBNK_______",
      "_______KBBBNNN_____NNNBBBNK_____",
      "______KBBBNN_________NNBBBNK____",
      "_____KBBBNN___________NNBBBNK___",
      "_____KBBNN_____________NNBBBK___",
      "_____KRRDK_____________KRRDK____",
      "_____KRRDK______________KRRDK___",
      "_____KRRDK_______________KRRDK__",
      "_____KRRDK________________KRRDK_",
      "______KKKK_________________KKKK_",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 3: Passing Stride (return)
    [
      "__________KKKKKKKK______________",
      "________KKRRRRRRRRKK____________",
      "_______KRRRDKRRRRKKRK___________",
      "______KRRRRDKRRRRKKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDWWKKKWWKRRK__________",
      "______KRRRDGGKKKGGKRRK__________",
      "_______KRRRDKRRRRKRRK___________",
      "________KKRRRKKKKRRK____________",
      "______KKKKKKKKKKKKKKKK__________",
      "_____KBNNNRRRRRRRRNNBNK_________",
      "____KBBBNNRRRKKRRRNNBBBNK_______",
      "____KBBNNNRRKKKKRRNNNBBK________",
      "____KBNNNRRRKKKKRRRNNBNK________",
      "____KKNNNRRRKKKKRRRNNNKK________",
      "___KBNNNRRRRKRRKRRRRNNBK________",
      "___KBBNNRRRRRRRRRRRRNNBK________",
      "____KKNNNNNNNNNNNNNNNKK_________",
      "______KNNNNNNNNNNNNNK___________",
      "_______KBBBNNNNNNBBBK___________",
      "_______KBBBBNNNNBBBBK___________",
      "________KBBBNNNNBBBK____________",
      "________KBNNN__NNNBK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KRRDK__KRRDK____________",
      "________KKKK____KKKK____________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
  ];

  // Signature Wide Open Arms Shooting Pose (Left arm flung wide back, Right arm reaching high forward with open palm firing web!)
  const SHOOT_FRAME = [
    "__________KKKKKKKK________KKKK__",
    "________KKRRRRRRRRKK_____KRRWWR_",
    "_______KRRRDKRRRRKKRK___KKWWWKK_",
    "______KRRRRDKRRRRKKRRK_KKRRWWRK_",
    "______KRRRDWWKKKWWKRRK__KRRRRK__",
    "______KRRRDWWKKKWWKRRK___KKKK___",
    "______KRRRDWWKKKWWKRRK__KRRDK___",
    "______KRRRDGGKKKGGKRRK_KRRRRK___",
    "_______KRRRDKRRRRKRRK_KRRRRK____",
    "__KKKK__KKRRRKKKKRRKKRRRRK______",
    "_KRRRRKKKKKKKKKKKKKKKKKK________",
    "_KRRRDKKBNNNRRRRRRRRNNBNK_______",
    '__KRRDKBBBNNRRRKKRRRNNBBBNK_____',
    "___KKK_KBBNNNRRKKKKRRNNNBBK_____",
    "_______KBNNNRRRKKKKRRRNNBNK_____",
    "_______KKNNNRRRKKKKRRRNNNKK_____",
    "______KBNNNRRRRKRRKRRRRNNBK_____",
    "______KBBNNRRRRRRRRRRRRNNBK_____",
    "_______KKNNNNNNNNNNNNNNNKK______",
    "________KBNNNNNNNNNNNNBNK_______",
    "_______KBBBNNN_____NNNBBBNK_____",
    "______KBBBNN_________NNBBBNK____",
    "_____KBBBNN___________NNBBBNK___",
    "_____KBBBN_____________NNBBBK___",
    "____KRRDK_______________KRRDK___",
    "____KRRDK_______________KRRDK___",
    "____KRRDK________________KRRDK__",
    "____KRRDK_________________KRRDK_",
    "_____KKKK__________________KKKK_",
    "________________________________",
    "________________________________",
    "________________________________",
  ];

  const currentFrame = isShooting ? SHOOT_FRAME : RUN_FRAMES[frameIndex % 4];

  const colorMap: Record<string, string> = {
    R: "#ff1e27",
    D: "#a80512",
    B: "#0070f3",
    N: "#002b80",
    W: "#ffffff",
    G: "#94a3b8",
    K: "#0b0e14",
    _: "transparent",
  };

  const px = 2.4;
  const cols = 32;

  return (
    <svg
      viewBox={`0 0 ${cols * px} ${currentFrame.length * px}`}
      width={cols * px}
      height={currentFrame.length * px}
      style={{ imageRendering: "pixelated", display: "block" }}
      className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.9)]"
    >
      {currentFrame.map((row, ry) =>
        row.split("").map((c, cx) =>
          c !== "_" ? (
            <rect
              key={`${ry}-${cx}`}
              x={cx * px}
              y={ry * px}
              width={px}
              height={px}
              fill={colorMap[c] ?? "transparent"}
            />
          ) : null
        )
      )}
    </svg>
  );
}

// ─── Web Thread with Glowing Palm Muzzle Flash & Anchor ───────────────────────
interface WebState {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

function WebOverlay({ web }: { web: WebState | null }) {
  if (!web) return null;
  return (
    <svg
      className="fixed pointer-events-none"
      style={{ top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999 }}
    >
      <defs>
        <filter id="spidey-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Palm Web Muzzle Flash Burst */}
      <circle
        cx={web.x1}
        cy={web.y1}
        r="8"
        fill="#38bdf8"
        opacity={web.opacity * 0.9}
        filter="url(#spidey-glow)"
      />
      <circle
        cx={web.x1}
        cy={web.y1}
        r="3.5"
        fill="#ffffff"
        opacity={web.opacity}
      />

      {/* Outer Web Glow Line */}
      <line
        x1={web.x1}
        y1={web.y1}
        x2={web.x2}
        y2={web.y2}
        stroke="#38bdf8"
        strokeWidth="4"
        opacity={web.opacity * 0.8}
        filter="url(#spidey-glow)"
        strokeLinecap="round"
      />
      {/* Inner White Core Web Line */}
      <line
        x1={web.x1}
        y1={web.y1}
        x2={web.x2}
        y2={web.y2}
        stroke="#ffffff"
        strokeWidth="1.8"
        opacity={web.opacity}
        strokeLinecap="round"
      />

      {/* Top Web Impact Splat at Card Target */}
      <circle
        cx={web.x2}
        cy={web.y2}
        r="7"
        fill="#38bdf8"
        opacity={web.opacity * 0.9}
        filter="url(#spidey-glow)"
      />
      <circle
        cx={web.x2}
        cy={web.y2}
        r="3"
        fill="#ffffff"
        opacity={web.opacity}
      />
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
  const [isShooting, setIsShooting] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [web, setWeb] = useState<WebState | null>(null);
  const [frame, setFrame] = useState(0);
  const legIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Smooth 4-beat open-arm running cadence (125ms per phase)
  const startRunningLegs = useCallback(() => {
    if (legIntervalRef.current) return;
    legIntervalRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 125);
  }, []);

  const stopRunningLegs = useCallback(() => {
    if (legIntervalRef.current) {
      clearInterval(legIntervalRef.current);
      legIntervalRef.current = null;
    }
  }, []);

  // Hide all cards initially on mount so they appear only upon being pulled
  const hideAllCards = useCallback(() => {
    cardRefs.forEach((r) => {
      if (r.current) {
        gsap.set(r.current, {
          opacity: 0,
          y: -220,
          scale: 0.4,
          pointerEvents: "none",
        });
      }
    });
  }, [cardRefs]);

  useEffect(() => {
    hideAllCards();
  }, [hideAllCards]);

  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length || !runnerRef.current || !roadTrackRef.current) return;

    tlRef.current?.kill();
    setIsRunning(true);
    setAllDone(false);
    setIsShooting(false);
    setRevealedCount(0);
    setWeb(null);

    // Ensure all cards are hidden at the start of a pull sequence
    hideAllCards();

    const runner = runnerRef.current;
    const road = roadTrackRef.current;
    const roadRect = road.getBoundingClientRect();

    // Start off left of road
    gsap.set(runner, { x: -90, opacity: 1 });
    startRunningLegs();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setIsShooting(false);
        setAllDone(true);
        stopRunningLegs();
        setWeb(null);
        // Spidey runs off the right side of the road
        gsap.to(runner, {
          x: roadRect.width + 120,
          duration: 0.75,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(runner, { opacity: 0 });
          },
        });
      },
    });
    tlRef.current = tl;

    validRefs.forEach((ref, i) => {
      const card = ref.current!;

      // 1. Spiderman runs on the bottom road with pumping open arms
      tl.add(() => {
        setIsShooting(false);
        startRunningLegs();
      });

      tl.to(runner, {
        duration: 0.65 + (i === 0 ? 0.25 : 0),
        ease: "power2.inOut",
        onUpdate: function () {
          if (!roadTrackRef.current || !ref.current) return;
          const currentRoad = roadTrackRef.current.getBoundingClientRect();
          const cardRect = ref.current.getBoundingClientRect();
          const targetRelativeX = (cardRect.left + cardRect.width / 2) - currentRoad.left - 40;
          gsap.set(runner, {
            x: gsap.utils.interpolate(
              gsap.getProperty(runner, "x") as number,
              targetRelativeX,
              this.progress()
            ),
          });
        },
      });

      // 2. Open arms wide & shoot web directly from the outstretched PALM
      tl.add(() => {
        stopRunningLegs();
        setIsShooting(true);

        const runnerBox = runner.getBoundingClientRect();
        const cardBox = card.getBoundingClientRect();

        // Exact Open Palm location (row 2, col 27 in the 32x32 grid => 84% width, 8% height)
        const startPalmX = runnerBox.left + runnerBox.width * 0.84;
        const startPalmY = runnerBox.top + runnerBox.height * 0.08;

        // Web shoots up into the sky above the card destination
        const targetX = cardBox.left + cardBox.width / 2;
        const targetSkyY = Math.max(20, cardBox.top - 180);

        const webProgress = { t: 0 };

        // Phase A: Web flies up directly out of Spider-Man's palm
        gsap.to(webProgress, {
          t: 1,
          duration: 0.2,
          ease: "power3.out",
          onUpdate() {
            setWeb({
              x1: startPalmX,
              y1: startPalmY,
              x2: startPalmX + (targetX - startPalmX) * webProgress.t,
              y2: startPalmY + (targetSkyY - startPalmY) * webProgress.t,
              opacity: 1,
            });
          },
          onComplete() {
            // Phase B: Web attaches & pulls project card DOWN from top back towards palm
            const finalCardTargetY = cardBox.top + 30;

            // Retract web down with the card
            gsap.to(webProgress, {
              t: 0,
              duration: 0.35,
              ease: "power2.in",
              onUpdate() {
                setWeb({
                  x1: startPalmX,
                  y1: startPalmY,
                  x2: targetX,
                  y2: targetSkyY + (finalCardTargetY - targetSkyY) * (1 - webProgress.t),
                  opacity: webProgress.t,
                });
              },
              onComplete() {
                setWeb(null);
                setIsShooting(false);
              },
            });
          },
        });
      });

      // 3. Project card gets snatched DOWN from top out of nowhere into its slot!
      tl.fromTo(
        card,
        {
          opacity: 0,
          y: -220,
          scale: 0.4,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "elastic.out(1.15, 0.45)",
          onStart: () => {
            setRevealedCount((prev) => prev + 1);
          },
          onComplete: () => {
            gsap.set(card, { pointerEvents: "auto" });
          },
        },
        "<+0.2"
      );

      // 4. Glow flash celebration on card border
      tl.fromTo(
        card,
        { boxShadow: "0 0 0 0px rgba(56, 189, 248, 0)" },
        {
          boxShadow: "0 0 35px 6px rgba(56, 189, 248, 0.75)",
          duration: 0.28,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Short breath between project cards
      if (i < validRefs.length - 1) {
        tl.to({}, { duration: 0.28 });
      }
    });
  }, [cardRefs, hideAllCards, startRunningLegs, stopRunningLegs]);

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
    <div className="relative w-full mt-10 mb-6 select-none">
      {/* Full-screen SVG Web Overlay */}
      <WebOverlay web={web} />

      {/* ─── Retro 16/32-Bit Pixel Road Track at the Bottom ─── */}
      <div
        ref={roadTrackRef}
        className="relative w-full h-22 sm:h-26 bg-gradient-to-b from-[#151722] via-[#0d0f17] to-[#07080d] rounded-2xl border-2 border-indigo-500/30 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.08)] flex items-center"
      >
        {/* Retro Grid / Pixel texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />

        {/* Curb Stones Top / Bottom */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-cyan-400 to-red-500 opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-emerald-400 via-amber-400 via-red-500 to-cyan-400 opacity-70" />

        {/* Road Center Dotted Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 border-t-2 border-dashed border-amber-400/40 -translate-y-1/2" />

        {/* Mini 16-Bit Road Horizon Traffic / Tech Deco */}
        <div className="absolute left-6 text-[10px] font-mono font-bold text-indigo-400/60 flex items-center gap-1.5">
          <span className="animate-pulse">🚦</span>
          <span className="hidden sm:inline">HIGHWAY PATROL: SPIDER-BOT v2.4</span>
        </div>

        <div className="absolute right-6 text-[10px] font-mono font-bold text-red-400/60 flex items-center gap-1.5">
          <span>🏁</span>
          <span className="hidden sm:inline">
            {revealedCount > 0
              ? `UNLOCKED: ${revealedCount} / ${cardRefs.length}`
              : "READY FOR LAUNCH"}
          </span>
        </div>

        {/* ─── Spiderman High-Definition Sprite Running On Road At Bottom ─── */}
        <div
          ref={runnerRef}
          className="absolute bottom-1 pointer-events-none z-20"
          style={{ opacity: 0 }}
        >
          <SpiderManSprite frameIndex={frame} isShooting={isShooting} />
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
              ? "Spidey pulling projects from the sky… 🕸️"
              : "Scroll here — Spidey runs along the bottom road and pulls projects down!"}
          </span>
        </div>

        <button
          id="spidey-swing-btn"
          onClick={handleButtonClick}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>🕸️</span>
          <span>{isRunning ? "PULLING PROJECTS…" : allDone ? "PULL AGAIN! 🕷️" : "PULL ALL PROJECTS!"}</span>
        </button>
      </div>
    </div>
  );
}
