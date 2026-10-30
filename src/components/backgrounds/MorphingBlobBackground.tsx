"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { isMotionPaused } from "@/lib/motion-pause";

// --- Configuration ---

interface SubBlobConfig {
  id: string;
  sizeRatio: number; // size relative to parent (0.28 - 0.55)
  minOrbitR: number; // closest distance (merges deep into parent)
  maxOrbitR: number; // farthest distance (stretches away into budding drop)
  orbitSpeed: number; // orbital rotation speed
  orbitPhase: number;
  budSpeed: number; // speed of in-and-out budding cycle
  budPhase: number;
  tiltAngle: number;
  wobbleSpeed: number; // jelly wobble frequency
  harmonicAmps: [number, number, number]; // High-amplitude organic fluid wobble
}

interface ClusterConfig {
  id: string;
  cx: number;
  cy: number;
  baseRadius: number;
  driftRadiusX: number;
  driftRadiusY: number;
  driftSpeed: number;
  driftPhase: number;
  hue: number;
  hueSpeed: number;
  speed: number;
  harmonicAmps: [number, number, number];
  subBlobs: SubBlobConfig[];
}

const CLUSTERS: ClusterConfig[] = [
  {
    id: "cluster-sapphire",
    cx: 20,
    cy: 28,
    baseRadius: 14,
    driftRadiusX: 4,
    driftRadiusY: 3,
    driftSpeed: 0.25,
    driftPhase: 0,
    hue: 228, // Deep Electric Sapphire Blue
    hueSpeed: 5,
    speed: 0.75, // Lively, lively fluid speed
    harmonicAmps: [5.5, 3.2, 1.6], // Strong visible wobble!
    subBlobs: [
      {
        id: "c1-sub1",
        sizeRatio: 0.52,
        minOrbitR: 6,
        maxOrbitR: 18,
        orbitSpeed: 0.8,
        orbitPhase: 0.4,
        budSpeed: 0.65,
        budPhase: 0,
        tiltAngle: 0.4,
        wobbleSpeed: 1.2,
        harmonicAmps: [3.2, 1.8, 0.9],
      },
      {
        id: "c1-sub2",
        sizeRatio: 0.36,
        minOrbitR: 8,
        maxOrbitR: 21,
        orbitSpeed: -1.1,
        orbitPhase: 2.6,
        budSpeed: 0.85,
        budPhase: 1.8,
        tiltAngle: -0.5,
        wobbleSpeed: 1.5,
        harmonicAmps: [2.2, 1.2, 0.6],
      },
      {
        id: "c1-sub3",
        sizeRatio: 0.24,
        minOrbitR: 11,
        maxOrbitR: 23,
        orbitSpeed: 1.4,
        orbitPhase: 4.8,
        budSpeed: 1.1,
        budPhase: 3.2,
        tiltAngle: 0.7,
        wobbleSpeed: 1.8,
        harmonicAmps: [1.5, 0.8, 0.4],
      },
    ],
  },
  {
    id: "cluster-cyan",
    cx: 80,
    cy: 34,
    baseRadius: 15,
    driftRadiusX: 4.5,
    driftRadiusY: 3.5,
    driftSpeed: 0.22,
    driftPhase: 2.1,
    hue: 186, // Vivid Cyan / Neon Aqua
    hueSpeed: -5,
    speed: 0.7,
    harmonicAmps: [5.8, 3.4, 1.8], // Strong organic pulsation
    subBlobs: [
      {
        id: "c2-sub1",
        sizeRatio: 0.5,
        minOrbitR: 6.5,
        maxOrbitR: 19,
        orbitSpeed: -0.75,
        orbitPhase: 1.0,
        budSpeed: 0.6,
        budPhase: 0.7,
        tiltAngle: -0.4,
        wobbleSpeed: 1.1,
        harmonicAmps: [3.0, 1.6, 0.8],
      },
      {
        id: "c2-sub2",
        sizeRatio: 0.34,
        minOrbitR: 9,
        maxOrbitR: 22,
        orbitSpeed: 1.05,
        orbitPhase: 3.4,
        budSpeed: 0.8,
        budPhase: 2.3,
        tiltAngle: 0.55,
        wobbleSpeed: 1.45,
        harmonicAmps: [2.1, 1.1, 0.5],
      },
      {
        id: "c2-sub3",
        sizeRatio: 0.22,
        minOrbitR: 12,
        maxOrbitR: 24,
        orbitSpeed: -1.5,
        orbitPhase: 5.1,
        budSpeed: 1.05,
        budPhase: 4.0,
        tiltAngle: -0.65,
        wobbleSpeed: 1.9,
        harmonicAmps: [1.4, 0.7, 0.35],
      },
    ],
  },
  {
    id: "cluster-magenta",
    cx: 52,
    cy: 78,
    baseRadius: 17,
    driftRadiusX: 5,
    driftRadiusY: 4,
    driftSpeed: 0.2,
    driftPhase: 4.2,
    hue: 295, // Electric Magenta / Violet
    hueSpeed: 6,
    speed: 0.65,
    harmonicAmps: [6.4, 3.8, 2.0], // Super wobbly lava-lamp jelly
    subBlobs: [
      {
        id: "c3-sub1",
        sizeRatio: 0.48,
        minOrbitR: 7.5,
        maxOrbitR: 21,
        orbitSpeed: 0.7,
        orbitPhase: 0.5,
        budSpeed: 0.55,
        budPhase: 0.4,
        tiltAngle: 0.45,
        wobbleSpeed: 1.05,
        harmonicAmps: [3.4, 1.8, 0.9],
      },
      {
        id: "c3-sub2",
        sizeRatio: 0.35,
        minOrbitR: 10,
        maxOrbitR: 23,
        orbitSpeed: -0.95,
        orbitPhase: 2.9,
        budSpeed: 0.75,
        budPhase: 1.9,
        tiltAngle: -0.5,
        wobbleSpeed: 1.35,
        harmonicAmps: [2.4, 1.3, 0.6],
      },
      {
        id: "c3-sub3",
        sizeRatio: 0.24,
        minOrbitR: 13,
        maxOrbitR: 26,
        orbitSpeed: 1.3,
        orbitPhase: 4.7,
        budSpeed: 0.95,
        budPhase: 3.5,
        tiltAngle: 0.8,
        wobbleSpeed: 1.75,
        harmonicAmps: [1.6, 0.85, 0.4],
      },
    ],
  },
];

const NUM_POINTS = 16;

interface BlobPointMeta {
  angle: number;
  freqFactors: [number, number, number];
  phases: [number, number, number];
}

// Convert sampled perimeter points into a smooth closed cubic Bézier curve
function smoothClosedSpline(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n < 3) return "";

  const d: string[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    // Smooth cubic Bézier interpolation
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    if (i === 0) {
      d.push(`M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`);
    }
    d.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    );
  }
  d.push("Z");
  return d.join(" ");
}

// Multi-octave organic jelly wobble calculation
function computeWobblyPoints(
  cx: number,
  cy: number,
  baseR: number,
  harmonicAmps: [number, number, number],
  speed: number,
  t: number,
  pointMetas: BlobPointMeta[],
  stretchFactor: number = 0,
  stretchAngle: number = 0,
  mouseImpact: number = 0
) {
  const cosSA = Math.cos(stretchAngle);
  const sinSA = Math.sin(stretchAngle);

  // Extra wobble surge when mouse is near
  const ampMultiplier = 1 + mouseImpact * 0.8;

  return pointMetas.map((p) => {
    // 3 asynchronous harmonic frequencies for lively jelly/liquid sloshing
    const w1 = Math.sin(t * speed * p.freqFactors[0] + p.phases[0]);
    const w2 = Math.sin(t * speed * p.freqFactors[1] * 2.3 + p.phases[1]);
    const w3 = Math.sin(t * speed * p.freqFactors[2] * 4.1 + p.phases[2]);

    const dr =
      (harmonicAmps[0] * w1 +
        harmonicAmps[1] * w2 +
        harmonicAmps[2] * w3) *
      ampMultiplier;

    const r = Math.max(1.5, baseR + dr);

    let px = r * Math.cos(p.angle);
    let py = r * Math.sin(p.angle);

    // Surface tension elongation along separation/motion vector
    if (stretchFactor > 0.01) {
      const localX = px * cosSA + py * sinSA;
      const localY = -px * sinSA + py * cosSA;

      const stretchedX = localX * (1 + stretchFactor);
      const stretchedY = localY / Math.sqrt(1 + stretchFactor);

      px = stretchedX * cosSA - stretchedY * sinSA;
      py = stretchedX * sinSA + stretchedY * cosSA;
    }

    return {
      x: cx + px,
      y: cy + py,
    };
  });
}

export default function MorphingBlobBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parentPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const subBlobPathRefs = useRef<{ [key: string]: SVGPathElement | null }>({});

  const stopRefs = useRef<{
    [clusterId: string]: {
      stop0: SVGStopElement | null;
      stop1: SVGStopElement | null;
      stop2: SVGStopElement | null;
    };
  }>({});

  const mouseTargetRef = useRef({ x: 50, y: 50, active: false });
  const mouseCurrentRef = useRef({ x: 50, y: 50 });
  const hueRef = useRef<{ [clusterId: string]: number }>({});

  const clusterData = useMemo(() => {
    return CLUSTERS.map((cluster) => {
      const parentPointsMeta: BlobPointMeta[] = Array.from({ length: NUM_POINTS }, (_, i) => ({
        angle: (i / NUM_POINTS) * Math.PI * 2,
        freqFactors: [
          0.85 + Math.random() * 0.4,
          0.9 + Math.random() * 0.5,
          1.0 + Math.random() * 0.6,
        ] as [number, number, number],
        phases: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ] as [number, number, number],
      }));

      const subBlobsMeta = cluster.subBlobs.map((sb) => ({
        config: sb,
        pointsMeta: Array.from({ length: NUM_POINTS }, (_, i) => ({
          angle: (i / NUM_POINTS) * Math.PI * 2,
          freqFactors: [
            0.8 + Math.random() * 0.5,
            0.9 + Math.random() * 0.6,
            1.0 + Math.random() * 0.7,
          ] as [number, number, number],
          phases: [
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
          ] as [number, number, number],
        })),
      }));

      return {
        config: cluster,
        parentPointsMeta,
        subBlobsMeta,
      };
    });
  }, []);

  // Mouse Listener
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mouseTargetRef.current = { x, y, active: true };
    };

    const handlePointerLeave = () => {
      mouseTargetRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // 60FPS Animation Loop
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderFrame = (t: number) => {
      if (mouseTargetRef.current.active) {
        mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.05;
        mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.05;
      } else {
        mouseCurrentRef.current.x += (50 - mouseCurrentRef.current.x) * 0.02;
        mouseCurrentRef.current.y += (50 - mouseCurrentRef.current.y) * 0.02;
      }

      const mx = mouseCurrentRef.current.x;
      const my = mouseCurrentRef.current.y;

      clusterData.forEach((cData, cIdx) => {
        const { config: c, parentPointsMeta, subBlobsMeta } = cData;

        // Ambient Lissajous drift
        const driftX = c.driftRadiusX * Math.cos(t * c.driftSpeed + c.driftPhase);
        const driftY = c.driftRadiusY * Math.sin(t * c.driftSpeed * 1.3 + c.driftPhase);

        // Fluid repulsion & wobble surge from mouse
        const distToMouseX = c.cx + driftX - mx;
        const distToMouseY = c.cy + driftY - my;
        const distToMouse = Math.hypot(distToMouseX, distToMouseY);
        let mouseInfluenceX = 0;
        let mouseInfluenceY = 0;
        let mouseWobbleFactor = 0;

        if (distToMouse < 35 && distToMouse > 0.1) {
          const push = (1 - distToMouse / 35) * 5;
          mouseInfluenceX = (distToMouseX / distToMouse) * push;
          mouseInfluenceY = (distToMouseY / distToMouse) * push;
          mouseWobbleFactor = 1 - distToMouse / 35;
        }

        const parentCX = c.cx + driftX + mouseInfluenceX;
        const parentCY = c.cy + driftY + mouseInfluenceY;

        // 1. Animate Wobbly Parent Nucleus
        const parentPts = computeWobblyPoints(
          parentCX,
          parentCY,
          c.baseRadius,
          c.harmonicAmps,
          c.speed,
          t,
          parentPointsMeta,
          0,
          0,
          mouseWobbleFactor
        );

        const parentPathEl = parentPathRefs.current[cIdx];
        if (parentPathEl) {
          parentPathEl.setAttribute("d", smoothClosedSpline(parentPts));
        }

        // 2. Animate Wobbly Sub-Blobs with Budding Fusion
        subBlobsMeta.forEach((sbData) => {
          const sb = sbData.config;

          // Budding oscillation in and out of the parent
          const budFactor = 0.5 + 0.5 * Math.sin(t * sb.budSpeed + sb.budPhase);
          const orbitR = sb.minOrbitR + (sb.maxOrbitR - sb.minOrbitR) * budFactor;

          const orbitAngle = t * sb.orbitSpeed + sb.orbitPhase;
          const cosTilt = Math.cos(sb.tiltAngle);
          const sinTilt = Math.sin(sb.tiltAngle);
          const unrotatedX = orbitR * Math.cos(orbitAngle);
          const unrotatedY = orbitR * 0.75 * Math.sin(orbitAngle);

          const offsetX = unrotatedX * cosTilt - unrotatedY * sinTilt;
          const offsetY = unrotatedX * sinTilt + unrotatedY * cosTilt;

          const subCX = parentCX + offsetX;
          const subCY = parentCY + offsetY;

          // Stretch along the separation vector
          const distToParent = Math.hypot(offsetX, offsetY);
          const angleToParent = Math.atan2(offsetY, offsetX);
          const stretchFactor = Math.min(0.38, (distToParent / sb.maxOrbitR) * 0.35);

          const subBaseR = c.baseRadius * sb.sizeRatio;

          const subPts = computeWobblyPoints(
            subCX,
            subCY,
            subBaseR,
            sb.harmonicAmps,
            sb.wobbleSpeed,
            t,
            sbData.pointsMeta,
            stretchFactor,
            angleToParent,
            mouseWobbleFactor
          );

          const subPathEl = subBlobPathRefs.current[sb.id];
          if (subPathEl) {
            subPathEl.setAttribute("d", smoothClosedSpline(subPts));
          }
        });

        // 3. Update single cohesive iridescent hue
        // Hue drifts ~5 deg/s, so 1 deg steps are invisible but skip most
        // gradient invalidations.
        const curHue = (((c.hue + t * c.hueSpeed) % 360) + 360) % 360;
        const lastHue = hueRef.current[c.id];
        if (lastHue === undefined || Math.abs(curHue - lastHue) >= 1) {
          const stops = stopRefs.current[c.id];
          if (stops) {
            stops.stop0?.setAttribute("stop-color", `hsl(${curHue}, 96%, 66%)`);
            stops.stop1?.setAttribute("stop-color", `hsl(${curHue}, 90%, 48%)`);
            stops.stop2?.setAttribute("stop-color", `hsl(${curHue}, 94%, 28%)`);
          }
          hueRef.current[c.id] = curHue;
        }
      });
    };

    // 1. Immediately render initial frame so SVG paths are populated on mount
    renderFrame(0);

    if (reducedMotion) {
      return;
    }

    let isVisible = true;
    let rafId: number;
    const startTime = performance.now();
    const tick = () => {
      if (!isVisible) return;
      if (isMotionPaused()) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = (performance.now() - startTime) / 1000;
      renderFrame(elapsed);
      rafId = requestAnimationFrame(tick);
    };

    // 2. Start animation loop immediately on mount
    rafId = requestAnimationFrame(tick);

    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(rafId);
      } else if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.bottom > -150 && rect.top < window.innerHeight + 150) {
          if (!isVisible) {
            isVisible = true;
            rafId = requestAnimationFrame(tick);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          const inView = entry.isIntersecting && !document.hidden;
          if (inView && !isVisible) {
            isVisible = true;
            rafId = requestAnimationFrame(tick);
          } else if (!inView && isVisible) {
            isVisible = false;
            cancelAnimationFrame(rafId);
          }
        },
        { rootMargin: "150px" }
      );
      observer.observe(container);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [clusterData]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Crisp, Single-Layer Liquid Goo Filter */}
          <filter
            id="liquid-goo"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -7.5"
              result="goo"
            />
          </filter>

          {/* Unified Cohesive Gradients */}
          {clusterData.map(({ config: c }) => (
            <radialGradient
              key={`grad-${c.id}`}
              id={`grad-${c.id}`}
              cx="38%"
              cy="38%"
              r="62%"
            >
              <stop
                ref={(el) => {
                  if (!stopRefs.current[c.id]) {
                    stopRefs.current[c.id] = { stop0: null, stop1: null, stop2: null };
                  }
                  stopRefs.current[c.id].stop0 = el;
                }}
                offset="0%"
                stopColor={`hsl(${c.hue}, 96%, 66%)`}
                stopOpacity="0.95"
              />
              <stop
                ref={(el) => {
                  if (!stopRefs.current[c.id]) {
                    stopRefs.current[c.id] = { stop0: null, stop1: null, stop2: null };
                  }
                  stopRefs.current[c.id].stop1 = el;
                }}
                offset="55%"
                stopColor={`hsl(${c.hue}, 90%, 48%)`}
                stopOpacity="0.8"
              />
              <stop
                ref={(el) => {
                  if (!stopRefs.current[c.id]) {
                    stopRefs.current[c.id] = { stop0: null, stop1: null, stop2: null };
                  }
                  stopRefs.current[c.id].stop2 = el;
                }}
                offset="100%"
                stopColor={`hsl(${c.hue}, 94%, 28%)`}
                stopOpacity="0.3"
              />
            </radialGradient>
          ))}
        </defs>

        {/* Clean, Single Unified Liquid Layer with Natural Wobbly Sub-Blobs */}
        {clusterData.map(({ config: c, subBlobsMeta }, cIdx) => (
          <g
            key={`cluster-${c.id}`}
            filter="url(#liquid-goo)"
            opacity="0.85"
          >
            {/* Wobbly Parent Nucleus */}
            <path
              ref={(el) => {
                parentPathRefs.current[cIdx] = el;
              }}
              fill={`url(#grad-${c.id})`}
            />

            {/* Wobbly Orbiting & Budding Sub-Blobs */}
            {subBlobsMeta.map(({ config: sb }) => (
              <path
                key={`sub-${sb.id}`}
                ref={(el) => {
                  subBlobPathRefs.current[sb.id] = el;
                }}
                fill={`url(#grad-${c.id})`}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}