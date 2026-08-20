"use client";

import React, { useEffect, useRef, useState } from "react";

export interface IconCloudGroup {
  label: string;
  slugs: string[];
}

export interface IconCloudProps {
  images?: string[];
  iconSlugs?: string[];
  groups?: IconCloudGroup[];
  onUnbox?: () => void;
}

interface IconData {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  image: HTMLImageElement;
  loaded: boolean;
  failed: boolean;
  name: string;
  slug: string;
  cdnSlug: string;
  tx: number;
  ty: number;
  tz: number;
  tScale: number;
  delay: number;
}

const INTRO_SPIN_SPEED = 0.05;

const CDN_ALIAS: Record<string, string> = {
  java: "openjdk",
  css3: "css",
};

export function IconCloud({
  images,
  iconSlugs,
  groups,
  onUnbox,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const phaseRef = useRef<"intro" | "columns">("intro");

  const allImages = React.useMemo(() => {
    if (images && images.length > 0) return images;
    if (iconSlugs && iconSlugs.length > 0) {
      return iconSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);
    }
    return [];
  }, [images, iconSlugs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || allImages.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const count = allImages.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    const icons: IconData[] = allImages.map((src, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const parts = src.split("/");
      const rawSlug = (parts[parts.length - 1] || "tech").split("?")[0].toLowerCase();
      const cdnSlug = CDN_ALIAS[rawSlug] || rawSlug;

      const img = new Image();
      img.crossOrigin = "anonymous";

      const icon: IconData = {
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
        scale: 1,
        opacity: 1,
        image: img,
        loaded: false,
        failed: false,
        name: rawSlug.toUpperCase(),
        slug: rawSlug,
        cdnSlug,
        tx: 0,
        ty: 0,
        tz: 0,
        tScale: 1,
        delay: 0,
      };

      const primaryUrl = `https://cdn.simpleicons.org/${cdnSlug}`;
      const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${cdnSlug}.svg`;

      img.onload = () => {
        icon.loaded = true;
      };
      img.onerror = () => {
        if (img.src === primaryUrl) {
          img.src = fallbackUrl;
        } else {
          icon.failed = true;
          icon.loaded = false;
        }
      };
      img.src = primaryUrl;

      return icon;
    });

    let columnHeaders: { x: number; y: number; label: string; font: number }[] = [];

    const computeColumnTargets = (stagger: boolean) => {
      const width = parseFloat(canvas.style.width) || 500;
      const height = parseFloat(canvas.style.height) || 500;
      const iconRenderSize = Math.max(Math.min(width, height) * 0.085, 34);

      const activeGroups = (groups || [])
        .map((g) => ({
          label: g.label,
          items: icons.filter((it) => g.slugs.includes(it.slug)),
        }))
        .filter((g) => g.items.length > 0);

      if (activeGroups.length === 0) return;

      const nCols = activeGroups.length;
      const colW = 2 / nCols;

      // Per-column layout so rows don't line up across unrelated stacks.
      // Each column fills roughly the same vertical height but with its own
      // cell gap — dense columns get tight pitch, sparse get airy pitch.
      const totalH = 1.85;

      columnHeaders = [];
      activeGroups.forEach((g, gi) => {
        const n = g.items.length;
        const cx = -1 + colW * (gi + 0.5);
        // Per-column cell gap, capped to avoid giant gaps for tiny columns.
        const cellH = n > 1 ? Math.min(0.26, totalH / (n - 1 + 0.7)) : 0;

        const topY = n > 1 ? -(n - 1) * cellH / 2 : 0;
        // Small stagger so adjacent columns don't sit on identical rows.
        const staggerY = (gi % 2) * cellH * 0.28;

        const tScale = Math.min(
          0.46,
          (cellH * height * 0.46 * 0.72) / (iconRenderSize * 1.2)
        );

        g.items.forEach((icon, ji) => {
          icon.tx = cx;
          icon.ty = topY + ji * cellH + staggerY;
          icon.tz = 1;
          icon.tScale = tScale;
          icon.delay = stagger ? gi * 8 + ji * 3 : 0;
        });

        const font = Math.max(8, Math.min(10, colW * width * 0.07));
        columnHeaders.push({
          x: cx,
          y: topY + staggerY - cellH * 0.62,
          label: g.label.toUpperCase(),
          font,
        });
      });
    };

    let mode: "intro" | "columns" | "cloud" =
      groups && groups.length > 0 ? phaseRef.current : "cloud";

    let currentRadiusX = 0;
    let currentRadiusY = 0;

    if (mode === "columns") {
      computeColumnTargets(false);
      const snapW = parseFloat(canvas.style.width) || 500;
      const snapH = parseFloat(canvas.style.height) || 500;
      currentRadiusX = snapW * 0.4;
      currentRadiusY = snapH * 0.46;
      icons.forEach((icon) => {
        icon.x = icon.tx;
        icon.y = icon.ty;
        icon.z = icon.tz;
        icon.scale = icon.tScale;
      });
    }

    let activeHoveredName: string | null = null;
    let mousePos = { x: -1000, y: -1000 };

    const BASE_SPEED_Y = 0.003;
    const BASE_SPEED_X = 0.001;
    const SLOW_SPEED_Y = 0.0004;
    const SLOW_SPEED_X = 0.0002;

    let targetRotationX = BASE_SPEED_X;
    let targetRotationY = BASE_SPEED_Y;
    let rotationX = BASE_SPEED_X;
    let rotationY = BASE_SPEED_Y;

    let frameCount = 0;
    let totalSpin = 0;

    const rotate = () => {
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        let x1 = icon.x * cosY - icon.z * sinY;
        let z1 = icon.z * cosY + icon.x * sinY;
        let y2 = icon.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + icon.y * sinX;
        icon.x = x1;
        icon.y = y2;
        icon.z = z2;
      }
    };

    const beginUnbox = () => {
      mode = "columns";
      phaseRef.current = "columns";
      computeColumnTargets(true);
      onUnbox?.();
    };

    const render = () => {
      const width = parseFloat(canvas.style.width) || 500;
      const height = parseFloat(canvas.style.height) || 500;
      const minDim = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const iconRenderSize = Math.max(minDim * 0.085, 34);

      frameCount++;

      if (currentRadiusX === 0) {
        currentRadiusX = minDim * 0.4;
        currentRadiusY = minDim * 0.4;
      }
      const targetRadiusX = mode === "columns" ? width * 0.4 : minDim * 0.4;
      const targetRadiusY = mode === "columns" ? height * 0.46 : minDim * 0.4;
      currentRadiusX += (targetRadiusX - currentRadiusX) * 0.03;
      currentRadiusY += (targetRadiusY - currentRadiusY) * 0.03;
      const radiusX = currentRadiusX;
      const radiusY = currentRadiusY;

      if (mode === "intro") {
        if (totalSpin < Math.PI * 4 - 0.6) {
          rotationY = INTRO_SPIN_SPEED;
        } else {
          rotationY = Math.max(0.02, (Math.PI * 4 - totalSpin) * 0.15);
        }
        rotationX = 0;
        totalSpin += rotationY;
        rotate();
        if (totalSpin >= Math.PI * 4) beginUnbox();
      } else if (mode === "columns") {
        for (const icon of icons) {
          if (frameCount < icon.delay) continue;
          const k = 0.03;
          icon.x += (icon.tx - icon.x) * k;
          icon.y += (icon.ty - icon.y) * k;
          icon.z += (icon.tz - icon.z) * k;
          icon.scale += (icon.tScale - icon.scale) * k;
        }
      } else if (!isDragging) {
        rotate();
      }

      ctx.clearRect(0, 0, width, height);

      if (mode === "columns") {
        ctx.save();
        for (const h of columnHeaders) {
          ctx.globalAlpha = 0.85;
          ctx.font = `bold ${h.font}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "alphabetic";
          ctx.fillStyle = "rgba(165, 180, 252, 0.95)";
          ctx.fillText(h.label, centerX + h.x * radiusX, centerY + h.y * radiusY);
        }
        ctx.restore();
      }

      const sortedIcons = [...icons].sort((a, b) => a.z - b.z);
      let foundHover: string | null = null;

      for (let i = 0; i < sortedIcons.length; i++) {
        const icon = sortedIcons[i];
        const screenX = centerX + icon.x * radiusX;
        const screenY = centerY + icon.y * radiusY;
        const depth = (icon.z + 1) / 2;
        const scale = icon.scale * (0.55 + depth * 0.65);
        const opacity = 0.25 + depth * 0.75;
        const currentSize = iconRenderSize * scale;
        const distToMouse = Math.hypot(mousePos.x - screenX, mousePos.y - screenY);
        const isIconHovered = distToMouse < currentSize * 0.65 && icon.z > 0.1;
        if (isIconHovered) foundHover = icon.name;

        ctx.save();
        ctx.globalAlpha = isIconHovered ? 1.0 : opacity;

        ctx.beginPath();
        ctx.arc(screenX, screenY, currentSize * (isIconHovered ? 0.68 : 0.56), 0, Math.PI * 2);
        ctx.fillStyle = isIconHovered ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.75)";
        ctx.fill();
        ctx.lineWidth = isIconHovered ? 2 : 1;
        ctx.strokeStyle = isIconHovered
          ? "rgba(56, 189, 248, 0.9)"
          : `rgba(99, 102, 241, ${0.15 + depth * 0.35})`;
        if (isIconHovered) {
          ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
          ctx.shadowBlur = 15;
        }
        ctx.stroke();

        if (icon.loaded) {
          const drawSize = isIconHovered ? currentSize * 1.15 : currentSize;
          ctx.drawImage(icon.image, screenX - drawSize / 2, screenY - drawSize / 2, drawSize, drawSize);
        } else {
          // Fallback: initials when logo missing
          const label = icon.name.slice(0, 2);
          ctx.font = `bold ${Math.max(9, currentSize * 0.42)}px monospace`;
          ctx.fillStyle = "rgba(165,180,252,0.9)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, screenX, screenY);
        }

        // Always show stack name under icon in columns mode, tooltip on hover otherwise
        if (mode === "columns") {
          ctx.font = `${isIconHovered ? "bold" : "600"} 8px monospace`;
          ctx.fillStyle = isIconHovered ? "#ffffff" : "rgba(203,213,225,0.92)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const label = icon.name.length > 12 ? icon.name.slice(0, 11) + "…" : icon.name;
          ctx.fillText(label, screenX, screenY + currentSize * 0.62 + 5);
        } else if (isIconHovered) {
          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(icon.name, screenX, screenY - currentSize * 0.7);
        }

        ctx.restore();
      }

      if (foundHover !== activeHoveredName) {
        activeHoveredName = foundHover;
        setHoveredTech(foundHover);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseEnter = () => {
      targetRotationY = SLOW_SPEED_Y;
      targetRotationX = SLOW_SPEED_X;
    };
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        rotationY = dx * 0.006;
        rotationX = -dy * 0.006;
        startX = e.clientX;
        startY = e.clientY;
      } else {
        targetRotationY = SLOW_SPEED_Y;
        targetRotationX = SLOW_SPEED_X;
      }
    };
    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
      isDragging = false;
      targetRotationY = BASE_SPEED_Y;
      targetRotationX = BASE_SPEED_X;
      setHoveredTech(null);
    };
    const handleMouseUp = () => {
      isDragging = false;
      targetRotationY = SLOW_SPEED_Y;
      targetRotationX = SLOW_SPEED_X;
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        rotationY = dx * 0.005;
        rotationX = -dy * 0.005;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      isDragging = false;
      targetRotationX = 0.003;
      targetRotationY = 0.004;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [allImages, groups, onUnbox]);

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  );
}

export default IconCloud;
