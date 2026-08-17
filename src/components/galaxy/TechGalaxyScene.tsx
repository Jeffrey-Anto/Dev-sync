"use client";

import React, { useMemo, useRef } from "react";
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

  // Distribute nodes evenly on a larger, spacious sphere using Fibonacci spiral
  const nodes: Node3D[] = useMemo(() => {
    const total = techList.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return techList.map((tech, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Spacious sphere radius between 9.0 and 11.5
      const sphereRadius = 9.2 + (i % 4) * 0.7;
      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;
      const py = y * sphereRadius;

      const pos = new THREE.Vector3(x, py, z);
      // Normalized compact node sizes between 0.22 and 0.48
      const nodeSize = 0.22 + (tech.size - 0.35) * 0.3;

      return {
        tech,
        position: pos.clone(),
        originalPos: pos.clone(),
        color: new THREE.Color(tech.color),
        size: nodeSize,
      };
    });
  }, [techList]);

  // Delicate constellation connections between nodes sharing domains
  const lineGeo = useMemo(() => {
    const points: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        const sharedDomain = n1.tech.domainIds.some((id) =>
          n2.tech.domainIds.includes(id)
        );

        if (sharedDomain && n1.position.distanceTo(n2.position) < 4.8) {
          points.push(n1.position.x, n1.position.y, n1.position.z);
          points.push(n2.position.x, n2.position.y, n2.position.z);

          colors.push(n1.color.r * 0.25, n1.color.g * 0.25, n1.color.b * 0.25);
          colors.push(n2.color.r * 0.25, n2.color.g * 0.25, n2.color.b * 0.25);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [nodes]);

  // Ambient slow rotation drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.025;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[20, 20, 20]} intensity={1.8} color="#A5B4FC" />
      <pointLight position={[-20, -20, -20]} intensity={1.4} color="#38BDF8" />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={6}
        maxDistance={32}
        rotateSpeed={0.5}
        zoomSpeed={0.7}
        autoRotate={false}
      />

      <group ref={groupRef} position={[0, -0.4, 0]}>
        {/* Delicate Constellation Filament Edges */}
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* 3D Tech Nodes */}
        {nodes.map((node, index) => {
          const isSelected = selectedTech?.name === node.tech.name;
          const isHovered = hoveredTech?.name === node.tech.name;

          const hasSearch = searchQuery.trim().length > 0;
          const matchesSearch =
            !hasSearch ||
            node.tech.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory =
            selectedCategory === "All" || node.tech.category === selectedCategory;

          const isDimmed = !matchesSearch || !matchesCategory;
          const isHighlighted = isSelected || isHovered || (!isDimmed && hasSearch);

          // ONLY display text label if hovered, selected, or actively searched!
          const showLabel = isHovered || isSelected || (hasSearch && matchesSearch && matchesCategory);

          const scale = isHighlighted ? node.size * 1.8 : isDimmed ? node.size * 0.5 : node.size;
          const opacity = isDimmed ? 0.15 : isHighlighted ? 1 : 0.85;

          return (
            <group
              key={index}
              position={[node.position.x, node.position.y, node.position.z]}
            >
              {/* Central Sphere Star */}
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
                <sphereGeometry args={[0.4, 20, 20]} />
                <meshStandardMaterial
                  color={node.tech.color}
                  emissive={node.tech.color}
                  emissiveIntensity={isHighlighted ? 1.0 : isDimmed ? 0.05 : 0.4}
                  roughness={0.2}
                  metalness={0.8}
                  transparent
                  opacity={opacity}
                />
              </mesh>

              {/* Glowing Outer Halo for Highlighted Nodes */}
              {isHighlighted && (
                <mesh scale={scale * 1.8}>
                  <sphereGeometry args={[0.4, 16, 16]} />
                  <meshBasicMaterial
                    color={node.tech.color}
                    transparent
                    opacity={0.35}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>
              )}

              {/* Clean Floating Label (Only Rendered When Hovered/Selected/Searched) */}
              {showLabel && (
                <Html
                  position={[0, scale * 0.5 + 0.35, 0]}
                  center
                  distanceFactor={14}
                  className="pointer-events-none select-none z-50"
                >
                  <div
                    className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold whitespace-nowrap bg-[#080b14]/95 text-white border shadow-2xl backdrop-blur-md flex items-center gap-1.5 transition-all"
                    style={{
                      borderColor: node.tech.color,
                      boxShadow: `0 0 20px ${node.tech.color}60`,
                    }}
                  >
                    <span>{node.tech.name}</span>
                    <span
                      className="text-[9px] px-1.5 py-0.2 rounded font-semibold"
                      style={{
                        backgroundColor: `${node.tech.color}30`,
                        color: node.tech.color,
                      }}
                    >
                      {node.tech.studentCount}
                    </span>
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>
    </>
  );
}
