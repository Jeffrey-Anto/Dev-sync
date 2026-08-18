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

type SpiderAction = "run" | "shoot" | "pull";

// ─── High-Definition 32-Bit Retro Pixel Spider-Man (Dynamic Action Poses) ────────
// 32 Columns × 32 Rows with Authentic Sprint, Aim-Shoot, and 2-Hand Power-Pull
// R = Red (#ff1e27), D = Dark Red Shadow (#a80512)
// B = Electric Blue (#0070f3), N = Deep Navy Shadow (#002b80)
// W = Pure White (#ffffff), G = Lens Grey (#94a3b8)
// K = Jet Black (#0b0e14), _ = Transparent
function SpiderManSprite({
  frameIndex = 0,
  action = "run",
}: {
  frameIndex?: number;
  action?: SpiderAction;
}) {
  const RUN_FRAMES = [
    // Frame 0: Sprint 1 (Left arm reaching back, Right arm pumping forward open!)
    [
      "________________________________",
      "___________KKKKKK_______________",
      "_________KKRRRRRRKK_____________",
      "________KDDDRRRRRRRK____________",
      "_______KDDRKKKRRRKKRK___________",
      "_______KDDKWWWKKKWWWK___________",
      "_______KDDKWWWWKWWWWK___________",
      "_______KDDRKKKKKKWWK____________",
      "________KDDRRRRRRKK_____________",
      "_________KKDDRRRRKK_____KKK_____",
      "___KKKK___KDDRRRRRRK___KRRRK____",
      "__KDDDRK__KDDDRRRRRRK__KRRRRK___",
      "__KDDDDRK_KNNDRRRRRRBK_KRRRRK___",
      "___KDDDRK_KNNRDKKRRBBK_KKKKK____",
      "____KKKKK_KNNNDKKRBBBK__________",
      "________KNNNDDRRRRBBBK__________",
      "________KNNNNDDRRBBBBK__________",
      "________KKKNNNNNNNBKKK__________",
      "_______KNNNNNNNNNBBBBBK_________",
      "______KNNNNNKKKKKKBBBBBK________",
      "_____KNNNNNK______KBBBBBK_______",
      "____KNNNNNK________KBBBBBK______",
      "___KDDDDDK__________KRRRRRK_____",
      "___KDDDDDK__________KRRRRRK_____",
      "___KDDDDDK___________KRRRRRK____",
      "____KKKKK_____________KKKKK_____",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 1: Passing Stride (Arms passing through torso)
    [
      "________________________________",
      "___________KKKKKK_______________",
      "_________KKRRRRRRKK_____________",
      "________KDDDRRRRRRRK____________",
      "_______KDDRKKKRRRKKRK___________",
      "_______KDDKWWWKKKWWWK___________",
      "_______KDDKWWWWKWWWWK___________",
      "_______KDDRKKKKKKWWK____________",
      "________KDDRRRRRRKK_____________",
      "_________KKDDRRRRKK_____________",
      "__________KDDRRRRRRK____________",
      "_________KDDDRRRRRRRK___________",
      "________KDDBRRRRRRRBRK__________",
      "________KNNDRRKKRRBBRK__________",
      "________KNNDRRKKRRBBRK__________",
      "________KDDBRRRRRRBRRK__________",
      "_________KNNNDRRRBBBK___________",
      "_________KKNNNNNNNBKK___________",
      "________KNNNNNNNNNNBBK__________",
      "________KNNNNKKKBBBBBK__________",
      "________KNNNK___KBBBBK__________",
      "________KDDDK___KBBBK___________",
      "________KDDDK___KRRRK___________",
      "________KDDDK___KRRRK___________",
      "________KDDDK___KRRRK___________",
      "_________KKK_____KKK____________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 2: Sprint 2 (Right arm reaching back, Left arm pumping forward open!)
    [
      "________________________________",
      "___________KKKKKK_______________",
      "_________KKRRRRRRKK_____________",
      "________KDDDRRRRRRRK____________",
      "_______KDDRKKKRRRKKRK___________",
      "_______KDDKWWWKKKWWWK___________",
      "_______KDDKWWWWKWWWWK___________",
      "_______KDDRKKKKKKWWK____________",
      "________KDDRRRRRRKK_____________",
      "____KKK__KKDDRRRRKK___KKKK______",
      "___KDDDK__KDDRRRRRRK_KRRRRK_____",
      "__KDDDDRK_KDDDRRRRRRKKRRRRRK____",
      "__KDDDDRK_KNNDRRRRRRBK_KRRRRK___",
      "___KKKKK_KNNRDKKRRBBK_KKKKK_____",
      "_________KNNNDKKRBBBK___________",
      "________KNNNDDRRRRBBBK__________",
      "________KNNNNDDRRBBBBK__________",
      "________KKKNNNNNNNBKKK__________",
      "_______KNNNNNNNNNBBBBBK_________",
      "______KNNNNNKKKKKKBBBBBK________",
      "_____KNNNNNK______KBBBBBK_______",
      "____KNNNNNK________KBBBBBK______",
      "___KDDDDDK__________KRRRRRK_____",
      "___KDDDDDK__________KRRRRRK_____",
      "___KDDDDDK___________KRRRRRK____",
      "____KKKKK_____________KKKKK_____",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
    // Frame 3: Passing Stride (return)
    [
      "________________________________",
      "___________KKKKKK_______________",
      "_________KKRRRRRRKK_____________",
      "________KDDDRRRRRRRK____________",
      "_______KDDRKKKRRRKKRK___________",
      "_______KDDKWWWKKKWWWK___________",
      "_______KDDKWWWWKWWWWK___________",
      "_______KDDRKKKKKKWWK____________",
      "________KDDRRRRRRKK_____________",
      "_________KKDDRRRRKK_____________",
      "__________KDDRRRRRRK____________",
      "_________KDDDRRRRRRRK___________",
      "________KDDBRRRRRRRBRK__________",
      "________KNNDRRKKRRBBRK__________",
      "________KNNDRRKKRRBBRK__________",
      "________KDDBRRRRRRBRRK__________",
      "_________KNNNDRRRBBBK___________",
      "_________KKNNNNNNNBKK___________",
      "________KNNNNNNNNNNBBK__________",
      "________KNNNNKKKBBBBBK__________",
      "________KNNNK___KBBBBK__________",
      "________KDDDK___KBBBK___________",
      "________KDDDK___KRRRK___________",
      "________KDDDK___KRRRK___________",
      "________KDDDK___KRRRK___________",
      "_________KKK_____KKK____________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
      "________________________________",
    ],
  ];

  // 1. AIM & SHOOT POSE (Signature Open Palm Thwip aiming up-forward)
  const SHOOT_FRAME = [
    "________________________________",
    "___________KKKKKK_______________",
    "_________KKRRRRRRKK_____KKK_____",
    "________KDDDRRRRRRRK___KRRRK____",
    "_______KDDRKKKRRRKKRK_KRRRRRK___",
    "_______KDDKWWWKKKWWWK_KWWWWRK___",
    "_______KDDKWWWWKWWWWK_KWWWWKK___",
    "_______KDDRKKKKKKWWK__KRRRRK____",
    "________KDDRRRRRRKK____KKKK_____",
    "_________KKDDRRRRKK___KRRK______",
    "____KKK___KDDRRRRRRK_KRRK_______",
    "___KDDDK__KDDDRRRRRRKKRRK_______",
    "___KDDDK_KNNDRRRRRRBKKRK________",
    "___KDDDK_KNNRDKKRRBBKKK_________",
    "____KKKK_KNNNDKKRBBBK___________",
    "________KNNNDDRRRRBBBK__________",
    "________KNNNNDDRRBBBBK__________",
    "________KKKNNNNNNNBKKK__________",
    "_______KNNNNNNNNNBBBBBK_________",
    "______KNNNNNKKKKKKBBBBBK________",
    "_____KNNNNNK______KBBBBBK_______",
    "____KNNNNNK________KBBBBBK______",
    "___KDDDDDK__________KRRRRRK_____",
    "___KDDDDDK__________KRRRRRK_____",
    "___KDDDDDK___________KRRRRRK____",
    "____KKKKK_____________KKKKK_____",
    "________________________________",
    "________________________________",
    "________________________________",
    "________________________________",
    "________________________________",
    "________________________________",
  ];

  // 2. AUTHENTIC 2-HAND SPIDER-MAN HEAVE & PULL POSE (Deep knee power-crouch, leaning back hard, both arms heaving down!)
  const PULL_FRAME = [
    "________________________________",
    "________________________________",
    "_____________KKKKKK_____________",
    "___________KKRRRRRRKK___________",
    "__________KDDDRRRRRRRK__________",
    "_________KDDRKKKRRRKKRK_________",
    "_________KDDKWWWKKKWWWK_________",
    "_________KDDKWWWWKWWWWK_________",
    "_________KDDRKKKKKKWWK__________",
    "__________KDDRRRRRRKK___________",
    "___________KKDDRRRRKK___________",
    "________KKKKDDRRRRRRKKKK________",
    "_______KDDDDKDDDRRRRKRRRRK______",
    "______KDDDDDKNNDRRRBKRRRRRK_____",
    "______KDDDDK_KNNRDRBK_KRRRRK____",
    "______KDDDK__KNNRDRBK__KRRRK____",
    "_______KKK___KNNRDRBK___KKK_____",
    "_____________KNNRDRBK___________",
    "____________KKNNNNNNKK__________",
    "___________KNNNNNNNNNNK_________",
    "__________KNNNNNKKKKBBBBK_______",
    "_________KNNNNNK____KBBBBK______",
    "________KNNNNNK______KBBBBK_____",
    "_______KDDDDDK________KRRRRRK___",
    "_______KDDDDDK________KRRRRRK___",
    "_______KDDDDDK________KRRRRRK___",
    "________KKKKK__________KKKKK____",
    "________________________________",
    "________________________________",
    "________________________________",
    "________________________________",
    "________________________________",
  ];

  let currentFrame = RUN_FRAMES[frameIndex % 4];
  if (action === "shoot") currentFrame = SHOOT_FRAME;
  if (action === "pull") currentFrame = PULL_FRAME;

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
      className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]"
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

// ─── Web Thread with Glowing Palm Muzzle Flash & Dynamic Elastic Tension ───────
interface WebState {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  isPulling?: boolean;
}

function WebOverlay({ web }: { web: WebState | null }) {
  if (!web) return null;

  // Calculate a slight elastic tension bow when pulling
  const midX = (web.x1 + web.x2) / 2 + (web.isPulling ? -15 : 0);
  const midY = (web.y1 + web.y2) / 2 + (web.isPulling ? 10 : 0);

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
        r={web.isPulling ? 10 : 8}
        fill="#38bdf8"
        opacity={web.opacity * 0.9}
        filter="url(#spidey-glow)"
      />
      <circle
        cx={web.x1}
        cy={web.y1}
        r={web.isPulling ? 4.5 : 3.5}
        fill="#ffffff"
        opacity={web.opacity}
      />

      {/* Curved Tension Path under superhero pull */}
      <path
        d={`M ${web.x1} ${web.y1} Q ${midX} ${midY} ${web.x2} ${web.y2}`}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={web.isPulling ? 5 : 4}
        opacity={web.opacity * 0.85}
        filter="url(#spidey-glow)"
        strokeLinecap="round"
      />
      <path
        d={`M ${web.x1} ${web.y1} Q ${midX} ${midY} ${web.x2} ${web.y2}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={web.isPulling ? 2.2 : 1.8}
        opacity={web.opacity}
        strokeLinecap="round"
      />

      {/* Target Web Impact Splat at Card */}
      <circle
        cx={web.x2}
        cy={web.y2}
        r={web.isPulling ? 9 : 7}
        fill="#38bdf8"
        opacity={web.opacity * 0.9}
        filter="url(#spidey-glow)"
      />
      <circle
        cx={web.x2}
        cy={web.y2}
        r={3.5}
        fill="#ffffff"
        opacity={web.opacity}
      />
    </svg>
  );
}

// ─── 2.5D Horizontal Perspective Highway (Running Left-to-Right) ──────────────
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
  const [actionState, setActionState] = useState<SpiderAction>("run");
  const [allDone, setAllDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [web, setWeb] = useState<WebState | null>(null);
  const [frame, setFrame] = useState(0);
  const legIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Smooth 4-beat running cadence
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

  const runSequence = useCallback(() => {
    const validRefs = cardRefs.filter((r) => r.current);
    if (!validRefs.length || !runnerRef.current || !roadTrackRef.current) return;

    tlRef.current?.kill();
    setIsRunning(true);
    setAllDone(false);
    setActionState("run");
    setRevealedCount(0);
    setWeb(null);

    hideAllCards();

    const runner = runnerRef.current;
    const road = roadTrackRef.current;
    const roadRect = road.getBoundingClientRect();

    gsap.set(runner, { x: -90, y: 0, rotation: 0, opacity: 1 });
    startRunningLegs();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setActionState("run");
        setAllDone(true);
        stopRunningLegs();
        setWeb(null);
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

      // 1. Spiderman sprints along the highway
      tl.add(() => {
        setActionState("run");
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

      // 2. AIM & SHOOT: Plants feet, shoots web from open palm straight up into empty sky
      tl.add(() => {
        stopRunningLegs();
        setActionState("shoot");

        const runnerBox = runner.getBoundingClientRect();
        const cardBox = card.getBoundingClientRect();

        const startPalmX = runnerBox.left + runnerBox.width * 0.84;
        const startPalmY = runnerBox.top + runnerBox.height * 0.08;
        const targetX = cardBox.left + cardBox.width / 2;
        const targetSkyY = Math.max(20, cardBox.top - 190);

        const shootProgress = { t: 0 };

        // Web flies up to target
        gsap.to(shootProgress, {
          t: 1,
          duration: 0.18,
          ease: "power3.out",
          onUpdate() {
            setWeb({
              x1: startPalmX,
              y1: startPalmY,
              x2: startPalmX + (targetX - startPalmX) * shootProgress.t,
              y2: startPalmY + (targetSkyY - startPalmY) * shootProgress.t,
              opacity: 1,
              isPulling: false,
            });
          },
          onComplete() {
            // 3. AUTHENTIC SUPERHERO HEAVE & PULL!
            // Spidey switches to power pull stance, leans back hard, body recoils!
            setActionState("pull");

            // Spidey physical tug recoil
            gsap.to(runner, {
              y: 8,
              x: "-=12",
              rotation: -10,
              duration: 0.12,
              ease: "power4.out",
            });

            const pullProgress = { t: 0 };
            const finalCardTargetY = cardBox.top + 30;

            // Retract web violently with heavy tension
            gsap.to(pullProgress, {
              t: 1,
              duration: 0.38,
              ease: "power3.in",
              onUpdate() {
                // Hand moves down to chest/hip during pull
                const pullHandX = runnerBox.left + runnerBox.width * 0.65;
                const pullHandY = runnerBox.top + runnerBox.height * 0.40;

                setWeb({
                  x1: pullHandX,
                  y1: pullHandY,
                  x2: targetX,
                  y2: targetSkyY + (finalCardTargetY - targetSkyY) * pullProgress.t,
                  opacity: 1 - pullProgress.t * 0.1,
                  isPulling: true,
                });
              },
              onComplete() {
                // Pop back up from pull stance
                gsap.to(runner, {
                  y: 0,
                  x: "+=12",
                  rotation: 0,
                  duration: 0.28,
                  ease: "back.out(2)",
                });
                setWeb(null);
              },
            });
          },
        });
      });

      // 4. Project Card gets snatched DOWN from top with superhero momentum!
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
          duration: 0.58,
          ease: "elastic.out(1.2, 0.45)",
          onStart: () => {
            setRevealedCount((prev) => prev + 1);
          },
          onComplete: () => {
            gsap.set(card, { pointerEvents: "auto" });
          },
        },
        "<+0.22"
      );

      // 5. Electric cyan impact flash celebration on card border
      tl.fromTo(
        card,
        { boxShadow: "0 0 0 0px rgba(56, 189, 248, 0)" },
        {
          boxShadow: "0 0 40px 8px rgba(56, 189, 248, 0.8)",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        "<"
      );

      if (i < validRefs.length - 1) {
        tl.to({}, { duration: 0.25 });
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
    <div className="relative w-full mt-12 mb-6 select-none">
      {/* Full-screen SVG Web Overlay with Elastic Tension Curve */}
      <WebOverlay web={web} />

      {/* ─── 2.5D Horizontal Perspective Highway Track ─── */}
      <div
        ref={roadTrackRef}
        className="relative w-full h-24 sm:h-28 rounded-2xl border border-indigo-500/30 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_3px_rgba(255,255,255,0.1)] flex items-center"
      >
        {/* Horizontal Perspective Road SVG */}
        <GeometricPerspectiveRoad />

        {/* ─── Spiderman High-Definition Sprite Running On Perspective Road ─── */}
        <div
          ref={runnerRef}
          className="absolute bottom-1 pointer-events-none z-20"
          style={{ opacity: 0, transformOrigin: "bottom center" }}
        >
          {/* Ground Contact Shadow */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-3 bg-black/70 rounded-full blur-[2px] pointer-events-none"
          />
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
                ? "Spidey heaving projects down from the sky… 🕸️"
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
          <span>{isRunning ? "HEAVING PROJECTS…" : allDone ? "PULL AGAIN! 🕷️" : "PULL ALL PROJECTS!"}</span>
        </button>
      </div>
    </div>
  );
}