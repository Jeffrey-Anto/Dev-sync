"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NodeGraphProps {
  count?: number;
  connectionDistance?: number;
}

// Reused scratch colors to avoid per-frame allocations in the O(n²) connection loop
const LINE_COLOR_NEAR = new THREE.Color("#818CF8"); // Indigo
const LINE_COLOR_FAR = new THREE.Color("#06B6D4");  // Cyan
const scratchC1 = new THREE.Color();
const scratchC2 = new THREE.Color();

export function TechnicalNodeGraph({ count = 90, connectionDistance = 3.2 }: NodeGraphProps) {
  const { mouse } = useThree();

  // Create node positions and velocities
  const [positions, velocities, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spatial distribution in a spherical-cuboid cluster
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 1;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel, origPos];
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const pulseRef = useRef<THREE.InstancedMesh>(null!);

  // Geometry references
  const linePositions = useMemo(() => {
    // Max possible lines for count
    const maxLines = (count * (count - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, [count]);

  const lineColors = useMemo(() => {
    const maxLines = (count * (count - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, [count]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return geo;
  }, [linePositions, lineColors]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Signal packets that travel along nodes
  const packetCount = 8;
  const packets = useMemo(() => {
    return Array.from({ length: packetCount }, () => ({
      fromIdx: 0,
      toIdx: 1,
      progress: Math.random(),
      speed: 0.008 + Math.random() * 0.012,
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current?.geometry.attributes.position;
    if (!posAttr) return;

    const currentPos = posAttr.array as Float32Array;

    // Update node positions with harmonic drift & gentle mouse repulsion/drift
    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Harmonic sine oscillation
      currentPos[idx] =
        originalPositions[idx] +
        Math.sin(time * 0.4 + i * 1.3) * 0.4 +
        mouse.x * 0.8 * (1 + (originalPositions[idx + 2] + 4) * 0.1);

      currentPos[idx + 1] =
        originalPositions[idx + 1] +
        Math.cos(time * 0.35 + i * 1.7) * 0.4 +
        mouse.y * 0.8 * (1 + (originalPositions[idx + 2] + 4) * 0.1);

      currentPos[idx + 2] = originalPositions[idx + 2] + Math.sin(time * 0.2 + i) * 0.3;
    }
    posAttr.needsUpdate = true;

    // Build connections dynamically
    let lineIdx = 0;
    let lineColorsIdx = 0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = currentPos[i3] - currentPos[j3];
        const dy = currentPos[i3 + 1] - currentPos[j3 + 1];
        const dz = currentPos[i3 + 2] - currentPos[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = 1 - dist / connectionDistance;

          linePositions[lineIdx++] = currentPos[i3];
          linePositions[lineIdx++] = currentPos[i3 + 1];
          linePositions[lineIdx++] = currentPos[i3 + 2];

          linePositions[lineIdx++] = currentPos[j3];
          linePositions[lineIdx++] = currentPos[j3 + 1];
          linePositions[lineIdx++] = currentPos[j3 + 2];

          // Gradient color along line
          const t1 = (currentPos[i3] + 8) / 16;
          const t2 = (currentPos[j3] + 8) / 16;
          scratchC1.copy(LINE_COLOR_NEAR).lerp(LINE_COLOR_FAR, t1);
          scratchC2.copy(LINE_COLOR_FAR).lerp(LINE_COLOR_NEAR, t2);

          lineColors[lineColorsIdx++] = scratchC1.r * alpha * 0.85;
          lineColors[lineColorsIdx++] = scratchC1.g * alpha * 0.85;
          lineColors[lineColorsIdx++] = scratchC1.b * alpha * 0.85;

          lineColors[lineColorsIdx++] = scratchC2.r * alpha * 0.85;
          lineColors[lineColorsIdx++] = scratchC2.g * alpha * 0.85;
          lineColors[lineColorsIdx++] = scratchC2.b * alpha * 0.85;
        }
      }
    }

    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx / 3);

    // Update signal pulses
    if (pulseRef.current) {
      packets.forEach((pkt, pIdx) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromIdx = Math.floor(Math.random() * count);
          pkt.toIdx = (pkt.fromIdx + 1 + Math.floor(Math.random() * 5)) % count;
        }

        const f3 = pkt.fromIdx * 3;
        const t3 = pkt.toIdx * 3;

        const px = THREE.MathUtils.lerp(currentPos[f3], currentPos[t3], pkt.progress);
        const py = THREE.MathUtils.lerp(currentPos[f3 + 1], currentPos[t3 + 1], pkt.progress);
        const pz = THREE.MathUtils.lerp(currentPos[f3 + 2], currentPos[t3 + 2], pkt.progress);

        const pulseScale = Math.sin(pkt.progress * Math.PI) * 0.22 + 0.05;

        dummy.position.set(px, py, pz);
        dummy.scale.set(pulseScale, pulseScale, pulseScale);
        dummy.updateMatrix();
        pulseRef.current.setMatrixAt(pIdx, dummy.matrix);
      });
      pulseRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Connected Lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes / Particle Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#A5B4FC"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Signal Pulses */}
      <instancedMesh ref={pulseRef} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color="#38BDF8"
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.95}
        />
      </instancedMesh>
    </group>
  );
}

/**
 * Geometric Abstract Core floating in deep background
 */
export function GeometricCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.16;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.08;
      wireRef.current.rotation.y = t * 0.14;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    }
  });

  return (
    <group position={[3.5, 0, -4]}>
      {/* Translucent Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshPhysicalMaterial
          color="#4F46E5"
          emissive="#312E81"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transmission={0.6}
          thickness={1.2}
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <lineSegments ref={wireRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(2.8, 1)]} />
        <lineBasicMaterial
          color="#06B6D4"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Orbiting Orbital Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.6, 0.02, 16, 64]} />
          <meshBasicMaterial
            color="#818CF8"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[4.1, 0.015, 16, 64]} />
          <meshBasicMaterial
            color="#EC4899"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Camera Controller with Ambient Drift & Mouse Parallax
 */
export function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Target position with mouse parallax + subtle ambient figure-8 drift
    const targetX = mouse.x * 1.5 + Math.sin(t * 0.25) * 0.4;
    const targetY = mouse.y * 1.0 + Math.cos(t * 0.2) * 0.3;
    const targetZ = 6.8 + Math.sin(t * 0.15) * 0.2;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Complete 3D Hero Scene
 */
export default function HeroScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#818CF8" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#06B6D4" />
      <spotLight
        position={[0, 15, 5]}
        angle={0.6}
        penumbra={0.8}
        intensity={2.0}
        color="#F472B6"
      />

      <TechnicalNodeGraph count={85} connectionDistance={3.4} />
      <GeometricCore />
    </>
  );
}
