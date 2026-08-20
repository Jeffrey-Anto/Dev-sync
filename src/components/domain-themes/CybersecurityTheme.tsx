"use client";

import React, { useEffect, useRef } from "react";

export default function CybersecurityTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initDrops();
    };

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Cryptographic & binary characters
    const CHARS = "01010101ABCDEF0123456789X_#/<>=+~";
    const fontSize = 13;
    let drops: { y: number; speed: number; length: number; brightness: number }[] = [];

    const initDrops = () => {
      const columns = Math.floor(width / (fontSize * 1.2));
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops.push({
          y: Math.random() * -height,
          speed: Math.random() * 0.6 + 0.3, // Soft, slow drift
          length: Math.floor(Math.random() * 14) + 8,
          brightness: Math.random() * 0.3 + 0.4,
        });
      }
    };

    initDrops();

    const render = () => {
      // Gentle trailing fade
      ctx.fillStyle = "rgba(4, 5, 8, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
      ctx.textBaseline = "top";

      const colWidth = fontSize * 1.2;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * colWidth;

        // Render trail characters
        for (let j = 0; j < drop.length; j++) {
          const charY = (drop.y - j) * fontSize;
          if (charY < -fontSize || charY > height) continue;

          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const progress = j / drop.length;

          if (j === 0) {
            // Soft white leader
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fillText(char, x, charY);
          } else {
            // Subtle dark crimson trail
            const alpha = Math.max(0.04, (1 - progress) * 0.35 * drop.brightness);
            ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.fillText(char, x, charY);
          }
        }

        // Slow advance
        drop.y += drop.speed * 0.4;

        // Reset drop when past bottom
        if ((drop.y - drop.length) * fontSize > height) {
          drop.y = Math.random() * -15;
          drop.speed = Math.random() * 0.6 + 0.3;
          drop.brightness = Math.random() * 0.3 + 0.4;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    render();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040507]">
      {/* Subtle Low-Intensity Matrix Stream */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-25"
      />

      {/* Gentle Ambient Dark Vignette */}
      <div className="absolute inset-0 bg-radial from-red-950/15 via-transparent to-[#040507]" />
    </div>
  );
}



