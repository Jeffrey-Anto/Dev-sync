"use client";

import React, { useEffect, useRef } from "react";

interface FluidWaveBackgroundProps {
  className?: string;
  speed?: number;
  interactive?: boolean;
  opacity?: number;
  intensity?: "subtle" | "medium" | "vibrant";
}

export default function FluidWaveBackground({
  className = "",
  speed = 0.0018,
  interactive = true,
  opacity = 0.75,
  intensity = "medium",
}: FluidWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
    rippleEnergy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (parent.clientWidth || window.innerWidth) * dpr;
      canvas.height = (parent.clientHeight || window.innerHeight) * dpr;
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(canvas.parentElement as Element);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.rippleEnergy = Math.min(mouseRef.current.rippleEnergy + 0.1, 1.0);
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

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

    let time = 0;

    const render = () => {
      if (!isVisible) return;
      time += speed;

      const w = canvas.width / (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio || 1);

      // Mouse position smoothing with lerp
      if (mouseRef.current.active) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
        mouseRef.current.rippleEnergy *= 0.98;
      }

      ctx.clearRect(0, 0, w, h);

      // Waves configuration: layered atmospheric fluid gradients
      const isVibrant = intensity === "vibrant";
      const isSubtle = intensity === "subtle";

      const waveConfigs = [
        {
          baseY: h * 0.72,
          amplitude: isVibrant ? 55 : isSubtle ? 30 : 42,
          frequency: 0.0022,
          speedOffset: 0,
          strokeColor: "rgba(99, 102, 241, 0.45)",
          gradientStart: "rgba(79, 70, 229, 0.22)",
          gradientEnd: "rgba(5, 6, 8, 0.0)",
        },
        {
          baseY: h * 0.78,
          amplitude: isVibrant ? 70 : isSubtle ? 38 : 54,
          frequency: 0.0016,
          speedOffset: 2.1,
          strokeColor: "rgba(56, 189, 248, 0.4)",
          gradientStart: "rgba(14, 116, 144, 0.20)",
          gradientEnd: "rgba(5, 6, 8, 0.0)",
        },
        {
          baseY: h * 0.85,
          amplitude: isVibrant ? 85 : isSubtle ? 45 : 65,
          frequency: 0.0011,
          speedOffset: 4.3,
          strokeColor: "rgba(168, 85, 247, 0.35)",
          gradientStart: "rgba(126, 34, 206, 0.18)",
          gradientEnd: "rgba(5, 6, 8, 0.0)",
        },
      ];

      waveConfigs.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, wave.baseY);

        const step = 8;
        for (let x = 0; x <= w + step; x += step) {
          // Harmonic wave calculation
          let y =
            wave.baseY +
            Math.sin(x * wave.frequency + time + wave.speedOffset) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.6 + time * 1.4) * (wave.amplitude * 0.45);

          // Smooth interactive ripple deflection
          if (mouseRef.current.active) {
            const dist = Math.abs(x - mouseRef.current.x);
            const maxDist = 280;
            if (dist < maxDist) {
              const falloff = 1 - dist / maxDist;
              const ripple = Math.sin(dist * 0.04 - time * 6) * falloff;
              const cursorVerticalPull = (mouseRef.current.y - wave.baseY) * 0.15;
              y += ripple * 28 + cursorVerticalPull * falloff;
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        // Vertical gradient fill
        const gradient = ctx.createLinearGradient(0, wave.baseY - wave.amplitude, 0, h);
        gradient.addColorStop(0, wave.gradientStart);
        gradient.addColorStop(1, wave.gradientEnd);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Soft luminous top crest line
        ctx.strokeStyle = wave.strokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, interactive, intensity]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Seamless bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none" />
    </div>
  );
}
