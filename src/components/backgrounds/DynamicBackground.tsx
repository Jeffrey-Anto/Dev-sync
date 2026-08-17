"use client";

import React from "react";
import AuroraMeshBackground from "./AuroraMeshBackground";
import FluidWaveBackground from "./FluidWaveBackground";
import FloatingBlobsBackground from "./FloatingBlobsBackground";

export type DynamicBackgroundVariant = "all" | "hybrid" | "aurora" | "waves" | "blobs";

export interface DynamicBackgroundProps {
  variant?: DynamicBackgroundVariant;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
  showGrid?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * DynamicBackground - A high-performance, non-intrusive ambient background component.
 * 
 * Supports:
 * - "all": Rich combination of Aurora glow + Fluid Waves + Floating Glass Blobs
 * - "aurora": Drifting, luminous mesh gradients with deep Gaussian diffusion
 * - "waves": Interactive multi-harmonic canvas fluid waves with cursor ripples
 * - "blobs": Floating organic morphing gradient blobs with glassmorphism support
 * - "hybrid": Layered composition of aurora ambiance + subtle fluid waves
 */
export default function DynamicBackground({
  variant = "all",
  intensity = "medium",
  interactive = true,
  showGrid = true,
  className = "",
  children,
}: DynamicBackgroundProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Layer Container (z-0, non-blocking) */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* 1. Aurora Mesh (Deep Ambiance) */}
        {(variant === "all" || variant === "aurora" || variant === "hybrid") && (
          <AuroraMeshBackground intensity={intensity} interactive={interactive} />
        )}

        {/* 2. Floating Morph Blobs (Midground Organic Movement) */}
        {(variant === "all" || variant === "blobs") && (
          <FloatingBlobsBackground interactive={interactive} />
        )}

        {/* 3. Fluid Wave Canvas (Interactive Foreground Water Ripple) */}
        {(variant === "all" || variant === "waves" || variant === "hybrid") && (
          <FluidWaveBackground
            interactive={interactive}
            opacity={variant === "all" || variant === "hybrid" ? 0.45 : 0.75}
          />
        )}

        {/* Optional Subtle Tech Matrix Grid Overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-60"
            aria-hidden="true"
          />
        )}

        {/* Subtle Dark Vignette & Edge Blend */}
        <div
          className="absolute inset-0 bg-radial-[circle_at_50%_50%,transparent_40%,rgba(5,6,8,0.7)_100%] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Content Slot (z-10 above background) */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
