"use client";

import React, { useEffect, useRef } from "react";
import { ShieldAlert } from "lucide-react";

export default function CybersecurityTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Authentic Matrix Character Set: Katakana + Hex + Digits + Cyber symbols
    const chars =
      "01010101ABCDEF9876543210XYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜKERNELPROBE_SHA256";
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    const initMatrix = () => {
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -60));
      // Clear canvas with base background
      ctx.fillStyle = "#060405";
      ctx.fillRect(0, 0, width, height);
    };

    initMatrix();

    let lastTime = 0;
    const frameInterval = 38; // ~26 FPS balanced, smooth cadence

    const render = (time: number) => {
      animationId = requestAnimationFrame(render);

      if (time - lastTime < frameInterval) return;
      lastTime = time;

      // Balanced semi-transparent wash for clean, non-blinding trails
      ctx.fillStyle = "rgba(6, 4, 5, 0.075)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y >= 0 && y <= height + fontSize) {
          // Soft glowing leader (alternating white/light-crimson without harsh glare)
          ctx.fillStyle = i % 3 === 0 ? "#FFFFFF" : "#FCA5A5";
          ctx.fillText(char, x, y);

          // Follower in crisp standard crimson
          if (drops[i] > 0) {
            const prevChar = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = "#EF4444";
            ctx.fillText(prevChar, x, (drops[i] - 1) * fontSize);
          }
        }

        // Reset to top with natural balanced frequency
        if (y > height && Math.random() > 0.965) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTime = performance.now();
        animationId = requestAnimationFrame(render);
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#060405]">
      {/* Matrix Canvas Stream with 40% Opacity */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Crimson Ambiance */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-transparent to-[#040203]" />

      {/* CRT Scanline Horizontal Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Terminal Radar Badge (Top Right) */}
      <div className="absolute top-20 right-6 sm:right-16 w-80 rounded-2xl bg-red-950/20 border border-red-500/25 backdrop-blur-md p-4 opacity-40 shadow-[0_0_50px_rgba(239,68,68,0.15)] font-mono text-xs text-red-300">
        <div className="flex items-center justify-between border-b border-red-500/20 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>eBPF_PROBE_DAEMON</span>
          </div>
          <span className="text-[10px] text-emerald-400">DEFENSE_ACTIVE</span>
        </div>
        <div className="space-y-1 text-[10px] text-red-200/60">
          <p>{`[0.0018s] syscall: execve() intercepted`}</p>
          <p>{`[0.0021s] container_escape_score: 0.00`}</p>
          <p className="text-emerald-400">{`[0.0025s] memory_integrity: 100% OK`}</p>
        </div>
      </div>
    </div>
  );
}




