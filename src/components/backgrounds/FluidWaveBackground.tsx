"use client";

import React, { useEffect, useRef } from "react";

interface FluidWaveBackgroundProps {
  className?: string;
  waveColor1?: string;
  waveColor2?: string;
  waveColor3?: string;
  speed?: number;
  interactive?: boolean;
  opacity?: number;
}

export default function FluidWaveBackground({
  className = "",
  waveColor1 = "rgba(99, 102, 241, 0.25)",   // Indigo
  waveColor2 = "rgba(6, 182, 212, 0.20)",    // Cyan
  waveColor3 = "rgba(168, 85, 247, 0.15)",   // Purple
  speed = 0.0015,
  interactive = true,
  opacity = 0.8,
}: FluidWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Pause RAF when not in viewport or tab hidden
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    });
    observer.observe(canvas);

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

      // Smooth mouse interpolation
      if (mouseRef.current.active) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // Waves configuration
      const waves = [
        {
          color: waveColor1,
          baseY: height * 0.65,
          amplitude: 45,
          frequency: 0.002,
          speedOffset: 0,
        },
        {
          color: waveColor2,
          baseY: height * 0.72,
          amplitude: 60,
          frequency: 0.0015,
          speedOffset: 2,
        },
        {
          color: waveColor3,
          baseY: height * 0.8,
          amplitude: 75,
          frequency: 0.001,
          speedOffset: 4,
        },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.baseY);

        const step = 10;
        for (let x = 0; x <= width; x += step) {
          // Compound sinusoidal waves
          let y =
            wave.baseY +
            Math.sin(x * wave.frequency + time + wave.speedOffset) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.5 + time * 1.5) * (wave.amplitude * 0.5);

          // Mouse interactive ripple distortion
          if (mouseRef.current.active) {
            const dist = Math.abs(x - mouseRef.current.x);
            const maxDist = 250;
            if (dist < maxDist) {
              const factor = (1 - dist / maxDist) * Math.sin((dist / 30) - time * 8);
              const mouseOffsetY = (mouseRef.current.y - wave.baseY) * 0.2;
              y += factor * 35 + mouseOffsetY * (1 - dist / maxDist);
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [waveColor1, waveColor2, waveColor3, speed, interactive]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Bottom fade gradient to blend seamlessly into dark UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
