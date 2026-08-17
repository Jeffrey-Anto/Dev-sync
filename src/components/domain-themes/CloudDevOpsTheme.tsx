"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Server, Database, Container, Network, GitBranch } from "lucide-react";

export default function CloudDevOpsTheme() {
  const [pipelineState, setPipelineState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineState((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pods = [
    { name: "pod/ingress-controller-7f8d", cpu: "14%", status: "Running", mem: "128MB" },
    { name: "pod/sync-cluster-raft-0", cpu: "38%", status: "Healthy", mem: "512MB" },
    { name: "pod/telemetry-prometheus-v2", cpu: "8%", status: "Active", mem: "256MB" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#04080a]">
      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-cyan-900/15 via-transparent to-[#040608]" />

      {/* Floating Kubernetes Cluster Isometric Node (Top Right) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-20 right-6 sm:right-16 w-80 sm:w-96 rounded-2xl bg-cyan-950/25 border border-cyan-500/25 backdrop-blur-md p-5 opacity-40 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
      >
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3 text-xs font-mono text-cyan-300">
          <div className="flex items-center gap-2">
            <Container className="w-4 h-4 text-cyan-400" />
            <span>K8S_CLUSTER // PROD-US-EAST</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            3 NODES READY
          </span>
        </div>

        <div className="space-y-2 font-mono text-[11px]">
          {pods.map((pod, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-cyan-500/15 text-slate-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="truncate max-w-[140px] text-cyan-200">{pod.name}</span>
              </div>
              <div className="text-[10px] text-cyan-400/80">
                {pod.cpu} · {pod.mem}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CI/CD Pipeline Flow Conduits (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 sm:left-14 w-80 sm:w-96 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-md p-4 opacity-35"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 mb-3">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span>GITOPS PIPELINE STATUS</span>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between text-[10px] font-mono">
          {["LINT", "TEST", "BUILD", "DEPLOY"].map((step, sIdx) => {
            const isDone = sIdx <= pipelineState;
            return (
              <React.Fragment key={step}>
                <div
                  className={`px-2.5 py-1 rounded border flex flex-col items-center gap-0.5 ${
                    isDone
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                      : "bg-black/30 border-white/10 text-slate-500"
                  }`}
                >
                  <span>{step}</span>
                  <span className="text-[8px] text-emerald-400">✓</span>
                </div>
                {sIdx < 3 && (
                  <div
                    className={`h-0.5 flex-grow mx-1 transition-all ${
                      isDone ? "bg-cyan-400 shadow-[0_0_8px_cyan]" : "bg-slate-800"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
    </div>
  );
}
