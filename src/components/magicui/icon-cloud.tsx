"use client";

import React, { useEffect, useRef } from "react";

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
  shortName: string;
  slug: string;
  cdnSlug: string;
  tx: number;
  ty: number;
  tz: number;
  tScale: number;
  delay: number;
}

const INTRO_SPIN_SPEED = 0.045;

const CDN_ALIAS: Record<string, string> = {
  java: "openjdk",
  css3: "css",
  cplusplus: "cplusplus",
  visualstudiocode: "visualstudiocode",
  androidstudio: "androidstudio",
  nextdotjs: "nextdotjs",
  nodedotjs: "nodedotjs",
};

const FRIENDLY_NAMES: Record<string, { full: string; short: string }> = {
  typescript: { full: "TypeScript", short: "TypeScript" },
  javascript: { full: "JavaScript", short: "JavaScript" },
  python: { full: "Python", short: "Python" },
  java: { full: "Java", short: "Java" },
  cplusplus: { full: "C++", short: "C++" },
  c: { full: "C", short: "C" },
  rust: { full: "Rust", short: "Rust" },
  go: { full: "Go", short: "Go" },
  dart: { full: "Dart", short: "Dart" },
  html5: { full: "HTML5", short: "HTML5" },
  css3: { full: "CSS3", short: "CSS3" },
  react: { full: "React", short: "React" },
  flutter: { full: "Flutter", short: "Flutter" },
  android: { full: "Android", short: "Android" },
  nodedotjs: { full: "Node.js", short: "Node.js" },
  express: { full: "Express", short: "Express" },
  nextdotjs: { full: "Next.js", short: "Next.js" },
  fastapi: { full: "FastAPI", short: "FastAPI" },
  tailwindcss: { full: "Tailwind CSS", short: "Tailwind" },
  framer: { full: "Framer", short: "Framer" },
  graphql: { full: "GraphQL", short: "GraphQL" },
  docker: { full: "Docker", short: "Docker" },
  kubernetes: { full: "Kubernetes", short: "Kubernetes" },
  terraform: { full: "Terraform", short: "Terraform" },
  amazonaws: { full: "AWS", short: "AWS" },
  helm: { full: "Helm", short: "Helm" },
  prometheus: { full: "Prometheus", short: "Prometheus" },
  grafana: { full: "Grafana", short: "Grafana" },
  nginx: { full: "Nginx", short: "Nginx" },
  vercel: { full: "Vercel", short: "Vercel" },
  firebase: { full: "Firebase", short: "Firebase" },
  postgresql: { full: "PostgreSQL", short: "Postgres" },
  mongodb: { full: "MongoDB", short: "MongoDB" },
  redis: { full: "Redis", short: "Redis" },
  prisma: { full: "Prisma", short: "Prisma" },
  pytorch: { full: "PyTorch", short: "PyTorch" },
  huggingface: { full: "Hugging Face", short: "HuggingFace" },
  opencv: { full: "OpenCV", short: "OpenCV" },
  testinglibrary: { full: "Testing Library", short: "TestingLib" },
  jest: { full: "Jest", short: "Jest" },
  cypress: { full: "Cypress", short: "Cypress" },
  sonarqube: { full: "SonarQube", short: "SonarQube" },
  postman: { full: "Postman", short: "Postman" },
  git: { full: "Git", short: "Git" },
  github: { full: "GitHub", short: "GitHub" },
  gitlab: { full: "GitLab", short: "GitLab" },
  jira: { full: "Jira", short: "Jira" },
  visualstudiocode: { full: "VS Code", short: "VS Code" },
  androidstudio: { full: "Android Studio", short: "AndroidStudio" },
  figma: { full: "Figma", short: "Figma" },
  storybook: { full: "Storybook", short: "Storybook" },
  kalilinux: { full: "Kali Linux", short: "Kali" },
  wireshark: { full: "Wireshark", short: "Wireshark" },
  raspberrypi: { full: "Raspberry Pi", short: "RaspberryPi" },
  espressif: { full: "ESP32", short: "ESP32" },
};

export function IconCloud({
  images,
  iconSlugs,
  groups,
  onUnbox,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const meta = FRIENDLY_NAMES[rawSlug] || {
        full: rawSlug.toUpperCase(),
        short: rawSlug.toUpperCase(),
      };

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
        name: meta.full,
        shortName: meta.short,
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

    let columnHeaders: {
      left: number;
      top: number;
      w: number;
      h: number;
      headerH: number;
      headerY: number;
      label: string;
      font: number;
    }[] = [];

    const computeColumnTargets = (stagger: boolean) => {
      const width = parseFloat(canvas.style.width) || 500;
      const height = parseFloat(canvas.style.height) || 500;
      const minDim = Math.min(width, height);
      const iconRenderSize = Math.max(minDim * 0.1, 44);

      const activeGroups = (groups || [])
        .map((g) => ({
          label: g.label,
          items: icons.filter((it) => g.slugs.includes(it.slug)),
        }))
        .filter((g) => g.items.length > 0);

      if (activeGroups.length === 0) return;

      // Cards layout: 6 columns x 3 rows with balanced spacing around corners and outside boxes
      const cardsPerRow = width < 768 ? 3 : 6;
      const gridRows = Math.ceil(activeGroups.length / cardsPerRow);

      const spanX = 1.90; // Clean margin from screen left/right
      const spanY = 1.84; // Clean margin from screen top/bottom
      const cardSlotW = spanX / cardsPerRow;
      const cardSlotH = spanY / gridRows;

      // Even spacing/gutters outside boxes
      const gapX = cardSlotW * 0.05;
      const gapY = cardSlotH * 0.06;
      const boxW = cardSlotW - gapX;
      const boxH = cardSlotH - gapY;

      // Calculate a UNIFORM icon size for all items across all categories
      const maxDensityCols = 3;
      const maxDensityRows = 3;
      const maxContentW = (boxW - boxW * 0.08) * (width * 0.48);
      const maxContentH = (boxH - boxH * 0.22 - boxH * 0.08) * (height * 0.46);
      const maxCellW = maxContentW / maxDensityCols;
      const maxCellH = maxContentH / maxDensityRows;

      // Exact uniform icon diameter in pixels
      const uniformIconPx = Math.min(maxCellW * 0.80, maxCellH * 0.78, 38);
      const uniformTScale = Math.max(0.35, uniformIconPx / iconRenderSize);

      columnHeaders = [];
      activeGroups.forEach((g, gi) => {
        const col = gi % cardsPerRow;
        const row = Math.floor(gi / cardsPerRow);

        const cardLeft = -spanX / 2 + col * cardSlotW + gapX / 2;
        const cardTop = -spanY / 2 + row * cardSlotH + gapY / 2;
        const cardRight = cardLeft + boxW;
        const cardBottom = cardTop + boxH;

        // Header band at top of box
        const headerH = boxH * 0.20;
        const headerY = cardTop + headerH * 0.52;

        const n = g.items.length;
        let gridCols = 3;
        if (n <= 2) gridCols = n;
        else if (n === 3) gridCols = 3;
        else if (n === 4) gridCols = 2;
        else gridCols = 3;

        const gridRowsIn = Math.ceil(n / gridCols);

        // Content area inside the box below header
        const contentLeft = cardLeft + boxW * 0.04;
        const contentRight = cardRight - boxW * 0.04;
        const contentTop = cardTop + headerH + boxH * 0.02;
        const contentBottom = cardBottom - boxH * 0.04;

        const contentW = contentRight - contentLeft;
        const contentH = contentBottom - contentTop;

        const cellW = contentW / gridCols;
        const cellH = contentH / gridRowsIn;

        g.items.forEach((icon, ji) => {
          const ir = Math.floor(ji / gridCols);
          const ic = ji % gridCols;

          icon.tx = contentLeft + cellW * (ic + 0.5);
          icon.ty = contentTop + cellH * (ir + 0.5);
          icon.tz = 1;
          // Uniform size for all icons, no stretching
          icon.tScale = uniformTScale;
          icon.delay = stagger ? gi * 4 + ji * 2 : 0;
        });

        const font = Math.max(8.5, Math.min(10.5, boxW * width * 0.04));
        columnHeaders.push({
          left: cardLeft,
          top: cardTop,
          w: boxW,
          h: boxH,
          headerH,
          headerY,
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
      currentRadiusX = snapW * 0.48;
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
    const startTime = performance.now();

    const rotate = () => {
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        const x1 = icon.x * cosY - icon.z * sinY;
        const z1 = icon.z * cosY + icon.x * sinY;
        const y2 = icon.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + icon.y * sinX;
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
      const iconRenderSize = Math.max(minDim * 0.1, 44);

      frameCount++;

      if (currentRadiusX === 0) {
        currentRadiusX = minDim * 0.38;
        currentRadiusY = minDim * 0.38;
      }
      const targetRadiusX = mode === "columns" ? width * 0.48 : minDim * 0.38;
      const targetRadiusY = mode === "columns" ? height * 0.46 : minDim * 0.38;
      currentRadiusX += (targetRadiusX - currentRadiusX) * 0.04;
      currentRadiusY += (targetRadiusY - currentRadiusY) * 0.04;
      const radiusX = currentRadiusX;
      const radiusY = currentRadiusY;

      if (mode === "intro") {
        const elapsed = (performance.now() - startTime) / 1000;
        if (elapsed >= 1.0) {
          beginUnbox();
        } else {
          rotationY = 0.065;
          rotationX = 0;
          rotate();
        }
      } else if (mode === "columns") {
        for (const icon of icons) {
          if (frameCount < icon.delay) continue;
          const k = 0.04;
          icon.x += (icon.tx - icon.x) * k;
          icon.y += (icon.ty - icon.y) * k;
          icon.z += (icon.tz - icon.z) * k;
          icon.scale += (icon.tScale - icon.scale) * k;
        }
      } else if (!isDragging) {
        rotate();
      }

      ctx.clearRect(0, 0, width, height);

      // Draw category container boxes in columns mode
      if (mode === "columns") {
        ctx.save();
        for (const h of columnHeaders) {
          const screenLeft = centerX + h.left * radiusX;
          const screenTop = centerY + h.top * radiusY;
          const screenW = h.w * radiusX;
          const screenH = h.h * radiusY;
          const screenHeaderH = h.headerH * radiusY;
          const screenHeaderY = centerY + h.headerY * radiusY;
          const screenHeaderX = screenLeft + screenW / 2;

          // Box Container Background
          ctx.beginPath();
          ctx.roundRect(screenLeft, screenTop, screenW, screenH, 8);
          ctx.fillStyle = "rgba(10, 14, 23, 0.72)";
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(99, 102, 241, 0.22)";
          ctx.stroke();

          // Header Divider
          ctx.beginPath();
          ctx.moveTo(screenLeft + 6, screenTop + screenHeaderH);
          ctx.lineTo(screenLeft + screenW - 6, screenTop + screenHeaderH);
          ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
          ctx.stroke();

          // Header Category Name
          ctx.font = `bold ${h.font}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(199, 210, 254, 0.95)";
          ctx.fillText(h.label, screenHeaderX, screenHeaderY);
        }
        ctx.restore();
      }

      const sortedIcons = [...icons].sort((a, b) => a.z - b.z);
      let foundHover: string | null = null;
      let hoveredIconData: IconData | null = null;
      let hoveredScreenX = 0;
      let hoveredScreenY = 0;

      for (let i = 0; i < sortedIcons.length; i++) {
        const icon = sortedIcons[i];
        const screenX = centerX + icon.x * radiusX;
        const screenY = centerY + icon.y * radiusY;
        const depth = (icon.z + 1) / 2;
        const scale = icon.scale * (0.55 + depth * 0.65);
        const opacity = 0.25 + depth * 0.75;
        const currentSize = iconRenderSize * scale;

        const distToMouse = Math.hypot(mousePos.x - screenX, mousePos.y - screenY);
        const isIconHovered = distToMouse < currentSize * 0.68 && icon.z > 0.1;

        if (isIconHovered) {
          foundHover = icon.name;
          hoveredIconData = icon;
          hoveredScreenX = screenX;
          hoveredScreenY = screenY;
        }

        ctx.save();
        ctx.globalAlpha = isIconHovered ? 1.0 : opacity;

        // Circular background badge (strictly 1:1 circle, no stretching)
        const badgeRadius = currentSize * (isIconHovered ? 0.58 : 0.48);
        ctx.beginPath();
        ctx.arc(screenX, screenY, badgeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isIconHovered ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.85)";
        ctx.fill();
        ctx.lineWidth = isIconHovered ? 2 : 1;
        ctx.strokeStyle = isIconHovered
          ? "rgba(56, 189, 248, 0.95)"
          : `rgba(99, 102, 241, ${0.18 + depth * 0.35})`;

        if (isIconHovered) {
          ctx.shadowColor = "rgba(56, 189, 248, 0.85)";
          ctx.shadowBlur = 16;
        }
        ctx.stroke();

        // Draw Uniform Icon Logo (strictly 1:1 aspect ratio square, no stretching)
        if (icon.loaded) {
          const drawSize = isIconHovered ? currentSize * 0.82 : currentSize * 0.68;
          ctx.drawImage(
            icon.image,
            screenX - drawSize / 2,
            screenY - drawSize / 2,
            drawSize,
            drawSize
          );
        } else {
          // Fallback monogram
          const label = icon.shortName.slice(0, 2);
          ctx.font = `bold ${Math.max(9, currentSize * 0.36)}px monospace`;
          ctx.fillStyle = "rgba(165, 180, 252, 0.95)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, screenX, screenY);
        }

        // Clean label under icon in columns mode
        if (mode === "columns" && !isIconHovered) {
          ctx.font = "600 7.5px monospace";
          ctx.fillStyle = "rgba(199, 210, 254, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const displayLabel =
            icon.shortName.length > 9
              ? icon.shortName.slice(0, 8) + "…"
              : icon.shortName;
          ctx.fillText(displayLabel, screenX, screenY + badgeRadius + 2.5);
        }

        ctx.restore();
      }

      // Floating Tooltip on Hover
      if (hoveredIconData) {
        ctx.save();
        const tooltipText = hoveredIconData.name;
        ctx.font = "bold 11px ui-sans-serif, system-ui, -apple-system, sans-serif";
        const metrics = ctx.measureText(tooltipText);
        const paddingX = 10;
        const paddingY = 5;
        const ttW = metrics.width + paddingX * 2;
        const ttH = 24;
        const ttX = hoveredScreenX - ttW / 2;
        const ttY = hoveredScreenY - iconRenderSize * 0.65 - ttH;

        // Tooltip box
        ctx.beginPath();
        ctx.roundRect(ttX, ttY, ttW, ttH, 6);
        ctx.fillStyle = "rgba(15, 23, 42, 0.98)";
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Tooltip text
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tooltipText, hoveredScreenX, ttY + ttH / 2);
        ctx.restore();
      }

      if (foundHover !== activeHoveredName) {
        activeHoveredName = foundHover;
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
