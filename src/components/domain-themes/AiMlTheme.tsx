"use client";

import React, { useEffect, useRef } from "react";

// ==========================================
// 1. ELITE AI / ML "BALL KNOWLEDGE" REPOSITORY
// ==========================================
interface KnowledgeNodeData {
  id: string;
  name: string;
  category: "model" | "attention" | "optimization" | "alignment" | "vision" | "systems" | "theory";
  detail: string;
  badge: string;
  color: string;
  size: number;
}

const BALL_KNOWLEDGE: KnowledgeNodeData[] = [
  // Foundation Models & Architectures
  { id: "deepseek-r1", name: "DeepSeek-R1", category: "model", detail: "Incentivized reasoning via large-scale pure reinforcement learning", badge: "Reasoning LLM", color: "#EC4899", size: 5.4 },
  { id: "gpt-4o", name: "GPT-4o", category: "model", detail: "Native cross-modal speech, audio, vision and text transformer", badge: "Omni Frontier", color: "#F472B6", size: 5.2 },
  { id: "claude-35", name: "Claude 3.5 Sonnet", category: "model", detail: "State-of-the-art coding, reasoning and agentic tool use architecture", badge: "Agentic Core", color: "#E879F9", size: 5.0 },
  { id: "llama-33", name: "Llama 3.3 70B", category: "model", detail: "High-throughput open weights architecture with Grouped-Query Attention", badge: "Open Weights", color: "#C084FC", size: 4.8 },
  { id: "moe", name: "Mixture-of-Experts", category: "model", detail: "Dynamic top-k routing over specialized sparse feedforward layers", badge: "Sparse Routing", color: "#A855F7", size: 5.2 },
  { id: "qwen-25", name: "Qwen 2.5", category: "model", detail: "Dense architectural scaling with long-context RoPE interpolation", badge: "128K Context", color: "#818CF8", size: 4.5 },
  { id: "vit", name: "Vision Transformer", category: "vision", detail: "Global self-attention computed over flattened 16x16 2D image patches", badge: "ViT / Patch", color: "#06B6D4", size: 4.8 },
  { id: "diffusion", name: "Latent Diffusion", category: "vision", detail: "Score-based reverse SDE denoising executed in compressed VAE latent space", badge: "SDXL / SDE", color: "#22D3EE", size: 5.0 },
  { id: "clip", name: "CLIP Embeddings", category: "vision", detail: "Contrastive joint text-image embedding space with cosine similarity", badge: "Zero-Shot", color: "#38BDF8", size: 4.6 },
  { id: "flow-matching", name: "Flow Matching", category: "vision", detail: "Continuous normalizing flow vector fields with optimal transport paths", badge: "Generative Flow", color: "#60A5FA", size: 4.5 },

  // Attention & Positional Encodings
  { id: "flash-attn", name: "FlashAttention-3", category: "attention", detail: "IO-aware GPU SRAM tiling with asynchronous FP8 warps and zero HBM waste", badge: "O(N) IO Kernel", color: "#F43F5E", size: 5.4 },
  { id: "rope", name: "RoPE Embeddings", category: "attention", detail: "Rotary positional encoding rotating query/key vectors in complex 2D planes", badge: "Rotary Math", color: "#FB7185", size: 4.8 },
  { id: "kv-cache", name: "PagedAttention KV", category: "attention", detail: "Non-contiguous virtual memory allocation eliminating KV cache fragmentation", badge: "vLLM Engine", color: "#FDA4AF", size: 4.8 },
  { id: "gqa", name: "Grouped-Query (GQA)", category: "attention", detail: "Multiple query heads sharing singular key/value head pairs for low memory bandwidth", badge: "Throughput", color: "#F472B6", size: 4.6 },
  { id: "mha", name: "Self-Attention MHA", category: "attention", detail: "Scaled dot-product attention mapping queries, keys and values dynamically", badge: "Attention Core", color: "#EC4899", size: 5.2 },
  { id: "residual", name: "Residual Stream", category: "attention", detail: "Direct bandwidth identity highway preserving uninterrupted gradient flow", badge: "Identity Skip", color: "#D946EF", size: 4.4 },

  // Optimization, Loss & Math
  { id: "backprop", name: "Backpropagation", category: "optimization", detail: "Reverse-mode automatic differentiation computing exact parameter gradients", badge: "Gradient Flow", color: "#EC4899", size: 5.4 },
  { id: "adamw", name: "AdamW 8-Bit", category: "optimization", detail: "Adaptive first/second moments with mathematically decoupled L2 weight decay", badge: "Optimizer", color: "#F472B6", size: 4.8 },
  { id: "loss-grad", name: "Loss Gradient", category: "optimization", detail: "Steepest descent vector trajectory navigating non-convex high-dimensional loss", badge: "Vector Math", color: "#A855F7", size: 4.8 },
  { id: "cross-entropy", name: "Cross-Entropy", category: "optimization", detail: "Negative log-likelihood loss computed over vocabulary softmax distributions", badge: "Loss Function", color: "#C084FC", size: 4.4 },
  { id: "kl-div", name: "KL Divergence", category: "optimization", detail: "Relative entropy quantifying probability distribution divergence during alignment", badge: "Information Theory", color: "#818CF8", size: 4.5 },
  { id: "perplexity", name: "Perplexity Metric", category: "optimization", detail: "Exponentiated cross-entropy measuring predictive uncertainty on held-out tokens", badge: "Evaluation", color: "#6366F1", size: 4.2 },
  { id: "cosine-lr", name: "Cosine Decay LR", category: "optimization", detail: "Smooth cyclic half-wave learning rate annealing with warmup phases", badge: "Scheduler", color: "#38BDF8", size: 4.3 },

  // Alignment & Post-Training
  { id: "rlhf", name: "RLHF / PPO", category: "alignment", detail: "Proximal Policy Optimization clipped surrogate objective with reward proxies", badge: "Policy Gradient", color: "#10B981", size: 5.0 },
  { id: "dpo", name: "Direct Preference (DPO)", category: "alignment", detail: "Closed-form reward optimization directly updating policy weights without actor-critic", badge: "Implicit Reward", color: "#34D399", size: 5.2 },
  { id: "cot", name: "Chain-of-Thought", category: "alignment", detail: "Latent reasoning path decomposition via sequential intermediate scratchpad tokens", badge: "Reasoning Path", color: "#6EE7B7", size: 4.8 },
  { id: "const-ai", name: "Constitutional AI", category: "alignment", detail: "Automated reinforcement learning from AI feedback enforcing constitutional rules", badge: "RLAIF Core", color: "#2DD4BF", size: 4.5 },
  { id: "prm", name: "Process Supervision (PRM)", category: "alignment", detail: "Step-level step verification scoring intermediate logical steps rather than final answers", badge: "PRM Verifier", color: "#14B8A6", size: 4.6 },

  // Systems & Hardware Acceleration
  { id: "cuda-warp", name: "CUDA Warp Shuffles", category: "systems", detail: "Direct register-to-register thread communication bypassing shared memory latency", badge: "NVIDIA Hardware", color: "#06B6D4", size: 5.0 },
  { id: "tensorrt", name: "TensorRT-LLM", category: "systems", detail: "Graph compilation, kernel fusion, dynamic FP8 scaling and in-flight batching", badge: "Inference Engine", color: "#22D3EE", size: 4.8 },
  { id: "triton", name: "Triton Kernels", category: "systems", detail: "Pythonic GPU programming framework compiling directly to highly-tuned PTX assembly", badge: "OpenAI Triton", color: "#38BDF8", size: 4.8 },
  { id: "fp8-quant", name: "FP8 Quantization", category: "systems", detail: "E4M3 / E5M2 mixed-precision matrix multiplication doubling tensor core throughput", badge: "Tensor Core", color: "#60A5FA", size: 4.6 },
  { id: "vector-db", name: "HNSW Vector Index", category: "systems", detail: "Hierarchical Navigable Small World graphs for ultra-fast approximate nearest neighbors", badge: "Vector Search", color: "#818CF8", size: 4.7 },
  { id: "lora", name: "LoRA Rank-64", category: "systems", detail: "Low-Rank Adaptation freezing base weights and training low-rank decomposed matrices", badge: "Parameter Efficient", color: "#A855F7", size: 4.8 },
  { id: "spec-decoding", name: "Speculative Decoding", category: "systems", detail: "Compact draft model proposing token sequences verified in parallel by target model", badge: "Low Latency", color: "#C084FC", size: 4.6 },

  // Elite Ball Knowledge Theory
  { id: "chinchilla", name: "Chinchilla Scaling", category: "theory", detail: "Compute-optimal law balancing model parameters and training token volume proportionally", badge: "Scaling Law", color: "#F59E0B", size: 4.8 },
  { id: "grokking", name: "Grokking Phenomenon", category: "theory", detail: "Delayed out-of-distribution generalization emerging long after training loss reaches zero", badge: "Phase Transition", color: "#FBBF24", size: 4.6 },
  { id: "superposition", name: "Superposition Theory", category: "theory", detail: "Neural networks representing more concepts than dimensions via almost-orthogonal vectors", badge: "Mech Interp", color: "#FCD34D", size: 4.8 },
  { id: "mech-interp", name: "Induction Heads", category: "theory", detail: "Two-head attention circuits performing in-context sequence pattern completion", badge: "Transformer Circuit", color: "#F472B6", size: 4.6 },
  { id: "ntk", name: "Neural Tangent Kernel", category: "theory", detail: "Infinite-width limit dynamics proving convergence characteristics via kernel regression", badge: "Deep Theory", color: "#EC4899", size: 4.4 },
  { id: "hopfield", name: "Modern Hopfield", category: "theory", detail: "Exponential storage capacity dense associative memory with softmax attention equivalence", badge: "Energy Function", color: "#E879F9", size: 4.4 },
];

export default function AiMlTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Main 3D Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface TensorPolyhedron {
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
      color: string;
      glowColor: string;
      opacity: number;
    }

    let cornerTensors: TensorPolyhedron[] = [];

    const initCornerTensors = () => {
      // Position outside the content container
      cornerTensors = [
        { x: 50, y: 120, z: 240, size: 28, rotX: 0.3, rotY: 0.4, rotZ: 0.1, vRotX: 0.004, vRotY: 0.006, vRotZ: 0.002, color: "rgba(236, 72, 153, 0.2)", glowColor: "#EC4899", opacity: 0.25 },
        { x: width - 50, y: 120, z: 200, size: 30, rotX: -0.2, rotY: 0.5, rotZ: -0.3, vRotX: -0.003, vRotY: 0.005, vRotZ: 0.003, color: "rgba(6, 182, 212, 0.2)", glowColor: "#06B6D4", opacity: 0.25 },
        { x: width - 50, y: height - 100, z: 280, size: 26, rotX: 0.5, rotY: -0.3, rotZ: 0.2, vRotX: 0.005, vRotY: -0.004, vRotZ: 0.002, color: "rgba(168, 85, 247, 0.18)", glowColor: "#A855F7", opacity: 0.2 },
        { x: 50, y: height - 100, z: 220, size: 30, rotX: -0.4, rotY: 0.2, rotZ: 0.5, vRotX: -0.004, vRotY: 0.004, vRotZ: -0.003, color: "rgba(244, 114, 182, 0.18)", glowColor: "#F472B6", opacity: 0.2 },
      ];
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initCornerTensors();
    };

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initCornerTensors();

    const projectTensor = (px: number, py: number, pz: number, tensor: TensorPolyhedron, t: number) => {
      const y1 = py * Math.cos(tensor.rotX) - pz * Math.sin(tensor.rotX);
      const z1 = py * Math.sin(tensor.rotX) + pz * Math.cos(tensor.rotX);

      const x2 = px * Math.cos(tensor.rotY) + z1 * Math.sin(tensor.rotY);
      const z2 = -px * Math.sin(tensor.rotY) + z1 * Math.cos(tensor.rotY);

      const x3 = x2 * Math.cos(tensor.rotZ) - y1 * Math.sin(tensor.rotZ);
      const y3 = x2 * Math.sin(tensor.rotZ) + y1 * Math.cos(tensor.rotZ);

      const fov = 400;
      const scale = fov / (fov + tensor.z + z2);
      const floatY = Math.sin(t * 1.2 + tensor.x * 0.01) * 6;

      return {
        x: tensor.x + x3 * scale,
        y: tensor.y + y3 * scale + floatY,
      };
    };

    const drawTensorPolyhedron = (tensor: TensorPolyhedron, t: number) => {
      const s = tensor.size;
      const vertices = [
        [0, -s, 0],
        [s, 0, 0],
        [0, 0, s],
        [-s, 0, 0],
        [0, 0, -s],
        [0, s, 0],
      ];

      const projected = vertices.map(([vx, vy, vz]) =>
        projectTensor(vx, vy, vz, tensor, t)
      );

      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
      ];

      ctx.save();
      ctx.strokeStyle = tensor.color;
      ctx.lineWidth = 1.0;
      ctx.shadowColor = tensor.glowColor;
      ctx.shadowBlur = 6;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      ctx.fillStyle = "#ffffff";
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    // ==========================================
    // 3. 3D GEOMETRY & SPHERE NODES SETUP
    // ==========================================
    interface SphereNode {
      data: KnowledgeNodeData;
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      screenX: number;
      screenY: number;
      scale: number;
      alpha: number;
      hoverFactor: number;
    }

    const sphereRadius = Math.min(width, height) * 0.33;
    const nodeCount = BALL_KNOWLEDGE.length;
    const nodes: SphereNode[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const yNorm = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - yNorm * yNorm);
      const theta = phi * i;

      const r = sphereRadius * (0.88 + Math.sin(i * 1.5) * 0.16);
      const x = Math.cos(theta) * radiusAtY * r;
      const y = yNorm * r;
      const z = Math.sin(theta) * radiusAtY * r;

      nodes.push({
        data: BALL_KNOWLEDGE[i],
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        screenX: width * 0.5,
        screenY: height * 0.44,
        scale: 1,
        alpha: 1,
        hoverFactor: 0,
      });
    }

    interface Synapse {
      n1: number;
      n2: number;
      dist: number;
    }

    const synapses: Synapse[] = [];
    const maxConnDist = sphereRadius * 0.88;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxConnDist) {
          synapses.push({ n1: i, n2: j, dist });
        }
      }
    }

    interface PhotonPulse {
      synapseIdx: number;
      progress: number;
      speed: number;
      color: string;
    }

    const pulses: PhotonPulse[] = [];
    const pulseCount = 30;
    for (let p = 0; p < pulseCount; p++) {
      const sIdx = Math.floor(Math.random() * synapses.length);
      pulses.push({
        synapseIdx: sIdx,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        color: Math.random() > 0.4 ? "#EC4899" : Math.random() > 0.5 ? "#06B6D4" : "#A855F7",
      });
    }

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }
    const shockwaves: Shockwave[] = [];

    interface Sparkle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }
    const sparkles: Sparkle[] = [];

    const triggerShockwaveAt = (x: number, y: number) => {
      shockwaves.push({
        x,
        y,
        radius: 12,
        maxRadius: Math.max(width, height) * 0.65,
        alpha: 0.8,
        speed: 8,
      });

      for (let s = 0; s < 20; s++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.5 ? "#EC4899" : "#06B6D4",
          size: 1.5 + Math.random() * 2,
        });
      }

      pulses.forEach((p) => {
        p.speed *= 2.0;
      });
    };

    // ==========================================
    // 4. 3D ROTATION & MOUSE TRACKING
    // ==========================================
    let rotX = 0.18;
    let rotY = 0;
    let targetRotX = 0.18;
    let targetRotY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastRotX = 0;
    let lastRotY = 0;

    let mouseX = width * 0.5;
    let mouseY = height * 0.44;
    let closestNodeIdx: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        targetRotY = lastRotY + dx * 0.005;
        targetRotX = Math.max(-1.1, Math.min(1.1, lastRotX - dy * 0.005));
      } else {
        const normX = (e.clientX / width - 0.5) * 2;
        const normY = (e.clientY / height - 0.5) * 2;
        targetRotX = 0.18 - normY * 0.22;
        targetRotY = normX * 0.32;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastRotX = targetRotX;
      lastRotY = targetRotY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (e: MouseEvent) => {
      triggerShockwaveAt(e.clientX, e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick);

    // ==========================================
    // 5. RENDER LOOP
    // ==========================================
    let time = 0;
    let autoAngle = 0;

    const render = () => {
      time += 0.016;

      if (!isDragging) {
        autoAngle += 0.003;
      }

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY + autoAngle - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = Math.max(340, height * 0.44);
      const fov = 750;

      // 1. Draw Flowing Volumetric Latent Manifold Waves
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.beginPath();

        const baseY = height * (0.68 + w * 0.11);
        const waveSpeed = time * (0.35 + w * 0.12);
        const amplitude1 = 28 + w * 10;
        const amplitude2 = 16 - w * 4;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 14) {
          const normX = x / width;
          const y =
            baseY +
            Math.sin(normX * 4 + waveSpeed) * amplitude1 +
            Math.cos(normX * 6 - waveSpeed * 0.8) * amplitude2;
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - 50, width, baseY + 90);
        if (w === 0) {
          grad.addColorStop(0, "rgba(236, 72, 153, 0.03)");
          grad.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
          grad.addColorStop(1, "rgba(6, 182, 212, 0.0)");
        } else if (w === 1) {
          grad.addColorStop(0, "rgba(244, 114, 182, 0.02)");
          grad.addColorStop(0.5, "rgba(236, 72, 153, 0.035)");
          grad.addColorStop(1, "rgba(168, 85, 247, 0.0)");
        } else {
          grad.addColorStop(0, "rgba(6, 182, 212, 0.015)");
          grad.addColorStop(0.5, "rgba(56, 189, 248, 0.03)");
          grad.addColorStop(1, "rgba(236, 72, 153, 0.0)");
        }

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        for (let x = 0; x <= width; x += 14) {
          const normX = x / width;
          const y =
            baseY +
            Math.sin(normX * 4 + waveSpeed) * amplitude1 +
            Math.cos(normX * 6 - waveSpeed * 0.8) * amplitude2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(244, 114, 182, ${0.05 - w * 0.012})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw 3D Floating Corner Tensor Polyhedra
      cornerTensors.forEach((tensor) => {
        tensor.rotX += tensor.vRotX;
        tensor.rotY += tensor.vRotY;
        tensor.rotZ += tensor.vRotZ;
        drawTensorPolyhedron(tensor, time);
      });

      // 3. Central Ambient Radial Vignette
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.05,
        centerX,
        centerY,
        sphereRadius * 1.6
      );
      bgGrad.addColorStop(0, "rgba(236, 72, 153, 0.07)");
      bgGrad.addColorStop(0.4, "rgba(168, 85, 247, 0.025)");
      bgGrad.addColorStop(0.8, "rgba(6, 182, 212, 0.012)");
      bgGrad.addColorStop(1, "rgba(4, 5, 8, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Project 3D Nodes
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      let minMouseDist = 38;
      let newClosestIdx: number | null = null;

      nodes.forEach((node, idx) => {
        const x1 = node.baseX * cosY + node.baseZ * sinY;
        const z1 = -node.baseX * sinY + node.baseZ * cosY;

        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = node.baseY * sinX + z1 * cosX;

        node.x = x1;
        node.y = y2;
        node.z = z2;

        const scale = fov / (fov + z2 + sphereRadius * 0.5);
        node.scale = scale;
        node.screenX = centerX + x1 * scale;
        node.screenY = centerY + y2 * scale;

        const depthAlpha = Math.max(0.1, Math.min(0.85, (z2 + sphereRadius) / (sphereRadius * 2)));
        node.alpha = depthAlpha;

        const mdx = node.screenX - mouseX;
        const mdy = node.screenY - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < minMouseDist && node.z > -sphereRadius * 0.2) {
          minMouseDist = mDist;
          newClosestIdx = idx;
        }

        const isHovered = newClosestIdx === idx;
        node.hoverFactor += ((isHovered ? 1 : 0) - node.hoverFactor) * 0.18;
      });

      closestNodeIdx = newClosestIdx;

      // 5. Draw 3D Celestial Holographic Rings
      const draw3DRing = (ringRadius: number, tiltAngle: number, spinSpeed: number, color: string, dashArray: number[]) => {
        ctx.save();
        ctx.beginPath();
        const steps = 60;
        const ringRotY = rotY * spinSpeed;
        const cosRY = Math.cos(ringRotY);
        const sinRY = Math.sin(ringRotY);

        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const rx = Math.cos(theta) * ringRadius;
          const rz = Math.sin(theta) * ringRadius;
          const ry = Math.sin(theta + tiltAngle) * (ringRadius * 0.2);

          const px1 = rx * cosRY + rz * sinRY;
          const pz1 = -rx * sinRY + rz * cosRY;
          const py2 = ry * cosX - pz1 * sinX;
          const pz2 = ry * sinX + pz1 * cosX;

          const scale = fov / (fov + pz2 + sphereRadius * 0.5);
          const sx = centerX + px1 * scale;
          const sy = centerY + py2 * scale;

          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }

        ctx.setLineDash(dashArray);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      };

      draw3DRing(sphereRadius * 1.25, 0.25, 0.7, "rgba(236, 72, 153, 0.18)", [6, 14]);
      draw3DRing(sphereRadius * 1.38, -0.5, -0.5, "rgba(6, 182, 212, 0.15)", [10, 18]);

      // 6. Draw Glowing Central Singularity Core
      const corePulse = Math.sin(time * 2.5) * 4;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        1,
        centerX,
        centerY,
        34 + corePulse
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
      coreGrad.addColorStop(0.3, "rgba(236, 72, 153, 0.35)");
      coreGrad.addColorStop(0.7, "rgba(168, 85, 247, 0.08)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 34 + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // 7. Draw Synapse Connections
      synapses.forEach((syn) => {
        const n1 = nodes[syn.n1];
        const n2 = nodes[syn.n2];

        const avgAlpha = (n1.alpha + n2.alpha) * 0.5;
        const isHighlighted =
          closestNodeIdx !== null && (closestNodeIdx === syn.n1 || closestNodeIdx === syn.n2);

        ctx.beginPath();
        ctx.moveTo(n1.screenX, n1.screenY);
        ctx.lineTo(n2.screenX, n2.screenY);

        if (isHighlighted) {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.9)";
          ctx.lineWidth = 1.8;
          ctx.shadowColor = "#06B6D4";
          ctx.shadowBlur = 8;
        } else {
          const lineAlpha = avgAlpha * 0.11;
          ctx.strokeStyle = `rgba(236, 72, 153, ${lineAlpha})`;
          ctx.lineWidth = Math.max(0.45, (n1.scale + n2.scale) * 0.38);
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 8. Draw Synaptic Photon Pulses
      pulses.forEach((pulse) => {
        const syn = synapses[pulse.synapseIdx];
        if (!syn) return;

        const n1 = nodes[syn.n1];
        const n2 = nodes[syn.n2];

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.synapseIdx = Math.floor(Math.random() * synapses.length);
          pulse.speed = 0.005 + Math.random() * 0.01;
        }

        const px = n1.screenX + (n2.screenX - n1.screenX) * pulse.progress;
        const py = n1.screenY + (n2.screenY - n1.screenY) * pulse.progress;
        const pulseAlpha = (n1.alpha + n2.alpha) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, 1.8 * ((n1.scale + n2.scale) * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.min(0.85, pulseAlpha * 1.2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // 9. Sort nodes by Z-depth and Render Nodes
      const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

      sortedNodes.forEach((node) => {
        const r = node.data.size * node.scale * (1 + node.hoverFactor * 0.5);
        const isHovered = closestNodeIdx !== null && nodes[closestNodeIdx] === node;

        if (isHovered || node.hoverFactor > 0.05) {
          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = node.data.color;
          ctx.globalAlpha = node.hoverFactor * 0.4;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : node.data.color;
        ctx.globalAlpha = isHovered ? 1.0 : Math.max(0.15, node.alpha * 0.85);
        ctx.shadowColor = node.data.color;
        ctx.shadowBlur = isHovered ? 16 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, r + 1, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (isHovered) {
          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "#000000";
          ctx.shadowBlur = 6;
          ctx.fillText(node.data.name, node.screenX + r + 8, node.screenY + 3);
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = 1.0;
      });

      // 10. Draw Shockwaves
      for (let w = shockwaves.length - 1; w >= 0; w--) {
        const sw = shockwaves[w];
        sw.radius += sw.speed;
        sw.alpha -= 0.015;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(w, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(236, 72, 153, ${sw.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#EC4899";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      }

      // 11. Draw Sparkles
      for (let s = sparkles.length - 1; s >= 0; s--) {
        const sp = sparkles[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.alpha -= 0.025;

        if (sp.alpha <= 0) {
          sparkles.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050409]"
    >
      {/* 1. Main 3D Canvas Viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* 2. Ambient Cyber Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />
    </div>
  );
}
