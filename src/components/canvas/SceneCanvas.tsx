"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

interface SceneCanvasProps {
  className?: string;
}

export default function SceneCanvas({ className = "w-full h-full" }: SceneCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setMounted(true);
    // Limit DPR on mobile/high-res screens to ensure smooth 60fps
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    setDpr(pixelRatio);
  }, []);

  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#050608]`}>
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 50 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
