"use client";

import React, { useState, useEffect, useRef } from "react";
import AuroraMeshBackground from "./AuroraMeshBackground";
import FluidWaveBackground from "./FluidWaveBackground";
import FloatingBlobsBackground from "./FloatingBlobsBackground";
import ConstellationBackground from "./ConstellationBackground";
import NeuralPulseBackground from "./NeuralPulseBackground";
import CircuitTraceBackground from "./CircuitTraceBackground";
import BackgroundController from "./BackgroundController";

export type DynamicBackgroundVariant =
  | "all"
  | "hybrid"
  | "aurora"
  | "constellation"
  | "waves"
  | "blobs"
  | "neural"
  | "circuit";

export interface DynamicBackgroundProps {
  variant?: DynamicBackgroundVariant;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
  showGrid?: boolean;
  showController?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * DynamicBackground - High-end, atmospheric ambient background engine.
 * 
 * Features:
 * - Fixed full-viewport hardware-accelerated canvas layers
 * - Ethereal Aurora mesh gradient nebula
 * - Interactive Celestial Constellation particle gravity field
 * - Viewport-aware multi-harmonic Fluid Wave liquid horizon
 * - Organic Morphing Glass Orbs
 * - Ambient Cursor Spotlight with smooth damping
 * - Interactive Floating Visualizer Dock
 */
export default function DynamicBackground({
  variant: initialVariant = "all",
  intensity: initialIntensity = "medium",
  interactive: initialInteractive = true,
  showGrid: initialShowGrid = true,
  showController = true,
  className = "",
  children,
}: DynamicBackgroundProps) {
  const [variant, setVariant] = useState<DynamicBackgroundVariant>(initialVariant);
  const [intensity, setIntensity] = useState<"subtle" | "medium" | "vibrant">(initialIntensity);
  const [interactive, setInteractive] = useState(initialInteractive);
  const [showGrid, setShowGrid] = useState(initialShowGrid);

  // Mouse spotlight coordinates
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animateSpotlight = () => {
      if (spotlightRef.current && mouseX > -500) {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${currentX}px ${currentY}px, rgba(99, 102, 241, 0.08), transparent 80%)`;
      }
      animId = requestAnimationFrame(animateSpotlight);
    };

    animateSpotlight();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [interactive]);

  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      {/* 
        FIXED FULL-VIEWPORT AMBIENT LAYER 
        Stays perfectly positioned in the viewport across scrolling without stretching or memory bloat.
      */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden bg-[#050608]">
        {/* 1. Aurora Mesh Nebula (Deep Atmospheric Foundation) */}
        {(variant === "all" || variant === "aurora" || variant === "hybrid") && (
          <AuroraMeshBackground intensity={intensity} interactive={interactive} />
        )}

        {/* 2. Floating Morphing Glass Orbs */}
        {(variant === "all" || variant === "blobs") && (
          <FloatingBlobsBackground
            interactive={interactive}
            opacity={variant === "all" ? 0.5 : 0.8}
          />
        )}

        {/* 3. Celestial Constellation Particle Field */}
        {(variant === "all" || variant === "constellation" || variant === "hybrid") && (
          <ConstellationBackground
            interactive={interactive}
            opacity={variant === "all" ? 0.75 : 0.95}
          />
        )}

        {/* 4. Fluid Waves (Horizon Liquid Ripples) */}
        {(variant === "all" || variant === "waves" || variant === "hybrid") && (
          <FluidWaveBackground
            interactive={interactive}
            intensity={intensity}
            opacity={variant === "all" || variant === "hybrid" ? 0.6 : 0.9}
          />
        )}

        {/* 4b. Neural Synapse Network (Traveling AI signal pulses) */}
        {(variant === "all" || variant === "neural") && (
          <NeuralPulseBackground
            interactive={interactive}
            intensity={intensity}
            opacity={variant === "all" ? 0.6 : 0.9}
          />
        )}

        {/* 4c. Circuit Trace Board (Flowing electrons along PCB traces) */}
        {(variant === "all" || variant === "circuit") && (
          <CircuitTraceBackground
            interactive={interactive}
            intensity={intensity}
            opacity={variant === "all" ? 0.5 : 0.85}
          />
        )}

        {/* 5. Smooth Mouse Spotlight Glow */}
        {interactive && (
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            aria-hidden="true"
          />
        )}

        {/* 6. Subtle Atmospheric Dot Matrix */}
        {showGrid && (
          <div
            className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-60"
            aria-hidden="true"
          />
        )}

        {/* 7. Soft Vignette Depth */}
        <div
          className="absolute inset-0 bg-radial-[circle_at_50%_50%,transparent_30%,rgba(5,6,8,0.6)_100%] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Floating Visualizer Controller */}
      {showController && (
        <BackgroundController
          variant={variant}
          setVariant={setVariant}
          intensity={intensity}
          setIntensity={setIntensity}
          interactive={interactive}
          setInteractive={setInteractive}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
        />
      )}

      {/* Content Slot (Rendered cleanly above background) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
