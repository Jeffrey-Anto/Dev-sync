"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Smartphone,
  ShieldAlert,
  ArrowUpRight,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Palette,
} from "lucide-react";
import { DOMAINS, Domain } from "@/data/domains";
import { NeuralPulseBackground } from "@/components/backgrounds";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  BrainCircuit,
  CloudCog,
  Cpu,
  Palette,
  Smartphone,
  ShieldAlert,
};

// In-memory module cache to persist state across client-side route transitions
let cachedActiveDomainIndex = 0;

export default function DomainSelection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = DOMAINS.length;

  // Restore active domain from sessionStorage on client mount (prevents SSR hydration mismatch)
  useEffect(() => {
    try {
      const savedDomainId = sessionStorage.getItem("devsync_active_domain");
      if (savedDomainId) {
        const idx = DOMAINS.findIndex((d) => d.id === savedDomainId);
        if (idx !== -1) {
          cachedActiveDomainIndex = idx;
          setActiveIndex(idx);
          return;
        }
      }
      const savedIdx = sessionStorage.getItem("devsync_active_domain_index");
      if (savedIdx !== null) {
        const parsed = parseInt(savedIdx, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < DOMAINS.length) {
          cachedActiveDomainIndex = parsed;
          setActiveIndex(parsed);
          return;
        }
      }
      if (cachedActiveDomainIndex !== 0) {
        setActiveIndex(cachedActiveDomainIndex);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Handle hash scrolling on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#domains") {
      const el = document.getElementById("domains");
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Synchronize state changes to cache and sessionStorage
  useEffect(() => {
    cachedActiveDomainIndex = activeIndex;
    try {
      const currentDomain = DOMAINS[activeIndex];
      if (currentDomain) {
        sessionStorage.setItem("devsync_active_domain", currentDomain.id);
        sessionStorage.setItem("devsync_active_domain_index", String(activeIndex));
      }
    } catch {
      // ignore
    }
  }, [activeIndex]);

  // Proactively prefetch all domain routes to guarantee instant route transitions
  useEffect(() => {
    DOMAINS.forEach((domain) => {
      router.prefetch(`/domain/${domain.id}`);
    });
  }, [router]);

  const triggerSpaceTimeWarp = useCallback(
    (domain: Domain) => {
      if (isWarping) return;

      const domainIdx = DOMAINS.findIndex((d) => d.id === domain.id);
      if (domainIdx !== -1) {
        cachedActiveDomainIndex = domainIdx;
        try {
          sessionStorage.setItem("devsync_active_domain", domain.id);
          sessionStorage.setItem("devsync_active_domain_index", String(domainIdx));
        } catch {
          // ignore
        }
      }

      setSelectedDomain(domain);
      setIsWarping(true);

      // Punchy, exhilarating space-time warp timing: 700ms before seamless router push
      setTimeout(() => {
        router.push(`/domain/${domain.id}`);
      }, 700);
    },
    [isWarping, router]
  );

  const handleDomainClick = useCallback(
    (domain: Domain, index: number) => {
      if (isWarping) return;

      // If clicking a side card, bring it smoothly to the center
      if (index !== activeIndex) {
        setActiveIndex(index);
        return;
      }

      // If clicking the active center card, trigger the space-time warp
      triggerSpaceTimeWarp(domain);
    },
    [activeIndex, isWarping, triggerSpaceTimeWarp]
  );

  // Stable handlers let the memoized cards skip re-rendering on hover changes
  const handleCardHover = useCallback((domainId: string) => setHoveredDomainId(domainId), []);
  const handleCardLeave = useCallback(() => setHoveredDomainId(null), []);

  const handlePrev = useCallback(() => {
    if (isWarping) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [isWarping, total]);

  const handleNext = useCallback(() => {
    if (isWarping) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [isWarping, total]);

  // Touch Swipe Handlers for mobile users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWarping) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Enter" || e.key === " ") {
        const activeDomain = DOMAINS[activeIndex];
        if (activeDomain) {
          e.preventDefault();
          triggerSpaceTimeWarp(activeDomain);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleNext, handlePrev, isWarping, triggerSpaceTimeWarp]);

  // Circular shortest distance offset (-3, -2, -1, 0, 1, 2, 3)
  const getCircularOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section
      id="domains"
      ref={containerRef}
      tabIndex={0}
      className="relative z-20 min-h-screen py-20 sm:py-32 px-3 sm:px-6 lg:px-8 bg-[#050608] overflow-hidden flex flex-col justify-center select-none outline-none"
    >
      {/* Ambient Neural Background (Throttles during warp for 120 FPS lock) */}
      <NeuralPulseBackground opacity={isWarping ? 0.15 : 0.65} />
      <div className="absolute inset-0 tech-grid-bg opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-indigo-950/20 via-transparent to-[#050608] pointer-events-none" />

      {/* 🌌 CINEMATIC SPACE-TIME WARP & WORMHOLE ENGINE 🌌 */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isWarping && selectedDomain && (
              <SpaceTimeWarpOverlay domain={selectedDomain} />
            )}
          </AnimatePresence>,
          document.body
        )}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 px-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-2xl sm:text-5xl font-black text-white tracking-tight"
          >
            Select a{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Specialized Domain
            </span>
          </motion.h2>

        </div>

        {/* 3D Circular Deck / Spatial Viewport with Touch Gesture Support */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[470px] sm:h-[550px] flex items-center justify-center touch-pan-y"
          style={{ perspective: 1200 }}
        >
          {DOMAINS.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Terminal;
            const offset = getCircularOffset(index);
            const isCenter = offset === 0;
            const isHovered = hoveredDomainId === domain.id;
            const isSelected = selectedDomain?.id === domain.id;

            return (
              <WarpDomainCard
                key={domain.id}
                domain={domain}
                index={index}
                offset={offset}
                isCenter={isCenter}
                isMobile={isMobile}
                Icon={Icon}
                isHovered={isHovered}
                isSelected={isSelected}
                isWarping={isWarping}
                onHover={handleCardHover}
                onLeave={handleCardLeave}
                onClick={handleDomainClick}
                onLaunch={triggerSpaceTimeWarp}
              />
            );
          })}

          {/* Floating Left / Right Arrow Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-1 sm:px-6 pointer-events-none z-40">
            <button
              onClick={handlePrev}
              disabled={isWarping}
              aria-label="Previous Domain"
              className="pointer-events-auto p-2.5 sm:p-3.5 rounded-full bg-slate-950/90 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-xl cursor-pointer group disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              disabled={isWarping}
              aria-label="Next Domain"
              className="pointer-events-auto p-2.5 sm:p-3.5 rounded-full bg-slate-950/90 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-xl cursor-pointer group disabled:opacity-0"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Orbit Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {DOMAINS.map((domain, idx) => (
            <button
              key={domain.id}
              disabled={isWarping}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select domain ${domain.name}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "w-8 opacity-100" : "w-2 bg-slate-800 hover:bg-slate-700 opacity-60"
              }`}
              style={{
                backgroundColor: activeIndex === idx ? domain.colorTheme.primary : undefined,
                boxShadow:
                  activeIndex === idx ? `0 0 12px ${domain.colorTheme.primary}` : "none",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   SPACE-TIME WARP & WORMHOLE CANVAS OVERLAY (120 FPS ZERO-LAG)
   ========================================================================= */

interface SpaceTimeWarpOverlayProps {
  domain: Domain;
}

function SpaceTimeWarpOverlay({ domain }: SpaceTimeWarpOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const cx = width / 2;
    const cy = height / 2;

    const [r, g, b] = domain.colorTheme.rgb.split(",").map((v) => parseInt(v.trim(), 10));

    // Generate 320 Relativistic Stars in 3D Hyperbolic Space
    const stars = Array.from({ length: 320 }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 1000 + 200,
      pz: 1000,
      size: Math.random() * 2 + 1,
    }));

    const startTime = performance.now();
    const duration = 700; // ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Exponential Relativistic Warp Acceleration Curve
      const warpSpeed = 4 + Math.pow(progress, 3) * 80;

      // Dark space canvas clear with motion-blur persistence
      ctx.fillStyle = "rgba(4, 6, 12, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Relativistic Light Speed Streaks (Ultra-Fast 0-GC draw)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= warpSpeed;

        if (s.z <= 15) {
          s.z = Math.random() * 800 + 400;
          s.pz = s.z + warpSpeed;
          s.x = (Math.random() - 0.5) * width * 1.5;
          s.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 350 / Math.max(10, s.z);
        const pk = 350 / Math.max(10, s.pz);
        const px = cx + s.x * pk;
        const py = cy + s.y * pk;
        const sx = cx + s.x * k;
        const sy = cy + s.y * k;

        if (
          !Number.isFinite(px) ||
          !Number.isFinite(py) ||
          !Number.isFinite(sx) ||
          !Number.isFinite(sy)
        ) {
          continue;
        }

        if (sx < -200 || sx > width + 200 || sy < -200 || sy > height + 200) continue;

        // Draw relativistic trail in domain glow
        ctx.lineWidth = Math.min(3, 1 + progress * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, 0.4 + progress * 0.6)})`;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Draw glowing white-hot tip
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, Math.min(2.5, 0.8 + progress * 1.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Gravitational Lens Waves (Expanding Einstein Concentric Rings)
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const ringProgress = (progress + i * 0.3) % 1;
        const radius = Math.pow(ringProgress, 1.4) * Math.max(width, height) * 0.8;
        const ringAlpha = Math.max(0, (1 - ringProgress) * 0.85);

        if (Number.isFinite(radius) && radius > 0) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringAlpha})`;
          ctx.lineWidth = Math.max(1, 3 - ringProgress * 2);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 3. Central Event Horizon Singularity & Accretion Core
      const coreRadius = Math.min(width, height) * (0.05 + Math.pow(progress, 2.5) * 1.5);
      if (Number.isFinite(coreRadius) && coreRadius > 0.5) {
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
        coreGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.85 + progress * 0.15})`);
        coreGrad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${0.4 * (1 - progress)})`);
        coreGrad.addColorStop(1, "transparent");

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Continue loop until warp completes
      if (progress < 1) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [domain]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* 1. High-Performance Hardware-Accelerated Space-Time Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* 2. Cinematic Singularity Centerpiece (Orb & Surge Typography) */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, z: 0 }}
        animate={{ scale: [0.7, 1.1, 1.45], opacity: [0, 1, 0.95], z: 200 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center flex flex-col items-center justify-center px-4"
      >
        {/* Scaled Domain Title */}
        <h2
          className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-2"
          style={{
            textShadow: `0 0 45px ${domain.colorTheme.primary}, 0 0 90px ${domain.colorTheme.secondary}`,
          }}
        >
          {domain.name}
        </h2>

      </motion.div>
    </motion.div>
  );
}

/* =========================================================================
   3D CIRCULAR DOMAIN CARD
   ========================================================================= */

interface WarpDomainCardProps {
  domain: Domain;
  index: number;
  offset: number;
  isCenter: boolean;
  isMobile?: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  isHovered: boolean;
  isSelected: boolean;
  isWarping: boolean;
  onHover: (domainId: string) => void;
  onLeave: () => void;
  onClick: (domain: Domain, index: number) => void;
  onLaunch: (domain: Domain) => void;
}

const WarpDomainCard = React.memo(function WarpDomainCard({
  domain,
  index,
  offset,
  isCenter,
  isMobile = false,
  Icon,
  isHovered,
  isSelected,
  isWarping,
  onHover,
  onLeave,
  onClick,
  onLaunch,
}: WarpDomainCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateYTilt, setRotateYTilt] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isWarping || !isCenter || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotateX(rotX);
    setRotateYTilt(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateYTilt(0);
    onLeave();
  };

  // 3D Spatial Circular Arc Transformation Coordinates
  const getTransformStyles = () => {
    if (isSelected) {
      // Selected card plunges into the wormhole singularity
      return {
        x: 0,
        y: 0,
        z: 400,
        scale: 1.65,
        rotateY: 0,
        opacity: 0,
        zIndex: 50,
      };
    }

    if (isWarping && !isSelected) {
      // Surrounding cards are deflected outward by gravitational lensing
      return {
        x: offset * (isMobile ? 260 : 450),
        y: 50,
        z: -350,
        scale: 0.35,
        rotateY: offset * -25,
        opacity: 0,
        zIndex: 0,
      };
    }

    if (isMobile) {
      // Mobile-optimized tighter offsets to avoid offscreen cutoffs and horizontal overflow
      switch (offset) {
        case 0:
          return {
            x: 0,
            y: 0,
            z: 50,
            scale: 1.0,
            rotateY: 0,
            opacity: 1,
            zIndex: 30,
          };
        case -1:
          return {
            x: -190,
            y: 0,
            z: -50,
            scale: 0.82,
            rotateY: 12,
            opacity: 0.7,
            zIndex: 20,
          };
        case 1:
          return {
            x: 190,
            y: 0,
            z: -50,
            scale: 0.82,
            rotateY: -12,
            opacity: 0.7,
            zIndex: 20,
          };
        case -2:
          return {
            x: -330,
            y: 0,
            z: -140,
            scale: 0.65,
            rotateY: 18,
            opacity: 0.35,
            zIndex: 10,
          };
        case 2:
          return {
            x: 330,
            y: 0,
            z: -140,
            scale: 0.65,
            rotateY: -18,
            opacity: 0.35,
            zIndex: 10,
          };
        default:
          return {
            x: offset < 0 ? -480 : 480,
            y: 0,
            z: -260,
            scale: 0.45,
            rotateY: offset < 0 ? 25 : -25,
            opacity: 0,
            zIndex: 0,
          };
      }
    }

    // Desktop transforms
    switch (offset) {
      case 0:
        return {
          x: 0,
          y: 0,
          z: 80,
          scale: 1.0,
          rotateY: 0,
          opacity: 1,
          zIndex: 30,
        };
      case -1:
        return {
          x: -310,
          y: 0,
          z: -70,
          scale: 0.85,
          rotateY: 14,
          opacity: 0.85,
          zIndex: 20,
        };
      case 1:
        return {
          x: 310,
          y: 0,
          z: -70,
          scale: 0.85,
          rotateY: -14,
          opacity: 0.85,
          zIndex: 20,
        };
      case -2:
        return {
          x: -560,
          y: 0,
          z: -200,
          scale: 0.72,
          rotateY: 22,
          opacity: 0.5,
          zIndex: 10,
        };
      case 2:
        return {
          x: 560,
          y: 0,
          z: -200,
          scale: 0.72,
          rotateY: -22,
          opacity: 0.5,
          zIndex: 10,
        };
      default:
        return {
          x: offset < 0 ? -780 : 780,
          y: 0,
          z: -360,
          scale: 0.5,
          rotateY: offset < 0 ? 30 : -30,
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  const transform = getTransformStyles();

  return (
    <motion.div
      ref={cardRef}
      animate={{
        x: transform.x,
        y: transform.y,
        scale: transform.scale,
        rotateY: transform.rotateY + (isCenter ? rotateYTilt : 0),
        rotateX: isCenter ? rotateX : 0,
        opacity: transform.opacity,
        zIndex: transform.zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(domain.id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(domain, index)}
      style={{
        position: "absolute",
        transformStyle: "flat",
        backfaceVisibility: "visible",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
      className={`w-[calc(100vw-36px)] max-w-[340px] sm:w-[410px] h-[430px] sm:h-[470px] cursor-pointer rounded-3xl select-none transition-shadow duration-300 antialiased ${
        isCenter ? "cursor-pointer" : "cursor-pointer hover:brightness-125"
      }`}
    >
      {/* Outer Glow Halo for Center or Hovered Card */}
      <div
        className={`absolute -inset-1 rounded-3xl transition-opacity duration-300 blur-xl pointer-events-none ${
          isCenter ? "opacity-75" : isHovered ? "opacity-50" : "opacity-15"
        }`}
        style={{
          background: isCenter
            ? `radial-gradient(circle, ${domain.colorTheme.primary} 0%, rgba(${domain.colorTheme.rgb}, 0.4) 45%, transparent 75%)`
            : `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${domain.colorTheme.primary}, transparent 70%)`,
        }}
      />

      {/* Main Glass Card Surface */}
      <div
        className={`relative h-full rounded-3xl p-5 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isCenter
            ? "bg-[#070a13] shadow-2xl"
            : "bg-[#06080e] hover:bg-[#090d18]"
        }`}
        style={{
          border: isCenter
            ? `2px solid ${domain.colorTheme.primary}`
            : isHovered
            ? `1.5px solid rgba(${domain.colorTheme.rgb}, 0.7)`
            : `1px solid rgba(${domain.colorTheme.rgb}, 0.35)`,
          boxShadow: isCenter
            ? `0 22px 60px -10px rgba(${domain.colorTheme.rgb}, 0.6), 0 0 25px rgba(${domain.colorTheme.rgb}, 0.25), inset 0 0 20px rgba(${domain.colorTheme.rgb}, 0.1)`
            : isHovered
            ? `0 16px 40px -10px rgba(${domain.colorTheme.rgb}, 0.45), 0 0 15px rgba(${domain.colorTheme.rgb}, 0.15)`
            : `0 10px 30px -10px rgba(0, 0, 0, 0.8)`,
          backgroundImage: `linear-gradient(180deg, rgba(${domain.colorTheme.rgb}, ${isCenter ? 0.16 : 0.08}) 0%, rgba(6, 8, 14, 0.98) 45%, #05070c 100%)`,
        }}
      >
        {/* Dynamic Colored Spotlight Reflection */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isCenter ? "opacity-100" : isHovered ? "opacity-70" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(${domain.colorTheme.rgb}, 0.25) 0%, transparent 60%)`,
          }}
        />

        {/* Top Header: Domain Index */}
        <div>
          <div className="flex items-start justify-end mb-3 sm:mb-5">
            <span
              className="font-mono text-xs font-bold tracking-wider"
              style={{ color: isCenter ? domain.colorTheme.secondary : "rgba(203, 213, 225, 0.85)" }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Domain Title */}
          <h3
            className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-2 sm:mb-3"
            style={{
              textShadow: isCenter
                ? `0 2px 10px rgba(0, 0, 0, 0.9), 0 0 12px ${domain.colorTheme.glow}`
                : "0 2px 8px rgba(0, 0, 0, 0.8)",
            }}
          >
            {domain.name}
          </h3>
        </div>

        {/* Middle Feature Highlights */}
        <div className="space-y-2 py-1 sm:py-2">
          <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-slate-100">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.25)`,
                color: domain.colorTheme.secondary,
                border: `1px solid ${domain.colorTheme.primary}`,
                boxShadow: `0 0 10px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              ✓
            </span>
            <span className="truncate">
              <strong className="text-white">{domain.studentCount}</strong> Dedicated Undergraduates
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-slate-100">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.25)`,
                color: domain.colorTheme.secondary,
                border: `1px solid ${domain.colorTheme.primary}`,
                boxShadow: `0 0 10px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              ✓
            </span>
            <span className="truncate">
              <strong className="text-white">{domain.projectCount}</strong> {domain.id === "cybersecurity" ? "Production & Demo Systems" : "Verified Production Systems"}
            </span>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div
          className="pt-4 flex items-center justify-between font-mono text-xs"
          style={{
            borderTop: `1px solid rgba(${domain.colorTheme.rgb}, 0.25)`,
          }}
        >
          <span className="text-slate-300 text-[11px] truncate max-w-[140px]">
            {domain.techStack[0]} · {domain.techStack[1]}
          </span>

          {isCenter ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLaunch(domain);
              }}
              className="group/btn relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold tracking-wider uppercase text-[11px] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              style={{
                backgroundColor: `rgba(${domain.colorTheme.rgb}, 0.28)`,
                border: `1.5px solid ${domain.colorTheme.primary}`,
                color: domain.colorTheme.secondary,
                boxShadow: `0 0 20px rgba(${domain.colorTheme.rgb}, 0.4)`,
              }}
            >
              <span className="relative z-10">ENGAGE WARP</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity blur-sm pointer-events-none"
                style={{ backgroundColor: domain.colorTheme.primary }}
              />
            </button>
          ) : (
            <span
              className="uppercase tracking-wider text-[11px] font-semibold transition-colors"
              style={{ color: isHovered ? domain.colorTheme.secondary : "rgba(226, 232, 240, 0.85)" }}
            >
              CLICK TO FOCUS
            </span>
          )}
        </div>

        {/* Ambient Corner Flare */}
        <div
          className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full opacity-20 pointer-events-none blur-xl"
          style={{ backgroundColor: domain.colorTheme.primary }}
        />
      </div>
    </motion.div>
  );
});
