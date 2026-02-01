'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import type { ModelPart } from '@/lib/types';

interface PartMeshProps {
  part: ModelPart;
  position: [number, number, number];
  geometry: { type: string; args: number[] };
  color: string;
  isSelected: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

export function PartMesh({
  part,
  position,
  geometry,
  color,
  isSelected,
  onClick,
  onPointerOver,
  onPointerOut,
}: PartMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Animate position smoothly
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x += (position[0] - meshRef.current.position.x) * delta * 5;
      meshRef.current.position.y += (position[1] - meshRef.current.position.y) * delta * 5;
      meshRef.current.position.z += (position[2] - meshRef.current.position.z) * delta * 5;
    }
  });

  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    setIsHovered(true);
    onPointerOver();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: THREE.Event) => {
    e.stopPropagation();
    setIsHovered(false);
    onPointerOut();
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick();
  };

  // Determine material properties based on state
  const emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.3 : 0;
  const emissiveColor = isSelected || isHovered ? '#00d4ff' : '#000000';

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {geometry.type === 'box' ? (
        <boxGeometry args={geometry.args as [number, number, number]} />
      ) : (
        <cylinderGeometry args={geometry.args as [number, number, number, number]} />
      )}
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
      />
      
      {/* Selection outline effect */}
      {(isSelected || isHovered) && (
        <mesh scale={1.05}>
          {geometry.type === 'box' ? (
            <boxGeometry args={geometry.args as [number, number, number]} />
          ) : (
            <cylinderGeometry args={geometry.args as [number, number, number, number]} />
          )}
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.2}
            side={2}
          />
        </mesh>
      )}
    </mesh>
  );
}
