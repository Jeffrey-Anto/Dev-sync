"use client";

import React, { useEffect, useRef } from "react";

export default function AiMlTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Neural Network Layers Simulation
    const layerCount = 5;
    const nodesPerLayer = [4, 7, 9, 6, 3];
    const layers: { x: number; y: number; id: number }[][] = [];

    const paddingX = width * 0.15;
    const spacingX = (width - paddingX * 2) / (layerCount - 1);

    nodesPerLayer.forEach((count, lIdx) => {
      const layerNodes = [];
      const x = paddingX + lIdx * spacingX;
      const spacingY = height / (count + 1);

      for (let i = 0; i < count; i++) {
        layerNodes.push({
          x,
          y: (i + 1) * spacingY + (Math.random() - 0.5) * 20,
          id: lIdx * 100 + i,
        });
      }
      layers.push(layerNodes);
    });

    // Synapse Signal Pulses
    interface Pulse {
      fromLayer: number;
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }

    const pulses: Pulse[] = [];
    for (let p = 0; p < 24; p++) {
      const fromLayer = Math.floor(Math.random() * (layerCount - 1));
      pulses.push({
        fromLayer,
        fromIdx: Math.floor(Math.random() * nodesPerLayer[fromLayer]),
        toIdx: Math.floor(Math.random() * nodesPerLayer[fromLayer + 1]),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.012,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw Synapses (Edges)
      for (let l = 0; l < layerCount - 1; l++) {
        const currentLayer = layers[l];
        const nextLayer = layers[l + 1];

        currentLayer.forEach((n1) => {
          nextLayer.forEach((n2) => {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = "rgba(236, 72, 153, 0.08)";
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        });
      }

      // Draw Synapse Pulses
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromLayer = Math.floor(Math.random() * (layerCount - 1));
          pulse.fromIdx = Math.floor(Math.random() * nodesPerLayer[pulse.fromLayer]);
          pulse.toIdx = Math.floor(Math.random() * nodesPerLayer[pulse.fromLayer + 1]);
        }

        const p1 = layers[pulse.fromLayer][pulse.fromIdx];
        const p2 = layers[pulse.fromLayer + 1][pulse.toIdx];

        if (p1 && p2) {
          const px = p1.x + (p2.x - p1.x) * pulse.progress;
          const py = p1.y + (p2.y - p1.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(244, 114, 182, 0.85)";
          ctx.shadowColor = "#EC4899";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw Neural Nodes
      layers.forEach((layer) => {
        layer.forEach((node) => {
          const pulseEffect = Math.sin(time * 2 + node.id) * 1.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4 + pulseEffect, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(236, 72, 153, 0.4)";
          ctx.strokeStyle = "rgba(244, 114, 182, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        });
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#060408]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-radial from-pink-900/15 via-transparent to-[#050407]" />
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
    </div>
  );
}
