"use client";

import React, { useEffect, useRef } from "react";
import { ShieldAlert, Terminal, Lock, Radio } from "lucide-react";

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
    };
    window.addEventListener("resize", handleResize);

    // Matrix Rain Stream Characters
    const chars = "01010101ABCDEF9876543210XYZKERNELPROBE_SHA256";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const render = () => {
      // Semi-transparent fade for trailing effect
      ctx.fillStyle = "rgba(4, 6, 8, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#EF4444"; // Crimson Threat Rain
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Faint matrix text
        ctx.fillStyle = i % 3 === 0 ? "rgba(239, 68, 68, 0.45)" : "rgba(248, 113, 113, 0.2)";
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(render);
    };

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#080405]">
      {/* Matrix Canvas Stream */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Crimson Ambiance */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-transparent to-[#060405]" />

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
