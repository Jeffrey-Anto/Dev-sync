"use client";

import React, { useEffect, useRef } from "react";
import { Cpu, Zap, Activity } from "lucide-react";

export default function EmbeddedIotTheme() {
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

    // PCB Circuit Traces
    interface Trace {
      points: { x: number; y: number }[];
      progress: number;
      speed: number;
      color: string;
    }

    const traces: Trace[] = [];
    const traceCount = 14;

    for (let i = 0; i < traceCount; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const points = [{ x: startX, y: startY }];

      let currX = startX;
      let currY = startY;

      // 4-step orthogonal PCB traces (45 or 90 deg bends)
      for (let s = 0; s < 4; s++) {
        const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
        const length = 60 + Math.random() * 120;
        currX += Math.cos(angle) * length;
        currY += Math.sin(angle) * length;
        points.push({ x: currX, y: currY });
      }

      traces.push({
        points,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
        color: i % 2 === 0 ? "#10B981" : "#34D399",
      });
    }

    let time = 0;
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Draw Static PCB Traces
      traces.forEach((trace) => {
        ctx.beginPath();
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let p = 1; p < trace.points.length; p++) {
          ctx.lineTo(trace.points[p].x, trace.points[p].y);
        }
        ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw PCB Pads at trace vertices
        trace.points.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
          ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        });

        // Draw Travelling Electron / Signal Pulse along PCB trace
        trace.progress += trace.speed;
        if (trace.progress >= 1) trace.progress = 0;

        const totalSegments = trace.points.length - 1;
        const segmentProgress = trace.progress * totalSegments;
        const currentSeg = Math.floor(segmentProgress);
        const segT = segmentProgress - currentSeg;

        if (currentSeg < totalSegments) {
          const p1 = trace.points[currentSeg];
          const p2 = trace.points[currentSeg + 1];
          const px = p1.x + (p2.x - p1.x) * segT;
          const py = p1.y + (p2.y - p1.y) * segT;

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = trace.color;
          ctx.shadowColor = "#10B981";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040806]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-transparent to-[#040605]" />
      
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
