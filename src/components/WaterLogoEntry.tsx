"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface WaterLogoEntryProps {
  onEnter: () => void;
  isEntered: boolean;
}

export default function WaterLogoEntry({ onEnter, isEntered }: WaterLogoEntryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoContainerRef = useRef<HTMLDivElement | null>(null);
  const logoSpinnerRef = useRef<HTMLDivElement | null>(null);
  const entryOverlayRef = useRef<HTMLDivElement | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const depthSlices = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      bgGrad.addColorStop(0, "rgba(14, 28, 54, 0.6)");
      bgGrad.addColorStop(0.4, "rgba(6, 12, 22, 0.95)");
      bgGrad.addColorStop(1, "#000000");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      if (frame % 70 === 0 && !isEntered) {
        ripples.push({
          x: width / 2 + (Math.random() - 0.5) * 40,
          y: height / 2 + 60 + (Math.random() - 0.5) * 10,
          radius: 10,
          maxRadius: 160 + Math.random() * 60,
          opacity: 0.5,
          speed: 1.2,
        });
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity = Math.max(0, 0.5 * (1 - r.radius / r.maxRadius));

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (r.radius > 20) {
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.7, r.radius * 0.25, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 175, 55, ${r.opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();

        if (r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: MouseEvent) => {
      if (Math.random() > 0.85 && !isEntered) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 5,
          maxRadius: 80 + Math.random() * 40,
          opacity: 0.4,
          speed: 1.5,
        });
      }
    };
    window.addEventListener("mousemove", handlePointerMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [isEntered]);

  const handleLogoClick = () => {
    if (isAnimating || isEntered) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter();
      },
    });

    if (logoSpinnerRef.current) {
      tl.to(logoSpinnerRef.current, {
        rotateY: "+=720",
        duration: 1.6,
        ease: "power3.inOut",
      });
    }

    tl.to(
      ".entry-cta-btn",
      {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    const container = logoContainerRef.current;
    const medallion = logoSpinnerRef.current;

    let targetX = 36 - window.innerWidth / 2;
    let targetY = 36 - window.innerHeight / 2;
    let scale = 0.16;

    if (container && medallion) {
      const cRect = container.getBoundingClientRect();
      const mRect = medallion.getBoundingClientRect();
      gsap.set(container, {
        transformOrigin: `${mRect.left - cRect.left + mRect.width / 2}px ${
          mRect.top - cRect.top + mRect.height / 2
        }px`,
      });

      const navbarLogoEl = document.querySelector("[data-logo-slot]");
      if (navbarLogoEl) {
        const header = navbarLogoEl.closest("header");
        const wrapper = header ? header.parentElement : null;
        const hPrev = header ? header.style.transform : "";
        const wPrev = wrapper ? wrapper.style.transform : "";
        if (header) header.style.transform = "none";
        if (wrapper) wrapper.style.transform = "none";
        const rect = navbarLogoEl.getBoundingClientRect();
        if (header) header.style.transform = hPrev;
        if (wrapper) wrapper.style.transform = wPrev;

        if (rect.width > 0 && rect.height > 0) {
          const layoutW = medallion.parentElement
            ? medallion.parentElement.getBoundingClientRect().width
            : mRect.width;
          targetX = rect.left + rect.width / 2 - (mRect.left + mRect.width / 2);
          targetY = rect.top + rect.height / 2 - (mRect.top + mRect.height / 2);
          scale = rect.width / layoutW;
        }
      }
    }

    tl.to(
      container,
      {
        x: targetX,
        y: targetY,
        scale,
        duration: 1.4,
        ease: "power3.inOut",
      },
      0.6
    );

    tl.to(container, { opacity: 0, duration: 0.5 }, 1.5);

    tl.to(
      entryOverlayRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      0.8
    );
  };

  if (isEntered) return null;

  return (
    <div
      ref={entryOverlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div
        ref={logoContainerRef}
        onClick={handleLogoClick}
        className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
        style={{ perspective: 1200 }}
      >
        <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#0b192c] via-[#0047ab]/20 to-[#d4af37]/20 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" />

        <div className="relative animate-float-gentle transition-transform duration-500 group-hover:scale-105 preserve-3d">
          <div
            ref={logoSpinnerRef}
            className={`relative w-48 h-48 md:w-56 md:h-56 preserve-3d ${
              isAnimating ? "" : "animate-spin-3d"
            }`}
          >
            <div
              className="absolute inset-0 preserve-3d"
              style={{ transform: "translateZ(-6px) rotateY(180deg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Emblem Back Face"
                className="w-full h-full object-contain filter brightness-[0.8] sepia(1) saturate(3) hue-rotate(5deg) drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              />
            </div>

            {depthSlices.map((zOffset) => (
              <div
                key={zOffset}
                className="absolute inset-0 pointer-events-none preserve-3d select-none"
                style={{ transform: `translateZ(${zOffset}px)` }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  className="w-full h-full object-contain filter brightness-[0.55] sepia(1) saturate(4) hue-rotate(5deg) contrast(1.2)"
                />
              </div>
            ))}

            <div
              className="absolute inset-0 preserve-3d"
              style={{ transform: "translateZ(6px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Government College of Engineering Srirangam Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-500"
              />
            </div>
          </div>

          <div className="absolute -bottom-12 left-0 right-0 h-20 opacity-35 overflow-hidden pointer-events-none filter blur-[2.5px] preserve-3d [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,transparent_90%)]">
            <div
              className={`w-full h-48 md:h-56 transform scale-y-[-1] origin-top preserve-3d ${
                isAnimating ? "" : "animate-spin-3d"
              }`}
            >
              <div
                className="absolute inset-0 preserve-3d"
                style={{ transform: "translateZ(-6px) rotateY(180deg)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  className="w-full h-full object-contain filter brightness-[0.7] sepia(1) saturate(3) hue-rotate(5deg)"
                />
              </div>

              <div
                className="absolute inset-0 preserve-3d"
                style={{ transform: "translateZ(6px)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  className="w-full h-full object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="entry-cta-btn mt-16 flex flex-col items-center gap-3">
          <button
            type="button"
            className="px-8 py-3.5 rounded-full border border-[#d4af37]/40 bg-black/60 backdrop-blur-md text-slate-100 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
          >
            CLICK TO ENTER
          </button>
          <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase opacity-80">
            Government College of Engineering, Srirangam
          </span>
        </div>
      </div>
    </div>
  );
}
