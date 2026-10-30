"use client";

import React, { useEffect, useRef } from "react";
import { isMotionPaused } from "@/lib/motion-pause";

interface NeuralPulseBackgroundProps {
  className?: string;
  interactive?: boolean;
  opacity?: number;
  intensity?: "subtle" | "medium" | "vibrant";
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  phase: number;
  color: string;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
  hue: string;
}

const NEURON_COLORS = [
  "rgba(56, 189, 248, ", // Sky
  "rgba(129, 140, 248, ", // Indigo
  "rgba(232, 121, 249, ", // Fuchsia
  "rgba(52, 211, 153, ", // Emerald
];

const SYNAPSE_COLORS = [
  "rgba(56, 189, 248, ",
  "rgba(167, 139, 250, ",
  "rgba(244, 114, 182, ",
];

export default function NeuralPulseBackground({
  className = "",
  interactive = true,
  opacity = 0.85,
  intensity = "medium",
}: NeuralPulseBackgroundProps) {
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

    const alphaBoost = intensity === "vibrant" ? 1.5 : intensity === "subtle" ? 0.55 : 1;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth || window.innerWidth;
      height = canvas.height = parent.clientHeight || window.innerHeight;
      init();
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

    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];

    const init = () => {
      neurons = [];
      const count = Math.min(90, Math.floor((width * height) / 20000));
      for (let i = 0; i < count; i++) {
        neurons.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          baseSize: Math.random() * 1.8 + 0.8,
          phase: Math.random() * Math.PI * 2,
          color: NEURON_COLORS[Math.floor(Math.random() * NEURON_COLORS.length)],
        });
      }
      pulses = [];
    };

    init();

    const maxDist = Math.min(220, Math.max(150, Math.min(width, height) * 0.22));
    let time = 0;
    let pulseAccumulator = 0;

    const render = () => {
      if (!isVisible) return;
      if (isMotionPaused()) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Drift neurons & wrap edges
      for (const n of neurons) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      // Mouse attractor gravity
      const mouse = mouseRef.current;
      if (mouse.active) {
        for (const n of neurons) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220 && dist > 0.01) {
            const force = (1 - dist / 220) * 0.12;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      }

      // Draw synapses (lines between nearby neurons)
      ctx.lineWidth = 0.7;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16 * alphaBoost;
            // Live synapses pulse subtly with combined phase
            const pulse = Math.sin(time * 0.8 + a.phase + b.phase) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${(alpha * (0.6 + pulse * 0.4)).toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // Spawn signal pulses along random nearby neuron pairs
      pulseAccumulator += 0.016;
      const spawnRate = intensity === "vibrant" ? 0.012 : intensity === "subtle" ? 0.004 : 0.008;
      if (pulseAccumulator > spawnRate * 60) {
        pulseAccumulator = 0;
        // pick a random connected pair
        let attempts = 0;
        while (attempts < 30) {
          attempts++;
          const a = Math.floor(Math.random() * neurons.length);
          const b = Math.floor(Math.random() * neurons.length);
          if (a === b) continue;
          const dx = neurons[a].x - neurons[b].x;
          const dy = neurons[a].y - neurons[b].y;
          if (dx * dx + dy * dy < maxDist * maxDist) {
            pulses.push({
              from: a,
              to: b,
              t: 0,
              speed: 0.008 + Math.random() * 0.014,
              hue: SYNAPSE_COLORS[Math.floor(Math.random() * SYNAPSE_COLORS.length)],
            });
            break;
          }
        }
      }

      // Advance & draw pulses as glowing traveling dots with trailing tails
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = neurons[p.from];
        const b = neurons[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tail = 0.25;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - tail);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - tail);

        const glow = 1 - Math.abs(p.t - 0.5) * 2;
        const alpha = (0.5 + glow * 0.5) * alphaBoost;

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${p.hue}${Math.min(1, alpha).toFixed(3)})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2.2 + glow * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `${p.hue}${Math.min(1, alpha + 0.15).toFixed(3)})`;
        ctx.fill();
      }

      // Draw neurons (glowing orbs)
      for (const n of neurons) {
        const pulse = Math.sin(time * 1.6 + n.phase) * 0.5 + 0.5;
        const size = n.baseSize * (1 + pulse * 0.7);

        // Outer halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${(0.05 + pulse * 0.06).toFixed(3)})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${(0.4 + pulse * 0.4).toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    render();

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          const nowVisible = entry.isIntersecting && !document.hidden;
          if (nowVisible && !isVisible) {
            isVisible = true;
            render();
          } else if (!nowVisible && isVisible) {
            isVisible = false;
            cancelAnimationFrame(animationFrameId);
          }
        },
        { rootMargin: "150px" }
      );
      intersectionObserver.observe(canvas);
    }

    return () => {
      intersectionObserver?.disconnect();
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