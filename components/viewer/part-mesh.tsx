'use client';

import { useCallback, useEffect, useMemo, useRef, memo } from 'react';
import { useGLTF, meshBounds } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import {
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
} from 'three';
import type { Group, Material, MeshStandardMaterial } from 'three';

import { MATERIAL_PRESET } from '@/lib/constants/material-preset';
import type { MaterialType } from '@/types/api';
import type { ModelPart, Vector3 } from '@/types/viewer';

const CLICK_THRESHOLD_PX = 5;

interface PartMeshProps {
  part: ModelPart;
  position: Vector3;
  scale?: Vector3;
  color: string;
  materialType?: MaterialType;
  isSelected: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

const PartMeshBase = ({
  part,
  position,
  scale,
  color,
  materialType,
  isSelected,
  onClick,
  onPointerOver,
  onPointerOut,
}: PartMeshProps) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(part.glbPath);
  
  const isHoveredRef = useRef(false); 
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const meshMaterials = useRef<Map<string, MeshStandardMaterial>>(new Map());

  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child;

        mesh.raycast = meshBounds;

        // 재질 복제 및 저장 (최초 1회)
        if (!meshMaterials.current.has(mesh.uuid)) {
           const originalMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
           const newMat = originalMat.clone() as MeshStandardMaterial;
           
           newMat.toneMapped = true; // 톤 매핑 적용
           mesh.material = newMat;
           meshMaterials.current.set(mesh.uuid, newMat);
        }

        const existingEdges = mesh.children.find((c) => c.userData.isEdgeLine);
        if (!existingEdges && mesh.geometry) {
          const edgesGeometry = new EdgesGeometry(mesh.geometry, 80); 
          const edgesMaterial = new LineBasicMaterial({
            color: 0xffffff,
            linewidth: 1,
            transparent: true,
            opacity: 0.3,
          });
          const edges = new LineSegments(edgesGeometry, edgesMaterial);
          edges.userData.isEdgeLine = true;
          mesh.add(edges);
        }
      }
    });

    return () => {
      meshMaterials.current.forEach((mat) => mat.dispose());
      meshMaterials.current.clear();
    };
  }, [clonedScene]); 


  useEffect(() => {
    const materialConfig = (materialType && MATERIAL_PRESET[materialType]) 
      ? MATERIAL_PRESET[materialType] 
      : { color, metalness: 0.6, roughness: 0.3, vertexColors: false };

    meshMaterials.current.forEach((mat) => {
     
      const baseColor = materialType ? materialConfig.color : color;
      mat.color.set(baseColor);
      mat.metalness = materialConfig.metalness;
      mat.roughness = materialConfig.roughness;
      
      if (materialConfig.vertexColors !== undefined) {
        mat.vertexColors = materialConfig.vertexColors;
      }

      if (isSelected) {
        mat.emissive.set('#3B82F6'); 
        mat.emissiveIntensity = 1.2;
      } else {
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
      }
    });
  }, [color, materialType, isSelected]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isHoveredRef.current = true;
    onPointerOver(); 
    document.body.style.cursor = 'pointer';

    if (isSelected) return;

    meshMaterials.current.forEach((mat) => {
      mat.emissive.set('#2563EB'); 
      mat.emissiveIntensity = 0.5;
    });
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isHoveredRef.current = false;
    onPointerOut();
    document.body.style.cursor = 'auto';

    if (isSelected) return;

    meshMaterials.current.forEach((mat) => {
      mat.emissive.set('#000000');
      mat.emissiveIntensity = 0;
    });
  };
  
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      const startX = e.nativeEvent.clientX;
      const startY = e.nativeEvent.clientY;
  
      const handleUp = (upEvent: PointerEvent) => {
        const dx = upEvent.clientX - startX;
        const dy = upEvent.clientY - startY;
        // 움직임이 5px 미만일 때만 클릭으로 인정
        if (Math.sqrt(dx * dx + dy * dy) < CLICK_THRESHOLD_PX) {
          onClickRef.current();
        }
      };
      window.addEventListener('pointerup', handleUp, { once: true });
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale || undefined}>
      <primitive
        object={clonedScene}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
};
export const PartMesh = memo(PartMeshBase, (prev, next) => {
  return (
    prev.part.id === next.part.id &&
    prev.isSelected === next.isSelected &&
    prev.color === next.color &&
    prev.materialType === next.materialType
  );
});