"use client";

import React, { useEffect, useRef } from "react";

interface FluidWaveBackgroundProps {
  className?: string;
  speed?: number;
  interactive?: boolean;
  opacity?: number;
  intensity?: "subtle" | "medium" | "vibrant";
  showParticles?: boolean;
}

interface Particle {
  x: number;
  yNorm: number; // 0 to 1 relative height
  vx: number;
  baseSize: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  waveIndex: number;
}

interface RippleRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

export default function FluidWaveBackground({
  className = "",
  speed = 1.0,
  interactive = true,
  opacity = 0.85,
  intensity = "medium",
  showParticles = true,
}: FluidWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    active: false,
    hovered: false,
    rippleEnergy: 0,
    lastSpawnX: 0,
    lastSpawnY: 0,
  });

  const ripplesRef = useRef<RippleRing[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement || container;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width || window.innerWidth;
      height = rect.height || 500;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize particles when dimensions are set
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    const initParticles = (w: number, h: number) => {
      const count = Math.min(36, Math.max(16, Math.floor(w / 45)));
      const colors = [
        "rgba(129, 140, 248, ", // Indigo
        "rgba(56, 189, 248, ",  // Cyan
        "rgba(192, 132, 252, ", // Purple
        "rgba(244, 114, 182, ", // Pink
      ];

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        yNorm: 0.3 + Math.random() * 0.6,
        vx: 0.2 + Math.random() * 0.5,
        baseSize: 1.2 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        waveIndex: Math.floor(Math.random() * 4),
      }));
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    // Mouse & Pointer handlers with local coordinate transformation
    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      // Check if cursor is within reasonable proximity of section
      const isInside =
        localX >= -50 &&
        localX <= rect.width + 50 &&
        localY >= -50 &&
        localY <= rect.height + 50;

      if (isInside) {
        mouseRef.current.targetX = localX;
        mouseRef.current.targetY = localY;
        mouseRef.current.active = true;
        mouseRef.current.hovered =
          localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height;

        // Compute speed & spawn dynamic ripples on movement
        const dx = localX - mouseRef.current.lastSpawnX;
        const dy = localY - mouseRef.current.lastSpawnY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30 && ripplesRef.current.length < 8) {
          ripplesRef.current.push({
            x: localX,
            y: localY,
            radius: 5,
            maxRadius: 180 + Math.random() * 80,
            strength: Math.min(1.0, 0.4 + dist * 0.008),
            speed: 3.5 + Math.random() * 1.5,
          });
          mouseRef.current.lastSpawnX = localX;
          mouseRef.current.lastSpawnY = localY;
        }

        mouseRef.current.rippleEnergy = Math.min(
          mouseRef.current.rippleEnergy + 0.15,
          1.0
        );
      } else {
        mouseRef.current.hovered = false;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.hovered = false;
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        lastTime = performance.now();
        render(lastTime);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Wave Configurations with Rich Color Grading and Proportions
    const isVibrant = intensity === "vibrant";
    const isSubtle = intensity === "subtle";

    const waveConfigs = [
      // 1. High Wave: Ambient Violet/Indigo Ether (flows behind top title)
      {
        baseYRatio: 0.38,
        amplitude: isVibrant ? 46 : isSubtle ? 26 : 36,
        wavelength: 0.0018,
        speedFactor: 0.85,
        harmonicRatio: 2.2,
        harmonicAmpFactor: 0.4,
        breatheSpeed: 0.6,
        breatheAmp: 12,
        strokeColor: "rgba(167, 139, 250, 0.6)",
        strokeGlow: "rgba(139, 92, 246, 0.8)",
        lineWidth: 1.5,
        gradientStops: [
          { pos: 0, color: "rgba(139, 92, 246, 0.18)" },
          { pos: 0.4, color: "rgba(99, 102, 241, 0.12)" },
          { pos: 1, color: "rgba(5, 7, 13, 0.0)" },
        ],
      },
      // 2. Mid Wave: Royal Blue & Sapphire Current
      {
        baseYRatio: 0.52,
        amplitude: isVibrant ? 54 : isSubtle ? 32 : 44,
        wavelength: 0.0014,
        speedFactor: -0.95, // Reverse direction for hypnotic cross-current
        harmonicRatio: 1.8,
        harmonicAmpFactor: 0.45,
        breatheSpeed: 0.75,
        breatheAmp: 14,
        strokeColor: "rgba(99, 102, 241, 0.7)",
        strokeGlow: "rgba(79, 70, 229, 0.85)",
        lineWidth: 1.8,
        gradientStops: [
          { pos: 0, color: "rgba(79, 70, 229, 0.22)" },
          { pos: 0.5, color: "rgba(30, 58, 138, 0.14)" },
          { pos: 1, color: "rgba(5, 7, 13, 0.0)" },
        ],
      },
      // 3. Main Wave: Luminous Cyan & Electric Aqua Fluid
      {
        baseYRatio: 0.68,
        amplitude: isVibrant ? 62 : isSubtle ? 36 : 50,
        wavelength: 0.0022,
        speedFactor: 1.25,
        harmonicRatio: 2.6,
        harmonicAmpFactor: 0.38,
        breatheSpeed: 0.9,
        breatheAmp: 16,
        strokeColor: "rgba(56, 189, 248, 0.85)",
        strokeGlow: "rgba(6, 182, 212, 0.95)",
        lineWidth: 2.2,
        gradientStops: [
          { pos: 0, color: "rgba(6, 182, 212, 0.26)" },
          { pos: 0.45, color: "rgba(14, 116, 144, 0.15)" },
          { pos: 1, color: "rgba(5, 7, 13, 0.0)" },
        ],
      },
      // 4. Foreground Crest Wave: Pink-Violet Horizon Ripple
      {
        baseYRatio: 0.84,
        amplitude: isVibrant ? 68 : isSubtle ? 40 : 56,
        wavelength: 0.0016,
        speedFactor: 1.55,
        harmonicRatio: 3.1,
        harmonicAmpFactor: 0.32,
        breatheSpeed: 1.1,
        breatheAmp: 18,
        strokeColor: "rgba(244, 114, 182, 0.75)",
        strokeGlow: "rgba(236, 72, 153, 0.8)",
        lineWidth: 1.6,
        gradientStops: [
          { pos: 0, color: "rgba(236, 72, 153, 0.2)" },
          { pos: 0.4, color: "rgba(147, 51, 234, 0.12)" },
          { pos: 1, color: "rgba(5, 7, 13, 0.0)" },
        ],
      },
    ];

    let lastTime = performance.now();
    let globalTime = 0;

    // Helper to calculate wave height at point x for a given wave
    const sampleWaveY = (x: number, wave: (typeof waveConfigs)[0], t: number, w: number, h: number) => {
      const baseY =
        h * wave.baseYRatio +
        Math.sin(t * wave.breatheSpeed) * wave.breatheAmp;

      // Primary harmonic sinusoidal traveling wave
      const primary = Math.sin(x * wave.wavelength + t * wave.speedFactor) * wave.amplitude;

      // Secondary cross-frequency harmonic
      const secondary =
        Math.cos(x * wave.wavelength * wave.harmonicRatio - t * wave.speedFactor * 1.35) *
        (wave.amplitude * wave.harmonicAmpFactor);

      // Micro surface fluid ripple
      const micro =
        Math.sin(x * 0.006 + t * wave.speedFactor * 2.1) * (wave.amplitude * 0.12);

      let y = baseY + primary + secondary + micro;

      // Cursor Direct Physical Displacement (Kelvin wave wake / water depression)
      const mouse = mouseRef.current;
      if (mouse.active) {
        const dx = x - mouse.x;
        const maxDistX = 320;
        const absDistX = Math.abs(dx);

        if (absDistX < maxDistX) {
          // Smooth cosine-squared falloff
          const falloffX = Math.cos((absDistX / maxDistX) * (Math.PI / 2)) ** 2;

          // Proximity to wave line
          const distY = y - mouse.y;
          const falloffY = Math.max(0, 1 - Math.abs(distY) / 260);
          const combinedFalloff = falloffX * falloffY;

          // Radiating surface ripple when cursor moves
          const rippleOsc = Math.sin(absDistX * 0.045 - t * 7.5);
          const dynamicRipple = rippleOsc * (22 * mouse.rippleEnergy);

          // Vertical suction / push towards cursor
          const cursorVerticalPull = (mouse.y - y) * 0.22;

          y += (cursorVerticalPull + dynamicRipple) * combinedFalloff;
        }
      }

      // Expanding Circular Ripple Rings Displacement
      for (let i = 0; i < ripplesRef.current.length; i++) {
        const rp = ripplesRef.current[i];
        const distFromCenter = Math.abs(x - rp.x);
        const ringDist = Math.abs(distFromCenter - rp.radius);
        const ringWidth = 45;

        if (ringDist < ringWidth) {
          const ringFalloff = Math.cos((ringDist / ringWidth) * (Math.PI / 2));
          const ringLife = 1 - rp.radius / rp.maxRadius;
          const displacement =
            Math.sin(ringDist * 0.15) * 16 * rp.strength * ringLife * ringFalloff;
          y += displacement;
        }
      }

      return y;
    };

    const render = (timestamp: number) => {
      if (!isVisible) return;

      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;
      globalTime += dt * 1.8 * speed;

      const w = width;
      const h = height;

      // Smooth mouse position with lerp
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.vx = mouse.targetX - mouse.x;
        mouse.vy = mouse.targetY - mouse.y;
        mouse.x += mouse.vx * 0.09;
        mouse.y += mouse.vy * 0.09;
        mouse.rippleEnergy *= 0.982;
      }

      // Update ripple rings
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i];
        rp.radius += rp.speed * dt * 60;
        if (rp.radius >= rp.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, w, h);

      // Render layered flowing waves
      const step = Math.max(6, Math.floor(w / 140)); // High precision smooth curves

      waveConfigs.forEach((wave, waveIdx) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const startY = sampleWaveY(0, wave, globalTime, w, h);
        ctx.lineTo(0, startY);

        for (let x = step; x <= w + step; x += step) {
          const y = sampleWaveY(x, wave, globalTime, w, h);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        // Dynamic multi-stop linear gradient for depth
        const gradient = ctx.createLinearGradient(
          0,
          h * wave.baseYRatio - wave.amplitude * 1.2,
          0,
          h
        );
        wave.gradientStops.forEach((stop) => {
          gradient.addColorStop(stop.pos, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fill();

        // Luminescent Wave Crest Line with Soft Bloom
        ctx.save();
        ctx.shadowColor = wave.strokeGlow;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = wave.strokeColor;
        ctx.lineWidth = wave.lineWidth;
        ctx.stroke();
        ctx.restore();
      });

      // Cursor Fluid Spotlight & Glow Aura
      if (mouse.active && mouse.hovered) {
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        radialGlow.addColorStop(0, "rgba(56, 189, 248, 0.16)");
        radialGlow.addColorStop(0.4, "rgba(99, 102, 241, 0.08)");
        radialGlow.addColorStop(1, "rgba(5, 7, 13, 0.0)");

        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, w, h);

        // Subtle interactive ripple rings visual feedback
        ripplesRef.current.forEach((rp) => {
          const life = 1 - rp.radius / rp.maxRadius;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${(0.25 * life * rp.strength).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }

      // Render Floating Bioluminescent Fluid Particles
      if (showParticles) {
        particlesRef.current.forEach((p) => {
          // Horizontal drift along the current
          p.x += p.vx * dt * 50;
          if (p.x > w + 20) p.x = -20;
          if (p.x < -20) p.x = w + 20;

          // Align vertical position with the wave crest
          const targetWave = waveConfigs[p.waveIndex % waveConfigs.length];
          const waveY = sampleWaveY(p.x, targetWave, globalTime, w, h);
          const floatOffset = Math.sin(globalTime * p.pulseSpeed + p.pulsePhase) * 14;
          let py = waveY - 20 + floatOffset + (p.yNorm - 0.5) * 40;

          // Mouse fluid repulsion on motes
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 0.1) {
              const force = (1 - dist / 140) * 25;
              p.x += (dx / dist) * force * dt * 6;
              py += (dy / dist) * force * dt * 6;
            }
          }

          const pulse = Math.sin(globalTime * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
          const currentSize = p.baseSize * (0.8 + pulse * 0.4);
          const alpha = (0.35 + pulse * 0.45).toFixed(3);

          // Outer particle halo
          ctx.beginPath();
          ctx.arc(p.x, py, currentSize * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${(parseFloat(alpha) * 0.25).toFixed(3)})`;
          ctx.fill();

          // Bright particle core
          ctx.beginPath();
          ctx.arc(p.x, py, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          const inView = entry.isIntersecting && !document.hidden;
          if (inView && !isVisible) {
            isVisible = true;
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
          } else if (!inView && isVisible) {
            isVisible = false;
            cancelAnimationFrame(animationFrameId);
          }
        },
        { rootMargin: "150px" }
      );
      intersectionObserver.observe(container);
    }

    return () => {
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, interactive, intensity, showParticles]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft atmospheric vignettes for seamless edge blending */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#05070d] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none" />
    </div>
  );
}
