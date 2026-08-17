"use client";

import React, { useEffect, useRef } from "react";

interface CircuitTraceBackgroundProps {
  className?: string;
  interactive?: boolean;
  opacity?: number;
  intensity?: "subtle" | "medium" | "vibrant";
}

interface TraceSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  horizontal: boolean;
}

interface Electron {
  segment: number;
  direction: 1 | -1;
  t: number;
  speed: number;
}

interface CircuitNode {
  x: number;
  y: number;
  phase: number;
}

// Deterministic pseudo-random so layout is stable across renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function CircuitTraceBackground({
  className = "",
  interactive = true,
  opacity = 0.7,
  intensity = "medium",
}: CircuitTraceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const brightness =
      intensity === "vibrant" ? 1.4 : intensity === "subtle" ? 0.5 : 1;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth || window.innerWidth;
      height = canvas.height = parent.clientHeight || window.innerHeight;
      buildBoard();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement as Element);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let segments: TraceSegment[] = [];
    let electrons: Electron[] = [];
    let nodes: CircuitNode[] = [];

    const buildBoard = () => {
      segments = [];
      electrons = [];
      nodes = [];

      const rand = mulberry32(1337);
      const grid = 72;
      const cols = Math.floor(width / grid);
      const rows = Math.floor(height / grid);

      // Horizontal traces on even rows, vertical on odd columns
      for (let r = 0; r < rows; r += 2) {
        const y = r * grid + grid / 2 + (rand() - 0.5) * grid * 0.6;
        let x = 0;
        while (x < width) {
          const len = (2 + Math.floor(rand() * 4)) * grid;
          const x2 = x + len;
          segments.push({ x1: x, y1: y, x2: x2, y2: y, horizontal: true });
          x = x2 + grid * (0.5 + rand() * 2);
        }
      }

      for (let c = 0; c < cols; c += 2) {
        const x = c * grid + grid / 2 + (rand() - 0.5) * grid * 0.6;
        let y = 0;
        while (y < height) {
          const len = (2 + Math.floor(rand() * 4)) * grid;
          const y2 = y + len;
          segments.push({ x1: x, y1: y, x2: x, y2: y2, horizontal: false });
          y = y2 + grid * (0.5 + rand() * 2);
        }
      }

      // Junction nodes at segment endpoints
      for (const s of segments) {
        nodes.push({ x: s.x1, y: s.y1, phase: rand() * Math.PI * 2 });
        nodes.push({ x: s.x2, y: s.y2, phase: rand() * Math.PI * 2 });
      }

      // Seed a swarm of flowing electrons
      const electronCount = Math.min(
        90,
        Math.floor((width * height) / 35000) + (intensity === "vibrant" ? 30 : 0)
      );
      for (let i = 0; i < electronCount; i++) {
        const seg = Math.floor(rand() * segments.length);
        electrons.push({
          segment: seg,
          direction: rand() > 0.5 ? 1 : -1,
          t: rand(),
          speed: 0.004 + rand() * 0.008,
        });
      }
    };

    buildBoard();

    let time = 0;

    const render = () => {
      if (!isVisible) return;
      time += 0.016;

      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Base trace paths — dim but present
      for (const s of segments) {
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.strokeStyle = `rgba(148, 163, 184, ${(0.06 * brightness).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Electrons — glowing pulses flowing along traces
      for (const e of electrons) {
        const s = segments[e.segment];
        e.t += e.speed * e.direction;

        // Bounce at ends and randomly switch traces for organic motion
        if (e.t > 1 || e.t < 0) {
          e.direction = (e.direction * -1) as 1 | -1;
          e.t = Math.max(0, Math.min(1, e.t));
        }

        const x = s.x1 + (s.x2 - s.x1) * e.t;
        const y = s.y1 + (s.y2 - s.y1) * e.t;
        const tailLen = 0.12;
        const tx = s.x1 + (s.x2 - s.x1) * Math.max(0, Math.min(1, e.t - tailLen * e.direction));
        const ty = s.y1 + (s.y2 - s.y1) * Math.max(0, Math.min(1, e.t - tailLen * e.direction));

        // Electron reacts to proximity of mouse — speed boost
        let boost = 1;
        if (mouse.active) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) boost = 1 + (1 - dist / 220) * 4;
        }

        const alpha = (0.55 + Math.sin(time * 8 + e.t * 20) * 0.25) * brightness;

        // Tail gradient
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${Math.min(1, alpha).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Electron head glow
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${Math.min(1, alpha + 0.2).toFixed(3)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${(alpha * 0.15 * boost).toFixed(3)})`;
        ctx.fill();
      }

      // Junction nodes — subtle static LEDs
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${(0.12 + pulse * 0.18).toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    render();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, intensity]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}