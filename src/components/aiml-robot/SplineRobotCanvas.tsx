"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot, Sparkles } from "lucide-react";

interface SplineRobotCanvasProps {
  onLoad?: () => void;
  isActivated?: boolean;
}

export default function SplineRobotCanvas({ onLoad, isActivated }: SplineRobotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let splineApp: any = null;
    let isMounted = true;

    async function loadSpline() {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (!isMounted || !canvas) return;

        splineApp = new Application(canvas);
        await splineApp.load("https://prod.spline.design/5NskKBdTIXi8fqfF/scene.splinecode");

        if (isMounted) {
          setIsLoading(false);
          onLoad?.();
        }
      } catch (err) {
        console.warn("Spline runtime load error:", err);
        if (isMounted) {
          setIsLoading(false);
          setHasError(true);
        }
      }
    }

    loadSpline();

    return () => {
      isMounted = false;
      try {
        splineApp?.dispose?.();
      } catch (e) {
        // cleanup safety
      }
    };
  }, [onLoad]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-auto">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#050505]/70 backdrop-blur-sm pointer-events-none">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-pink-500/20 border-t-pink-500 animate-spin" />
            <Bot className="w-6 h-6 text-pink-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="font-mono text-xs text-pink-300 tracking-wider">
            INITIALIZING AUTONOMOUS AI ROBOT CORE...
          </p>
        </div>
      )}

      {/* Fallback in case WebGL / Network fails */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8 rounded-3xl bg-pink-950/20 border border-pink-500/30 backdrop-blur-xl max-w-md">
          <Bot className="w-16 h-16 text-pink-400 animate-bounce" />
          <h4 className="text-xl font-bold text-white font-mono">AI ROBOT READY</h4>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Neural model loaded. Proceed to explore multimodal RAG, edge vision, and speech synthesis systems.
          </p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-auto"
          style={{ outline: "none" }}
        />
      )}
    </div>
  );
}
