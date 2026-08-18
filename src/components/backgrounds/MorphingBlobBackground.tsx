"use client";

import React, { useEffect, useMemo, useRef } from "react";

interface BlobSpec {
  cx: number;
  cy: number;
  baseRadius: number;
  amp: number;
  speed: number;
  hue: number;
  hueSpeed: number;
  opacity: number;
}

const BLOBS: BlobSpec[] = [
  { cx: 18, cy: 22, baseRadius: 15, amp: 5.5, speed: 0.35, hue: 240, hueSpeed: 12, opacity: 0.85 },
  { cx: 82, cy: 32, baseRadius: 19, amp: 6.5, speed: 0.28, hue: 190, hueSpeed: -9, opacity: 0.8 },
  { cx: 52, cy: 82, baseRadius: 22, amp: 8, speed: 0.22, hue: 320, hueSpeed: 15, opacity: 0.7 },
];

const POINTS = 8;

interface BlobPoint {
  baseR: number;
  w: number;
  phase: number;
}

function blobPath(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  const d: string[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    if (i === 0) d.push(`M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`);
    d.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
  }
  d.push("Z");
  return d.join(" ");
}

function computePoints(blob: BlobPoint[], spec: BlobSpec, t: number) {
  return blob.map((p, i) => {
    const a = (i / POINTS) * Math.PI * 2;
    const r = p.baseR + spec.amp * Math.sin(t * spec.speed * p.w + p.phase);
    return { x: spec.cx + r * Math.cos(a), y: spec.cy + r * Math.sin(a) };
  });
}

export default function MorphingBlobBackground({ className = "" }: { className?: string }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const hiRefs = useRef<(SVGStopElement | null)[]>([]);
  const midRefs = useRef<(SVGStopElement | null)[]>([]);
  const edgeRefs = useRef<(SVGStopElement | null)[]>([]);

  const blobs = useMemo(
    () =>
      BLOBS.map((spec) => ({
        spec,
        pts: Array.from({ length: POINTS }, () => ({
          baseR: spec.baseRadius * (0.8 + Math.random() * 0.4),
          w: 0.5 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
        })),
      })),
    []
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (t: number) => {
      blobs.forEach((b, i) => {
        const el = pathRefs.current[i];
        if (el) el.setAttribute("d", blobPath(computePoints(b.pts, b.spec, t)));

        const h = (((b.spec.hue + t * b.spec.hueSpeed) % 360) + 360) % 360;
        hiRefs.current[i]?.setAttribute("stop-color", `hsl(${h}, 85%, 72%)`);
        midRefs.current[i]?.setAttribute("stop-color", `hsl(${h}, 85%, 50%)`);
        edgeRefs.current[i]?.setAttribute("stop-color", `hsl(${(h + 20) % 360}, 90%, 34%)`);
      });
    };

    if (reduced) {
      apply(0);
      return;
    }

    let raf: number;
    const t0 = performance.now();
    const tick = () => {
      apply((performance.now() - t0) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [blobs]);

  return (
    <svg
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {blobs.map((b, i) => (
          <radialGradient
            key={i}
            id={`blob-grad-${i}`}
            gradientUnits="userSpaceOnUse"
            cx={b.spec.cx - b.spec.baseRadius * 0.4}
            cy={b.spec.cy - b.spec.baseRadius * 0.45}
            r={b.spec.baseRadius * 1.6}
          >
            <stop
              ref={(el) => {
                hiRefs.current[i] = el;
              }}
              offset="0%"
              stopColor={`hsl(${b.spec.hue}, 85%, 72%)`}
              stopOpacity="0.95"
            />
            <stop
              ref={(el) => {
                midRefs.current[i] = el;
              }}
              offset="50%"
              stopColor={`hsl(${b.spec.hue}, 85%, 50%)`}
              stopOpacity="0.8"
            />
            <stop
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
              offset="100%"
              stopColor={`hsl(${(b.spec.hue + 20) % 360}, 90%, 34%)`}
              stopOpacity="0.3"
            />
          </radialGradient>
        ))}
      </defs>
      {blobs.map((b, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          fill={`url(#blob-grad-${i})`}
          opacity={b.spec.opacity}
        />
      ))}
    </svg>
  );
}