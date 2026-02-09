'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Canvas , events} from '@react-three/fiber';
import { Preload } from '@react-three/drei'; // 🔥 초기 로딩 렉 제거
import { ACESFilmicToneMapping, type WebGLRenderer } from 'three';

import { useViewerStore } from '@/store/viewer-store';
import type { CameraState, ViewerModel } from '@/types/viewer';

import { CanvasContent } from './canvas-content';
import type { ControlsHandle } from './manual-controls';
import { BottomSliders, RotationControls } from './scene-controls';

interface SceneProps {
  model: ViewerModel;
  explodeValue: number;
  selectedPartIds: string[];
  onPartClick: (partId: string) => void;
  onPartHover: (partId: string | null) => void;
  onExplodeChange: (value: number) => void;
  isFullscreen?: boolean;
  isLeftPanelOpen?: boolean;
  onToggleFullscreen?: () => void;
  onCaptureReady?: (capture: () => string | null) => void;
}

function throttleTrailing<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;

  return (...args: Parameters<T>) => {
    const now = performance.now();
    const remaining = wait - (now - last);
    lastArgs = args;

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      last = now;
      fn(...args);
      lastArgs = null;
      return;
    }

    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        last = performance.now();
        if (lastArgs) fn(...(lastArgs as Parameters<T>));
        lastArgs = null;
      }, remaining);
    }
  };
}

const performanceEvents = (store: any) => {
  const defaultEvents = events(store);
  let lastCall = 0;

  return {
    ...defaultEvents,
    compute: (event: any, state: any) => {
      const now = performance.now();
      // 50ms가 안 지났으면 계산 안 함 (Skip)
      if (now - lastCall < 50) return;
      
      lastCall = now;
      defaultEvents.compute?.(event, state);
    },
  };
};


export function Scene({
  model,
  explodeValue: initialExplodeValue, // 초기값
  selectedPartIds,
  onPartClick,
  onPartHover,
  onExplodeChange,
  isFullscreen = false,
  isLeftPanelOpen = true,
  onToggleFullscreen,
  onCaptureReady,
}: SceneProps) {
  const controlsRef = useRef<ControlsHandle>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  
  // 🔥 최적화 핵심 1: 3D 애니메이션용 Ref (리렌더링 안 일으킴)
  const explodeRef = useRef(initialExplodeValue);
  const lastUpdateRef = useRef(0);
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null);
  const lastHoverRef = useRef<string | null>(null);
  const emitHoverThrottled = useMemo(() => {
    return throttleTrailing((partId: string | null) => {
      onPartHover(partId);
    }, 50); // 30~60ms 추천. 일단 50ms
  }, [onPartHover]);

  const handlePartHover = useCallback((partId: string | null) => {
    // 같은 파트면 상태 업데이트 자체를 막아버림 (가장 큰 효과)
    if (lastHoverRef.current === partId) return;
    lastHoverRef.current = partId;

    emitHoverThrottled(partId);
  }, [emitHoverThrottled]);


  // UI 인터랙션 상태 (true면 3D 마우스 감지 끔)
  const [isInteracting, setIsInteracting] = useState(false);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const [zoomValue, setZoomValue] = useState(50);
  const [canvasKey, setCanvasKey] = useState(() => Date.now());
  const [contextLost, setContextLost] = useState(false);
  const retryCountRef = useRef(0);

  

  const handleExplodeChangeWrapper = (value: number) => {
    explodeRef.current = value; 
    const now = Date.now();
    if (now - lastUpdateRef.current < 30) {
      if (pendingUpdateRef.current) clearTimeout(pendingUpdateRef.current);
      
      pendingUpdateRef.current = setTimeout(() => {
        onExplodeChange(value);
        lastUpdateRef.current = Date.now();
      }, 30);
      
      return; // 여기서 함수 종료 (부모 리렌더링 방지)
    }
    onExplodeChange(value);
    lastUpdateRef.current = now;
    
    if (pendingUpdateRef.current) {
      clearTimeout(pendingUpdateRef.current);
      pendingUpdateRef.current = null;
    }
  };

  const handleCreated = useCallback(
    ({ gl }: { gl: WebGLRenderer }) => {
      rendererRef.current = gl;
      onCaptureReady?.(() => {
        if (!rendererRef.current) return null;
        return rendererRef.current.domElement.toDataURL('image/png');
      });

      const canvas = gl.domElement;
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        setContextLost(true);
        if (retryCountRef.current < 3) {
          retryCountRef.current += 1;
          setTimeout(() => {
            setCanvasKey(Date.now());
            setContextLost(false);
          }, 500);
        }
      };
      const handleContextRestored = () => {
        setContextLost(false);
        retryCountRef.current = 0;
      };
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    },
    [onCaptureReady]
  );

  const store = useViewerStore(model.id);
  const cameraState = store((state) => state.cameraState);
  const setCameraState = store((state) => state.setCameraState);
  const isHydrated = store((state) => state.isHydrated);
  const initialCameraState = isHydrated ? cameraState : null;

  const handleCameraChange = useCallback((state: CameraState) => setCameraState(state), [setCameraState]);
  const handleZoomChange = useCallback((val: number) => setZoomValue(val), []);
  const handleZoomSliderChange = (value: number) => {
    setZoomValue(value);
    controlsRef.current?.setZoomLevel(value);
  };

  const handleRotateLeftStart = () => { setIsInteracting(true); setIsRotatingLeft(true); controlsRef.current?.startRotateLeft(); };
  const handleRotateLeftEnd = () => { setIsInteracting(false); setIsRotatingLeft(false); controlsRef.current?.stopRotate(); };
  const handleRotateRightStart = () => { setIsInteracting(true); setIsRotatingRight(true); controlsRef.current?.startRotateRight(); };
  const handleRotateRightEnd = () => { setIsInteracting(false); setIsRotatingRight(false); controlsRef.current?.stopRotate(); };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="absolute inset-0">
        {contextLost ? (
          <div className="w-full h-full flex items-center justify-center bg-[#070b14]">
            <span className="text-primary">3D 뷰어 복구 중...</span>
          </div>
        ) : (
          <div className="w-full h-full" style={{ pointerEvents: isInteracting ? 'none' : 'auto' }}>
            <Canvas
              key={canvasKey}
              dpr={[1, 2]} // 🔥 화질 선명하게 (Retina 대응)
              performance={{ min: 0.5 }} // 프레임 방어
              events={performanceEvents}
              camera={{ position: [1, 0.5, 1], fov: 45 }}
              gl={{
                antialias: true,
                alpha: true,
                toneMapping: ACESFilmicToneMapping,
                toneMappingExposure: 0.7,
                preserveDrawingBuffer: true,
                powerPreference: 'high-performance',
              }}
              shadows={true}
              style={{ background: 'transparent' }}
              onCreated={handleCreated}
            >
            
              <CanvasContent
                model={model}
                explodeRef={explodeRef} // 🔥 값이 아니라 Ref 전달
                selectedPartIds={selectedPartIds}
                onPartClick={onPartClick}
                onPartHover={onPartHover} 
                controlsRef={controlsRef}
                initialCameraState={initialCameraState}
                onCameraChange={handleCameraChange}
                onZoomChange={handleZoomChange}
              />
              
              <Preload all /> {/* 🔥 쉐이더 미리 컴파일 */}
            </Canvas>
          </div>
        )}

        <div 
          className="absolute bottom-0 left-0 w-full"
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onPointerLeave={() => setIsInteracting(false)}
        >
          <BottomSliders
            explodeValue={initialExplodeValue} // 🔥 UI용 State 사용
            zoomValue={zoomValue}
            onExplodeChange={handleExplodeChangeWrapper} // 🔥 Wrapper 핸들러 사용
            onZoomChange={handleZoomSliderChange}
            isFullscreen={isFullscreen}
            isLeftPanelOpen={isLeftPanelOpen}
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
          />
        </div>
      </div>

      <div onPointerDown={() => setIsInteracting(true)} onPointerUp={() => setIsInteracting(false)}>
        <RotationControls
          isRotatingLeft={isRotatingLeft}
          isRotatingRight={isRotatingRight}
          isFullscreen={isFullscreen}
          onRotateLeftStart={handleRotateLeftStart}
          onRotateLeftEnd={handleRotateLeftEnd}
          onRotateRightStart={handleRotateRightStart}
          onRotateRightEnd={handleRotateRightEnd}
          onToggleFullscreen={onToggleFullscreen}
        />
      </div>
    </div>
  );
}