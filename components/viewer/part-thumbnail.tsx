'use client';

import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { ModelPart } from '@/lib/types';

interface ThumbnailModelProps {
  glbPath: string;
  isSelected: boolean;
}

function ThumbnailModel({ glbPath, isSelected }: ThumbnailModelProps) {
  const { scene } = useGLTF(glbPath);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Clone the scene
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    return cloned;
  }, [scene]);

  // Auto-fit camera to model
  useEffect(() => {
    if (clonedScene && camera) {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 0.6;

      camera.position.set(cameraZ * 0.7, cameraZ * 0.5, cameraZ * 0.7);
      camera.lookAt(0, 0, 0);
    }
  }, [clonedScene, camera]);

  // Apply material
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material) {
            child.material = material.clone();
            const newMaterial = child.material as THREE.MeshStandardMaterial;
            newMaterial.color = new THREE.Color(isSelected ? '#00d4ff' : '#8892b0');
            newMaterial.metalness = 0.6;
            newMaterial.roughness = 0.4;

            if (isSelected) {
              newMaterial.emissive = new THREE.Color('#00d4ff');
              newMaterial.emissiveIntensity = 0.3;
            }
          }
        }
      });
    }
  }, [clonedScene, isSelected]);

  // Slow rotation animation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

function FallbackBox({ isSelected }: { isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={isSelected ? '#00d4ff' : '#8892b0'}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

interface PartThumbnailProps {
  part: ModelPart;
  isSelected: boolean;
  onClick: () => void;
}

export function PartThumbnail({ part, isSelected, onClick }: PartThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square rounded-lg overflow-hidden transition-all
        hover:ring-2 hover:ring-primary/50
        ${isSelected ? 'ring-2 ring-primary bg-primary/10' : 'bg-secondary/50'}
      `}
    >
      <Canvas
        camera={{ fov: 50, near: 0.001, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <Suspense fallback={<FallbackBox isSelected={isSelected} />}>
          <ThumbnailModel glbPath={part.glbPath} isSelected={isSelected} />
        </Suspense>
      </Canvas>
    </button>
  );
}
