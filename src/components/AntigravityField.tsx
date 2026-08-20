"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  angle: number;
  length: number;
  width: number;
  color: string;
  speed: number;
  alpha: number;
  rotation: number;
}

// Google / Antigravity Spectrum Colors - High Vibrancy
const COLORS = [
  "#3B82F6", // Bright Google Blue
  "#10B981", // Bright Google Green
  "#FBBF24", // Bright Google Yellow
  "#EF4444", // Bright Google Red
  "#818CF8", // Electric Indigo
  "#06B6D4", // Bright Cyan
  "#F43F5E", // Bright Rose
  "#A855F7", // Bright Purple
  "#FB923C", // Bright Orange
];

interface AntigravityFieldProps {
  className?: string;
  particleDensity?: number;
  interactiveRadius?: number;
  opacity?: number;
}

export default function AntigravityField({
  className = "",
  particleDensity = 1.35,
  interactiveRadius = 320,
  opacity = 0.95,
}: AntigravityFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
      isActive: false,
      speed: 0,
      lastX: width * 0.5,
      lastY: height * 0.45,
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const maxRadius = Math.hypot(width, height) * 0.8;
      
      const ringCount = Math.floor(24 * particleDensity);
      const ringStep = maxRadius / ringCount;

      for (let r = 1; r <= ringCount; r++) {
        const currentRadius = r * ringStep;
        const circumference = 2 * Math.PI * currentRadius;
        const particleSpacing = 56 / particleDensity;
        const countInRing = Math.floor(circumference / particleSpacing);

        for (let i = 0; i < countInRing; i++) {
          const angle = (i / countInRing) * Math.PI * 2 + (r * 0.18);
          // Subtle logarithmic spiral jitter
          const radialJitter = (Math.random() - 0.5) * (ringStep * 0.3);
          const finalRadius = currentRadius + radialJitter;

          const baseX = centerX + Math.cos(angle) * finalRadius;
          const baseY = centerY + Math.sin(angle) * finalRadius;

          // Color gradient distribution across rings and angles
          const colorIndex =
            Math.floor((angle / (Math.PI * 2)) * COLORS.length + r * 0.35) %
            COLORS.length;

          particles.push({
            x: baseX,
            y: baseY,
            baseX,
            baseY,
            radius: finalRadius,
            angle,
            length: 6.0 + Math.random() * 5.0,
            width: 2.8 + Math.random() * 1.2,
            color: COLORS[colorIndex],
            speed: (0.0004 + Math.random() * 0.0003) * (r % 2 === 0 ? 1 : -0.85),
            alpha: 0.8 + Math.random() * 0.2,
            rotation: angle + Math.PI / 2,
          });
        }
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interpolation
      const dxMouse = mouse.targetX - mouse.x;
      const dyMouse = mouse.targetY - mouse.y;
      mouse.x += dxMouse * 0.08;
      mouse.y += dyMouse * 0.08;

      mouse.speed = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.45;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient idle rotation & harmonic breathing
        p.angle += p.speed;
        const breath = Math.sin(time * 0.5 + p.radius * 0.01) * 3.5;
        const currentR = p.radius + breath;

        // Base spiral coordinate
        const originalX = centerX + Math.cos(p.angle) * currentR;
        const originalY = centerY + Math.sin(p.angle) * currentR;

        // Antigravity Cursor Gravitational Interaction
        const dx = originalX - mouse.x;
        const dy = originalY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let targetX = originalX;
        let targetY = originalY;
        let targetRotation = p.angle + Math.PI / 2;

        if (dist < interactiveRadius) {
          const force = (1 - dist / interactiveRadius);
          const angleToMouse = Math.atan2(dy, dx);
          
          // Gravitational tangential swirl + slight repulsion
          const push = force * 45;
          const swirl = force * 60;

          targetX += Math.cos(angleToMouse) * push - Math.sin(angleToMouse) * swirl;
          targetY += Math.sin(angleToMouse) * push + Math.cos(angleToMouse) * swirl;
          targetRotation = angleToMouse + Math.PI / 2 + force * 1.5;
        }

        // Smooth spring physics for particle position
        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;
        p.rotation += (targetRotation - p.rotation) * 0.15;

        // Render oriented dash / particle pill
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * opacity;

        // Rounded dash capsule
        const halfLen = p.length * 0.5;
        const halfWid = p.width * 0.5;

        ctx.beginPath();
        ctx.roundRect(-halfWid, -halfLen, p.width, p.length, halfWid);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleDensity, interactiveRadius, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
