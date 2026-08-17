"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { AggregatedTech } from "@/utils/techAggregation";

interface TechGalaxySceneProps {
  techList: AggregatedTech[];
  searchQuery: string;
  selectedCategory: string;
  selectedTech: AggregatedTech | null;
  onSelectTech: (tech: AggregatedTech | null) => void;
  hoveredTech: AggregatedTech | null;
  onHoverTech: (tech: AggregatedTech | null) => void;
}

interface Node3D {
  tech: AggregatedTech;
  position: THREE.Vector3;
  originalPos: THREE.Vector3;
  color: THREE.Color;
  size: number;
}

export default function TechGalaxyScene({
  techList,
  searchQuery,
  selectedCategory,
  selectedTech,
  onSelectTech,
  hoveredTech,
  onHoverTech,
}: TechGalaxySceneProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Distribute nodes evenly on a sphere using Fibonacci spiral
  const nodes: Node3D[] = useMemo(() => {
    const total = techList.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return techList.map((tech, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 6.8 + (i % 3) * 0.8;
      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;
      const py = y * sphereRadius;

      const pos = new THREE.Vector3(x, py, z);
      return {
        tech,
        position: pos.clone(),
        originalPos: pos.clone(),
        color: new THREE.Color(tech.color),
        size: tech.size,
      };
    });
  }, [techList]);

  // Connections between nodes that share domains
  const lineGeo = useMemo(() => {
    const points: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        // Check if they share at least one domain
        const sharedDomain = n1.tech.domainIds.some((id) =>
          n2.tech.domainIds.includes(id)
        );

        if (sharedDomain && n1.position.distanceTo(n2.position) < 5.8) {
          points.push(n1.position.x, n1.position.y, n1.position.z);
          points.push(n2.position.x, n2.position.y, n2.position.z);

          colors.push(n1.color.r * 0.4, n1.color.g * 0.4, n1.color.b * 0.4);
          colors.push(n2.color.r * 0.4, n2.color.g * 0.4, n2.color.b * 0.4);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [nodes]);

  // Ambient gentle drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[15, 15, 15]} intensity={1.5} color="#A5B4FC" />
      <pointLight position={[-15, -15, -15]} intensity={1.2} color="#38BDF8" />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={4}
        maxDistance={22}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        autoRotate={false}
      />

      <group ref={groupRef}>
        {/* Constellation Filament Edges */}
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* 3D Tech Nodes */}
        {nodes.map((node, index) => {
          const isSelected = selectedTech?.name === node.tech.name;
          const isHovered = hoveredTech?.name === node.tech.name;

          // Search & Filter matching logic
          const matchesSearch =
            searchQuery.trim() === "" ||
            node.tech.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory =
            selectedCategory === "All" || node.tech.category === selectedCategory;

          const isDimmed = !matchesSearch || !matchesCategory;
          const isHighlighted = isSelected || isHovered || (!isDimmed && searchQuery.trim() !== "");

          const scale = isHighlighted ? node.size * 1.5 : isDimmed ? node.size * 0.6 : node.size;
          const opacity = isDimmed ? 0.2 : isHighlighted ? 1 : 0.85;

          return (
            <group
              key={index}
              position={[node.position.x, node.position.y, node.position.z]}
            >
              {/* Central Sphere Node */}
              <mesh
                scale={scale}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTech(node.tech);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "pointer";
                  onHoverTech(node.tech);
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "auto";
                  onHoverTech(null);
                }}
              >
                <sphereGeometry args={[0.4, 24, 24]} />
                <meshStandardMaterial
                  color={node.tech.color}
                  emissive={node.tech.color}
                  emissiveIntensity={isHighlighted ? 0.9 : isDimmed ? 0.1 : 0.4}
                  roughness={0.2}
                  metalness={0.8}
                  transparent
                  opacity={opacity}
                />
              </mesh>

              {/* Glowing Outer Halo for Highlighted Nodes */}
              {isHighlighted && (
                <mesh scale={scale * 1.6}>
                  <sphereGeometry args={[0.4, 16, 16]} />
                  <meshBasicMaterial
                    color={node.tech.color}
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>
              )}

              {/* Floating 3D Text Label */}
              <Html
                position={[0, scale * 0.5 + 0.35, 0]}
                center
                distanceFactor={11}
                className="pointer-events-none select-none"
              >
                <div
                  className={`px-2 py-0.5 rounded-md font-mono text-[10px] whitespace-nowrap transition-all duration-300 ${
                    isHighlighted
                      ? "bg-slate-900/90 text-white font-bold border border-white/40 shadow-lg scale-110"
                      : isDimmed
                      ? "opacity-20 text-slate-500"
                      : "bg-black/60 text-slate-300 border border-white/10"
                  }`}
                  style={{
                    boxShadow: isHighlighted ? `0 0 15px ${node.tech.color}` : "none",
                  }}
                >
                  {node.tech.name}
                  {isHighlighted && (
                    <span className="ml-1 text-[9px] text-cyan-300">
                      ({node.tech.studentCount})
                    </span>
                  )}
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </>
  );
}
