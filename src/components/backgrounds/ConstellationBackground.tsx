"use client";

import React, { useEffect, useRef } from "react";

interface ConstellationBackgroundProps {
  className?: string;
  particleCount?: number;
  maxDistance?: number;
  interactive?: boolean;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function ConstellationBackground({
  className = "",
  particleCount = 65,
  maxDistance = 140,
  interactive = true,
  opacity = 0.85,
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Palette of refined, elegant atmospheric particle colors
    const colors = [
      "rgba(147, 197, 253, ", // Soft Ice Blue
      "rgba(165, 180, 252, ", // Soft Indigo
      "rgba(196, 181, 253, ", // Soft Lavender
      "rgba(125, 211, 252, ", // Sky Blue
      "rgba(255, 255, 255, ", // Pure Star Light
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 18000) || particleCount;
      for (let i = 0; i < count; i++) {
        const baseSize = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: baseSize,
          baseSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Pause RAF when not in viewport or tab hidden
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

    let time = 0;

    const render = () => {
      if (!isVisible) return;
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseRadius = 180;

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Interactive mouse gravity & deflection
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.8;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Breathing particle pulse
        const pulse = Math.sin(time * 2 + p.pulsePhase);
        const currentAlpha = Math.max(0.1, p.alpha + pulse * 0.2);

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + pulse * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(165, 180, 252, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw laser connector to mouse cursor if within range
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const mAlpha = (1 - mdist / mouseRadius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, maxDistance, interactive]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
