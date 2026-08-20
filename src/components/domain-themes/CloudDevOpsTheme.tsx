"use client";

import React, { useEffect, useRef } from "react";

export default function CloudDevOpsTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse Tracking with smooth spring damping
    let mouse = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      isHovered: false,
      radius: 180,
    };

    // Ripple shockwaves from clicks
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.6,
        alpha: 0.8,
        speed: 5 + Math.random() * 2,
      });

      // Also trigger a burst on nearby nodes
      nodes.forEach((n) => {
        const dx = n.x - e.clientX;
        const dy = n.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 250) {
          const force = (1 - dist / 250) * 12;
          const angle = Math.atan2(dy, dx);
          n.vx += Math.cos(angle) * force;
          n.vy += Math.sin(angle) * force;
          n.glow = 1.0;
        }
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // 1. Constellation Cloud Nodes & Packets
    interface CloudNode {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      glow: number;
      phase: number;
      speed: number;
    }

    interface DataPacket {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }

    let nodes: CloudNode[] = [];
    let packets: DataPacket[] = [];

    const initNodes = () => {
      const count = Math.floor((width * height) / 28000) + 25;
      nodes = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1.2,
          glow: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
        });
      }

      // Initialize floating data packets along node edges
      packets = [];
      for (let p = 0; p < 24; p++) {
        packets.push({
          fromIdx: Math.floor(Math.random() * count),
          toIdx: Math.floor(Math.random() * count),
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.008,
          color: p % 3 === 0 ? "#22d3ee" : p % 3 === 1 ? "#38bdf8" : "#34d399",
          size: Math.random() * 1.8 + 1.5,
        });
      }
    };

    initNodes();

    // 2. 3D Floating Isometric Cloud Cubes (Containers / Microservices)
    interface FloatingCube {
      x: number;
      y: number;
      z: number;
      size: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      vRotX: number;
      vRotY: number;
      vRotZ: number;
      opacity: number;
    }

    const cubes: FloatingCube[] = [
      { x: width * 0.15, y: height * 0.25, z: 250, size: 42, rotX: 0.3, rotY: 0.4, rotZ: 0.1, vRotX: 0.004, vRotY: 0.006, vRotZ: 0.002, opacity: 0.28 },
      { x: width * 0.85, y: height * 0.22, z: 200, size: 50, rotX: -0.2, rotY: 0.5, rotZ: -0.3, vRotX: -0.003, vRotY: 0.005, vRotZ: 0.003, opacity: 0.32 },
      { x: width * 0.88, y: height * 0.72, z: 300, size: 36, rotX: 0.5, rotY: -0.3, rotZ: 0.2, vRotX: 0.005, vRotY: -0.004, vRotZ: 0.002, opacity: 0.22 },
      { x: width * 0.12, y: height * 0.78, z: 220, size: 46, rotX: -0.4, rotY: 0.2, rotZ: 0.5, vRotX: -0.004, vRotY: 0.004, vRotZ: -0.003, opacity: 0.25 },
    ];

    // Helper: 3D point transformation & isometric projection
    const project3D = (
      px: number,
      py: number,
      pz: number,
      cube: FloatingCube,
      time: number
    ) => {
      // Rotation matrices
      // Rotate around X
      let y1 = py * Math.cos(cube.rotX) - pz * Math.sin(cube.rotX);
      let z1 = py * Math.sin(cube.rotX) + pz * Math.cos(cube.rotX);

      // Rotate around Y
      let x2 = px * Math.cos(cube.rotY) + z1 * Math.sin(cube.rotY);
      let z2 = -px * Math.sin(cube.rotY) + z1 * Math.cos(cube.rotY);

      // Rotate around Z
      let x3 = x2 * Math.cos(cube.rotZ) - y1 * Math.sin(cube.rotZ);
      let y3 = x2 * Math.sin(cube.rotZ) + y1 * Math.cos(cube.rotZ);

      // Perspective scale factor
      const fov = 400;
      const scale = fov / (fov + cube.z + z2);

      // Float offset
      const floatY = Math.sin(time * 1.2 + cube.x * 0.01) * 8;

      return {
        x: cube.x + x3 * scale,
        y: cube.y + y3 * scale + floatY,
      };
    };

    const drawCube = (cube: FloatingCube, time: number) => {
      const s = cube.size;
      const vertices = [
        [-s, -s, -s],
        [s, -s, -s],
        [s, s, -s],
        [-s, s, -s],
        [-s, -s, s],
        [s, -s, s],
        [s, s, s],
        [-s, s, s],
      ];

      const projected = vertices.map(([vx, vy, vz]) =>
        project3D(vx, vy, vz, cube, time)
      );

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back face
        [4, 5], [5, 6], [6, 7], [7, 4], // front face
        [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
      ];

      ctx.save();
      ctx.strokeStyle = `rgba(34, 211, 238, ${cube.opacity})`;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 8;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Vertex dots
      ctx.fillStyle = `rgba(255, 255, 255, ${cube.opacity * 1.5})`;
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse smooth approach
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Gentle dark trail fade
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Volumetric Sine Waves (Atmospheric Data Auroras)
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.beginPath();

        const baseY = height * (0.35 + w * 0.18);
        const waveSpeed = time * (0.4 + w * 0.15);
        const amplitude1 = 35 + w * 15;
        const amplitude2 = 20 - w * 5;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 12) {
          const normX = x / width;
          const y =
            baseY +
            Math.sin(normX * 4 + waveSpeed) * amplitude1 +
            Math.cos(normX * 7 - waveSpeed * 0.8) * amplitude2;
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - 80, width, baseY + 120);
        if (w === 0) {
          grad.addColorStop(0, "rgba(6, 182, 212, 0.04)");
          grad.addColorStop(0.5, "rgba(14, 165, 233, 0.07)");
          grad.addColorStop(1, "rgba(6, 182, 212, 0.0)");
        } else if (w === 1) {
          grad.addColorStop(0, "rgba(56, 189, 248, 0.03)");
          grad.addColorStop(0.5, "rgba(6, 182, 212, 0.05)");
          grad.addColorStop(1, "rgba(2, 132, 199, 0.0)");
        } else {
          grad.addColorStop(0, "rgba(16, 185, 129, 0.02)");
          grad.addColorStop(0.5, "rgba(6, 182, 212, 0.04)");
          grad.addColorStop(1, "rgba(14, 165, 233, 0.0)");
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Wave outline stream
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const normX = x / width;
          const y =
            baseY +
            Math.sin(normX * 4 + waveSpeed) * amplitude1 +
            Math.cos(normX * 7 - waveSpeed * 0.8) * amplitude2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 - w * 0.02})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      // 2. Draw 3D Floating Holographic Server Cubes
      cubes.forEach((cube) => {
        cube.rotX += cube.vRotX;
        cube.rotY += cube.vRotY;
        cube.rotZ += cube.vRotZ;
        drawCube(cube, time);
      });

      // 3. Process & Draw Nodes
      const maxDistance = 140;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Smooth organic drift
        node.x += node.vx + Math.sin(time + node.phase) * 0.2;
        node.y += node.vy + Math.cos(time + node.phase) * 0.2;

        // Friction for velocity damping (after click impulse)
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Wrap around boundaries smoothly
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        // Mouse interaction: gentle repulsion & glow acceleration
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);

        if (mDist < mouse.radius && mouse.isHovered) {
          const force = (1 - mDist / mouse.radius) * 1.5;
          node.x += (mdx / mDist) * force * 1.2;
          node.y += (mdy / mDist) * force * 1.2;
          node.glow = Math.min(1.0, node.glow + 0.05);

          // Draw fine laser connection to mouse cursor
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - mDist / mouse.radius) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          node.glow = Math.max(0.2, node.glow - 0.01);
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18 * (node.glow + other.glow);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw node beacon
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + node.glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${node.glow * 0.7})`;
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 8 * node.glow;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      // 4. Draw Moving Data Packets along Conduits
      packets.forEach((packet) => {
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.fromIdx = Math.floor(Math.random() * nodes.length);
          packet.toIdx = Math.floor(Math.random() * nodes.length);
        }

        const from = nodes[packet.fromIdx];
        const to = nodes[packet.toIdx];
        if (!from || !to) return;

        const dist = Math.hypot(from.x - to.x, from.y - to.y);
        if (dist > maxDistance * 1.8) return; // Only draw on reasonably close nodes

        const px = from.x + (to.x - from.x) * packet.progress;
        const py = from.y + (to.y - from.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowColor = packet.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Draw Ripple Waves (from user clicks)
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (rip.alpha < 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // 6. Glowing Mouse Aura
      if (mouse.isHovered) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        auraGrad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
        auraGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.04)");
        auraGrad.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#03060a]">
      {/* 1. Interactive 60 FPS Fluid Cloud & Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-85"
      />

      {/* 2. Deep Atmospheric Multi-Stop Radial Nebula Vignettes */}
      <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-[#030508] pointer-events-none" />

      {/* 3. Subtle Cybernetic Perspective Floor Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
        }}
      />
    </div>
  );
}
