"use client";

import React, { useEffect, useRef, useState } from "react";

export interface IconCloudProps {
  images?: string[];
  iconSlugs?: string[];
}

interface IconData {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  image: HTMLImageElement;
  loaded: boolean;
  name: string;
}

export function IconCloud({ images, iconSlugs }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Generate image URLs from iconSlugs or images
  const allImages = React.useMemo(() => {
    if (images && images.length > 0) return images;
    if (iconSlugs && iconSlugs.length > 0) {
      return iconSlugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
      );
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

    // Responsive Canvas Resizing
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, parent.clientHeight, 720);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize Fibonacci sphere points
    const count = allImages.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const icons: IconData[] = allImages.map((src, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;

      // Extract tech name from url for hover
      const parts = src.split("/");
      const slugName = parts[parts.length - 1] || "tech";

      const icon: IconData = {
        x,
        y,
        z,
        scale: 1,
        opacity: 1,
        image: img,
        loaded: false,
        name: slugName.toUpperCase(),
      };

      img.onload = () => {
        icon.loaded = true;
      };

      return icon;
    });

    let activeHoveredName: string | null = null;
    let mousePos = { x: -1000, y: -1000 };

    const BASE_SPEED_Y = 0.003;
    const BASE_SPEED_X = 0.0010;
    const SLOW_SPEED_Y = 0.0004;
    const SLOW_SPEED_X = 0.0002;

    let targetRotationX = BASE_SPEED_X;
    let targetRotationY = BASE_SPEED_Y;
    let rotationX = BASE_SPEED_X;
    let rotationY = BASE_SPEED_Y;

    // 3D rotation matrix calculation
    const rotate = () => {
      // Smooth interpolation towards speed
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];

        // Rotate Y (Horizontal)
        let x1 = icon.x * cosY - icon.z * sinY;
        let z1 = icon.z * cosY + icon.x * sinY;

        // Rotate X (Vertical)
        let y2 = icon.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + icon.y * sinX;

        icon.x = x1;
        icon.y = y2;
        icon.z = z2;
      }
    };

    // Render loop
    const render = () => {
      const size = parseFloat(canvas.style.width) || 500;
      const radius = size * 0.40;
      const centerX = size / 2;
      const centerY = size / 2;
      const iconRenderSize = Math.max(size * 0.085, 34);

      ctx.clearRect(0, 0, size, size);

      if (!isDragging) {
        rotate();
      }

      // Sort icons by Z depth so front icons draw over back icons
      const sortedIcons = [...icons].sort((a, b) => a.z - b.z);
      let foundHover: string | null = null;

      for (let i = 0; i < sortedIcons.length; i++) {
        const icon = sortedIcons[i];

        // Map [-1, 1] to screen coords
        const screenX = centerX + icon.x * radius;
        const screenY = centerY + icon.y * radius;

        // Depth scaling: front (z=1) is bigger, back (z=-1) is smaller
        const depth = (icon.z + 1) / 2; // 0 to 1
        const scale = 0.55 + depth * 0.65;
        const opacity = 0.25 + depth * 0.75;
        const currentSize = iconRenderSize * scale;

        // Hit-test for hover on front-facing icons
        const distToMouse = Math.hypot(mousePos.x - screenX, mousePos.y - screenY);
        const isIconHovered = distToMouse < currentSize * 0.65 && icon.z > 0.1;
        if (isIconHovered) {
          foundHover = icon.name;
        }

        ctx.save();
        ctx.globalAlpha = isIconHovered ? 1.0 : opacity;

        // Glow badge background behind icon
        ctx.beginPath();
        ctx.arc(screenX, screenY, currentSize * (isIconHovered ? 0.75 : 0.65), 0, Math.PI * 2);
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

        // Draw the image
        if (icon.loaded) {
          const drawSize = isIconHovered ? currentSize * 1.15 : currentSize;
          ctx.drawImage(
            icon.image,
            screenX - drawSize / 2,
            screenY - drawSize / 2,
            drawSize,
            drawSize
          );
        }

        // Draw tooltip label for hovered icon
        if (isIconHovered) {
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

    // Mouse Interaction Handlers
    const handleMouseEnter = () => {
      // Slow down rotation on hover
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
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        rotationY = dx * 0.006;
        rotationX = -dy * 0.006;

        startX = e.clientX;
        startY = e.clientY;
      } else {
        // Slow down speed while mouse is over the sphere
        targetRotationY = SLOW_SPEED_Y;
        targetRotationX = SLOW_SPEED_X;
      }
    };

    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
      isDragging = false;
      // Resume normal smooth ambient cruise speed
      targetRotationY = BASE_SPEED_Y;
      targetRotationX = BASE_SPEED_X;
      setHoveredTech(null);
    };

    const handleMouseUp = () => {
      isDragging = false;
      targetRotationY = SLOW_SPEED_Y;
      targetRotationX = SLOW_SPEED_X;
    };

    // Touch support for mobile
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
  }, [allImages]);

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  );
}

export default IconCloud;
